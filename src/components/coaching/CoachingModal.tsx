import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';

import { IconButton } from '@/components/common/IconButton';
import { Button } from '@/components/common/Button';
import { TodayColors, TodayRadii, TodaySpacing, TodayTypography } from '@/constants/todayTokens';
import { getTraitById } from '@/data/characterScenarios';
import type { InterventionTrigger } from '@/services/coachingEngine';

interface Props {
  visible: boolean;
  trigger: InterventionTrigger | null;
  onAccept: () => void;
  onDecline: () => void;
}

const INTERVENTION_COLORS: Record<string, { bg: string; border: string }> = {
  first_struggle: { bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.22)' },
  repeated: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.26)' },
  persistent: { bg: 'rgba(239,68,68,0.10)', border: 'rgba(239,68,68,0.22)' },
  no_wins: { bg: 'rgba(22,163,74,0.10)', border: 'rgba(22,163,74,0.22)' },
};

export function CoachingModal({ visible, trigger, onAccept, onDecline }: Props) {
  const slideAnim = useRef(new Animated.Value(320)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, friction: 9, tension: 70, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 180, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 320, duration: 180, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim]);

  if (!trigger) return null;

  const { script, traitId, type } = trigger;
  const trait = traitId !== 'general' ? getTraitById(traitId) : null;
  const tone = INTERVENTION_COLORS[type] || INTERVENTION_COLORS.first_struggle;

  return (
    <Modal visible={visible} animationType="none" transparent onRequestClose={onDecline}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onDecline} accessibilityLabel="Dismiss coaching" />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateY: slideAnim }],
              backgroundColor: TodayColors.card,
              borderColor: TodayColors.strokeSubtle,
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeEmoji}>{trait?.emoji || '💡'}</Text>
              <Text style={styles.badgeText} numberOfLines={1}>
                {trait?.name || 'Coaching'}
              </Text>
            </View>
            <IconButton
              variant="ghost"
              size="sm"
              onPress={onDecline}
              accessibilityRole="button"
              accessibilityLabel="Close coaching"
              icon={<XMarkIcon size={20} color={TodayColors.textSecondary} />}
            />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={[styles.callout, { backgroundColor: tone.bg, borderColor: tone.border }]}>
              <Text style={styles.title}>{script.title}</Text>
              <Text style={styles.message}>{script.message}</Text>
            </View>

            {script.islamicWisdom && (
              <View style={styles.wisdomCard}>
                {!!script.islamicWisdom.arabic && (
                  <Text style={styles.arabicText}>{script.islamicWisdom.arabic}</Text>
                )}
                <Text style={styles.translationText}>“{script.islamicWisdom.translation}”</Text>
                <Text style={styles.sourceText}>{script.islamicWisdom.source}</Text>
              </View>
            )}

            <View style={styles.encouragementCard}>
              <Text style={styles.encourageEmoji}>🌿</Text>
              <Text style={styles.encouragementText}>{script.encouragement}</Text>
            </View>

            {script.challenge && (
              <View style={styles.challengeSection}>
                <Text style={styles.challengeLabel}>Today’s Challenge</Text>
                <View style={[styles.challengeCard, { borderColor: TodayColors.strokeSubtle }]}>
                  <Text style={styles.challengeText}>{script.challenge.text}</Text>
                  <Text style={styles.challengeDuration}>
                    Complete within {script.challenge.durationHours} hours
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Actions */}
          <View style={styles.actions}>
            <Button
              title={script.challenge ? 'Accept Challenge' : 'Got it'}
              variant="primary"
              size="lg"
              fullWidth
              onPress={onAccept}
              textStyle={{ textTransform: 'none' }}
            />
            <View style={{ height: TodaySpacing[12] }} />
            <Button
              title="Maybe later"
              variant="outline"
              size="lg"
              fullWidth
              onPress={onDecline}
              textStyle={{ textTransform: 'none' }}
            />
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
  sheet: {
    borderTopLeftRadius: TodayRadii.lg,
    borderTopRightRadius: TodayRadii.lg,
    maxHeight: '85%',
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: TodaySpacing[16],
    paddingTop: TodaySpacing[16],
    paddingBottom: TodaySpacing[12],
    borderBottomWidth: 2,
    borderBottomColor: TodayColors.strokeSubtle,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(17,24,39,0.06)',
    borderRadius: TodayRadii.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: TodayColors.strokeSubtle,
    flexShrink: 1,
  },
  badgeEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  badgeText: {
    fontFamily: TodayTypography.bricolageSemiBold,
    color: TodayColors.textPrimary,
    fontSize: 14,
    flexShrink: 1,
  },
  content: {
    padding: TodaySpacing[16],
  },
  callout: {
    borderRadius: TodayRadii.md,
    padding: TodaySpacing[16],
    borderWidth: 2,
  },
  title: {
    fontFamily: TodayTypography.bricolageBold,
    fontSize: 22,
    lineHeight: 28,
    color: TodayColors.textPrimary,
    textAlign: 'center',
  },
  message: {
    marginTop: TodaySpacing[12],
    fontFamily: TodayTypography.poppinsSemiBold,
    fontSize: 14,
    lineHeight: 20,
    color: TodayColors.textSecondary,
    textAlign: 'center',
  },
  wisdomCard: {
    marginTop: TodaySpacing[16],
    backgroundColor: TodayColors.card,
    borderRadius: TodayRadii.md,
    padding: TodaySpacing[16],
    borderWidth: 2,
    borderColor: TodayColors.strokeSubtle,
  },
  arabicText: {
    fontFamily: 'System',
    fontSize: 18,
    lineHeight: 28,
    color: TodayColors.textPrimary,
    textAlign: 'center',
    marginBottom: TodaySpacing[8],
  },
  translationText: {
    fontFamily: TodayTypography.poppinsSemiBold,
    fontSize: 14,
    lineHeight: 20,
    color: TodayColors.textPrimary,
    textAlign: 'center',
  },
  sourceText: {
    marginTop: TodaySpacing[8],
    fontFamily: TodayTypography.poppinsSemiBold,
    fontSize: 12,
    lineHeight: 16,
    color: TodayColors.textMuted,
    textAlign: 'center',
  },
  encouragementCard: {
    marginTop: TodaySpacing[16],
    backgroundColor: 'rgba(88,204,2,0.10)',
    borderRadius: TodayRadii.md,
    padding: TodaySpacing[16],
    borderWidth: 2,
    borderColor: 'rgba(88,204,2,0.18)',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  encourageEmoji: {
    fontSize: 18,
    marginTop: 1,
  },
  encouragementText: {
    flex: 1,
    fontFamily: TodayTypography.poppinsSemiBold,
    fontSize: 14,
    lineHeight: 20,
    color: TodayColors.textPrimary,
  },
  challengeSection: {
    marginTop: TodaySpacing[16],
  },
  challengeLabel: {
    fontFamily: TodayTypography.bricolageSemiBold,
    fontSize: 16,
    lineHeight: 22,
    color: TodayColors.textPrimary,
    marginBottom: TodaySpacing[8],
  },
  challengeCard: {
    backgroundColor: TodayColors.card,
    borderRadius: TodayRadii.md,
    padding: TodaySpacing[16],
    borderWidth: 2,
  },
  challengeText: {
    fontFamily: TodayTypography.poppinsSemiBold,
    fontSize: 14,
    lineHeight: 20,
    color: TodayColors.textPrimary,
  },
  challengeDuration: {
    marginTop: TodaySpacing[8],
    fontFamily: TodayTypography.poppinsSemiBold,
    fontSize: 12,
    lineHeight: 16,
    color: TodayColors.textMuted,
  },
  actions: {
    padding: TodaySpacing[16],
    borderTopWidth: 2,
    borderTopColor: TodayColors.strokeSubtle,
    backgroundColor: TodayColors.card,
  },
});
