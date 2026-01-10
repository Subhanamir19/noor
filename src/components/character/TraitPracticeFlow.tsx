import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { TreeState } from '@/types/models';
import { TodayColors, TodayRadii, TodaySpacing, TodayTypography } from '@/constants/todayTokens';
import { useCharacterStore } from '@/store/characterStore';
import { usePracticeStore } from '@/store/practiceStore';
import { useUserPreferencesStore } from '@/store/userPreferencesStore';
import type { PracticeDifficulty, TraitPractice } from '@/data/traitPractices';
import { getPracticesForTrait, pickRecommendedPractice } from '@/data/traitPractices';
import { getTraitById as getCoreTraitById } from '@/data/characterScenarios';
import {
  getTraitById as getTraitDetailsById,
  getTraitResource,
} from '@/data/traits/traitsData';
import { AppLottie } from '@/components/common/AppLottie';
import { Button } from '@/components/common/Button';
import { getPracticeVisualSource } from '@/constants/practiceVisuals';
import { lightHaptic, successHaptic } from '@/utils/haptics';
import { MomentConfirmation } from './MomentConfirmation';

type Step = 'choose' | 'active' | 'success';

const CARD_SHADOW_HEIGHT = 5;
const CARD_BORDER_RADIUS = 20;
const CARD_COLORS = [
  { bg: '#FFFFFF', shadow: 'rgba(15,118,110,0.12)', border: 'rgba(15,118,110,0.18)' }, // Teal
  { bg: '#FFFFFF', shadow: 'rgba(245,158,11,0.14)', border: 'rgba(245,158,11,0.22)' }, // Gold
  { bg: '#FFFFFF', shadow: 'rgba(37,99,235,0.12)', border: 'rgba(37,99,235,0.18)' }, // Indigo
  { bg: '#FFFFFF', shadow: 'rgba(236,72,153,0.10)', border: 'rgba(236,72,153,0.16)' }, // Rose
] as const;

function stripOuterQuotes(text: string) {
  const trimmed = text.trim();
  if (trimmed.length < 2) return text;
  const first = trimmed[0];
  const last = trimmed[trimmed.length - 1];
  const isStraight = first === '"' && last === '"';
  const isCurly = first === '“' && last === '”';
  if (isStraight || isCurly) return trimmed.slice(1, -1);
  return text;
}

interface Props {
  active: boolean;
  userId: string;
  traitId: string;
  treeState: TreeState;
  onClose: () => void;
  initialPracticeId?: string | null;
  hideChooser?: boolean;
}

function treeStateToDifficulty(treeState: TreeState): PracticeDifficulty {
  if (treeState === 'thriving') return 2;
  if (treeState === 'growing') return 1.5;
  return 1;
}

function parsePracticePayload(payload: Record<string, unknown> | null | undefined): TraitPractice | null {
  if (!payload) return null;
  const title = typeof payload.title === 'string' ? payload.title : null;
  const goal = typeof payload.goal === 'string' ? payload.goal : '';
  const age = typeof payload.age_appropriate === 'string' ? payload.age_appropriate : 'all';
  const duration = typeof payload.duration_minutes === 'number' ? payload.duration_minutes : 5;
  const difficulty = typeof payload.difficulty === 'number' ? payload.difficulty : 1;
  const steps = Array.isArray(payload.steps) ? payload.steps.filter((s): s is string => typeof s === 'string') : [];
  const whatToSay = Array.isArray(payload.what_to_say)
    ? payload.what_to_say.filter((s): s is string => typeof s === 'string')
    : [];
  const ifResists = typeof payload.if_child_resists === 'string' ? payload.if_child_resists : '';
  const reflectionPrompts = Array.isArray(payload.reflection_prompts)
    ? payload.reflection_prompts.filter((s): s is string => typeof s === 'string')
    : [];
  const safety = typeof payload.safety_note === 'string' ? payload.safety_note : undefined;
  const whenToUse = typeof (payload as any).when_to_use === 'string' ? ((payload as any).when_to_use as string) : '';

  if (!title) return null;

  return {
    id: typeof payload.id === 'string' ? payload.id : 'practice_payload',
    traitId: payload.traitId as any,
    title,
    goal,
    when_to_use: whenToUse,
    age_appropriate: age as any,
    duration_minutes: duration,
    difficulty: difficulty as any,
    steps,
    what_to_say: whatToSay,
    if_child_resists: ifResists,
    reflection_prompts: reflectionPrompts,
    safety_note: safety,
  };
}

