/**
 * JourneyScreenNew
 *
 * Main container for the new Duolingo-inspired Journey Screen.
 * Features:
 * - Vertical scrolling S-curve path with 3D chunky day badges
 * - Floating streak counter
 * - Photo view modal for completed days
 * - Unlock prompt for additional days
 */

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';

import { JourneyPathV2 } from '@/components/journey/v2/JourneyPathV2';
import { StreakCard } from '@/components/journey/v2/StreakCard';
import { PhotoViewModal } from '@/components/journey/v2/PhotoViewModal';
import { EmptyState } from '@/components/journey/v2/EmptyState';
import { useAuthStore } from '@/store/authStore';
import { useJourneyStore } from '@/store/journeyStore';
import type { JourneyDay } from '@/types/journey';
import { NewJourneyColors } from '@/constants/journeyTokensV2';

export function JourneyScreenNew() {
  const user = useAuthStore((state) => state.user);
  const pathDays = useJourneyStore((state) => state.pathDays);
  const stats = useJourneyStore((state) => state.stats);
  const loadJourney = useJourneyStore((state) => state.loadJourney);
  const getPhotoForDay = useJourneyStore((state) => state.getPhotoForDay);

  const [selectedDay, setSelectedDay] = useState<JourneyDay | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  // Load journey on mount
  useEffect(() => {
    if (user?.id) {
      loadJourney(user.id);
    }
  }, [user?.id, loadJourney]);

  // Handle day badge tap
  const handleDayPress = useCallback(
    (day: JourneyDay) => {
      // Only open modal if day has a photo
      if (day.photoUri) {
        setSelectedDay(day);
        setShowPhotoModal(true);
      }
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setShowPhotoModal(false);
    setSelectedDay(null);
  }, []);

  // Calculate last 7 days for streak card
  const lastWeekDays = useMemo(() => {
    const today = new Date();
    const last7Days: boolean[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = format(date, 'yyyy-MM-dd');

      const dayHasPhoto = pathDays.some(
        (day) => day.date === dateStr && day.status === 'logged'
      );
      last7Days.push(dayHasPhoto);
    }

    return last7Days;
  }, [pathDays]);

  // Show first 10 days
  const visibleDays = pathDays.slice(0, 10);
  const hasMore = pathDays.length > 10;
  const hasPhotos = pathDays.some((day) => day.status === 'logged');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {!hasPhotos ? (
        // Empty state for first-time users
        <EmptyState />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Enhanced Streak Card */}
          <StreakCard
            currentStreak={stats.currentStreak}
            longestStreak={stats.longestStreak}
            weekDays={lastWeekDays}
          />

          {/* Scrollable Path */}
          <JourneyPathV2
            days={visibleDays}
            onDayPress={handleDayPress}
            showUnlockPrompt={hasMore}
          />
        </ScrollView>
      )}

      {/* Photo Modal */}
      <PhotoViewModal
        visible={showPhotoModal}
        day={selectedDay}
        photo={selectedDay ? getPhotoForDay(selectedDay.dayNumber) : undefined}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NewJourneyColors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
});

// Export with both names for compatibility
export { JourneyScreenNew as JourneyScreen };
