import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import type { CharacterTree, TreeState } from '@/types/models';
import { getTraitById } from '@/data/characterScenarios';
import { calculateTreeState } from '@/store/characterStore';

interface Props {
  tree: CharacterTree;
  onPress?: () => void;
}

const TREE_VISUALS: Record<TreeState, { emoji: string; bgColor: string; borderColor: string }> = {
  thriving: { emoji: '🌳', bgColor: '#E8F5E9', borderColor: '#4CAF50' },
  growing: { emoji: '🌱', bgColor: '#FFF8E1', borderColor: '#FFC107' },
  needs_attention: { emoji: '🥀', bgColor: '#FFF3E0', borderColor: '#FF9800' },
  wilting: { emoji: '🍂', bgColor: '#FFEBEE', borderColor: '#F44336' },
};

const LEVEL_INDICATORS = ['○', '◐', '●'];

export function TreeVisual({ tree, onPress }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const wobbleAnim = useRef(new Animated.Value(0)).current;

  const trait = getTraitById(tree.trait_id);
  const treeState = calculateTreeState(tree);
  const visual = TREE_VISUALS[treeState];

  // Subtle idle animation for thriving trees
  useEffect(() => {
    if (treeState === 'thriving') {
      const wobble = Animated.loop(
        Animated.sequence([
          Animated.timing(wobbleAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(wobbleAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      wobble.start();
      return () => wobble.stop();
    }
  }, [treeState, wobbleAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
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

  const wobbleRotate = wobbleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-2deg', '2deg'],
  });

  // Level progress (1-10, show as filled circles)
  const levelProgress = Math.min(tree.level, 10);
  const progressDots = [];
  for (let i = 0; i < 3; i++) {
    const threshold = Math.ceil((i + 1) * 3.33);
    if (levelProgress >= threshold) {
      progressDots.push(LEVEL_INDICATORS[2]); // filled
    } else if (levelProgress >= threshold - 2) {
      progressDots.push(LEVEL_INDICATORS[1]); // half
    } else {
      progressDots.push(LEVEL_INDICATORS[0]); // empty
    }
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: visual.bgColor,
            borderColor: visual.borderColor,
            transform: [
              { scale: scaleAnim },
              { rotate: treeState === 'thriving' ? wobbleRotate : '0deg' },
            ],
          },
        ]}
      >
        {/* Tree emoji */}
        <Text style={styles.treeEmoji}>{visual.emoji}</Text>

        {/* Trait emoji badge */}
        <View style={styles.traitBadge}>
          <Text style={styles.traitEmoji}>{trait?.emoji || '🌟'}</Text>
        </View>

        {/* Trait name */}
        <Text style={styles.traitName} numberOfLines={1}>
          {trait?.name || 'Unknown'}
        </Text>

        {/* Level indicator */}
        <View style={styles.levelContainer}>
          <Text style={styles.levelDots}>{progressDots.join(' ')}</Text>
          <Text style={styles.levelText}>Lv.{tree.level}</Text>
        </View>

        {/* XP progress bar */}
        <View style={styles.xpBarContainer}>
          <View
            style={[
              styles.xpBarFill,
              {
                width: `${(tree.current_xp % 100)}%`,
                backgroundColor: visual.borderColor,
              },
            ]}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 130,
    borderRadius: 16,
    borderWidth: 2,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },
  treeEmoji: {
    fontSize: 36,
    marginBottom: 4,
  },
  traitBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  traitEmoji: {
    fontSize: 12,
  },
  traitName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1A5F4A',
    textAlign: 'center',
    marginBottom: 4,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  levelDots: {
    fontSize: 8,
    color: '#78716C',
  },
  levelText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#78716C',
  },
  xpBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginTop: 4,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    borderRadius: 2,
  },
});