function PracticePathItem({
  practice,
  index,
  selected,
  isLast,
  onPress,
}: {
  practice: TraitPractice;
  index: number;
  selected: boolean;
  isLast: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.pathRow} onPress={onPress}>
      <View style={styles.pathLeft}>
        <View style={[styles.pathCircle, selected && styles.pathCircleSelected]}>
          <Text style={[styles.pathCircleText, selected && styles.pathCircleTextSelected]}>
            {index + 1}
          </Text>
        </View>
        {!isLast ? <View style={styles.pathLine} /> : null}
      </View>

      <View style={[styles.pathCard, selected && styles.pathCardSelected]}>
        <View style={styles.practiceHeader}>
          <Text style={styles.practiceTitle}>{practice.title}</Text>
          <View style={styles.practiceMeta}>
            <Text style={styles.practiceMetaText}>{practice.duration_minutes}m</Text>
            <Text style={styles.practiceMetaDot}>•</Text>
            <Text style={styles.practiceMetaText}>
              {practice.age_appropriate === 'all' ? 'All ages' : practice.age_appropriate}
            </Text>
          </View>
        </View>
        <Text style={styles.practiceGoal} numberOfLines={2}>
          {practice.goal}
        </Text>
      </View>
    </Pressable>
  );
}

function PracticeCard({
  practice,
  colorIndex,
  recommended,
  disabled,
  loading,
  onStart,
}: {
  practice: TraitPractice;
  colorIndex: number;
  recommended: boolean;
  disabled: boolean;
  loading: boolean;
  onStart: () => void;
}) {
  const colors = CARD_COLORS[colorIndex % CARD_COLORS.length];

  return (
    <Pressable onPress={onStart} disabled={disabled} style={{ marginBottom: 14 }}>
      {({ pressed }) => {
        const translateY = pressed && !disabled ? CARD_SHADOW_HEIGHT : 0;
        const currentShadowHeight = pressed && !disabled ? 0 : CARD_SHADOW_HEIGHT;

        return (
          <View>
            <View
              style={{
                position: 'absolute',
                top: CARD_SHADOW_HEIGHT,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: colors.shadow,
                borderRadius: CARD_BORDER_RADIUS,
              }}
            />

            <View
              style={{
                backgroundColor: colors.bg,
                borderRadius: CARD_BORDER_RADIUS,
                borderWidth: 2,
                borderColor: colors.border,
                transform: [{ translateY }],
                marginBottom: currentShadowHeight,
                paddingVertical: 14,
                paddingHorizontal: 14,
                flexDirection: 'row',
                gap: TodaySpacing[12],
              }}
            >
              <View style={{ width: 74, alignItems: 'center' }}>
                <View style={{ width: 70, height: 70 }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 4,
                      left: 0,
                      width: 70,
                      height: 70,
                      borderRadius: 18,
                      backgroundColor: 'rgba(17,24,39,0.08)',
                    }}
                  />
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 18,
                      backgroundColor: '#FFFFFF',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: TodayColors.strokeSubtle,
                      overflow: 'hidden',
                    }}
                  >
                    <AppLottie
                      source={getPracticeVisualSource(practice.id)}
                      style={{ width: 70, height: 70 }}
                    />
                  </View>
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.cardTopRow}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {practice.title}
                  </Text>
                  {recommended ? (
                    <View style={styles.recommendedPill}>
                      <Text style={styles.recommendedText}>Recommended</Text>
                    </View>
                  ) : null}
                </View>

                <Text style={styles.cardGoal} numberOfLines={2}>
                  {practice.goal}
                </Text>

                <Text style={styles.cardWhen} numberOfLines={2}>
                  When to use: {practice.when_to_use || 'When you have a calm 3-5 minutes together.'}
                </Text>

                <View style={styles.cardMetaRow}>
                  <View style={styles.metaChip}>
                    <Text style={styles.metaChipText}>{practice.duration_minutes} min</Text>
                  </View>
                  <View style={styles.metaChip}>
                    <Text style={styles.metaChipText}>
                      {practice.age_appropriate === 'all' ? 'All ages' : practice.age_appropriate}
                    </Text>
                  </View>
                </View>

                <View style={{ marginTop: TodaySpacing[12], alignSelf: 'flex-start' }}>
                  <Button
                    title="Start"
                    variant="teal"
                    size="sm"
                    onPress={onStart}
                    disabled={disabled}
                    loading={loading}
                  />
                </View>
              </View>
            </View>
          </View>
        );
      }}
    </Pressable>
  );
}

