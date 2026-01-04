import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, OutlineButton } from '@/components/common/Button';
import { useAuthStore } from '@/store/authStore';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7ED' },
  scrollContent: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0F766E', marginBottom: 24 },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 2, borderColor: '#D1FAE5' },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#0F766E', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { color: '#78716C' },
  value: { color: '#0F766E', fontWeight: '500' },
  premiumCard: { backgroundColor: 'rgba(245, 158, 11, 0.2)', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 2, borderColor: '#F59E0B' },
  premiumTitle: { fontSize: 18, fontWeight: '600', color: '#0F766E', marginBottom: 8 },
  premiumDescription: { color: '#78716C', marginBottom: 12 },
  footer: { alignItems: 'center', paddingVertical: 24 },
  version: { color: '#78716C', fontSize: 14 },
  tagline: { color: '#78716C', fontSize: 12, marginTop: 4 },
});

export function SettingsScreen() {
  const [isResetting, setIsResetting] = useState(false);
  const profile = useAuthStore((state) => state.profile);
  const user = useAuthStore((state) => state.user);
  const resetOnboarding = useAuthStore((state) => state.resetOnboarding);

  const handleRedoOnboarding = () => {
    Alert.alert(
      'Redo Onboarding',
      'This will restart your setup process. Your data will be preserved.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: async () => {
            setIsResetting(true);
            try {
              await resetOnboarding();
            } catch (err) {
              Alert.alert('Error', 'Failed to reset onboarding. Please try again.');
            } finally {
              setIsResetting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollContent}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Profile</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Child's Name</Text>
            <Text style={styles.value}>{profile?.child_name || 'Not set'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Account Type</Text>
            <Text style={styles.value}>{user?.isAnonymous ? 'Guest' : 'Registered'}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notifications</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Daily Mission</Text>
            <Text style={styles.value}>{profile?.notification_time_mission?.slice(0, 5) || '07:00'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Evening Reflection</Text>
            <Text style={styles.value}>{profile?.notification_time_reflection?.slice(0, 5) || '19:00'}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Actions</Text>
          <OutlineButton
            title="Redo Onboarding"
            onPress={handleRedoOnboarding}
            loading={isResetting}
            fullWidth
          />
        </View>

        <View style={styles.premiumCard}>
          <Text style={styles.premiumTitle}>Noor Premium</Text>
          <Text style={styles.premiumDescription}>Unlock all features and support our mission</Text>
          <Button
            title="Upgrade to Premium"
            variant="warning"
            onPress={() => Alert.alert('Coming Soon', 'Premium features are coming soon!')}
            fullWidth
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>Noor v1.0.0</Text>
          <Text style={styles.tagline}>Made with love for Muslim families</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
