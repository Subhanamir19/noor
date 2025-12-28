import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RouteProp } from '@react-navigation/native';
import type { OnboardingStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';

type Props = {
  route: RouteProp<OnboardingStackParamList, 'Ready'>;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7ED' },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', alignItems: 'center' },
  iconContainer: { width: 128, height: 128, backgroundColor: '#F59E0B', borderRadius: 64, marginBottom: 32, alignItems: 'center', justifyContent: 'center' },
  iconEmoji: { fontSize: 48 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#0F766E', textAlign: 'center', marginBottom: 16 },
  subtitle: { fontSize: 18, color: '#78716C', textAlign: 'center', marginBottom: 32, paddingHorizontal: 16 },
  errorContainer: { backgroundColor: 'rgba(251, 146, 60, 0.2)', borderWidth: 1, borderColor: '#FB923C', borderRadius: 12, padding: 12, marginBottom: 16, width: '100%', maxWidth: 320 },
  errorText: { color: '#FB923C', fontSize: 14, textAlign: 'center' },
  button: { backgroundColor: '#10B981', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 9999, width: '100%', maxWidth: 320 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 18 },
});

export function ReadyScreen({ route }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const handleComplete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { childName, birthdate, missionTime } = route.params;

      await updateProfile({
        child_name: childName,
        child_birthdate: birthdate.split('T')[0],
        onboarding_completed: true,
        notification_time_mission: `${missionTime}:00`,
      });

      // Navigation will be handled by the RootNavigator
      // when it detects onboarding_completed = true
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Onboarding error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconEmoji}>✨</Text>
        </View>

        <Text style={styles.title}>You're All Set, Mama!</Text>

        <Text style={styles.subtitle}>
          Your personalized Islamic parenting journey begins now.
          {'\n\n'}
          Let's make today count
        </Text>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleComplete}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Start My Journey →</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
