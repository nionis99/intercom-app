import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAppState } from '#contexts/AppContext';
import Button, { ButtonType } from '#components/Buttons';
import Text, { TextTypes } from '#components/Text';
import LoadingView from '#components/LoadingView';
import useColoredStyles from '#hooks/useColoredStyles';
import { ThemeColors } from '#utils/theme/types';

function ProfileScreen() {
  const { t } = useTranslation();
  const { logout } = useAppState();
  const styles = useColoredStyles(coloredStyles);
  const [isLogoutLoading, setIsLogoutLoading] = useState<boolean>(false);

  const logoutUser = async () => {
    setIsLogoutLoading(true);
    logout();
    setIsLogoutLoading(false);
  };

  if (isLogoutLoading) {
    return <LoadingView title={t('logging_out')} />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
        <Text type={TextTypes.H3} style={styles.userText}>
          {t('profile')}
        </Text>
        <View style={styles.buttons}>
          <Button style={styles.button} type={ButtonType.PRIMARY} onPress={logoutUser}>
            {t('log_out')}
          </Button>
        </View>
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

export default ProfileScreen;
