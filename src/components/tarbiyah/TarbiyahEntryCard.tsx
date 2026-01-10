/**
 * TarbiyahEntryCard - Entry point card for Today's Tarbiyah
 *
 * Displayed on the Today screen to launch the daily tarbiyah lesson.
 * Shows current day, trait, and completion status.
 */

import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import {
  TarbiyahColors,
  TarbiyahTypography,
  TarbiyahSpacing,
  TarbiyahRadius,
  TarbiyahMotion,
  TarbiyahShadows,
  TarbiyahRgba,
} from '../../constants/tarbiyahTokens';
import {
  getTodaysLesson,
  getTraitDisplayName,
  getTraitEmoji,
} from '../../data/tarbiyahLessons';

interface TarbiyahEntryCardProps {
  onPress: () => void;
  isCompleted?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TarbiyahEntryCardComponent({
  onPress,
  isCompleted = false,
}: TarbiyahEntryCardProps) {
  const scale = useSharedValue(1);
  const lesson = getTodaysLesson();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, TarbiyahMotion.spring);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, TarbiyahMotion.spring);
  };

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  if (!lesson) return null;

  const traitName = getTraitDisplayName(lesson.trait);
  const traitEmoji = getTraitEmoji(lesson.trait);

  return (
    <AnimatedPressable
      style={[styles.container, animatedStyle]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <LinearGradient
        colors={[TarbiyahColors.bgSecondary, TarbiyahColors.bgPrimary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Header Row */}
        <View style={styles.header}>
          <View style={styles.dayBadge}>
            <Text style={styles.dayText}>Day {lesson.dayNumber}</Text>
          </View>
          {isCompleted && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedIcon}>✓</Text>
              <Text style={styles.completedText}>Done</Text>
            </View>
          )}
        </View>

        {/* Title */}
        <Text style={styles.title}>Today's Tarbiyah</Text>

        {/* Lesson Title */}
        <Text style={styles.lessonTitle} numberOfLines={2}>
          {lesson.title}
        </Text>

        {/* Trait Badge */}
        <View style={styles.traitRow}>
          <View style={styles.traitBadge}>
            <Text style={styles.traitEmoji}>{traitEmoji}</Text>
            <Text style={styles.traitName}>{traitName}</Text>
          </View>

          {/* CTA Arrow */}
          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </View>

        {/* Decorative Glow */}
        <View style={styles.decorativeGlow} />
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: TarbiyahRadius.xl,
    overflow: 'hidden',
    ...TarbiyahShadows.cardLift,
  },
  gradient: {
    padding: TarbiyahSpacing.cardPadding,
    minHeight: 160,
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: TarbiyahSpacing.space12,
  },
  dayBadge: {
    backgroundColor: TarbiyahRgba.stepLabelBg,
    borderRadius: TarbiyahRadius.full,
    paddingHorizontal: TarbiyahSpacing.space12,
    paddingVertical: TarbiyahSpacing.space4,
  },
  dayText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.tiny.fontSize,
    fontWeight: '600',
    color: TarbiyahColors.textAccent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: TarbiyahSpacing.space4,
    backgroundColor: TarbiyahRgba.psychBg,
    borderRadius: TarbiyahRadius.full,
    paddingHorizontal: TarbiyahSpacing.space12,
    paddingVertical: TarbiyahSpacing.space4,
  },
  completedIcon: {
    fontSize: 12,
    color: TarbiyahColors.success,
    fontWeight: '700',
  },
  completedText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.tiny.fontSize,
    fontWeight: '600',
    color: TarbiyahColors.success,
  },
  title: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.caption.fontSize,
    fontWeight: '500',
    color: TarbiyahColors.textMuted,
    marginBottom: TarbiyahSpacing.space4,
  },
  lessonTitle: {
    fontFamily: TarbiyahTypography.fontHeadline,
    fontSize: TarbiyahTypography.h2.fontSize,
    fontWeight: TarbiyahTypography.h2.fontWeight,
    lineHeight: TarbiyahTypography.h2.lineHeight,
    color: TarbiyahColors.textPrimary,
    marginBottom: TarbiyahSpacing.space16,
  },
  traitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  traitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: TarbiyahSpacing.space8,
  },
  traitEmoji: {
    fontSize: 20,
  },
  traitName: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.body.fontSize,
    fontWeight: '500',
    color: TarbiyahColors.textSecondary,
  },
  arrowContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: TarbiyahColors.accentPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 18,
    color: TarbiyahColors.textPrimary,
    fontWeight: '600',
  },
  decorativeGlow: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: TarbiyahRgba.arabicGlow,
    opacity: 0.5,
  },
});

export const TarbiyahEntryCard = memo(TarbiyahEntryCardComponent);
