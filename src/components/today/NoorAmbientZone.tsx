import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, ResizeMode } from 'expo-av';

import { TodayColors, TodayRadii, TodaySpacing } from '@/constants/todayTokens';

const ZONE_HEIGHT = 180;
const FADE_HEIGHT = 40;

interface Props {
  completionPercentage?: number;
}

/**
 * NoorAmbientZone - Immersive character animation container
 *
 * Replaces hard-bordered rectangle with gradient-faded ambient window.
 * Creates feeling of looking into Noor's world rather than watching a video embed.
 */
function NoorAmbientZoneComponent({ completionPercentage = 0 }: Props) {
  return (
    <View style={styles.container}>
      {/* Video Layer */}
      <View style={styles.videoWrapper}>
        <Video
          source={require('../../../assets/ONBOARDING-ASSETS/animation-video.mp4')}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          isMuted
        />
      </View>

      {/* Top gradient fade (subtle) */}
      <LinearGradient
        colors={[TodayColors.bgApp, 'transparent']}
        style={styles.topFade}
        pointerEvents="none"
      />

      {/* Bottom gradient fade (seamless blend into content) */}
      <LinearGradient
        colors={['transparent', TodayColors.bgApp]}
        style={styles.bottomFade}
        pointerEvents="none"
      />

      {/* Side vignette gradients for softer edges */}
      <LinearGradient
        colors={[TodayColors.bgApp, 'transparent']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.15, y: 0.5 }}
        style={styles.leftFade}
        pointerEvents="none"
      />
      <LinearGradient
        colors={['transparent', TodayColors.bgApp]}
        start={{ x: 0.85, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.rightFade}
        pointerEvents="none"
      />
    </View>
  );
}

export const NoorAmbientZone = memo(NoorAmbientZoneComponent);

const styles = StyleSheet.create({
  container: {
    height: ZONE_HEIGHT,
    marginHorizontal: TodaySpacing[16],
    marginBottom: TodaySpacing[8],
    overflow: 'hidden',
    borderRadius: TodayRadii.xl,
  },
  videoWrapper: {
    flex: 1,
    backgroundColor: TodayColors.bgAmbient,
    borderRadius: TodayRadii.xl,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  topFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: FADE_HEIGHT / 2,
  },
  bottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: FADE_HEIGHT,
  },
  leftFade: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: FADE_HEIGHT,
  },
  rightFade: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: FADE_HEIGHT,
  },
});
