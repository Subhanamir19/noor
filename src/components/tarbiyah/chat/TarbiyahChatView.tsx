/**
 * TarbiyahChatView - Main orchestrator for Tarbiyah chat mode
 *
 * Combines NoorCharacter, NoorChatBubble, ChatStepLabel, and ContinueButton
 * into a cohesive chat-style Tarbiyah experience.
 */

import React, { memo, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import {
  TarbiyahSpacing,
  TarbiyahChatTokens,
  type TarbiyahStepType,
  TARBIYAH_STEP_ORDER,
} from '../../../constants/tarbiyahTokens';
import { WarmSpacing } from '../../../constants/tarbiyahWarmTokens';
import type { TarbiyahLesson, TarbiyahStep } from '../../../data/tarbiyahLessons';
import { NoorCharacter } from './NoorCharacter';
import { NoorChatBubble } from './NoorChatBubble';
import { ChatStepLabel } from './ChatStepLabel';
import { Button } from '../../common/Button';

interface TarbiyahChatViewProps {
  lesson: TarbiyahLesson;
  currentStepIndex: number;
  currentStepType: TarbiyahStepType;
  currentStep: TarbiyahStep;
  onContinue: () => void;
  onComplete: () => void;
}

function TarbiyahChatViewComponent({
  lesson,
  currentStepIndex,
  currentStepType,
  currentStep,
  onContinue,
  onComplete,
}: TarbiyahChatViewProps) {
  // Track if text animation has completed
  const [canContinue, setCanContinue] = useState(false);

  // Track if we're transitioning between steps (to show/hide content)
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Key to force bubble re-render on step change
  const [animationKey, setAnimationKey] = useState(0);

  // Determine if this is the last step
  const isLastStep = currentStepIndex === TARBIYAH_STEP_ORDER.length - 1;

  // Handle text animation complete
  const handleAnimationComplete = useCallback(() => {
    setCanContinue(true);
  }, []);

  // Handle continue button press
  const handleContinue = useCallback(() => {
    if (isLastStep) {
      onComplete();
      return;
    }

    // Start transition
    setIsTransitioning(true);
    setCanContinue(false);

    // After fade out, trigger parent navigation and reset
    setTimeout(() => {
      onContinue();
      setAnimationKey((prev) => prev + 1);
      setIsTransitioning(false);
    }, TarbiyahChatTokens.animation.textFadeOut + 100);
  }, [isLastStep, onContinue, onComplete]);

  return (
    <View style={styles.container}>
      {/* Step label at top */}
      <ChatStepLabel stepType={currentStepType} />

      {/* Main content area with bubble */}
      <View style={styles.contentArea}>
        {!isTransitioning && (
          <Animated.View
            entering={FadeIn.duration(200).delay(100)}
            exiting={FadeOut.duration(TarbiyahChatTokens.animation.textFadeOut)}
            style={styles.bubbleWrapper}
          >
            <NoorChatBubble
              step={currentStep}
              stepType={currentStepType}
              onAnimationComplete={handleAnimationComplete}
              animationKey={animationKey}
            />
          </Animated.View>
        )}
      </View>

      {/* Noor character - positioned absolutely */}
      <NoorCharacter isTyping={!canContinue} />

      {/* Continue button at bottom - Duolingo 3D style like onboarding */}
      <View style={styles.buttonContainer}>
        <Button
          title={isLastStep ? 'Complete Tarbiyah' : 'Continue'}
          variant="teal"
          size="lg"
          fullWidth
          onPress={handleContinue}
          disabled={!canContinue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentArea: {
    flex: 1,
    paddingTop: TarbiyahSpacing.space8,
  },
  bubbleWrapper: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: WarmSpacing.screenPadding,
    paddingBottom: WarmSpacing['2xl'],
    paddingTop: WarmSpacing.md,
  },
});

export const TarbiyahChatView = memo(TarbiyahChatViewComponent);
