/**
 * SectionDivider - Collapsible section header
 *
 * Features:
 * - Section label text
 * - Rotating chevron icon
 * - Tap to expand/collapse
 * - Animated height transition
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  TodayScreenColors,
  TodayScreenSpacing,
  TodayScreenTypography,
  TodayScreenMotion,
  TodayScreenIcons,
} from '@/constants/todayScreenTokens';

interface SectionDividerProps {
  title: string;
  isExpanded?: boolean;
  onToggle?: () => void;
  showChevron?: boolean;
}

export function SectionDivider({
  title,
  isExpanded = true,
  onToggle,
  showChevron = true,
}: SectionDividerProps) {
  const chevronRotation = useSharedValue(isExpanded ? 0 : -90);

  React.useEffect(() => {
    chevronRotation.value = withTiming(isExpanded ? 0 : -90, {
      duration: TodayScreenMotion.sectionCollapse.duration,
    });
  }, [isExpanded]);

  const chevronAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${chevronRotation.value}deg` }],
  }));

  const content = (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showChevron && (
        <Animated.Text style={[styles.chevron, chevronAnimatedStyle]}>
          {TodayScreenIcons.chevronDown}
        </Animated.Text>
      )}
    </View>
  );

  if (onToggle) {
    return (
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => pressed && styles.pressed}
        accessibilityRole="button"
        accessibilityLabel={`${title} section, ${isExpanded ? 'expanded' : 'collapsed'}`}
        accessibilityState={{ expanded: isExpanded }}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: TodayScreenSpacing.sm,
    paddingHorizontal: TodayScreenSpacing.screenGutter,
    marginBottom: TodayScreenSpacing.sm,
  },
  title: {
    fontSize: TodayScreenTypography.caption.fontSize,
    lineHeight: TodayScreenTypography.caption.lineHeight,
    fontFamily: TodayScreenTypography.fontMedium,
    color: TodayScreenColors.dividerText,
    textTransform: 'capitalize',
  },
  chevron: {
    fontSize: 10,
    color: TodayScreenColors.dividerChevron,
    marginLeft: TodayScreenSpacing.xs,
  },
  pressed: {
    opacity: 0.7,
  },
});
