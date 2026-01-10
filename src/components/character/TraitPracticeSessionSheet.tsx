import React, { useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { TreeState } from '@/types/models';
import { TodayTypography } from '@/constants/todayTokens';
import { getTraitById as getCoreTraitById } from '@/data/characterScenarios';
import { getPracticesForTrait } from '@/data/traitPractices';
import { TraitPracticeFlow } from './TraitPracticeFlow';

interface Props {
  visible: boolean;
  userId: string;
  traitId: string;
  practiceId: string;
  treeState: TreeState;
  onClose: () => void;
}

export function TraitPracticeSessionSheet({
  visible,
  userId,
  traitId,
  practiceId,
  treeState,
  onClose,
}: Props) {
  const trait = useMemo(() => getCoreTraitById(traitId), [traitId]);
  const practiceTitle = useMemo(() => {
    const practices = getPracticesForTrait(traitId as any);
    return practices.find((p) => p.id === practiceId)?.title || 'Practice';
  }, [practiceId, traitId]);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerBadge}>{trait?.emoji || '🌱'} </Text>
              <View style={{ flexShrink: 1 }}>
                <Text style={styles.headerTitle} numberOfLines={1}>
                  {practiceTitle}
                </Text>
                <Text style={styles.headerSubtitle} numberOfLines={1}>
                  Nurture {trait?.name || 'Trait'}
                </Text>
              </View>
            </View>
            <Pressable onPress={onClose} style={styles.closeButton} accessibilityRole="button">
              <Text style={styles.closeText}>x</Text>
            </Pressable>
          </View>

          <View style={styles.handle} />

          <TraitPracticeFlow
            active={visible}
            userId={userId}
            traitId={traitId}
            treeState={treeState}
            onClose={onClose}
            initialPracticeId={practiceId}
            hideChooser
          />
        </View>
      </KeyboardAvoidingView>
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
    maxHeight: '92%',
    minHeight: 520,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  headerBadge: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: TodayTypography.bricolageBold,
    color: '#111827',
    flexShrink: 1,
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 12,
    fontFamily: TodayTypography.poppinsSemiBold,
    color: '#6B7280',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#78716C',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#D4D4D4',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
});

