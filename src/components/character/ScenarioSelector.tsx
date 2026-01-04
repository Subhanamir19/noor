import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { MomentType } from '@/types/models';
import { getPositiveScenarios, getStruggleScenarios } from '@/data/characterScenarios';

interface Props {
  traitId: string;
  momentType: MomentType;
  selectedScenarioId: string | null;
  onSelectMomentType: (type: MomentType) => void;
  onSelectScenario: (scenarioId: string) => void;
}

export function ScenarioSelector({
  traitId,
  momentType,
  selectedScenarioId,
  onSelectMomentType,
  onSelectScenario,
}: Props) {
  const scenarios =
    momentType === 'positive'
      ? getPositiveScenarios(traitId)
      : getStruggleScenarios(traitId);

  return (
    <View style={styles.container}>
      {/* Moment Type Toggle */}
      <View style={styles.toggleContainer}>
        <Pressable
          style={[
            styles.toggleButton,
            momentType === 'positive' && styles.toggleButtonPositive,
          ]}
          onPress={() => onSelectMomentType('positive')}
        >
          <Text style={styles.toggleEmoji}>+</Text>
          <Text
            style={[
              styles.toggleText,
              momentType === 'positive' && styles.toggleTextActive,
            ]}
          >
            Win
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.toggleButton,
            momentType === 'struggle' && styles.toggleButtonStruggle,
          ]}
          onPress={() => onSelectMomentType('struggle')}
        >
          <Text style={styles.toggleEmoji}>~</Text>
          <Text
            style={[
              styles.toggleText,
              momentType === 'struggle' && styles.toggleTextActive,
            ]}
          >
            Struggle
          </Text>
        </Pressable>
      </View>

      {/* Scenario Options */}
      <Text style={styles.subtitle}>What happened?</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scenarioList}
      >
        {scenarios.map((scenario) => {
          const isSelected = selectedScenarioId === scenario.id;
          return (
            <Pressable
              key={scenario.id}
              style={[
                styles.scenarioChip,
                isSelected && styles.scenarioChipSelected,
                momentType === 'positive' && isSelected && styles.scenarioChipPositive,
                momentType === 'struggle' && isSelected && styles.scenarioChipStruggle,
              ]}
              onPress={() => onSelectScenario(scenario.id)}
            >
              <Text
                style={[
                  styles.scenarioText,
                  isSelected && styles.scenarioTextSelected,
                ]}
              >
                {scenario.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  toggleButtonPositive: {
    backgroundColor: '#E8F5E9',
  },
  toggleButtonStruggle: {
    backgroundColor: '#FFF3E0',
  },
  toggleEmoji: {
    fontSize: 18,
    marginRight: 6,
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#78716C',
  },
  toggleTextActive: {
    color: '#1A5F4A',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#78716C',
    marginLeft: 16,
    marginBottom: 12,
  },
  scenarioList: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  scenarioChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  scenarioChipSelected: {
    borderColor: '#58CC02',
  },
  scenarioChipPositive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#58CC02',
  },
  scenarioChipStruggle: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FF9600',
  },
  scenarioText: {
    fontSize: 14,
    color: '#4B4B4B',
  },
  scenarioTextSelected: {
    fontWeight: '600',
  },
});
