/**
 * TypewriterText - Animated text reveal effect
 *
 * Uses a stable layout approach - the full text is always rendered
 * but revealed progressively using character-by-character opacity.
 * This prevents layout shifts during animation.
 */

import React, { useEffect, useState, useRef, memo, useMemo } from 'react';
import { Text, View, type TextStyle, type StyleProp, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface TypewriterTextProps {
  text: string;
  style?: StyleProp<TextStyle>;
  /** Delay before starting animation in ms */
  delay?: number;
  /** Speed - characters per second (default: 60) */
  speed?: number;
  /** Called when animation completes */
  onComplete?: () => void;
  /** If true, shows all text immediately */
  skipAnimation?: boolean;
}

function TypewriterTextComponent({
  text,
  style,
  delay = 0,
  speed = 60,
  onComplete,
  skipAnimation = false,
}: TypewriterTextProps) {
  const [visibleCount, setVisibleCount] = useState(skipAnimation ? text.length : 0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  // Calculate interval based on speed (chars per second)
  const baseInterval = 1000 / speed;

  useEffect(() => {
    if (skipAnimation) {
      setVisibleCount(text.length);
      onComplete?.();
      return;
    }

    // Reset on text change
    setVisibleCount(0);
    indexRef.current = 0;

    const startAnimation = () => {
      const animate = () => {
        if (indexRef.current < text.length) {
          const char = text[indexRef.current];
          indexRef.current++;
          setVisibleCount(indexRef.current);

          // Variable timing for natural feel
          let nextInterval = baseInterval;

          // Pause longer after punctuation
          if (['.', '!', '?'].includes(char)) {
            nextInterval = baseInterval * 6;
          } else if ([',', ';', ':'].includes(char)) {
            nextInterval = baseInterval * 3;
          } else if (char === ' ') {
            // Slight pause at word boundaries
            nextInterval = baseInterval * 1.2;
          } else if (char === '\n') {
            nextInterval = baseInterval * 4;
          }

          // Add slight randomness for natural feel (±20%)
          const variance = nextInterval * 0.2;
          nextInterval += (Math.random() - 0.5) * variance;

          timeoutRef.current = setTimeout(animate, nextInterval);
        } else {
          onComplete?.();
        }
      };

      animate();
    };

    // Initial delay
    const delayTimeout = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(delayTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, delay, baseInterval, skipAnimation, onComplete]);

  // Render with stable layout - invisible text for layout, visible for display
  return (
    <View>
      {/* Invisible text for stable layout measurement */}
      <Text style={[style, styles.invisible]}>{text}</Text>
      {/* Visible text overlay */}
      <Text style={[style, styles.overlayText]}>
        {text.slice(0, visibleCount)}
      </Text>
    </View>
  );
}

export const TypewriterText = memo(TypewriterTextComponent);

/**
 * TypewriterTextBlock - Animated text for larger blocks
 *
 * Reveals text word by word instead of character by character
 * for better readability on longer content.
 */

interface TypewriterTextBlockProps {
  text: string;
  style?: StyleProp<TextStyle>;
  delay?: number;
  /** Words per second (default: 12) */
  wordsPerSecond?: number;
  onComplete?: () => void;
  skipAnimation?: boolean;
}

function TypewriterTextBlockComponent({
  text,
  style,
  delay = 0,
  wordsPerSecond = 12,
  onComplete,
  skipAnimation = false,
}: TypewriterTextBlockProps) {
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  const words = useMemo(() => text.split(/(\s+)/), [text]); // Keep whitespace
  const baseInterval = 1000 / wordsPerSecond;

  useEffect(() => {
    if (skipAnimation) {
      setVisibleWordCount(words.length);
      onComplete?.();
      return;
    }

    setVisibleWordCount(0);
    indexRef.current = 0;

    const startAnimation = () => {
      const animate = () => {
        if (indexRef.current < words.length) {
          const word = words[indexRef.current];
          indexRef.current++;
          setVisibleWordCount(indexRef.current);

          let nextInterval = baseInterval;

          // Longer pause after sentence-ending punctuation
          if (word.match(/[.!?]$/)) {
            nextInterval = baseInterval * 4;
          } else if (word.match(/[,;:]$/)) {
            nextInterval = baseInterval * 2;
          }

          // Add slight randomness
          const variance = nextInterval * 0.15;
          nextInterval += (Math.random() - 0.5) * variance;

          timeoutRef.current = setTimeout(animate, nextInterval);
        } else {
          onComplete?.();
        }
      };

      animate();
    };

    const delayTimeout = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(delayTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, delay, baseInterval, words, skipAnimation, onComplete]);

  const visibleText = words.slice(0, visibleWordCount).join('');

  return (
    <View>
      {/* Invisible text for stable layout measurement */}
      <Text style={[style, styles.invisible]}>{text}</Text>
      {/* Visible text overlay */}
      <Text style={[style, styles.overlayText]}>{visibleText}</Text>
    </View>
  );
}

export const TypewriterTextBlock = memo(TypewriterTextBlockComponent);

/**
 * FadeInText - Simple fade in for titles
 */

interface FadeInTextProps {
  text: string;
  style?: StyleProp<TextStyle>;
  delay?: number;
  duration?: number;
}

function FadeInTextComponent({
  text,
  style,
  delay = 0,
  duration = 400,
}: FadeInTextProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(8);

  useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(1, {
        duration,
        easing: Easing.out(Easing.ease),
      });
      translateY.value = withTiming(0, {
        duration,
        easing: Easing.out(Easing.ease),
      });
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, duration, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.Text style={[style, animatedStyle]}>
      {text}
    </Animated.Text>
  );
}

export const FadeInText = memo(FadeInTextComponent);

const styles = StyleSheet.create({
  invisible: {
    opacity: 0,
  },
  overlayText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
