import React, { useCallback } from 'react';
import {
  Pressable,
  type PressableProps,
  type ViewStyle,
  View,
} from 'react-native';

import { TodayColors, TodayRadii } from '@/constants/todayTokens';

type IconButtonVariant = 'outline' | 'primary' | 'secondary' | 'ghost';
type IconButtonSize = 'sm' | 'md';

const VARIANTS: Record<
  IconButtonVariant,
  { bg: string; shadow: string; border?: string }
> = {
  outline: {
    bg: TodayColors.card,
    shadow: 'rgba(17,24,39,0.10)',
    border: TodayColors.strokeSubtle,
  },
  primary: {
    bg: TodayColors.ctaPrimary,
    shadow: TodayColors.ctaPrimaryShadow,
  },
  secondary: {
    bg: TodayColors.ctaSecondary,
    shadow: TodayColors.ctaSecondaryShadow,
  },
  ghost: {
    bg: 'transparent',
    shadow: 'transparent',
  },
};

const SIZE: Record<IconButtonSize, { box: number; shadowHeight: number; radius: number }> = {
  sm: { box: 40, shadowHeight: 4, radius: 12 },
  md: { box: 44, shadowHeight: 4, radius: TodayRadii.md },
};

interface Props extends Omit<PressableProps, 'style' | 'children'> {
  icon: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  style?: ViewStyle;
}

export function IconButton({
  icon,
  variant = 'outline',
  size = 'md',
  disabled,
  style,
  ...pressableProps
}: Props) {
  const v = VARIANTS[variant];
  const s = SIZE[size];
  const isDisabled = !!disabled;

  const renderContent = useCallback(
    (pressed: boolean) => {
      const translateY = pressed && !isDisabled ? s.shadowHeight : 0;
      const currentShadowHeight = pressed && !isDisabled ? 0 : s.shadowHeight;

      return (
        <View style={[{ width: s.box, height: s.box }, style]}>
          {/* Shadow layer */}
          <View
            style={{
              position: 'absolute',
              top: s.shadowHeight,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: isDisabled ? TodayColors.ctaDisabledShadow : v.shadow,
              borderRadius: s.radius,
              opacity: variant === 'ghost' ? 0 : 1,
            }}
          />

          {/* Surface */}
          <View
            style={{
              width: s.box,
              height: s.box,
              borderRadius: s.radius,
              backgroundColor: isDisabled ? TodayColors.ctaDisabled : v.bg,
              transform: [{ translateY }],
              marginBottom: currentShadowHeight,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: v.border ? 2 : 0,
              borderColor: v.border || 'transparent',
            }}
          >
            {icon}
          </View>
        </View>
      );
    },
    [isDisabled, s.box, s.radius, s.shadowHeight, style, v.bg, v.border, v.shadow, variant]
  );

  return (
    <Pressable disabled={isDisabled} {...pressableProps}>
      {({ pressed }) => renderContent(pressed)}
    </Pressable>
  );
}