export function TraitPracticeFlow({
  active,
  userId,
  traitId,
  treeState,
  onClose,
  initialPracticeId = null,
  hideChooser = false,
}: Props) {
  const [step, setStep] = useState<Step>('choose');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [payloadPractice, setPayloadPractice] = useState<TraitPractice | null>(null);
  const [reflectionNote, setReflectionNote] = useState('');
  const [successData, setSuccessData] = useState<{ leveledUp: boolean; newLevel?: number } | null>(null);
  const [startingPracticeId, setStartingPracticeId] = useState<string | null>(null);
  const autoStartRef = useRef(false);

  const coreTrait = useMemo(() => getCoreTraitById(traitId), [traitId]);

  const traitDetails = useMemo(() => getTraitDetailsById(traitId), [traitId]);
  const quran = useMemo(() => (traitDetails ? getTraitResource(traitDetails, 'quran') : undefined), [traitDetails]);
  const hadith = useMemo(() => (traitDetails ? getTraitResource(traitDetails, 'hadith') : undefined), [traitDetails]);
  const dua = useMemo(() => (traitDetails ? getTraitResource(traitDetails, 'dua') : undefined), [traitDetails]);

  const logMoment = useCharacterStore((state) => state.logMoment);

  const ageGroup = useUserPreferencesStore((state) => state.ageGroup);
  const loadPreferences = useUserPreferencesStore((state) => state.load);

  const practiceLoading = usePracticeStore((state) => state.isLoading);
  const practiceError = usePracticeStore((state) => state.error);
  const clearPracticeError = usePracticeStore((state) => state.clearError);
  const loadActiveForTrait = usePracticeStore((state) => state.loadActiveForTrait);
  const startPractice = usePracticeStore((state) => state.startPractice);
  const completePractice = usePracticeStore((state) => state.completePractice);
  const abandonPractice = usePracticeStore((state) => state.abandonPractice);

  const allPractices = useMemo(() => getPracticesForTrait(traitId as any), [traitId]);
  const difficultyTarget = useMemo(() => treeStateToDifficulty(treeState), [treeState]);
  const { recommended, alternatives } = useMemo(
    () => pickRecommendedPractice(allPractices, ageGroup, difficultyTarget),
    [allPractices, ageGroup, difficultyTarget]
  );

  const practicePath = useMemo(() => {
    const items: TraitPractice[] = [];
    if (recommended) items.push(recommended);
    items.push(...alternatives);
    return items;
  }, [alternatives, recommended]);

  const activePractice = payloadPractice;

  const resetState = () => {
    setStep('choose');
    setSessionId(null);
    setPayloadPractice(null);
    setReflectionNote('');
    setSuccessData(null);
    setStartingPracticeId(null);
    autoStartRef.current = false;
    clearPracticeError();
  };

  useEffect(() => {
    if (!active) return;
    resetState();
    loadPreferences(userId);
    loadActiveForTrait(userId, traitId).then((session) => {
      if (!session) return;
      if (hideChooser && initialPracticeId && session.practice_id !== initialPracticeId) return;
      const payload = parsePracticePayload(session.practice_payload);
      const fallback = payload || allPractices.find((p) => p.id === session.practice_id) || null;
      if (!fallback) return;
      setSessionId(session.id);
      setPayloadPractice(fallback);
      setStep('active');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, userId, traitId, allPractices, hideChooser, initialPracticeId]);

  useEffect(() => {
    if (!active) return;
    if (!hideChooser) return;
    if (!initialPracticeId) return;
    if (step !== 'choose') return;
    if (payloadPractice || sessionId) return;
    if (startingPracticeId) return;
    if (practiceLoading) return;
    if (autoStartRef.current) return;

    const practice = allPractices.find((p) => p.id === initialPracticeId) || null;
    if (!practice) return;
    autoStartRef.current = true;
    handleStart(practice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, allPractices, hideChooser, initialPracticeId, payloadPractice, practiceLoading, sessionId, startingPracticeId, step]);

  const handleStart = async (practice: TraitPractice) => {
    if (practiceLoading || startingPracticeId) return;
    lightHaptic();
    setStartingPracticeId(practice.id);
    try {
      const session = await startPractice(userId, practice);
      if (!session) return;
      setSessionId(session.id);
      setPayloadPractice(practice);
      setStep('active');
    } finally {
      setStartingPracticeId(null);
    }
  };

  const handleDone = async () => {
    if (!activePractice || !sessionId) return;

    const note = reflectionNote.trim() || undefined;
    const ok = await completePractice(sessionId, note);
    if (!ok) return;

    const result = await logMoment(userId, traitId, 'positive', `practice:${activePractice.id}`, note);
    if (!result.success) return;

    successHaptic();
    setSuccessData({ leveledUp: result.leveledUp, newLevel: result.newLevel });
    setStep('success');
  };

  const handleStopForNow = async () => {
    if (!sessionId) {
      onClose();
      return;
    }
    await abandonPractice(sessionId);
    onClose();
  };

  const canDone = !!sessionId && !!activePractice && !practiceLoading;

  return (
    <View style={{ flex: 1 }}>
      {step === 'success' && traitId && successData && (
        <MomentConfirmation
          traitId={traitId}
          momentType="positive"
          leveledUp={successData.leveledUp}
          newLevel={successData.newLevel}
          titleOverride="Practice complete!"
          encouragementOverride="You took a real step today. Keep going."
          onComplete={onClose}
        />
      )}

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {practiceError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>Couldn't load this</Text>
            <Text style={styles.errorText}>{practiceError}</Text>
          </View>
        ) : null}

        {step === 'choose' && !hideChooser && (
          <>
            <Text style={styles.sectionTitle}>Pick a practice</Text>
            <Text style={styles.mutedText}>Recommended first. One gentle step at a time.</Text>

            {practicePath.length > 0 ? (
              <View style={{ marginTop: TodaySpacing[12] }}>
                {practicePath.map((p, idx) => (
                  <PracticeCard
                    key={p.id}
                    practice={p}
                    colorIndex={idx}
                    recommended={!!recommended?.id && p.id === recommended.id}
                    disabled={practiceLoading}
                    loading={practiceLoading && startingPracticeId === p.id}
                    onStart={() => handleStart(p)}
                  />
                ))}
              </View>
            ) : (
              <Text style={[styles.mutedText, { marginTop: TodaySpacing[12] }]}>
                No practices yet.
              </Text>
            )}

            <View style={{ marginTop: TodaySpacing[4] }}>
              <Pressable style={styles.secondaryButton} onPress={onClose} disabled={practiceLoading}>
                <Text style={styles.secondaryButtonText}>Maybe later</Text>
              </Pressable>
            </View>
          </>
        )}

        {step === 'choose' && hideChooser && (
          <View style={{ paddingTop: TodaySpacing[12] }}>
            <Text style={styles.sectionTitle}>Starting…</Text>
            <Text style={styles.mutedText}>Preparing your practice.</Text>
            <View style={{ marginTop: TodaySpacing[12], alignItems: 'center' }}>
              <ActivityIndicator color={TodayColors.ctaSecondary} />
            </View>
          </View>
        )}

        {step === 'active' && activePractice && (
          <>
            <View style={styles.activeHeader}>
              <Text style={styles.activeTitle}>{activePractice.title}</Text>
              <Text style={styles.activeGoal}>{activePractice.goal}</Text>
              <Text style={styles.activeMeta}>
                {coreTrait?.emoji || '•'} {coreTrait?.name || 'Trait'} • {activePractice.duration_minutes} min
              </Text>
            </View>

            {(hadith?.translation || (quran && 'translation' in quran && quran.translation)) ? (
              <View style={styles.sunnahBox}>
                {quran && 'translation' in quran && quran.translation ? (
                  <View style={{ marginBottom: TodaySpacing[12] }}>
                    <Text style={styles.sunnahTitle}>Quran</Text>
                    {'arabic' in quran && quran.arabic ? (
                      <Text style={styles.arabicText}>{quran.arabic}</Text>
                    ) : null}
                    <Text style={styles.sunnahText}>{quran.translation}</Text>
                    {'surah' in quran && quran.surah ? (
                      <Text style={styles.sunnahRef}>
                        {quran.surah}
                        {'ayah' in quran && quran.ayah ? ` ${quran.ayah}` : ''}
                      </Text>
                    ) : null}
                  </View>
                ) : null}

                {hadith?.translation ? (
                  <>
                    <Text style={styles.sunnahTitle}>Hadith</Text>
                    <Text style={styles.sunnahText}>{hadith.translation}</Text>
                    {'reference' in hadith && hadith.reference ? (
                      <Text style={styles.sunnahRef}>{hadith.reference}</Text>
                    ) : null}
                  </>
                ) : null}
                {dua?.translation ? (
                  <View style={{ marginTop: TodaySpacing[12] }}>
                    <Text style={styles.sunnahTitle}>Dua</Text>
                    {'arabic' in dua && dua.arabic ? <Text style={styles.arabicText}>{dua.arabic}</Text> : null}
                    <Text style={styles.sunnahText}>{dua.translation}</Text>
                    {'transliteration' in dua && dua.transliteration ? (
                      <Text style={styles.sunnahRef}>{dua.transliteration}</Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
            ) : null}

            {activePractice.safety_note ? (
              <View style={styles.safetyBox}>
                <Text style={styles.safetyTitle}>Safety note</Text>
                <Text style={styles.safetyText}>{activePractice.safety_note}</Text>
              </View>
            ) : null}

            <Text style={styles.sectionTitle}>Steps</Text>
            <View style={styles.card}>
              {activePractice.steps.map((s, idx) => (
                <Text key={`${activePractice.id}-step-${idx}`} style={styles.stepText}>
                  {idx + 1}. {s}
                </Text>
              ))}
            </View>

            {activePractice.what_to_say.length > 0 ? (
              <>
                <Text style={[styles.sectionTitle, { marginTop: TodaySpacing[16] }]}>What to say</Text>
                <View style={styles.card}>
                  {activePractice.what_to_say.map((w, idx) => (
                    <Text key={`${activePractice.id}-say-${idx}`} style={styles.sayText}>
                      “{stripOuterQuotes(w)}”
                    </Text>
                  ))}
                </View>
              </>
            ) : null}

            {activePractice.if_child_resists ? (
              <>
                <Text style={[styles.sectionTitle, { marginTop: TodaySpacing[16] }]}>If your child resists</Text>
                <View style={styles.card}>
                  <Text style={styles.mutedText}>{activePractice.if_child_resists}</Text>
                </View>
              </>
            ) : null}

            <Text style={[styles.sectionTitle, { marginTop: TodaySpacing[16] }]}>Reflection (optional)</Text>
            <View style={styles.card}>
              {activePractice.reflection_prompts.slice(0, 2).map((p, idx) => (
                <Text key={`${activePractice.id}-ref-${idx}`} style={styles.refPrompt}>
                  • {p}
                </Text>
              ))}
              <TextInput
                style={styles.noteInput}
                placeholder="Add a short note..."
                placeholderTextColor={TodayColors.textMuted}
                value={reflectionNote}
                onChangeText={setReflectionNote}
                multiline
                maxLength={240}
              />
            </View>

            <View style={styles.actionRow}>
              <Pressable
                style={[styles.primaryButton, !canDone && styles.primaryButtonDisabled]}
                onPress={handleDone}
                disabled={!canDone}
              >
                {practiceLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryButtonText}>Mark done</Text>
                )}
              </Pressable>

              <Pressable style={styles.secondaryButton} onPress={handleStopForNow}>
                <Text style={styles.secondaryButtonText}>Stop for now</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: TodaySpacing[16],
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  cardTitle: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textPrimary,
    flexShrink: 1,
  },
  recommendedPill: {
    backgroundColor: 'rgba(245,158,11,0.14)',
    borderRadius: TodayRadii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.28)',
  },
  recommendedText: {
    ...TodayTypography.captionS,
    fontFamily: TodayTypography.bricolageBold,
    color: '#92400E',
  },
  cardGoal: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textSecondary,
    marginTop: TodaySpacing[4],
  },
  cardWhen: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textMuted,
    marginTop: TodaySpacing[4],
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: TodaySpacing[8],
  },
  metaChip: {
    backgroundColor: 'rgba(17,24,39,0.04)',
    borderRadius: TodayRadii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(17,24,39,0.08)',
  },
  metaChipText: {
    ...TodayTypography.captionS,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textMuted,
  },
  sectionTitle: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.bricolageBold,
    color: '#1A5F4A',
    marginBottom: TodaySpacing[8],
  },
  mutedText: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: '#78716C',
  },
  card: {
    backgroundColor: TodayColors.card,
    borderRadius: TodayRadii.md,
    padding: TodaySpacing[16],
    borderWidth: 1,
    borderColor: TodayColors.strokeSubtle,
  },
  errorBox: {
    backgroundColor: '#FFF1F2',
    borderRadius: TodayRadii.md,
    padding: TodaySpacing[16],
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.25)',
    marginBottom: TodaySpacing[12],
  },
  errorTitle: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.bricolageBold,
    color: '#991B1B',
    marginBottom: TodaySpacing[4],
  },
  errorText: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: '#7F1D1D',
  },
  pathRow: {
    flexDirection: 'row',
    gap: TodaySpacing[12],
    marginBottom: TodaySpacing[8],
  },
  pathLeft: {
    width: 36,
    alignItems: 'center',
  },
  pathCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'rgba(17,24,39,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pathCircleSelected: {
    borderColor: TodayColors.ctaPrimary,
    backgroundColor: '#E8F5E9',
  },
  pathCircleText: {
    fontSize: 12,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textMuted,
  },
  pathCircleTextSelected: {
    color: '#1A5F4A',
  },
  pathLine: {
    width: 4,
    flex: 1,
    backgroundColor: 'rgba(17,24,39,0.10)',
    borderRadius: 2,
    marginTop: TodaySpacing[8],
  },
  pathCard: {
    flex: 1,
    backgroundColor: TodayColors.card,
    borderRadius: TodayRadii.md,
    padding: TodaySpacing[16],
    borderWidth: 2,
    borderColor: 'rgba(17,24,39,0.10)',
  },
  pathCardSelected: {
    borderColor: TodayColors.ctaPrimary,
    backgroundColor: '#E8F5E9',
  },
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: TodaySpacing[4],
  },
  practiceTitle: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.bricolageBold,
    color: '#1A5F4A',
    flexShrink: 1,
  },
  practiceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  practiceMetaText: {
    ...TodayTypography.captionS,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textMuted,
  },
  practiceMetaDot: {
    ...TodayTypography.captionS,
    color: '#A3A3A3',
  },
  practiceGoal: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textSecondary,
  },
  actionRow: {
    marginTop: TodaySpacing[16],
    gap: TodaySpacing[12],
  },
  primaryButton: {
    backgroundColor: TodayColors.ctaPrimary,
    borderRadius: TodayRadii.md,
    paddingVertical: TodaySpacing[12],
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    backgroundColor: TodayColors.ctaDisabled,
  },
  primaryButtonText: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textInverse,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: TodayRadii.md,
    paddingVertical: TodaySpacing[12],
    alignItems: 'center',
    borderWidth: 2,
    borderColor: TodayColors.strokeStrong,
  },
  secondaryButtonText: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textSecondary,
  },
  activeHeader: {
    marginBottom: TodaySpacing[12],
  },
  activeTitle: {
    ...TodayTypography.titleM,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textPrimary,
    marginBottom: TodaySpacing[4],
  },
  activeGoal: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textSecondary,
    marginBottom: TodaySpacing[8],
  },
  activeMeta: {
    ...TodayTypography.captionS,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textMuted,
  },
  sunnahBox: {
    backgroundColor: 'rgba(28,176,246,0.08)',
    borderRadius: TodayRadii.md,
    padding: TodaySpacing[16],
    borderWidth: 1,
    borderColor: 'rgba(28,176,246,0.20)',
    marginBottom: TodaySpacing[12],
  },
  sunnahTitle: {
    ...TodayTypography.captionS,
    fontFamily: TodayTypography.bricolageBold,
    color: '#0B4A6F',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: TodaySpacing[4],
  },
  sunnahText: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textPrimary,
  },
  sunnahRef: {
    ...TodayTypography.captionS,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textMuted,
    marginTop: TodaySpacing[6],
  },
  arabicText: {
    marginTop: TodaySpacing[6],
    marginBottom: TodaySpacing[6],
    fontSize: 16,
    lineHeight: 26,
    color: TodayColors.textPrimary,
    textAlign: 'right',
    fontFamily: 'System',
  },
  safetyBox: {
    backgroundColor: '#FFF9E6',
    borderRadius: TodayRadii.md,
    padding: TodaySpacing[16],
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.25)',
    marginBottom: TodaySpacing[12],
  },
  safetyTitle: {
    ...TodayTypography.captionS,
    fontFamily: TodayTypography.bricolageBold,
    color: '#92400E',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: TodaySpacing[4],
  },
  safetyText: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: '#92400E',
  },
  stepText: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textPrimary,
    marginBottom: TodaySpacing[8],
  },
  sayText: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textPrimary,
    marginBottom: TodaySpacing[8],
  },
  refPrompt: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textSecondary,
    marginBottom: TodaySpacing[8],
  },
  noteInput: {
    marginTop: TodaySpacing[8],
    minHeight: 72,
    borderRadius: TodayRadii.md,
    borderWidth: 1,
    borderColor: TodayColors.strokeSubtle,
    padding: TodaySpacing[12],
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textPrimary,
    backgroundColor: '#FAFAFA',
  },
});
