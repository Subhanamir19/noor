import React, { useCallback, useMemo, useState } from 'react';
import { ImageBackground, Pressable, Text, View, useWindowDimensions } from 'react-native';
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
import type { DailyTask } from '@/types/models';

interface Props {
  tasks: DailyTask[];
  mustCount: number;
  completions: Record<string, boolean>;
  onOpenDetails: (task: DailyTask) => void;
  onToggleComplete: (taskId: string, isCompleted: boolean) => void;
  onInteractionChange?: (isInteracting: boolean) => void;
}

const CARD_RADIUS = 28;
const CARD_BORDER = 3;
const CARD_PADDING = 16;
const CARD_SHADOW_HEIGHT = 6;

const FONT_BRICOLAGE_BOLD = 'BricolageGrotesque-Bold';
const FONT_BRICOLAGE_SEMIBOLD = 'BricolageGrotesque-SemiBold';
const FONT_POPPINS_SEMIBOLD = 'Poppins-SemiBold';

const springConfig = {
  damping: 19,
  stiffness: 290,
  mass: 0.75,
};

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
  const title = task.shortTitle || task.title;

  return (
    <View
      style={{
        width: cardWidth,
        height: cardHeight,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: CARD_SHADOW_HEIGHT,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: CARD_RADIUS,
          backgroundColor: 'rgba(0,0,0,0.10)',
        }}
      />
      <View
        style={{
          flex: 1,
          borderRadius: CARD_RADIUS,
          overflow: 'hidden',
          backgroundColor: theme.themeColor,
          borderWidth: CARD_BORDER,
          borderColor: 'rgba(0,0,0,0.08)',
          marginBottom: CARD_SHADOW_HEIGHT,
        }}
      >
        <Pressable
          onPress={onOpenDetails}
          accessibilityRole="button"
          accessibilityLabel={`Open details for ${title}`}
          style={{ flex: 1 }}
        >
          <ImageBackground
            source={theme.image}
            resizeMode="contain"
            style={{ flex: 1 }}
          />
        </Pressable>

        <View
          style={{
            flex: 1.4,
            backgroundColor: 'rgba(255,255,255,0.92)',
            padding: CARD_PADDING,
          }}
        >
          <Pressable
            onPress={onOpenDetails}
            accessibilityRole="button"
            accessibilityLabel={`Open details for ${title}`}
            style={{ flexGrow: 1, flexShrink: 1 }}
          >
            <View style={{ flexGrow: 1, flexShrink: 1 }}>
              {/* Top row: category + progress */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 999,
                    borderWidth: 2,
                    borderColor: 'rgba(0,0,0,0.06)',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#1F2937',
                      letterSpacing: 0.6,
                      fontFamily: FONT_BRICOLAGE_SEMIBOLD,
                    }}
                  >
                    {label}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 999,
                    borderWidth: 2,
                    borderColor: 'rgba(0,0,0,0.06)',
                  }}
                >
                  <Text style={{ fontSize: 12, color: '#1F2937', fontFamily: FONT_BRICOLAGE_SEMIBOLD }}>
                    {progressLabel}
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 12 }}>
                <Text style={{ fontSize: 26, color: '#111827', fontFamily: FONT_BRICOLAGE_BOLD }} numberOfLines={2}>
                  {title}
                </Text>
                {!!task.description && (
                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: '#6B7280',
                      lineHeight: 20,
                      fontFamily: FONT_POPPINS_SEMIBOLD,
                    }}
                    numberOfLines={3}
                  >
                    {task.description}
                  </Text>
                )}
              </View>

              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 0,
                  fontSize: 12,
                  color: '#1CB0F6',
                  fontFamily: FONT_POPPINS_SEMIBOLD,
                }}
              >
                Tap to view details
              </Text>
            </View>
          </Pressable>

          <View style={{ gap: 12, marginTop: 12 }}>
            <Button
              title={isCompleted ? 'Completed' : 'Mark as complete'}
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
        </View>
      </View>
    </View>
  );
}

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

      {/* Navigation hint + dot indicators */}
      <View style={{ width: cardWidth, marginTop: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: '#6B7280', fontSize: 12, fontWeight: '700' }}>
            Swipe left to go back
          </Text>
          <Text style={{ color: '#6B7280', fontSize: 12, fontWeight: '700' }}>
            Swipe right to continue
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 10 }}>
          {tasks.map((t, i) => {
            const completed = !!completions[t.id];
            const isActive = i === index;
            return (
              <View
                key={t.id}
                style={{
                  width: isActive ? 18 : 10,
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: completed ? '#58CC02' : isActive ? '#1CB0F6' : 'rgba(107,114,128,0.35)',
                  borderWidth: 2,
                  borderColor: 'rgba(255,255,255,0.9)',
                }}
              />
            );
          })}
        </View>

        {/* Edge affordances */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={{ color: canGoPrev ? '#111827' : '#9CA3AF', fontWeight: '800' }}>
            {canGoPrev ? '← Previous' : ' '}
          </Text>
          <Text style={{ color: canGoNext ? '#111827' : '#9CA3AF', fontWeight: '800' }}>
            {canGoNext ? 'Next →' : ' '}
          </Text>
        </View>
      </View>
    </View>
  );
}
