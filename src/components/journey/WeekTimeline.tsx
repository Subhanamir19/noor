import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { format, isToday, subDays } from 'date-fns';

import type { JourneyPhoto } from '@/types/models';

interface Props {
  photos: JourneyPhoto[];
  onPhotoPress: (photo: JourneyPhoto) => void;
}

export function WeekTimeline({ photos, onPhotoPress }: Props) {
  // Generate last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    return {
      date,
      dateString: format(date, 'yyyy-MM-dd'),
      label: format(date, 'EEE'),
      isToday: isToday(date),
    };
  });

  // Map photos to days
  const daysWithPhotos = last7Days.map((day) => ({
    ...day,
    photo: photos.find((p) => p.photo_date === day.dateString),
  }));

  return (
    <View className="mb-4">
      <Text className="text-base font-interMedium text-teal mb-3 px-6">
        This Week's Story
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingRight: 48 }}
      >
        {daysWithPhotos.map((day) => (
          <TouchableOpacity
            key={day.dateString}
            className="mr-3 items-center"
            onPress={() => day.photo && onPhotoPress(day.photo)}
            activeOpacity={0.7}
            disabled={!day.photo}
          >
            <View
              className={`w-20 h-20 rounded-2xl overflow-hidden border-2 mb-2 ${
                day.photo
                  ? 'border-emerald'
                  : day.isToday
                  ? 'border-gold bg-gold/10'
                  : 'border-warmGray/30 bg-warmGray/10'
              }`}
            >
              {day.photo ? (
                <Image
                  source={{ uri: day.photo.photo_url }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full items-center justify-center">
                  <Text className="text-2xl">{day.isToday ? '?' : ''}</Text>
                </View>
              )}
            </View>
            <Text
              className={`text-xs font-interMedium ${
                day.photo
                  ? 'text-emerald'
                  : day.isToday
                  ? 'text-gold'
                  : 'text-warmGray'
              }`}
            >
              {day.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
