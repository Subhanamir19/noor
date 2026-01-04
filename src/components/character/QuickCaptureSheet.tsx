import React, { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import type { MomentType } from '@/types/models';
import { useCharacterStore } from '@/store/characterStore';
import { checkInterventionAfterMoment } from '@/store/coachingStore';
import {
  celebrationHaptic,
  lightHaptic,
  selectionHaptic,
  struggleHaptic,
  successHaptic,
} from '@/utils/haptics';
import { TraitSelector } from './TraitSelector';
import { ScenarioSelector } from './ScenarioSelector';
import { MomentConfirmation } from './MomentConfirmation';

interface Props {
  visible: boolean;
  userId: string;
  onClose: () => void;
}

type Step = 'trait' | 'scenario' | 'note' | 'success';

export function QuickCaptureSheet({ visible, userId, onClose }: Props) {
  const [step, setStep] = useState<Step>('trait');
  const [selectedTraitId, setSelectedTraitId] = useState<string | null>(null);
  const [momentType, setMomentType] = useState<MomentType>('positive');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [customNote, setCustomNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    leveledUp: boolean;
    newLevel?: number;
  } | null>(null);

  const logMoment = useCharacterStore((state) => state.logMoment);

  const resetState = () => {
    setStep('trait');
    setSelectedTraitId(null);
    setMomentType('positive');
    setSelectedScenarioId(null);
    setCustomNote('');
    setIsSubmitting(false);
    setSuccessData(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleTraitSelect = (traitId: string) => {
    lightHaptic();
    setSelectedTraitId(traitId);
    setSelectedScenarioId(null);
    setStep('scenario');
  };

  const handleScenarioSelect = (scenarioId: string) => {
    selectionHaptic();
    setSelectedScenarioId(scenarioId);
  };

  const handleSubmit = async () => {
    if (!selectedTraitId || !selectedScenarioId) return;

    setIsSubmitting(true);
    const result = await logMoment(
      userId,
      selectedTraitId,
      momentType,
      selectedScenarioId,
      customNote.trim() || undefined
    );
    setIsSubmitting(false);

    if (result.success) {
      // Haptic feedback based on outcome
      if (result.leveledUp) {
        celebrationHaptic();
      } else if (momentType === 'positive') {
        successHaptic();
      } else {
        struggleHaptic();
      }

      setSuccessData({
        leveledUp: result.leveledUp,
        newLevel: result.newLevel,
      });
      setStep('success');

      // Check for coaching intervention after logging (especially struggles)
      if (momentType === 'struggle') {
        checkInterventionAfterMoment(userId);
      }
    }
  };

  const handleBack = () => {
    if (step === 'scenario') {
      setStep('trait');
      setSelectedScenarioId(null);
    } else if (step === 'note') {
      setStep('scenario');
    }
  };

  const canSubmit = selectedTraitId && selectedScenarioId && !isSubmitting;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <Pressable style={styles.backdrop} onPress={handleClose} />

        <View style={styles.sheet}>
          {/* Success overlay */}
          {step === 'success' && selectedTraitId && successData && (
            <MomentConfirmation
              traitId={selectedTraitId}
              momentType={momentType}
              leveledUp={successData.leveledUp}
              newLevel={successData.newLevel}
              onComplete={handleClose}
            />
          )}

          {step !== 'success' && (
            <>
              {/* Header */}
              <View style={styles.header}>
                {step !== 'trait' ? (
                  <Pressable onPress={handleBack} style={styles.backButton}>
                    <Text style={styles.backText}>{'<'}</Text>
                  </Pressable>
                ) : (
                  <View style={styles.backButton} />
                )}
                <Text style={styles.headerTitle}>Log a Moment</Text>
                <Pressable onPress={handleClose} style={styles.closeButton}>
                  <Text style={styles.closeText}>x</Text>
                </Pressable>
              </View>

              {/* Handle */}
              <View style={styles.handle} />

              <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* Step 1: Select Trait */}
                {step === 'trait' && (
                  <TraitSelector
                    selectedTraitId={selectedTraitId}
                    onSelectTrait={handleTraitSelect}
                  />
                )}

                {/* Step 2: Select Scenario */}
                {step === 'scenario' && selectedTraitId && (
                  <>
                    <ScenarioSelector
                      traitId={selectedTraitId}
                      momentType={momentType}
                      selectedScenarioId={selectedScenarioId}
                      onSelectMomentType={setMomentType}
                      onSelectScenario={handleScenarioSelect}
                    />

                    {/* Optional note */}
                    <View style={styles.noteContainer}>
                      <Text style={styles.noteLabel}>Add a note (optional)</Text>
                      <TextInput
                        style={styles.noteInput}
                        placeholder="What happened?"
                        placeholderTextColor="#A3A3A3"
                        value={customNote}
                        onChangeText={setCustomNote}
                        multiline
                        maxLength={200}
                      />
                    </View>

                    {/* Submit Button */}
                    <View style={styles.submitContainer}>
                      <Pressable
                        style={[
                          styles.submitButton,
                          !canSubmit && styles.submitButtonDisabled,
                        ]}
                        onPress={handleSubmit}
                        disabled={!canSubmit}
                      >
                        {isSubmitting ? (
                          <ActivityIndicator color="#FFFFFF" />
                        ) : (
                          <Text style={styles.submitText}>Log Moment</Text>
                        )}
                      </Pressable>
                    </View>
                  </>
                )}
              </ScrollView>
            </>
          )}
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
    maxHeight: '85%',
    minHeight: 400,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
    color: '#1A5F4A',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A5F4A',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 24,
    color: '#78716C',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#D4D4D4',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  content: {
    flex: 1,
    paddingBottom: 32,
  },
  noteContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  noteLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#78716C',
    marginBottom: 8,
  },
  noteInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: '#1A5F4A',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  submitContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  submitButton: {
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
  submitButtonDisabled: {
    backgroundColor: '#E5E5E5',
    shadowColor: '#AFAFAF',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
