/**
 * JourneyScreen (Duolingo-Style)
 *
 * Main screen for the journey feature with a gamified path view.
 * Displays days as 3D chunky nodes along an S-curve path.
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import {
  JourneyHeader,
  JourneyPath,
  CaptureButton,
  PhotoModal,
} from '@/components/journey/path';
import { useAuthStore } from '@/store/authStore';
import { useJourneyStore } from '@/store/journeyStore';
import type { JourneyDay } from '@/types/journey';
import { JourneyColors } from '@/constants/journeyTokens';
import { successHaptic, warningHaptic } from '@/utils/haptics';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function JourneyScreen() {
  // Auth state
  const user = useAuthStore((state) => state.user);

  // Journey state
  const pathDays = useJourneyStore((state) => state.pathDays);
  const stats = useJourneyStore((state) => state.stats);
  const loadJourney = useJourneyStore((state) => state.loadJourney);
  const addPhoto = useJourneyStore((state) => state.addPhoto);

  // Local UI state
  const [selectedDay, setSelectedDay] = useState<JourneyDay | null>(null);
  const [isPhotoModalVisible, setPhotoModalVisible] = useState(false);

  // Load journey data on mount
  useEffect(() => {
    if (user?.id) {
      loadJourney(user.id);
    }
  }, [user?.id, loadJourney]);

  // Handle day press
  const handleDayPress = useCallback((day: JourneyDay) => {
    if (day.status === 'logged') {
      // Open photo modal for logged days
      setSelectedDay(day);
      setPhotoModalVisible(true);
    } else if (day.status === 'today' && day.photoUri) {
      // Today with photo - show it
      setSelectedDay(day);
      setPhotoModalVisible(true);
    } else if (day.status === 'missed') {
      // Show toast for missed days
      warningHaptic();
      Alert.alert(
        'No Memory Captured',
        `No photo was captured on Day ${day.dayNumber}. Keep going! 💪`,
        [{ text: 'OK' }]
      );
    } else if (day.status === 'today') {
      // Today without photo - prompt to capture
      handleCapture();
    }
    // Locked days do nothing (disabled in DayNode)
  }, []);

  // Handle capture button press
  const handleCapture = useCallback(async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow access to your photos to capture moments.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled || !result.assets?.[0]?.uri) {
        return;
      }

      const photoUri = result.assets[0].uri;

      // Upload photo
      if (user?.id) {
        await addPhoto(user.id, photoUri);
        successHaptic();
        Alert.alert(
          'Moment Captured! ✨',
          "Your journey continues. You're doing amazing!",
          [{ text: 'Beautiful!' }]
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to capture moment';
      Alert.alert('Oops!', message);
    }
  }, [user?.id, addPhoto]);

  // Close photo modal
  const handleCloseModal = useCallback(() => {
    setPhotoModalVisible(false);
    setSelectedDay(null);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with stats */}
      <JourneyHeader
        streak={stats.currentStreak}
        connectionLevel={stats.connectionDepthLevel}
        connectionPoints={stats.connectionDepthPoints}
      />

      {/* Main journey path */}
      <JourneyPath
        days={pathDays}
        onDayPress={handleDayPress}
      />

      {/* Floating capture button */}
      <CaptureButton
        onPress={handleCapture}
        testID="capture-button"
      />

      {/* Photo detail modal */}
      {isPhotoModalVisible && (
        <PhotoModal
          visible={isPhotoModalVisible}
          day={selectedDay}
          onClose={handleCloseModal}
        />
      )}
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: JourneyColors.background,
  },
});
