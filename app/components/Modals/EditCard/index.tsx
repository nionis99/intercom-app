import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';

import useColoredStyles from '#hooks/useColoredStyles';
import CardForm, { CardFormInputs } from '#components/Forms/CardForm';
import ModalView from '#components/Modals';
import Text, { TextTypes } from '#components/Text';
import { updateCard } from '#redux/actions/Cards';
import { ThemeColors } from '#utils/theme/types';
import { Maybe } from '#types';
import Card from '#types/Card';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  editingCard: Maybe<Card>;
  show: boolean;
  onClose: () => void;
}

const EditCardModal = ({ editingCard, show, onClose }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const coloredStyles = useColoredStyles(styles);

  const responseText = t('card_updated');

  const onUpdateCard = async (data: CardFormInputs) => {
    if (editingCard) await dispatch(updateCard(data, editingCard.id, responseText));
    onClose();
  };

  return (
    <ModalView show={show} onClose={onClose}>
      <KeyboardAwareScrollView style={coloredStyles.scroll}>
        <SafeAreaView style={coloredStyles.modalContent}>
          <Text type={TextTypes.H2} style={coloredStyles.sectionTitle}>
            {t('edit_card')}
          </Text>
          {editingCard && <CardForm editingCard={editingCard} onSubmit={onUpdateCard} onCancel={onClose} />}
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </ModalView>
  );
};

const styles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    scroll: {
      width: '100%',
      height: '100%',
      backgroundColor: themeColors.background,
    },
    modalContent: {
      backgroundColor: themeColors.background,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    sectionTitle: {
      padding: 16,
      textAlign: 'center',
    },
  });

export default EditCardModal;
