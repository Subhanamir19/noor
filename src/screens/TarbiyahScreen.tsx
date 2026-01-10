/**
 * TarbiyahScreen - Main container for Today's Tarbiyah lessons
 *
 * Full-screen swipeable Stories-like experience with 5 steps per lesson.
 * Handles navigation between steps, completion tracking, and animations.
 */

import React, { useCallback, useMemo, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  interpolateColor,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TarbiyahProgressBar } from '@/components/tarbiyah/TarbiyahProgressBar';
import { TarbiyahMomentCard } from '@/components/tarbiyah/TarbiyahMomentCard';
import { TarbiyahSunnahCard } from '@/components/tarbiyah/TarbiyahSunnahCard';
import { TarbiyahWhyCard } from '@/components/tarbiyah/TarbiyahWhyCard';
import { TarbiyahActionCard } from '@/components/tarbiyah/TarbiyahActionCard';
import { TarbiyahRepairCard } from '@/components/tarbiyah/TarbiyahRepairCard';
import { TarbiyahCompletionView } from '@/components/tarbiyah/TarbiyahCompletionView';
import {
  TarbiyahColors,
  TarbiyahScreenBgs,
  TarbiyahMotion,
  TARBIYAH_STEP_ORDER,
  type TarbiyahStepType,
} from '@/constants/tarbiyahTokens';
import { getTodaysLesson, type TarbiyahLesson } from '@/data/tarbiyahLessons';
import type { RootStackParamList } from '@/navigation/types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const TAP_ZONE_WIDTH = SCREEN_WIDTH * 0.3;

type Props = NativeStackScreenProps<RootStackParamList, 'Tarbiyah'>;

export function TarbiyahScreen({ navigation }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const translateX = useSharedValue(0);
  const backgroundProgress = useSharedValue(0);

  // Get today's lesson
  const lesson = useMemo(() => getTodaysLesson(), []);

  const currentStepType = TARBIYAH_STEP_ORDER[currentStepIndex];
  const currentStep = lesson?.steps[currentStepType];
  const isLastStep = currentStepIndex === TARBIYAH_STEP_ORDER.length - 1;
  const isFirstStep = currentStepIndex === 0;

  // Navigate to next step
  const goToNextStep = useCallback(() => {
    if (isLastStep) {
      // Don't auto-advance from repair - wait for complete button
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const nextIndex = currentStepIndex + 1;
    setCurrentStepIndex(nextIndex);
    backgroundProgress.value = withTiming(nextIndex / (TARBIYAH_STEP_ORDER.length - 1), {
      duration: TarbiyahMotion.durationNormal,
    });
  }, [currentStepIndex, isLastStep, backgroundProgress]);

  // Navigate to previous step
  const goToPreviousStep = useCallback(() => {
    if (isFirstStep) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const prevIndex = currentStepIndex - 1;
    setCurrentStepIndex(prevIndex);
    backgroundProgress.value = withTiming(prevIndex / (TARBIYAH_STEP_ORDER.length - 1), {
      duration: TarbiyahMotion.durationNormal,
    });
  }, [currentStepIndex, isFirstStep, backgroundProgress]);

  // Handle lesson completion
  const handleComplete = useCallback(() => {
    setIsCompleted(true);
    // TODO: Save completion to store
  }, []);

  // Handle close
  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Handle tap zones (left/right side of screen)
  const handleTap = useCallback(
    (x: number) => {
      if (x < TAP_ZONE_WIDTH) {
        goToPreviousStep();
      } else if (x > SCREEN_WIDTH - TAP_ZONE_WIDTH) {
        goToNextStep();
      }
    },
    [goToNextStep, goToPreviousStep]
  );

  // Swipe gesture
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Only allow horizontal swipes
      if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      if (event.translationX < -SWIPE_THRESHOLD && !isLastStep) {
        // Swipe left - go to next
        runOnJS(goToNextStep)();
      } else if (event.translationX > SWIPE_THRESHOLD && !isFirstStep) {
        // Swipe right - go to previous
        runOnJS(goToPreviousStep)();
      }
      translateX.value = withTiming(0, { duration: TarbiyahMotion.durationFast });
    });

  // Tap gesture
  const tapGesture = Gesture.Tap().onEnd((event) => {
    runOnJS(handleTap)(event.x);
  });

  // Combined gesture
  const composedGesture = Gesture.Race(panGesture, tapGesture);

  // Animated background color
  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      backgroundProgress.value,
      [0, 0.25, 0.5, 0.75, 1],
      [
        TarbiyahScreenBgs.moment,
        TarbiyahScreenBgs.sunnah,
        TarbiyahScreenBgs.whyItWorks,
        TarbiyahScreenBgs.todaysAction,
        TarbiyahScreenBgs.repair,
      ]
    );

    return { backgroundColor };
  });

  // Animated content transform (subtle parallax on swipe)
  const animatedContentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value * 0.3 }],
    opacity: 1 - Math.abs(translateX.value) / SCREEN_WIDTH * 0.3,
  }));

  // Render current step content
  const renderStepContent = () => {
    if (!lesson || !currentStep) return null;

    switch (currentStepType) {
      case 'moment':
        return (
          <TarbiyahMomentCard
            step={currentStep}
            title={lesson.title}
            subtitle={lesson.subtitle}
          />
        );
      case 'sunnah':
        return <TarbiyahSunnahCard step={currentStep} />;
      case 'whyItWorks':
        return <TarbiyahWhyCard step={currentStep} />;
      case 'todaysAction':
        return <TarbiyahActionCard step={currentStep} />;
      case 'repair':
        return (
          <TarbiyahRepairCard step={currentStep} onComplete={handleComplete} />
        );
      default:
        return null;
    }
  };

  // Show completion view after lesson is done
  if (isCompleted && lesson) {
    return (
      <TarbiyahCompletionView
        lesson={lesson}
        onClose={handleClose}
      />
    );
  }

  if (!lesson) {
    // No lesson available (shouldn't happen with our 40-day library)
    return (
      <View style={[styles.container, { backgroundColor: TarbiyahColors.bgPrimary }]}>
        <SafeAreaView style={styles.safeArea}>
          <TarbiyahProgressBar
            currentStep={0}
            totalSteps={5}
            onClose={handleClose}
          />
        </SafeAreaView>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <TarbiyahProgressBar
          currentStep={currentStepIndex}
          totalSteps={TARBIYAH_STEP_ORDER.length}
          onClose={handleClose}
        />

        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.content, animatedContentStyle]}>
            {renderStepContent()}
          </Animated.View>
        </GestureDetector>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
