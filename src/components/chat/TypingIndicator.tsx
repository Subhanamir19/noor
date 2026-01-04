import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

const DOT_SIZE = 8;
const ANIMATION_DURATION = 400;
const BOUNCE_HEIGHT = -8;

export function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animations = [
      createDotAnimation(dot1, 0),
      createDotAnimation(dot2, 150),
      createDotAnimation(dot3, 300),
    ];

    animations.forEach((anim) => anim.start());

    return () => {
      animations.forEach((anim) => anim.stop());
    };
  }, [dot1, dot2, dot3]);

  return (
    <View className="mb-3 flex-row justify-start">
      <View className="bg-white border-2 border-sage rounded-2xl px-4 py-3 flex-row items-center">
        <AnimatedDot style={{ transform: [{ translateY: dot1 }] }} />
        <AnimatedDot style={{ transform: [{ translateY: dot2 }] }} isMiddle />
        <AnimatedDot style={{ transform: [{ translateY: dot3 }] }} />
      </View>
    </View>
  );
}

interface AnimatedDotProps {
  style: { transform: { translateY: Animated.Value }[] };
  isMiddle?: boolean;
}

function AnimatedDot({ style, isMiddle }: AnimatedDotProps) {
  return (
    <Animated.View
      style={[
        {
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          backgroundColor: '#10B981',
          marginHorizontal: isMiddle ? 4 : 0,
        },
        style,
      ]}
    />
  );
}

function createDotAnimation(
  animatedValue: Animated.Value,
  delay: number
): Animated.CompositeAnimation {
  return Animated.loop(
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(animatedValue, {
        toValue: BOUNCE_HEIGHT,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ])
  );
}
