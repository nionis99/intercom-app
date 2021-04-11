import React from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Switch, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useStateSelector } from '#hooks/useReduxStateSelector';
import useColoredStyles from '#hooks/useColoredStyles';
import Button, { ButtonType } from '#components/Buttons';
import Text, { TextTypes } from '#components/Text';
import Input from '#components/Input';
import { ThemeColors } from '#utils/theme/types';
import { DEFAULT_MEMBER_NAME } from '#utils/constants';
import { Maybe } from '#types';
import Member from '#types/Member';
import { useUserState } from '#contexts/UserContext';
import { LightThemeColors } from '#utils/theme/colors';

export interface MemberFormInputs {
  id: number;
  flat_id: Maybe<number>;
  is_active: boolean;
  name: string;
  email: string;
  phone: string;
  note: string;
  pin: string;
}

const memberSchema = yup.object().shape({
  is_active: yup.boolean(),
  name: yup.string().required('name_required').trim(),
  email: yup.string().email('email_format'),
  phone: yup.string(),
  note: yup.string().trim(),
  pin: yup
    .string()
    .required('required_pin_code')
    .matches(/^[0-9]*$/, 'pin_format')
    .trim(),
});

interface Props {
  editingMember?: Member;
  onSubmit: (data: MemberFormInputs) => void;
  onCancel: () => void;
}

const MemberForm = ({ editingMember, onSubmit, onCancel }: Props) => {
  const { t } = useTranslation();
  const { selectedFlatId } = useUserState();
  const styles = useColoredStyles(coloredStyles);
  const { changePasswordLoading } = useStateSelector((state) => state.user);

  const onFormSubmit = (data: MemberFormInputs) => onSubmit({ ...data, flat_id: parseInt(selectedFlatId || '', 0) });

  const { control, handleSubmit, errors } = useForm({
    mode: 'all',
    resolver: yupResolver(memberSchema),
    defaultValues: {
      is_active: editingMember?.is_active || true,
      name: editingMember?.name || t(DEFAULT_MEMBER_NAME),
      email: editingMember?.email || '',
      phone: editingMember?.phone || '',
      note: editingMember?.note || '',
      pin: editingMember?.pin || '',
    },
  });

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="is_active"
        render={({ onChange, value }) => (
          <Switch
            trackColor={{ false: LightThemeColors.midGrey, true: LightThemeColors.primary }}
            thumbColor={LightThemeColors.white}
            ios_backgroundColor={LightThemeColors.midGrey}
            onValueChange={onChange}
            value={value}
          />
        )}
      />
      <Text type={TextTypes.H4} style={styles.formText}>
        {t('name')}
      </Text>
      <Controller
        control={control}
        name="name"
        render={({ onChange, value }) => (
          <Input
            containerStyle={styles.formInput}
            value={value}
            placeholder={t('name')}
            onChange={({ nativeEvent }) => onChange(nativeEvent.text)}
          />
        )}
      />
      {!!errors.name?.message && <Text style={styles.errorText}>{t(errors.name.message)}</Text>}
      <Text type={TextTypes.H4} style={styles.formText}>
        {t('email')}
      </Text>
      <Controller
        control={control}
        name="email"
        render={({ onChange, value }) => (
          <Input
            containerStyle={styles.formInput}
            value={value}
            placeholder={t('email')}
            onChange={({ nativeEvent }) => onChange(nativeEvent.text)}
          />
        )}
      />
      {!!errors.email?.message && <Text style={styles.errorText}>{t(errors.email.message)}</Text>}
      <Text type={TextTypes.H4} style={styles.formText}>
        {t('phone_number')}
      </Text>
      <Controller
        control={control}
        name="phone"
        render={({ onChange, value }) => (
          <Input
            containerStyle={styles.formInput}
            value={value}
            placeholder={t('phone_number')}
            onChange={({ nativeEvent }) => onChange(nativeEvent.text)}
          />
        )}
      />
      {!!errors.phone?.message && <Text style={styles.errorText}>{t(errors.phone.message)}</Text>}
      <Text type={TextTypes.H4} style={styles.formText}>
        {t('note')}
      </Text>
      <Controller
        control={control}
        name="note"
        render={({ onChange, value }) => (
          <Input
            containerStyle={styles.formInput}
            value={value}
            placeholder={t('note')}
            onChange={({ nativeEvent }) => onChange(nativeEvent.text)}
          />
        )}
      />
      {!!errors.note?.message && <Text style={styles.errorText}>{t(errors.note.message)}</Text>}
      <Text type={TextTypes.H4} style={styles.formText}>
        {t('pin')}
      </Text>
      <Controller
        control={control}
        name="pin"
        render={({ onChange, value }) => (
          <Input
            containerStyle={styles.formInput}
            value={value}
            placeholder={t('pin')}
            onChange={({ nativeEvent }) => onChange(nativeEvent.text)}
          />
        )}
      />
      {!!errors.pin?.message && <Text style={styles.errorText}>{t(errors.pin.message)}</Text>}
      <View style={styles.modalButtons}>
        <Button
          type={ButtonType.PRIMARY}
          style={styles.primaryModalButton}
          isLoading={changePasswordLoading}
          onPress={handleSubmit(onFormSubmit)}
        >
          {t(editingMember ? 'edit' : 'create')}
        </Button>
        <Button type={ButtonType.SECONDARY} style={styles.secondaryModalButton} onPress={onCancel}>
          {t('cancel')}
        </Button>
      </View>
    </View>
  );
};

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
    modalButtons: {
      width: '100%',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-between',
      marginVertical: 16,
    },
    primaryModalButton: {
      marginRight: 8,
    },
    secondaryModalButton: {
      marginLeft: 8,
    },
    errorText: {
      marginLeft: 4,
      marginBottom: 8,
      color: themeColors.danger,
    },
    thumb: {
      color: themeColors.white,
    },
  });

export default MemberForm;
