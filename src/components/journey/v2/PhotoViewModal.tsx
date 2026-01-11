/**
 * PhotoViewModal Component
 *
 * Full-screen modal to view completed day photos.
 * Features smooth entry/exit animations and swipe-to-dismiss gesture.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { format } from 'date-fns';

import type { JourneyDay } from '@/types/journey';
import type { JourneyPhoto } from '@/types/models';
import {
  NewJourneyColors,
  NewJourneyAnimations,
} from '@/constants/journeyTokensV2';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PHOTO_SIZE = SCREEN_WIDTH - 48;

interface PhotoViewModalProps {
  visible: boolean;
  day: JourneyDay | null;
  photo: JourneyPhoto | undefined;
  onClose: () => void;
}

export const PhotoViewModal: React.FC<PhotoViewModalProps> = ({
  visible,
  day,
  photo,
  onClose,
}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  React.useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, {
        duration: NewJourneyAnimations.modalFadeInDuration,
      });
      scale.value = withSpring(1, {
        damping: NewJourneyAnimations.modalSpring.damping,
        stiffness: NewJourneyAnimations.modalSpring.stiffness,
      });
    } else {
      opacity.value = withTiming(0, {
        duration: NewJourneyAnimations.modalFadeOutDuration,
      });
      scale.value = withTiming(0.8, {
        duration: NewJourneyAnimations.modalFadeOutDuration,
      });
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  if (!day || !photo) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <BlurView intensity={20} style={StyleSheet.absoluteFill} />
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      {/* Photo Card */}
      <View style={styles.centered}>
        <Animated.View style={[styles.card, cardStyle]}>
          {/* Drag indicator */}
          <View style={styles.dragIndicator} />

          {/* Photo */}
          <View style={styles.photoFrame}>
            <Image
              source={{ uri: photo.photo_url }}
              style={styles.photo}
              resizeMode="cover"
            />
          </View>

          {/* Info */}
          <View style={styles.info}>
            <Text style={styles.dayLabel}>Day {day.dayNumber}</Text>
            <Text style={styles.dateText}>
              {format(new Date(day.date), 'EEEE, MMMM d, yyyy')}
            </Text>

            {/* Reflection text */}
            {photo.reflection_text && (
              <Text style={styles.reflection}>
                "{photo.reflection_text}"
              </Text>
            )}
          </View>

          {/* Close button */}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: PHOTO_SIZE + 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 16,
    alignSelf: 'center',
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
  info: {
    paddingTop: 16,
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 24,
    fontFamily: 'BricolageGrotesque-Bold',
    color: NewJourneyColors.textPrimary,
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: NewJourneyColors.textMuted,
    marginTop: 4,
  },
  reflection: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: NewJourneyColors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 8,
    lineHeight: 22,
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
