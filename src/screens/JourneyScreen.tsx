import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';

import {
  BadgesDisplay,
  ConnectionDepthBar,
  DaysCounter,
  PhotoDetailModal,
  PhotoPromptCard,
  WeekTimeline,
} from '@/components/journey';
import { OutlineButton } from '@/components/common/Button';
import { useAuthStore } from '@/store/authStore';
import { useJourneyStore } from '@/store/journeyStore';
import type { JourneyPhoto } from '@/types/models';

export function JourneyScreen() {
  // Auth state
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);

  // Journey state
  const photos = useJourneyStore((state) => state.photos);
  const badges = useJourneyStore((state) => state.badges);
  const totalDays = useJourneyStore((state) => state.totalDays);
  const connectionDepth = useJourneyStore((state) => state.connectionDepth);
  const isLoading = useJourneyStore((state) => state.isLoading);
  const loadJourney = useJourneyStore((state) => state.loadJourney);
  const addPhoto = useJourneyStore((state) => state.addPhoto);

  // Local state
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<JourneyPhoto | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  // Load journey data on mount
  useEffect(() => {
    if (user?.id) {
      loadJourney(user.id);
    }
  }, [user?.id, loadJourney]);

  const handleRefresh = useCallback(async () => {
    if (!user?.id) return;
    setRefreshing(true);
    await loadJourney(user.id);
    setRefreshing(false);
  }, [user?.id, loadJourney]);

  const handlePhotoSelected = useCallback(
    async (uri: string) => {
      if (!user?.id) return;

      try {
        await addPhoto(user.id, uri);
        Alert.alert('Success!', 'Your moment has been captured 💚');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to add photo';
        Alert.alert('Oops!', message);
      }
    },
    [user?.id, addPhoto]
  );

  const handlePhotoPress = useCallback((photo: JourneyPhoto) => {
    setSelectedPhoto(photo);
    setShowPhotoModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowPhotoModal(false);
    setSelectedPhoto(null);
  }, []);

  // Check if photo captured today
  const today = format(new Date(), 'yyyy-MM-dd');
  const capturedToday = photos.some((p) => p.photo_date === today);

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top']}>
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#10B981"
          />
        }
      >
        <View className="px-6 pt-6">
          {/* Days Counter */}
          <DaysCounter
            totalDays={totalDays}
            childName={profile?.child_name ?? undefined}
          />

          {/* Connection Depth */}
          <ConnectionDepthBar connectionDepth={connectionDepth} />

          {/* Photo Prompt */}
          <PhotoPromptCard
            onPhotoSelected={handlePhotoSelected}
            alreadyCapturedToday={capturedToday}
          />
        </View>

        {/* Week Timeline */}
        <WeekTimeline photos={photos} onPhotoPress={handlePhotoPress} />

        {/* Badges */}
        <BadgesDisplay badges={badges} />

        {/* View Full Timeline */}
        {totalDays > 7 && (
          <View className="px-6 mb-6">
            <OutlineButton
              title="View Full Timeline"
              onPress={() => {}}
              fullWidth
            />
          </View>
        )}

        {/* Empty state */}
        {totalDays === 0 && !isLoading && (
          <View className="px-6 py-8 items-center">
            <Text className="text-4xl mb-4">📸</Text>
            <Text className="text-xl font-poppinsSemiBold text-teal text-center mb-2">
              Start Your Journey Today
            </Text>
            <Text className="text-base font-interRegular text-warmGray text-center">
              Capture a moment with your little one and watch your connection
              grow
            </Text>
          </View>
        )}

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>

      {/* Photo Detail Modal */}
      <PhotoDetailModal
        visible={showPhotoModal}
        photo={selectedPhoto}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}
