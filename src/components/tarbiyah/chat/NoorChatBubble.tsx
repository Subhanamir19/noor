/**
 * NoorChatBubble - Speech bubble with animated text for Tarbiyah chat mode
 *
 * Displays the speech bubble PNG with lesson content inside.
 * Handles content parsing, adaptive sizing, and typewriter animation.
 */

import React, { memo, useMemo, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import {
  TarbiyahColors,
  TarbiyahTypography,
  TarbiyahSpacing,
  TarbiyahChatTokens,
  type TarbiyahStepType,
} from '../../../constants/tarbiyahTokens';
import type { TarbiyahStep } from '../../../data/tarbiyahLessons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Content segment types for different styling
type ContentSegmentType =
  | 'arabic'
  | 'translation'
  | 'reference'
  | 'quote'
  | 'numbered'
  | 'body'
  | 'highlight';

interface ContentSegment {
  type: ContentSegmentType;
  text: string;
}

interface NoorChatBubbleProps {
  step: TarbiyahStep;
  stepType: TarbiyahStepType;
  onAnimationComplete?: () => void;
  /** Key to force re-render and restart animation */
  animationKey?: number;
}

/**
 * Parse step content into styled segments
 */
function parseStepContent(
  step: TarbiyahStep,
  stepType: TarbiyahStepType
): ContentSegment[] {
  const segments: ContentSegment[] = [];

  // Add Arabic text for Sunnah step (displayed first)
  if (stepType === 'sunnah' && step.arabicText) {
    segments.push({ type: 'arabic', text: step.arabicText });
    if (step.arabicTranslation) {
      segments.push({ type: 'translation', text: step.arabicTranslation });
    }
    if (step.reference) {
      segments.push({ type: 'reference', text: `— ${step.reference}` });
    }
  }

  // Parse main content into paragraphs
  const paragraphs = step.content.split('\n\n').filter((p) => p.trim());

  paragraphs.forEach((para) => {
    const trimmed = para.trim();

    // Check if it's a quote (starts with quotation marks)
    if (trimmed.startsWith('"') || trimmed.startsWith('"')) {
      segments.push({ type: 'quote', text: trimmed });
    }
    // Check if it's a numbered list
    else if (/^\d+\./.test(trimmed)) {
      segments.push({ type: 'numbered', text: trimmed });
    }
    // Regular body text
    else {
      segments.push({ type: 'body', text: trimmed });
    }
  });

  return segments;
}

/**
 * Calculate total content length for adaptive sizing
 */
function calculateContentLength(segments: ContentSegment[]): number {
  return segments.reduce((total, seg) => total + seg.text.length, 0);
}

/**
 * Get adaptive text style based on content length
 */
function getAdaptiveTextStyle(contentLength: number) {
  if (contentLength < 300) {
    return {
      fontSize: TarbiyahChatTokens.text.short.fontSize,
      lineHeight: TarbiyahChatTokens.text.short.lineHeight,
      padding: TarbiyahChatTokens.bubble.padding.short,
    };
  } else if (contentLength > 500) {
    return {
      fontSize: TarbiyahChatTokens.text.long.fontSize,
      lineHeight: TarbiyahChatTokens.text.long.lineHeight,
      padding: TarbiyahChatTokens.bubble.padding.long,
    };
  }
  return {
    fontSize: TarbiyahChatTokens.text.medium.fontSize,
    lineHeight: TarbiyahChatTokens.text.medium.lineHeight,
    padding: TarbiyahChatTokens.bubble.padding.medium,
  };
}

/**
 * TypewriterSegment - Animates a single text segment
 */
interface TypewriterSegmentProps {
  text: string;
  style: object;
  delay: number;
  speed: number;
  onComplete?: () => void;
}

function TypewriterSegment({
  text,
  style,
  delay,
  speed,
  onComplete,
}: TypewriterSegmentProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    let index = 0;
    let timeoutId: NodeJS.Timeout;
    const baseInterval = 1000 / speed;

    const startAnimation = () => {
      const animate = () => {
        if (index < text.length) {
          const char = text[index];
          index++;
          setVisibleCount(index);

          // Variable timing for natural feel
          let nextInterval = baseInterval;

          if (['.', '!', '?'].includes(char)) {
            nextInterval = baseInterval * 6;
          } else if ([',', ';', ':'].includes(char)) {
            nextInterval = baseInterval * 3;
          } else if (char === ' ') {
            nextInterval = baseInterval * 1.2;
          } else if (char === '\n') {
            nextInterval = baseInterval * 4;
          }

          // Add slight randomness (±20%)
          const variance = nextInterval * 0.2;
          nextInterval += (Math.random() - 0.5) * variance;

          timeoutId = setTimeout(animate, nextInterval);
        } else {
          onComplete?.();
        }
      };
      animate();
    };

    const delayTimeout = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(delayTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, delay, speed, onComplete]);

  return (
    <View>
      {/* Invisible text for stable layout */}
      <Text style={[style, styles.invisible]}>{text}</Text>
      {/* Visible animated text */}
      <Text style={[style, styles.overlayText]}>{text.slice(0, visibleCount)}</Text>
    </View>
  );
}

