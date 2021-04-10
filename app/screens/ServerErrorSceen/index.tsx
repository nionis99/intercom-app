import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import RNRestart from 'react-native-restart';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

import { LightThemeColors } from '#utils/theme/colors';
import Text, { TextTypes } from '#components/Text';

const ServerErrorScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.root}>
      <FontAwesomeIcon name="warning" size={60} color={LightThemeColors.primary} />
      <Text type={TextTypes.H1}>{t('internal_server_error')}</Text>
      <Text type={TextTypes.BODY_MEDIUM} style={styles.text}>
        {t('technical_problem_message')}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => RNRestart.Restart()}>
        <Text type={TextTypes.H4} style={styles.buttonText}>
          {t('restart_application_button')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 2,
    height: '100%',
    width: '100%',
    backgroundColor: LightThemeColors.white,
  },
  text: {
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: LightThemeColors.primary,
    borderRadius: 2,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: LightThemeColors.white,
  },
});

export default ServerErrorScreen;
