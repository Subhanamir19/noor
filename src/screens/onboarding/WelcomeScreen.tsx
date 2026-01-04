import React, { useRef, useEffect } from 'react';
import { View, Text, Image, Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

import { Button } from '@/components/common/Button';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Welcome'>;
};

export function WelcomeScreen({ navigation }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('ChildInfo');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../../assets/ONBOARDING-ASSETS/onboarding-welcome.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.heading}>
          5 minutes a day to raise a child of strong character
        </Text>
        <Text style={styles.subheading}>
          What if bedtime became your child's favorite moment of connection?
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Show me how"
            variant="indigo"
            size="lg"
            fullWidth
            onPress={handleContinue}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
  illustrationContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: '90%',
    height: '100%',
  },
  content: {
    flex: 0.4,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'BricolageGrotesque-Bold',
    fontSize: 28,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  subheading: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '80%',
  },
});
