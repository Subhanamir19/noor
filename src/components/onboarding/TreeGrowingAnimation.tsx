import React, { useState, useEffect, useRef } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

const frames = [
  require('../../../assets/ONBOARDING-ASSETS/tree-frame-1-seed.png'),
  require('../../../assets/ONBOARDING-ASSETS/tree-frame-2-sprout.png'),
  require('../../../assets/ONBOARDING-ASSETS/tree-frame-3-sapling.png'),
  require('../../../assets/ONBOARDING-ASSETS/tree-frame-5-medium.png'),
  require('../../../assets/ONBOARDING-ASSETS/tree-frame-4-tree-star.png'), // Star moment
  require('../../../assets/ONBOARDING-ASSETS/tree-frame-6-mature.png'),
];

interface TreeGrowingAnimationProps {
  childName: string;
  onComplete: () => void;
  savePromise: Promise<void>;
}

export function TreeGrowingAnimation({
  childName,
  onComplete,
  savePromise,
}: TreeGrowingAnimationProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [saveComplete, setSaveComplete] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fade in on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Handle save promise
  useEffect(() => {
    savePromise
      .then(() => setSaveComplete(true))
      .catch((error) => {
        console.error('Save failed:', error);
        setSaveError(error.message || 'Failed to save. Please try again.');
      });
  }, [savePromise]);

  // Frame animation
  useEffect(() => {
    const frameDuration = 450;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const nextFrame = prev + 1;

        // Haptic on each frame transition
        if (nextFrame < frames.length) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        // Special effect on star frame (index 4)
        if (nextFrame === 4) {
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }

        // Animation complete
        if (nextFrame >= frames.length) {
          clearInterval(interval);
          setAnimationComplete(true);
          return prev; // Stay on last frame
        }

        return nextFrame;
      });
    }, frameDuration);

    return () => clearInterval(interval);
  }, [scaleAnim]);

  // Complete when both animation and save are done
  useEffect(() => {
    if (animationComplete && saveComplete) {
      setTimeout(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        onComplete();
      }, 1000); // Hold final frame for 1 second
    }
  }, [animationComplete, saveComplete, onComplete]);

  if (saveError) {
    return (
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Text style={styles.errorText}>{saveError}</Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      <Animated.Image
        source={frames[currentFrame]}
        style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
        resizeMode="contain"
      />
      <Text style={styles.text}>Creating {childName}'s character journey...</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  image: {
    width: 220,
    height: 220,
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#2C3E50',
    marginTop: 24,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
