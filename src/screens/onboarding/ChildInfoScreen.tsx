import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'ChildInfo'>;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7ED' },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0F766E', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#78716C', marginBottom: 32 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '500', color: '#0F766E', marginBottom: 8 },
  textInput: { backgroundColor: 'white', borderWidth: 2, borderColor: '#D1FAE5', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16 },
  dateButton: { backgroundColor: 'white', borderWidth: 2, borderColor: '#D1FAE5', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 },
  dateButtonText: { fontSize: 16, color: '#0F766E' },
  button: { paddingHorizontal: 32, paddingVertical: 16, borderRadius: 9999 },
  buttonEnabled: { backgroundColor: '#10B981' },
  buttonDisabled: { backgroundColor: '#78716C' },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 18 },
});

export function ChildInfoScreen({ navigation }: Props) {
  const [childName, setChildName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleNext = () => {
    if (!childName.trim()) {
      return;
    }
    navigation.navigate('Struggles', {
      childName: childName.trim(),
      birthdate: birthdate.toISOString(),
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tell Us About Your Little One</Text>
        <Text style={styles.subtitle}>This helps us personalize your experience</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>What's your child's name?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter name"
            value={childName}
            onChangeText={setChildName}
            autoCapitalize="words"
            placeholderTextColor="#78716C"
          />
        </View>

        <View style={{ marginBottom: 32 }}>
          <Text style={styles.label}>When were they born?</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>{formatDate(birthdate)}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={birthdate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (selectedDate) setBirthdate(selectedDate);
              }}
              maximumDate={new Date()}
            />
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, childName.trim() ? styles.buttonEnabled : styles.buttonDisabled]}
          onPress={handleNext}
          activeOpacity={0.8}
          disabled={!childName.trim()}
        >
          <Text style={styles.buttonText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
