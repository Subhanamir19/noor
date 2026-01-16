/**
 * NoorChatBubble - Speech bubble with animated text for Tarbiyah chat mode
 *
 * Production-grade implementation with View-based bubble and SVG tail.
 * No PNG stretching - all rendered with code for pixel-perfect consistency.
 */

import React, { memo, useMemo, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import {
  TarbiyahTypography,
  TarbiyahSpacing,
  TarbiyahChatTokens,
  type TarbiyahStepType,
} from '../../../constants/tarbiyahTokens';
import type { TarbiyahStep } from '../../../data/tarbiyahLessons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Production-grade constants matching PNG exactly
const BUBBLE_BG = '#FFFFFF';
const BUBBLE_BORDER = '#2B2B2B';
const BORDER_WIDTH = 3;
const BORDER_RADIUS = 20;

interface NoorChatBubbleProps {
  step: TarbiyahStep;
  stepType: TarbiyahStepType;
  onAnimationComplete?: () => void;
  animationKey?: number;
}

/**
 * Combine all content into a single string for display
 */
function getDisplayContent(step: TarbiyahStep, stepType: TarbiyahStepType): string {
  let content = '';

  // Add Arabic text for Sunnah step
  if (stepType === 'sunnah' && step.arabicText) {
    content += step.arabicText + '\n\n';
    if (step.arabicTranslation) {
      content += `"${step.arabicTranslation}"\n\n`;
    }
    if (step.reference) {
      content += `— ${step.reference}\n\n`;
    }
  }

  // Add main content
  content += step.content;

  return content.trim();
}

/**
 * Calculate adaptive styling based on content length
 */
function getAdaptiveStyle(contentLength: number) {
  if (contentLength < 300) {
    return {
      fontSize: TarbiyahChatTokens.text.short.fontSize,
      lineHeight: TarbiyahChatTokens.text.short.lineHeight,
    };
  } else if (contentLength > 500) {
    return {
      fontSize: TarbiyahChatTokens.text.long.fontSize,
      lineHeight: TarbiyahChatTokens.text.long.lineHeight,
    };
  }
  return {
    fontSize: TarbiyahChatTokens.text.medium.fontSize,
    lineHeight: TarbiyahChatTokens.text.medium.lineHeight,
  };
}

function NoorChatBubbleComponent({
  step,
  stepType,
  onAnimationComplete,
  animationKey = 0,
}: NoorChatBubbleProps) {
  // Get full content to display
  const fullContent = useMemo(
    () => getDisplayContent(step, stepType),
    [step, stepType]
  );

  // Get adaptive styling
  const adaptiveStyle = useMemo(
    () => getAdaptiveStyle(fullContent.length),
    [fullContent.length]
  );

  // Typewriter state
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  // Reset and start animation when step changes
  useEffect(() => {
    // Clear any existing animation
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    // Reset state
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;

    const speed = TarbiyahChatTokens.animation.typewriterSpeed;
    const baseInterval = 1000 / speed;

    const animate = () => {
      if (indexRef.current < fullContent.length) {
        const char = fullContent[indexRef.current];
        indexRef.current++;
        setDisplayedText(fullContent.slice(0, indexRef.current));

        // Variable timing for natural feel
        let nextInterval = baseInterval;
        if (['.', '!', '?'].includes(char)) {
          nextInterval = baseInterval * 5;
        } else if ([',', ';', ':'].includes(char)) {
          nextInterval = baseInterval * 2.5;
        } else if (char === '\n') {
          nextInterval = baseInterval * 3;
        }

        animationRef.current = setTimeout(animate, nextInterval);
      } else {
        setIsComplete(true);
        onAnimationComplete?.();
      }
    };

    // Start with a small delay
    animationRef.current = setTimeout(animate, 300);

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [fullContent, animationKey, onAnimationComplete]);

  // Bubble scale animation
  const bubbleScale = useSharedValue(0.95);

  useEffect(() => {
    bubbleScale.value = withSpring(1, {
      damping: 15,
      stiffness: 200,
    });
  }, [animationKey, bubbleScale]);

  const bubbleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bubbleScale.value }],
  }));

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      style={[styles.container, bubbleAnimatedStyle]}
    >
      <View style={styles.bubbleWrapper}>
        {/* Main bubble body - View with border */}
        <View style={styles.bubble}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text
              style={[
                styles.contentText,
                {
                  fontSize: adaptiveStyle.fontSize,
                  lineHeight: adaptiveStyle.lineHeight,
                },
              ]}
            >
              {displayedText}
              {!isComplete && <Text style={styles.cursor}>|</Text>}
            </Text>
          </ScrollView>
        </View>

        {/* SVG Tail - isosceles triangle pointing downward, centered under bubble */}
        <View style={styles.tailContainer}>
          <Svg width="40" height="30" viewBox="0 0 40 30" style={styles.tailSvg}>
            {/* Simple isosceles triangle: top-left to bottom-center to top-right */}
            <Path
              d="M 0 0 L 20 28 L 40 0 Z"
              fill={BUBBLE_BG}
            />
            {/* Border strokes on the two visible edges (not top edge which overlaps bubble) */}
            <Path
              d="M 0 0 L 20 28 L 40 0"
              fill="none"
              stroke={BUBBLE_BORDER}
              strokeWidth={BORDER_WIDTH}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: TarbiyahSpacing.screenGutter,
    marginRight: TarbiyahSpacing.screenGutter + 40, // Room for Noor
    maxHeight: SCREEN_HEIGHT * 0.5,
    minHeight: 180,
  },
  bubbleWrapper: {
    flex: 1,
    position: 'relative',
  },
  bubble: {
    flex: 1,
    backgroundColor: BUBBLE_BG,
    borderWidth: BORDER_WIDTH,
    borderColor: BUBBLE_BORDER,
    borderRadius: BORDER_RADIUS,
    padding: 22,
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentText: {
    fontFamily: TarbiyahTypography.fontBody,
    color: TarbiyahChatTokens.text.color,
  },
  cursor: {
    color: TarbiyahChatTokens.text.color,
    opacity: 0.5,
  },
  // Position tail centered horizontally, overlapping bottom border
  tailContainer: {
    position: 'absolute',
    bottom: -27, // Overlap the border slightly
    alignSelf: 'center',
    left: '50%',
    marginLeft: -20, // Half of width (40/2) to center
    zIndex: 1,
  },
  tailSvg: {
    overflow: 'visible',
  },
});

export const NoorChatBubble = memo(NoorChatBubbleComponent);
