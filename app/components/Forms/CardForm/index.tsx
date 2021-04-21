import React, { useState } from 'react';
import { ItemValue } from '@react-native-community/picker/typings/Picker';
import { isIOS } from 'react-native-elements/dist/helpers';
import { Theme, useRoute } from '@react-navigation/native';
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
import { ThemeColors } from '#utils/theme/types';
import Card from '#types/Card';

import { MembersScreenRouteProps } from '#screens/MemberScreen';

import { useAppState } from '#contexts/AppContext';

export interface CardFormInputs {
  id: number;
  account_id: number;
  card_no: string;
  type_id: number;
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
  onSubmit: (data: CardFormInputs) => Promise<void>;
  onCancel: () => void;
}

const CardForm = ({ editingCard, onSubmit, onCancel }: Props) => {
  const { t } = useTranslation();
  const { theme } = useAppState();
  const styles = useColoredStyles(coloredStyles, theme);
  const { params: routeParams } = useRoute<MembersScreenRouteProps>();
  const { cardTypesLoading, cardTypesData } = useStateSelector((state) => state.cardTypes);
  const { createLoading, updateLoading } = useStateSelector((state) => state.cards);
  const [cardTypeId, setCardTypeId] = useState(cardTypesData[0]?.id.toString());
  const [cardType, setCardType] = useState(cardTypesData[0]?.name);

  const { control, handleSubmit, errors } = useForm({
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

  const onFormSubmit = (data: CardFormInputs) =>
    onSubmit({
      ...data,
      account_id: routeParams.member.id,
      type: cardType,
      type_id: parseInt(cardTypeId, 0),
    });

  const onTypeChange = (value: ItemValue) => {
    const typeIndex = cardTypesData.findIndex((cardType) => cardType.id === value);
    setCardTypeId(value.toString());
    setCardType(cardTypesData[typeIndex].name);
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
      <Picker
        selectedValue={cardTypeId}
        onValueChange={onTypeChange}
        style={isIOS ? undefined : styles.picker}
        itemStyle={isIOS ? undefined : styles.pickerItem}
      >
        {cardTypesData.map((cardType) => (
          <Picker.Item
            color={theme.dark && isIOS ? theme.colors.white : theme.colors.black}
            key={cardType.id}
            label={cardType.name}
            value={cardType.id}
          />
        ))}
      </Picker>
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

const coloredStyles = (themeColors: ThemeColors, theme: Theme) =>
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
    picker: {
      color: theme.dark ? themeColors.white : themeColors.black,
      height: 50,
    },
    pickerItem: {
      color: themeColors.black,
    },
  });

export default CardForm;
