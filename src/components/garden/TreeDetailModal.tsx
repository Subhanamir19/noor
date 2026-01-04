import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { CharacterTree, TreeState } from '@/types/models';
import { getTraitById } from '@/data/characterScenarios';
import { calculateTreeState } from '@/store/characterStore';

interface Props {
  visible: boolean;
  tree: CharacterTree | null;
  traitId: string;
  onClose: () => void;
  onLogMoment: () => void;
}

const TREE_STATE_INFO: Record<TreeState, { title: string; description: string; color: string }> = {
  thriving: {
    title: 'Thriving! 🌳',
    description: 'This trait is flourishing. Keep up the great work!',
    color: '#4CAF50',
  },
  growing: {
    title: 'Growing 🌱',
    description: 'This trait is developing well. Continue nurturing it.',
    color: '#FFC107',
  },
  needs_attention: {
    title: 'Needs Attention 🥀',
    description: 'This trait could use some focus. Try logging more positive moments.',
    color: '#FF9800',
  },
  wilting: {
    title: 'Wilting 🍂',
    description: "It's been a while since you logged this trait. Give it some love!",
    color: '#F44336',
  },
};

export function TreeDetailModal({
  visible,
  tree,
  traitId,
  onClose,
  onLogMoment,
}: Props) {
  const trait = getTraitById(traitId);
  const treeState = tree ? calculateTreeState(tree) : 'wilting';
  const stateInfo = TREE_STATE_INFO[treeState];

  const xpToNextLevel = tree ? 100 - (tree.current_xp % 100) : 100;
  const totalMoments = tree ? tree.positive_count + tree.struggle_count : 0;
  const positiveRatio = tree && totalMoments > 0
    ? Math.round((tree.positive_count / totalMoments) * 100)
    : 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.sheet}>
          {/* Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.traitEmoji}>{trait?.emoji || '🌟'}</Text>
            <Text style={styles.traitName}>{trait?.name || 'Unknown Trait'}</Text>
            <Text style={[styles.stateTitle, { color: stateInfo.color }]}>
              {stateInfo.title}
            </Text>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* State description */}
            <Text style={styles.stateDescription}>{stateInfo.description}</Text>

            {/* Stats */}
            {tree ? (
              <View style={styles.statsContainer}>
                <View style={styles.statRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{tree.level}</Text>
                    <Text style={styles.statLabel}>Level</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{tree.current_xp}</Text>
                    <Text style={styles.statLabel}>Total XP</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{xpToNextLevel}</Text>
                    <Text style={styles.statLabel}>To Next Lv</Text>
                  </View>
                </View>

                <View style={styles.statRow}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, styles.positiveValue]}>
                      {tree.positive_count}
                    </Text>
                    <Text style={styles.statLabel}>Wins</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, styles.struggleValue]}>
                      {tree.struggle_count}
                    </Text>
                    <Text style={styles.statLabel}>Struggles</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{positiveRatio}%</Text>
                    <Text style={styles.statLabel}>Win Rate</Text>
                  </View>
                </View>

                {/* XP Progress */}
                <View style={styles.xpContainer}>
                  <Text style={styles.xpLabel}>Progress to Level {tree.level + 1}</Text>
                  <View style={styles.xpBar}>
                    <View
                      style={[
                        styles.xpFill,
                        { width: `${tree.current_xp % 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.xpText}>
                    {tree.current_xp % 100} / 100 XP
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.emptyStats}>
                <Text style={styles.emptyTitle}>No moments logged yet</Text>
                <Text style={styles.emptyText}>
                  Start tracking this trait by logging your first moment!
                </Text>
              </View>
            )}

            {/* Tips based on state */}
            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>
                {tree ? 'Growth Tips' : 'Getting Started'}
              </Text>
              {treeState === 'thriving' && (
                <>
                  <Text style={styles.tipText}>• Keep logging to maintain momentum</Text>
                  <Text style={styles.tipText}>• Share your success with your child</Text>
                  <Text style={styles.tipText}>• Try more challenging scenarios</Text>
                </>
              )}
              {treeState === 'growing' && (
                <>
                  <Text style={styles.tipText}>• Log moments daily for best growth</Text>
                  <Text style={styles.tipText}>• Celebrate small wins with your child</Text>
                  <Text style={styles.tipText}>• Focus on consistency over perfection</Text>
                </>
              )}
              {(treeState === 'needs_attention' || treeState === 'wilting') && (
                <>
                  <Text style={styles.tipText}>• Start with one moment today</Text>
                  <Text style={styles.tipText}>• It's okay to log struggles - they help too</Text>
                  <Text style={styles.tipText}>• Small steps lead to big growth</Text>
                </>
              )}
            </View>
          </ScrollView>

          {/* Action button */}
          <View style={styles.footer}>
            <Pressable style={styles.logButton} onPress={onLogMoment}>
              <Text style={styles.logButtonText}>Log a Moment</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    backgroundColor: '#FAF9F6',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#D4D4D4',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  traitEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  traitName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A5F4A',
    marginBottom: 4,
  },
  stateTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  stateDescription: {
    fontSize: 15,
    color: '#78716C',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A5F4A',
  },
  positiveValue: {
    color: '#4CAF50',
  },
  struggleValue: {
    color: '#FF9800',
  },
  statLabel: {
    fontSize: 12,
    color: '#78716C',
    marginTop: 2,
  },
  xpContainer: {
    marginTop: 8,
  },
  xpLabel: {
    fontSize: 12,
    color: '#78716C',
    marginBottom: 6,
  },
  xpBar: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#58CC02',
    borderRadius: 4,
  },
  xpText: {
    fontSize: 11,
    color: '#78716C',
    textAlign: 'right',
    marginTop: 4,
  },
  emptyStats: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F57C00',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#795548',
    textAlign: 'center',
  },
  tipsSection: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#455A64',
    marginBottom: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  logButton: {
    backgroundColor: '#58CC02',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#58A700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  logButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
