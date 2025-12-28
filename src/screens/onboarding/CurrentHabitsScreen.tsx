import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'CurrentHabits'>;
  route: RouteProp<OnboardingStackParamList, 'CurrentHabits'>;
};

const HABITS = [
  { id: 'pray_sometimes', label: 'We pray together sometimes' },
  { id: 'bismillah', label: 'We say Bismillah before eating' },
  { id: 'quran_stories', label: 'We read Quran/Islamic stories' },
  { id: 'bedtime_duas', label: 'We make bedtime duas' },
  { id: 'none_yet', label: "None yet - I'm just starting" },
] as const;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7ED' },
  scrollContent: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0F766E', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#78716C', marginBottom: 24 },
  optionsContainer: { marginBottom: 32 },
  option: { marginBottom: 12, padding: 16, borderRadius: 12, borderWidth: 2 },
  optionSelected: { backgroundColor: '#D1FAE5', borderColor: '#10B981' },
  optionUnselected: { backgroundColor: 'white', borderColor: '#D1FAE5' },
  optionRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, marginRight: 12, alignItems: 'center', justifyContent: 'center' },
  checkboxSelected: { backgroundColor: '#10B981', borderColor: '#10B981' },
  checkboxUnselected: { borderColor: '#78716C' },
  checkmark: { color: 'white', fontSize: 12 },
  optionLabel: { fontSize: 16, fontWeight: '500', color: '#0F766E' },
  button: { backgroundColor: '#10B981', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 9999, marginBottom: 24 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 18 },
});

export function CurrentHabitsScreen({ navigation, route }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleHabit = (id: string) => {
    if (id === 'none_yet') {
      setSelected(selected.includes('none_yet') ? [] : ['none_yet']);
      return;
    }

    setSelected((prev) => {
      const filtered = prev.filter((h) => h !== 'none_yet');
      return filtered.includes(id)
        ? filtered.filter((h) => h !== id)
        : [...filtered, id];
    });
  };

  const handleNext = () => {
    navigation.navigate('NotificationTime', {
      ...route.params,
      currentHabits: selected,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <Text style={styles.title}>What Islamic Habits Do You Already Practice?</Text>
        <Text style={styles.subtitle}>This helps us build on what you're doing</Text>

        <View style={styles.optionsContainer}>
          {HABITS.map((habit) => {
            const isSelected = selected.includes(habit.id);
            return (
              <TouchableOpacity
                key={habit.id}
                style={[styles.option, isSelected ? styles.optionSelected : styles.optionUnselected]}
                onPress={() => toggleHabit(habit.id)}
                activeOpacity={0.7}
              >
                <View style={styles.optionRow}>
                  <View style={[styles.checkbox, isSelected ? styles.checkboxSelected : styles.checkboxUnselected]}>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.optionLabel}>{habit.label}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
