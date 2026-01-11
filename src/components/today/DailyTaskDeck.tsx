import React, { useCallback, useMemo, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Button } from '@/components/common/Button';
import { getDailyTaskTheme } from '@/constants/dailyTaskThemes';
import {
  TodayColors,
  TodayRadii,
  TodayShadows,
  TodaySpacing,
  TodayTypography,
  TodayMotion,
} from '@/constants/todayTokens';
import type { DailyTask } from '@/types/models';

interface Props {
  tasks: DailyTask[];
  mustCount: number;
  completions: Record<string, boolean>;
  onOpenDetails: (task: DailyTask) => void;
  onToggleComplete: (taskId: string, isCompleted: boolean) => void;
  onInteractionChange?: (isInteracting: boolean) => void;
}

const CARD_RADIUS = TodayRadii.xxl;
const CARD_BORDER = 3;
const CARD_PADDING = TodaySpacing[16];
const CARD_SHADOW_HEIGHT = TodayShadows.cardLedge.height;

const springConfig = TodayMotion.spring;

function clampValue(value: number, min: number, max: number): number {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

function DeckCard({
  task,
  label,
  progressLabel,
  isCompleted,
  cardWidth,
  cardHeight,
  onOpenDetails,
  onToggleComplete,
}: {
  task: DailyTask;
  label: string;
  progressLabel: string;
  isCompleted: boolean;
  cardWidth: number;
  cardHeight: number;
  onOpenDetails: () => void;
  onToggleComplete: () => void;
}) {
  const theme = getDailyTaskTheme(task);
  const title = task.title; // Always show full title
  const isMustDo = label === 'MUST-DO';

  return (
    <View style={{ width: cardWidth, height: cardHeight }}>
      {/* Shadow layer */}
      <View
        style={[
          cardStyles.shadow,
          {
            top: CARD_SHADOW_HEIGHT,
            borderRadius: CARD_RADIUS,
          },
        ]}
      />

      {/* Card surface */}
      <View
        style={[
          cardStyles.surface,
          {
            borderRadius: CARD_RADIUS,
            backgroundColor: theme.themeColor,
            borderColor: isCompleted ? TodayColors.success : TodayColors.strokeMedium,
          },
        ]}
      >
        {/* Illustration zone (35% height) */}
        <Pressable
          onPress={onOpenDetails}
          accessibilityRole="button"
          accessibilityLabel={`View details for ${title}`}
          style={cardStyles.illustrationZone}
        >
          <ImageBackground
            source={theme.image}
            resizeMode="contain"
            style={cardStyles.illustration}
          />
        </Pressable>

        {/* Content zone */}
        <View style={cardStyles.contentZone}>
          {/* Top row: category chip + progress */}
          <View style={cardStyles.topRow}>
            <View
              style={[
                cardStyles.categoryChip,
                isMustDo ? cardStyles.mustDoChip : cardStyles.bonusChip,
              ]}
            >
              <Text
                style={[
                  cardStyles.categoryChipText,
                  { color: isMustDo ? TodayColors.successDark : TodayColors.ctaSecondaryPressed },
                ]}
              >
                {label}
              </Text>
            </View>

            <View style={cardStyles.progressChip}>
              <Text style={cardStyles.progressChipText}>{progressLabel}</Text>
            </View>
          </View>

          {/* Title + Icon */}
          <View style={cardStyles.titleRow}>
            {task.icon && <Text style={cardStyles.taskIcon}>{task.icon}</Text>}
            <Text style={cardStyles.title} numberOfLines={2}>
              {title}
            </Text>
          </View>

          {/* YOUR TASK box - The key redesign element */}
          <View style={cardStyles.taskBox}>
            <Text style={cardStyles.taskBoxLabel}>YOUR TASK:</Text>
            <Text style={cardStyles.taskBoxText} numberOfLines={3}>
              {task.description || task.title}
            </Text>
          </View>

          {/* Metadata row */}
          <View style={cardStyles.metadataRow}>
            <Text style={cardStyles.metadataText}>⏱ ~5 min</Text>
            <Text style={cardStyles.metadataDot}>•</Text>
            <Text style={cardStyles.metadataText}>
              {task.category.replace(/_/g, ' ')}
            </Text>
          </View>

          {/* Action buttons */}
          <View style={cardStyles.actionsRow}>
            <Button
              title={isCompleted ? 'Done!' : 'Done!'}
              variant={isCompleted ? 'outline' : 'primary'}
              size="lg"
              fullWidth
              onPress={onToggleComplete}
              leftIcon={
                <Text style={{ fontSize: 18 }}>{isCompleted ? '✓' : '○'}</Text>
              }
              textStyle={{ textTransform: 'none' }}
            />
          </View>

          {/* Secondary link */}
          <Pressable onPress={onOpenDetails} style={cardStyles.detailsLink}>
            <Text style={cardStyles.detailsLinkText}>See tips & examples →</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: TodayShadows.cardLedge.color,
  },
  surface: {
    flex: 1,
    overflow: 'hidden',
    borderWidth: CARD_BORDER,
    marginBottom: CARD_SHADOW_HEIGHT,
  },
  illustrationZone: {
    flex: 0.35,
  },
  illustration: {
    flex: 1,
  },
  contentZone: {
    flex: 0.65,
    backgroundColor: TodayColors.bgCardTint,
    padding: CARD_PADDING,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryChip: {
    paddingHorizontal: TodaySpacing[12],
    paddingVertical: TodaySpacing[6],
    borderRadius: TodayRadii.pill,
    borderWidth: 2,
  },
  mustDoChip: {
    backgroundColor: TodayColors.successBg,
    borderColor: TodayColors.successBorder,
  },
  bonusChip: {
    backgroundColor: TodayColors.infoBg,
    borderColor: TodayColors.infoBorder,
  },
  categoryChipText: {
    fontSize: TodayTypography.tiny.fontSize,
    lineHeight: TodayTypography.tiny.lineHeight,
    fontFamily: TodayTypography.bricolageBold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  progressChip: {
    backgroundColor: TodayColors.bgCard,
    paddingHorizontal: TodaySpacing[12],
    paddingVertical: TodaySpacing[6],
    borderRadius: TodayRadii.pill,
    borderWidth: 2,
    borderColor: TodayColors.strokeSubtle,
  },
  progressChipText: {
    fontSize: TodayTypography.caption.fontSize,
    lineHeight: TodayTypography.caption.lineHeight,
    color: TodayColors.textSecondary,
    fontFamily: TodayTypography.bricolageSemiBold,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: TodaySpacing[10],
    gap: TodaySpacing[8],
  },
  taskIcon: {
    fontSize: 24,
  },
  title: {
    flex: 1,
    fontSize: TodayTypography.h1.fontSize,
    lineHeight: TodayTypography.h1.lineHeight,
    color: TodayColors.textPrimary,
    fontFamily: TodayTypography.bricolageBold,
  },
  taskBox: {
    marginTop: TodaySpacing[10],
    backgroundColor: TodayColors.bgTaskBox,
    borderRadius: TodayRadii.sm,
    padding: TodaySpacing[12],
    borderWidth: 2,
    borderColor: TodayColors.strokeTaskBox,
  },
  taskBoxLabel: {
    fontSize: TodayTypography.tiny.fontSize,
    lineHeight: TodayTypography.tiny.lineHeight,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.ctaPrimary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: TodaySpacing[4],
  },
  taskBoxText: {
    fontSize: TodayTypography.body.fontSize,
    lineHeight: TodayTypography.body.lineHeight,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textSecondary,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: TodaySpacing[8],
    gap: TodaySpacing[6],
  },
  metadataText: {
    fontSize: TodayTypography.caption.fontSize,
    lineHeight: TodayTypography.caption.lineHeight,
    fontFamily: TodayTypography.poppinsMedium,
    color: TodayColors.textMuted,
    textTransform: 'capitalize',
  },
  metadataDot: {
    fontSize: TodayTypography.caption.fontSize,
    color: TodayColors.textMuted,
  },
  actionsRow: {
    marginTop: TodaySpacing[12],
  },
  detailsLink: {
    alignItems: 'center',
    paddingVertical: TodaySpacing[8],
    marginTop: TodaySpacing[4],
  },
  detailsLinkText: {
    fontSize: TodayTypography.caption.fontSize,
    lineHeight: TodayTypography.caption.lineHeight,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textLink,
  },
});

export function DailyTaskDeck({
  tasks,
  mustCount,
  completions,
  onOpenDetails,
  onToggleComplete,
  onInteractionChange,
}: Props) {
  const { width, height } = useWindowDimensions();
  const cardWidth = Math.min(420, width - 32);
  const cardHeight = Math.min(520, Math.max(420, height * 0.55));
  const threshold = Math.max(60, Math.min(120, cardWidth * 0.18));

  const [index, setIndex] = useState(0);
  const translateX = useSharedValue(0);
  const activeIndex = useSharedValue(0);

  const total = tasks.length;

  const canGoPrev = index > 0;
  const canGoNext = index < total - 1;

  const currentTask = tasks[index];
  const prevTask = index > 0 ? tasks[index - 1] : null;
  const nextTask = index < total - 1 ? tasks[index + 1] : null;

  const sectionLabel = useMemo(() => {
    if (index < mustCount) return 'MUST-TO-DO';
    return 'NICE-TO-HAVE';
  }, [index, mustCount]);

  const progressLabel = useMemo(() => `${index + 1} / ${total}`, [index, total]);

  const commitIndex = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(total - 1, nextIndex));
      setIndex(clamped);
    },
    [total]
  );

  const pan = useMemo(() => {
    return Gesture.Pan()
      .activeOffsetX([-12, 12])
      // Allow some vertical drift so horizontal swipes don't fail inside the ScrollView.
      .failOffsetY([-60, 60])
      .onBegin(() => {
        activeIndex.value = index;
        if (onInteractionChange) {
          runOnJS(onInteractionChange)(true);
        }
      })
      .onUpdate((e) => {
        translateX.value = clampValue(e.translationX, -cardWidth * 1.1, cardWidth * 1.1);
      })
      .onEnd((e) => {
        const x = e.translationX;
        const current = activeIndex.value;
        const vx = e.velocityX;

        // Swipe right => next
        if ((x > threshold || vx > 600) && current < total - 1) {
          translateX.value = withSpring(cardWidth * 1.15, springConfig, (finished) => {
            if (!finished) return;
            runOnJS(commitIndex)(current + 1);
            translateX.value = 0;
          });
          return;
        }

        // Swipe left => previous
        if ((x < -threshold || vx < -600) && current > 0) {
          translateX.value = withSpring(-cardWidth * 1.15, springConfig, (finished) => {
            if (!finished) return;
            runOnJS(commitIndex)(current - 1);
            translateX.value = 0;
          });
          return;
        }

        translateX.value = withSpring(0, springConfig);
      })
      .onFinalize(() => {
        if (onInteractionChange) {
          runOnJS(onInteractionChange)(false);
        }
      });
  }, [activeIndex, cardWidth, commitIndex, index, onInteractionChange, threshold, total, translateX]);

  const dragProgress = useDerivedValue(() => {
    return clampValue(Math.abs(translateX.value) / threshold, 0, 1);
  });

  const currentStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [-cardWidth, 0, cardWidth], [-3, 0, 3]);
    const scale = interpolate(dragProgress.value, [0, 1], [1, 0.98]);
    return {
      transform: [{ translateX: translateX.value }, { rotateZ: `${rotate}deg` }, { scale }],
    };
  });

  // Keep the deck feeling "alive" like Duolingo: show the NEXT card peeking behind at rest.
  // Only reveal the PREVIOUS card when swiping left (to avoid wrong "reflection" bleeding through).
  const nextBehind = useAnimatedStyle(() => {
    const p = clampValue(Math.max(0, translateX.value) / threshold, 0, 1);
    const scale = interpolate(p, [0, 1], [0.965, 1]);
    const translateY = interpolate(p, [0, 1], [10, 0]);
    return {
      transform: [{ translateY }, { scale }],
      opacity: 0.95,
    };
  });

  const prevBehind = useAnimatedStyle(() => {
    const p = clampValue(Math.max(0, -translateX.value) / threshold, 0, 1);
    const scale = interpolate(p, [0, 1], [0.965, 1]);
    const translateY = interpolate(p, [0, 1], [10, 0]);
    const opacity = interpolate(p, [0, 0.12, 1], [0, 0.6, 0.95]);
    return {
      transform: [{ translateY }, { scale }],
      opacity,
    };
  });

  if (!currentTask) return null;

  const currentCompleted = !!completions[currentTask.id];

  return (
    <View style={{ alignItems: 'center', marginBottom: 8 }}>
      <View style={{ width: cardWidth, height: cardHeight }}>
        {/* Behind card (previous/next) */}
        {nextTask && (
          <Animated.View
            style={[
              { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 },
              nextBehind,
            ]}
          >
            <DeckCard
              task={nextTask}
              label={index + 1 < mustCount ? 'MUST-TO-DO' : 'NICE-TO-HAVE'}
              progressLabel={`${index + 2} / ${total}`}
              isCompleted={!!completions[nextTask.id]}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              onOpenDetails={() => onOpenDetails(nextTask)}
              onToggleComplete={() => onToggleComplete(nextTask.id, !!completions[nextTask.id])}
            />
          </Animated.View>
        )}

        {prevTask && (
          <Animated.View
            style={[
              { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 },
              prevBehind,
            ]}
          >
            <DeckCard
              task={prevTask}
              label={index - 1 < mustCount ? 'MUST-TO-DO' : 'NICE-TO-HAVE'}
              progressLabel={`${index} / ${total}`}
              isCompleted={!!completions[prevTask.id]}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              onOpenDetails={() => onOpenDetails(prevTask)}
              onToggleComplete={() => onToggleComplete(prevTask.id, !!completions[prevTask.id])}
            />
          </Animated.View>
        )}

        {/* Active card */}
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 },
              currentStyle,
            ]}
          >
            <DeckCard
              task={currentTask}
              label={sectionLabel}
              progressLabel={progressLabel}
              isCompleted={currentCompleted}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              onOpenDetails={() => onOpenDetails(currentTask)}
              onToggleComplete={() => onToggleComplete(currentTask.id, currentCompleted)}
            />
          </Animated.View>
        </GestureDetector>
      </View>

      {/* Progress Rail - Visual dot navigation */}
      <View style={[railStyles.container, { width: cardWidth }]}>
        {/* Dot indicators with tap-to-jump */}
        <View style={railStyles.dotsRow}>
          {tasks.map((t, i) => {
            const completed = !!completions[t.id];
            const isActive = i === index;
            return (
              <Pressable
                key={t.id}
                onPress={() => commitIndex(i)}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel={`Go to task ${i + 1}${completed ? ', completed' : ''}`}
              >
                <View
                  style={[
                    railStyles.dot,
                    isActive && railStyles.dotActive,
                    completed && railStyles.dotComplete,
                    isActive && completed && railStyles.dotActiveComplete,
                  ]}
                />
                {completed && !isActive && (
                  <Text style={railStyles.dotCheckmark}>✓</Text>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Navigation arrows (tap alternative to swipe) */}
        <View style={railStyles.arrowsRow}>
          <Pressable
            onPress={() => canGoPrev && commitIndex(index - 1)}
            disabled={!canGoPrev}
            style={railStyles.arrowButton}
            hitSlop={10}
          >
            <Text
              style={[
                railStyles.arrowText,
                !canGoPrev && railStyles.arrowTextDisabled,
              ]}
            >
              ← Prev
            </Text>
          </Pressable>

          <Text style={railStyles.positionText}>
            {index + 1} of {total}
          </Text>

          <Pressable
            onPress={() => canGoNext && commitIndex(index + 1)}
            disabled={!canGoNext}
            style={railStyles.arrowButton}
            hitSlop={10}
          >
            <Text
              style={[
                railStyles.arrowText,
                !canGoNext && railStyles.arrowTextDisabled,
              ]}
            >
              Next →
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const railStyles = StyleSheet.create({
  container: {
    marginTop: TodaySpacing[12],
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: TodaySpacing[8],
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: TodayRadii.pill,
    backgroundColor: TodayColors.dotInactive,
    borderWidth: 2,
    borderColor: TodayColors.bgCard,
  },
  dotActive: {
    width: 20,
    backgroundColor: TodayColors.dotActive,
  },
  dotComplete: {
    backgroundColor: TodayColors.dotComplete,
  },
  dotActiveComplete: {
    backgroundColor: TodayColors.dotComplete,
  },
  dotCheckmark: {
    position: 'absolute',
    top: -2,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: TodayColors.bgCard,
    fontFamily: TodayTypography.bricolageBold,
  },
  arrowsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: TodaySpacing[10],
  },
  arrowButton: {
    paddingVertical: TodaySpacing[4],
    paddingHorizontal: TodaySpacing[8],
  },
  arrowText: {
    fontSize: TodayTypography.caption.fontSize,
    lineHeight: TodayTypography.caption.lineHeight,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textPrimary,
  },
  arrowTextDisabled: {
    color: TodayColors.textDisabled,
  },
  positionText: {
    fontSize: TodayTypography.caption.fontSize,
    lineHeight: TodayTypography.caption.lineHeight,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textMuted,
  },
});
