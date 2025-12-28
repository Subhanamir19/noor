import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'NotificationTime'>;
  route: RouteProp<OnboardingStackParamList, 'NotificationTime'>;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7ED' },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0F766E', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#78716C', marginBottom: 32 },
  timeContainer: { marginBottom: 32 },
  timeButton: { backgroundColor: 'white', borderWidth: 2, borderColor: '#D1FAE5', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 16, marginBottom: 16 },
  timeText: { fontSize: 20, fontWeight: '500', color: '#0F766E', textAlign: 'center' },
  hint: { fontSize: 14, color: '#78716C', textAlign: 'center' },
  button: { backgroundColor: '#10B981', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 9999 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 18 },
});

export function NotificationTimeScreen({ navigation, route }: Props) {
  const [missionTime, setMissionTime] = useState(() => {
    const date = new Date();
    date.setHours(7, 0, 0, 0);
    return date;
  });
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleNext = () => {
    const hours = missionTime.getHours().toString().padStart(2, '0');
    const minutes = missionTime.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    navigation.navigate('Ready', {
      ...route.params,
      missionTime: timeString,
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Daily Rhythm</Text>
        <Text style={styles.subtitle}>When's the best time for your daily mission?</Text>

        <View style={styles.timeContainer}>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.timeText}>{formatTime(missionTime)}</Text>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={missionTime}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, selectedTime) => {
                setShowTimePicker(Platform.OS === 'ios');
                if (selectedTime) setMissionTime(selectedTime);
              }}
            />
          )}

          <Text style={styles.hint}>We'll send a gentle reminder each day at this time</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Almost There →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
