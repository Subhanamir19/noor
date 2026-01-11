import React, { useRef, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  Animated,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import { Button } from '@/components/common/Button';

interface FeatureIntroScreenProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
  buttonText: string;
  onContinue: () => void;
  onSkip: () => void;
}

export function FeatureIntroScreen({
  image,
  title,
  description,
  buttonText,
  onContinue,
  onSkip,
}: FeatureIntroScreenProps) {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const imageScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, imageScale]);

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onContinue();
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSkip();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Skip Button */}
      <TouchableOpacity
        style={[styles.skipButton, { top: insets.top + 12 }]}
        onPress={handleSkip}
        activeOpacity={0.7}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Illustration */}
      <Animated.View
        style={[
          styles.imageContainer,
          {
            paddingTop: insets.top + 16,
            opacity: fadeAnim,
            transform: [{ scale: imageScale }],
          },
        ]}
      >
        <Image source={image} style={styles.image} resizeMode="contain" />
      </Animated.View>

      {/* Bottom Card */}
      <Animated.View
        style={[
          styles.bottomCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingBottom: Math.max(insets.bottom + 16, 32),
          },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.buttonContainer}>
          <Button
            title={buttonText}
            variant="pink"
            size="lg"
            fullWidth
            onPress={handleContinue}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  skipButton: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#9CA3AF',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: '110%',
    height: '110%',
  },
  bottomCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 28,
    paddingTop: 8,
  },
  title: {
    fontFamily: 'BricolageGrotesque-Bold',
    fontSize: 26,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    width: '100%',
  },
});
