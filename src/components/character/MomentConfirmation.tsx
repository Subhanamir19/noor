import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import type { MomentType } from '@/types/models';
import { getTraitById } from '@/data/characterScenarios';

interface Props {
  traitId: string;
  momentType: MomentType;
  leveledUp: boolean;
  newLevel?: number;
  onComplete: () => void;
  titleOverride?: string;
  encouragementOverride?: string;
}

export function MomentConfirmation({
  traitId,
  momentType,
  leveledUp,
  newLevel,
  onComplete,
  titleOverride,
  encouragementOverride,
}: Props) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const trait = getTraitById(traitId);

  useEffect(() => {
    // Entry animation
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-dismiss after delay
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => onComplete());
    }, leveledUp ? 2500 : 1800);

    return () => clearTimeout(timer);
  }, [leveledUp, onComplete, opacityAnim, scaleAnim]);

  const isPositive = momentType === 'positive';
  const titleText = titleOverride || (isPositive ? 'Moment Logged!' : 'Noted!');
  const encouragementText =
    encouragementOverride ||
    (isPositive ? 'Keep nurturing this trait!' : "It's okay, growth takes time.");

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={[styles.card, isPositive ? styles.cardPositive : styles.cardStruggle]}>
        {/* Main emoji */}
        <Text style={styles.mainEmoji}>{isPositive ? '🌟' : '💪'}</Text>

        {/* Message */}
        <Text style={styles.title}>
          {titleText}
        </Text>

        <Text style={styles.subtitle}>
          {trait?.emoji} {trait?.name}
        </Text>

        {/* Level up celebration */}
        {leveledUp && newLevel && (
          <View style={styles.levelUpContainer}>
            <Text style={styles.levelUpEmoji}>🎉</Text>
            <Text style={styles.levelUpText}>Level {newLevel}!</Text>
          </View>
        )}

        {/* Encouragement */}
        <Text style={styles.encouragement}>
          {encouragementText}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 9999,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardPositive: {
    borderWidth: 3,
    borderColor: '#58CC02',
  },
  cardStruggle: {
    borderWidth: 3,
    borderColor: '#FF9600',
  },
  mainEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A5F4A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#78716C',
    marginBottom: 16,
  },
  levelUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 16,
  },
  levelUpEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  levelUpText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#D4A500',
  },
  encouragement: {
    fontSize: 14,
    color: '#78716C',
    textAlign: 'center',
  },
});
