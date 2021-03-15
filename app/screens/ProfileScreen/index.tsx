import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAppState } from '#contexts/AppContext';
import useColoredStyles from '#hooks/useColoredStyles';
import Button, { ButtonType } from '#components/Buttons';
import ProfileForm from '#components/Forms/ProfileForm';
import LoadingView from '#components/LoadingView';
import Avatar from 'react-native-elements/dist/avatar/Avatar';
import avatarSrc from '#assets/images/user.png';
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
        <Avatar size="xlarge" source={avatarSrc} containerStyle={styles.avatar} />
        <ProfileForm user={{ username: 'Ivan', email: 'ivan@gmail.com' }} />
        <View style={styles.buttons}>
          <Button style={styles.button} onPress={() => null}>
            {t('change_password')}
          </Button>
          <Button style={styles.button} type={ButtonType.DANGER} onPress={logoutUser}>
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
      backgroundColor: themeColors.background,
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
    avatar: {
      marginTop: 20,
      marginBottom: 15,
    },
  });

export default ProfileScreen;
