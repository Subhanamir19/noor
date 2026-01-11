import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { FeatureIntroScreen } from './FeatureIntroScreen';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'DailyTasksIntro'>;
};

export function DailyTasksIntroScreen({ navigation }: Props) {
  const handleSkip = () => {
    navigation.navigate('Welcome');
  };

  return (
    <FeatureIntroScreen
      image={require('../../../assets/dailytaskfeature-intro.png')}
      title="Your Daily Islamic Tasks"
      description="Simple, meaningful activities to nurture your child's faith daily. Schedule them for any time."
      buttonText="Continue Now"
      onContinue={() => navigation.navigate('TarbiyahIntro')}
      onSkip={handleSkip}
    />
  );
}
