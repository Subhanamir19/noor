import React, { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { DailyTaskDeck } from '@/components/today/DailyTaskDeck';
import type { DailyTask } from '@/types/models';

interface TodaysTasks {
  dayTasks: DailyTask[];
  niceToHaveTasks: DailyTask[];
}

interface Props {
  todaysTasks: TodaysTasks;
  completions: Record<string, boolean>;
  completionPercentage: number;
  onTaskPress: (task: DailyTask) => void;
  onTaskComplete: (taskId: string, isCompleted: boolean) => void;
  onRefresh: () => void;
  onDeckInteractionChange?: (isInteracting: boolean) => void;
}

function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <View
      style={{
        height: 16,
        borderRadius: 999,
        backgroundColor: 'rgba(17, 24, 39, 0.08)',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.05)',
      }}
    >
      <View
        style={{
          width: `${Math.max(0, Math.min(100, percentage))}%`,
          height: '100%',
          backgroundColor: '#58CC02',
        }}
      />
    </View>
  );
}

export function DailyTaskCardsSection({
  todaysTasks,
  completions,
  completionPercentage,
  onTaskPress,
  onTaskComplete,
  onRefresh,
  onDeckInteractionChange,
}: Props) {
  const { dayTasks, niceToHaveTasks } = todaysTasks;

  const deckTasks = useMemo(() => {
    const must = dayTasks.slice(0, 3);
    const nice = niceToHaveTasks.slice(0, 4);
    return [...must, ...nice];
  }, [dayTasks, niceToHaveTasks]);

  const completedCount = useMemo(() => {
    return deckTasks.filter((t) => completions[t.id]).length;
  }, [completions, deckTasks]);

  const totalCount = deckTasks.length;
  const goalsLeft = Math.max(0, totalCount - completedCount);

  if (deckTasks.length === 0) {
    return (
      <View style={{ marginTop: 16 }}>
        <View
          style={{
            backgroundColor: '#FFF0F5',
            borderRadius: 24,
            borderWidth: 2,
            borderColor: '#FF69B4',
            padding: 20,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 28, marginBottom: 6 }}>⏳</Text>
          <Text style={{ fontSize: 16, fontWeight: '800', color: '#374151' }}>
            Loading your tasks...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 14 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: '900', color: '#0F766E' }}>
            Today’s Ritual Cards
          </Text>
          <Text style={{ marginTop: 2, fontSize: 14, fontWeight: '700', color: '#6B7280' }}>
            {goalsLeft} goals left • {completedCount}/{totalCount} done
          </Text>
        </View>

        <Pressable onPress={onRefresh} hitSlop={10}>
          {({ pressed }) => (
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 16,
                backgroundColor: pressed ? 'rgba(28,176,246,0.12)' : 'rgba(28,176,246,0.08)',
                borderWidth: 2,
                borderColor: 'rgba(28,176,246,0.25)',
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '900', color: '#1CB0F6' }}>
                Refresh
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Progress */}
      <View style={{ marginTop: 12 }}>
        <ProgressBar percentage={completionPercentage} />
      </View>

      {/* Quick summary chips */}
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
        <View
          style={{
            backgroundColor: 'rgba(88,204,2,0.12)',
            borderRadius: 999,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderWidth: 2,
            borderColor: 'rgba(88,204,2,0.25)',
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '900', color: '#2E7D32' }}>
            Must-to-do: 3
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(28,176,246,0.10)',
            borderRadius: 999,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderWidth: 2,
            borderColor: 'rgba(28,176,246,0.22)',
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '900', color: '#1899D6' }}>
            Nice-to-have: 4
          </Text>
        </View>
      </View>

      {/* Deck */}
      <View style={{ marginTop: 14 }}>
        <DailyTaskDeck
          tasks={deckTasks}
          mustCount={3}
          completions={completions}
          onOpenDetails={onTaskPress}
          onToggleComplete={onTaskComplete}
          onInteractionChange={onDeckInteractionChange}
        />
      </View>

      {/* Completion celebration */}
      {completionPercentage === 100 && (
        <View style={{ marginTop: 12 }}>
          <View
            style={{
              backgroundColor: '#FFF9C4',
              borderRadius: 24,
              borderWidth: 3,
              borderColor: '#FFEB3B',
              padding: 18,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 36 }}>🏆</Text>
            <Text style={{ marginTop: 6, fontSize: 18, fontWeight: '900', color: '#92400E' }}>
              MashAllah! All done!
            </Text>
            <Text style={{ marginTop: 2, fontSize: 14, fontWeight: '700', color: '#B45309' }}>
              You completed today’s set.
            </Text>
          </View>

          <View style={{ marginTop: 12 }}>
            <Button
              title="Refresh (pull latest)"
              variant="secondary"
              fullWidth
              onPress={onRefresh}
              textStyle={{ textTransform: 'none' }}
            />
          </View>
        </View>
      )}
    </View>
  );
}
