import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { useDevelopmentStore } from '@/store/developmentStore';
import { DayCard } from '@/components/development/DayCard';
import { ProgressSummary } from '@/components/development/ProgressSummary';
import { Button, OutlineButton } from '@/components/common/Button';
import { format } from 'date-fns';
import { COLORS } from '@/constants/colors';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: NavigationProp;
}

export const DevelopmentScreen: React.FC<Props> = ({ navigation }) => {
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);

  const {
    journeyStartDate,
    currentCycle,
    currentDayInCycle,
    dailyTraits,
    todaysTrait,
    traitMastery,
    totalTraitsTaught,
    isLoading,
    loadDevelopmentData,
    initializeJourney,
    getTraitById,
  } = useDevelopmentStore();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      if (!journeyStartDate) {
        initializeJourney(user.id);
      } else {
        loadDevelopmentData(user.id);
      }
    }
  }, [user, journeyStartDate]);

  const handleRefresh = async () => {
    if (!user) return;
    setRefreshing(true);
    await loadDevelopmentData(user.id);
    setRefreshing(false);
  };

  const handleDayPress = (date: string, dailyTraitId: string) => {
    navigation.navigate('DayDetail', { date, dailyTraitId });
  };

  const handleTodayPress = () => {
    if (todaysTrait) {
      navigation.navigate('DayDetail', {
        date: todaysTrait.trait_date,
        dailyTraitId: todaysTrait.id,
      });
    }
  };

  // Sort daily traits - today first, then recent
  const sortedTraits = [...dailyTraits].sort((a, b) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    if (a.trait_date === today) return -1;
    if (b.trait_date === today) return 1;
    return new Date(b.trait_date).getTime() - new Date(a.trait_date).getTime();
  });

  if (isLoading && dailyTraits.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.EMERALD} />
          <Text style={styles.loadingText}>Preparing your development journey...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Character Development</Text>
          <Text style={styles.subtitle}>
            Building {profile?.child_name || "your child's"} Islamic character daily
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} activeOpacity={0.7}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {/* Progress Summary */}
        <ProgressSummary
          totalTraitsTaught={totalTraitsTaught}
          currentCycle={currentCycle}
          currentDayInCycle={currentDayInCycle}
          traitMastery={traitMastery}
        />

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 How it works</Text>
          <Text style={styles.infoText}>
            Each day focuses on one Islamic character trait. We provide a Hadith, Quranic verse, or
            Dua to help you teach it to your child. After 30 days, the cycle repeats with different
            resources!
          </Text>
        </View>

        {/* Today's Trait (Featured) */}
        {todaysTrait && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>⭐ Today's Trait</Text>
              {todaysTrait.completed && (
                <View style={styles.completedBadge}>
                  <Text style={styles.completedBadgeText}>✓ Completed</Text>
                </View>
              )}
            </View>

            {(() => {
              const trait = getTraitById(todaysTrait.trait_id);
              if (!trait) return null;
              return (
                <DayCard
                  dailyTrait={todaysTrait}
                  trait={trait}
                  isToday={true}
                  onPress={handleTodayPress}
                />
              );
            })()}
          </View>
        )}

        {/* Recent Days */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Recent Days</Text>

          {sortedTraits
            .filter((dt) => dt.id !== todaysTrait?.id)
            .slice(0, 7)
            .map((dailyTrait) => {
              const trait = getTraitById(dailyTrait.trait_id);
              if (!trait) return null;

              const isToday = dailyTrait.trait_date === format(new Date(), 'yyyy-MM-dd');

              return (
                <DayCard
                  key={dailyTrait.id}
                  dailyTrait={dailyTrait}
                  trait={trait}
                  isToday={isToday}
                  onPress={() => handleDayPress(dailyTrait.trait_date, dailyTrait.id)}
                />
              );
            })}
        </View>

        {/* View All History */}
        {dailyTraits.length > 8 && (
          <View style={styles.historyButtonContainer}>
            <OutlineButton
              title={`View Complete History (${dailyTraits.length} days)`}
              onPress={() => {}}
              fullWidth
            />
          </View>
        )}

        {/* Empty state */}
        {dailyTraits.length === 0 && !isLoading && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🌱</Text>
            <Text style={styles.emptyTitle}>Start Your Journey Today</Text>
            <Text style={styles.emptyText}>
              Begin building your child's Islamic character with daily guided lessons
            </Text>
            <Button
              title="Start Development Journey"
              onPress={() => user && initializeJourney(user.id)}
              size="lg"
            />
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: COLORS.WARM_GRAY,
    fontWeight: '500',
    marginTop: 16,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEAL,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.WARM_GRAY,
    marginTop: 4,
  },
  settingsIcon: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  infoCard: {
    backgroundColor: 'rgba(227, 183, 160, 0.2)',
    borderWidth: 2,
    borderColor: COLORS.BLUSH,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.TEAL,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.TEAL,
    lineHeight: 22,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEAL,
  },
  completedBadge: {
    backgroundColor: 'rgba(14, 117, 109, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  completedBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.EMERALD,
  },
  historyButtonContainer: {
    marginBottom: 24,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.TEAL,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.WARM_GRAY,
    textAlign: 'center',
    paddingHorizontal: 32,
    marginBottom: 24,
  },
  bottomSpacer: {
    height: 32,
  },
});
