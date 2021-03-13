import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';

import Button, {ButtonSize, ButtonType} from '#components/Buttons';
import Text, {TextTypes} from '#components/Text';
import {UnauthorizedStackParamList} from '#navigation/UnauthorizedStack';

type ScreenNavigationProp = StackNavigationProp<UnauthorizedStackParamList, 'Login'>;

type Props = {
  navigation: ScreenNavigationProp;
};

function LoginScreen({navigation}: Props) {
  const {t} = useTranslation();

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.root}>
      <View style={styles.formContainer}>
        <Text type={TextTypes.H1} style={styles.welcome}>
          {t('Login')}
        </Text>
        <Text type={TextTypes.BODY_SMALL} style={styles.explain}>
          {t('confirm_your_number_explanation')}
        </Text>
        <Button type={ButtonType.PRIMARY} size={ButtonSize.LARGE} onPress={() => null} style={styles.button}>
          {t('continue')}
        </Button>
        <Text style={styles.description}>{t('make_sure_you_can_receive_sms_explanation')}</Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    maxWidth: 500,
  },
  welcome: {
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  explain: {
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
  },
  description: {
    marginTop: 20,
  },
});

export default LoginScreen;
