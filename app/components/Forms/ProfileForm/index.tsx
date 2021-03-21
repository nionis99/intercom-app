import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import useColoredStyles from '#hooks/useColoredStyles';
import Button, { ButtonType } from '#components/Buttons';
import Text, { TextTypes } from '#components/Text';
import Input from '#components/Input';
import { ThemeColors } from '#utils/theme/types';
import { InputSize } from '#components/Input/types';

interface ProfileFormInputs {
  username: string;
  email: string;
}

const profileSchema = yup.object().shape({
  username: yup.string().min(2, 'your_name_min_length_error').max(30, 'your_name_max_length_error').required().trim(),
  email: yup.string().email('please_enter_valid_email').nullable(),
});

interface Props {
  user: { username: string; email: string };
}

export default function ProfileForm({ user }: Props) {
  const { t } = useTranslation();
  const styles = useColoredStyles(coloredStyles);

  const { control, handleSubmit, errors, formState } = useForm({
    mode: 'all',
    resolver: yupResolver(profileSchema),
    defaultValues: {
      username: user.username || '',
      email: user.email || '',
    },
  });

  const onSubmit = (formData: ProfileFormInputs) => {
    console.log(formData);
  };

  return (
    <View style={styles.form}>
      <Text type={TextTypes.H4} style={styles.formText}>
        {t('username')}
      </Text>
      <Controller
        control={control}
        name="username"
        render={({ onChange, value }) => (
          <Input
            style={styles.formInput}
            size={InputSize.SMALL}
            value={value}
            autoCapitalize="none"
            placeholder={t('enter_name')}
            onChange={({ nativeEvent }) => onChange(nativeEvent.text)}
          />
        )}
      />
      {!!errors.username?.message && <Text style={styles.errorText}>{t(errors.username.message)}</Text>}
      <Text type={TextTypes.H4} style={styles.formText}>
        {t('email')}
      </Text>
      <Controller
        control={control}
        name="email"
        render={({ onChange, value }) => (
          <Input
            containerStyle={styles.formInput}
            size={InputSize.SMALL}
            value={value}
            autoCapitalize="none"
            placeholder={t('enter_email')}
            onChange={({ nativeEvent }) => onChange(nativeEvent.text)}
          />
        )}
      />
      {!!errors.email?.message && <Text style={styles.errorText}>{t(errors.email.message)}</Text>}
      <Button
        type={ButtonType.PRIMARY}
        style={styles.formButton}
        disabled={!!errors.username || !!errors.email || !formState.isDirty}
        isLoading={false}
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
