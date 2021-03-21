import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button, { ButtonSize, ButtonType } from '#components/Buttons';
import Text, { TextTypes } from '#components/Text';
import Divider from '#components/Divider';
import Input from '#components/Input';
import { ThemeColors } from '#utils/theme/types';
import useColoredStyles from 'app/hooks/useColoredStyles';
import { useAppState } from '#contexts/AppContext';

export interface LoginFormInputs {
  username: string;
  password: string;
}

function LoginScreen() {
  const { t } = useTranslation();
  const styles = useColoredStyles(coloredStyles);
  const { authTokenSave } = useAppState();

  const loginSchema = yup.object().shape({
    username: yup.string().required(t('name_required_error')),
    password: yup.string().required(t('password_required_error')),
  });

  const { control, errors, handleSubmit } = useForm<LoginFormInputs>({
    mode: 'all',
    resolver: yupResolver(loginSchema),
  });

  const handleLoginSubmit = (data: LoginFormInputs) => {
    console.log(data);
    authTokenSave(data.username);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.root}>
      <View style={styles.formContainer}>
        <Text type={TextTypes.H3} style={styles.welcome}>
          {t('please_log_in')}
        </Text>
        <Text type={TextTypes.H4} style={styles.firstLabel}>
          {t('username')}
        </Text>
        <Controller
          control={control}
          name="username"
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              placeholder={t('username')}
              value={value}
              onChange={({ nativeEvent }) => onChange(nativeEvent.text)}
            />
          )}
        />
        {!!errors.username?.message && <Text style={styles.invalidInput}>{errors.username.message}</Text>}
        <Text type={TextTypes.H4} style={styles.label}>
          {t('password')}
        </Text>
        <Controller
          control={control}
          name="password"
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              placeholder={t('password')}
              value={value}
              secureTextEntry={true}
              onChange={({ nativeEvent }) => onChange(nativeEvent.text)}
            />
          )}
        />
        {!!errors.password?.message && <Text style={styles.invalidInput}>{errors.password.message}</Text>}
        <Button
          type={ButtonType.PRIMARY}
          size={ButtonSize.LARGE}
          onPress={handleSubmit(handleLoginSubmit)}
          style={styles.button}
        >
          {t('login')}
        </Button>
        <Divider />
      </View>
    </KeyboardAwareScrollView>
  );
}

const coloredStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
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
    invalidInput: {
      color: themeColors.danger,
    },
    firstLabel: {
      marginBottom: 5,
    },
    label: {
      marginTop: 10,
      marginBottom: 5,
    },
    button: {
      marginTop: 15,
    },
    description: {
      marginTop: 20,
    },
  });

export default LoginScreen;
