/**
 * UnlockPrompt Component
 *
 * Card prompting users to log more photos to unlock next days.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {
  NewJourneyColors,
  NewJourneySizes,
  NewJourneyTypography,
} from '@/constants/journeyTokensV2';

export const UnlockPrompt: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Lock icon */}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🔒</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>More Adventures Await</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Log more photos to unlock{'\n'}the next stages of your journey
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: NewJourneySizes.unlockCardWidth,
    backgroundColor: NewJourneyColors.lockBg,
    borderRadius: NewJourneySizes.unlockCardRadius,
    borderWidth: 1.5,
    borderColor: NewJourneyColors.lockBorder,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  iconContainer: {
    width: NewJourneySizes.unlockIconSize,
    height: NewJourneySizes.unlockIconSize,
    borderRadius: NewJourneySizes.unlockIconSize / 2,
    backgroundColor: 'rgba(0,0,0,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: NewJourneyTypography.unlockTitle.fontSize,
    fontFamily: NewJourneyTypography.unlockTitle.fontFamily,
    color: NewJourneyColors.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: NewJourneyTypography.unlockSubtitle.fontSize,
    fontFamily: NewJourneyTypography.unlockSubtitle.fontFamily,
    color: NewJourneyColors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
