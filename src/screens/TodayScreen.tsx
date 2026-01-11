import React, { useEffect, useRef, useState } from 'react';
import { Animated, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Cog6ToothIcon } from 'react-native-heroicons/outline';
import { CheckCircleIcon } from 'react-native-heroicons/solid';

import {
  QuickCaptureButton,
  QuickCaptureSheet,
  QuickCaptureTooltip,
  useQuickCaptureTooltip,
} from '@/components/character';
import { IconButton } from '@/components/common/IconButton';
import { CoachingModal } from '@/components/coaching';
import { AyahOverlay, useAyahOverlay } from '@/components/today/AyahOverlay';
import { DailyFeedbackModal } from '@/components/today/DailyFeedbackModal';
import { TodayColors, TodayRadii, TodaySpacing, TodayShadows, TodayTypography } from '@/constants/todayTokens';
import type { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { useCharacterStore } from '@/store/characterStore';
import { useCoachingStore } from '@/store/coachingStore';
import { useDailyTasksStore } from '@/store/dailyTasksStore';
import { useJourneyStore } from '@/store/journeyStore';
import { useMissionStore } from '@/store/missionStore';
import type { DailyTask, DailyFeedbackRating } from '@/types/models';

const SCREEN_GUTTER = TodaySpacing[16];
const BACKGROUND_TOP_HEIGHT = 280; // Height of the top scene to keep visible

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Today'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function TodayScreen({ navigation }: Props) {
  const user = useAuthStore((state) => state.user);

  // Scroll animation for header reveal effect
  const scrollY = useRef(new Animated.Value(0)).current;

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

  // Journey store
  const journeyPhotos = useJourneyStore((state) => state.photos);

  // Quick Capture tooltip (onboarding)
  const { showTooltip, dismissTooltip } = useQuickCaptureTooltip();

  // Ayah overlay
  const { handleAyahDismiss } = useAyahOverlay();

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<DailyTask | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    setSelectedTask(task);
  };

  const handleDailyTaskComplete = async (taskId: string, isCompleted: boolean) => {
    if (!user?.id) return;
    if (isCompleted) {
      await uncompleteDailyTask(user.id, taskId);
    } else {
      await completeDailyTask(user.id, taskId);
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
        style={{ backgroundColor: TodayColors.bgApp }}
        edges={['top']}
      >
        <Text style={{ color: TodayColors.textMuted, fontFamily: TodayTypography.poppinsSemiBold }}>
          Preparing your space...
        </Text>
      </SafeAreaView>
    );
  }

  const allTasks = [...todaysTasks.dayTasks, ...todaysTasks.niceToHaveTasks];
  const completedCount = allTasks.filter((t) => dailyTaskCompletions[t.id]).length;
  const goalsLeft = Math.max(0, allTasks.length - completedCount);

  // Check if photo captured today
  const today = format(new Date(), 'yyyy-MM-dd');
  const capturedToday = journeyPhotos.some((p) => p.photo_date === today);

  // Animation: header image fades out as user scrolls down
  const SCROLL_THRESHOLD = 200;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#FFE4EF' }}>
      {/* Ayah of the Day Overlay */}
      <AyahOverlay onDismiss={handleAyahDismiss} />

      {/* Fixed Background Image - fades as user scrolls */}
      <Animated.View style={[styles.backgroundImageContainer, { opacity: headerOpacity }]}>
        <ImageBackground
          source={require('../../assets/today.jpeg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Settings button - fixed at top */}
      <SafeAreaView style={styles.headerContainer} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <IconButton
            onPress={() => navigation.navigate('Settings')}
            accessibilityRole="button"
            accessibilityLabel="Open settings"
            icon={<Cog6ToothIcon size={24} color={TodayColors.textPrimary} />}
          />
        </View>
      </SafeAreaView>

      {/* Scrollable Content */}
      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Spacer for header scene visibility */}
        <View style={{ height: BACKGROUND_TOP_HEIGHT }} />

        {/* Content Area - Pinkish section with rounded top corners */}
        <View style={styles.contentContainer}>
          {/* Adventure Progress Bar */}
          <View style={styles.adventureSection}>
            <View style={styles.adventureBadge}>
              <Text style={styles.adventureBadgeIcon}>⚡</Text>
              <View style={styles.adventureTextContainer}>
                <Text style={styles.adventureTitle}>77th Adventure</Text>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBarTrack}>
                    <View style={[styles.progressBarFill, { width: '43%' }]} />
                  </View>
                  <Text style={styles.progressText}>15 / 35</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Goals Left Counter */}
          <View style={styles.goalsLeftSection}>
            <View style={styles.goalsLeftBadge}>
              <Text style={styles.goalsLeftIcon}>📋</Text>
              <Text style={styles.goalsLeftText}>
                {goalsLeft} {goalsLeft === 1 ? 'goal' : 'goals'} left for today!
              </Text>
              <View style={styles.goalsBadgeCircle}>
                <Text style={styles.goalsBadgeText}>+</Text>
              </View>
            </View>
          </View>

          {/* Task List */}
          <View style={styles.taskListContainer}>
            {allTasks.map((task, index) => (
              <TaskButton
                key={task.id}
                task={task}
                isCompleted={!!dailyTaskCompletions[task.id]}
                onPress={() => handleDailyTaskPress(task)}
                onToggleComplete={() => handleDailyTaskComplete(task.id, !!dailyTaskCompletions[task.id])}
              />
            ))}

            {/* Completion Celebration Card - Prompt to capture photo */}
            {goalsLeft === 0 && allTasks.length > 0 && !capturedToday && (
              <View style={styles.completionCard}>
                <Text style={styles.completionEmoji}>🎉</Text>
                <Text style={styles.completionTitle}>MashAllah! All Done!</Text>
                <Text style={styles.completionSubtitle}>
                  You completed all tasks today!
                </Text>

                <Pressable
                  style={({ pressed }) => [
                    styles.capturePhotoButton,
                    pressed && styles.capturePhotoButtonPressed,
                  ]}
                  onPress={() => navigation.navigate('Journey' as any)}
                >
                  <Text style={styles.capturePhotoIcon}>📸</Text>
                  <Text style={styles.capturePhotoText}>Capture Today's Memory</Text>
                </Pressable>

                <Text style={styles.completionHint}>
                  Save this beautiful moment in your Journey
                </Text>
              </View>
            )}

            {/* Already Captured - Show Celebration Only */}
            {goalsLeft === 0 && allTasks.length > 0 && capturedToday && (
              <View style={styles.completionCardSimple}>
                <Text style={styles.completionEmoji}>🎉</Text>
                <Text style={styles.completionTitle}>MashAllah! All Done!</Text>
                <Text style={styles.completionSubtitle}>
                  You've completed all tasks and captured today's memory!
                </Text>
              </View>
            )}

            {/* Bottom spacing for tab bar */}
            <View style={{ height: 100 }} />
          </View>
        </View>
      </Animated.ScrollView>

      {/* Task Detail Modal */}
      <Modal
        visible={selectedTask !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedTask(null)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: TodayColors.bgApp }}>
          <TaskDetailContent
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        </SafeAreaView>
      </Modal>

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

