import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { MomentType } from '@/types/models';
import { TodayColors, TodayRadii, TodaySpacing, TodayTypography } from '@/constants/todayTokens';
import { useCharacterStore } from '@/store/characterStore';
import { checkInterventionAfterMoment } from '@/store/coachingStore';
import {
  celebrationHaptic,
  lightHaptic,
  selectionHaptic,
  struggleHaptic,
  successHaptic,
} from '@/utils/haptics';
import { TraitSelector } from './TraitSelector';
import { ScenarioSelector } from './ScenarioSelector';
import { MomentConfirmation } from './MomentConfirmation';
import { TraitPracticeFlow } from './TraitPracticeFlow';
import { getTraitById } from '@/data/characterScenarios';

type Mode = 'practice' | 'log';
type ViewStep = 'trait' | 'practice' | 'log' | 'success';

interface Props {
  visible: boolean;
  userId: string;
  onClose: () => void;
  defaultMode?: Mode;
  initialTraitId?: string | null;
  allowPractice?: boolean;
}

export function QuickCaptureSheet({
  visible,
  userId,
  onClose,
  defaultMode = 'practice',
  initialTraitId = null,
  allowPractice = true,
}: Props) {
  const effectiveDefaultMode: Mode = allowPractice ? defaultMode : 'log';
  const [mode, setMode] = useState<Mode>(effectiveDefaultMode);
  const [view, setView] = useState<ViewStep>('trait');
  const [selectedTraitId, setSelectedTraitId] = useState<string | null>(null);

  // Logging flow state
  const [momentType, setMomentType] = useState<MomentType>('positive');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [customNote, setCustomNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ leveledUp: boolean; newLevel?: number } | null>(null);

  const logMoment = useCharacterStore((state) => state.logMoment);
  const getTreeState = useCharacterStore((state) => state.getTreeState);

  const selectedTrait = useMemo(
    () => (selectedTraitId ? getTraitById(selectedTraitId) : undefined),
    [selectedTraitId]
  );

  const resetState = () => {
    setMode(effectiveDefaultMode);
    setSelectedTraitId(initialTraitId);
    setView(initialTraitId ? (effectiveDefaultMode === 'practice' ? 'practice' : 'log') : 'trait');
    setMomentType('positive');
    setSelectedScenarioId(null);
    setCustomNote('');
    setIsSubmitting(false);
    setSuccessData(null);
  };

  useEffect(() => {
    if (!visible) return;
    resetState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, defaultMode, effectiveDefaultMode, initialTraitId]);

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleBack = () => {
    if (view === 'practice' || view === 'log') {
      setView('trait');
      setSelectedTraitId(null);
      setSelectedScenarioId(null);
      setCustomNote('');
      setSuccessData(null);
      return;
    }
  };

  const handleModeChange = (next: Mode) => {
    if (!allowPractice && next === 'practice') return;
    if (next === mode) return;
    selectionHaptic();
    setMode(next);
    setSelectedScenarioId(null);
    setCustomNote('');
    setSuccessData(null);
    if (selectedTraitId) {
      setView(next === 'practice' ? 'practice' : 'log');
    } else {
      setView('trait');
    }
  };

  const handleTraitSelect = (traitId: string) => {
    lightHaptic();
    setSelectedTraitId(traitId);
    setSelectedScenarioId(null);
    setCustomNote('');
    setSuccessData(null);
    setView(mode === 'practice' ? 'practice' : 'log');
  };

  const handleScenarioSelect = (scenarioId: string) => {
    selectionHaptic();
    setSelectedScenarioId(scenarioId);
  };

  const handleSubmitLog = async () => {
    if (!selectedTraitId || !selectedScenarioId) return;

    setIsSubmitting(true);
    const result = await logMoment(
      userId,
      selectedTraitId,
      momentType,
      selectedScenarioId,
      customNote.trim() || undefined
    );
    setIsSubmitting(false);

    if (!result.success) return;

    if (result.leveledUp) {
      celebrationHaptic();
    } else if (momentType === 'positive') {
      successHaptic();
    } else {
      struggleHaptic();
    }

    setSuccessData({ leveledUp: result.leveledUp, newLevel: result.newLevel });
    setView('success');

    if (momentType === 'struggle') {
      checkInterventionAfterMoment(userId);
    }
  };

  const canSubmitLog = !!selectedTraitId && !!selectedScenarioId && !isSubmitting;

  const headerTitle = useMemo(() => {
    if (view === 'practice' && selectedTraitId) return `Nurture ${selectedTrait?.name || 'Trait'}`;
    if (mode === 'log') return 'Log a moment';
    return 'Tarbiyah Coach';
  }, [mode, selectedTrait?.name, selectedTraitId, view]);

  const traitPickerTitle = mode === 'practice' ? 'Pick a trait to practice' : 'Pick a trait to log';

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <Pressable style={styles.backdrop} onPress={handleClose} />

        <View style={styles.sheet}>
          {view === 'success' && selectedTraitId && successData && (
            <MomentConfirmation
              traitId={selectedTraitId}
              momentType={momentType}
              leveledUp={successData.leveledUp}
              newLevel={successData.newLevel}
              onComplete={handleClose}
            />
          )}

          {view !== 'success' && (
            <>
              <View style={styles.header}>
                {view !== 'trait' ? (
                  <Pressable onPress={handleBack} style={styles.backButton}>
                    <Text style={styles.backText}>{'<'}</Text>
                  </Pressable>
                ) : (
                  <View style={styles.backButton} />
                )}

                <View style={styles.headerCenter}>
                  <Text style={styles.headerTitle} numberOfLines={1}>
                    {headerTitle}
                  </Text>
                  {view === 'practice' && selectedTrait ? (
                    <Text style={styles.headerSubtitle} numberOfLines={1}>
                      {selectedTrait.emoji} {selectedTrait.name}
                    </Text>
                  ) : null}
                </View>

                <Pressable onPress={handleClose} style={styles.closeButton}>
                  <Text style={styles.closeText}>x</Text>
                </Pressable>
              </View>

              <View style={styles.handle} />

              {view !== 'success' && allowPractice ? (
                <View style={styles.segment}>
                  <Pressable
                    style={[styles.segmentItem, mode === 'practice' && styles.segmentItemActive]}
                    onPress={() => handleModeChange('practice')}
                  >
                    <Text style={[styles.segmentText, mode === 'practice' && styles.segmentTextActive]}>
                      Practice
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.segmentItem, mode === 'log' && styles.segmentItemActive]}
                    onPress={() => handleModeChange('log')}
                  >
                    <Text style={[styles.segmentText, mode === 'log' && styles.segmentTextActive]}>
                      Log
                    </Text>
                  </Pressable>
                </View>
              ) : null}

              {view === 'trait' ? (
                <>
                  <TraitSelector
                    selectedTraitId={selectedTraitId}
                    onSelectTrait={handleTraitSelect}
                    title={traitPickerTitle}
                  />

                  {mode === 'practice' ? (
                    <Text style={styles.footerHint}>
                      Choose one small practice. Keep it gentle.
                    </Text>
                  ) : (
                    <Text style={styles.footerHint}>
                      Quick logs help you see patterns over time.
                    </Text>
                  )}
                </>
              ) : null}

              {view === 'practice' && selectedTraitId ? (
                <TraitPracticeFlow
                  active={visible && view === 'practice'}
                  userId={userId}
                  traitId={selectedTraitId}
                  treeState={getTreeState(selectedTraitId)}
                  onClose={handleClose}
                />
              ) : null}

              {view === 'log' && selectedTraitId ? (
                <View style={styles.logContent}>
                  <ScenarioSelector
                    traitId={selectedTraitId}
                    momentType={momentType}
                    selectedScenarioId={selectedScenarioId}
                    onSelectMomentType={setMomentType}
                    onSelectScenario={handleScenarioSelect}
                  />

                  <View style={styles.noteContainer}>
                    <Text style={styles.noteLabel}>Add a note (optional)</Text>
                    <TextInput
                      style={styles.noteInput}
                      placeholder="What happened?"
                      placeholderTextColor={TodayColors.textMuted}
                      value={customNote}
                      onChangeText={setCustomNote}
                      multiline
                      maxLength={200}
                    />
                  </View>

                  <View style={styles.submitContainer}>
                    <Pressable
                      style={[styles.primaryButton, !canSubmitLog && styles.primaryButtonDisabled]}
                      onPress={handleSubmitLog}
                      disabled={!canSubmitLog}
                    >
                      {isSubmitting ? (
                        <ActivityIndicator color="#FFFFFF" />
                      ) : (
                        <Text style={styles.primaryButtonText}>Log</Text>
                      )}
                    </Pressable>
                  </View>
                </View>
              ) : null}
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    backgroundColor: '#FAF9F6',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    minHeight: 420,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: TodaySpacing[16],
    paddingTop: TodaySpacing[16],
    paddingBottom: TodaySpacing[8],
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: TodaySpacing[12],
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: TodayTypography.bricolageBold,
    color: '#1A5F4A',
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 12,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textMuted,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  backText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#78716C',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  closeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#78716C',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#D4D4D4',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: 'rgba(17,24,39,0.06)',
    borderRadius: TodayRadii.pill,
    padding: 4,
    marginHorizontal: TodaySpacing[16],
    marginBottom: TodaySpacing[12],
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: TodayRadii.pill,
    alignItems: 'center',
  },
  segmentItemActive: {
    backgroundColor: TodayColors.card,
    borderWidth: 1,
    borderColor: TodayColors.strokeSubtle,
  },
  segmentText: {
    fontSize: 12,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  segmentTextActive: {
    color: TodayColors.textPrimary,
  },
  footerHint: {
    marginTop: TodaySpacing[12],
    marginBottom: TodaySpacing[16],
    paddingHorizontal: TodaySpacing[16],
    fontSize: 12,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textMuted,
    textAlign: 'center',
  },
  logContent: {
    paddingHorizontal: TodaySpacing[16],
    paddingBottom: TodaySpacing[16],
  },
  noteContainer: {
    marginTop: TodaySpacing[12],
  },
  noteLabel: {
    fontSize: 12,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textSecondary,
    marginBottom: TodaySpacing[8],
  },
  noteInput: {
    minHeight: 88,
    borderRadius: TodayRadii.md,
    borderWidth: 1,
    borderColor: TodayColors.strokeSubtle,
    padding: TodaySpacing[12],
    backgroundColor: TodayColors.card,
    fontSize: 14,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textPrimary,
    textAlignVertical: 'top',
  },
  submitContainer: {
    marginTop: TodaySpacing[16],
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
    fontSize: 14,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textInverse,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
