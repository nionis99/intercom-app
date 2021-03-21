import React, { ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle, View, ActivityIndicator, StyleProp } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';

import Text, { TextTypes } from '#components/Text';
import { ThemeColors } from '#utils/theme/types';
import { DEFAULT_BORDER_RADIUS } from '#utils/theme';
import useColoredStyles from '#hooks/useColoredStyles';

export enum ButtonType {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  GREY = 'grey',
  WHITE = 'white',
  DANGER = 'danger',
  GREEN = 'green',
  SECONDARY_GREEN = 'secondaryGreen',
  TEXT = 'TEXT',
}

export enum ButtonSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

type IconType = (props: IconProps) => JSX.Element;

interface Props {
  type?: ButtonType;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  disabled?: boolean;
  onPress: () => void;
  icon?: IconType | typeof ActivityIndicator;
  children?: ReactNode;
  isLoading?: boolean;
  lean?: boolean;
}

function Button({
  type = ButtonType.DEFAULT,
  size = ButtonSize.MEDIUM,
  style,
  textStyle,
  disabled = false,
  onPress,
  icon: Icon,
  children,
  isLoading,
  lean = false,
}: Props) {
  const defaultStyles = useColoredStyles(coloredDefaultStyles);
  const styles = useColoredStyles(typeStyles)[type];

  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      onPress={() => (disabled ? null : onPress())}
      style={[
        defaultStyles.button,
        styles.button,
        disabled && styles.buttonDisabled,
        sizeStyles[size],
        !lean && defaultStyles.grow,
        style,
      ]}
    >
      {Icon &&
        (isLoading ? (
          <ActivityIndicator size={16} color={styles.text.color} style={defaultStyles.icon} />
        ) : (
          <View style={children ? defaultStyles.icon : undefined}>
            <Icon name="circle" size={16} color={styles.text.color} />
          </View>
        ))}
      <View>
        <Text type={textType[size]} style={[styles.text, textStyle]}>
          {isLoading ? <ActivityIndicator size={16} color={styles.text.color} style={defaultStyles.icon} /> : children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const sizeStyles = StyleSheet.create({
  [ButtonSize.SMALL]: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  [ButtonSize.MEDIUM]: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  [ButtonSize.LARGE]: {
    paddingVertical: 12,
    paddingHorizontal: 34,
  },
});

const textType = {
  [ButtonSize.SMALL]: TextTypes.H4,
  [ButtonSize.MEDIUM]: TextTypes.H4,
  [ButtonSize.LARGE]: TextTypes.H2,
};

const coloredDefaultStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      backgroundColor: themeColors.white,
      borderRadius: DEFAULT_BORDER_RADIUS,
    },
    icon: {
      paddingRight: 4,
    },
    grow: {
      flex: 1,
    },
  });

const typeStyles = (themeColors: ThemeColors) => ({
  [ButtonType.DEFAULT]: StyleSheet.create({
    button: {
      backgroundColor: themeColors.button,
    },
    buttonDisabled: {
      backgroundColor: themeColors.buttonDisabled,
    },
    text: {
      color: themeColors.black,
    },
  }),
  [ButtonType.PRIMARY]: StyleSheet.create({
    button: {
      backgroundColor: themeColors.primary,
    },
    buttonDisabled: {
      backgroundColor: themeColors.primaryA(0.35),
    },
    text: {
      color: themeColors.text,
    },
  }),
  [ButtonType.DANGER]: StyleSheet.create({
    button: {
      backgroundColor: themeColors.white,
    },
    buttonDisabled: {
      backgroundColor: themeColors.dangerA(0.35),
    },
    text: {
      color: themeColors.danger,
    },
  }),
  [ButtonType.SECONDARY]: StyleSheet.create({
    button: {
      backgroundColor: themeColors.secondary,
    },
    buttonDisabled: {
      backgroundColor: themeColors.secondaryA(0.35),
    },
    text: {
      color: themeColors.text,
    },
  }),
  [ButtonType.GREY]: StyleSheet.create({
    button: {
      backgroundColor: themeColors.midGrey,
    },
    buttonDisabled: {
      backgroundColor: themeColors.lightGrey,
    },
    text: {
      color: themeColors.text,
    },
  }),
  [ButtonType.WHITE]: StyleSheet.create({
    button: {
      backgroundColor: themeColors.white,
    },
    buttonDisabled: {
      backgroundColor: themeColors.white,
    },
    text: {
      color: themeColors.primary,
    },
  }),
  [ButtonType.GREEN]: StyleSheet.create({
    button: {
      backgroundColor: themeColors.primary,
    },
    buttonDisabled: {
      backgroundColor: themeColors.lightGrey,
    },
    text: {
      color: themeColors.white,
    },
  }),
  [ButtonType.SECONDARY_GREEN]: StyleSheet.create({
    button: {
      backgroundColor: themeColors.secondaryGreen,
    },
    buttonDisabled: {
      backgroundColor: themeColors.lightGrey,
    },
    text: {
      color: themeColors.primary,
    },
  }),
  [ButtonType.TEXT]: StyleSheet.create({
    button: {
      backgroundColor: 'transparent',
    },
    buttonDisabled: {
      backgroundColor: 'transparent',
    },
    text: {
      color: themeColors.text,
    },
  }),
});

export default Button;
