import React, { useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { TodayColors, TodayRadii, TodayShadows, TodaySpacing, TodayTypography } from '@/constants/todayTokens';
import { getTraitById } from '@/data/characterScenarios';
import type { CoachingChallenge } from '@/types/models';
import { successHaptic } from '@/utils/haptics';

interface Props {
  challenge: CoachingChallenge;
  onComplete: () => void;
}

function formatTimeRemaining(expiresAt: string): { label: string; isExpired: boolean; isExpiringSoon: boolean } {
  const now = Date.now();
  const expires = new Date(expiresAt).getTime();
  const diff = expires - now;

  if (diff <= 0) {
    return { label: 'Expired', isExpired: true, isExpiringSoon: true };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const label = hours > 0 ? `${hours}h ${minutes}m left` : `${minutes}m left`;

  return { label, isExpired: false, isExpiringSoon: hours < 2 };
}

export function ChallengeCard({ challenge, onComplete }: Props) {
  const [timeRemaining, setTimeRemaining] = useState(() => formatTimeRemaining(challenge.expires_at));
  const [isCompleting, setIsCompleting] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const shadowHeight = TodayShadows.cardLedge.height;

  const trait = useMemo(() => getTraitById(challenge.trait_id), [challenge.trait_id]);

  useEffect(() => {
    const update = () => setTimeRemaining(formatTimeRemaining(challenge.expires_at));
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [challenge.expires_at]);

  const handleComplete = async () => {
    if (isCompleting) return;
    setIsCompleting(true);
    successHaptic();

    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.03, duration: 90, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 0, duration: 260, useNativeDriver: true }),
    ]).start(() => onComplete());
  };

  const isUrgent = timeRemaining.isExpiringSoon;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <View style={{ marginBottom: TodaySpacing[12] }}>
        {/* Shadow layer */}
        <View
          style={{
            position: 'absolute',
            top: shadowHeight,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: TodayShadows.cardLedge.color,
            borderRadius: TodayRadii.md,
          }}
        />

        {/* Card surface */}
        <View
          style={[
            styles.card,
            isUrgent && styles.cardUrgent,
            {
              borderRadius: TodayRadii.md,
              marginBottom: shadowHeight,
              borderColor: isUrgent ? 'rgba(245,158,11,0.25)' : TodayColors.strokeSubtle,
            },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.traitBadge}>
              <Text style={styles.traitEmoji}>{trait?.emoji || '⭐'}</Text>
              <Text style={styles.traitName} numberOfLines={1}>
                {trait?.name || 'Challenge'}
              </Text>
            </View>

            <View style={[styles.timeBadge, isUrgent && styles.timeBadgeUrgent]}>
              <Text style={[styles.timeText, isUrgent && styles.timeTextUrgent]}>{timeRemaining.label}</Text>
            </View>
          </View>

          <Text style={styles.challengeText}>{challenge.challenge_text}</Text>

          <Button
            title={timeRemaining.isExpired ? 'Expired' : 'Mark complete'}
            variant={timeRemaining.isExpired ? 'outline' : 'primary'}
            size="md"
            fullWidth
            onPress={handleComplete}
            disabled={timeRemaining.isExpired || isCompleting}
            textStyle={{ textTransform: 'none' }}
          />
        </View>
      </View>
    </Animated.View>
  );
}

interface ChallengeListProps {
  challenges: CoachingChallenge[];
  onCompleteChallenge: (id: string) => void;
}

export function ChallengeList({ challenges, onCompleteChallenge }: ChallengeListProps) {
  if (challenges.length === 0) return null;

  return (
    <View>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Active Challenges</Text>
        <View style={styles.countChip}>
          <Text style={styles.countChipText}>{challenges.length}</Text>
        </View>
      </View>

      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} onComplete={() => onCompleteChallenge(challenge.id)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: TodaySpacing[12],
  },
  listTitle: {
    flex: 1,
    color: TodayColors.textPrimary,
    fontFamily: TodayTypography.bricolageBold,
    fontSize: 18,
  },
  countChip: {
    backgroundColor: 'rgba(245,158,11,0.14)',
    borderRadius: TodayRadii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: 'rgba(245,158,11,0.22)',
  },
  countChipText: {
    color: TodayColors.textPrimary,
    fontFamily: TodayTypography.bricolageSemiBold,
    fontSize: 12,
  },
  card: {
    backgroundColor: TodayColors.card,
    padding: TodaySpacing[16],
    borderWidth: 2,
    borderColor: TodayColors.strokeSubtle,
  },
  cardUrgent: {
    backgroundColor: 'rgba(245,158,11,0.08)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: TodaySpacing[12],
  },
  traitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(17,24,39,0.06)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: TodayRadii.sm,
    borderWidth: 2,
    borderColor: TodayColors.strokeSubtle,
    flexShrink: 1,
  },
  traitEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  traitName: {
    fontSize: 12,
    color: TodayColors.textSecondary,
    fontFamily: TodayTypography.poppinsSemiBold,
    flexShrink: 1,
  },
  timeBadge: {
    backgroundColor: 'rgba(17,24,39,0.06)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: TodayRadii.sm,
    borderWidth: 2,
    borderColor: TodayColors.strokeSubtle,
  },
  timeBadgeUrgent: {
    backgroundColor: 'rgba(245,158,11,0.12)',
    borderColor: 'rgba(245,158,11,0.22)',
  },
  timeText: {
    fontSize: 12,
    color: TodayColors.textMuted,
    fontFamily: TodayTypography.poppinsSemiBold,
  },
  timeTextUrgent: {
    color: '#B45309',
  },
  challengeText: {
    fontSize: 14,
    lineHeight: 20,
    color: TodayColors.textPrimary,
    fontFamily: TodayTypography.poppinsSemiBold,
    marginBottom: TodaySpacing[12],
  },
});