// TaskButton Component - Duolingo-style 3D chunky button
interface TaskButtonProps {
  task: DailyTask;
  isCompleted: boolean;
  onPress: () => void;
  onToggleComplete: () => void;
}

function TaskButton({ task, isCompleted, onPress, onToggleComplete }: TaskButtonProps) {
  const shadowHeight = 6;

  return (
    <Pressable onPress={onPress} style={styles.taskButtonWrapper}>
      {({ pressed }) => {
        const translateY = pressed ? shadowHeight : 0;
        const currentShadowHeight = pressed ? 0 : shadowHeight;

        return (
          <View style={{ width: '100%' }}>
            {/* Shadow layer - EXACT Duolingo style */}
            <View
              style={[
                {
                  position: 'absolute',
                  top: shadowHeight,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: '#9CA3AF',
                  borderRadius: 20,
                },
                isCompleted && { backgroundColor: '#4ADE80' },
              ]}
            />

            {/* Main button surface */}
            <View
              style={[
                styles.taskButtonContent,
                {
                  transform: [{ translateY }],
                  marginBottom: currentShadowHeight,
                },
                isCompleted && styles.taskButtonContentCompleted,
              ]}
            >
              {/* Icon */}
              <View style={[styles.taskIconContainer, isCompleted && styles.taskIconContainerCompleted]}>
                <Text style={styles.taskIcon}>{task.icon || '✨'}</Text>
              </View>

              {/* Task Text */}
              <Text
                style={[styles.taskText, isCompleted && styles.taskTextCompleted]}
                numberOfLines={2}
              >
                {task.title}
              </Text>

              {/* Checkmark - Tappable */}
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  onToggleComplete();
                }}
                hitSlop={12}
                style={styles.checkmarkPressable}
              >
                {isCompleted ? (
                  <View style={styles.checkmarkCircleCompleted}>
                    <CheckCircleIcon size={30} color={TodayColors.success} />
                  </View>
                ) : (
                  <View style={styles.checkmarkCircleEmpty} />
                )}
              </Pressable>
            </View>
          </View>
        );
      }}
    </Pressable>
  );
}

