/**
 * TarbiyahScreen - Main container for Today's Tarbiyah lessons
 *
 * Chat-style experience with Noor character presenting 5 steps per lesson.
 * Handles navigation between steps, completion tracking, and animations.
 */

import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TarbiyahProgressBar } from '@/components/tarbiyah/TarbiyahProgressBar';
import { TarbiyahCompletionView } from '@/components/tarbiyah/TarbiyahCompletionView';
import { TarbiyahChatView } from '@/components/tarbiyah/chat';
import {
  TarbiyahColors,
  TarbiyahScreenBgs,
  TarbiyahMotion,
  TARBIYAH_STEP_ORDER,
} from '@/constants/tarbiyahTokens';
import { getTodaysLesson } from '@/data/tarbiyahLessons';
import type { RootStackParamList } from '@/navigation/types';


type Props = NativeStackScreenProps<RootStackParamList, 'Tarbiyah'>;

export function TarbiyahScreen({ navigation }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const backgroundProgress = useSharedValue(0);

  // Get today's lesson
  const lesson = useMemo(() => getTodaysLesson(), []);

  const currentStepType = TARBIYAH_STEP_ORDER[currentStepIndex];
  const currentStep = lesson?.steps[currentStepType];

  // Navigate to next step (called by TarbiyahChatView)
  const goToNextStep = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= TARBIYAH_STEP_ORDER.length) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentStepIndex(nextIndex);
    backgroundProgress.value = withTiming(
      nextIndex / (TARBIYAH_STEP_ORDER.length - 1),
      { duration: TarbiyahMotion.durationNormal }
    );
  }, [currentStepIndex, backgroundProgress]);

  // Handle lesson completion
  const handleComplete = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsCompleted(true);
    // TODO: Save completion to store
  }, []);

  // Handle close
  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Animated background color (transitions between step colors)
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

  // Show completion view after lesson is done
  if (isCompleted && lesson) {
    return (
      <TarbiyahCompletionView
        lesson={lesson}
        onClose={handleClose}
      />
    );
  }

  if (!lesson || !currentStep) {
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
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <TarbiyahProgressBar
          currentStep={currentStepIndex}
          totalSteps={TARBIYAH_STEP_ORDER.length}
          onClose={handleClose}
        />

        <TarbiyahChatView
          lesson={lesson}
          currentStepIndex={currentStepIndex}
          currentStepType={currentStepType}
          currentStep={currentStep}
          onContinue={goToNextStep}
          onComplete={handleComplete}
        />
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
});
