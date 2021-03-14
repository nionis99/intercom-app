import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Flag from 'react-native-flags-typescript';

import { useLanguageContext } from '#contexts/LanguageContext';
import Text, { TextTypes } from '#components/Text';
import { ThemeColors } from '#utils/theme/types';
import { useTheme } from '#utils/theme';

interface Props {
  flagCode: string;
  title: string;
}

const Language = ({ title, flagCode }: Props) => {
  const { colors } = useTheme();
  const {
    changeLanguage,
    setIsChangeLanguageModalVisible,
    getLanguageFromFlagCode,
  } = useLanguageContext();

  const selectLanguage = () => {
    setIsChangeLanguageModalVisible(false);
    const langugeFromCode = getLanguageFromFlagCode(flagCode);

    return changeLanguage(langugeFromCode);
  };

  return (
    <TouchableOpacity style={styles(colors).root} onPress={selectLanguage}>
      <Flag code={flagCode} size={48} type="flat" style={styles().flag} />
      <Text type={TextTypes.H2}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = (themeColors = {} as ThemeColors) =>
  StyleSheet.create({
    root: {
      flexDirection: 'row',
      marginVertical: 8,
      alignItems: 'center',
      borderBottomColor: themeColors.greyBorder,
      borderBottomWidth: 1,
      paddingHorizontal: 4,
      paddingVertical: 8,
    },
    flag: {
      marginRight: 8,
    },
  });

export default Language;
