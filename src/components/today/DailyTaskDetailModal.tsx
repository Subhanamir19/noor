import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { PrimaryButton, OutlineButton } from '@/components/common/Button';
import type { DailyTask } from '@/types/models';

interface Props {
  visible: boolean;
  task: DailyTask | null;
  isCompleted: boolean;
  onClose: () => void;
  onComplete: () => void;
  onAskAI: () => void;
}

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
  primary: { label: 'Primary', emoji: '🎯', bgColor: 'bg-emerald/20', textColor: 'text-emerald' },
  quick_win: { label: 'Quick Win', emoji: '⚡', bgColor: 'bg-gold/20', textColor: 'text-gold' },
};

export function DailyTaskDetailModal({
  visible,
  task,
  isCompleted,
  onClose,
  onComplete,
  onAskAI,
}: Props) {
  if (!task) return null;

  const categoryLabel = CATEGORY_LABELS[task.category] || task.category;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1 bg-cream">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-warmGray/20">
          <View className="w-10" />
          <Text className="text-lg font-poppinsSemiBold text-teal">Task Details</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-lg">✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6 py-4">
          {/* Title */}
          <Text className="text-2xl font-poppinsBold text-teal mb-2">{task.title}</Text>

          {/* Category & Task Type */}
          <View className="flex-row flex-wrap gap-2 mb-4">
            <View className="bg-sage/30 px-3 py-1 rounded-full">
              <Text className="text-sm font-interMedium text-emerald">{categoryLabel}</Text>
            </View>
            {task.task_type && TASK_TYPE_CONFIG[task.task_type] && (
              <View className={`${TASK_TYPE_CONFIG[task.task_type].bgColor} px-3 py-1 rounded-full`}>
                <Text className={`text-sm font-interMedium ${TASK_TYPE_CONFIG[task.task_type].textColor}`}>
                  {TASK_TYPE_CONFIG[task.task_type].emoji} {TASK_TYPE_CONFIG[task.task_type].label}
                </Text>
              </View>
            )}
          </View>

          {/* Description */}
          {task.description && (
            <View className="bg-white border-2 border-sage rounded-xl p-4 mb-4">
              <Text className="text-base font-interRegular text-warmGray leading-6">
                {task.description}
              </Text>
            </View>
          )}

          {/* Age Appropriate */}
          <View className="mb-4">
            <Text className="text-sm font-interMedium text-warmGray mb-1">Best for:</Text>
            <Text className="text-base font-interRegular text-teal capitalize">
              {task.age_appropriate === 'all' ? 'All ages' : `${task.age_appropriate}s`}
            </Text>
          </View>

          {/* Tags */}
          {task.tags.length > 0 && (
            <View className="mb-6">
              <Text className="text-sm font-interMedium text-warmGray mb-2">Related to:</Text>
              <View className="flex-row flex-wrap gap-2">
                {task.tags.slice(0, 5).map((tag) => (
                  <View key={tag} className="bg-warmGray/10 px-3 py-1 rounded-full">
                    <Text className="text-sm font-interRegular text-warmGray">{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Completion Status */}
          {isCompleted && (
            <View className="bg-emerald/10 border-2 border-emerald rounded-xl p-4 mb-4">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-2">✅</Text>
                <Text className="text-base font-interMedium text-emerald">
                  Completed today! MashAllah!
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Action buttons */}
        <View className="px-6 py-4 border-t border-warmGray/20">
          {!isCompleted ? (
            <PrimaryButton title="Mark as Complete" onPress={onComplete} fullWidth />
          ) : (
            <OutlineButton title="Unmark Complete" onPress={onComplete} fullWidth />
          )}
          <View className="mt-3">
            <OutlineButton title="Ask Noor for Help" onPress={onAskAI} fullWidth />
          </View>
        </View>
      </View>
    </Modal>
  );
}