function NoorChatBubbleComponent({
  step,
  stepType,
  onAnimationComplete,
  animationKey = 0,
}: NoorChatBubbleProps) {
  // Parse content into segments
  const segments = useMemo(
    () => parseStepContent(step, stepType),
    [step, stepType]
  );

  // Calculate content length and adaptive styles
  const contentLength = useMemo(
    () => calculateContentLength(segments),
    [segments]
  );
  const adaptiveStyle = useMemo(
    () => getAdaptiveTextStyle(contentLength),
    [contentLength]
  );

  // Track which segments have completed animation
  const [completedSegments, setCompletedSegments] = useState<number[]>([]);

  // Reset completed segments when animation key changes (new step)
  useEffect(() => {
    setCompletedSegments([]);
  }, [animationKey]);

  // Handle segment completion
  const handleSegmentComplete = useCallback(
    (index: number) => {
      setCompletedSegments((prev) => {
        const updated = [...prev, index];
        // Check if all segments are complete
        if (updated.length === segments.length) {
          onAnimationComplete?.();
        }
        return updated;
      });
    },
    [segments.length, onAnimationComplete]
  );

  // Calculate animation delays for each segment
  const getSegmentDelay = (index: number): number => {
    // Base delay before first segment starts
    const baseDelay = 400;
    // Estimate previous segments duration (rough: 20ms per char)
    let cumulativeDelay = baseDelay;
    for (let i = 0; i < index; i++) {
      const prevSegment = segments[i];
      // Estimate based on character count and speed
      const charDuration = prevSegment.text.length * (1000 / TarbiyahChatTokens.animation.typewriterSpeed);
      cumulativeDelay += charDuration + 200; // + gap between segments
    }
    return cumulativeDelay;
  };

  // Get style for each segment type
  const getSegmentStyle = (type: ContentSegmentType) => {
    const baseStyle = {
      fontFamily: TarbiyahTypography.fontBody,
      fontSize: adaptiveStyle.fontSize,
      lineHeight: adaptiveStyle.lineHeight,
      color: TarbiyahChatTokens.text.color,
    };

    switch (type) {
      case 'arabic':
        return {
          ...baseStyle,
          fontFamily: TarbiyahTypography.fontArabic,
          fontSize: TarbiyahTypography.arabicBody.fontSize,
          lineHeight: TarbiyahTypography.arabicBody.lineHeight,
          color: TarbiyahChatTokens.text.arabicColor,
          textAlign: 'center' as const,
          writingDirection: 'rtl' as const,
          marginBottom: TarbiyahSpacing.space8,
        };
      case 'translation':
        return {
          ...baseStyle,
          fontStyle: 'italic' as const,
          fontWeight: '500' as const,
          textAlign: 'center' as const,
          marginBottom: TarbiyahSpacing.space4,
        };
      case 'reference':
        return {
          ...baseStyle,
          fontSize: adaptiveStyle.fontSize - 2,
          color: '#8A847A',
          textAlign: 'center' as const,
          marginBottom: TarbiyahSpacing.space16,
        };
      case 'quote':
        return {
          ...baseStyle,
          fontStyle: 'italic' as const,
          fontWeight: '500' as const,
          color: '#5C5750',
        };
      case 'numbered':
        return {
          ...baseStyle,
          fontWeight: '500' as const,
        };
      case 'highlight':
        return {
          ...baseStyle,
          fontWeight: '600' as const,
          color: TarbiyahColors.accentPrimary,
        };
      default:
        return baseStyle;
    }
  };

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

  // Calculate max height for bubble
  const maxBubbleHeight = SCREEN_HEIGHT * TarbiyahChatTokens.bubble.maxHeightRatio;

  return (
    <Animated.View
      key={animationKey}
      entering={FadeIn.duration(200)}
      style={[styles.container, bubbleAnimatedStyle]}
    >
      <ImageBackground
        source={require('../../../../assets/chat-component-for-tarbiayh-feature.png')}
        style={[
          styles.bubble,
          {
            minHeight: TarbiyahChatTokens.bubble.minHeight,
            maxHeight: maxBubbleHeight,
          },
        ]}
        imageStyle={styles.bubbleImage}
        resizeMode="stretch"
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={[
            styles.contentContainer,
            { padding: adaptiveStyle.padding },
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {segments.map((segment, index) => (
            <View key={`${animationKey}-${index}`} style={styles.segmentContainer}>
              <TypewriterSegment
                text={segment.text}
                style={getSegmentStyle(segment.type)}
                delay={getSegmentDelay(index)}
                speed={TarbiyahChatTokens.animation.typewriterSpeed}
                onComplete={() => handleSegmentComplete(index)}
              />
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: TarbiyahSpacing.screenGutter,
    marginRight: TarbiyahSpacing.screenGutter + 60, // Make room for Noor character
  },
  bubble: {
    flex: 1,
  },
  bubbleImage: {
    borderRadius: TarbiyahChatTokens.bubble.borderRadius,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  segmentContainer: {
    marginBottom: TarbiyahSpacing.space12,
  },
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

export const NoorChatBubble = memo(NoorChatBubbleComponent);
