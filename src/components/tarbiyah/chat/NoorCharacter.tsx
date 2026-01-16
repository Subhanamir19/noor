/**
 * NoorCharacter - Animated Noor character for chat mode
 *
 * Displays the Noor character with a subtle breathing animation.
 * Positioned at bottom-right of the screen, facing the speech bubble.
 */

import React, { memo, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { TarbiyahChatTokens } from '../../../constants/tarbiyahTokens';

interface NoorCharacterProps {
  /** Whether the text is currently animating (typing) */
  isTyping?: boolean;
}

function NoorCharacterComponent({ isTyping: _isTyping = false }: NoorCharacterProps) {
  const scale = useSharedValue(1);

  // Gentle breathing animation - continuous subtle pulse
  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.02, {
          duration: TarbiyahChatTokens.animation.breathingDuration / 2,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(1.0, {
          duration: TarbiyahChatTokens.animation.breathingDuration / 2,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1, // Infinite repeat
      false // Don't reverse
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image
        source={require('../../../../assets/noor-for-tarbiyah-feature.png')}
        style={styles.character}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: TarbiyahChatTokens.character.bottomOffset,
    right: TarbiyahChatTokens.character.rightOffset,
    width: TarbiyahChatTokens.character.width,
    height: TarbiyahChatTokens.character.height,
  },
  character: {
    width: '100%',
    height: '100%',
  },
});

export const NoorCharacter = memo(NoorCharacterComponent);
