import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Struggles'>;
  route: RouteProp<OnboardingStackParamList, 'Struggles'>;
};

const STRUGGLES = [
  { id: 'morning_chaos', label: 'Morning wake-up chaos' },
  { id: 'breakfast_battles', label: 'Breakfast battles' },
  { id: 'midday_meltdowns', label: 'Midday meltdowns' },
  { id: 'evening_tantrums', label: 'Evening tantrums' },
  { id: 'bedtime_struggles', label: 'Bedtime struggles' },
  { id: 'prayer_resistance', label: 'Prayer time resistance' },
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

export function StrugglesScreen({ navigation, route }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleStruggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    navigation.navigate('CurrentHabits', {
      ...route.params,
      struggles: selected,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <Text style={styles.title}>What Brings You Here?</Text>
        <Text style={styles.subtitle}>Select all that apply (or skip if none)</Text>

        <View style={styles.optionsContainer}>
          {STRUGGLES.map((struggle) => {
            const isSelected = selected.includes(struggle.id);
            return (
              <TouchableOpacity
                key={struggle.id}
                style={[styles.option, isSelected ? styles.optionSelected : styles.optionUnselected]}
                onPress={() => toggleStruggle(struggle.id)}
                activeOpacity={0.7}
              >
                <View style={styles.optionRow}>
                  <View style={[styles.checkbox, isSelected ? styles.checkboxSelected : styles.checkboxUnselected]}>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.optionLabel}>{struggle.label}</Text>
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
