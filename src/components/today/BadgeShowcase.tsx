/**
 * BadgeShowcase - Display current badge and progress to next
 *
 * Features:
 * - Current badge display with glow effect
 * - Progress bar to next badge
 * - Expandable view to see all unlocked badges
 * - Badge cards with name, description, icon, unlock date
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
import { TodayColors } from '@/constants/todayTokens';
import {
  GamificationColors,
  GamificationTypography,
  GamificationSpacing,
  GamificationShadows,
  GamificationBorderRadius,
} from '@/constants/gamificationTokens';
import {
  BADGES,
  getCurrentBadge,
  getNextBadge,
  type Badge,
} from '@/types/gamification';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ============================================================================
// Types
// ============================================================================

interface BadgeShowcaseProps {
  totalHPEarned: number;
  unlockedBadges: string[];
}

// ============================================================================
// Component
// ============================================================================

function BadgeShowcaseComponent({ totalHPEarned, unlockedBadges }: BadgeShowcaseProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentBadge = getCurrentBadge(totalHPEarned);
  const nextBadge = getNextBadge(totalHPEarned);

  // Calculate progress to next badge
  const progress = nextBadge
    ? ((totalHPEarned - currentBadge.hp_threshold) /
        (nextBadge.hp_threshold - currentBadge.hp_threshold)) *
      100
    : 100;

  const hpToNext = nextBadge ? nextBadge.hp_threshold - totalHPEarned : 0;

  // ============================================================================
  // Event Handlers
  // ============================================================================

  const handleExpandToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <View style={styles.container}>
      {/* Current Badge Display */}
      <View style={styles.currentBadgeSection}>
        <Text style={styles.sectionTitle}>Your Current Badge</Text>
        <View style={[styles.badgeCard, styles.currentBadgeCard]}>
          <View style={styles.badgeIconContainer}>
            <Text style={styles.badgeIcon}>{currentBadge.icon}</Text>
          </View>
          <View style={styles.badgeInfo}>
            <Text style={styles.badgeName}>{currentBadge.name}</Text>
            <Text style={styles.badgeHPThreshold}>{currentBadge.hp_threshold} HP earned</Text>
          </View>
        </View>
        <Text style={styles.badgeDescription}>{currentBadge.description}</Text>
      </View>

      {/* Progress to Next Badge */}
      {nextBadge && (
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.nextBadgeLabel}>Next: {nextBadge.name} {nextBadge.icon}</Text>
            <Text style={styles.hpRemaining}>{hpToNext} HP to go</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${Math.min(progress, 100)}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {totalHPEarned} / {nextBadge.hp_threshold} HP
          </Text>
        </View>
      )}

      {/* Max Badge Reached */}
      {!nextBadge && (
        <View style={styles.maxBadgeSection}>
          <Text style={styles.maxBadgeText}>🎉 You've reached the highest badge!</Text>
          <Text style={styles.maxBadgeSubtext}>Keep earning HP to maintain your excellence</Text>
        </View>
      )}

      {/* Expand to See All Badges */}
      <TouchableOpacity style={styles.expandButton} onPress={handleExpandToggle} activeOpacity={0.7}>
        <Text style={styles.expandButtonText}>
          {isExpanded ? '↑ Hide all badges' : '↓ See all badges'}
        </Text>
      </TouchableOpacity>

      {/* All Badges List */}
      {isExpanded && (
        <View style={styles.allBadgesSection}>
          {BADGES.map((badge) => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            const isCurrent = badge.id === currentBadge.id;

            return (
              <View
                key={badge.id}
                style={[
                  styles.badgeListItem,
                  !isUnlocked && styles.badgeListItemLocked,
                  isCurrent && styles.badgeListItemCurrent,
                ]}
              >
                <Text style={[styles.badgeListIcon, !isUnlocked && styles.badgeListIconLocked]}>
                  {isUnlocked ? badge.icon : '🔒'}
                </Text>
                <View style={styles.badgeListInfo}>
                  <Text style={[styles.badgeListName, !isUnlocked && styles.badgeListNameLocked]}>
                    {badge.name}
                  </Text>
                  <Text style={styles.badgeListThreshold}>{badge.hp_threshold} HP</Text>
                </View>
                {isCurrent && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>Current</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: TodayColors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },

  // Current Badge
  currentBadgeSection: {
    marginBottom: 20,
  },

  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(245,158,11,0.08)',
    borderRadius: GamificationBorderRadius.card,
    borderWidth: 2,
    borderColor: 'rgba(245,158,11,0.2)',
  },

  currentBadgeCard: {
    ...GamificationShadows.badgeGlow,
    marginBottom: 12,
  },

  badgeIconContainer: {
    width: GamificationSpacing.badgeIconSize,
    height: GamificationSpacing.badgeIconSize,
    borderRadius: GamificationSpacing.badgeIconSize / 2,
    backgroundColor: TodayColors.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  badgeIcon: {
    fontSize: 36,
  },

  badgeInfo: {
    flex: 1,
  },

  badgeName: {
    ...GamificationTypography.badgeName,
    color: TodayColors.textPrimary,
    marginBottom: 4,
  },

  badgeHPThreshold: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: GamificationColors.hpPrimary,
  },

  badgeDescription: {
    ...GamificationTypography.badgeDescription,
    color: TodayColors.textSecondary,
    fontStyle: 'italic',
  },

  // Progress Section
  progressSection: {
    marginBottom: 20,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  nextBadgeLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: TodayColors.textPrimary,
  },

  hpRemaining: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: GamificationColors.hpPrimary,
  },

  progressBarTrack: {
    height: 8,
    backgroundColor: GamificationColors.hpBarTrack,
    borderRadius: 9999,
    overflow: 'hidden',
    marginBottom: 6,
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: GamificationColors.hpBarFill,
    borderRadius: 9999,
  },

  progressText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: TodayColors.textMuted,
    textAlign: 'center',
  },

  // Max Badge Section
  maxBadgeSection: {
    padding: 16,
    backgroundColor: TodayColors.successBg,
    borderRadius: GamificationBorderRadius.card,
    borderWidth: 1,
    borderColor: TodayColors.successBorder,
    marginBottom: 20,
    alignItems: 'center',
  },

  maxBadgeText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: TodayColors.successDark,
    marginBottom: 4,
  },

  maxBadgeSubtext: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: TodayColors.textSecondary,
  },

  // Expand Button
  expandButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: TodayColors.strokeSubtle,
  },

  expandButtonText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: TodayColors.textLink,
  },

  // All Badges List
  allBadgesSection: {
    marginTop: 16,
    gap: 12,
  },

  badgeListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(245,158,11,0.06)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.15)',
  },

  badgeListItemLocked: {
    backgroundColor: 'rgba(107,114,128,0.06)',
    borderColor: 'rgba(107,114,128,0.15)',
  },

  badgeListItemCurrent: {
    borderWidth: 2,
    borderColor: GamificationColors.badgeGold,
  },

  badgeListIcon: {
    fontSize: 28,
    marginRight: 12,
  },

  badgeListIconLocked: {
    opacity: 0.4,
  },

  badgeListInfo: {
    flex: 1,
  },

  badgeListName: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: TodayColors.textPrimary,
    marginBottom: 2,
  },

  badgeListNameLocked: {
    color: TodayColors.textMuted,
  },

  badgeListThreshold: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: TodayColors.textSecondary,
  },

  currentBadge: {
    backgroundColor: GamificationColors.badgeGold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  currentBadgeText: {
    fontSize: 11,
    fontFamily: 'Poppins-Bold',
    color: TodayColors.textInverse,
    letterSpacing: 0.3,
  },
});

// ============================================================================
// Export
// ============================================================================

export const BadgeShowcase = memo(BadgeShowcaseComponent);
