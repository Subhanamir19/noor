/**
 * TarbiyahProgressBar - Progress indicator for lesson steps
 *
 * Shows 5 dots representing each step of the Tarbiyah lesson.
 * Completed steps are green, active is teal with glow, upcoming are muted.
 */

import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import {
  TarbiyahColors,
  TarbiyahSpacing,
  TarbiyahSizes,
  TarbiyahRadius,
  TarbiyahMotion,
  TarbiyahRgba,
  TARBIYAH_STEP_ORDER,
} from '../../constants/tarbiyahTokens';

interface TarbiyahProgressBarProps {
  currentStep: number; // 0-4 index
  onClose: () => void;
  onDotPress?: (index: number) => void;
}

const AnimatedView = Animated.createAnimatedComponent(View);

const ProgressDot = memo(
  ({
    index,
    currentStep,
    onPress,
  }: {
    index: number;
    currentStep: number;
    onPress?: () => void;
  }) => {
    const isCompleted = index < currentStep;
    const isActive = index === currentStep;
    const isUpcoming = index > currentStep;

    const animatedStyle = useAnimatedStyle(() => {
      const size = isActive
        ? withSpring(TarbiyahSizes.progressDotActive, TarbiyahMotion.spring)
        : withSpring(TarbiyahSizes.progressDot, TarbiyahMotion.spring);

      const backgroundColor = isCompleted
        ? TarbiyahColors.success
        : isActive
          ? TarbiyahColors.accentPrimary
          : TarbiyahRgba.progressInactive;

      return {
        width: size,
        height: size,
        backgroundColor: withTiming(backgroundColor, {
          duration: TarbiyahMotion.durationNormal,
        }),
      };
    }, [currentStep, isCompleted, isActive]);

    const glowStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(isActive ? 1 : 0, {
          duration: TarbiyahMotion.durationNormal,
        }),
      };
    }, [isActive]);

    return (
      <Pressable
        onPress={onPress}
        style={styles.dotContainer}
        hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
      >
        {/* Glow effect for active dot */}
        <AnimatedView style={[styles.dotGlow, glowStyle]} />
        <AnimatedView style={[styles.dot, animatedStyle]} />
      </Pressable>
    );
  }
);

const ConnectorLine = memo(
  ({ index, currentStep }: { index: number; currentStep: number }) => {
    const isCompleted = index < currentStep;

    const animatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: withTiming(
          isCompleted ? TarbiyahColors.success : TarbiyahRgba.progressLine,
          { duration: TarbiyahMotion.durationNormal }
        ),
      };
    }, [isCompleted]);

    return <AnimatedView style={[styles.connector, animatedStyle]} />;
  }
);

function TarbiyahProgressBarComponent({
  currentStep,
  onClose,
  onDotPress,
}: TarbiyahProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {TARBIYAH_STEP_ORDER.map((_, index) => (
          <React.Fragment key={index}>
            <ProgressDot
              index={index}
              currentStep={currentStep}
              onPress={onDotPress ? () => onDotPress(index) : undefined}
            />
            {index < TARBIYAH_STEP_ORDER.length - 1 && (
              <ConnectorLine index={index} currentStep={currentStep} />
            )}
          </React.Fragment>
        ))}
      </View>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={onClose}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        activeOpacity={0.7}
      >
        <View style={styles.closeIcon}>
          <View style={[styles.closeLine, styles.closeLineLeft]} />
          <View style={[styles.closeLine, styles.closeLineRight]} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: TarbiyahSizes.progressBarHeight,
    paddingHorizontal: TarbiyahSpacing.screenGutter,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: TarbiyahSpacing.space16,
  },
  dotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
  },
  dot: {
    borderRadius: TarbiyahRadius.full,
  },
  dotGlow: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: TarbiyahRadius.full,
    backgroundColor: TarbiyahColors.accentPrimary,
    opacity: 0.3,
  },
  connector: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
    borderRadius: 1,
  },
  closeButton: {
    width: TarbiyahSizes.closeButton,
    height: TarbiyahSizes.closeButton,
    borderRadius: TarbiyahRadius.full,
    backgroundColor: `rgba(255,255,255,0.1)`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: TarbiyahSizes.closeIcon,
    height: TarbiyahSizes.closeIcon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeLine: {
    position: 'absolute',
    width: 16,
    height: 2,
    backgroundColor: `rgba(255,255,255,0.6)`,
    borderRadius: 1,
  },
  closeLineLeft: {
    transform: [{ rotate: '45deg' }],
  },
  closeLineRight: {
    transform: [{ rotate: '-45deg' }],
  },
});

export const TarbiyahProgressBar = memo(TarbiyahProgressBarComponent);
