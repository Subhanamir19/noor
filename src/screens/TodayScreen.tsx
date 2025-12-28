import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7ED' },
  scrollContent: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
  greeting: { fontSize: 20, color: '#0F766E', marginBottom: 24 },
  duaCard: { backgroundColor: '#D1FAE5', borderRadius: 12, padding: 24, marginBottom: 16, borderWidth: 2, borderColor: '#10B981' },
  duaLabel: { fontSize: 14, color: '#10B981', fontWeight: '500', marginBottom: 8 },
  duaArabic: { fontSize: 24, color: '#0F766E', marginBottom: 8, textAlign: 'right' },
  duaTranslit: { fontSize: 14, color: '#78716C', fontStyle: 'italic', marginBottom: 4 },
  duaTranslation: { fontSize: 16, color: '#0F766E' },
  missionCard: { backgroundColor: 'white', borderRadius: 12, padding: 24, marginBottom: 16, borderWidth: 2, borderColor: '#FDA4AF' },
  missionLabel: { fontSize: 14, color: '#FB923C', fontWeight: '500', marginBottom: 8 },
  missionText: { fontSize: 18, color: '#0F766E', marginBottom: 8 },
  missionTime: { fontSize: 14, color: '#78716C' },
  streakCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, borderWidth: 2, borderColor: '#F59E0B' },
  streakLabel: { fontSize: 14, color: '#F59E0B', fontWeight: '500', marginBottom: 8 },
  streakCount: { fontSize: 24, color: '#0F766E', fontWeight: 'bold' },
  streakHint: { fontSize: 14, color: '#78716C' },
});

export function TodayScreen() {
  const profile = useAuthStore((state) => state.profile);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollContent}>
        <Text style={styles.greeting}>
          {getGreeting()}, {profile?.display_name || 'Mama'}!
        </Text>

        <View style={styles.duaCard}>
          <Text style={styles.duaLabel}>TODAY'S DUA FOR YOU</Text>
          <Text style={styles.duaArabic}>اللَّهُمَّ اجْعَلْنِي صَبُورًا</Text>
          <Text style={styles.duaTranslit}>Allahumma aj'alni sabūran</Text>
          <Text style={styles.duaTranslation}>"O Allah, make me patient"</Text>
        </View>

        <View style={styles.missionCard}>
          <Text style={styles.missionLabel}>TODAY'S MINI MISSION</Text>
          <Text style={styles.missionText}>
            Teach your little one to say "Bismillah" before eating
          </Text>
          <Text style={styles.missionTime}>⏱️ Takes 2 minutes</Text>
        </View>

        <View style={styles.streakCard}>
          <Text style={styles.streakLabel}>YOUR STREAK 🔥</Text>
          <Text style={styles.streakCount}>0 days</Text>
          <Text style={styles.streakHint}>Complete today's mission to start!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
