/**
 * LockMessage Component
 *
 * Displayed at the bottom of the journey path when there are
 * more days available. Prompts user to log more photos.
 */

import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LockClosedIcon } from 'react-native-heroicons/solid';

import { JourneyColors, JourneySizes } from '@/constants/journeyTokens';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function LockMessageComponent() {
  return (
    <View style={styles.container}>
      {/* Lock icon */}
      <View style={styles.iconContainer}>
        <LockClosedIcon size={24} color={JourneyColors.textMuted} />
      </View>

      {/* Message */}
      <Text style={styles.title}>More days ahead!</Text>
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
    paddingVertical: 20,
    paddingHorizontal: 28,
    backgroundColor: 'rgba(75, 85, 99, 0.25)',
    borderRadius: JourneySizes.lockMessageRadius,
    marginHorizontal: 20,
    // Subtle border
    borderWidth: 1,
    borderColor: 'rgba(75, 85, 99, 0.3)',
  },
  iconContainer: {
    width: JourneySizes.lockIconSize,
    height: JourneySizes.lockIconSize,
    borderRadius: JourneySizes.lockIconSize / 2,
    backgroundColor: 'rgba(75, 85, 99, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: JourneyColors.textPrimary,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: JourneyColors.textSecondary,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 19,
  },
});

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const LockMessage = memo(LockMessageComponent);
