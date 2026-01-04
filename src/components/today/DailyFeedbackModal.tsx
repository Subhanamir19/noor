import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { PrimaryButton, OutlineButton } from '@/components/common/Button';
import type { DailyFeedbackRating } from '@/types/models';

interface Props {
  visible: boolean;
  onSubmit: (rating: DailyFeedbackRating) => void;
  onClose: () => void;
}

// Duolingo-style 3D button constants
const SHADOW_HEIGHT = 4;
const BORDER_RADIUS = 16;

const RATING_OPTIONS: Array<{
  value: DailyFeedbackRating;
  emoji: string;
  label: string;
  description: string;
  colors: { bg: string; shadow: string; border: string; accent: string };
}> = [
  {
    value: 'too_easy',
    emoji: '😎',
    label: 'Too Easy',
    description: 'I could handle more tasks',
    colors: {
      bg: '#E3F2FD',
      shadow: '#90CAF9',
      border: '#64B5F6',
      accent: '#1565C0',
    },
  },
  {
    value: 'just_right',
    emoji: '😊',
    label: 'Just Right',
    description: 'Perfect amount for today',
    colors: {
      bg: '#E8F5E9',
      shadow: '#A5D6A7',
      border: '#81C784',
      accent: '#2E7D32',
    },
  },
  {
    value: 'too_hard',
    emoji: '😓',
    label: 'Too Hard',
    description: 'I struggled to finish',
    colors: {
      bg: '#FFF3E0',
      shadow: '#FFCC80',
      border: '#FFB74D',
      accent: '#E65100',
    },
  },
];

export function DailyFeedbackModal({ visible, onSubmit, onClose }: Props) {
  const [selectedRating, setSelectedRating] = useState<DailyFeedbackRating | null>(null);

  const handleSubmit = () => {
    if (selectedRating) {
      onSubmit(selectedRating);
      setSelectedRating(null);
    }
  };

  const handleClose = () => {
    setSelectedRating(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1 bg-cream">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-warmGray/20">
          <View className="w-10" />
          <Text className="text-lg font-poppinsSemiBold text-teal">How Was Today?</Text>
          <Pressable onPress={handleClose}>
            <Text className="text-lg">✕</Text>
          </Pressable>
        </View>

        <View className="flex-1 px-6 py-6">
          {/* Celebration */}
          <View className="items-center mb-6">
            <Text className="text-5xl mb-2">🎉</Text>
            <Text className="text-xl font-poppinsBold text-teal text-center">
              MashAllah! You did it!
            </Text>
            <Text className="text-base text-warmGray text-center mt-2">
              All your tasks for today are complete
            </Text>
          </View>

          {/* Question */}
          <View className="mb-6">
            <View
              style={{
                position: 'absolute',
                top: SHADOW_HEIGHT,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#B2DFDB',
                borderRadius: BORDER_RADIUS,
              }}
            />
            <View
              style={{
                backgroundColor: '#E0F2F1',
                borderRadius: BORDER_RADIUS,
                borderWidth: 2,
                borderColor: '#80CBC4',
                padding: 16,
                marginBottom: SHADOW_HEIGHT,
              }}
            >
              <Text className="text-base font-semibold text-teal-800 text-center">
                How did today's task load feel?
              </Text>
              <Text className="text-sm text-teal-600 text-center mt-1">
                Your feedback helps us personalize your daily tasks
              </Text>
            </View>
          </View>

          {/* Rating Options */}
          <View className="gap-3">
            {RATING_OPTIONS.map((option) => {
              const isSelected = selectedRating === option.value;
              const colors = option.colors;

              return (
                <Pressable
                  key={option.value}
                  onPress={() => setSelectedRating(option.value)}
                >
                  {({ pressed }) => {
                    const translateY = pressed ? SHADOW_HEIGHT : 0;
                    const currentShadowHeight = pressed ? 0 : SHADOW_HEIGHT;

                    return (
                      <View>
                        {/* Shadow layer */}
                        <View
                          style={{
                            position: 'absolute',
                            top: SHADOW_HEIGHT,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: isSelected ? colors.shadow : '#E0E0E0',
                            borderRadius: BORDER_RADIUS,
                          }}
                        />

                        {/* Main card surface */}
                        <View
                          style={{
                            backgroundColor: isSelected ? colors.bg : '#FFFFFF',
                            borderRadius: BORDER_RADIUS,
                            borderWidth: isSelected ? 3 : 2,
                            borderColor: isSelected ? colors.accent : '#E5E5E5',
                            transform: [{ translateY }],
                            marginBottom: currentShadowHeight,
                            padding: 16,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          {/* Emoji */}
                          <Text className="text-3xl mr-4">{option.emoji}</Text>

                          {/* Text content */}
                          <View className="flex-1">
                            <Text
                              style={{ color: isSelected ? colors.accent : '#424242' }}
                              className="text-base font-bold"
                            >
                              {option.label}
                            </Text>
                            <Text className="text-sm text-gray-500">{option.description}</Text>
                          </View>

                          {/* Selection indicator */}
                          <View
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 12,
                              borderWidth: 2,
                              borderColor: isSelected ? colors.accent : '#BDBDBD',
                              backgroundColor: isSelected ? colors.accent : 'transparent',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {isSelected && <Text className="text-white text-xs">✓</Text>}
                          </View>
                        </View>
                      </View>
                    );
                  }}
                </Pressable>
              );
            })}
          </View>

          {/* Info text */}
          <View className="mt-6 px-2">
            <Text className="text-sm text-warmGray text-center">
              Based on your feedback, we'll adjust the number of tasks for tomorrow
            </Text>
          </View>
        </View>

        {/* Action buttons */}
        <View className="px-6 py-4 border-t border-warmGray/20">
          <PrimaryButton
            title="Submit Feedback"
            onPress={handleSubmit}
            disabled={!selectedRating}
            fullWidth
          />
          <View className="mt-3">
            <OutlineButton title="Skip for Now" onPress={handleClose} fullWidth />
          </View>
        </View>
      </View>
    </Modal>
  );
}
