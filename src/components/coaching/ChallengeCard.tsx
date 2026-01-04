import React, { useEffect, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { CoachingChallenge } from '@/types/models';
import { getTraitById } from '@/data/characterScenarios';
import { successHaptic } from '@/utils/haptics';

interface Props {
  challenge: CoachingChallenge;
  onComplete: () => void;
}

export function ChallengeCard({ challenge, onComplete }: Props) {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const trait = getTraitById(challenge.trait_id);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      const expires = new Date(challenge.expires_at).getTime();
      const diff = expires - now;

      if (diff <= 0) {
        setTimeRemaining('Expired');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m left`);
      } else {
        setTimeRemaining(`${minutes}m left`);
      }

      // Expiring soon if less than 2 hours
      setIsExpiringSoon(hours < 2);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [challenge.expires_at]);

  const handleComplete = async () => {
    setIsCompleting(true);
    successHaptic();

    // Celebration animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onComplete();
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        isExpiringSoon && styles.containerExpiring,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.traitBadge}>
          <Text style={styles.traitEmoji}>{trait?.emoji || '🎯'}</Text>
          <Text style={styles.traitName}>{trait?.name || 'Challenge'}</Text>
        </View>
        <View style={[styles.timeBadge, isExpiringSoon && styles.timeBadgeUrgent]}>
          <Text style={[styles.timeText, isExpiringSoon && styles.timeTextUrgent]}>
            {timeRemaining}
          </Text>
        </View>
      </View>

      <Text style={styles.challengeText}>{challenge.challenge_text}</Text>

      <Pressable
        style={[styles.completeButton, isCompleting && styles.completeButtonDisabled]}
        onPress={handleComplete}
        disabled={isCompleting}
      >
        <Text style={styles.completeEmoji}>✓</Text>
        <Text style={styles.completeText}>Mark Complete</Text>
      </Pressable>
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
    <View style={styles.listContainer}>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Active Challenges</Text>
        <Text style={styles.listCount}>{challenges.length}</Text>
      </View>
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          onComplete={() => onCompleteChallenge(challenge.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A5F4A',
    flex: 1,
  },
  listCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#FF9800',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  containerExpiring: {
    borderColor: '#FF9800',
    backgroundColor: '#FFF8E1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  traitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  traitEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  traitName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  timeBadge: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeBadgeUrgent: {
    backgroundColor: '#FFECB3',
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#78716C',
  },
  timeTextUrgent: {
    color: '#F57C00',
  },
  challengeText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
    marginBottom: 16,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#58CC02',
    borderRadius: 12,
    paddingVertical: 12,
    shadowColor: '#58A700',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  completeButtonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  completeEmoji: {
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 6,
  },
  completeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
