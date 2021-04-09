import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useStateSelector } from '#hooks/useReduxStateSelector';
import useColoredStyles from '#hooks/useColoredStyles';
import Button, { ButtonType } from '#components/Buttons';
import Text, { TextTypes } from '#components/Text';
import Input from '#components/Input';
import { ThemeColors } from '#utils/theme/types';
import { changePassword } from '#redux/actions/User';
import User from '#types/User';

export interface ProfileFormInputs {
  login: string;
  password: string;
}

const profileSchema = yup.object().shape({
  login: yup.string().min(2, 'your_name_min_length_error').max(30, 'your_name_max_length_error').required().trim(),
  password: yup.string().required('password_required_error').min(8, 'password_min_length'),
});

interface Props {
  user: User;
}

export default function ProfileForm({ user }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const styles = useColoredStyles(coloredStyles);
  const { changePasswordLoading } = useStateSelector((state) => state.user);

  const { control, handleSubmit, errors, formState } = useForm({
    mode: 'all',
    resolver: yupResolver(profileSchema),
    defaultValues: {
      login: user.login,
      password: user.password,
    },
  });

  const responseText = t('changed_password');

  const onSubmit = (data: ProfileFormInputs) => dispatch(changePassword(user.id, data, responseText));

  return (
    <View style={styles.form}>
      <Text type={TextTypes.H4} style={styles.formText}>
        {t('username')}
      </Text>
      <Controller
        control={control}
        name="login"
        render={({ onChange, value }) => (
          <Input
            style={styles.formInput}
            value={value}
            autoCapitalize="none"
            placeholder={t('enter_name')}
            onChange={({ nativeEvent }) => onChange(nativeEvent.text)}
          />
        )}
      />
      {!!errors.login?.message && <Text style={styles.errorText}>{t(errors.login.message)}</Text>}
      <Text type={TextTypes.H4} style={styles.formText}>
        {t('password')}
      </Text>
      <Controller
        control={control}
        name="password"
        render={({ onChange, value }) => (
          <Input
            containerStyle={styles.formInput}
            value={value}
            secureTextEntry={true}
            placeholder={t('password')}
            onChange={({ nativeEvent }) => onChange(nativeEvent.text)}
          />
        )}
      />
      {!!errors.password?.message && <Text style={styles.errorText}>{t(errors.password.message)}</Text>}
      <Button
        type={ButtonType.PRIMARY}
        style={styles.formButton}
        disabled={!!errors.login || !!errors.password || !formState.isDirty}
        isLoading={changePasswordLoading}
        onPress={handleSubmit(onSubmit)}
      >
        {t('edit')}
      </Button>
    </View>
  );
}

const coloredStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    form: {
      width: '80%',
    },
    formText: {
      marginLeft: 4,
    },
    formInput: {
      marginTop: 4,
      marginBottom: 8,
    },
    formButton: {
      marginTop: 16,
    },
    errorText: {
      marginBottom: 4,
      color: themeColors.danger,
    },
  });
