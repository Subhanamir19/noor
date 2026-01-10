/**
 * LockMessage Component
 *
 * Displayed at the bottom of the journey path when there are
 * more days available. Prompts user to log more photos.
 */

import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LockClosedIcon } from 'react-native-heroicons/solid';

import { JourneySizes } from '@/constants/journeyTokens';
import { TodayColors, TodaySpacing, TodayTypography } from '@/constants/todayTokens';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function LockMessageComponent() {
  return (
    <View style={styles.container}>
      {/* Lock icon */}
      <View style={styles.iconContainer}>
        <LockClosedIcon size={22} color={TodayColors.textMuted} />
      </View>

      {/* Message */}
      <Text style={styles.title}>More days ahead</Text>
      <Text style={styles.subtitle}>
        Log more photos to unlock{'\n'}the next part of your journey
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: TodaySpacing[16],
    paddingHorizontal: TodaySpacing[20],
    backgroundColor: TodayColors.card,
    borderRadius: JourneySizes.lockMessageRadius,
    marginHorizontal: TodaySpacing[16],
    borderWidth: 1,
    borderColor: TodayColors.strokeSubtle,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: JourneySizes.lockIconSize,
    height: JourneySizes.lockIconSize,
    borderRadius: JourneySizes.lockIconSize / 2,
    backgroundColor: TodayColors.bgApp,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: TodayColors.textPrimary,
    fontFamily: TodayTypography.bricolageSemiBold,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: TodayColors.textSecondary,
    fontFamily: TodayTypography.poppinsSemiBold,
    textAlign: 'center',
    lineHeight: 19,
  },
});

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const LockMessage = memo(LockMessageComponent);
