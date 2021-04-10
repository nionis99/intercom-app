import React from 'react';
import { Modal, SafeAreaView, StyleSheet, TouchableHighlight, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

import { ThemeColors } from '#utils/theme/types';
import Language from './Language';
import { useLanguageContext } from '#contexts/LanguageContext';
import useColoredStyles from 'app/hooks/useColoredStyles';
import Text, { TextTypes } from '#components/Text';
import { Theme } from '@react-navigation/native';
import { useAppState } from '#contexts/AppContext';

const DATA = [
  {
    id: '1',
    title: 'English',
    flagCode: 'GB',
  },
  {
    id: '2',
    title: 'Lithuanian',
    flagCode: 'LT',
  },
];

const LanguageSwitcherModal = () => {
  const { t } = useTranslation();
  const { theme } = useAppState();
  const styles = useColoredStyles(coloredStyles, theme);

  const { isChangeLanguageModalVisible, setIsChangeLanguageModalVisible } = useLanguageContext();

  return (
    <Modal
      visible={isChangeLanguageModalVisible}
      presentationStyle="overFullScreen"
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsChangeLanguageModalVisible(false)}
    >
      <TouchableHighlight
        style={styles.background}
        onPressOut={() => setIsChangeLanguageModalVisible(false)}
        underlayColor={'transparent'}
      >
        <></>
      </TouchableHighlight>
      <View style={styles.outerContainer}>
        <Text type={TextTypes.H1} style={styles.modalTitle}>
          {t('select_language')}
        </Text>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Language title={item.title} flagCode={item.flagCode} />}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const coloredStyles = (themeColors: ThemeColors, theme: Theme) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      paddingVertical: 16,
    },
    modalTitle: {
      padding: 16,
    },
    outerContainer: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      backgroundColor: themeColors.background,
      shadowColor: themeColors.lightGrey,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    background: {
      backgroundColor: theme.dark ? themeColors.whiteA(0.4) : themeColors.midGreyA(0.4),
      flex: 1,
    },
  });

export default LanguageSwitcherModal;
