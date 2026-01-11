import React, { useCallback } from 'react';
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  type PressableProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

// Duolingo-style button color variants
const VARIANTS = {
  primary: {
    bg: '#58CC02',
    shadow: '#58A700',
    text: '#FFFFFF',
  },
  teal: {
    bg: '#0F766E',
    shadow: '#0B5B55',
    text: '#FFFFFF',
  },
  secondary: {
    bg: '#1CB0F6',
    shadow: '#1899D6',
    text: '#FFFFFF',
  },
  danger: {
    bg: '#FF4B4B',
    shadow: '#EA2B2B',
    text: '#FFFFFF',
  },
  warning: {
    bg: '#FF9600',
    shadow: '#E08600',
    text: '#FFFFFF',
  },
  premium: {
    bg: '#CE82FF',
    shadow: '#B86EE0',
    text: '#FFFFFF',
  },
  pink: {
    bg: '#F9A8D4',
    shadow: '#EC4899',
    text: '#FFFFFF',
  },
  outline: {
    bg: '#FFFFFF',
    shadow: '#E5E5E5',
    text: '#4B4B4B',
    border: '#E5E5E5',
  },
  ghost: {
    bg: 'transparent',
    shadow: 'transparent',
    text: '#1CB0F6',
  },
  indigo: {
    bg: '#6366F1',
    shadow: '#4F46E5',
    text: '#FFFFFF',
  },
  disabled: {
    bg: '#E5E5E5',
    shadow: '#AFAFAF',
    text: '#AFAFAF',
  },
} as const;

type ButtonVariant = keyof typeof VARIANTS;
type ButtonSize = 'sm' | 'md' | 'lg';

interface DuoButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const SHADOW_HEIGHT = {
  sm: 3,
  md: 4,
  lg: 5,
};

const PADDING = {
  sm: { paddingVertical: 8, paddingHorizontal: 16 },
  md: { paddingVertical: 12, paddingHorizontal: 24 },
  lg: { paddingVertical: 16, paddingHorizontal: 32 },
};

const FONT_SIZE = {
  sm: 14,
  md: 16,
  lg: 18,
};

const BORDER_RADIUS = {
  sm: 12,
  md: 16,
  lg: 20,
};

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  onPress,
  ...pressableProps
}: DuoButtonProps) {
  const isDisabled = disabled || loading;
  const colors = isDisabled ? VARIANTS.disabled : VARIANTS[variant];
  const shadowHeight = SHADOW_HEIGHT[size];
  const borderRadius = BORDER_RADIUS[size];

  const renderContent = useCallback(
    (pressed: boolean) => {
      const translateY = pressed && !isDisabled ? shadowHeight : 0;
      const currentShadowHeight = pressed && !isDisabled ? 0 : shadowHeight;

      return (
        <View
          style={[
            {
              width: fullWidth ? '100%' : undefined,
              alignSelf: fullWidth ? 'stretch' : 'center',
            },
            style,
          ]}
        >
          {/* Shadow layer */}
          <View
            style={{
              position: 'absolute',
              top: shadowHeight,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: colors.shadow,
              borderRadius,
            }}
          />

          {/* Main button surface */}
          <View
            style={[
              {
                backgroundColor: colors.bg,
                borderRadius,
                transform: [{ translateY }],
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: currentShadowHeight,
                borderWidth: 'border' in colors ? 2 : 0,
                borderColor: 'border' in colors ? colors.border : 'transparent',
              },
              PADDING[size],
            ]}
          >
            {loading ? (
              <ActivityIndicator
                size="small"
                color={colors.text}
                style={{ marginRight: title ? 8 : 0 }}
              />
            ) : leftIcon ? (
              <View style={{ marginRight: 8 }}>{leftIcon}</View>
            ) : null}

            <Text
              style={[
                {
                  color: colors.text,
                  fontSize: FONT_SIZE[size],
                  fontWeight: '700',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                },
                textStyle,
              ]}
            >
              {title}
            </Text>

            {rightIcon && !loading && (
              <View style={{ marginLeft: 8 }}>{rightIcon}</View>
            )}
          </View>
        </View>
      );
    },
    [colors, shadowHeight, borderRadius, fullWidth, size, loading, leftIcon, rightIcon, title, textStyle, style, isDisabled]
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      {...pressableProps}
    >
      {({ pressed }) => renderContent(pressed)}
    </Pressable>
  );
}

// Convenience exports for common button types
export function PrimaryButton(props: Omit<DuoButtonProps, 'variant'>) {
  return <Button {...props} variant="primary" />;
}

export function SecondaryButton(props: Omit<DuoButtonProps, 'variant'>) {
  return <Button {...props} variant="secondary" />;
}

export function DangerButton(props: Omit<DuoButtonProps, 'variant'>) {
  return <Button {...props} variant="danger" />;
}

export function OutlineButton(props: Omit<DuoButtonProps, 'variant'>) {
  return <Button {...props} variant="outline" />;
}

export function GhostButton(props: Omit<DuoButtonProps, 'variant'>) {
  return <Button {...props} variant="ghost" />;
}

// Default export
export default Button;
