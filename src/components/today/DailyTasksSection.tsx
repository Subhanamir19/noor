import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { DailyTask } from '@/types/models';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// Duolingo-style 3D button constants
const SHADOW_HEIGHT = 4;
const BORDER_RADIUS = 20;

// Card colors - soft pastel palette
const CARD_COLORS = [
  { bg: '#FFE4EC', shadow: '#FFB6C1', border: '#FF69B4' }, // Pink
  { bg: '#E8F5E9', shadow: '#A5D6A7', border: '#66BB6A' }, // Green
  { bg: '#E3F2FD', shadow: '#90CAF9', border: '#42A5F5' }, // Blue
  { bg: '#FFF3E0', shadow: '#FFCC80', border: '#FFA726' }, // Orange
  { bg: '#F3E5F5', shadow: '#CE93D8', border: '#AB47BC' }, // Purple
  { bg: '#E0F7FA', shadow: '#80DEEA', border: '#26C6DA' }, // Cyan
  { bg: '#FFF8E1', shadow: '#FFE082', border: '#FFCA28' }, // Amber
];

const COMPLETED_COLOR = {
  bg: '#E8F5E9',
  shadow: '#A5D6A7',
  border: '#66BB6A',
  checkBg: '#4CAF50',
  checkShadow: '#388E3C',
};

// ---------------------------------------------------------------------------
// Task Card Component (Duolingo 3D Style with Icon)
// ---------------------------------------------------------------------------

interface TaskCardProps {
  task: DailyTask;
  colorIndex: number;
  isCompleted: boolean;
  onPress: () => void;
  onCheckboxPress: () => void;
}

