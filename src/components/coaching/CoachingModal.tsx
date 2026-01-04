import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { InterventionTrigger } from '@/services/coachingEngine';
import { getTraitById } from '@/data/characterScenarios';

interface Props {
  visible: boolean;
  trigger: InterventionTrigger | null;
  onAccept: () => void;
  onDecline: () => void;
}

const INTERVENTION_COLORS: Record<string, { bg: string; accent: string; text: string }> = {
  first_struggle: {
    bg: '#FFF8E1',
    accent: '#FFB300',
    text: '#5D4037',
  },
  repeated: {
    bg: '#FFF3E0',
    accent: '#FF9800',
    text: '#4E342E',
  },
  persistent: {
    bg: '#FFEBEE',
    accent: '#EF5350',
    text: '#B71C1C',
  },
  no_wins: {
    bg: '#E8F5E9',
    accent: '#66BB6A',
    text: '#1B5E20',
  },
};

export function CoachingModal({ visible, trigger, onAccept, onDecline }: Props) {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          tension: 65,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim]);

  if (!trigger) return null;

  const { script, traitId, type } = trigger;
  const trait = traitId !== 'general' ? getTraitById(traitId) : null;
  const colors = INTERVENTION_COLORS[type] || INTERVENTION_COLORS.first_struggle;

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      onRequestClose={onDecline}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.backdrop, { opacity: fadeAnim }]}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={onDecline} />
        </Animated.View>

        <Animated.View
          style={[
            styles.modal,
            { backgroundColor: colors.bg },
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Header with trait */}
          <View style={styles.header}>
            {trait ? (
              <View style={styles.traitBadge}>
                <Text style={styles.traitEmoji}>{trait.emoji}</Text>
                <Text style={styles.traitName}>{trait.name}</Text>
              </View>
            ) : (
              <View style={styles.traitBadge}>
                <Text style={styles.traitEmoji}>💚</Text>
                <Text style={styles.traitName}>Coaching</Text>
              </View>
            )}
            <Pressable onPress={onDecline} style={styles.closeButton}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Title */}
            <Text style={[styles.title, { color: colors.text }]}>
              {script.title}
            </Text>

            {/* Message */}
            <Text style={styles.message}>{script.message}</Text>

            {/* Islamic Wisdom */}
            {script.islamicWisdom && (
              <View style={[styles.wisdomCard, { borderColor: colors.accent }]}>
                {script.islamicWisdom.arabic && (
                  <Text style={styles.arabicText}>
                    {script.islamicWisdom.arabic}
                  </Text>
                )}
                <Text style={styles.translationText}>
                  "{script.islamicWisdom.translation}"
                </Text>
                <Text style={styles.sourceText}>
                  — {script.islamicWisdom.source}
                </Text>
              </View>
            )}

            {/* Encouragement */}
            <View style={[styles.encouragementCard, { backgroundColor: colors.accent + '20' }]}>
              <Text style={styles.encouragementEmoji}>💪</Text>
              <Text style={[styles.encouragementText, { color: colors.text }]}>
                {script.encouragement}
              </Text>
            </View>

            {/* Challenge */}
            {script.challenge && (
              <View style={styles.challengeSection}>
                <Text style={styles.challengeLabel}>Today's Challenge</Text>
                <View style={[styles.challengeCard, { borderColor: colors.accent }]}>
                  <Text style={styles.challengeEmoji}>🎯</Text>
                  <Text style={styles.challengeText}>{script.challenge.text}</Text>
                  <Text style={styles.challengeDuration}>
                    Complete within {script.challenge.durationHours} hours
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Action buttons */}
          <View style={styles.actions}>
            <Pressable
              style={[styles.acceptButton, { backgroundColor: colors.accent }]}
              onPress={onAccept}
            >
              <Text style={styles.acceptText}>
                {script.challenge ? 'Accept Challenge' : 'Got It'}
              </Text>
            </Pressable>

            <Pressable style={styles.declineButton} onPress={onDecline}>
              <Text style={styles.declineText}>Maybe Later</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  traitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  traitEmoji: {
    fontSize: 20,
    marginRight: 6,
  },
  traitName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A5F4A',
  },
  closeButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 28,
    color: '#78716C',
    fontWeight: '300',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 20,
  },
  wisdomCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  arabicText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A5F4A',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'System',
  },
  translationText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 4,
  },
  sourceText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  encouragementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  encouragementEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  encouragementText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  challengeSection: {
    marginBottom: 16,
  },
  challengeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#78716C',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  challengeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  challengeEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  challengeText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  challengeDuration: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actions: {
    paddingHorizontal: 20,
    gap: 12,
  },
  acceptButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  acceptText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  declineButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  declineText: {
    fontSize: 14,
    color: '#78716C',
  },
});
