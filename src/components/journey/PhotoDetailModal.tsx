import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { format } from 'date-fns';

import type { JourneyPhoto } from '@/types/models';

interface Props {
  visible: boolean;
  photo: JourneyPhoto | null;
  onClose: () => void;
}

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width - 48;

const SENTIMENT_EMOJI: Record<string, string> = {
  good: '😊',
  okay: '😐',
  hard: '😓',
};

export function PhotoDetailModal({ visible, photo, onClose }: Props) {
  if (!photo) return null;

  const sentimentEmoji = photo.reflection_sentiment
    ? SENTIMENT_EMOJI[photo.reflection_sentiment] ?? ''
    : '';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/80">
        {/* Close button */}
        <TouchableOpacity
          className="absolute top-12 right-6 z-10 bg-white/20 rounded-full w-10 h-10 items-center justify-center"
          onPress={onClose}
        >
          <Text className="text-white text-2xl">×</Text>
        </TouchableOpacity>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingVertical: 60 }}
        >
          {/* Photo */}
          <View className="px-6 mb-4">
            <Image
              source={{ uri: photo.photo_url }}
              style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
              className="rounded-2xl"
              resizeMode="cover"
            />
          </View>

          {/* Date */}
          <Text className="text-white text-center font-interMedium mb-4">
            {format(new Date(photo.photo_date), 'EEEE, MMMM d, yyyy')}
          </Text>

          {/* Reflection */}
          {photo.reflection_text && (
            <View className="mx-6 bg-white/90 rounded-2xl p-4 mb-4">
              <View className="flex-row items-center mb-2">
                {sentimentEmoji && (
                  <Text className="text-2xl mr-2">{sentimentEmoji}</Text>
                )}
                <Text className="text-sm font-interMedium text-warmGray">
                  Your reflection:
                </Text>
              </View>
              <Text className="text-base font-interRegular text-teal">
                {photo.reflection_text}
              </Text>
            </View>
          )}

          {/* AI Response */}
          {photo.ai_response && (
            <View className="mx-6 bg-emerald/90 rounded-2xl p-4">
              <Text className="text-sm font-interMedium text-white/80 mb-2">
                Noor says:
              </Text>
              <Text className="text-base font-interRegular text-white">
                {photo.ai_response}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}
