import React from 'react';
import { Text, View } from 'react-native';
import { format, subDays } from 'date-fns';

import { GhostButton } from '@/components/common/Button';

interface Props {
  currentStreak: number;
  weekCompletions: boolean[]; // last 7 days, index 0 = today
  onViewCalendar: () => void;
}

function dayLabel(daysAgo: number): string {
  return format(subDays(new Date(), daysAgo), 'EEE');
}

export function StreakCard({ currentStreak, weekCompletions, onViewCalendar }: Props) {
  return (
    <View className="bg-white border-2 border-gold rounded-2xl p-5 shadow-md mb-4">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-poppinsSemiBold text-teal">YOUR STREAK 🔥</Text>
      </View>

      <View className="flex-row justify-between mb-4">
        {weekCompletions
          .slice(0, 7)
          .reverse()
          .map((completed, index) => {
            const daysAgo = 6 - index;
            const isToday = daysAgo === 0;

            return (
              <View key={`${daysAgo}`} className="items-center">
                <View
                  className={`w-10 h-10 rounded-lg border-2 items-center justify-center mb-1 ${
                    completed
                      ? 'bg-emerald border-emerald'
                      : isToday
                        ? 'border-gold bg-gold/10'
                        : 'border-warmGray/30'
                  }`}
                >
                  <Text
                    className={`font-interMedium ${
                      completed ? 'text-white' : isToday ? 'text-gold' : 'text-warmGray'
                    }`}
                  >
                    {completed ? '✓' : isToday ? '•' : ''}
                  </Text>
                </View>
                <Text className="text-xs font-interMedium text-warmGray">
                  {dayLabel(daysAgo)}
                </Text>
              </View>
            );
          })}
      </View>

      <Text className="text-center font-interMedium text-teal mb-3">
        {currentStreak === 0
          ? 'Start your streak today.'
          : currentStreak === 1
            ? '1 day strong. Keep it going.'
            : `${currentStreak} days strong. You're building consistency.`}
      </Text>

      <View className="self-center">
        <GhostButton title="View calendar" onPress={onViewCalendar} size="sm" />
      </View>
    </View>
  );
}

