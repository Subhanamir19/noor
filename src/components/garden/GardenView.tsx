import React from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { CharacterTree } from '@/types/models';
import { CORE_TRAITS } from '@/data/characterScenarios';
import { TodayColors, TodayRadii, TodaySpacing, TodayTypography } from '@/constants/todayTokens';
import { lightHaptic } from '@/utils/haptics';
import { TreeVisual } from './TreeVisual';

interface Props {
  trees: Record<string, CharacterTree>;
  onTraitPress: (traitId: string) => void;
  onTraitLongPress: (tree: CharacterTree | null, traitId: string) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function GardenView({ trees, onTraitPress, onTraitLongPress, refreshing = false, onRefresh }: Props) {
  const gardenItems = CORE_TRAITS.map((trait) => ({
    trait,
    tree: trees[trait.id] || null,
  }));

  const activeCount = Object.keys(trees).length;
  const totalTraits = CORE_TRAITS.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Character Garden</Text>
        <Text style={styles.headerSubtitle}>
          {activeCount} of {totalTraits} traits growing
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.gardenGrid}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4CAF50" colors={['#4CAF50']} />
          ) : undefined
        }
      >
        <View style={styles.row}>
          {gardenItems.slice(0, 4).map(({ trait, tree }) => (
            <View key={trait.id} style={styles.treeSlot}>
              {tree ? (
                <TreeVisual
                  tree={tree}
                  onPress={() => onTraitPress(trait.id)}
                  onLongPress={() => onTraitLongPress(tree, trait.id)}
                />
              ) : (
                <EmptyTreeSlot
                  trait={trait}
                  onPress={() => onTraitPress(trait.id)}
                  onLongPress={() => onTraitLongPress(null, trait.id)}
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
                  onPress={() => onTraitPress(trait.id)}
                  onLongPress={() => onTraitLongPress(tree, trait.id)}
                />
              ) : (
                <EmptyTreeSlot
                  trait={trait}
                  onPress={() => onTraitPress(trait.id)}
                  onLongPress={() => onTraitLongPress(null, trait.id)}
                />
              )}
            </View>
          ))}
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Quick tips</Text>
          <Text style={styles.tipText}>• Tap a trait to get a small practice.</Text>
          <Text style={styles.tipText}>• Long-press a trait for details.</Text>
          <Text style={styles.tipText}>• Log is there when you need it.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

interface EmptySlotProps {
  trait: { id: string; name: string; emoji: string };
  onPress: () => void;
  onLongPress: () => void;
}

function EmptyTreeSlot({ trait, onPress, onLongPress }: EmptySlotProps) {
  const handlePress = () => {
    lightHaptic();
    onPress();
  };

  return (
    <Pressable style={styles.emptySlot} onPress={handlePress} onLongPress={onLongPress}>
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
    paddingHorizontal: TodaySpacing[16],
    paddingVertical: TodaySpacing[12],
    backgroundColor: TodayColors.bgApp,
    borderBottomWidth: 1,
    borderBottomColor: TodayColors.strokeSubtle,
  },
  headerTitle: {
    ...TodayTypography.titleM,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textPrimary,
    marginBottom: TodaySpacing[4],
  },
  headerSubtitle: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textMuted,
  },
  gardenGrid: {
    padding: TodaySpacing[12],
    paddingBottom: TodaySpacing[32],
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
    borderRadius: TodayRadii.md,
    borderWidth: 2,
    borderColor: TodayColors.strokeStrong,
    borderStyle: 'dashed',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TodayColors.card,
    margin: 6,
  },
  emptyEmoji: {
    fontSize: 24,
    opacity: 0.6,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textMuted,
    textAlign: 'center',
    marginBottom: 4,
  },
  plantText: {
    fontSize: 10,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textMuted,
  },
  tipsContainer: {
    backgroundColor: 'rgba(245,158,11,0.10)',
    borderRadius: TodayRadii.lg,
    padding: TodaySpacing[16],
    marginTop: TodaySpacing[16],
    marginHorizontal: 8,
  },
  tipsTitle: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textPrimary,
    marginBottom: TodaySpacing[8],
  },
  tipText: {
    ...TodayTypography.bodyM,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textSecondary,
    marginBottom: TodaySpacing[4],
  },
});
