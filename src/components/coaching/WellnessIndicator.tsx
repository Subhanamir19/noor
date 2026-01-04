import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface Props {
  score: number; // 0-100
  tips: string[];
  onPress?: () => void;
}

function getScoreColor(score: number): string {
  if (score >= 70) return '#4CAF50';
  if (score >= 50) return '#FFC107';
  if (score >= 30) return '#FF9800';
  return '#F44336';
}

function getScoreLabel(score: number): string {
  if (score >= 70) return 'Thriving';
  if (score >= 50) return 'Growing';
  if (score >= 30) return 'Needs Care';
  return 'Struggling';
}

function getScoreEmoji(score: number): string {
  if (score >= 70) return '🌳';
  if (score >= 50) return '🌱';
  if (score >= 30) return '🌿';
  return '🍂';
}

export function WellnessIndicator({ score, tips, onPress }: Props) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const emoji = getScoreEmoji(score);

  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.circleContainer}>
        <Svg width={size} height={size} style={styles.svg}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E5E5"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View style={styles.scoreContent}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={[styles.score, { color }]}>{score}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={[styles.label, { color }]}>{label}</Text>
        <Text style={styles.subtitle}>Family Wellness</Text>

        {tips.length > 0 && (
          <View style={styles.tipContainer}>
            <Text style={styles.tipText} numberOfLines={2}>
              💡 {tips[0]}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

export function WellnessCompact({ score }: { score: number }) {
  const color = getScoreColor(score);
  const emoji = getScoreEmoji(score);

  return (
    <View style={styles.compactContainer}>
      <Text style={styles.compactEmoji}>{emoji}</Text>
      <Text style={[styles.compactScore, { color }]}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  circleContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  scoreContent: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 20,
    marginBottom: -4,
  },
  score: {
    fontSize: 18,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    color: '#78716C',
    marginBottom: 8,
  },
  tipContainer: {
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tipText: {
    fontSize: 12,
    color: '#795548',
    lineHeight: 16,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  compactEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  compactScore: {
    fontSize: 14,
    fontWeight: '700',
  },
});
