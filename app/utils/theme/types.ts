import { Theme } from '@react-navigation/native';

export type StaticColorsType = {
  primary: string;
  secondary: string;
  white: string;
  black: string;
  grey: string;
  darkGrey: string;
  midGrey: string;
  lightGrey: string;
  blue: string;
  dark: string;
  primaryA: (alpha: number) => string;
  secondaryA: (alpha: number) => string;
  dangerA: (alpha: number) => string;
  blackA: (alpha: number) => string;
  whiteA: (alpha: number) => string;
  midGreyA: (alpha?: number) => string;
  lightGreyA: (alpha?: number) => string;
  success: string;
  danger: string;
  warning: string;
  transparent: string;
  headerButton: string;
  description: string;
  // only for now, while colors are not ready
  lightGreen: string;
  greyBackground: string;
  greyBorder: string;
  secondaryGreen: string;
  primaryGreenDark: string;
  greyColor: string;
  borderGreyA: (alpha?: number) => string;
  badgeGrey: string;
  borderColor: string;
  secondaryGrey: string;
  borderGrey: string;
  supportSuccess: string;
  semiWhiteBackground: string;
  inputFocusedBorder: string;
  invalidForm: string;
  disabledInputPlaceholder: string;
};

export interface ThemeColors extends StaticColorsType {
  primary: string;
  background: string;
  notification: string;
  card: string;
  text: string;
  border: string;
  placeholder: string;
  button: string;
  buttonDisabled: string;
  icon: string;
}

export type ThemeVariantType = {
  light: string;
  dark: string;
};

export interface ThemeType extends Theme {
  type: string;
  colors: ThemeColors;
}

export enum OrientationType {
  PORTRAIT = 'portrait',
  PORTRAIT_UPSIDE_DOWN = 'portrait-upside-down',
  LANDSCAPE = 'landscape',
  LANDSCAPE_LEFT = 'landscape-left',
  LANDSCAPE_RIGHT = 'landscape-right',
}

export const supportedOrientations = Object.values(OrientationType);
