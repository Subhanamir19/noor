import React, { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { GardenView, TreeDetailModal } from '@/components/garden';
import { QuickCaptureSheet } from '@/components/character';
import type { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { useCharacterStore } from '@/store/characterStore';
import type { CharacterTree } from '@/types/models';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Garden'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function GardenScreen({ navigation }: Props) {
  const user = useAuthStore((state) => state.user);
  const trees = useCharacterStore((state) => state.trees);
  const isLoading = useCharacterStore((state) => state.isLoading);
  const loadTrees = useCharacterStore((state) => state.loadTrees);

  const [refreshing, setRefreshing] = useState(false);
  const [selectedTree, setSelectedTree] = useState<CharacterTree | null>(null);
  const [selectedTraitId, setSelectedTraitId] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showQuickCapture, setShowQuickCapture] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadTrees(user.id);
    }
  }, [loadTrees, user?.id]);

  const handleRefresh = async () => {
    if (!user?.id) return;
    setRefreshing(true);
    await loadTrees(user.id);
    setRefreshing(false);
  };

  const handleTreePress = (tree: CharacterTree | null, traitId: string) => {
    setSelectedTree(tree);
    setSelectedTraitId(traitId);
    setShowDetailModal(true);
  };

  const handleLogMoment = () => {
    setShowDetailModal(false);
    setShowQuickCapture(true);
  };

  const handleQuickCaptureClose = () => {
    setShowQuickCapture(false);
    // Refresh trees after logging
    if (user?.id) {
      loadTrees(user.id);
    }
  };

  if (!user?.id) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.centered}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <GardenView
        trees={trees}
        onTreePress={handleTreePress}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      <TreeDetailModal
        visible={showDetailModal}
        tree={selectedTree}
        traitId={selectedTraitId || ''}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedTree(null);
          setSelectedTraitId(null);
        }}
        onLogMoment={handleLogMoment}
      />

      {user?.id && (
        <QuickCaptureSheet
          visible={showQuickCapture}
          userId={user.id}
          onClose={handleQuickCaptureClose}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#78716C',
  },
});
