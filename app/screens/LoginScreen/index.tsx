import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppState } from '#contexts/AppContext';
import { useStateSelector } from '#hooks/useReduxStateSelector';
import useColoredStyles from '#hooks/useColoredStyles';
import Button, { ButtonType } from '#components/Buttons';
import Text, { TextTypes } from '#components/Text';
import Divider from '#components/Divider';
import Input from '#components/Input';
import { login } from '#redux/actions/Authorization';
import { ThemeColors } from '#utils/theme/types';

export interface LoginFormInputs {
  login: string;
  password: string;
}

function LoginScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const styles = useColoredStyles(coloredStyles);
  const { authTokenSave } = useAppState();
  const { loginLoading } = useStateSelector((state) => state.auth);

  const loginSchema = yup.object().shape({
    login: yup.string().required(t('name_required_error')),
    password: yup.string().required('required_password').min(8, 'password_min_length'),
  });

  const { control, errors, handleSubmit } = useForm<LoginFormInputs>({
    mode: 'all',
    resolver: yupResolver(loginSchema),
  });

  const handleLoginSubmit = (data: LoginFormInputs) => dispatch(login(data, authTokenSave));

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
          name="login"
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              placeholder={t('username')}
              value={value}
              autoCapitalize="none"
              onChange={({ nativeEvent }) => onChange(nativeEvent.text)}
            />
          )}
        />
        {!!errors.login?.message && <Text style={styles.invalidInput}>{t(errors.login.message)}</Text>}
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
        {!!errors.password?.message && <Text style={styles.invalidInput}>{t(errors.password.message)}</Text>}
        <Button
          type={ButtonType.PRIMARY}
          onPress={handleSubmit(handleLoginSubmit)}
          style={styles.button}
          isLoading={loginLoading}
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
