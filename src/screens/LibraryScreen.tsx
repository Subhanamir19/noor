import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { EmptyState, ModuleCard, SearchBar, TypeTabs } from '@/components/library';
import type { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { useLibraryStore } from '@/store/libraryStore';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Library'>,
  NativeStackScreenProps<RootStackParamList>
>;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function LibraryScreen({ navigation }: Props) {
  const user = useAuthStore((state) => state.user);

  const searchQuery = useLibraryStore((state) => state.searchQuery);
  const selectedType = useLibraryStore((state) => state.selectedType);
  const isLoading = useLibraryStore((state) => state.isLoading);
  const loadProgress = useLibraryStore((state) => state.loadProgress);
  const setSearchQuery = useLibraryStore((state) => state.setSearchQuery);
  const setSelectedType = useLibraryStore((state) => state.setSelectedType);
  const getFilteredModules = useLibraryStore((state) => state.getFilteredModules);
  const isModuleCompleted = useLibraryStore((state) => state.isModuleCompleted);
  const isModuleBookmarked = useLibraryStore((state) => state.isModuleBookmarked);
  const toggleBookmark = useLibraryStore((state) => state.toggleBookmark);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadProgress(user.id);
    }
  }, [loadProgress, user?.id]);

  const handleRefresh = async () => {
    if (!user?.id) return;
    setRefreshing(true);
    await loadProgress(user.id);
    setRefreshing(false);
  };

  const handleModulePress = (moduleId: string) => {
    navigation.navigate('ModuleDetail', { moduleId });
  };

  const handleBookmark = async (moduleType: 'technique' | 'habit' | 'story', moduleId: string) => {
    if (!user?.id) return;
    await toggleBookmark(user.id, moduleType, moduleId);
  };

  const filteredModules = getFilteredModules();

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top']}>
      <View className="px-6 pt-4">
        {/* Header */}
        <Text className="text-2xl font-poppinsBold text-teal mb-4">
          Library of Wisdom 📚
        </Text>

        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />

        {/* Type Tabs */}
        <TypeTabs selectedType={selectedType} onSelectType={setSelectedType} />
      </View>

      {/* Modules List */}
      {isLoading && filteredModules.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#10B981" />
        </View>
      ) : (
        <ScrollView
          className="flex-1 px-6"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {filteredModules.length === 0 ? (
            <EmptyState searchQuery={searchQuery} />
          ) : (
            filteredModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                isCompleted={isModuleCompleted(module.id)}
                isBookmarked={isModuleBookmarked(module.id)}
                onPress={() => handleModulePress(module.id)}
                onBookmark={() => handleBookmark(module.type, module.id)}
              />
            ))
          )}

          <View className="h-8" />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
