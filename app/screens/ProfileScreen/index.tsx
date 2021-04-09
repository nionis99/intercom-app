import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Avatar from 'react-native-elements/dist/avatar/Avatar';

import { useAppState } from '#contexts/AppContext';
import useColoredStyles from '#hooks/useColoredStyles';
import Button, { ButtonType } from '#components/Buttons';
import ProfileForm from '#components/Forms/ProfileForm';
import LoadingView from '#components/LoadingView';
import avatarSrc from '#assets/images/user.png';
import { ThemeColors } from '#utils/theme/types';
import { logout } from '#redux/actions/Authorization';

function ProfileScreen() {
  const { t } = useTranslation();
  const { authTokenSave, user } = useAppState();
  const styles = useColoredStyles(coloredStyles);
  const [isLogoutLoading, setIsLogoutLoading] = useState<boolean>(false);

  const logoutUser = async () => {
    setIsLogoutLoading(true);
    await logout(authTokenSave, setIsLogoutLoading);
  };

  if (isLogoutLoading) {
    return <LoadingView title={t('logging_out')} />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
        <Avatar size="xlarge" source={avatarSrc} containerStyle={styles.avatar} />
        {!!user && <ProfileForm user={user} />}
        <View style={styles.buttons}>
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
