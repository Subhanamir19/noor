import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { FeatureIntroScreen } from './FeatureIntroScreen';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'TarbiyahIntro'>;
};

export function TarbiyahIntroScreen({ navigation }: Props) {
  const handleSkip = () => {
    navigation.navigate('Welcome');
  };

  return (
    <FeatureIntroScreen
      image={require('../../../assets/tarbiyahfeature-intro.png')}
      title="Your Child's Tarbiyah & Character"
      description="Foster character development with personalized activities and guidance to build strong values."
      buttonText="Continue Now"
      onContinue={() => navigation.navigate('Welcome')}
      onSkip={handleSkip}
    />
  );
}
