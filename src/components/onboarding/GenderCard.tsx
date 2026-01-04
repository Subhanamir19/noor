import React, { useRef } from 'react';
import {
  Pressable,
  Text,
  Image,
  Animated,
  StyleSheet,
  View,
  ImageSourcePropType,
} from 'react-native';
import * as Haptics from 'expo-haptics';

interface GenderCardProps {
  gender: 'boy' | 'girl';
  icon: ImageSourcePropType;
  selected: boolean;
  onPress: () => void;
}

export function GenderCard({ gender, icon, selected, onPress }: GenderCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onPress();
  };

  return (
    <Pressable onPress={handlePress} style={styles.pressable}>
      <Animated.View
        style={[
          styles.card,
          selected && styles.cardSelected,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {selected && (
          <View style={styles.checkmarkContainer}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        )}
        <Image source={icon} style={styles.icon} resizeMode="contain" />
        <Text style={[styles.label, selected && styles.labelSelected]}>
          {gender === 'boy' ? 'Boy' : 'Girl'}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minHeight: 140,
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
    width: 64,
    height: 64,
    marginBottom: 8,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#4B5563',
  },
  labelSelected: {
    color: '#6366F1',
  },
});