// TaskDetailContent Component
interface TaskDetailContentProps {
  task: DailyTask | null;
  onClose: () => void;
}

function TaskDetailContent({ task, onClose }: TaskDetailContentProps) {
  if (!task) return null;

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.detailHeader}>
        <Text style={styles.detailTitle}>Task Details</Text>
        <Pressable onPress={onClose} hitSlop={10}>
          <Text style={styles.detailCloseButton}>✕</Text>
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView style={styles.detailContent} contentContainerStyle={styles.detailContentContainer}>
        <View style={styles.detailIconContainer}>
          <Text style={styles.detailIcon}>{task.icon || '✨'}</Text>
        </View>

        <Text style={styles.detailTaskTitle}>{task.title}</Text>

        {task.description && (
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>Description</Text>
            <Text style={styles.detailSectionText}>{task.description}</Text>
          </View>
        )}

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>Category</Text>
          <Text style={styles.detailSectionText}>{task.category}</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>Age Group</Text>
          <Text style={styles.detailSectionText}>{task.age_appropriate}</Text>
        </View>

        {task.tags && task.tags.length > 0 && (
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {task.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: BACKGROUND_TOP_HEIGHT + 100, // Extend slightly below the visible area
    zIndex: 0,
  },
  backgroundImage: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    paddingHorizontal: SCREEN_GUTTER,
    paddingTop: TodaySpacing[8],
    paddingBottom: TodaySpacing[8],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    minHeight: 800, // Ensure content extends to fill screen
    backgroundColor: '#FFE4EF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: TodaySpacing[16],
    paddingHorizontal: SCREEN_GUTTER,
  },
  taskListContainer: {
    paddingBottom: TodaySpacing[20],
  },
  adventureSection: {
    marginBottom: TodaySpacing[12],
  },
  adventureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: TodayRadii.xl,
    padding: TodaySpacing[12],
    ...TodayShadows.softFloat,
  },
  adventureBadgeIcon: {
    fontSize: 32,
    marginRight: TodaySpacing[12],
  },
  adventureTextContainer: {
    flex: 1,
  },
  adventureTitle: {
    fontSize: TodayTypography.h3.fontSize,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textPrimary,
    marginBottom: TodaySpacing[6],
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: TodaySpacing[8],
  },
  progressBarTrack: {
    flex: 1,
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: TodayRadii.pill,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FCD34D',
    borderRadius: TodayRadii.pill,
  },
  progressText: {
    fontSize: TodayTypography.body.fontSize,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textSecondary,
  },
  goalsLeftSection: {
    marginBottom: TodaySpacing[16],
  },
  goalsLeftBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: TodayRadii.xl,
    padding: TodaySpacing[12],
    ...TodayShadows.softFloat,
  },
  goalsLeftIcon: {
    fontSize: 24,
    marginRight: TodaySpacing[10],
  },
  goalsLeftText: {
    flex: 1,
    fontSize: TodayTypography.bodyLarge.fontSize,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.textPrimary,
  },
  goalsBadgeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: TodayColors.infoBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalsBadgeText: {
    fontSize: 18,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.ctaSecondary,
  },
  // Duolingo-style 3D Button Wrapper
  taskButtonWrapper: {
    marginBottom: 18,
  },
  taskButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 3,
    borderColor: '#E5E7EB',
  },
  taskButtonContentCompleted: {
    opacity: 0.85,
  },
  taskIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  taskIconContainerCompleted: {
    backgroundColor: '#D1FAE5',
  },
  taskIcon: {
    fontSize: 26,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: '#1F2937',
    marginRight: 12,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  checkmarkPressable: {
    padding: 2,
  },
  checkmarkCircleCompleted: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkCircleEmpty: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    borderWidth: 3,
    borderColor: '#D1D5DB',
  },
  // Completion Card Styles
  completionCard: {
    marginTop: TodaySpacing[20],
    backgroundColor: '#FFFFFF',
    borderRadius: TodayRadii.xl,
    padding: TodaySpacing[24],
    alignItems: 'center',
    borderWidth: 3,
    borderColor: TodayColors.success,
    ...TodayShadows.softFloat,
  },
  completionEmoji: {
    fontSize: 48,
    marginBottom: TodaySpacing[12],
  },
  completionTitle: {
    fontSize: TodayTypography.h2.fontSize,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textPrimary,
    marginBottom: TodaySpacing[6],
    textAlign: 'center',
  },
  completionSubtitle: {
    fontSize: TodayTypography.bodyLarge.fontSize,
    fontFamily: TodayTypography.poppinsMedium,
    color: TodayColors.textSecondary,
    marginBottom: TodaySpacing[20],
    textAlign: 'center',
  },
  capturePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TodayColors.ctaPrimary,
    paddingVertical: TodaySpacing[14],
    paddingHorizontal: TodaySpacing[24],
    borderRadius: TodayRadii.lg,
    marginBottom: TodaySpacing[12],
    ...TodayShadows.softFloat,
  },
  capturePhotoButtonPressed: {
    backgroundColor: TodayColors.ctaPrimaryPressed,
    transform: [{ scale: 0.98 }],
  },
  capturePhotoIcon: {
    fontSize: 24,
    marginRight: TodaySpacing[10],
  },
  capturePhotoText: {
    fontSize: TodayTypography.bodyLarge.fontSize,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textInverse,
  },
  completionHint: {
    fontSize: TodayTypography.caption.fontSize,
    fontFamily: TodayTypography.poppinsMedium,
    color: TodayColors.textMuted,
    textAlign: 'center',
  },
  completionCardSimple: {
    marginTop: TodaySpacing[20],
    backgroundColor: '#FFFFFF',
    borderRadius: TodayRadii.xl,
    padding: TodaySpacing[24],
    alignItems: 'center',
    borderWidth: 3,
    borderColor: TodayColors.success,
    ...TodayShadows.softFloat,
  },
  // Detail Modal Styles
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCREEN_GUTTER,
    paddingVertical: TodaySpacing[16],
    borderBottomWidth: 1,
    borderBottomColor: TodayColors.strokeSubtle,
  },
  detailTitle: {
    fontSize: TodayTypography.h2.fontSize,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textPrimary,
  },
  detailCloseButton: {
    fontSize: 28,
    color: TodayColors.textMuted,
    fontWeight: '300',
  },
  detailContent: {
    flex: 1,
  },
  detailContentContainer: {
    padding: SCREEN_GUTTER,
  },
  detailIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: TodaySpacing[16],
  },
  detailIcon: {
    fontSize: 40,
  },
  detailTaskTitle: {
    fontSize: TodayTypography.h1.fontSize,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textPrimary,
    textAlign: 'center',
    marginBottom: TodaySpacing[24],
  },
  detailSection: {
    marginBottom: TodaySpacing[20],
  },
  detailSectionTitle: {
    fontSize: TodayTypography.h3.fontSize,
    fontFamily: TodayTypography.bricolageBold,
    color: TodayColors.textPrimary,
    marginBottom: TodaySpacing[8],
  },
  detailSectionText: {
    fontSize: TodayTypography.bodyLarge.fontSize,
    lineHeight: TodayTypography.bodyLarge.lineHeight,
    fontFamily: TodayTypography.poppinsMedium,
    color: TodayColors.textSecondary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: TodaySpacing[8],
  },
  tag: {
    backgroundColor: TodayColors.infoBg,
    borderRadius: TodayRadii.sm,
    paddingVertical: TodaySpacing[6],
    paddingHorizontal: TodaySpacing[12],
    borderWidth: 1,
    borderColor: TodayColors.infoBorder,
  },
  tagText: {
    fontSize: TodayTypography.caption.fontSize,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: TodayColors.ctaSecondary,
  },
});
