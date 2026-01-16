/**
 * TodayScreen - Main daily task screen with redesigned UI (V3)
 *
 * Layout Structure:
 * 1. Hero background (fixed, fades on scroll)
 * 2. Header bar (hamburger, heart, add button)
 * 3. Scrollable content:
 *    - Journey Progress Card (floating, overlaps hero)
 *    - Goals Left Section
 *    - Section Dividers with Task Cards
 *    - Completion celebration
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Components
import {
  TodayHeader,
  JourneyProgressCard,
  GoalsLeftSection,
  SectionDivider,
  TaskCard,
} from '@/components/today';
import {
  QuickCaptureButton,
  QuickCaptureSheet,
  QuickCaptureTooltip,
  useQuickCaptureTooltip,
} from '@/components/character';
import { CoachingModal } from '@/components/coaching';
import { AyahOverlay, useAyahOverlay } from '@/components/today/AyahOverlay';
import { DailyFeedbackModal } from '@/components/today/DailyFeedbackModal';

// Design System
import {
  TodayScreenColors,
  TodayScreenSpacing,
  TodayScreenRadii,
  TodayScreenTypography,
  TodayScreenShadows,
  TodayScreenMotion,
} from '@/constants/todayScreenTokens';

// Store & Types
import type { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { useCharacterStore } from '@/store/characterStore';
import { useCoachingStore } from '@/store/coachingStore';
import { useDailyTasksStore } from '@/store/dailyTasksStore';
import { useJourneyStore } from '@/store/journeyStore';
import { useMissionStore } from '@/store/missionStore';
import type { DailyTask, DailyFeedbackRating } from '@/types/models';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Constants
const HERO_HEIGHT = TodayScreenSpacing.heroHeight;
const SCROLL_THRESHOLD = TodayScreenMotion.headerFade.scrollThreshold;

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Today'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function TodayScreen({ navigation }: Props) {
  const user = useAuthStore((state) => state.user);

  // Scroll animation
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Daily tasks store
  const todaysTasks = useDailyTasksStore((state) => state.todaysTasks);
  const dailyTaskCompletions = useDailyTasksStore((state) => state.todayCompletions);
  const dailyTaskPercentage = useDailyTasksStore((state) => state.completionPercentage);
  const loadTodaysTasks = useDailyTasksStore((state) => state.loadTodaysTasks);
  const completeDailyTask = useDailyTasksStore((state) => state.completeTask);
  const uncompleteDailyTask = useDailyTasksStore((state) => state.uncompleteTask);
  const submitDailyFeedback = useDailyTasksStore((state) => state.submitDailyFeedback);
  const hasFeedbackForToday = useDailyTasksStore((state) => state.hasFeedbackForToday);
  const loadHPProgress = useDailyTasksStore((state) => state.loadHPProgress);

  // Mission store
  const loadTodaysMission = useMissionStore((state) => state.loadTodaysMission);

  // Character store (Quick Capture)
  const isQuickCaptureOpen = useCharacterStore((state) => state.isQuickCaptureOpen);
  const openQuickCapture = useCharacterStore((state) => state.openQuickCapture);
  const closeQuickCapture = useCharacterStore((state) => state.closeQuickCapture);
  const loadTrees = useCharacterStore((state) => state.loadTrees);

  // Coaching store
  const pendingIntervention = useCoachingStore((state) => state.pendingIntervention);
  const isInterventionModalVisible = useCoachingStore((state) => state.isInterventionModalVisible);
  const loadCoachingData = useCoachingStore((state) => state.loadCoachingData);
  const acceptIntervention = useCoachingStore((state) => state.acceptIntervention);
  const declineIntervention = useCoachingStore((state) => state.declineIntervention);

  // Journey store
  const journeyPhotos = useJourneyStore((state) => state.photos);

  // Quick Capture tooltip
  const { showTooltip, dismissTooltip } = useQuickCaptureTooltip();

  // Ayah overlay
  const { handleAyahDismiss } = useAyahOverlay();

  // Local state
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<DailyTask | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    startTheDay: true,
    anyTime: true,
  });
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load data on mount
  useEffect(() => {
    if (!user?.id) return;
    loadTodaysMission(user.id);
    loadTodaysTasks(user.id);
    loadHPProgress(user.id);
    loadTrees(user.id);
    loadCoachingData(user.id);
  }, [user?.id]);

  // Show feedback modal when all tasks complete
  useEffect(() => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
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
      }
    };
  }, [dailyTaskPercentage, showFeedbackModal, todaysTasks]);

  // Handlers
  const handleDailyTaskComplete = useCallback(async (taskId: string, isCompleted: boolean) => {
    if (!user?.id) return;
    if (isCompleted) {
      await uncompleteDailyTask(user.id, taskId);
    } else {
      await completeDailyTask(user.id, taskId);
    }
  }, [user?.id, completeDailyTask, uncompleteDailyTask]);

  const handleSubmitFeedback = useCallback(async (rating: DailyFeedbackRating) => {
    if (!user?.id) return;
    await submitDailyFeedback(user.id, rating);
    setShowFeedbackModal(false);
  }, [user?.id, submitDailyFeedback]);

  const handleAcceptIntervention = useCallback(async () => {
    if (!user?.id || !pendingIntervention) return;
    await acceptIntervention(user.id, pendingIntervention);
  }, [user?.id, pendingIntervention, acceptIntervention]);

  const handleDeclineIntervention = useCallback(async () => {
    if (!user?.id || !pendingIntervention) return;
    await declineIntervention(user.id, pendingIntervention);
  }, [user?.id, pendingIntervention, declineIntervention]);

  const toggleSection = (section: 'startTheDay' | 'anyTime') => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Animated styles
  const heroAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  // Loading state
  if (!user?.id) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={['top']}>
        <Text style={styles.loadingText}>Preparing your space...</Text>
      </SafeAreaView>
    );
  }

  // Calculate stats
  const allTasks = [...todaysTasks.dayTasks, ...todaysTasks.niceToHaveTasks];
  const completedCount = allTasks.filter((t) => dailyTaskCompletions[t.id]).length;
  const goalsLeft = Math.max(0, allTasks.length - completedCount);

  // Check if photo captured today
  const today = format(new Date(), 'yyyy-MM-dd');
  const capturedToday = journeyPhotos.some((p) => p.photo_date === today);

  // Separate tasks by time of day (morning vs anytime)
  const morningTasks = todaysTasks.dayTasks.filter(
    (t) => t.time_of_day === 'morning' || t.category?.includes('Prayer')
  );
  const anytimeTasks = [
    ...todaysTasks.dayTasks.filter(
      (t) => t.time_of_day !== 'morning' && !t.category?.includes('Prayer')
    ),
    ...todaysTasks.niceToHaveTasks,
  ];

  return (
    <View style={styles.container}>
      {/* Ayah Overlay */}
      <AyahOverlay onDismiss={handleAyahDismiss} />

      {/* Hero Background - Fades on scroll */}
      <Animated.View style={[styles.heroContainer, heroAnimatedStyle]}>
        <ImageBackground
          source={require('../../assets/todayscreenbg.jpeg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Header */}
      <TodayHeader
        onMenuPress={() => navigation.navigate('Settings')}
        onHeartPress={() => {}}
        onAddPress={openQuickCapture}
        showNotification={false}
      />

      {/* Scrollable Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        {/* Hero Spacer */}
        <View style={{ height: HERO_HEIGHT }} />

        {/* Content Area */}
        <View style={styles.contentContainer}>
          {/* Journey Progress Card (overlapping) */}
          <JourneyProgressCard
            journeyNumber={1}
            journeyTitle="Akhlaq Journey"
            currentProgress={completedCount}
            totalSteps={12}
          />

          {/* Goals Left */}
          <View style={styles.goalsSection}>
            <GoalsLeftSection
              goalsLeft={goalsLeft}
              onSparklePress={() => {}}
            />
          </View>

          {/* Start the Day Section */}
          {morningTasks.length > 0 && (
            <>
              <SectionDivider
                title="Start the day"
                isExpanded={expandedSections.startTheDay}
                onToggle={() => toggleSection('startTheDay')}
              />
              {expandedSections.startTheDay && (
                <View style={styles.taskList}>
                  {morningTasks.map((task, index) => (
                    <TaskCard
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      icon={task.icon}
                      category={task.category}
                      points={task.hp_value || 5}
                      isCompleted={!!dailyTaskCompletions[task.id]}
                      onComplete={() => handleDailyTaskComplete(task.id, !!dailyTaskCompletions[task.id])}
                      onPress={() => setSelectedTask(task)}
                      showMascot={index === 0}
                    />
                  ))}
                </View>
              )}
            </>
          )}

          {/* Any Time Section */}
          {anytimeTasks.length > 0 && (
            <>
              <SectionDivider
                title="Any time"
                isExpanded={expandedSections.anyTime}
                onToggle={() => toggleSection('anyTime')}
              />
              {expandedSections.anyTime && (
                <View style={styles.taskList}>
                  {anytimeTasks.map((task, index) => (
                    <TaskCard
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      icon={task.icon}
                      category={task.category}
                      points={task.hp_value || 5}
                      isCompleted={!!dailyTaskCompletions[task.id]}
                      onComplete={() => handleDailyTaskComplete(task.id, !!dailyTaskCompletions[task.id])}
                      onPress={() => setSelectedTask(task)}
                      showMascot={index === 1}
                    />
                  ))}
                </View>
              )}
            </>
          )}

          {/* Completion Celebration */}
          {goalsLeft === 0 && allTasks.length > 0 && !capturedToday && (
            <View style={styles.completionCard}>
              <Text style={styles.completionEmoji}>🎉</Text>
              <Text style={styles.completionTitle}>MashAllah! All Done!</Text>
              <Text style={styles.completionSubtitle}>
                You completed all tasks today!
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.captureButton,
                  pressed && styles.captureButtonPressed,
                ]}
                onPress={() => navigation.navigate('Journey' as any)}
              >
                <Text style={styles.captureButtonIcon}>📸</Text>
                <Text style={styles.captureButtonText}>Capture Today's Memory</Text>
              </Pressable>
              <Text style={styles.completionHint}>
                Save this beautiful moment in your Journey
              </Text>
            </View>
          )}

          {/* Already Captured */}
          {goalsLeft === 0 && allTasks.length > 0 && capturedToday && (
            <View style={styles.completionCardSimple}>
              <Text style={styles.completionEmoji}>🎉</Text>
              <Text style={styles.completionTitle}>MashAllah! All Done!</Text>
              <Text style={styles.completionSubtitle}>
                You've completed all tasks and captured today's memory!
              </Text>
            </View>
          )}

          {/* Bottom Spacer for Tab Bar */}
          <View style={{ height: TodayScreenSpacing.tabBarHeight + 20 }} />
        </View>
      </Animated.ScrollView>

      {/* Task Detail Modal */}
      <Modal
        visible={selectedTask !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedTask(null)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <TaskDetailContent
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        </SafeAreaView>
      </Modal>

      {/* Feedback Modal */}
      <DailyFeedbackModal
        visible={showFeedbackModal}
        onSubmit={handleSubmitFeedback}
        onClose={() => setShowFeedbackModal(false)}
      />

      {/* Quick Capture FAB */}
      <QuickCaptureButton onPress={openQuickCapture} pulse={showTooltip} />

      {/* Quick Capture Tooltip */}
      <QuickCaptureTooltip visible={showTooltip} onDismiss={dismissTooltip} />

      {/* Quick Capture Sheet */}
      {user?.id && (
        <QuickCaptureSheet
          visible={isQuickCaptureOpen}
          userId={user.id}
          onClose={closeQuickCapture}
        />
      )}

      {/* Coaching Modal */}
      <CoachingModal
        visible={isInterventionModalVisible}
        trigger={pendingIntervention}
        onAccept={handleAcceptIntervention}
        onDecline={handleDeclineIntervention}
      />
    </View>
  );
}

