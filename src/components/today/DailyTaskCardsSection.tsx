import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { Button } from '@/components/common/Button';
import { DailyTaskDeck } from '@/components/today/DailyTaskDeck';
import {
  TodayColors,
  TodayRadii,
  TodaySpacing,
  TodayTypography,
  TodayMotion,
} from '@/constants/todayTokens';
import type { DailyTask } from '@/types/models';

interface TodaysTasks {
  dayTasks: DailyTask[];
  niceToHaveTasks: DailyTask[];
}

interface Props {
  todaysTasks: TodaysTasks;
  completions: Record<string, boolean>;
  completionPercentage: number;
  onTaskPress: (task: DailyTask) => void;
  onTaskComplete: (taskId: string, isCompleted: boolean) => void;
  onRefresh: () => void;
  onDeckInteractionChange?: (isInteracting: boolean) => void;
}

function ProgressBar({ percentage }: { percentage: number }) {
  const animatedWidth = useAnimatedStyle(() => ({
    width: withTiming(`${Math.max(0, Math.min(100, percentage))}%`, {
      duration: TodayMotion.smooth.duration,
    }),
  }));

  return (
    <View style={progressStyles.track}>
      <Animated.View style={[progressStyles.fill, animatedWidth]} />
    </View>
  );
}

const progressStyles = StyleSheet.create({
  track: {
    height: 16,
    borderRadius: TodayRadii.pill,
    backgroundColor: TodayColors.progressTrack,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: TodayColors.strokeSubtle,
  },
  fill: {
    height: '100%',
    backgroundColor: TodayColors.progressFill,
    borderRadius: TodayRadii.pill,
  },
});

