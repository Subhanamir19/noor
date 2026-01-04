import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { useDevelopmentStore } from '@/store/developmentStore';
import { TraitResourceCard } from '@/components/development/TraitResourceCard';
import { TeachingGuide } from '@/components/development/TeachingGuide';
import { Button, OutlineButton } from '@/components/common/Button';
import { format, differenceInMonths } from 'date-fns';
import { COLORS } from '@/constants/colors';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DayDetail'>;
type RouteProps = RouteProp<RootStackParamList, 'DayDetail'>;

interface Props {
  navigation: NavigationProp;
  route: RouteProps;
}

export const DayDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { dailyTraitId } = route.params;
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);

  const { dailyTraits, completeDailyTrait, getTraitById, traitMastery } = useDevelopmentStore();

  const [notes, setNotes] = useState('');
  const [isCompleting, setIsCompleting] = useState(false);

  const dailyTrait = dailyTraits.find((dt) => dt.id === dailyTraitId);
  const trait = dailyTrait ? getTraitById(dailyTrait.trait_id) : null;

  useEffect(() => {
    if (dailyTrait?.notes) {
      setNotes(dailyTrait.notes);
    }
  }, [dailyTrait]);

  if (!dailyTrait || !trait) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.notFoundText}>Trait not found</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  // Get the resource for this day
  const resource = trait.resources.find((r) => r.type === dailyTrait.resource_type);

  // Determine child's age group
  const getAgeGroup = (): 'baby' | 'toddler' | 'child' => {
    if (!profile?.child_birthdate) return 'toddler';

    const months = differenceInMonths(new Date(), new Date(profile.child_birthdate));

    if (months < 24) return 'baby';
    if (months < 60) return 'toddler';
    return 'child';
  };

  const handleComplete = async () => {
    if (!user) return;

    setIsCompleting(true);
    try {
      await completeDailyTrait(user.id, dailyTrait.id, notes.trim() || undefined);
      Alert.alert(
        'MashaAllah! 🎉',
        `You've taught ${trait.name} today! May Allah make it easy for you.`,
        [{ text: 'Alhamdulillah', onPress: () => navigation.goBack() }]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleAskAI = () => {
    // Navigate to Chat tab with initial message
    navigation.navigate('Main');
    // Note: We'd need to set up a different pattern to pass initial message to Chat
    // For now, just navigate to main and the user can ask manually
  };

  const masteryLevel = traitMastery[trait.id] || 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
          <Text style={styles.backArrowText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerDate}>
            {format(new Date(dailyTrait.trait_date), 'EEEE, MMMM d, yyyy')}
          </Text>
          <Text style={styles.headerInfo}>
            Day {dailyTrait.day_number} • Cycle {dailyTrait.cycle_number + 1}
          </Text>
        </View>
        {dailyTrait.completed && (
          <View style={styles.completedIcon}>
            <Text style={styles.completedCheckmark}>✓</Text>
          </View>
        )}
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Trait Header */}
        <View style={styles.traitCard}>
          <View style={styles.traitTitleRow}>
            <Text style={styles.traitName}>{trait.name}</Text>
            {trait.arabicName && <Text style={styles.arabicName}> ({trait.arabicName})</Text>}
          </View>
          <Text style={styles.traitDescription}>{trait.description}</Text>

          {/* Category badge and mastery */}
          <View style={styles.traitMeta}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{trait.category.replace('_', ' ')}</Text>
            </View>

            {/* Mastery level */}
            {masteryLevel > 0 && (
              <View style={styles.masteryContainer}>
                <Text style={styles.masteryLabel}>Mastery:</Text>
                <View style={styles.masteryBarBg}>
                  <View style={[styles.masteryBarFill, { width: `${masteryLevel}%` }]} />
                </View>
                <Text style={styles.masteryValue}>{masteryLevel}%</Text>
              </View>
            )}
          </View>
        </View>

        {/* Resource Card */}
        {resource && <TraitResourceCard resource={resource} />}

        {/* Teaching Guide */}
        <TeachingGuide traitName={trait.name} ageGroup={getAgeGroup()} />

        {/* Notes Section */}
        <View style={styles.notesCard}>
          <Text style={styles.notesTitle}>📝 Your Teaching Notes</Text>
          <Text style={styles.notesHint}>
            How did teaching this trait go? What worked? What will you try differently next time?
          </Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Optional: Add your notes here..."
            placeholderTextColor={COLORS.WARM_GRAY}
            value={notes}
            onChangeText={setNotes}
            multiline
            textAlignVertical="top"
            editable={!dailyTrait.completed}
          />
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {!dailyTrait.completed ? (
            <>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Mark as Taught Today"
                  onPress={handleComplete}
                  loading={isCompleting}
                  fullWidth
                  size="lg"
                />
              </View>

              <OutlineButton
                title="Ask AI for Teaching Tips"
                onPress={handleAskAI}
                fullWidth
              />
            </>
          ) : (
            <View style={styles.completedCard}>
              <Text style={styles.completedText}>
                ✓ Completed on {format(new Date(dailyTrait.completed_at!), 'MMM d, h:mm a')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    color: COLORS.WARM_GRAY,
    fontSize: 16,
    marginBottom: 16,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    marginRight: 12,
  },
  backArrowText: {
    fontSize: 24,
    color: COLORS.TEAL,
  },
  headerContent: {
    flex: 1,
  },
  headerDate: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.WARM_GRAY,
  },
  headerInfo: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEAL,
  },
  completedIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.EMERALD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedCheckmark: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  traitCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: COLORS.EMERALD,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  traitTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  traitName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEAL,
  },
  arabicName: {
    fontSize: 18,
    color: COLORS.WARM_GRAY,
  },
  traitDescription: {
    fontSize: 16,
    color: COLORS.WARM_GRAY,
    marginBottom: 12,
    lineHeight: 24,
  },
  traitMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    backgroundColor: 'rgba(167, 201, 162, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.EMERALD,
    textTransform: 'capitalize',
  },
  masteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  masteryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.WARM_GRAY,
    marginRight: 8,
  },
  masteryBarBg: {
    width: 80,
    height: 8,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  masteryBarFill: {
    height: '100%',
    backgroundColor: COLORS.GOLD,
    borderRadius: 4,
  },
  masteryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GOLD,
    marginLeft: 8,
  },
  notesCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: COLORS.SAGE_GREEN,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEAL,
    marginBottom: 8,
  },
  notesHint: {
    fontSize: 14,
    color: COLORS.WARM_GRAY,
    marginBottom: 12,
  },
  notesInput: {
    backgroundColor: '#FFF7ED',
    borderWidth: 2,
    borderColor: COLORS.SAGE_GREEN,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 100,
    color: COLORS.TEAL,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  buttonWrapper: {
    marginBottom: 12,
  },
  completedCard: {
    backgroundColor: 'rgba(167, 201, 162, 0.3)',
    borderWidth: 2,
    borderColor: COLORS.EMERALD,
    borderRadius: 12,
    padding: 16,
  },
  completedText: {
    textAlign: 'center',
    fontWeight: '500',
    color: COLORS.EMERALD,
  },
});
