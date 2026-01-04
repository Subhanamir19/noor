import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { DailyTrait, CharacterTrait } from '@/types/models';
import { format } from 'date-fns';
import { COLORS } from '@/constants/colors';

interface Props {
  dailyTrait: DailyTrait;
  trait: CharacterTrait;
  isToday: boolean;
  onPress: () => void;
}

export const DayCard: React.FC<Props> = ({ dailyTrait, trait, isToday, onPress }) => {
  const dayLabel = isToday ? 'TODAY' : format(new Date(dailyTrait.trait_date), 'EEE, MMM d');

  const getCardStyle = () => {
    if (dailyTrait.completed) {
      return styles.completedCard;
    }
    if (isToday) {
      return styles.todayCard;
    }
    return styles.defaultCard;
  };

  const getResourceLabel = () => {
    switch (dailyTrait.resource_type) {
      case 'hadith':
        return '📜 Hadith';
      case 'quran':
        return '📖 Quran';
      case 'dua':
        return '🤲 Dua';
      default:
        return dailyTrait.resource_type;
    }
  };

  return (
    <TouchableOpacity style={[styles.card, getCardStyle()]} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.textContent}>
          <Text style={styles.dayLabel}>
            {dayLabel} • Day {dailyTrait.day_number}
          </Text>
          <View style={styles.titleRow}>
            <Text style={styles.traitName}>{trait.name}</Text>
            {trait.arabicName && <Text style={styles.arabicName}> ({trait.arabicName})</Text>}
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {trait.description}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          {dailyTrait.completed ? (
            <View style={styles.completedIcon}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          ) : isToday ? (
            <View style={styles.todayIcon}>
              <Text style={styles.arrow}>→</Text>
            </View>
          ) : (
            <View style={styles.pendingIcon}>
              <Text style={styles.dot}>•</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.tagsRow}>
        <View style={styles.resourceTag}>
          <Text style={styles.tagText}>{getResourceLabel()}</Text>
        </View>
        <View style={styles.categoryTag}>
          <Text style={styles.tagText}>{trait.category.replace('_', ' ')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
  },
  defaultCard: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.SAGE_GREEN,
  },
  todayCard: {
    backgroundColor: 'rgba(217, 174, 94, 0.1)',
    borderColor: COLORS.GOLD,
  },
  completedCard: {
    backgroundColor: 'rgba(167, 201, 162, 0.3)',
    borderColor: COLORS.EMERALD,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textContent: {
    flex: 1,
  },
  dayLabel: {
    fontSize: 12,
    color: COLORS.WARM_GRAY,
    fontWeight: '500',
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  traitName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEAL,
  },
  arabicName: {
    fontSize: 14,
    color: COLORS.WARM_GRAY,
  },
  description: {
    fontSize: 14,
    color: COLORS.WARM_GRAY,
    marginTop: 4,
  },
  statusContainer: {
    marginLeft: 12,
  },
  completedIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.EMERALD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.WARM_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dot: {
    color: COLORS.WARM_GRAY,
    fontSize: 20,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  resourceTag: {
    backgroundColor: 'rgba(227, 183, 160, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  categoryTag: {
    backgroundColor: 'rgba(167, 201, 162, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.TEAL,
    textTransform: 'capitalize',
  },
});
