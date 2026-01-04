import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

interface Props {
  totalTraitsTaught: number;
  currentCycle: number;
  currentDayInCycle: number;
  traitMastery: Record<string, number>;
}

export const ProgressSummary: React.FC<Props> = ({
  totalTraitsTaught,
  currentCycle,
  currentDayInCycle,
  traitMastery,
}) => {
  const masteryCount = Object.keys(traitMastery).length;
  const averageMastery =
    masteryCount > 0
      ? Math.round(Object.values(traitMastery).reduce((sum, val) => sum + val, 0) / masteryCount)
      : 0;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📊 Your Development Journey</Text>

      <View style={styles.statRow}>
        <Text style={styles.label}>Traits Taught:</Text>
        <Text style={styles.value}>{totalTraitsTaught}</Text>
      </View>

      <View style={styles.statRow}>
        <Text style={styles.label}>Current Cycle:</Text>
        <Text style={styles.value}>
          Cycle {currentCycle + 1}, Day {currentDayInCycle}
        </Text>
      </View>

      <View style={styles.statRow}>
        <Text style={styles.label}>Traits Introduced:</Text>
        <Text style={styles.value}>{masteryCount} of 30</Text>
      </View>

      <View style={[styles.statRow, styles.lastRow]}>
        <Text style={styles.label}>Average Mastery:</Text>
        <Text style={styles.value}>{averageMastery}%</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${(masteryCount / 30) * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>{masteryCount}/30 traits discovered</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: COLORS.EMERALD,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEAL,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  lastRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: COLORS.WARM_GRAY,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.EMERALD,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(167, 201, 162, 0.3)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.EMERALD,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.WARM_GRAY,
    textAlign: 'center',
  },
});
