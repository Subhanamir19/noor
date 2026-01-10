import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import { Button } from '@/components/common/Button';
import { TodayColors, TodayRadii, TodaySpacing, TodayTypography } from '@/constants/todayTokens';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkIfShouldShow = async () => {
    try {
      const lastSeenDate = await AsyncStorage.getItem(AYAH_SEEN_KEY);
      const today = new Date().toDateString();

      if (lastSeenDate !== today) {
        const todaysAyah = getTodaysAyah();
        setAyah(todaysAyah);
        setVisible(true);

        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 260,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnim, {
            toValue: 0,
            tension: 55,
            friction: 9,
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

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -20,
          duration: 180,
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
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent onRequestClose={handleDismiss}>
      <LinearGradient
        colors={[TodayColors.bgApp, '#FFE6F0', '#FFD5E3']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.centerWrap}>
          {/* Backdrop */}
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleDismiss}
            accessibilityRole="button"
            accessibilityLabel="Dismiss Ayah of the Day"
          />

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              width: '100%',
              maxWidth: 520,
              maxHeight: Math.min(680, SCREEN_HEIGHT * 0.8),
            }}
          >
            {/* Card */}
            <View
              style={{
                backgroundColor: TodayColors.cardTint,
                borderRadius: TodayRadii.lg,
                borderWidth: 2,
                borderColor: TodayColors.strokeSubtle,
                padding: TodaySpacing[16],
              }}
            >
              <Text
                style={{
                  fontFamily: TodayTypography.bricolageBold,
                  fontSize: 18,
                  color: TodayColors.textPrimary,
                  textAlign: 'center',
                  marginBottom: TodaySpacing[12],
                }}
              >
                Ayah of the Day
              </Text>

              {/* Arabic */}
              <View
                style={{
                  backgroundColor: TodayColors.card,
                  borderRadius: TodayRadii.lg,
                  borderWidth: 2,
                  borderColor: TodayColors.strokeSubtle,
                  paddingHorizontal: TodaySpacing[16],
                  paddingVertical: TodaySpacing[16],
                }}
              >
                <Text
                  style={{
                    fontFamily: 'System',
                    fontSize: 28,
                    lineHeight: 46,
                    color: TodayColors.textPrimary,
                    writingDirection: 'rtl',
                    textAlign: 'center',
                  }}
                >
                  {ayah.arabic}
                </Text>

                <View style={{ height: TodaySpacing[12] }} />

                <Text
                  style={{
                    fontFamily: TodayTypography.poppinsSemiBold,
                    fontSize: 16,
                    lineHeight: 24,
                    color: TodayColors.textSecondary,
                    textAlign: 'center',
                  }}
                >
                  “{ayah.translation}”
                </Text>
              </View>

              {/* Reference */}
              <View style={{ marginTop: TodaySpacing[12], alignItems: 'center' }}>
                <Text style={{ fontFamily: TodayTypography.bricolageSemiBold, color: TodayColors.textPrimary }}>
                  {ayah.surah} • {ayah.ayah}
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontFamily: TodayTypography.poppinsSemiBold,
                    fontSize: 12,
                    color: TodayColors.textMuted,
                    textAlign: 'center',
                  }}
                >
                  {ayah.theme}
                </Text>
              </View>

              <View style={{ marginTop: TodaySpacing[16] }}>
                <Button
                  title="Continue"
                  variant="primary"
                  size="lg"
                  fullWidth
                  onPress={handleDismiss}
                  textStyle={{ textTransform: 'none' }}
                />
              </View>

              <Text
                style={{
                  marginTop: TodaySpacing[12],
                  fontFamily: TodayTypography.poppinsSemiBold,
                  fontSize: 12,
                  color: TodayColors.textMuted,
                  textAlign: 'center',
                }}
              >
                Tap anywhere to continue
              </Text>
            </View>
          </Animated.View>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centerWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: TodaySpacing[16],
  },
});

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