// Task Detail Content Component
interface TaskDetailContentProps {
  task: DailyTask | null;
  onClose: () => void;
}

function TaskDetailContent({ task, onClose }: TaskDetailContentProps) {
  if (!task) return null;

  return (
    <View style={styles.detailContainer}>
      {/* Header */}
      <View style={styles.detailHeader}>
        <Text style={styles.detailTitle}>Task Details</Text>
        <Pressable onPress={onClose} hitSlop={10}>
          <Text style={styles.detailCloseButton}>✕</Text>
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView style={styles.detailContent}>
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

        {task.benefit_text && (
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>Why This Matters</Text>
            <Text style={styles.detailSectionText}>{task.benefit_text}</Text>
          </View>
        )}

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>Category</Text>
          <Text style={styles.detailSectionText}>{task.category}</Text>
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TodayScreenColors.bgApp,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TodayScreenColors.bgApp,
  },
  loadingText: {
    fontSize: TodayScreenTypography.body.fontSize,
    fontFamily: TodayScreenTypography.fontMedium,
    color: TodayScreenColors.textMuted,
  },
  heroContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HERO_HEIGHT + 100,
    zIndex: 0,
  },
  heroImage: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    minHeight: 800,
    backgroundColor: TodayScreenColors.bgApp,
    borderTopLeftRadius: TodayScreenRadii.contentContainer,
    borderTopRightRadius: TodayScreenRadii.contentContainer,
    paddingTop: TodayScreenSpacing.lg,
  },
  goalsSection: {
    marginTop: TodayScreenSpacing.lg,
  },
  taskList: {
    paddingBottom: TodayScreenSpacing.sm,
  },
  // Completion Card
  completionCard: {
    marginTop: TodayScreenSpacing.xl,
    marginHorizontal: TodayScreenSpacing.screenGutter,
    backgroundColor: TodayScreenColors.bgCard,
    borderRadius: TodayScreenRadii.lg,
    padding: TodayScreenSpacing.xxl,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: TodayScreenColors.success,
    ...TodayScreenShadows.card,
  },
  completionCardSimple: {
    marginTop: TodayScreenSpacing.xl,
    marginHorizontal: TodayScreenSpacing.screenGutter,
    backgroundColor: TodayScreenColors.bgCard,
    borderRadius: TodayScreenRadii.lg,
    padding: TodayScreenSpacing.xxl,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: TodayScreenColors.success,
    ...TodayScreenShadows.card,
  },
  completionEmoji: {
    fontSize: 48,
    marginBottom: TodayScreenSpacing.md,
  },
  completionTitle: {
    fontSize: TodayScreenTypography.h2.fontSize,
    fontFamily: TodayScreenTypography.fontBold,
    color: TodayScreenColors.textPrimary,
    marginBottom: TodayScreenSpacing.xs,
    textAlign: 'center',
  },
  completionSubtitle: {
    fontSize: TodayScreenTypography.bodyLarge.fontSize,
    fontFamily: TodayScreenTypography.fontMedium,
    color: TodayScreenColors.textSecondary,
    marginBottom: TodayScreenSpacing.xl,
    textAlign: 'center',
  },
  captureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TodayScreenColors.primary,
    paddingVertical: TodayScreenSpacing.cardPadding,
    paddingHorizontal: TodayScreenSpacing.xxl,
    borderRadius: TodayScreenRadii.md,
    marginBottom: TodayScreenSpacing.md,
    ...TodayScreenShadows.buttonLedge,
  },
  captureButtonPressed: {
    backgroundColor: TodayScreenColors.primaryPressed,
    transform: [{ scale: 0.98 }],
  },
  captureButtonIcon: {
    fontSize: 24,
    marginRight: TodayScreenSpacing.md - 2,
  },
  captureButtonText: {
    fontSize: TodayScreenTypography.bodyLarge.fontSize,
    fontFamily: TodayScreenTypography.fontBold,
    color: TodayScreenColors.textInverse,
  },
  completionHint: {
    fontSize: TodayScreenTypography.caption.fontSize,
    fontFamily: TodayScreenTypography.fontMedium,
    color: TodayScreenColors.textMuted,
    textAlign: 'center',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: TodayScreenColors.bgApp,
  },
  detailContainer: {
    flex: 1,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: TodayScreenSpacing.screenGutter,
    paddingVertical: TodayScreenSpacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: TodayScreenColors.strokeSubtle,
  },
  detailTitle: {
    fontSize: TodayScreenTypography.h2.fontSize,
    fontFamily: TodayScreenTypography.fontBold,
    color: TodayScreenColors.textPrimary,
  },
  detailCloseButton: {
    fontSize: 28,
    color: TodayScreenColors.textMuted,
    fontWeight: '300',
  },
  detailContent: {
    flex: 1,
    padding: TodayScreenSpacing.screenGutter,
  },
  detailIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: TodayScreenColors.iconBgDefault,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: TodayScreenSpacing.lg,
  },
  detailIcon: {
    fontSize: 40,
  },
  detailTaskTitle: {
    fontSize: TodayScreenTypography.h1.fontSize,
    fontFamily: TodayScreenTypography.fontBold,
    color: TodayScreenColors.textPrimary,
    textAlign: 'center',
    marginBottom: TodayScreenSpacing.xxl,
  },
  detailSection: {
    marginBottom: TodayScreenSpacing.xl,
  },
  detailSectionTitle: {
    fontSize: TodayScreenTypography.h3.fontSize,
    fontFamily: TodayScreenTypography.fontBold,
    color: TodayScreenColors.textPrimary,
    marginBottom: TodayScreenSpacing.sm,
  },
  detailSectionText: {
    fontSize: TodayScreenTypography.bodyLarge.fontSize,
    lineHeight: TodayScreenTypography.bodyLarge.lineHeight,
    fontFamily: TodayScreenTypography.fontMedium,
    color: TodayScreenColors.textSecondary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: TodayScreenSpacing.sm,
  },
  tag: {
    backgroundColor: TodayScreenColors.primaryBg,
    borderRadius: TodayScreenRadii.sm,
    paddingVertical: TodayScreenSpacing.xs + 2,
    paddingHorizontal: TodayScreenSpacing.md,
    borderWidth: 1,
    borderColor: TodayScreenColors.primaryBorder,
  },
  tagText: {
    fontSize: TodayScreenTypography.caption.fontSize,
    fontFamily: TodayScreenTypography.fontSemiBold,
    color: TodayScreenColors.primary,
  },
});
