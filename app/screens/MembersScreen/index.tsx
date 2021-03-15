import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import useColoredStyles from '#hooks/useColoredStyles';
import Text, { TextTypes } from '#components/Text';
import { ThemeColors } from '#utils/theme/types';

function MembersScreen() {
  const { t } = useTranslation();
  const styles = useColoredStyles(coloredStyles);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
        <Text type={TextTypes.H3} style={styles.userText}>
          {t('members')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const coloredStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    root: {
      backgroundColor: themeColors.white,
    },
    scroll: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
    },
    contentContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    userText: {
      marginTop: 24,
      marginBottom: 16,
    },
    buttons: {
      width: '60%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      marginTop: 40,
      marginBottom: 32,
    },
    button: {
      marginTop: 8,
    },
  });

export default MembersScreen;
