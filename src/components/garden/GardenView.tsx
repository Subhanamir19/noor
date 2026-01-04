import React from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { CharacterTree } from '@/types/models';
import { CORE_TRAITS } from '@/data/characterScenarios';
import { lightHaptic } from '@/utils/haptics';
import { TreeVisual } from './TreeVisual';

interface Props {
  trees: Record<string, CharacterTree>;
  onTreePress: (tree: CharacterTree | null, traitId: string) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function GardenView({ trees, onTreePress, refreshing = false, onRefresh }: Props) {
  // Show all 8 core traits, with or without trees
  const gardenItems = CORE_TRAITS.map((trait) => ({
    trait,
    tree: trees[trait.id] || null,
  }));

  const activeCount = Object.keys(trees).length;
  const totalTraits = CORE_TRAITS.length;

  return (
    <View style={styles.container}>
      {/* Header stats */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Character Garden</Text>
        <Text style={styles.headerSubtitle}>
          {activeCount} of {totalTraits} traits growing
        </Text>
      </View>

      {/* Garden grid */}
      <ScrollView
        contentContainerStyle={styles.gardenGrid}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#4CAF50"
              colors={['#4CAF50']}
            />
          ) : undefined
        }
      >
        <View style={styles.row}>
          {gardenItems.slice(0, 4).map(({ trait, tree }) => (
            <View key={trait.id} style={styles.treeSlot}>
              {tree ? (
                <TreeVisual
                  tree={tree}
                  onPress={() => onTreePress(tree, trait.id)}
                />
              ) : (
                <EmptyTreeSlot
                  trait={trait}
                  onPress={() => onTreePress(null, trait.id)}
                />
              )}
            </View>
          ))}
        </View>
        <View style={styles.row}>
          {gardenItems.slice(4, 8).map(({ trait, tree }) => (
            <View key={trait.id} style={styles.treeSlot}>
              {tree ? (
                <TreeVisual
                  tree={tree}
                  onPress={() => onTreePress(tree, trait.id)}
                />
              ) : (
                <EmptyTreeSlot
                  trait={trait}
                  onPress={() => onTreePress(null, trait.id)}
                />
              )}
            </View>
          ))}
        </View>

        {/* Garden tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Growing Tips</Text>
          <Text style={styles.tipText}>
            🌱 Log positive moments to help trees grow
          </Text>
          <Text style={styles.tipText}>
            💪 Struggles are learning opportunities
          </Text>
          <Text style={styles.tipText}>
            📅 Regular logging keeps trees healthy
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

interface EmptySlotProps {
  trait: { id: string; name: string; emoji: string };
  onPress: () => void;
}

function EmptyTreeSlot({ trait, onPress }: EmptySlotProps) {
  const handlePress = () => {
    lightHaptic();
    onPress();
  };

  return (
    <Pressable style={styles.emptySlot} onPress={handlePress}>
      <Text style={styles.emptyEmoji}>{trait.emoji}</Text>
      <Text style={styles.emptyText}>{trait.name}</Text>
      <Text style={styles.plantText}>Tap to start</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#E8F5E9',
    borderBottomWidth: 1,
    borderBottomColor: '#C8E6C9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A5F4A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#4CAF50',
  },
  gardenGrid: {
    padding: 12,
    paddingBottom: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  treeSlot: {
    margin: 4,
  },
  emptySlot: {
    width: 100,
    height: 130,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    margin: 6,
  },
  emptyEmoji: {
    fontSize: 24,
    opacity: 0.5,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#BDBDBD',
    textAlign: 'center',
    marginBottom: 4,
  },
  plantText: {
    fontSize: 10,
    color: '#9E9E9E',
  },
  tipsContainer: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginHorizontal: 8,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F57C00',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#795548',
    marginBottom: 4,
  },
});
