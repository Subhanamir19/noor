/**
 * TodayHeader - Fixed header with hamburger menu, heart, and add button
 *
 * Positioned absolutely at the top of the screen, transparent background
 * to show the hero illustration behind it.
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  TodayScreenColors,
  TodayScreenSpacing,
  TodayScreenSizes,
  TodayScreenShadows,
  TodayScreenRadii,
  TodayScreenIcons,
} from '@/constants/todayScreenTokens';

interface TodayHeaderProps {
  onMenuPress?: () => void;
  onHeartPress?: () => void;
  onAddPress?: () => void;
  heartCount?: number;
  showNotification?: boolean;
}

export function TodayHeader({
  onMenuPress,
  onHeartPress,
  onAddPress,
  heartCount = 0,
  showNotification = false,
}: TodayHeaderProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        {/* Left: Hamburger Menu */}
        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconButtonPressed,
          ]}
          onPress={onMenuPress}
          hitSlop={12}
          accessibilityLabel="Open menu"
          accessibilityRole="button"
        >
          <View style={styles.hamburgerContainer}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </View>
        </Pressable>

        {/* Center: Spacer */}
        <View style={styles.spacer} />

        {/* Right: Heart + Add Button */}
        <View style={styles.rightGroup}>
          {/* Heart Button */}
          <Pressable
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconButtonPressed,
            ]}
            onPress={onHeartPress}
            hitSlop={8}
            accessibilityLabel={`Favorites, ${heartCount} items`}
            accessibilityRole="button"
          >
            <View style={styles.heartContainer}>
              <Text style={styles.heartIcon}>{TodayScreenIcons.heart}</Text>
              {showNotification && <View style={styles.notificationDot} />}
            </View>
          </Pressable>

          {/* Add Button */}
          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.addButtonPressed,
            ]}
            onPress={onAddPress}
            accessibilityLabel="Add new item"
            accessibilityRole="button"
          >
            <Text style={styles.addButtonIcon}>{TodayScreenIcons.plus}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    height: TodayScreenSpacing.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: TodayScreenSpacing.screenGutter,
    paddingVertical: TodayScreenSpacing.sm,
  },
  iconButton: {
    width: TodayScreenSizes.minTouchTarget,
    height: TodayScreenSizes.minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonPressed: {
    opacity: 0.7,
  },
  hamburgerContainer: {
    width: TodayScreenSizes.hamburgerIcon,
    height: 18,
    justifyContent: 'space-between',
    ...TodayScreenShadows.headerIcon,
  },
  hamburgerLine: {
    width: '100%',
    height: 2,
    backgroundColor: TodayScreenColors.textInverse,
    borderRadius: 1,
  },
  spacer: {
    flex: 1,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: TodayScreenSpacing.sm,
  },
  heartContainer: {
    position: 'relative',
  },
  heartIcon: {
    fontSize: TodayScreenSizes.heartIcon,
    ...TodayScreenShadows.headerIcon,
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: TodayScreenSizes.notificationDot,
    height: TodayScreenSizes.notificationDot,
    borderRadius: TodayScreenSizes.notificationDot / 2,
    backgroundColor: TodayScreenColors.heartPink,
    borderWidth: 1,
    borderColor: TodayScreenColors.textInverse,
  },
  addButton: {
    width: TodayScreenSizes.addButton,
    height: TodayScreenSizes.addButton,
    borderRadius: TodayScreenRadii.addButton,
    backgroundColor: TodayScreenColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...TodayScreenShadows.buttonLedge,
  },
  addButtonPressed: {
    backgroundColor: TodayScreenColors.primaryPressed,
    transform: [{ scale: 0.95 }],
  },
  addButtonIcon: {
    fontSize: TodayScreenSizes.addButtonIcon,
    fontWeight: '600',
    color: TodayScreenColors.textInverse,
  },
});
