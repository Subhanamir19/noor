import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

const FAB_SIZE = 56;
const SHADOW_OFFSET = 4;

interface Props {
  onPress: () => void;
  pulse?: boolean;
}

export function QuickCaptureButton({ onPress, pulse = false }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Subtle pulse animation on mount
  useEffect(() => {
    if (!pulse) {
      pulseAnim.setValue(1);
      return;
    }
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulse, pulseAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {pulse && (
        <Animated.View style={[styles.pulseRing, { transform: [{ scale: pulseAnim }] }]} />
      )}
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          {/* Shadow layer */}
          <View style={styles.shadow} />
          {/* Main button */}
          <View style={styles.button}>
            <View style={styles.plusIcon}>
              <View style={styles.plusHorizontal} />
              <View style={styles.plusVertical} />
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 1000,
  },
  pulseRing: {
    position: 'absolute',
    width: FAB_SIZE + 16,
    height: FAB_SIZE + 16,
    borderRadius: (FAB_SIZE + 16) / 2,
    backgroundColor: 'rgba(88, 204, 2, 0.15)',
    top: -8,
    left: -8,
  },
  shadow: {
    position: 'absolute',
    top: SHADOW_OFFSET,
    left: 0,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: '#58A700',
  },
  button: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: '#58CC02',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusHorizontal: {
    position: 'absolute',
    width: 20,
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  plusVertical: {
    position: 'absolute',
    width: 4,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});
