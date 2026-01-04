import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Animated,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import * as Haptics from 'expo-haptics';

import { Button } from '@/components/common/Button';
import { GenderCard } from '@/components/onboarding';
import { useOnboarding } from '@/context/OnboardingContext';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'ChildInfo'>;
};

export function ChildInfoScreen({ navigation }: Props) {
  const { updateOnboardingData } = useOnboarding();
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number | null>(null);
  const [childGender, setChildGender] = useState<'boy' | 'girl' | null>(null);
  const [nameFocused, setNameFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const isValid =
    childName.trim().length >= 2 && childAge !== null && childGender !== null;

  const handleContinue = () => {
    if (!isValid) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    updateOnboardingData({
      childName: childName.trim(),
      childAge,
      childGender,
    });
    navigation.navigate('StruggleSelector');
  };

  const handleGenderSelect = (gender: 'boy' | 'girl') => {
    setChildGender(gender);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../../../assets/ONBOARDING-ASSETS/onboarding-child-info.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            <Text style={styles.heading}>Tell me about your little one</Text>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, nameFocused && styles.inputFocused]}
                placeholder="What's their name?"
                placeholderTextColor="#9CA3AF"
                value={childName}
                onChangeText={setChildName}
                autoCapitalize="words"
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
              />
            </View>

            {/* Age Picker */}
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={childAge}
                onValueChange={(value) => setChildAge(value)}
                style={styles.picker}
              >
                <Picker.Item label="Select age" value={null} color="#9CA3AF" />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((age) => (
                  <Picker.Item
                    key={age}
                    label={
                      age === 0
                        ? 'Under 1 year'
                        : `${age} year${age === 1 ? '' : 's'} old`
                    }
                    value={age}
                  />
                ))}
              </Picker>
            </View>

            {/* Gender Selection */}
            <Text style={styles.genderLabel}>Gender</Text>
            <View style={styles.genderContainer}>
              <GenderCard
                gender="boy"
                icon={require('../../../assets/ONBOARDING-ASSETS/gender-boy.png')}
                selected={childGender === 'boy'}
                onPress={() => handleGenderSelect('boy')}
              />
              <View style={styles.genderSpacer} />
              <GenderCard
                gender="girl"
                icon={require('../../../assets/ONBOARDING-ASSETS/gender-girl.png')}
                selected={childGender === 'girl'}
                onPress={() => handleGenderSelect('girl')}
              />
            </View>

            {/* Continue Button */}
            <View style={styles.buttonContainer}>
              <Button
                title="Continue"
                variant={isValid ? 'indigo' : 'disabled'}
                size="lg"
                fullWidth
                disabled={!isValid}
                onPress={handleContinue}
              />
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  illustrationContainer: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: '80%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  heading: {
    fontFamily: 'BricolageGrotesque-Bold',
    fontSize: 26,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: '#1F2937',
  },
  inputFocused: {
    borderColor: '#6366F1',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  genderLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  genderSpacer: {
    width: 12,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingBottom: 16,
  },
});
