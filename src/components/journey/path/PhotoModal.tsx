/**
 * PhotoModal Component
 *
 * Full-screen modal for viewing a day's photo with elite motion design.
 * Features cinematic scale-up entry, blur backdrop, and swipe-to-dismiss.
 */

import React, { memo, useEffect } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { format, parseISO } from 'date-fns';

import type { JourneyDay } from '@/types/journey';
import { JourneyColors, JourneyAnimations, JourneySizes } from '@/constants/journeyTokens';
import { lightHaptic } from '@/utils/haptics';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PhotoModalProps {
  visible: boolean;
  day: JourneyDay | null;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PHOTO_SIZE = Math.min(SCREEN_WIDTH - 48, 340);
const { modalSpring, dismissThreshold, fadeInDuration, fadeOutDuration } = JourneyAnimations;

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function formatDate(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    return format(date, 'EEEE, MMMM d');
  } catch {
    return dateStr;
  }
}

function getSentimentEmoji(sentiment?: 'happy' | 'neutral' | 'tough'): string {
  switch (sentiment) {
    case 'happy':
      return '😊';
    case 'neutral':
      return '😐';
    case 'tough':
      return '😓';
    default:
      return '';
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function PhotoModalComponent({ visible, day, onClose }: PhotoModalProps) {
  // Animation values
  const scale = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  // Entry/exit animations
  useEffect(() => {
    if (visible) {
      // Cinematic entry - scale up with spring bounce
      opacity.value = withTiming(1, { duration: fadeInDuration });
      scale.value = withSpring(1, modalSpring);
    } else {
      // Quick exit
      opacity.value = withTiming(0, { duration: fadeOutDuration });
      scale.value = withTiming(0, { duration: fadeOutDuration + 50 });
      translateY.value = withTiming(0, { duration: fadeOutDuration });
    }
  }, [visible, opacity, scale, translateY]);

  // Swipe down to dismiss gesture
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Only allow downward swipe
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > dismissThreshold) {
        // Dismiss threshold reached
        runOnJS(lightHaptic)();
        runOnJS(onClose)();
      } else {
        // Snap back
        translateY.value = withSpring(0, { damping: 20 });
      }
    });

  // Animated styles
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => {
    const dismissProgress = interpolate(
      translateY.value,
      [0, 200],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { scale: scale.value * (1 - dismissProgress * 0.15) },
        { translateY: translateY.value },
      ],
      opacity: interpolate(dismissProgress, [0, 1], [1, 0.6]),
    };
  });

  // Don't render if not visible and animation complete
  if (!visible && opacity.value === 0) return null;
  if (!day) return null;

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <View style={styles.container}>
        {/* Blurred backdrop */}
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFill} />
          <View style={styles.backdropOverlay} />
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onClose}
            accessibilityLabel="Close photo"
          />
        </Animated.View>

        {/* Photo card */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.card, cardStyle]}>
            {/* Drag indicator */}
            <View style={styles.dragIndicator} />

            {/* Photo frame */}
            <View style={styles.photoFrame}>
              {day.photoUri ? (
                <Image
                  source={{ uri: day.photoUri }}
                  style={styles.photo}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.placeholderEmoji}>📷</Text>
                  <Text style={styles.placeholderText}>No photo</Text>
                </View>
              )}
            </View>

            {/* Day info */}
            <View style={styles.infoContainer}>
              <Text style={styles.dayLabel}>Day {day.dayNumber}</Text>
              <Text style={styles.dateText}>{formatDate(day.date)}</Text>

              {/* Sentiment badge */}
              {day.sentiment && (
                <View style={styles.sentimentBadge}>
                  <Text style={styles.sentimentEmoji}>
                    {getSentimentEmoji(day.sentiment)}
                  </Text>
                  <Text style={styles.sentimentText}>
                    {day.sentiment === 'happy'
                      ? 'Great day'
                      : day.sentiment === 'neutral'
                      ? 'Okay day'
                      : 'Tough day'}
                  </Text>
                </View>
              )}

              {/* Reflection text */}
              {day.reflectionText && (
                <Text style={styles.reflectionText}>
                  "{day.reflectionText}"
                </Text>
              )}
            </View>

            {/* Close hint */}
            <Text style={styles.closeHint}>Swipe down or tap outside to close</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    width: PHOTO_SIZE + 32,
    backgroundColor: '#FFFFFF',
    borderRadius: JourneySizes.modalBorderRadius,
    padding: 16,
    alignItems: 'center',
    // Elevated shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 24,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 16,
  },
  photoFrame: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  placeholderEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: JourneyColors.textMuted,
    fontFamily: 'Poppins-Regular',
  },
  infoContainer: {
    width: '100%',
    paddingTop: 16,
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 24,
    fontWeight: '700',
    color: JourneyColors.textDark,
    fontFamily: 'Poppins-Bold',
  },
  dateText: {
    fontSize: 14,
    color: JourneyColors.textMuted,
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
  sentimentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#FFF7ED',
    borderRadius: 16,
    gap: 6,
  },
  sentimentEmoji: {
    fontSize: 18,
  },
  sentimentText: {
    fontSize: 13,
    color: JourneyColors.textDark,
    fontFamily: 'Poppins-Medium',
  },
  reflectionText: {
    fontSize: 15,
    color: '#4B5563',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 14,
    paddingHorizontal: 8,
    lineHeight: 22,
  },
  closeHint: {
    fontSize: 11,
    color: '#9CA3AF',
    fontFamily: 'Poppins-Regular',
    marginTop: 16,
  },
});

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const PhotoModal = memo(PhotoModalComponent);
