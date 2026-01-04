import React, { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { OutlineButton, PrimaryButton } from '@/components/common/Button';
import { getTaskById } from '@/data/dailyTasks';
import type { RootStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { useDailyTasksStore } from '@/store/dailyTasksStore';

type Props = NativeStackScreenProps<RootStackParamList, 'DailyTaskDetail'>;

const CATEGORY_LABELS: Record<string, string> = {
  morning_routine: 'Morning Routine',
  morning_ibadah: 'Morning Ibadah',
  morning_habits: 'Morning Habits',
  spiritual_teaching: 'Spiritual Teaching',
  character_building: 'Character Building',
  active_learning: 'Active Learning',
  practical_life: 'Practical Life',
  dhuhr_routine: 'Dhuhr Routine',
  quiet_time: 'Quiet Time',
  asr_routine: 'Asr Routine',
  quran_time: 'Quran Time',
  maghrib_routine: 'Maghrib Routine',
  dinner_family: 'Dinner & Family',
  isha_routine: 'Isha Routine',
  bedtime_routine: 'Bedtime Routine',
  friday_special: 'Friday Special',
  weekly_special: 'Weekly Special',
  social_skills: 'Social Skills',
  resilience: 'Resilience',
};

const TASK_TYPE_CONFIG = {
  primary: { label: 'Primary', emoji: 'dYZ_', bgColor: 'rgba(88, 204, 2, 0.15)', textColor: '#2E7D32' },
  quick_win: { label: 'Quick Win', emoji: 'ƒs­', bgColor: 'rgba(255, 150, 0, 0.15)', textColor: '#C2410C' },
} as const;

export function DailyTaskDetailScreen({ navigation, route }: Props) {
  const { taskId } = route.params;

  const user = useAuthStore((state) => state.user);
  const completions = useDailyTasksStore((state) => state.todayCompletions);
  const completeTask = useDailyTasksStore((state) => state.completeTask);
  const uncompleteTask = useDailyTasksStore((state) => state.uncompleteTask);

  const task = useMemo(() => getTaskById(taskId), [taskId]);
  const isCompleted = !!(task && completions[task.id]);

  const categoryLabel = task ? (CATEGORY_LABELS[task.category] || task.category) : '';

  const handleToggleComplete = async () => {
    if (!user?.id || !task) return;
    if (isCompleted) {
      await uncompleteTask(user.id, task.id);
    } else {
      await completeTask(user.id, task.id);
    }
  };

  const handleAskAI = () => {
    if (!task) return;
    // Navigate to the Chat tab from the root stack.
    navigation.navigate('Main', {
      screen: 'Chat',
      params: {
        initialMessage: `I'm trying to "${task.title}" but I need help. Can you guide me?`,
      },
    });
  };

  if (!task) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: '#FFF7ED' }} edges={['top']}>
        <View style={{ padding: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '900', color: '#1CB0F6' }}>← Back</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '900', color: '#0F766E', marginTop: 12 }}>
            Task not found
          </Text>
          <Text style={{ marginTop: 6, color: '#6B7280', fontWeight: '700' }}>
            This task ID doesn’t exist in the current build.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FFF7ED' }} edges={['top']}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(17, 24, 39, 0.08)',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: '900', color: '#1CB0F6' }}>←</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: '900', color: '#0F766E' }}>Task Details</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }}>
        <Text style={{ fontSize: 26, fontWeight: '900', color: '#0F766E' }}>{task.title}</Text>

        {/* Category + Type chips */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
          <View
            style={{
              backgroundColor: 'rgba(209, 250, 229, 0.6)',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 999,
              borderWidth: 2,
              borderColor: 'rgba(15, 118, 110, 0.12)',
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: '900', color: '#0F766E' }}>{categoryLabel}</Text>
          </View>

          {task.task_type && TASK_TYPE_CONFIG[task.task_type] && (
            <View
              style={{
                backgroundColor: TASK_TYPE_CONFIG[task.task_type].bgColor,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 999,
                borderWidth: 2,
                borderColor: 'rgba(17, 24, 39, 0.06)',
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '900', color: TASK_TYPE_CONFIG[task.task_type].textColor }}>
                {TASK_TYPE_CONFIG[task.task_type].emoji} {TASK_TYPE_CONFIG[task.task_type].label}
              </Text>
            </View>
          )}
        </View>

        {/* Description */}
        {task.description ? (
          <View
            style={{
              marginTop: 16,
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
              borderWidth: 2,
              borderColor: 'rgba(15, 118, 110, 0.12)',
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#374151', lineHeight: 24 }}>
              {task.description}
            </Text>
          </View>
        ) : null}

        {/* Tags */}
        {task.tags.length > 0 && (
          <View style={{ marginTop: 18 }}>
            <Text style={{ fontSize: 13, fontWeight: '900', color: '#6B7280' }}>Related to</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
              {task.tags.slice(0, 8).map((tag) => (
                <View
                  key={tag}
                  style={{
                    backgroundColor: 'rgba(17, 24, 39, 0.06)',
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 999,
                    borderWidth: 2,
                    borderColor: 'rgba(17, 24, 39, 0.05)',
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '800', color: '#374151' }}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Completion banner */}
        {isCompleted && (
          <View
            style={{
              marginTop: 18,
              backgroundColor: 'rgba(88, 204, 2, 0.14)',
              borderRadius: 18,
              borderWidth: 2,
              borderColor: 'rgba(88, 204, 2, 0.25)',
              padding: 14,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>✅</Text>
            <Text style={{ fontSize: 14, fontWeight: '900', color: '#2E7D32' }}>
              Completed today! MashAllah!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Action buttons */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 18,
          borderTopWidth: 1,
          borderTopColor: 'rgba(17, 24, 39, 0.08)',
          backgroundColor: '#FFF7ED',
        }}
      >
        {!isCompleted ? (
          <PrimaryButton title="Mark as Complete" onPress={handleToggleComplete} fullWidth />
        ) : (
          <OutlineButton title="Unmark Complete" onPress={handleToggleComplete} fullWidth />
        )}
        <View style={{ marginTop: 10 }}>
          <OutlineButton title="Ask Noor for Help" onPress={handleAskAI} fullWidth />
        </View>
      </View>
    </SafeAreaView>
  );
}
