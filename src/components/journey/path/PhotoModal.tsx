/**
 * PhotoModal Component
 *
 * Full-screen modal for viewing a day's photo.
 * Features cinematic entry, blur backdrop, and swipe-to-dismiss.
 */

import React, { memo, useEffect, useMemo } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { format, parseISO } from 'date-fns';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { ExclamationTriangleIcon, MinusIcon, PhotoIcon, SparklesIcon } from 'react-native-heroicons/solid';

import type { JourneyDay } from '@/types/journey';
import { JourneyAnimations } from '@/constants/journeyTokens';
import { TodayColors, TodayRadii, TodaySpacing, TodayTypography } from '@/constants/todayTokens';
import { lightHaptic } from '@/utils/haptics';

interface PhotoModalProps {
  visible: boolean;
  day: JourneyDay | null;
  onClose: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PHOTO_SIZE = Math.min(SCREEN_WIDTH - 48, 340);
const { modalSpring, dismissThreshold, fadeInDuration, fadeOutDuration } = JourneyAnimations;

function formatDate(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    return format(date, 'EEEE, MMMM d');
  } catch {
    return dateStr;
  }
}

type Sentiment = NonNullable<JourneyDay['sentiment']>;

function sentimentConfig(sentiment: Sentiment): {
  label: string;
  icon: React.ReactNode;
  bg: string;
  fg: string;
} {
  switch (sentiment) {
    case 'happy':
      return {
        label: 'Great day',
        icon: <SparklesIcon size={16} color={TodayColors.success} />,
        bg: 'rgba(22,163,74,0.10)',
        fg: TodayColors.textPrimary,
      };
    case 'neutral':
      return {
        label: 'Okay day',
        icon: <MinusIcon size={16} color={TodayColors.textMuted} />,
        bg: 'rgba(107,114,128,0.10)',
        fg: TodayColors.textPrimary,
      };
    case 'tough':
      return {
        label: 'Tough day',
        icon: <ExclamationTriangleIcon size={16} color={TodayColors.warning} />,
        bg: 'rgba(245,158,11,0.12)',
        fg: TodayColors.textPrimary,
      };
  }
}

function PhotoModalComponent({ visible, day, onClose }: PhotoModalProps) {
  const scale = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: fadeInDuration });
      scale.value = withSpring(1, modalSpring);
      return;
    }

    opacity.value = withTiming(0, { duration: fadeOutDuration });
    scale.value = withTiming(0, { duration: fadeOutDuration + 50 });
    translateY.value = withTiming(0, { duration: fadeOutDuration });
  }, [opacity, scale, translateY, visible]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (event.translationY > dismissThreshold) {
        runOnJS(lightHaptic)();
        runOnJS(onClose)();
        return;
      }
      translateY.value = withSpring(0, { damping: 20 });
    });

  const backdropStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const cardStyle = useAnimatedStyle(() => {
    const dismissProgress = interpolate(translateY.value, [0, 200], [0, 1], Extrapolation.CLAMP);
    return {
      transform: [
        { scale: scale.value * (1 - dismissProgress * 0.15) },
        { translateY: translateY.value },
      ],
      opacity: interpolate(dismissProgress, [0, 1], [1, 0.65]),
    };
  });

  const sentiment = useMemo(() => {
    if (!day?.sentiment) return null;
    return sentimentConfig(day.sentiment);
  }, [day?.sentiment]);

  if (!day) return null;
  if (!visible && opacity.value === 0) return null;

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <View style={styles.container}>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <BlurView intensity={22} tint="light" style={StyleSheet.absoluteFill} />
          <View style={styles.backdropOverlay} />
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onClose}
            accessibilityLabel="Close photo"
          />
        </Animated.View>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.card, cardStyle]}>
            <View style={styles.dragIndicator} />

            <View style={styles.photoFrame}>
              {day.photoUri ? (
                <Image source={{ uri: day.photoUri }} style={styles.photo} resizeMode="cover" />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <PhotoIcon size={42} color={TodayColors.textMuted} />
                  <Text style={styles.placeholderText}>No photo</Text>
                </View>
              )}
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.dayLabel}>Day {day.dayNumber}</Text>
              <Text style={styles.dateText}>{formatDate(day.date)}</Text>

              {sentiment && (
                <View style={[styles.sentimentBadge, { backgroundColor: sentiment.bg }]}>
                  {sentiment.icon}
                  <Text style={[styles.sentimentText, { color: sentiment.fg }]}>
                    {sentiment.label}
                  </Text>
                </View>
              )}

              {day.reflectionText && (
                <Text style={styles.reflectionText}>"{day.reflectionText}"</Text>
              )}
            </View>

            <Text style={styles.closeHint}>Swipe down or tap outside to close</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureRoot: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17, 24, 39, 0.35)',
  },
  card: {
    width: PHOTO_SIZE + 32,
    backgroundColor: TodayColors.card,
    borderRadius: TodayRadii.xl,
    padding: TodaySpacing[16],
    alignItems: 'center',
    borderWidth: 1,
    borderColor: TodayColors.strokeSubtle,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 20,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: TodayColors.strokeSubtle,
    borderRadius: TodayRadii.pill,
    marginBottom: TodaySpacing[16],
  },
  photoFrame: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: TodayRadii.lg,
    overflow: 'hidden',
    backgroundColor: 'rgba(17,24,39,0.04)',
    borderWidth: 1,
    borderColor: TodayColors.strokeSubtle,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: TodaySpacing[8],
  },
  placeholderText: {
    fontSize: 14,
    lineHeight: 20,
    color: TodayColors.textMuted,
    fontFamily: TodayTypography.poppinsSemiBold,
  },
  infoContainer: {
    width: '100%',
    paddingTop: TodaySpacing[16],
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 22,
    lineHeight: 28,
    color: TodayColors.textPrimary,
    fontFamily: TodayTypography.bricolageBold,
  },
  dateText: {
    fontSize: 12,
    lineHeight: 16,
    color: TodayColors.textMuted,
    fontFamily: TodayTypography.poppinsSemiBold,
    marginTop: TodaySpacing[4],
  },
  sentimentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: TodaySpacing[8],
    marginTop: TodaySpacing[12],
    paddingHorizontal: TodaySpacing[12],
    paddingVertical: TodaySpacing[8],
    borderRadius: TodayRadii.pill,
    borderWidth: 1,
    borderColor: TodayColors.strokeSubtle,
  },
  sentimentText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: TodayTypography.poppinsSemiBold,
  },
  reflectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: TodayColors.textSecondary,
    fontFamily: TodayTypography.poppinsSemiBold,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: TodaySpacing[12],
    paddingHorizontal: TodaySpacing[8],
  },
  closeHint: {
    fontSize: 12,
    lineHeight: 16,
    color: TodayColors.textMuted,
    fontFamily: TodayTypography.poppinsSemiBold,
    marginTop: TodaySpacing[16],
  },
});

export const PhotoModal = memo(PhotoModalComponent);

