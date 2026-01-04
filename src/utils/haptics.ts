import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Haptic feedback utilities for the app
 * Provides consistent haptic feedback across different interactions
 */

/**
 * Light haptic for selections, toggles, and small interactions
 */
export async function lightHaptic(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {
    // Silently fail if haptics not available
  }
}

/**
 * Medium haptic for confirmations, completing tasks
 */
export async function mediumHaptic(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch {
    // Silently fail if haptics not available
  }
}

/**
 * Heavy haptic for significant actions like completing all tasks
 */
export async function heavyHaptic(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch {
    // Silently fail if haptics not available
  }
}

/**
 * Success haptic pattern - for positive outcomes like level ups
 */
export async function successHaptic(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {
    // Silently fail if haptics not available
  }
}

/**
 * Warning haptic - for struggles or attention-needed states
 */
export async function warningHaptic(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  } catch {
    // Silently fail if haptics not available
  }
}

/**
 * Error haptic - for failures or errors
 */
export async function errorHaptic(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  } catch {
    // Silently fail if haptics not available
  }
}

/**
 * Selection changed haptic - for scrolling through options
 */
export async function selectionHaptic(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.selectionAsync();
  } catch {
    // Silently fail if haptics not available
  }
}

/**
 * Celebration haptic pattern - for level ups and major achievements
 */
export async function celebrationHaptic(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, 100);
    setTimeout(async () => {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 250);
  } catch {
    // Silently fail if haptics not available
  }
}

/**
 * Struggle haptic - gentle feedback for logging struggles
 */
export async function struggleHaptic(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeout(async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }, 100);
  } catch {
    // Silently fail if haptics not available
  }
}
