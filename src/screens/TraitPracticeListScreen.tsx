import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@/navigation/types';
import { getTraitById as getCoreTraitById } from '@/data/characterScenarios';
import { getPracticesForTrait, pickRecommendedPractice, type PracticeDifficulty } from '@/data/traitPractices';
import { useAuthStore } from '@/store/authStore';
import { useCharacterStore } from '@/store/characterStore';
import { useUserPreferencesStore } from '@/store/userPreferencesStore';
import { PracticeDeckCard } from '@/components/character/PracticeDeckCard';
import { TraitPracticeSessionSheet } from '@/components/character/TraitPracticeSessionSheet';
import { TodayColors, TodaySpacing, TodayTypography } from '@/constants/todayTokens';

type Props = NativeStackScreenProps<RootStackParamList, 'TraitPracticeList'>;

function treeStateToDifficulty(treeState: 'thriving' | 'growing' | 'needs_attention' | 'wilting'): PracticeDifficulty {
  if (treeState === 'thriving') return 2;
  if (treeState === 'growing') return 1.5;
  return 1;
}

export function TraitPracticeListScreen({ navigation, route }: Props) {
  const { traitId } = route.params;
  const user = useAuthStore((state) => state.user);
  const trait = useMemo(() => getCoreTraitById(traitId), [traitId]);

  const treeState = useCharacterStore((state) => state.getTreeState(traitId));
  const ageGroup = useUserPreferencesStore((state) => state.ageGroup);
  const loadPreferences = useUserPreferencesStore((state) => state.load);

  const [activePracticeId, setActivePracticeId] = useState<string | null>(null);
  const [showSession, setShowSession] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    loadPreferences(user.id);
  }, [loadPreferences, user?.id]);

  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - 32, 420);
  const cardHeight = Math.round(cardWidth * 1.25);

  const allPractices = useMemo(() => getPracticesForTrait(traitId as any), [traitId]);
  const difficultyTarget = useMemo(() => treeStateToDifficulty(treeState), [treeState]);
  const { recommended, alternatives } = useMemo(
    () => pickRecommendedPractice(allPractices, ageGroup, difficultyTarget),
    [ageGroup, allPractices, difficultyTarget]
  );

  const practiceList = useMemo(() => {
    const items = [];
    if (recommended) items.push(recommended);
    for (const a of alternatives) items.push(a);
    return items;
  }, [alternatives, recommended]);

  const handleStart = (practiceId: string) => {
    if (!user?.id) return;
    setActivePracticeId(practiceId);
    setShowSession(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerButton} accessibilityRole="button">
          <Text style={styles.headerButtonText}>{'<'}</Text>
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {trait?.emoji || '🌱'} {trait?.name || 'Trait'}
          </Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            Pick one practice. Small steps, real growth.
          </Text>
        </View>
        <View style={styles.headerButton} />
      </View>

      {!user?.id ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator color={TodayColors.ctaSecondary} />
          <Text style={styles.loadingText}>Loading…</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {practiceList.map((practice, idx) => {
            const isRecommended = !!recommended && practice.id === recommended.id;
            const label = isRecommended ? 'RECOMMENDED' : 'PRACTICE';
            const progressLabel = `${idx + 1} / ${practiceList.length}`;

            return (
              <View key={practice.id} style={{ alignItems: 'center', marginBottom: 18 }}>
                <PracticeDeckCard
                  practice={practice}
                  label={label}
                  progressLabel={progressLabel}
                  width={cardWidth}
                  height={cardHeight}
                  visualIndex={idx}
                  recommended={isRecommended}
                  loading={false}
                  onStart={() => handleStart(practice.id)}
                />
              </View>
            );
          })}

          <View style={{ height: TodaySpacing[24] }} />
        </ScrollView>
      )}

      {user?.id && activePracticeId ? (
        <TraitPracticeSessionSheet
          visible={showSession}
          userId={user.id}
          traitId={traitId}
          practiceId={activePracticeId}
          treeState={treeState}
          onClose={() => {
            setShowSession(false);
            setActivePracticeId(null);
          }}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TodayColors.bgApp,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(17,24,39,0.08)',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(17,24,39,0.06)',
  },
  headerButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: TodayColors.textSecondary,
  },
  headerCenter: {
    flex: 1,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textPrimary,
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 12,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textMuted,
  },
  scrollContent: {
    paddingTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  loadingText: {
    fontSize: 14,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textMuted,
  },
});
