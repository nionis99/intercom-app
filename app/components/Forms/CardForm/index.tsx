import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { Picker } from '@react-native-community/picker';
import * as yup from 'yup';

import { useStateSelector } from '#hooks/useReduxStateSelector';
import useColoredStyles from '#hooks/useColoredStyles';
import Button, { ButtonType } from '#components/Buttons';
import Text, { TextTypes } from '#components/Text';
import Input from '#components/Input';
import LoadingView from '#components/LoadingView';
import { getCardTypes } from '#redux/actions/CardTypes';
import { ThemeColors } from '#utils/theme/types';
import Card from '#types/Card';

export interface CardFormInputs {
  id: number;
  account_id: number;
  card_no: string;
  type_id: string;
  type: string;
  note: string;
}

const cardSchema = yup.object().shape({
  card_no: yup.string().required('card_no_required'),
  type_id: yup.string(),
  type: yup.string(),
  note: yup.string().trim(),
});

interface Props {
  editingCard?: Card;
  onSubmit: (data: CardFormInputs) => void;
  onCancel: () => void;
}

const CardForm = ({ editingCard, onSubmit, onCancel }: Props) => {
  const { t } = useTranslation();
  const styles = useColoredStyles(coloredStyles);
  const dispatch = useDispatch();
  const { cardTypesLoading, cardTypesData } = useStateSelector((state) => state.cardTypes);
  const { createLoading, updateLoading } = useStateSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getCardTypes());
  }, [dispatch]);

  const { control, handleSubmit, errors, setValue } = useForm({
    mode: 'all',
    resolver: yupResolver(cardSchema),
    defaultValues: {
      id: editingCard?.id,
      card_no: editingCard?.card_no || '',
      type_id: editingCard?.type_id.toString() || '',
      type: editingCard?.type || '',
      note: editingCard?.note || '',
    },
  });

  const onFormSubmit = (data: CardFormInputs) => {
    console.log(data);
    return onSubmit(data);
  };

  if (cardTypesLoading) return <LoadingView />;

  return (
    <View style={styles.form}>
      <Text type={TextTypes.H4} style={styles.formText}>
        {t('card_no')}
      </Text>
      <Controller
        control={control}
        name="card_no"
        render={({ onChange, value }) => (
          <Input
            containerStyle={styles.formInput}
            value={value}
            placeholder={t('card_no')}
            onChange={({ nativeEvent }) => onChange(nativeEvent.text)}
          />
        )}
      />
      {!!errors.card_no?.message && <Text style={styles.errorText}>{t(errors.card_no.message)}</Text>}
      <Text type={TextTypes.H4} style={styles.formText}>
        {t('type')}
      </Text>
      <Controller
        control={control}
        render={({ value }) => (
          <Picker selectedValue={value} onValueChange={(itemValue) => setValue('type', itemValue)}>
            {cardTypesData.map((cardType) => (
              <Picker.Item key={cardType.id} label={cardType.name} value={cardType.id} />
            ))}
          </Picker>
        )}
        name="type_id"
      />
      {!!errors.type?.message && <Text style={styles.errorText}>{t(errors.type.message)}</Text>}
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
      <View style={styles.modalButtons}>
        <Button
          type={ButtonType.PRIMARY}
          style={styles.primaryModalButton}
          isLoading={createLoading || updateLoading}
          onPress={handleSubmit(onFormSubmit)}
        >
          {t(editingCard ? 'edit' : 'create')}
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
  });

export default CardForm;
