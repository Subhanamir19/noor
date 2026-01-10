import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CORE_TRAITS } from '@/data/characterScenarios';
import { TodayTypography } from '@/constants/todayTokens';

interface Props {
  selectedTraitId: string | null;
  onSelectTrait: (traitId: string) => void;
  title?: string;
}

export function TraitSelector({ selectedTraitId, onSelectTrait, title = 'Choose a trait' }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.grid}>
        {CORE_TRAITS.map((trait) => {
          const isSelected = selectedTraitId === trait.id;
          return (
            <Pressable
              key={trait.id}
              style={[styles.traitButton, isSelected && styles.traitButtonSelected]}
              onPress={() => onSelectTrait(trait.id)}
            >
              <Text style={styles.emoji}>{trait.emoji}</Text>
              <Text style={[styles.traitName, isSelected && styles.traitNameSelected]}>
                {trait.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: TodayTypography.bricolageBold,
    color: '#1A5F4A',
    marginBottom: 16,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  traitButton: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  traitButtonSelected: {
    borderColor: '#58CC02',
    backgroundColor: '#E8F5E9',
  },
  emoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  traitName: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: TodayTypography.poppinsSemiBold,
    color: '#78716C',
    textAlign: 'center',
  },
  traitNameSelected: {
    color: '#1A5F4A',
    fontWeight: '700',
    fontFamily: TodayTypography.bricolageBold,
  },
});
