import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { AppLottie } from '@/components/common/AppLottie';
import { getPracticeVisualSource } from '@/constants/practiceVisuals';
import { TodayColors, TodaySpacing } from '@/constants/todayTokens';
import type { TraitPractice } from '@/data/traitPractices';

const CARD_RADIUS = 28;
const CARD_BORDER = 3;
const CARD_PADDING = 16;
const CARD_SHADOW_HEIGHT = 6;

const FONT_BRICOLAGE_BOLD = 'BricolageGrotesque-Bold';
const FONT_BRICOLAGE_SEMIBOLD = 'BricolageGrotesque-SemiBold';
const FONT_POPPINS_SEMIBOLD = 'Poppins-SemiBold';

const VISUAL_THEMES = [
  { bg: '#DFF5EF' }, // mint
  { bg: '#F3E8FF' }, // lilac
  { bg: '#E0F2FE' }, // sky
  { bg: '#FFF7ED' }, // cream
] as const;

export function PracticeDeckCard({
  practice,
  label,
  progressLabel,
  width,
  height,
  visualIndex,
  recommended,
  loading,
  onStart,
}: {
  practice: TraitPractice;
  label: string;
  progressLabel: string;
  width: number;
  height: number;
  visualIndex: number;
  recommended: boolean;
  loading: boolean;
  onStart: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const theme = VISUAL_THEMES[visualIndex % VISUAL_THEMES.length];

  const previewSteps = useMemo(() => practice.steps.slice(0, 3), [practice.steps]);
  const remainingCount = Math.max(0, practice.steps.length - previewSteps.length);
  const whenToUse = practice.when_to_use || 'When you have a calm 3-5 minutes together.';

  return (
    <View style={{ width, height }}>
      <View
        style={{
          position: 'absolute',
          top: CARD_SHADOW_HEIGHT,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: CARD_RADIUS,
          backgroundColor: 'rgba(0,0,0,0.10)',
        }}
      />

      <View
        style={{
          flex: 1,
          borderRadius: CARD_RADIUS,
          overflow: 'hidden',
          backgroundColor: theme.bg,
          borderWidth: CARD_BORDER,
          borderColor: 'rgba(0,0,0,0.08)',
          marginBottom: CARD_SHADOW_HEIGHT,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AppLottie
              source={getPracticeVisualSource(practice.id)}
              style={{ width: 260, height: 180 }}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1.4,
            backgroundColor: 'rgba(255,255,255,0.92)',
            padding: CARD_PADDING,
          }}
        >
          <View style={{ flexGrow: 1, flexShrink: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                  borderWidth: 2,
                  borderColor: 'rgba(0,0,0,0.06)',
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: recommended ? '#92400E' : '#1F2937',
                    letterSpacing: 0.6,
                    fontFamily: FONT_BRICOLAGE_SEMIBOLD,
                  }}
                >
                  {label}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                  borderWidth: 2,
                  borderColor: 'rgba(0,0,0,0.06)',
                }}
              >
                <Text style={{ fontSize: 12, color: '#1F2937', fontFamily: FONT_BRICOLAGE_SEMIBOLD }}>
                  {progressLabel}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={{ fontSize: 26, color: '#111827', fontFamily: FONT_BRICOLAGE_BOLD }} numberOfLines={2}>
                {practice.title}
              </Text>

              <Text
                style={{
                  marginTop: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: '#4B5563',
                  fontFamily: FONT_POPPINS_SEMIBOLD,
                }}
                numberOfLines={2}
              >
                Goal: {practice.goal}
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  lineHeight: 20,
                  color: '#111827',
                  fontFamily: FONT_BRICOLAGE_SEMIBOLD,
                }}
                numberOfLines={2}
              >
                "{whenToUse}"
              </Text>

              <Pressable
                onPress={() => setExpanded((v) => !v)}
                style={{ marginTop: 8, alignSelf: 'flex-start' }}
                accessibilityRole="button"
                accessibilityLabel={expanded ? 'Hide steps preview' : 'Show steps preview'}
              >
                <Text style={{ color: TodayColors.textLink, fontSize: 13, fontFamily: FONT_POPPINS_SEMIBOLD }}>
                  {expanded ? 'Hide steps' : 'Tap to view details'}
                </Text>
              </Pressable>

              {expanded ? (
                <View style={{ marginTop: TodaySpacing[8] }}>
                  {previewSteps.map((stepText, idx) => (
                    <Text
                      key={`${practice.id}-preview-${idx}`}
                      style={{
                        fontSize: 13,
                        lineHeight: 18,
                        color: '#374151',
                        fontFamily: FONT_POPPINS_SEMIBOLD,
                        marginBottom: 4,
                      }}
                      numberOfLines={2}
                    >
                      {idx + 1}. {stepText}
                    </Text>
                  ))}
                  {remainingCount > 0 ? (
                    <Text style={{ fontSize: 12, color: '#6B7280', fontFamily: FONT_POPPINS_SEMIBOLD }}>
                      +{remainingCount} more step{remainingCount === 1 ? '' : 's'}
                    </Text>
                  ) : null}
                </View>
              ) : null}
            </View>
          </View>

          <View style={{ marginTop: 14 }}>
            <Button
              title="Start"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              onPress={onStart}
              accessibilityLabel={`Start ${practice.title}`}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