function TaskCard({
  task,
  colorIndex,
  isCompleted,
  onPress,
  onCheckboxPress,
}: TaskCardProps) {
  const colors = isCompleted ? COMPLETED_COLOR : CARD_COLORS[colorIndex % CARD_COLORS.length];

  return (
    <Pressable onPress={onPress} className="mb-3">
      {({ pressed }) => {
        const translateY = pressed ? SHADOW_HEIGHT : 0;
        const currentShadowHeight = pressed ? 0 : SHADOW_HEIGHT;

        return (
          <View>
            {/* Shadow layer */}
            <View
              style={{
                position: 'absolute',
                top: SHADOW_HEIGHT,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: colors.shadow,
                borderRadius: BORDER_RADIUS,
              }}
            />

            {/* Main card surface */}
            <View
              style={{
                backgroundColor: colors.bg,
                borderRadius: BORDER_RADIUS,
                borderWidth: 2,
                borderColor: colors.border,
                transform: [{ translateY }],
                marginBottom: currentShadowHeight,
                paddingVertical: 14,
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {/* 3D Icon */}
              <View className="mr-3">
                {/* Icon shadow */}
                <View
                  style={{
                    position: 'absolute',
                    top: 3,
                    left: 0,
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: colors.shadow,
                  }}
                />
                {/* Icon surface */}
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text style={{ fontSize: 22 }}>{task.icon || '✨'}</Text>
                </View>
              </View>

              {/* Task title (short) */}
              <View className="flex-1">
                <Text
                  className={`font-interMedium ${
                    isCompleted ? 'text-green-700 line-through' : 'text-gray-800'
                  }`}
                  style={{ fontSize: 16 }}
                  numberOfLines={1}
                >
                  {task.shortTitle || task.title}
                </Text>
              </View>

              {/* Energy indicator */}
              <View className="flex-row items-center mr-2">
                <Text style={{ fontSize: 14, color: '#FFA000' }}>5</Text>
                <Text style={{ fontSize: 12 }}>⚡</Text>
              </View>

              {/* Checkbox (3D style) */}
              <Pressable
                onPress={onCheckboxPress}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                {({ pressed: checkPressed }) => (
                  <View>
                    {/* Checkbox shadow */}
                    <View
                      style={{
                        position: 'absolute',
                        top: 3,
                        left: 0,
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        backgroundColor: isCompleted
                          ? COMPLETED_COLOR.checkShadow
                          : '#D0D0D0',
                      }}
                    />
                    {/* Checkbox surface */}
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        backgroundColor: isCompleted
                          ? COMPLETED_COLOR.checkBg
                          : '#F5F5F5',
                        borderWidth: isCompleted ? 0 : 2,
                        borderColor: '#E0E0E0',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: [{ translateY: checkPressed ? 3 : 0 }],
                        marginBottom: checkPressed ? 0 : 3,
                      }}
                    >
                      {isCompleted && (
                        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}>
                          ✓
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        );
      }}
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// Section Header Component
// ---------------------------------------------------------------------------

interface SectionHeaderProps {
  title: string;
  isExpanded: boolean;
  taskCount: number;
  completedCount: number;
  onToggle: () => void;
  onAdd?: () => void;
}

function SectionHeader({
  title,
  isExpanded,
  taskCount,
  completedCount,
  onToggle,
  onAdd,
}: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between mb-3">
      <Pressable
        onPress={onToggle}
        className="flex-row items-center"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text className="font-poppinsSemiBold text-gray-700" style={{ fontSize: 15 }}>
          {title}
        </Text>
        <Text className="ml-2 text-gray-400" style={{ fontSize: 12 }}>
          {completedCount}/{taskCount}
        </Text>
        <Text className="ml-2 text-gray-400">{isExpanded ? '▼' : '▶'}</Text>
      </Pressable>

      {/* Add button */}
      {onAdd && (
        <Pressable onPress={onAdd} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: 'rgba(255, 182, 193, 0.3)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#FF69B4', fontSize: 18, fontWeight: '600' }}>+</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Progress Bar Component
// ---------------------------------------------------------------------------

interface ProgressBarProps {
  percentage: number;
  completedCount: number;
  totalCount: number;
}

function ProgressBar({ percentage, completedCount, totalCount }: ProgressBarProps) {
  return (
    <View className="mb-5">
      {/* Progress container with 3D effect */}
      <View>
        {/* Shadow */}
        <View
          style={{
            position: 'absolute',
            top: 3,
            left: 0,
            right: 0,
            height: 20,
            borderRadius: 10,
            backgroundColor: '#FFB6C1',
          }}
        />
        {/* Background */}
        <View
          style={{
            height: 20,
            backgroundColor: '#FFE4EC',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#FF69B4',
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* Fill */}
          <View
            style={{
              height: '100%',
              width: `${percentage}%`,
              backgroundColor: '#FF69B4',
              borderRadius: 8,
            }}
          />
          {/* Counter */}
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: percentage > 50 ? '#FFFFFF' : '#FF69B4',
              }}
            >
              {completedCount} / {totalCount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function DailyTasksSection({
  todaysTasks,
  completions,
  completionPercentage,
  onTaskPress,
  onTaskComplete,
  onRefresh,
}: Props) {
  const { dayTasks, niceToHaveTasks } = todaysTasks;

  const [dayTasksExpanded, setDayTasksExpanded] = useState(true);
  const [niceToHaveExpanded, setNiceToHaveExpanded] = useState(true);

  // Count completions
  const dayTasksCompleted = dayTasks.filter((t) => completions[t.id]).length;
  const niceToHaveCompleted = niceToHaveTasks.filter((t) => completions[t.id]).length;

  const totalTasks = dayTasks.length + niceToHaveTasks.length;
  const totalCompleted = dayTasksCompleted + niceToHaveCompleted;

  if (totalTasks === 0) {
    return (
      <View className="mt-4">
        {/* Empty state */}
        <View>
          <View
            style={{
              position: 'absolute',
              top: SHADOW_HEIGHT,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#FFB6C1',
              borderRadius: BORDER_RADIUS,
            }}
          />
          <View
            style={{
              backgroundColor: '#FFF0F5',
              borderRadius: BORDER_RADIUS,
              borderWidth: 2,
              borderColor: '#FF69B4',
              padding: 24,
              marginBottom: SHADOW_HEIGHT,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 32 }}>📝</Text>
            <Text className="text-center font-poppinsSemiBold text-gray-700 mt-2">
              Loading your tasks...
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="mt-2">
      {/* Goals counter */}
      <View className="flex-row items-center mb-4">
        <Text style={{ fontSize: 16 }}>📋</Text>
        <Text className="ml-2 font-poppinsSemiBold text-gray-800" style={{ fontSize: 16 }}>
          {totalTasks - totalCompleted} goals left for today!
        </Text>
      </View>

      {/* Progress Bar */}
      <ProgressBar
        percentage={completionPercentage}
        completedCount={totalCompleted}
        totalCount={totalTasks}
      />

      {/* Day Tasks Section */}
      {dayTasks.length > 0 && (
        <View className="mb-4">
          <SectionHeader
            title="Day Tasks"
            isExpanded={dayTasksExpanded}
            taskCount={dayTasks.length}
            completedCount={dayTasksCompleted}
            onToggle={() => setDayTasksExpanded(!dayTasksExpanded)}
          />

          {dayTasksExpanded &&
            dayTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                colorIndex={index}
                isCompleted={completions[task.id] || false}
                onPress={() => onTaskPress(task)}
                onCheckboxPress={() => onTaskComplete(task.id, completions[task.id] || false)}
              />
            ))}
        </View>
      )}

      {/* Nice to Have Section */}
      {niceToHaveTasks.length > 0 && (
        <View className="mb-4">
          <SectionHeader
            title="Nice to Have"
            isExpanded={niceToHaveExpanded}
            taskCount={niceToHaveTasks.length}
            completedCount={niceToHaveCompleted}
            onToggle={() => setNiceToHaveExpanded(!niceToHaveExpanded)}
          />

          {niceToHaveExpanded &&
            niceToHaveTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                colorIndex={index + 3} // Offset to get different colors
                isCompleted={completions[task.id] || false}
                onPress={() => onTaskPress(task)}
                onCheckboxPress={() => onTaskComplete(task.id, completions[task.id] || false)}
              />
            ))}
        </View>
      )}

      {/* Completion celebration */}
      {completionPercentage === 100 && (
        <View className="mb-4">
          <View
            style={{
              position: 'absolute',
              top: SHADOW_HEIGHT,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#FFD54F',
              borderRadius: BORDER_RADIUS,
            }}
          />
          <View
            style={{
              backgroundColor: '#FFF9C4',
              borderRadius: BORDER_RADIUS,
              borderWidth: 2,
              borderColor: '#FFEB3B',
              padding: 20,
              marginBottom: SHADOW_HEIGHT,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 40 }}>🎉</Text>
            <Text className="font-poppinsBold text-amber-800 mt-2" style={{ fontSize: 18 }}>
              MashAllah! All done!
            </Text>
            <Text className="text-amber-700 text-center mt-1">
              You completed all your tasks today
            </Text>
          </View>
        </View>
      )}

      {/* Add a goal button */}
      <Pressable onPress={onRefresh}>
        {({ pressed }) => (
          <View
            style={{
              backgroundColor: pressed ? 'rgba(255, 182, 193, 0.3)' : 'rgba(255, 182, 193, 0.15)',
              borderRadius: BORDER_RADIUS,
              paddingVertical: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                backgroundColor: 'rgba(255, 105, 180, 0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              <Text style={{ color: '#FF69B4', fontSize: 20 }}>+</Text>
            </View>
            <Text
              className="font-interMedium"
              style={{ color: '#FF69B4', fontSize: 16 }}
            >
              Add a goal
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}
