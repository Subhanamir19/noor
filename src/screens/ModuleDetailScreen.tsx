import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ModuleCard } from '@/components/library';
import { Button, OutlineButton } from '@/components/common/Button';
import { getModuleById, getRelatedModules } from '@/data/modules';
import type { RootStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { useLibraryStore } from '@/store/libraryStore';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Props = NativeStackScreenProps<RootStackParamList, 'ModuleDetail'>;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ModuleDetailScreen({ navigation, route }: Props) {
  const { moduleId } = route.params;
  const user = useAuthStore((state) => state.user);

  const markCompleted = useLibraryStore((state) => state.markCompleted);
  const isModuleCompleted = useLibraryStore((state) => state.isModuleCompleted);
  const isModuleBookmarked = useLibraryStore((state) => state.isModuleBookmarked);
  const toggleBookmark = useLibraryStore((state) => state.toggleBookmark);

  const [isLoading, setIsLoading] = useState(false);

  const module = getModuleById(moduleId);
  const relatedModules = getRelatedModules(moduleId);

  if (!module) {
    return (
      <SafeAreaView className="flex-1 bg-cream items-center justify-center">
        <Text className="text-warmGray mb-4">Module not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  const isCompleted = isModuleCompleted(moduleId);
  const isBookmarked = isModuleBookmarked(moduleId);

  const handleMarkComplete = async () => {
    if (!user?.id || isCompleted) return;

    setIsLoading(true);
    try {
      await markCompleted(user.id, module.type, module.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (!user?.id) return;
    await toggleBookmark(user.id, module.type, module.id);
  };

  const handleAskAI = () => {
    // @ts-expect-error - navigating to nested tab
    navigation.navigate('Main', {
      screen: 'Chat',
      params: {
        initialMessage: `I just read about "${module.title}". Can you help me understand how to apply this?`,
      },
    });
  };

  const handleRelatedModulePress = (relatedModuleId: string) => {
    navigation.push('ModuleDetail', { moduleId: relatedModuleId });
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      {/* Header */}
      <View className="px-6 py-4 border-b border-warmGray/20 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mr-3"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text className="text-2xl text-teal">←</Text>
        </TouchableOpacity>
        <Text className="text-lg font-poppinsSemiBold text-teal flex-1" numberOfLines={2}>
          {module.title}
        </Text>
        <TouchableOpacity
          onPress={handleBookmark}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text className="text-2xl">{isBookmarked ? '⭐' : '☆'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="px-6 pt-6">
          {/* Module info */}
          <View className="bg-white border-2 border-sage rounded-xl p-4 mb-6">
            <Text className="text-base font-interRegular text-warmGray mb-2">
              {module.description}
            </Text>
            <View className="flex-row items-center">
              <Text className="text-sm font-interMedium text-warmGray mr-4">
                ⏱️ {module.duration_minutes} min read
              </Text>
              {isCompleted && (
                <View className="bg-emerald/20 rounded-full px-3 py-1">
                  <Text className="text-sm font-interMedium text-emerald">
                    ✓ Completed
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Content sections */}
          {module.sections && module.sections.length > 0 ? (
            module.sections.map((section, index) => (
              <View key={index} className="mb-6">
                <Text className="text-lg font-poppinsSemiBold text-teal mb-3">
                  {section.title}
                </Text>

                {section.type === 'dua' ? (
                  <View className="bg-sage/20 border-2 border-emerald rounded-xl p-4">
                    <Text className="text-base font-interRegular text-teal leading-6">
                      {section.content}
                    </Text>
                  </View>
                ) : section.type === 'hadith' ? (
                  <View className="bg-gold/10 border-2 border-gold rounded-xl p-4">
                    <Text className="text-base font-interRegular text-teal leading-6">
                      {section.content}
                    </Text>
                  </View>
                ) : section.type === 'list' ? (
                  <View className="bg-white border-2 border-sage rounded-xl p-4">
                    <Text className="text-base font-interRegular text-teal leading-6">
                      {section.content}
                    </Text>
                  </View>
                ) : (
                  <Text className="text-base font-interRegular text-teal leading-6">
                    {section.content}
                  </Text>
                )}
              </View>
            ))
          ) : (
            <View className="bg-warmGray/10 rounded-xl p-6 mb-6">
              <Text className="text-center font-interMedium text-warmGray">
                📝 Full content coming soon
              </Text>
            </View>
          )}

          {/* Actions */}
          <View className="mb-6">
            {!isCompleted && (
              <View className="mb-3">
                <Button
                  title="Mark as Complete"
                  onPress={handleMarkComplete}
                  loading={isLoading}
                  fullWidth
                />
              </View>
            )}

            <OutlineButton
              title="Ask Noor About This"
              onPress={handleAskAI}
              fullWidth
            />
          </View>

          {/* Related modules */}
          {relatedModules.length > 0 && (
            <View className="mb-6">
              <Text className="text-lg font-poppinsSemiBold text-teal mb-3">
                Related Guides
              </Text>
              {relatedModules.map((relatedModule) => (
                <ModuleCard
                  key={relatedModule.id}
                  module={relatedModule}
                  isCompleted={isModuleCompleted(relatedModule.id)}
                  isBookmarked={isModuleBookmarked(relatedModule.id)}
                  onPress={() => handleRelatedModulePress(relatedModule.id)}
                  onBookmark={() => {
                    if (user?.id) {
                      toggleBookmark(user.id, relatedModule.type, relatedModule.id);
                    }
                  }}
                />
              ))}
            </View>
          )}
        </View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
