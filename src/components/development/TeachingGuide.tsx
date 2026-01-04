import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

interface Props {
  traitName: string;
  ageGroup: 'baby' | 'toddler' | 'child';
}

export const TeachingGuide: React.FC<Props> = ({ traitName, ageGroup }) => {
  const getGuidance = () => {
    if (ageGroup === 'baby') {
      return {
        title: 'Teaching Babies (0-2 years)',
        emoji: '👶',
        points: [
          'Model the trait through your own actions - babies learn by watching',
          'Use simple, repetitive language when demonstrating',
          'Create a loving, consistent environment',
          "Don't expect them to understand yet - you're planting seeds",
        ],
      };
    } else if (ageGroup === 'toddler') {
      return {
        title: 'Teaching Toddlers (2-4 years)',
        emoji: '🧒',
        points: [
          'Use short, clear explanations: "We are kind to others"',
          'Demonstrate through play and stories',
          'Praise when you see the trait: "MashaAllah! You showed patience!"',
          "Be patient - they're still learning to control emotions",
        ],
      };
    } else {
      return {
        title: 'Teaching Children (5+ years)',
        emoji: '👧',
        points: [
          'Explain the "why" behind the trait using Islamic wisdom',
          'Use stories of Prophets and companions as examples',
          'Encourage them to practice consciously',
          'Discuss how it feels when they embody the trait',
        ],
      };
    }
  };

  const guidance = getGuidance();

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.emoji}>{guidance.emoji}</Text>
        <Text style={styles.title}>How to Teach {traitName}</Text>
      </View>
      <Text style={styles.subtitle}>{guidance.title}</Text>
      {guidance.points.map((point, index) => (
        <View key={index} style={styles.pointRow}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.pointText}>{point}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(167, 201, 162, 0.2)',
    borderWidth: 2,
    borderColor: COLORS.EMERALD,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEAL,
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.TEAL,
    marginBottom: 16,
  },
  pointRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bullet: {
    color: COLORS.EMERALD,
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointText: {
    fontSize: 15,
    color: COLORS.TEAL,
    flex: 1,
    lineHeight: 22,
  },
});
