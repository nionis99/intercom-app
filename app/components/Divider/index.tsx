import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemeColors } from '#utils/theme/types';
import useColoredStyles from '#hooks/useColoredStyles';

export enum DividerSpacings {
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  NULL = 'NULL',
}

interface DividerProps {
  spacing?: DividerSpacings;
}

const Divider = ({ spacing = DividerSpacings.NULL }: DividerProps) => {
  const styles = useColoredStyles(coloredStyles);

  return <View style={[styles.root, styles[spacing]]} />;
};

const coloredStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    root: {
      width: '100%',
      height: 1,
      backgroundColor: themeColors.borderGrey,
    },
    [DividerSpacings.NULL]: {
      marginVertical: 0,
    },
    [DividerSpacings.SM]: {
      marginVertical: 12,
    },
    [DividerSpacings.MD]: {
      marginVertical: 16,
    },
    [DividerSpacings.LG]: {
      marginVertical: 24,
    },
  });

export default Divider;
