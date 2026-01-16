/**
 * EnhancedTaskCard - Gamified task card with HP, time estimates, and priority indicators
 *
 * Features:
 * - Priority-based visual styling (normal/important/critical glows)
 * - HP value display with lightning bolt
 * - Time estimate badge
 * - Animated tap-to-complete button
 * - Expandable "Why this matters" benefit text
 * - Completion overlay with checkmark
 */

import React, { memo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import type { DailyTask } from '@/types/models';
import { TodayColors } from '@/constants/todayTokens';
import {
  GamificationColors,
  GamificationTypography,
  GamificationSpacing,
  GamificationShadows,
  GamificationBorderRadius,
  GamificationAnimations,
} from '@/constants/gamificationTokens';
import { formatHPValue, formatTimeEstimate } from '@/utils/hpCalculator';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ============================================================================
// Types
// ============================================================================

interface EnhancedTaskCardProps {
  task: DailyTask;
  isCompleted: boolean;
  onComplete: () => void;
  onExpand?: () => void;
  isExpanded?: boolean;
}

// ============================================================================
// Component
// ============================================================================

function EnhancedTaskCardComponent({
  task,
  isCompleted,
  onComplete,
  onExpand,
  isExpanded = false,
}: EnhancedTaskCardProps) {
  const [localExpanded, setLocalExpanded] = useState(isExpanded);

  // Animation values
  const buttonScale = useSharedValue(1);
  const buttonTranslateY = useSharedValue(0);
  const checkmarkScale = useSharedValue(isCompleted ? 1 : 0);
  const checkmarkRotation = useSharedValue(isCompleted ? 0 : -180);

  // ============================================================================
  // Event Handlers
  // ============================================================================

  const handlePress = () => {
    if (isCompleted) return; // Prevent toggling off

    // Animate button press
    buttonScale.value = withTiming(
      GamificationAnimations.buttonPress.scaleDown,
      { duration: GamificationAnimations.buttonPress.duration }
    );
    buttonTranslateY.value = withTiming(
      GamificationAnimations.buttonPress.translateY,
      { duration: GamificationAnimations.buttonPress.duration }
    );

    // Animate button release with spring
    setTimeout(() => {
      buttonScale.value = withSequence(
        withSpring(GamificationAnimations.buttonRelease.scaleUp, {
          damping: GamificationAnimations.buttonRelease.damping,
          stiffness: GamificationAnimations.buttonRelease.stiffness,
        }),
        withSpring(1, {
          damping: GamificationAnimations.buttonRelease.damping,
          stiffness: GamificationAnimations.buttonRelease.stiffness,
        })
      );
      buttonTranslateY.value = withSpring(0, {
        damping: 15,
        stiffness: 300,
      });
    }, GamificationAnimations.buttonPress.duration);

    // Animate checkmark entrance
    setTimeout(() => {
      checkmarkScale.value = withSequence(
        withTiming(1.2, {
          duration: 150,
          easing: Easing.out(Easing.back(1.5)),
        }),
        withTiming(1.0, { duration: 100 })
      );
      checkmarkRotation.value = withTiming(0, {
        duration: GamificationAnimations.checkmarkAppear.duration,
        easing: Easing.out(Easing.ease),
      });
    }, GamificationAnimations.buttonRelease.duration);

    // Trigger completion callback
    setTimeout(() => {
      onComplete();
    }, GamificationAnimations.buttonPress.duration + 50);
  };

  const handleExpandToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLocalExpanded(!localExpanded);
    onExpand?.();
  };

  // ============================================================================
  // Animated Styles
  // ============================================================================

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: buttonScale.value },
      { translateY: buttonTranslateY.value },
    ],
  }));

  const checkmarkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: checkmarkScale.value },
      { rotate: `${checkmarkRotation.value}deg` },
    ],
    opacity: checkmarkScale.value,
  }));

  // ============================================================================
  // Priority Styling
  // ============================================================================

  const getPriorityStyle = () => {
    switch (task.priority_level) {
      case 'important':
        return {
          borderColor: GamificationColors.priorityImportant,
          borderWidth: 2,
          ...GamificationShadows.priorityImportantGlow,
        };
      case 'critical':
        return {
          borderColor: GamificationColors.priorityCritical,
          borderWidth: 3,
          ...GamificationShadows.priorityCriticalGlow,
        };
      default:
        return {
          borderColor: TodayColors.strokeMedium,
          borderWidth: 1,
        };
    }
  };

  const getPriorityBadge = () => {
    if (task.priority_level === 'important') return '⭐';
    if (task.priority_level === 'critical') return '🔥';
    return null;
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <View style={[styles.container, getPriorityStyle()]}>
      {/* Priority Badge */}
      {getPriorityBadge() && (
        <View style={styles.priorityBadge}>
          <Text style={styles.priorityBadgeText}>{getPriorityBadge()}</Text>
        </View>
      )}

      {/* Main Content */}
      <View style={styles.content}>
        {/* Task Icon & Title */}
        <View style={styles.header}>
          <Text style={styles.icon}>{task.icon || '✨'}</Text>
          <Text style={[styles.title, isCompleted && styles.titleCompleted]}>
            {task.title}
          </Text>
        </View>

        {/* Metadata Row: Time + HP */}
        <View style={styles.metadataRow}>
          <View style={styles.timeEstimate}>
            <Text style={styles.timeText}>{formatTimeEstimate(task.time_estimate)}</Text>
          </View>
          <View style={styles.hpBadge}>
            <Text style={styles.hpText}>{formatHPValue(task.hp_value)}</Text>
          </View>
        </View>

        {/* Completion Button */}
        {!isCompleted ? (
          <Animated.View style={buttonAnimatedStyle}>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={handlePress}
              activeOpacity={0.9}
            >
              <Text style={styles.completeButtonText}>Tap to Complete</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View style={styles.completedOverlay}>
            <Animated.View style={checkmarkAnimatedStyle}>
              <Text style={styles.checkmark}>✓</Text>
            </Animated.View>
            <Text style={styles.completedText}>Completed!</Text>
          </View>
        )}

        {/* Expand Benefits Button */}
        {task.benefit_text && (
          <TouchableOpacity
            style={styles.expandButton}
            onPress={handleExpandToggle}
            activeOpacity={0.7}
          >
            <Text style={styles.expandButtonText}>
              {localExpanded ? '↑ Hide' : '↓ Why this matters...'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Expanded Benefit Text */}
        {localExpanded && task.benefit_text && (
          <View style={styles.benefitContainer}>
            <Text style={styles.benefitText}>{task.benefit_text}</Text>
          </View>
        )}
      </View>

      {/* Completed Green Tint Overlay */}
      {isCompleted && <View style={styles.completedTint} />}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: TodayColors.bgCard,
    borderRadius: GamificationBorderRadius.card,
    padding: GamificationSpacing.cardPadding,
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',

    // Base shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  priorityBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
  },

  priorityBadgeText: {
    fontSize: 16,
  },

  content: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  icon: {
    fontSize: 24,
    marginRight: 12,
  },

  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: TodayColors.textPrimary,
    lineHeight: 22,
  },

  titleCompleted: {
    color: TodayColors.textMuted,
    textDecorationLine: 'line-through',
  },

  metadataRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },

  timeEstimate: {
    backgroundColor: 'rgba(107,114,128,0.1)',
    paddingHorizontal: GamificationSpacing.hpBadgePadding,
    paddingVertical: 4,
    borderRadius: GamificationBorderRadius.hpBadge,
  },

  timeText: {
    ...GamificationTypography.taskTimeEstimate,
    color: TodayColors.textSecondary,
  },

  hpBadge: {
    backgroundColor: GamificationColors.hpBackground,
    paddingHorizontal: GamificationSpacing.hpBadgePadding,
    paddingVertical: 4,
    borderRadius: GamificationBorderRadius.hpBadge,
    borderWidth: 1,
    borderColor: GamificationColors.hpBorder,
  },

  hpText: {
    ...GamificationTypography.hpValue,
    color: GamificationColors.hpPrimary,
  },

  completeButton: {
    backgroundColor: TodayColors.ctaPrimary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: GamificationBorderRadius.button,
    alignItems: 'center',
    justifyContent: 'center',

    // 3D ledge effect
    shadowColor: TodayColors.ctaPrimaryLedge,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },

  completeButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: TodayColors.textInverse,
    letterSpacing: 0.3,
  },

  completedOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: TodayColors.successBg,
    borderRadius: GamificationBorderRadius.button,
    borderWidth: 1,
    borderColor: TodayColors.successBorder,
  },

  checkmark: {
    fontSize: 24,
    color: TodayColors.success,
    fontWeight: 'bold',
    marginRight: 8,
  },

  completedText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: TodayColors.successDark,
  },

  expandButton: {
    marginTop: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },

  expandButtonText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: TodayColors.textLink,
  },

  benefitContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: 'rgba(13,148,136,0.06)',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: TodayColors.ctaPrimary,
  },

  benefitText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: TodayColors.textSecondary,
    lineHeight: 18,
  },

  completedTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(88,204,2,0.08)',
    pointerEvents: 'none',
  },
});

// ============================================================================
// Export
// ============================================================================

export const EnhancedTaskCard = memo(EnhancedTaskCardComponent);
