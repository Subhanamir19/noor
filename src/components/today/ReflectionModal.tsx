import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';

import { Button, OutlineButton } from '@/components/common/Button';

type Sentiment = 'good' | 'okay' | 'hard';

interface Props {
  visible: boolean;
  missionTitle: string;
  onSubmit: (text: string, sentiment: Sentiment) => Promise<void>;
  onClose: () => void;
}

const MAX_REFLECTION_CHARS = 2_000;

export function ReflectionModal({ visible, missionTitle, onSubmit, onClose }: Props) {
  const [sentiment, setSentiment] = useState<Sentiment | null>(null);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValid = Boolean(sentiment);
  const remaining = useMemo(() => MAX_REFLECTION_CHARS - text.length, [text.length]);

  const handleSubmit = async () => {
    if (!sentiment || isLoading) return;

    setIsLoading(true);
    try {
      await onSubmit(text.slice(0, MAX_REFLECTION_CHARS), sentiment);
      setSentiment(null);
      setText('');
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (isLoading) return;
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-center items-center p-6">
        <BlurView intensity={25} tint="dark" className="absolute inset-0" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="w-full max-w-md"
        >
          <View className="bg-cream rounded-3xl p-6 border border-sage/40">
            <Text className="text-2xl font-poppinsBold text-teal text-center mb-2">
              Reflection
            </Text>
            <Text className="text-base font-interMedium text-warmGray text-center mb-4">
              You showed up today.
            </Text>

            <View className="bg-sage/30 rounded-xl p-3 mb-4">
              <Text className="text-xs font-interMedium text-warmGray mb-1">
                Today&apos;s mission
              </Text>
              <Text className="text-sm font-interMedium text-teal">{missionTitle}</Text>
            </View>

            <Text className="text-base font-interMedium text-teal mb-3">
              How did it feel?
            </Text>

            <View className="flex-row justify-between mb-4">
              {(
                [
                  { value: 'good', emoji: '😊', label: 'Good' },
                  { value: 'okay', emoji: '😌', label: 'Okay' },
                  { value: 'hard', emoji: '😮‍💨', label: 'Hard' },
                ] as const
              ).map((option) => (
                <TouchableOpacity
                  key={option.value}
                  className={`flex-1 mx-1 p-3 rounded-xl border-2 ${
                    sentiment === option.value
                      ? 'bg-sage border-emerald'
                      : 'bg-white border-sage'
                  }`}
                  onPress={() => setSentiment(option.value)}
                  activeOpacity={0.7}
                  disabled={isLoading}
                >
                  <Text className="text-3xl text-center mb-1">{option.emoji}</Text>
                  <Text className="text-sm font-interMedium text-teal text-center">
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-sm font-interMedium text-warmGray mb-2">
              Want to share more? (optional)
            </Text>
            <TextInput
              className="bg-white border-2 border-sage rounded-xl p-3 mb-2 min-h-[88px]"
              placeholder="Write a few words..."
              placeholderTextColor="#78716C"
              value={text}
              onChangeText={setText}
              multiline
              textAlignVertical="top"
              editable={!isLoading}
              maxLength={MAX_REFLECTION_CHARS}
            />

            <Text className="text-xs font-interMedium text-warmGray mb-4 text-right">
              {remaining} left
            </Text>

            <View className="flex-row">
              <View className="flex-1 mr-2">
                <OutlineButton
                  title="Skip for now"
                  onPress={handleClose}
                  disabled={isLoading}
                  fullWidth
                />
              </View>
              <View className="flex-1 ml-2">
                <Button
                  title="Share"
                  onPress={handleSubmit}
                  loading={isLoading}
                  disabled={!isValid}
                  fullWidth
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

