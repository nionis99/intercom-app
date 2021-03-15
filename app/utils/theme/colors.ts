/**
 * App Colors:
 * This contains all the color config for the application
 */

import { DefaultTheme, DarkTheme } from '@react-navigation/native';

import { ThemeType, ThemeVariantType, StaticColorsType } from './types';

export const ThemeVariant: ThemeVariantType = {
  light: 'light',
  dark: 'dark',
};

export const LightThemeColors: StaticColorsType = {
  primary: '#1c9cc4',
  secondary: '#f8941c',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#2A3639',
  darkGrey: 'rgb(109, 109, 102)',
  midGrey: 'rgb(112, 112, 112)',
  lightGrey: 'rgb(242, 242, 242)',
  blue: 'rgb(0, 122, 255)',
  dark: 'rgb(43, 46, 52)',
  primaryA: (alpha) => `'rgba(28, 156, 196, ${alpha})'`,
  secondaryA: (alpha) => `'rgba(245,145,25, ${alpha})'`,
  dangerA: (alpha) => `'rgba(222, 28, 34, ${alpha})'`,
  blackA: (alpha) => `'rgba(0, 0, 0, ${alpha})'`,
  whiteA: (alpha) => `'rgba(255, 255, 255, ${alpha})'`,
  midGreyA: (alpha = 0.5) => `'rgba(127, 127, 127, ${alpha})'`,
  lightGreyA: (alpha = 0.33) => `'rgba(171, 171, 171, ${alpha})'`,
  success: 'rgb(143, 209, 128)',
  danger: '#ff0000',
  warning: '#ffa500',
  transparent: 'transparent',
  headerButton: 'rgb(82, 173, 128)',
  description: '',
  // only for now while colors are not ready
  lightGreen: '#98CDB2',
  greyBorder: 'rgba(229, 230, 230, 0.2)',
  secondaryGreen: '#D6ECE2',
  primaryGreenDark: '#39795A',
  // only while all colors are not defined
  greyColor: '#2A3639',
  borderGreyA: (alpha = 1) => `'rgba(229,230,230, ${alpha})'`,
  badgeGrey: '#50595C',
  borderColor: '#EFEFEF',
  greyBackground: 'rgb(247, 247, 247)',
  secondaryGrey: '#50595C',
  borderGrey: '#E5E6E6',
  supportSuccess: '#008556',
  semiWhiteBackground: '#F7F7F7',
  inputFocusedBorder: '#52AD80',
  invalidForm: '#DE1C22',
  disabledInputPlaceholder: '#9A9FA0',
  background: '#FFFFFF',
};

export const DarkThemeColors: StaticColorsType = {
  primary: '#1c9cc4',
  secondary: '#f8941c',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#2A3639',
  darkGrey: 'rgb(109, 109, 102)',
  midGrey: 'rgb(112, 112, 112)',
  lightGrey: 'rgb(242, 242, 242)',
  blue: 'rgb(0, 122, 255)',
  dark: 'rgb(43, 46, 52)',
  primaryA: (alpha) => `'rgba(28, 156, 196, ${alpha})'`,
  secondaryA: (alpha) => `'rgba(245,145,25, ${alpha})'`,
  dangerA: (alpha) => `'rgba(222, 28, 34, ${alpha})'`,
  blackA: (alpha) => `'rgba(0, 0, 0, ${alpha})'`,
  whiteA: (alpha) => `'rgba(255, 255, 255, ${alpha})'`,
  midGreyA: (alpha = 0.5) => `'rgba(127, 127, 127, ${alpha})'`,
  lightGreyA: (alpha = 0.33) => `'rgba(171, 171, 171, ${alpha})'`,
  success: 'rgb(143, 209, 128)',
  danger: '#ff0000',
  warning: '#ffa500',
  transparent: 'transparent',
  headerButton: 'rgb(82, 173, 128)',
  description: '',
  // only for now while colors are not ready
  lightGreen: '#98CDB2',
  greyBorder: 'rgba(229, 230, 230, 0.2)',
  secondaryGreen: '#D6ECE2',
  primaryGreenDark: '#39795A',
  // only while all colors are not defined
  greyColor: '#2A3639',
  borderGreyA: (alpha = 1) => `'rgba(229,230,230, ${alpha})'`,
  badgeGrey: '#50595C',
  borderColor: '#EFEFEF',
  greyBackground: 'rgb(247, 247, 247)',
  secondaryGrey: '#50595C',
  borderGrey: '#E5E6E6',
  supportSuccess: '#008556',
  semiWhiteBackground: '#F7F7F7',
  inputFocusedBorder: '#52AD80',
  invalidForm: '#DE1C22',
  disabledInputPlaceholder: '#9A9FA0',
  background: '#000000',
};

export const Theme: {
  [key: string]: ThemeType;
} = {
  light: {
    type: 'light',
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...LightThemeColors,
      icon: LightThemeColors.black,
      background: LightThemeColors.greyBackground,
      border: LightThemeColors.blackA(0.1),
      button: LightThemeColors.blackA(0.1),
      buttonDisabled: LightThemeColors.blackA(0.05),
      placeholder: LightThemeColors.blackA(0.3),
      description: LightThemeColors.blackA(0.5),
    },
  },
  dark: {
    type: 'dark',
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...DarkThemeColors,
      icon: DarkThemeColors.white,
      button: DarkThemeColors.white,
      buttonDisabled: DarkThemeColors.whiteA(0.2),
      placeholder: DarkThemeColors.whiteA(0.3),
      description: DarkThemeColors.whiteA(0.5),
    },
  },
};
