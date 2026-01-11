import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { FeatureIntroScreen } from './FeatureIntroScreen';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'ChatIntro'>;
};

export function ChatIntroScreen({ navigation }: Props) {
  const handleSkip = () => {
    navigation.navigate('Welcome');
  };

  return (
    <FeatureIntroScreen
      image={require('../../../assets/chatfeature-intro.png')}
      title="Chat with Noor"
      description="Discuss any parenting topic for personalized Islamic guidance and advice."
      buttonText="Start Chatting"
      onContinue={() => navigation.navigate('DailyTasksIntro')}
      onSkip={handleSkip}
    />
  );
}
