import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import { Button } from '@/components/common/Button';
import { StruggleCard, TreeGrowingAnimation } from '@/components/onboarding';
import { useOnboarding } from '@/context/OnboardingContext';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'StruggleSelector'>;
};

const struggles = [
  {
    id: 'screen_time',
    icon: require('../../../assets/ONBOARDING-ASSETS/icon-screen-time.png'),
    label: 'The daily battle over screen time',
  },
  {
    id: 'sibling_rivalry',
    icon: require('../../../assets/ONBOARDING-ASSETS/icon-sibling-rivalry.png'),
    label: 'Sibling rivalry is exhausting',
  },
  {
    id: 'salah_connection',
    icon: require('../../../assets/ONBOARDING-ASSETS/icon-salah.png'),
    label: 'Making salah meaningful, not mechanical',
  },
  {
    id: 'gratitude',
    icon: require('../../../assets/ONBOARDING-ASSETS/icon-gratitude.png'),
    label: 'Teaching gratitude in an entitled world',
  },
  {
    id: 'bedtime_routine',
    icon: require('../../../assets/ONBOARDING-ASSETS/icon-bedtime.png'),
    label: 'Bedtime is chaos, not peace',
  },
  {
    id: 'consistency',
    icon: require('../../../assets/ONBOARDING-ASSETS/icon-consistency.png'),
    label: 'Staying consistent feels impossible',
  },
];

export function StruggleSelectorScreen({ navigation }: Props) {
  const { onboardingData, updateOnboardingData, saveToDatabase } = useOnboarding();
  const [selectedStruggles, setSelectedStruggles] = useState<string[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [savePromise, setSavePromise] = useState<Promise<void> | null>(null);

  const shakeAnims = useRef<{ [key: string]: Animated.Value }>(
    struggles.reduce(
      (acc, s) => {
        acc[s.id] = new Animated.Value(0);
        return acc;
      },
      {} as { [key: string]: Animated.Value }
    )
  ).current;

  const triggerShake = useCallback(
    (ids: string[]) => {
      const animations = ids.map((id) =>
        Animated.sequence([
          Animated.timing(shakeAnims[id], {
            toValue: 10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnims[id], {
            toValue: -10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnims[id], {
            toValue: 10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnims[id], {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
        ])
      );
      Animated.parallel(animations).start();
    },
    [shakeAnims]
  );

  const handleCardPress = (id: string) => {
    if (selectedStruggles.includes(id)) {
      // Deselect
      setSelectedStruggles((prev) => prev.filter((s) => s !== id));
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      // Try to select
      if (selectedStruggles.length >= 2) {
        // Max 2 - shake existing cards
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        triggerShake(selectedStruggles);
        return;
      }
      setSelectedStruggles((prev) => [...prev, id]);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleComplete = async () => {
    if (selectedStruggles.length === 0) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Update context with struggles
    updateOnboardingData({ primaryStruggle: selectedStruggles.join(',') });

    // Create save promise and show loading
    const promise = saveToDatabase();
    setSavePromise(promise);
    setShowLoading(true);
  };

  const handleAnimationComplete = () => {
    // Navigate to main app
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Main' as never }],
      })
    );
  };

  const isValid = selectedStruggles.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../../assets/ONBOARDING-ASSETS/onboarding-struggles.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.heading}>Every mother has her moments</Text>
          <Text style={styles.subheading}>
            Which sounds most familiar? (Pick 1-2)
          </Text>

          <View style={styles.grid}>
            {struggles.map((struggle) => (
              <StruggleCard
                key={struggle.id}
                struggle={struggle}
                selected={selectedStruggles.includes(struggle.id)}
                onPress={() => handleCardPress(struggle.id)}
                shakeAnimation={shakeAnims[struggle.id]}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={`Create ${onboardingData.childName || 'their'}'s Journey`}
              variant={isValid ? 'indigo' : 'disabled'}
              size="lg"
              fullWidth
              disabled={!isValid}
              onPress={handleComplete}
            />
          </View>
        </View>
      </ScrollView>

      {showLoading && savePromise && (
        <TreeGrowingAnimation
          childName={onboardingData.childName || 'your child'}
          onComplete={handleAnimationComplete}
          savePromise={savePromise}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
  scrollContent: {
    flexGrow: 1,
  },
  illustrationContainer: {
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: '70%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    fontFamily: 'BricolageGrotesque-Bold',
    fontSize: 26,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subheading: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginTop: 16,
    paddingBottom: 16,
  },
});
