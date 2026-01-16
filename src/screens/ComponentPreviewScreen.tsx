/**
 * ComponentPreviewScreen - Preview screen for Noor Design System components
 *
 * Duolingo-inspired gamified components for Islamic parenting app
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput as RNTextInput,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ComponentPreview'>;

// ============================================================================
// THEME CONSTANTS
// ============================================================================
const Colors = {
  emerald: { from: '#10b981', to: '#059669' },
  teal: { from: '#14b8a6', to: '#0d9488' },
  amber: { from: '#f59e0b', to: '#d97706' },
  rose: { from: '#fb7185', to: '#f43f5e' },
  green: { from: '#4ade80', to: '#22c55e' },
  purple: { from: '#a855f7', to: '#9333ea' },
  gray: { from: '#d1d5db', to: '#9ca3af' },
};

// ============================================================================
// 1-6: BUTTON COMPONENTS
// ============================================================================

interface PrimaryButtonProps {
  children: string;
  variant?: 'emerald' | 'teal' | 'amber';
  icon?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

function PrimaryButton({
  children,
  variant = 'emerald',
  icon,
  onPress,
  disabled,
}: PrimaryButtonProps) {
  const gradients = {
    emerald: ['#34d399', '#059669'] as const,
    teal: ['#2dd4bf', '#0d9488'] as const,
    amber: ['#fbbf24', '#d97706'] as const,
  };
  const borderColors = {
    emerald: '#065f46',
    teal: '#115e59',
    amber: '#92400e',
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.primaryButton,
        pressed && styles.primaryButtonPressed,
        disabled && styles.buttonDisabled,
      ]}
    >
      {({ pressed }) => (
        <LinearGradient
          colors={gradients[variant]}
          style={[
            styles.primaryButtonGradient,
            { borderBottomColor: borderColors[variant] },
            pressed && styles.primaryButtonGradientPressed,
          ]}
        >
          {icon && <View style={styles.buttonIcon}>{icon}</View>}
          <Text style={styles.primaryButtonText}>{children}</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

function SecondaryButton({ children, onPress }: { children: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.secondaryButton,
        pressed && styles.secondaryButtonPressed,
      ]}
    >
      <Text style={styles.secondaryButtonText}>{children}</Text>
    </Pressable>
  );
}

function SuccessButton({ children, onPress }: { children: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        pressed && styles.primaryButtonPressed,
      ]}
    >
      {({ pressed }) => (
        <LinearGradient
          colors={['#4ade80', '#22c55e']}
          style={[
            styles.primaryButtonGradient,
            { borderBottomColor: '#166534' },
            pressed && styles.primaryButtonGradientPressed,
          ]}
        >
          <Text style={styles.checkIcon}>✓</Text>
          <Text style={styles.primaryButtonText}>{children}</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

function LockedButton({ children }: { children: string }) {
  return (
    <View style={styles.lockedButton}>
      <LinearGradient
        colors={['#d1d5db', '#9ca3af']}
        style={[styles.primaryButtonGradient, { borderBottomColor: '#6b7280' }]}
      >
        <Text style={styles.lockIcon}>🔒</Text>
        <Text style={styles.lockedButtonText}>{children}</Text>
      </LinearGradient>
    </View>
  );
}

function DangerButton({ children, onPress }: { children: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        pressed && styles.primaryButtonPressed,
      ]}
    >
      {({ pressed }) => (
        <LinearGradient
          colors={['#fb7185', '#f43f5e']}
          style={[
            styles.primaryButtonGradient,
            { borderBottomColor: '#9f1239' },
            pressed && styles.primaryButtonGradientPressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>{children}</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

function FloatingActionButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.fab}>
      <LinearGradient colors={['#2dd4bf', '#0d9488']} style={styles.fabGradient}>
        <Text style={styles.fabIcon}>✨</Text>
      </LinearGradient>
    </Pressable>
  );
}

// ============================================================================
// 7-11: CARD COMPONENTS
// ============================================================================

interface TaskCardProps {
  title: string;
  duration: string;
  icon: string;
  completed: boolean;
  onPress?: () => void;
}

function TaskCard({ title, duration, icon, completed, onPress }: TaskCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.taskCard,
        completed && styles.taskCardCompleted,
        pressed && styles.taskCardPressed,
      ]}
    >
      <View style={[styles.taskIconContainer, completed && styles.taskIconCompleted]}>
        {completed ? (
          <Text style={styles.taskCheckIcon}>✓</Text>
        ) : (
          <Text style={styles.taskIcon}>{icon}</Text>
        )}
      </View>
      <View style={styles.taskContent}>
        <Text style={[styles.taskTitle, completed && styles.taskTitleCompleted]}>{title}</Text>
        <Text style={styles.taskDuration}>{duration}</Text>
      </View>
    </Pressable>
  );
}

interface CharacterTraitCardProps {
  trait: string;
  progress: number;
  locked: boolean;
}

function CharacterTraitCard({ trait, progress, locked }: CharacterTraitCardProps) {
  return (
    <View style={[styles.traitCard, locked && styles.traitCardLocked]}>
      <View style={styles.traitHeader}>
        <View style={[styles.traitIconContainer, locked && styles.traitIconLocked]}>
          {locked ? (
            <Text style={styles.traitLockIcon}>🔒</Text>
          ) : (
            <Text style={styles.traitStarIcon}>⭐</Text>
          )}
        </View>
        <View style={styles.traitInfo}>
          <Text style={[styles.traitName, locked && styles.traitNameLocked]}>{trait}</Text>
          {!locked && <Text style={styles.traitProgress}>{progress}% Complete</Text>}
        </View>
      </View>
      {!locked && (
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={['#fbbf24', '#f97316']}
            style={[styles.progressFill, { width: `${progress}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
      )}
    </View>
  );
}

interface AchievementBadgeProps {
  title: string;
  unlocked: boolean;
}

function AchievementBadge({ title, unlocked }: AchievementBadgeProps) {
  return (
    <View style={styles.badgeContainer}>
      <View style={[styles.badge, unlocked ? styles.badgeUnlocked : styles.badgeLocked]}>
        <Text style={styles.badgeIcon}>🏆</Text>
      </View>
      <Text style={[styles.badgeTitle, !unlocked && styles.badgeTitleLocked]}>{title}</Text>
    </View>
  );
}

interface CoachingCardProps {
  message: string;
}

function CoachingCard({ message }: CoachingCardProps) {
  return (
    <LinearGradient
      colors={['#faf5ff', '#fce7f3']}
      style={styles.coachingCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.coachingContent}>
        <View style={styles.coachingAvatar}>
          <Text style={styles.coachingAvatarIcon}>💬</Text>
        </View>
        <View style={styles.coachingTextContainer}>
          <Text style={styles.coachingLabel}>AI Coach</Text>
          <Text style={styles.coachingMessage}>{message}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

interface StreakCardProps {
  days: number;
}

function StreakCard({ days }: StreakCardProps) {
  return (
    <LinearGradient
      colors={['#fb923c', '#ef4444']}
      style={styles.streakCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.streakContent}>
        <View>
          <Text style={styles.streakLabel}>Daily Streak</Text>
          <Text style={styles.streakDays}>{days}</Text>
        </View>
        <Text style={styles.streakFlame}>🔥</Text>
      </View>
    </LinearGradient>
  );
}

// ============================================================================
// 12-15: PROGRESS COMPONENTS
// ============================================================================

interface XPProgressBarProps {
  current: number;
  target: number;
}

function XPProgressBar({ current, target }: XPProgressBarProps) {
  const percentage = (current / target) * 100;
  return (
    <View style={styles.xpContainer}>
      <View style={styles.xpHeader}>
        <Text style={styles.xpLabel}>XP Progress</Text>
        <Text style={styles.xpValue}>
          {current} / {target}
        </Text>
      </View>
      <View style={styles.xpTrack}>
        <LinearGradient
          colors={['#2dd4bf', '#10b981']}
          style={[styles.xpFill, { width: `${percentage}%` }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>
    </View>
  );
}

interface CircularProgressProps {
  percentage: number;
}

function CircularProgress({ percentage }: CircularProgressProps) {
  return (
    <View style={styles.circularContainer}>
      <View style={styles.circularOuter}>
        <View style={styles.circularInner}>
          <Text style={styles.circularText}>{percentage}%</Text>
        </View>
      </View>
    </View>
  );
}

interface MilestoneTrackerProps {
  completed: number;
  total: number;
}

function MilestoneTracker({ completed, total }: MilestoneTrackerProps) {
  return (
    <View style={styles.milestoneContainer}>
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          <View
            style={[
              styles.milestone,
              i < completed && styles.milestoneCompleted,
              i === completed && styles.milestoneCurrent,
            ]}
          >
            {i < completed ? (
              <Text style={styles.milestoneCheck}>✓</Text>
            ) : i === completed ? (
              <Text style={styles.milestoneNumber}>{i + 1}</Text>
            ) : null}
          </View>
          {i < total - 1 && (
            <View style={[styles.milestoneLine, i < completed && styles.milestoneLineCompleted]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

// ============================================================================
// 16-20: INTERACTIVE ELEMENTS
// ============================================================================

interface ToggleSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

function ToggleSwitch({ value, onChange }: ToggleSwitchProps) {
  return (
    <Pressable onPress={() => onChange(!value)} style={styles.toggleContainer}>
      <View style={[styles.toggleTrack, value && styles.toggleTrackActive]}>
        <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
      </View>
    </Pressable>
  );
}

interface SelectionPillProps {
  options: string[];
  selected: number;
  onSelect: (index: number) => void;
}

function SelectionPill({ options, selected, onSelect }: SelectionPillProps) {
  return (
    <View style={styles.pillContainer}>
      {options.map((option, i) => (
        <Pressable
          key={i}
          onPress={() => onSelect(i)}
          style={[styles.pill, selected === i && styles.pillSelected]}
        >
          {selected === i && <Text style={styles.pillCheck}>✓</Text>}
          <Text style={[styles.pillText, selected === i && styles.pillTextSelected]}>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
}

interface ChecklistItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function ChecklistItem({ label, checked, onChange }: ChecklistItemProps) {
  return (
    <Pressable onPress={onChange} style={styles.checklistItem}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkboxIcon}>✓</Text>}
      </View>
      <Text style={[styles.checklistLabel, checked && styles.checklistLabelChecked]}>{label}</Text>
    </Pressable>
  );
}

interface RatingStarsProps {
  rating: number;
  onRate: (rating: number) => void;
}

function RatingStars({ rating, onRate }: RatingStarsProps) {
  return (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable key={star} onPress={() => onRate(star)} style={styles.starButton}>
          <Text style={[styles.star, star <= rating && styles.starFilled]}>★</Text>
        </Pressable>
      ))}
    </View>
  );
}

// ============================================================================
// 21-24: FEEDBACK COMPONENTS
// ============================================================================

interface SuccessToastProps {
  message: string;
  visible: boolean;
}

function SuccessToast({ message, visible }: SuccessToastProps) {
  if (!visible) return null;
  return (
    <View style={styles.toastContainer}>
      <LinearGradient colors={['#22c55e', '#16a34a']} style={styles.toast}>
        <Text style={styles.toastIcon}>✓</Text>
        <Text style={styles.toastMessage}>{message}</Text>
      </LinearGradient>
    </View>
  );
}

function LoadingSpinner() {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color="#14b8a6" />
    </View>
  );
}

// ============================================================================
// 25-27: INPUT COMPONENTS
// ============================================================================

interface TextInputProps {
  label: string;
  placeholder: string;
}

function TextInputField({ label, placeholder }: TextInputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <RNTextInput
        placeholder={placeholder}
        style={styles.textInput}
        placeholderTextColor="#9ca3af"
      />
    </View>
  );
}

interface TimePickerButtonProps {
  time?: string;
}

function TimePickerButton({ time }: TimePickerButtonProps) {
  return (
    <Pressable style={styles.timePickerButton}>
      <Text style={styles.timePickerIcon}>🕐</Text>
      <Text style={styles.timePickerText}>{time || 'Set Time'}</Text>
    </Pressable>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ComponentPreviewScreen({ navigation }: Props) {
  const [selectedPill, setSelectedPill] = useState(0);
  const [toggleValue, setToggleValue] = useState(false);
  const [rating, setRating] = useState(0);
  const [checklist, setChecklist] = useState([false, false, false]);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Noor Component Library</Text>
          <Text style={styles.headerSubtitle}>
            Duolingo-inspired gamified components for Islamic parenting
          </Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buttons</Text>
          <View style={styles.buttonGrid}>
            <PrimaryButton variant="emerald" onPress={() => {}}>
              Start Activity
            </PrimaryButton>
            <PrimaryButton variant="teal" onPress={() => {}}>
              Continue
            </PrimaryButton>
            <PrimaryButton variant="amber" onPress={() => {}}>
              Earn Reward
            </PrimaryButton>
            <SecondaryButton onPress={() => {}}>Skip</SecondaryButton>
            <SuccessButton onPress={handleShowToast}>Complete Task</SuccessButton>
            <LockedButton>Premium Feature</LockedButton>
            <DangerButton onPress={() => {}}>Delete</DangerButton>
          </View>
        </View>

        {/* Cards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cards</Text>
          <View style={styles.cardGrid}>
            <TaskCard
              title="Teach Kindness Story"
              duration="5 minutes"
              icon="✨"
              completed={false}
              onPress={() => {}}
            />
            <TaskCard
              title="Practice Gratitude"
              duration="3 minutes"
              icon="⭐"
              completed={true}
              onPress={() => {}}
            />
            <CharacterTraitCard trait="Honesty (Sidq)" progress={67} locked={false} />
            <CharacterTraitCard trait="Patience (Sabr)" progress={0} locked={true} />
          </View>

          <View style={styles.badgeRow}>
            <AchievementBadge title="First Week" unlocked={true} />
            <AchievementBadge title="30 Day Streak" unlocked={false} />
          </View>

          <StreakCard days={7} />

          <View style={styles.spacer} />
          <CoachingCard message="Great progress today! Your consistency is building strong character foundations in your child." />
        </View>

        {/* Progress Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress Indicators</Text>
          <XPProgressBar current={340} target={500} />
          <View style={styles.spacer} />
          <View style={styles.centerContent}>
            <CircularProgress percentage={68} />
          </View>
          <View style={styles.spacer} />
          <MilestoneTracker completed={2} total={5} />
        </View>

        {/* Interactive Elements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interactive Elements</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Reminders:</Text>
            <ToggleSwitch value={toggleValue} onChange={setToggleValue} />
          </View>

          <View style={styles.spacer} />
          <Text style={styles.label}>Child's Age:</Text>
          <SelectionPill
            options={['3-5 years', '6-8 years', '9-12 years']}
            selected={selectedPill}
            onSelect={setSelectedPill}
          />

          <View style={styles.spacer} />
          <Text style={styles.label}>Morning Routine:</Text>
          {['Wake up with Fajr', 'Make bed together', 'Share breakfast gratitude'].map(
            (item, i) => (
              <ChecklistItem
                key={i}
                label={item}
                checked={checklist[i]}
                onChange={() => {
                  const newChecklist = [...checklist];
                  newChecklist[i] = !newChecklist[i];
                  setChecklist(newChecklist);
                }}
              />
            )
          )}

          <View style={styles.spacer} />
          <Text style={styles.label}>Rate this activity:</Text>
          <RatingStars rating={rating} onRate={setRating} />
        </View>

        {/* Inputs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input Components</Text>
          <TextInputField label="Child's Name" placeholder="Enter name..." />
          <View style={styles.spacer} />
          <TimePickerButton time="8:00 AM" />
        </View>

        {/* Feedback Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feedback Components</Text>
          <View style={styles.centerContent}>
            <LoadingSpinner />
          </View>
        </View>

        {/* Bottom Spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Toast */}
      <SuccessToast message="Task completed! +50 XP" visible={showToast} />

      {/* FAB */}
      <FloatingActionButton onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdfa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1f2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },

  // Section
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },

  // Buttons
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  primaryButtonPressed: {
    transform: [{ translateY: 2 }],
  },
  primaryButtonGradient: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderBottomWidth: 4,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonGradientPressed: {
    borderBottomWidth: 0,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginRight: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  checkIcon: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
  },
  lockIcon: {
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  secondaryButtonPressed: {
    backgroundColor: '#f3f4f6',
  },
  secondaryButtonText: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  lockedButton: {
    borderRadius: 16,
    overflow: 'hidden',
    opacity: 0.7,
  },
  lockedButtonText: {
    color: '#6b7280',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#0d9488',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabGradient: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: {
    fontSize: 28,
  },

  // Task Card
  cardGrid: {
    gap: 12,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    gap: 14,
  },
  taskCardCompleted: {
    backgroundColor: '#f0fdf4',
    borderColor: '#86efac',
  },
  taskCardPressed: {
    transform: [{ scale: 0.98 }],
  },
  taskIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#14b8a6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskIconCompleted: {
    backgroundColor: '#22c55e',
  },
  taskIcon: {
    fontSize: 28,
  },
  taskCheckIcon: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: '900',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  taskDuration: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },

  // Trait Card
  traitCard: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#fffbeb',
    borderWidth: 2,
    borderColor: '#fcd34d',
  },
  traitCardLocked: {
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
  },
  traitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  traitIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  traitIconLocked: {
    backgroundColor: '#d1d5db',
  },
  traitStarIcon: {
    fontSize: 28,
  },
  traitLockIcon: {
    fontSize: 24,
  },
  traitInfo: {
    flex: 1,
  },
  traitName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  traitNameLocked: {
    color: '#6b7280',
  },
  traitProgress: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  progressTrack: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },

  // Badge
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    marginBottom: 16,
  },
  badgeContainer: {
    alignItems: 'center',
  },
  badge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
  },
  badgeUnlocked: {
    backgroundColor: '#fbbf24',
    borderColor: '#fef3c7',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  badgeLocked: {
    backgroundColor: '#d1d5db',
    borderColor: '#9ca3af',
  },
  badgeIcon: {
    fontSize: 36,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 8,
    textAlign: 'center',
  },
  badgeTitleLocked: {
    color: '#6b7280',
  },

  // Coaching Card
  coachingCard: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e9d5ff',
  },
  coachingContent: {
    flexDirection: 'row',
    gap: 12,
  },
  coachingAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#a855f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coachingAvatarIcon: {
    fontSize: 20,
  },
  coachingTextContainer: {
    flex: 1,
  },
  coachingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#581c87',
    marginBottom: 4,
  },
  coachingMessage: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },

  // Streak Card
  streakCard: {
    padding: 20,
    borderRadius: 20,
    marginTop: 16,
  },
  streakContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  streakDays: {
    fontSize: 40,
    fontWeight: '900',
    color: '#ffffff',
    marginTop: 4,
  },
  streakFlame: {
    fontSize: 64,
  },

  // XP Progress
  xpContainer: {
    gap: 8,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },
  xpValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d9488',
  },
  xpTrack: {
    height: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    borderRadius: 8,
  },

  // Circular Progress
  circularContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: '#14b8a6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fdfa',
  },
  circularInner: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1f2937',
  },

  // Milestone Tracker
  milestoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  milestone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d1d5db',
    borderWidth: 2,
    borderColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneCompleted: {
    backgroundColor: '#14b8a6',
    borderColor: '#99f6e4',
  },
  milestoneCurrent: {
    backgroundColor: '#f59e0b',
    borderColor: '#fde68a',
  },
  milestoneCheck: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  milestoneNumber: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  milestoneLine: {
    flex: 1,
    height: 4,
    backgroundColor: '#d1d5db',
  },
  milestoneLineCompleted: {
    backgroundColor: '#14b8a6',
  },

  // Toggle
  toggleContainer: {},
  toggleTrack: {
    width: 56,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d1d5db',
    padding: 4,
  },
  toggleTrackActive: {
    backgroundColor: '#14b8a6',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleThumbActive: {
    transform: [{ translateX: 24 }],
  },

  // Selection Pills
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    gap: 6,
  },
  pillSelected: {
    backgroundColor: '#14b8a6',
  },
  pillCheck: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  pillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  pillTextSelected: {
    color: '#ffffff',
  },

  // Checklist
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#14b8a6',
    borderColor: '#0d9488',
  },
  checkboxIcon: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  checklistLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#1f2937',
  },
  checklistLabelChecked: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },

  // Stars
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  starButton: {
    padding: 4,
  },
  star: {
    fontSize: 32,
    color: '#d1d5db',
  },
  starFilled: {
    color: '#fbbf24',
  },

  // Toast
  toastContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 100,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  toastIcon: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
  },
  toastMessage: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },

  // Spinner
  spinnerContainer: {
    padding: 20,
  },

  // Input
  inputContainer: {
    position: 'relative',
  },
  inputLabel: {
    position: 'absolute',
    top: -8,
    left: 16,
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    zIndex: 1,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '500',
    color: '#1f2937',
  },

  // Time Picker
  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  timePickerIcon: {
    fontSize: 20,
  },
  timePickerText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },

  // Utilities
  spacer: {
    height: 16,
  },
  centerContent: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
});