export function DailyTaskCardsSection({
  todaysTasks,
  completions,
  completionPercentage,
  onTaskPress,
  onTaskComplete,
  onRefresh,
  onDeckInteractionChange,
}: Props) {
  const { dayTasks, niceToHaveTasks } = todaysTasks;

  const deckTasks = useMemo(() => {
    const must = dayTasks.slice(0, 3);
    const nice = niceToHaveTasks.slice(0, 4);
    return [...must, ...nice];
  }, [dayTasks, niceToHaveTasks]);

  const completedCount = useMemo(() => {
    return deckTasks.filter((t) => completions[t.id]).length;
  }, [completions, deckTasks]);

  const totalCount = deckTasks.length;
  const goalsLeft = Math.max(0, totalCount - completedCount);

  const mustCount = Math.min(3, dayTasks.length);
  const bonusCount = deckTasks.length - mustCount;

  if (deckTasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>⏳</Text>
          <Text style={styles.emptyTitle}>Loading your tasks...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header - "Your 7 for Today" */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>
            Your {totalCount} for Today
          </Text>
          <Text style={styles.headerSubtitle}>
            {completedCount}/{totalCount} done
            {goalsLeft > 0 ? ` • ${goalsLeft} left` : ' • All done!'}
          </Text>
        </View>

        <Pressable onPress={onRefresh} hitSlop={10}>
          {({ pressed }) => (
            <View
              style={[
                styles.refreshButton,
                pressed && styles.refreshButtonPressed,
              ]}
            >
              <Text style={styles.refreshButtonText}>Shuffle</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressWrapper}>
        <ProgressBar percentage={completionPercentage} />
        <Text style={styles.progressLabel}>
          {completionPercentage}%
        </Text>
      </View>

      {/* Category Chips */}
      <View style={styles.chipsRow}>
        <View style={styles.mustDoChip}>
          <Text style={styles.mustDoChipText}>
            {mustCount} must-do
          </Text>
        </View>
        <View style={styles.bonusChip}>
          <Text style={styles.bonusChipText}>
            {bonusCount} bonus
          </Text>
        </View>
      </View>

      {/* Deck */}
      <View style={styles.deckWrapper}>
        <DailyTaskDeck
          tasks={deckTasks}
          mustCount={mustCount}
          completions={completions}
          onOpenDetails={onTaskPress}
          onToggleComplete={onTaskComplete}
          onInteractionChange={onDeckInteractionChange}
        />
      </View>

      {/* Completion celebration */}
      {completionPercentage === 100 && (
        <View style={styles.celebrationWrapper}>
          <View style={styles.celebrationCard}>
            <Text style={styles.celebrationEmoji}>🏆</Text>
            <Text style={styles.celebrationTitle}>MashAllah! All done!</Text>
            <Text style={styles.celebrationSubtitle}>
              You completed today's tasks.
            </Text>
          </View>

          <View style={styles.refreshFullWrapper}>
            <Button
              title="Get new tasks"
              variant="secondary"
              fullWidth
              onPress={onRefresh}
              textStyle={{ textTransform: 'none' }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: TodaySpacing[14],
  },
  emptyContainer: {
    marginTop: TodaySpacing[16],
  },
  emptyCard: {
    backgroundColor: TodayColors.bgCard,
    borderRadius: TodayRadii.xl,
    borderWidth: 2,
    borderColor: TodayColors.strokeMedium,
    padding: TodaySpacing[20],
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 28,
    marginBottom: TodaySpacing[6],
  },
  emptyTitle: {
    fontSize: TodayTypography.bodyLarge.fontSize,
    lineHeight: TodayTypography.bodyLarge.lineHeight,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: TodayTypography.h2.fontSize,
    lineHeight: TodayTypography.h2.lineHeight,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.accentTeal,
  },
  headerSubtitle: {
    marginTop: TodaySpacing[2],
    fontSize: TodayTypography.body.fontSize,
    lineHeight: TodayTypography.body.lineHeight,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textMuted,
  },
  refreshButton: {
    paddingHorizontal: TodaySpacing[12],
    paddingVertical: TodaySpacing[10],
    borderRadius: TodayRadii.md,
    backgroundColor: TodayColors.infoBg,
    borderWidth: 2,
    borderColor: TodayColors.infoBorder,
  },
  refreshButtonPressed: {
    backgroundColor: 'rgba(28,176,246,0.18)',
  },
  refreshButtonText: {
    fontSize: TodayTypography.caption.fontSize,
    lineHeight: TodayTypography.caption.lineHeight,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.ctaSecondary,
  },
  progressWrapper: {
    marginTop: TodaySpacing[12],
    flexDirection: 'row',
    alignItems: 'center',
    gap: TodaySpacing[10],
  },
  progressLabel: {
    fontSize: TodayTypography.caption.fontSize,
    lineHeight: TodayTypography.caption.lineHeight,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.successDark,
    minWidth: 36,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: TodaySpacing[10],
    marginTop: TodaySpacing[12],
  },
  mustDoChip: {
    backgroundColor: TodayColors.successBg,
    borderRadius: TodayRadii.pill,
    paddingVertical: TodaySpacing[6],
    paddingHorizontal: TodaySpacing[12],
    borderWidth: 2,
    borderColor: TodayColors.successBorder,
  },
  mustDoChipText: {
    fontSize: TodayTypography.caption.fontSize,
    lineHeight: TodayTypography.caption.lineHeight,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.successDark,
  },
  bonusChip: {
    backgroundColor: TodayColors.infoBg,
    borderRadius: TodayRadii.pill,
    paddingVertical: TodaySpacing[6],
    paddingHorizontal: TodaySpacing[12],
    borderWidth: 2,
    borderColor: TodayColors.infoBorder,
  },
  bonusChipText: {
    fontSize: TodayTypography.caption.fontSize,
    lineHeight: TodayTypography.caption.lineHeight,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.ctaSecondaryPressed,
  },
  deckWrapper: {
    marginTop: TodaySpacing[14],
  },
  celebrationWrapper: {
    marginTop: TodaySpacing[12],
  },
  celebrationCard: {
    backgroundColor: TodayColors.warningBg,
    borderRadius: TodayRadii.xl,
    borderWidth: 3,
    borderColor: TodayColors.warning,
    padding: TodaySpacing[20],
    alignItems: 'center',
  },
  celebrationEmoji: {
    fontSize: 36,
  },
  celebrationTitle: {
    marginTop: TodaySpacing[6],
    fontSize: TodayTypography.h3.fontSize,
    lineHeight: TodayTypography.h3.lineHeight,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.warningDark,
  },
  celebrationSubtitle: {
    marginTop: TodaySpacing[2],
    fontSize: TodayTypography.body.fontSize,
    lineHeight: TodayTypography.body.lineHeight,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: '#B45309',
  },
  refreshFullWrapper: {
    marginTop: TodaySpacing[12],
  },
});
