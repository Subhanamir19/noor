import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodayTypography } from '@/constants/todayTokens';

const TOOLTIP_STORAGE_KEY = 'noor_quick_capture_tooltip_shown';

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export function QuickCaptureTooltip({ visible, onDismiss }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: 20,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, translateAnim]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateAnim }],
        },
      ]}
    >
      <View style={styles.tooltip}>
        <View style={styles.arrow} />
        <Text style={styles.title}>Nurture a Trait</Text>
        <Text style={styles.description}>
          Tap here to get a small, Sunnah-guided practice you can do with your child today.
        </Text>
        <Pressable style={styles.button} onPress={onDismiss}>
          <Text style={styles.buttonText}>Got it!</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

/**
 * Hook to manage tooltip visibility
 */
export function useQuickCaptureTooltip() {
  const [showTooltip, setShowTooltip] = React.useState(false);

  useEffect(() => {
    checkTooltipStatus();
  }, []);

  const checkTooltipStatus = async () => {
    try {
      const shown = await AsyncStorage.getItem(TOOLTIP_STORAGE_KEY);
      if (!shown) {
        // Delay showing tooltip
        setTimeout(() => setShowTooltip(true), 2000);
      }
    } catch {
      // Ignore errors
    }
  };

  const dismissTooltip = async () => {
    setShowTooltip(false);
    try {
      await AsyncStorage.setItem(TOOLTIP_STORAGE_KEY, 'true');
    } catch {
      // Ignore errors
    }
  };

  return { showTooltip, dismissTooltip };
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90, // Above the FAB
    right: 16,
    zIndex: 1001,
  },
  tooltip: {
    backgroundColor: '#1A5F4A',
    borderRadius: 16,
    padding: 16,
    maxWidth: 260,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  arrow: {
    position: 'absolute',
    bottom: -8,
    right: 24,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1A5F4A',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: TodayTypography.bricolageBold,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: '#D1FAE5',
    lineHeight: 20,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#58CC02',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: TodayTypography.bricolageBold,
    color: '#FFFFFF',
  },
});
