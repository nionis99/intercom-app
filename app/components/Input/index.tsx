import React, { ReactNode, useEffect, useState } from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextInputSubmitEditingEventData,
  ViewStyle,
} from 'react-native';

import { ThemeColors } from '#utils/theme/types';
import { useTheme } from '#utils/theme';
import { DEFAULT_BORDER_RADIUS } from '#utils/theme';
import { InputSize, InputType } from './types';
import useColoredStyles from '#hooks/useColoredStyles';
import useColorTransition from '#hooks/useColorTransition';
import { TextTypes, textTypesStyles } from '../Text';

interface Props extends TextInputProps {
  size?: InputSize;
  disabled?: boolean;
  type?: InputType;
  isInvalid?: boolean;
  containerStyle?: ViewStyle;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  children?: ReactNode;
}

function Input({
  disabled = false,
  size = InputSize.SMALL,
  style,
  isInvalid = false,
  containerStyle,
  children,
  type = InputType.WHITE,
  onSubmitEditing = () => null,
  onBlur = () => null,
  onFocus = () => null,
  ...rest
}: Props) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const typeStyle = useColoredStyles(inputTypesStyles, disabled)[type];
  const defaultStyles = useColoredStyles(coloredDefaultStyles, disabled);

  const animateColorTo = isFocused || !isInvalid ? colors.inputFocusedBorder : colors.invalidForm;
  const colorTransitionFrom = !isInvalid ? colors.borderGrey : colors.invalidForm;

  const { handleColorChange, borderColorAnimated } = useColorTransition(
    isFocused && !isInvalid,
    colorTransitionFrom,
    animateColorTo
  );

  useEffect(() => handleColorChange(), [isFocused, isInvalid, handleColorChange]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur();
  };

  return (
    <Animated.View style={[defaultStyles.root, { borderColor: borderColorAnimated }, containerStyle]}>
      <TextInput
        editable={!disabled}
        placeholderTextColor={disabled ? colors.disabledInputPlaceholder : colors.secondaryGrey}
        onSubmitEditing={onSubmitEditing}
        style={[defaultStyles.input, inputSizeStyles[size], typeStyle.input, style, disabled && defaultStyles.disabled]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {children}
    </Animated.View>
  );
}

export const inputSizeStyles = StyleSheet.create({
  [InputSize.SMALL]: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    ...textTypesStyles[TextTypes.BODY_SMALL],
  },
  [InputSize.MEDIUM]: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    ...textTypesStyles[TextTypes.BODY_MEDIUM],
  },
});

export const coloredDefaultStyles = (themeColors: ThemeColors, isDisabled: boolean) =>
  StyleSheet.create({
    root: {
      width: 'auto',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: DEFAULT_BORDER_RADIUS,
      ...(isDisabled && { borderWidth: 0 }),
    },
    input: {
      flex: 1,
      color: themeColors.black,
      borderRadius: DEFAULT_BORDER_RADIUS,
      backgroundColor: themeColors.white,
    },
    disabled: {
      color: themeColors.text,
    },
  });

export const inputTypesStyles = (themeColors: ThemeColors, isDisabled: boolean) => ({
  [InputType.GREY]: StyleSheet.create({
    input: {
      backgroundColor: themeColors.borderGrey,
      ...(isDisabled && { color: themeColors.midGreyA() }),
    },
  }),
  [InputType.WHITE]: StyleSheet.create({
    input: {
      borderColor: themeColors.borderGrey,
      borderWidth: 1,
      ...(isDisabled && { backgroundColor: themeColors.midGreyA(), borderColor: themeColors.midGreyA() }),
    },
  }),
});

export default Input;
