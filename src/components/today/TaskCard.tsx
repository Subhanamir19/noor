/**
 * TaskCard - Clean, modern task card design
 *
 * Design Specs:
 * - SF Pro Bold ~22pt for task title in true black
 * - Nested 3D completion badge: outer white (56x56px, 12px radius) + inner green (44x44px, 10px radius)
 * - Energy indicator "5⚡" between title and completion badge
 * - Inner shadow on green button for tactile pressed feel
 */

import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  TodayScreenColors,
  TodayScreenSpacing,
  TodayScreenMotion,
  TodayScreenIcons,
  getTaskCategoryStyle,
} from '@/constants/todayScreenTokens';

// ============================================================================
// Types
// ============================================================================

interface TaskCardProps {
  id: string;
  title: string;
  icon?: string;
  category?: string;
  points?: number;
  isCompleted: boolean;
  onComplete: () => void;
  onPress?: () => void;
  showMascot?: boolean;
}

// ============================================================================
// Main Component
// ============================================================================

function TaskCardComponent({
  id: _id,
  title,
  icon,
  category,
  points = 5,
  isCompleted,
  onComplete,
  onPress,
  showMascot: _showMascot = false,
}: TaskCardProps): React.JSX.Element {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.98, TodayScreenMotion.springSmooth);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, TodayScreenMotion.springSmooth);
  };

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Get category-specific icon styling
  const categoryStyle = getTaskCategoryStyle(category);
  const displayIcon = icon || categoryStyle.icon;

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${points} points${isCompleted ? ', completed' : ''}`}
    >
      <Animated.View
        style={[
          styles.container,
          isCompleted && styles.containerCompleted,
          cardAnimatedStyle,
        ]}
      >
        {/* Task Icon - Rounded square with category bg */}
        <View style={[styles.iconContainer, { backgroundColor: categoryStyle.bg }]}>
          <Text style={styles.iconEmoji}>{displayIcon}</Text>
        </View>

        {/* Title - SF Pro Bold ~22pt in true black */}
        <View style={styles.content}>
          <Text
            style={[styles.title, isCompleted && styles.titleCompleted]}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>

        {/* Energy Indicator - Between title and completion badge */}
        <View style={styles.energyContainer}>
          <Text style={styles.energyText}>{points}</Text>
          <Text style={styles.energyIcon}>{TodayScreenIcons.lightning}</Text>
        </View>

        {/* Nested 3D Completion Badge */}
        <Nested3DCompletionBadge
          isChecked={isCompleted}
          onPress={onComplete}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

export const TaskCard = memo(TaskCardComponent);

// ============================================================================
// Chunky3DCheckButton - 3D white button with carved green checkmark
// Follows the same pattern as Button.tsx - no animations, instant press state
// ============================================================================

interface Chunky3DCheckButtonProps {
  isChecked: boolean;
  onPress: () => void;
}

function Nested3DCompletionBadge({ isChecked, onPress }: Chunky3DCheckButtonProps): React.JSX.Element {
  // 3D button dimensions
  const BUTTON_SIZE = 52;
  const SHADOW_HEIGHT = 4;
  const BORDER_RADIUS = 12;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked }}
    >
      {({ pressed }) => {
        const translateY = pressed ? SHADOW_HEIGHT : 0;
        const currentShadowHeight = pressed ? 0 : SHADOW_HEIGHT;

        return (
          <View style={{ width: BUTTON_SIZE, height: BUTTON_SIZE + SHADOW_HEIGHT }}>
            {/* Shadow/ledge layer - sits at the bottom */}
            <View
              style={{
                position: 'absolute',
                top: SHADOW_HEIGHT,
                left: 0,
                width: BUTTON_SIZE,
                height: BUTTON_SIZE,
                backgroundColor: '#D1D5DB',
                borderRadius: BORDER_RADIUS,
              }}
            />

            {/* Main button surface */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: BUTTON_SIZE,
                height: BUTTON_SIZE,
                backgroundColor: '#F3F4F6',
                borderRadius: BORDER_RADIUS,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ translateY }],
                marginBottom: currentShadowHeight,
              }}
            >
              {/* Green checkmark - always visible, grayed out when unchecked */}
              <View style={styles.checkmarkContainer}>
                <View style={[
                  styles.checkmarkShortLeg,
                  !isChecked && styles.checkmarkUnchecked
                ]} />
                <View style={[
                  styles.checkmarkLongLeg,
                  !isChecked && styles.checkmarkUnchecked
                ]} />
              </View>
            </View>
          </View>
        );
      }}
    </Pressable>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  // Card Container - Clean white with subtle shadow
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TodayScreenColors.bgCard,
    borderRadius: 16,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: TodayScreenSpacing.screenGutter,
    marginBottom: 10,
    // Subtle card shadow
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  containerCompleted: {
    opacity: 0.85,
  },

  // Icon Container - Rounded square with subtle bg
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  iconEmoji: {
    fontSize: 24,
  },

  // Content Area - Title fills available space
  content: {
    flex: 1,
    marginLeft: 12,
    marginRight: 4,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000', // True black
    letterSpacing: 0.1,
  },
  titleCompleted: {
    color: TodayScreenColors.textMuted,
    textDecorationLine: 'line-through',
  },

  // Energy Indicator - "5⚡" - positioned close to checkmark
  energyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  energyText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#374151', // Dark gray
  },
  energyIcon: {
    fontSize: 14,
    marginLeft: 2,
  },

  // ========================================
  // Chunky 3D Button Styles
  // ========================================

  // Wrapper contains both ledge and button
  chunkyWrapper: {
    position: 'relative',
  },

  // Bottom ledge - darker gray that creates 3D depth
  chunkyLedge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#D1D5DB', // Gray ledge color
  },

  // Main button surface - off-white/light gray
  chunkyButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#F5F5F7', // Off-white button surface
    alignItems: 'center',
    justifyContent: 'center',
    // Subtle top highlight for 3D effect
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },

  // Checkmark container
  checkmarkContainer: {
    width: 28,
    height: 28,
    position: 'relative',
  },

  // Short leg of the checkmark (bottom-left going down-right)
  checkmarkShortLeg: {
    position: 'absolute',
    width: 4,
    height: 12,
    backgroundColor: '#34C759', // iOS green
    borderRadius: 2,
    transform: [{ rotate: '-45deg' }],
    left: 4,
    top: 10,
  },

  // Long leg of the checkmark (going up-right)
  checkmarkLongLeg: {
    position: 'absolute',
    width: 4,
    height: 20,
    backgroundColor: '#34C759', // iOS green
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
    left: 14,
    top: 2,
  },

  // Unchecked state - light gray checkmark
  checkmarkUnchecked: {
    backgroundColor: '#D1D5DB',
  },
});
