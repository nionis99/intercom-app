import { useTheme } from '#utils/theme';
import { ThemeColors } from '#utils/theme/types';
import { useMemo } from 'react';

function useColoredStyles<T, A, U extends A[]>(
  style: (themeColors: ThemeColors, ...args: U) => T,
  ...args: U
): T {
  const { colors } = useTheme();

  return useMemo(() => style(colors, ...args), [colors, style, args]);
}

export default useColoredStyles;
