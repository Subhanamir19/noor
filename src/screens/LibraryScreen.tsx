import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TabType = 'techniques' | 'habits' | 'stories';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7ED' },
  content: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0F766E', marginBottom: 16 },
  searchContainer: { backgroundColor: 'white', borderRadius: 12, borderWidth: 2, borderColor: '#D1FAE5', paddingHorizontal: 16, paddingVertical: 8, marginBottom: 16 },
  searchInput: { fontSize: 16, color: '#0F766E' },
  tabsContainer: { flexDirection: 'row', backgroundColor: '#D1FAE5', borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 8 },
  tabActive: { backgroundColor: '#10B981' },
  tabText: { textAlign: 'center', fontWeight: '500' },
  tabTextActive: { color: 'white' },
  tabTextInactive: { color: '#0F766E' },
  scrollContent: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 2, borderColor: '#D1FAE5' },
  cardTitle: { fontSize: 18, fontWeight: '500', color: '#0F766E', marginBottom: 4 },
  cardDescription: { color: '#78716C', fontSize: 14, marginBottom: 8 },
  cardMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  cardTime: { fontSize: 12, color: '#78716C' },
  cardStatus: { fontSize: 12, color: '#10B981' },
  unlockCard: { backgroundColor: 'rgba(245, 158, 11, 0.2)', borderRadius: 12, padding: 16, marginTop: 16, marginBottom: 24, borderWidth: 1, borderColor: '#F59E0B' },
  unlockTitle: { color: '#0F766E', fontWeight: '500' },
  unlockText: { color: '#78716C', fontSize: 14 },
});

export function LibraryScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('techniques');

  const tabs: { key: TabType; label: string }[] = [
    { key: 'techniques', label: 'Parenting' },
    { key: 'habits', label: 'Sunnah' },
    { key: 'stories', label: 'Stories' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Library of Wisdom</Text>

          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search guides, stories..."
              placeholderTextColor="#78716C"
              style={styles.searchInput}
            />
          </View>

          <View style={styles.tabsContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, activeTab === tab.key && styles.tabActive]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[styles.tabText, activeTab === tab.key ? styles.tabTextActive : styles.tabTextInactive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ScrollView style={styles.scrollContent}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Handling Toddler Tantrums the Prophetic Way</Text>
            <Text style={styles.cardDescription}>Learn gentle techniques rooted in Sunnah</Text>
            <View style={styles.cardMeta}>
              <Text style={styles.cardTime}>⏱️ 7 min read</Text>
              <Text style={styles.cardStatus}>📖 Not started</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Teaching Sabr (Patience) Through Daily Moments</Text>
            <Text style={styles.cardDescription}>Daily moments to build patience in your child</Text>
            <View style={styles.cardMeta}>
              <Text style={styles.cardTime}>⏱️ 5 min read</Text>
              <Text style={styles.cardStatus}>📖 Not started</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Positive Discipline Without Yelling</Text>
            <Text style={styles.cardDescription}>Islamic approach to gentle discipline</Text>
            <View style={styles.cardMeta}>
              <Text style={styles.cardTime}>⏱️ 6 min read</Text>
              <Text style={styles.cardStatus}>📖 Not started</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.unlockCard}>
            <Text style={styles.unlockTitle}>🏆 Unlock Advanced Guides</Text>
            <Text style={styles.unlockText}>Reach Connection Depth Level 10</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
