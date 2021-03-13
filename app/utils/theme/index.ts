import {useTheme as parentUseTheme} from '@react-navigation/native';
import {ThemeColors} from './types';
import {Theme, ThemeVariant} from './colors';

export {Theme, ThemeVariant};
export const DEFAULT_SIDE_PADDING = '3.8%';
export const DEFAULT_BORDER_RADIUS = 8;

// @ts-ignore
export const useTheme = (): {colors: ThemeColors} => parentUseTheme();
