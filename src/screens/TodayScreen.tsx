import React, { useEffect, useRef, useState } from 'react';
import { Animated, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Cog6ToothIcon } from 'react-native-heroicons/outline';

import {
  QuickCaptureButton,
  QuickCaptureSheet,
  QuickCaptureTooltip,
  useQuickCaptureTooltip,
} from '@/components/character';
import { IconButton } from '@/components/common/IconButton';
import { ChallengeList, CoachingModal } from '@/components/coaching';
import { AyahOverlay, useAyahOverlay } from '@/components/today/AyahOverlay';
import { DailyFeedbackModal } from '@/components/today/DailyFeedbackModal';
import { DailyTaskCardsSection } from '@/components/today/DailyTaskCardsSection';
import { NoorAmbientZone } from '@/components/today/NoorAmbientZone';
import { ParentingPulse } from '@/components/today/ParentingPulse';
import { TodayColors, TodaySpacing, TodayTypography } from '@/constants/todayTokens';
import type { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { useCharacterStore } from '@/store/characterStore';
import { useCoachingStore } from '@/store/coachingStore';
import { useDailyTasksStore } from '@/store/dailyTasksStore';
import { useMissionStore } from '@/store/missionStore';
import type { DailyTask, DailyFeedbackRating } from '@/types/models';

const BLUR_HEIGHT = 60;
const SCREEN_GUTTER = TodaySpacing[16];

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Today'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function TodayScreen({ navigation }: Props) {
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
  const { handleAyahDismiss } = useAyahOverlay();

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isDeckInteracting, setIsDeckInteracting] = useState(false);
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
    navigation.navigate('DailyTaskDetail', { taskId: task.id });
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

  const handleSubmitFeedback = async (rating: DailyFeedbackRating) => {
    if (!user?.id) return;
    await submitDailyFeedback(user.id, rating);
    setShowFeedbackModal(false);
  };

  if (!user?.id) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: TodayColors.bgApp }}
        edges={['top']}
      >
        <Text style={{ color: TodayColors.textMuted, fontFamily: TodayTypography.poppinsSemiBold }}>
          Preparing your space...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: TodayColors.bgApp }}>
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
          <LinearGradient colors={[TodayColors.bgApp, 'rgba(255, 243, 247, 0)']} style={{ flex: 1 }} />
        </Animated.View>

        <Animated.ScrollView
          style={{ flex: 1 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          scrollEnabled={!isDeckInteracting}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={TodayColors.ctaSecondary}
            />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <IconButton
              onPress={() => navigation.navigate('Settings')}
              accessibilityRole="button"
              accessibilityLabel="Open settings"
              icon={<Cog6ToothIcon size={22} color={TodayColors.textSecondary} />}
            />
            <View style={styles.headerSpacer} />
          </View>

          {/* Noor's Ambient Zone - Immersive character window */}
          <NoorAmbientZone completionPercentage={dailyTaskPercentage} />

          {/* Main Content */}
          <View style={styles.content}>
            {/* Parenting Pulse - Transparent wellness indicator */}
            {wellnessScore !== null && (
              <View style={styles.pulseWrapper}>
                <ParentingPulse
                  score={wellnessScore}
                  tasksCompleted={Object.values(dailyTaskCompletions).filter(Boolean).length}
                  totalTasks={todaysTasks.dayTasks.length + todaysTasks.niceToHaveTasks.length}
                  streakDays={0}
                  onPress={() => navigation.navigate('Garden' as any)}
                />
              </View>
            )}

            {/* Active Challenges */}
            {activeChallenges.length > 0 && (
              <View style={styles.challengesWrapper}>
                <ChallengeList
                  challenges={activeChallenges}
                  onCompleteChallenge={handleCompleteChallenge}
                />
              </View>
            )}

            {/* Daily Tasks - "Your 7 for Today" */}
            <DailyTaskCardsSection
              todaysTasks={todaysTasks}
              completions={dailyTaskCompletions}
              completionPercentage={dailyTaskPercentage}
              onTaskPress={handleDailyTaskPress}
              onTaskComplete={handleDailyTaskComplete}
              onRefresh={handleDailyTaskRefresh}
              onDeckInteractionChange={setIsDeckInteracting}
            />
          </View>

          {/* Bottom spacing */}
          <View style={{ height: 100 }} />
        </Animated.ScrollView>
      </SafeAreaView>

      <DailyFeedbackModal
        visible={showFeedbackModal}
        onSubmit={handleSubmitFeedback}
        onClose={() => setShowFeedbackModal(false)}
      />

      {/* Quick Capture FAB */}
      <QuickCaptureButton onPress={openQuickCapture} pulse={showTooltip} />

      {/* Quick Capture Tooltip (first-time onboarding) */}
      <QuickCaptureTooltip visible={showTooltip} onDismiss={dismissTooltip} />

      {/* Quick Capture Sheet */}
      {user?.id && (
        <QuickCaptureSheet visible={isQuickCaptureOpen} userId={user.id} onClose={closeQuickCapture} />
      )}

      {/* Coaching Intervention Modal */}
      <CoachingModal visible={isInterventionModalVisible} trigger={pendingIntervention} onAccept={handleAcceptIntervention} onDecline={handleDeclineIntervention} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SCREEN_GUTTER,
    paddingTop: TodaySpacing[12],
    paddingBottom: TodaySpacing[8],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  content: {
    paddingHorizontal: SCREEN_GUTTER,
  },
  pulseWrapper: {
    marginBottom: TodaySpacing[16],
  },
  challengesWrapper: {
    marginBottom: TodaySpacing[16],
  },
});
