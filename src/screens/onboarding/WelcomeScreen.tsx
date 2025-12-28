import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Welcome'>;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7ED' },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', alignItems: 'center' },
  logoContainer: { width: 128, height: 128, backgroundColor: '#D1FAE5', borderRadius: 64, marginBottom: 32, alignItems: 'center', justifyContent: 'center' },
  logoEmoji: { fontSize: 48 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#0F766E', textAlign: 'center', marginBottom: 16 },
  subtitle: { fontSize: 18, color: '#78716C', textAlign: 'center', marginBottom: 32, paddingHorizontal: 16 },
  button: { backgroundColor: '#10B981', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 9999, width: '100%', maxWidth: 320 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 18 },
});

export function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🌙</Text>
        </View>

        <Text style={styles.title}>Welcome, beautiful soul!</Text>

        <Text style={styles.subtitle}>
          This is Noor - your Islamic parenting companion.
          {'\n\n'}
          We're here to make every day a little lighter, a little more meaningful.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ChildInfo')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Let's Begin →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
