/**
 * JourneyScreen
 *
 * Today-aligned Journey UI with a Duolingo-style path.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { Cog6ToothIcon } from 'react-native-heroicons/outline';

import { IconButton } from '@/components/common/IconButton';
import { JourneyHeader, JourneyPath, PhotoModal } from '@/components/journey/path';
import { TodayColors, TodaySpacing, TodayTypography } from '@/constants/todayTokens';
import type { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { useJourneyStore } from '@/store/journeyStore';
import type { JourneyDay } from '@/types/journey';
import { successHaptic, warningHaptic } from '@/utils/haptics';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Journey'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function JourneyScreen({ navigation }: Props) {
  const user = useAuthStore((state) => state.user);

  const pathDays = useJourneyStore((state) => state.pathDays);
  const stats = useJourneyStore((state) => state.stats);
  const loadJourney = useJourneyStore((state) => state.loadJourney);
  const addPhoto = useJourneyStore((state) => state.addPhoto);

  const [selectedDay, setSelectedDay] = useState<JourneyDay | null>(null);
  const [isPhotoModalVisible, setPhotoModalVisible] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (user?.id) loadJourney(user.id);
  }, [loadJourney, user?.id]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, []);

  const openPhotoModal = useCallback((day: JourneyDay) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setSelectedDay(day);
    setPhotoModalVisible(true);
  }, []);

  const handleCapture = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow access to your photos to capture moments.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled || !result.assets?.[0]?.uri) return;

      if (user?.id) {
        await addPhoto(user.id, result.assets[0].uri);
        successHaptic();
        Alert.alert('Moment Captured', "Your journey continues. You're doing amazing!", [
          { text: 'Beautiful' },
        ]);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to capture moment';
      Alert.alert('Oops!', message);
    }
  }, [addPhoto, user?.id]);

  const handleDayPress = useCallback(
    (day: JourneyDay) => {
      if (day.status === 'logged' || (day.status === 'today' && day.photoUri)) {
        openPhotoModal(day);
        return;
      }

      if (day.status === 'missed') {
        warningHaptic();
        Alert.alert('No memory captured', `No photo was captured on Day ${day.dayNumber}.`, [
          { text: 'OK' },
        ]);
        return;
      }

      if (day.status === 'today') {
        handleCapture();
      }
    },
    [handleCapture, openPhotoModal]
  );

  const handleCloseModal = useCallback(() => {
    setPhotoModalVisible(false);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    closeTimeoutRef.current = setTimeout(() => setSelectedDay(null), 240);
  }, []);

  const todayDay = pathDays.find((d) => d.status === 'today');
  const primaryActionLabel = todayDay?.photoUri ? 'View today' : "Capture today's moment";

  const handlePrimaryAction = useCallback(() => {
    if (!todayDay) return;
    if (todayDay.photoUri) {
      openPhotoModal(todayDay);
      return;
    }
    handleCapture();
  }, [handleCapture, openPhotoModal, todayDay]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.appBar}>
        <Text style={styles.title}>Journey</Text>
        <IconButton
          icon={<Cog6ToothIcon size={22} color={TodayColors.textSecondary} />}
          variant="outline"
          onPress={() => navigation.navigate('Settings')}
          accessibilityLabel="Open settings"
        />
      </View>

      <View style={styles.headerContainer}>
        <JourneyHeader
          streak={stats.currentStreak}
          connectionLevel={stats.connectionDepthLevel}
          connectionPoints={stats.connectionDepthPoints}
          todayDayNumber={todayDay?.dayNumber}
          todayHasPhoto={!!todayDay?.photoUri}
          primaryActionLabel={primaryActionLabel}
          onPrimaryAction={handlePrimaryAction}
        />
      </View>

      <JourneyPath days={pathDays} onDayPress={handleDayPress} />

      <PhotoModal visible={isPhotoModalVisible} day={selectedDay} onClose={handleCloseModal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TodayColors.bgApp,
  },
  appBar: {
    paddingHorizontal: TodaySpacing[16],
    paddingTop: TodaySpacing[12],
    paddingBottom: TodaySpacing[8],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    color: TodayColors.textPrimary,
    fontFamily: TodayTypography.bricolageBold,
  },
  headerContainer: {
    paddingHorizontal: TodaySpacing[16],
    paddingBottom: TodaySpacing[16],
  },
});
