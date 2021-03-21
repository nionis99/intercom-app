import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useAppState } from '#contexts/AppContext';
import useColoredStyles from '#hooks/useColoredStyles';
import LanguagePicker from '#components/Buttons/LanguagePicker';
import { ThemeColors, ThemeType } from '#utils/theme/types';
import { Theme } from '#utils/theme';

const HeaderRightButtons = () => {
  const { theme, setTheme } = useAppState();
  const coloredStyles = useColoredStyles(styles, theme);

  return (
    <View style={coloredStyles.header}>
      <Icon
        name="moon"
        size={26}
        style={coloredStyles.themeButton}
        onPress={() => setTheme(theme.dark ? Theme.light : Theme.dark)}
      />
      <LanguagePicker style={coloredStyles.flagButton} />
    </View>
  );
};

export default HeaderRightButtons;

const styles = (themeColors: ThemeColors, theme: ThemeType) =>
  StyleSheet.create({
    header: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
    themeButton: { marginRight: 16, color: theme.dark ? themeColors.white : themeColors.dark },
    flagButton: { marginRight: 8 },
  });
