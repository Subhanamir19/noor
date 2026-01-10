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
import { getTraitById } from '@/data/characterScenarios';
import { TraitPracticeFlow } from './TraitPracticeFlow';

interface Props {
  visible: boolean;
  userId: string;
  traitId: string;
  treeState: TreeState;
  onClose: () => void;
}

export function TraitPracticeSheet({ visible, userId, traitId, treeState, onClose }: Props) {
  const trait = useMemo(() => getTraitById(traitId), [traitId]);

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
              <Text style={styles.headerBadge}>{trait?.emoji || '•'} </Text>
              <Text style={styles.headerTitle} numberOfLines={1}>
                Nurture {trait?.name || 'Trait'}
              </Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeButton}>
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
    maxHeight: '88%',
    minHeight: 420,
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
    color: '#1A5F4A',
    flexShrink: 1,
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

