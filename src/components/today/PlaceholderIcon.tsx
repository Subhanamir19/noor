/**
 * PlaceholderIcon - Renders emoji/text placeholders for missing icons
 *
 * Use this component when actual icon assets are not yet available.
 * Provides consistent sizing and styling for placeholder icons.
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { TodayScreenColors, TodayScreenSizes } from '@/constants/todayScreenTokens';

interface PlaceholderIconProps {
  icon: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  iconStyle?: TextStyle;
  showBackground?: boolean;
}

export function PlaceholderIcon({
  icon,
  size = 24,
  color = TodayScreenColors.textPrimary,
  backgroundColor = 'transparent',
  style,
  iconStyle,
  showBackground = false,
}: PlaceholderIconProps) {
  const containerSize = showBackground ? size * 1.5 : size;
  const fontSize = size * 0.8;

  return (
    <View
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2,
          backgroundColor: showBackground ? backgroundColor : 'transparent',
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.icon,
          {
            fontSize,
            color,
          },
          iconStyle,
        ]}
      >
        {icon}
      </Text>
    </View>
  );
}

/**
 * TaskIcon - Specific placeholder for task category icons
 */
interface TaskIconProps {
  icon?: string;
  category?: string;
  size?: number;
}

export function TaskIcon({ icon, category, size = TodayScreenSizes.taskIcon }: TaskIconProps) {
  // Determine background color based on category
  const getCategoryBg = () => {
    switch (category) {
      case 'Prayer, Salah & Wudu Routine':
        return TodayScreenColors.iconBgPrayer;
      case 'Dua & Spiritual Connection':
        return TodayScreenColors.iconBgDua;
      case 'Morning Routine':
        return TodayScreenColors.iconBgMorning;
      case 'Evening Routine':
        return TodayScreenColors.iconBgEvening;
      case 'Food, Halal & Eating Etiquette':
        return TodayScreenColors.iconBgMeals;
      case 'Sleep & Bedtime':
        return TodayScreenColors.iconBgSleep;
      default:
        return TodayScreenColors.iconBgDefault;
    }
  };

  return (
    <View
      style={[
        styles.taskIconContainer,
        {
          width: size,
          height: size,
          borderRadius: size * 0.3,
          backgroundColor: getCategoryBg(),
        },
      ]}
    >
      <Text style={[styles.taskIconText, { fontSize: size * 0.5 }]}>
        {icon || '✨'}
      </Text>
    </View>
  );
}

/**
 * NavIcon - Header navigation icon with shadow for visibility
 */
interface NavIconProps {
  icon: string;
  size?: number;
  color?: string;
  onDark?: boolean;
}

export function NavIcon({
  icon,
  size = TodayScreenSizes.hamburgerIcon,
  color = TodayScreenColors.textInverse,
  onDark = true,
}: NavIconProps) {
  return (
    <Text
      style={[
        styles.navIcon,
        {
          fontSize: size,
          color,
          textShadowColor: onDark ? 'rgba(0,0,0,0.5)' : 'transparent',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        },
      ]}
    >
      {icon}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
  },
  taskIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskIconText: {
    textAlign: 'center',
  },
  navIcon: {
    textAlign: 'center',
  },
});
