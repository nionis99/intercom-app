import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useAppState } from '#contexts/AppContext';
import useColoredStyles from '#hooks/useColoredStyles';
import LanguagePicker from '#components/Buttons/ProfileHeaderRight/LanguagePicker';
import { ThemeColors, ThemeType } from '#utils/theme/types';
import { Theme } from '#utils/theme';

const ProfileHeaderRightButtons = () => {
  const { theme, setTheme } = useAppState();
  const coloredStyles = useColoredStyles(styles, theme);

  return (
    <View style={coloredStyles.header}>
      <TouchableOpacity onPress={() => setTheme(theme.dark ? Theme.light : Theme.dark)}>
        <Icon name="moon" size={26} style={coloredStyles.themeButton} />
      </TouchableOpacity>
      <LanguagePicker style={coloredStyles.flagButton} />
    </View>
  );
};

export default ProfileHeaderRightButtons;

const styles = (themeColors: ThemeColors, theme: ThemeType) =>
  StyleSheet.create({
    header: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
    themeButton: { marginRight: 16, color: theme.dark ? themeColors.white : themeColors.dark },
    flagButton: { marginRight: 8 },
  });
