import React, { useRef, useEffect } from 'react';
import {
  Pressable,
  Text,
  Image,
  Animated,
  StyleSheet,
  View,
  ImageSourcePropType,
} from 'react-native';

interface StruggleCardProps {
  struggle: {
    id: string;
    icon: ImageSourcePropType;
    label: string;
  };
  selected: boolean;
  onPress: () => void;
  shakeAnimation?: Animated.Value;
}

export function StruggleCard({
  struggle,
  selected,
  onPress,
  shakeAnimation,
}: StruggleCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: selected ? 1.03 : 1,
      useNativeDriver: true,
    }).start();
  }, [selected, scaleAnim]);

  // Build transform array - only include shakeAnimation if provided
  const transforms: Animated.WithAnimatedValue<{ scale: Animated.Value } | { translateX: Animated.Value }>[] = [
    { scale: scaleAnim },
  ];

  if (shakeAnimation) {
    transforms.push({ translateX: shakeAnimation });
  }

  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <Animated.View
        style={[
          styles.card,
          selected && styles.cardSelected,
          { transform: transforms },
        ]}
      >
        {selected && (
          <View style={styles.checkmarkContainer}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        )}
        <Image source={struggle.icon} style={styles.icon} resizeMode="contain" />
        <Text
          style={[styles.label, selected && styles.labelSelected]}
          numberOfLines={2}
        >
          {struggle.label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '48%',
    marginBottom: 12,
  },
  card: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    minHeight: 120,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
  cardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#4B5563',
    textAlign: 'center',
  },
  labelSelected: {
    color: '#6366F1',
    fontFamily: 'Poppins-SemiBold',
  },
});
