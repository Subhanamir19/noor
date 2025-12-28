import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7ED' },
  scrollContent: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
  daysContainer: { alignItems: 'center', marginBottom: 32 },
  daysCount: { color: '#F59E0B', fontSize: 48, fontWeight: 'bold' },
  daysLabel: { color: '#0F766E', fontSize: 18 },
  childName: { color: '#78716C' },
  connectionCard: { backgroundColor: '#D1FAE5', borderRadius: 12, padding: 16, marginBottom: 24, alignItems: 'center' },
  connectionEmoji: { fontSize: 30, marginBottom: 8 },
  connectionLabel: { color: '#0F766E', fontWeight: '500' },
  progressBarBg: { width: '100%', backgroundColor: '#FFF7ED', borderRadius: 9999, height: 12, marginTop: 8 },
  progressBarFill: { backgroundColor: '#10B981', height: 12, borderRadius: 9999, width: '10%' },
  levelText: { color: '#78716C', fontSize: 14, marginTop: 4 },
  photoCard: { backgroundColor: 'white', borderRadius: 12, padding: 24, marginBottom: 16, borderWidth: 2, borderColor: '#FDA4AF', alignItems: 'center' },
  photoTitle: { fontSize: 18, color: '#0F766E', fontWeight: '500', marginBottom: 8 },
  photoButton: { backgroundColor: '#FDA4AF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 9999 },
  photoButtonText: { color: 'white', fontWeight: '500' },
  weekLabel: { color: '#0F766E', fontWeight: '500', marginBottom: 12 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  dayContainer: { alignItems: 'center' },
  dayBox: { width: 40, height: 40, backgroundColor: '#D1FAE5', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  dayPlaceholder: { color: '#78716C' },
  dayName: { fontSize: 12, color: '#78716C' },
  badgesLabel: { color: '#0F766E', fontWeight: '500', marginBottom: 12 },
  badgesRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  badge: { backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#D1FAE5', opacity: 0.5 },
  badgeEmoji: { fontSize: 24 },
  badgeLabel: { fontSize: 12, color: '#78716C', marginTop: 4 },
});

export function JourneyScreen() {
  const profile = useAuthStore((state) => state.profile);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.daysContainer}>
          <Text style={styles.daysCount}>0</Text>
          <Text style={styles.daysLabel}>Days Together</Text>
          <Text style={styles.childName}>with little {profile?.child_name || 'one'}</Text>
        </View>

        <View style={styles.connectionCard}>
          <Text style={styles.connectionEmoji}>🌱</Text>
          <Text style={styles.connectionLabel}>Connection Depth</Text>
          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.levelText}>Level 1 - Just Beginning</Text>
        </View>

        <View style={styles.photoCard}>
          <Text style={styles.photoTitle}>Capture Today's Moment</Text>
          <TouchableOpacity style={styles.photoButton}>
            <Text style={styles.photoButtonText}>Take Photo 📸</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.weekLabel}>This Week's Story</Text>
        <View style={styles.weekRow}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <View key={day} style={styles.dayContainer}>
              <View style={styles.dayBox}>
                <Text style={styles.dayPlaceholder}>?</Text>
              </View>
              <Text style={styles.dayName}>{day}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.badgesLabel}>Your Badges</Text>
        <View style={styles.badgesRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeEmoji}>🔥</Text>
            <Text style={styles.badgeLabel}>7 Days</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeEmoji}>💪</Text>
            <Text style={styles.badgeLabel}>Asked Help</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeEmoji}>🌱</Text>
            <Text style={styles.badgeLabel}>Tried New</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
