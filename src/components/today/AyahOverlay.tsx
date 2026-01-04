import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Modal, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import { Button } from '@/components/common/Button';
import { getTodaysAyah, type AyahOfTheDay } from '@/data/ayahOfTheDay';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const AYAH_SEEN_KEY = 'ayah_last_seen_date';

interface Props {
  onDismiss: () => void;
}

export function AyahOverlay({ onDismiss }: Props) {
  const [visible, setVisible] = useState(false);
  const [ayah, setAyah] = useState<AyahOfTheDay | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  useEffect(() => {
    checkIfShouldShow();
  }, []);

  const checkIfShouldShow = async () => {
    try {
      const lastSeenDate = await AsyncStorage.getItem(AYAH_SEEN_KEY);
      const today = new Date().toDateString();

      if (lastSeenDate !== today) {
        const todaysAyah = getTodaysAyah();
        setAyah(todaysAyah);
        setVisible(true);

        // Animate in
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnim, {
            toValue: 0,
            tension: 50,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();
      }
    } catch (error) {
      console.error('Error checking ayah seen status:', error);
    }
  };

  const handleDismiss = async () => {
    try {
      const today = new Date().toDateString();
      await AsyncStorage.setItem(AYAH_SEEN_KEY, today);

      // Animate out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false);
        onDismiss();
      });
    } catch (error) {
      console.error('Error saving ayah seen status:', error);
      setVisible(false);
      onDismiss();
    }
  };

  if (!visible || !ayah) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleDismiss}
    >
      <LinearGradient
        colors={['#FFF0F5', '#FFE4EC', '#FFD6E0']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-1 justify-center items-center px-6">
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              width: '100%',
              alignItems: 'center',
            }}
          >
            {/* Decorative top element */}
            <View className="mb-8">
              <Text style={{ fontSize: 48 }}>
                ﷽
              </Text>
            </View>

            {/* Arabic Text */}
            <View className="bg-white/80 rounded-3xl px-6 py-8 mb-6 w-full">
              <Text
                className="text-center mb-6"
                style={{
                  fontFamily: 'System',
                  fontSize: 28,
                  lineHeight: 48,
                  color: '#1a1a1a',
                  writingDirection: 'rtl',
                }}
              >
                {ayah.arabic}
              </Text>

              {/* Decorative divider */}
              <View className="flex-row items-center justify-center mb-6">
                <View className="h-[1px] w-12 bg-pinkMedium" />
                <Text className="mx-3 text-pinkAccent">✦</Text>
                <View className="h-[1px] w-12 bg-pinkMedium" />
              </View>

              {/* Translation */}
              <Text
                className="text-center font-interMedium text-warmGray"
                style={{ fontSize: 18, lineHeight: 28 }}
              >
                "{ayah.translation}"
              </Text>
            </View>

            {/* Reference */}
            <View className="bg-white/60 rounded-2xl px-5 py-3 mb-8">
              <Text className="text-center font-poppinsSemiBold text-teal">
                {ayah.surah} • {ayah.ayah}
              </Text>
              <Text className="text-center font-interRegular text-warmGray text-sm mt-1">
                {ayah.theme}
              </Text>
            </View>

            {/* Read Button - Duolingo 3D style */}
            <View style={{ width: '100%', maxWidth: 280 }}>
              <Button
                title="Read it ✓"
                variant="primary"
                size="lg"
                fullWidth
                onPress={handleDismiss}
              />
            </View>

            {/* Subtle skip option */}
            <Text
              className="text-warmGray/60 font-interRegular text-sm mt-4"
              onPress={handleDismiss}
            >
              Tap anywhere to continue
            </Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </Modal>
  );
}

/**
 * Hook to manage Ayah overlay state
 */
export function useAyahOverlay() {
  const [showAyah, setShowAyah] = useState(true);

  const handleAyahDismiss = () => {
    setShowAyah(false);
  };

  return {
    showAyah,
    handleAyahDismiss,
  };
}
