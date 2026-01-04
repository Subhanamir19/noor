import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  RefreshControl,
  Text,
  View,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, ResizeMode } from 'expo-av';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  QuickCaptureButton,
  QuickCaptureSheet,
  QuickCaptureTooltip,
  useQuickCaptureTooltip,
} from '@/components/character';
import { ChallengeList, CoachingModal, WellnessIndicator } from '@/components/coaching';
import { AyahOverlay, useAyahOverlay } from '@/components/today/AyahOverlay';
import { DailyFeedbackModal } from '@/components/today/DailyFeedbackModal';
import { DailyTaskDetailModal } from '@/components/today/DailyTaskDetailModal';
import { DailyTasksSection } from '@/components/today/DailyTasksSection';
import type { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { useCharacterStore } from '@/store/characterStore';
import { useCoachingStore } from '@/store/coachingStore';
import { useDailyTasksStore } from '@/store/dailyTasksStore';
import { useMissionStore } from '@/store/missionStore';
import type { DailyTask, DailyFeedbackRating } from '@/types/models';

const CHARACTER_SPACE_HEIGHT = 200; // Reserved space for character animation
const BLUR_HEIGHT = 60;

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Today'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function TodayScreen({ navigation }: Props) {
  const profile = useAuthStore((state) => state.profile);
  const user = useAuthStore((state) => state.user);

  const loadTodaysMission = useMissionStore((state) => state.loadTodaysMission);

  // Daily tasks store
  const todaysTasks = useDailyTasksStore((state) => state.todaysTasks);
  const dailyTaskCompletions = useDailyTasksStore((state) => state.todayCompletions);
  const dailyTaskPercentage = useDailyTasksStore((state) => state.completionPercentage);
  const loadTodaysTasks = useDailyTasksStore((state) => state.loadTodaysTasks);
  const completeDailyTask = useDailyTasksStore((state) => state.completeTask);
  const uncompleteDailyTask = useDailyTasksStore((state) => state.uncompleteTask);
  const refreshDailyTasks = useDailyTasksStore((state) => state.refreshTasks);
  const submitDailyFeedback = useDailyTasksStore((state) => state.submitDailyFeedback);
  const hasFeedbackForToday = useDailyTasksStore((state) => state.hasFeedbackForToday);

  // Character store (Quick Capture)
  const isQuickCaptureOpen = useCharacterStore((state) => state.isQuickCaptureOpen);
  const openQuickCapture = useCharacterStore((state) => state.openQuickCapture);
  const closeQuickCapture = useCharacterStore((state) => state.closeQuickCapture);
  const loadTrees = useCharacterStore((state) => state.loadTrees);

  // Coaching store
  const pendingIntervention = useCoachingStore((state) => state.pendingIntervention);
  const isInterventionModalVisible = useCoachingStore((state) => state.isInterventionModalVisible);
  const activeChallenges = useCoachingStore((state) => state.activeChallenges);
  const wellnessScore = useCoachingStore((state) => state.wellnessScore);
  const tips = useCoachingStore((state) => state.tips);
  const loadCoachingData = useCoachingStore((state) => state.loadCoachingData);
  const acceptIntervention = useCoachingStore((state) => state.acceptIntervention);
  const declineIntervention = useCoachingStore((state) => state.declineIntervention);
  const completeChallenge = useCoachingStore((state) => state.completeChallenge);

  // Quick Capture tooltip (onboarding)
  const { showTooltip, dismissTooltip } = useQuickCaptureTooltip();

  // Ayah overlay
  const { showAyah, handleAyahDismiss } = useAyahOverlay();

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDailyTask, setSelectedDailyTask] = useState<DailyTask | null>(null);
  const [showDailyTaskModal, setShowDailyTaskModal] = useState(false);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll animation for blur effect
  const scrollY = useRef(new Animated.Value(0)).current;
  const blurOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    if (!user?.id) return;
    loadTodaysMission(user.id);
    loadTodaysTasks(user.id);
    loadTrees(user.id);
    loadCoachingData(user.id);
  }, [loadTodaysMission, loadTodaysTasks, loadTrees, loadCoachingData, user?.id]);

  // Show feedback modal when all daily tasks are complete
  useEffect(() => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }

    const totalTasks = todaysTasks.dayTasks.length + todaysTasks.niceToHaveTasks.length;

    if (
      dailyTaskPercentage === 100 &&
      !hasFeedbackForToday() &&
      !showFeedbackModal &&
      totalTasks > 0
    ) {
      feedbackTimeoutRef.current = setTimeout(() => setShowFeedbackModal(true), 1500);
    }

    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = null;
      }
    };
  }, [dailyTaskPercentage, showFeedbackModal, todaysTasks]);

  const handleRefresh = async () => {
    if (!user?.id) return;
    setRefreshing(true);
    try {
      await Promise.all([
        loadTodaysMission(user.id),
        loadTodaysTasks(user.id),
        loadTrees(user.id),
        loadCoachingData(user.id),
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  // Coaching handlers
  const handleAcceptIntervention = async () => {
    if (!user?.id || !pendingIntervention) return;
    await acceptIntervention(user.id, pendingIntervention);
  };

  const handleDeclineIntervention = async () => {
    if (!user?.id || !pendingIntervention) return;
    await declineIntervention(user.id, pendingIntervention);
  };

  const handleCompleteChallenge = async (challengeId: string) => {
    await completeChallenge(challengeId);
  };

  // Daily task handlers
  const handleDailyTaskPress = (task: DailyTask) => {
    setSelectedDailyTask(task);
    setShowDailyTaskModal(true);
  };

  const handleDailyTaskComplete = async (taskId: string, isCompleted: boolean) => {
    if (!user?.id) return;
    if (isCompleted) {
      await uncompleteDailyTask(user.id, taskId);
    } else {
      await completeDailyTask(user.id, taskId);
    }
  };

  const handleDailyTaskRefresh = async () => {
    if (!user?.id) return;
    await refreshDailyTasks(user.id);
  };

  const handleDailyTaskAskAI = () => {
    setShowDailyTaskModal(false);
    navigation.navigate('Chat', {
      initialMessage: `I'm trying to "${selectedDailyTask?.title}" but I need help. Can you guide me?`,
    });
  };

  const handleDailyTaskModalComplete = async () => {
    if (!user?.id || !selectedDailyTask) return;
    const isCompleted = dailyTaskCompletions[selectedDailyTask.id] || false;
    if (isCompleted) {
      await uncompleteDailyTask(user.id, selectedDailyTask.id);
    } else {
      await completeDailyTask(user.id, selectedDailyTask.id);
    }
  };

  const handleSubmitFeedback = async (rating: DailyFeedbackRating) => {
    if (!user?.id) return;
    await submitDailyFeedback(user.id, rating);
    setShowFeedbackModal(false);
  };

  if (!user?.id) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: '#FFF0F5' }}
        edges={['top']}
      >
        <Text className="text-warmGray">Preparing your space...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF0F5' }}>
      {/* Ayah of the Day Overlay */}
      <AyahOverlay onDismiss={handleAyahDismiss} />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Scroll blur effect overlay */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: BLUR_HEIGHT,
            zIndex: 10,
            opacity: blurOpacity,
          }}
          pointerEvents="none"
        >
          <LinearGradient
            colors={['#FFF0F5', 'rgba(255, 240, 245, 0)']}
            style={{ flex: 1 }}
          />
        </Animated.View>

        <Animated.ScrollView
          style={{ flex: 1 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#FF69B4"
            />
          }
        >
          {/* Header */}
          <View className="px-6 pt-4 pb-2 flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Pressable
                onPress={() => navigation.navigate('Settings')}
                className="p-2 mr-2"
              >
                <Text style={{ fontSize: 22 }}>☰</Text>
              </Pressable>
            </View>

            <View className="flex-row items-center">
              {/* Mail icon */}
              <Pressable className="p-2 mr-2">
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>💌</Text>
                </View>
              </Pressable>

              {/* Add button */}
              <Pressable className="p-2">
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    backgroundColor: '#4FC3F7',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <Text style={{ fontSize: 20, color: '#FFFFFF' }}>+</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Character Animation Video */}
          <View
            style={{
              height: CHARACTER_SPACE_HEIGHT,
              marginHorizontal: 16,
              marginBottom: 16,
              borderRadius: 24,
              overflow: 'hidden',
              backgroundColor: '#B2EBF2',
            }}
          >
            <Video
              source={require('../../assets/ONBOARDING-ASSETS/animation-video.mp4')}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode={ResizeMode.COVER}
              shouldPlay
              isLooping
              isMuted
            />
          </View>

          {/* Main Content */}
          <View className="px-4">
            {/* Wellness Indicator - Compact */}
            {wellnessScore !== null && (
              <WellnessIndicator
                score={wellnessScore}
                tips={tips}
                onPress={() => navigation.navigate('Garden' as any)}
              />
            )}

            {/* Active Challenges */}
            <ChallengeList
              challenges={activeChallenges}
              onCompleteChallenge={handleCompleteChallenge}
            />

            {/* Daily Tasks Section - Main content */}
            <DailyTasksSection
              todaysTasks={todaysTasks}
              completions={dailyTaskCompletions}
              completionPercentage={dailyTaskPercentage}
              onTaskPress={handleDailyTaskPress}
              onTaskComplete={handleDailyTaskComplete}
              onRefresh={handleDailyTaskRefresh}
            />
          </View>

          {/* Bottom spacing */}
          <View style={{ height: 100 }} />
        </Animated.ScrollView>
      </SafeAreaView>

      <DailyTaskDetailModal
        visible={showDailyTaskModal}
        task={selectedDailyTask}
        isCompleted={
          selectedDailyTask ? dailyTaskCompletions[selectedDailyTask.id] || false : false
        }
        onClose={() => {
          setShowDailyTaskModal(false);
          setSelectedDailyTask(null);
        }}
        onComplete={handleDailyTaskModalComplete}
        onAskAI={handleDailyTaskAskAI}
      />

      <DailyFeedbackModal
        visible={showFeedbackModal}
        onSubmit={handleSubmitFeedback}
        onClose={() => setShowFeedbackModal(false)}
      />

      {/* Quick Capture FAB */}
      <QuickCaptureButton onPress={openQuickCapture} />

      {/* Quick Capture Tooltip (first-time onboarding) */}
      <QuickCaptureTooltip visible={showTooltip} onDismiss={dismissTooltip} />

      {/* Quick Capture Sheet */}
      {user?.id && (
        <QuickCaptureSheet
          visible={isQuickCaptureOpen}
          userId={user.id}
          onClose={closeQuickCapture}
        />
      )}

      {/* Coaching Intervention Modal */}
      <CoachingModal
        visible={isInterventionModalVisible}
        trigger={pendingIntervention}
        onAccept={handleAcceptIntervention}
        onDecline={handleDeclineIntervention}
      />
    </View>
  );
}
