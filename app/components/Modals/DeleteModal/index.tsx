import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import useColoredStyles from '#hooks/useColoredStyles';
import Text, { TextTypes } from '#components/Text';
import Button, { ButtonType } from '#components/Buttons';
import ModalView from '#components/Modals';
import { ThemeColors } from '#utils/theme/types';

interface Props {
  title: string;
  show: boolean;
  onClose: () => void;
  onDeleteModal: () => Promise<void>;
  isLoading: boolean;
}

const DeleteModal = ({ title, show, onClose, onDeleteModal, isLoading }: Props) => {
  const { t } = useTranslation();
  const styles = useColoredStyles(coloredStyles);

  return (
    <ModalView show={show} onClose={onClose}>
      <SafeAreaView style={styles.modalRoot}>
        <Text type={TextTypes.H2} style={styles.modalText}>
          {title}
        </Text>
        <View style={styles.modalButtons}>
          <Button type={ButtonType.SECONDARY} onPress={onClose} style={styles.modalButton}>
            {t('cancel')}
          </Button>
          <Button onPress={onDeleteModal} style={styles.modalButton} type={ButtonType.DANGER} isLoading={isLoading}>
            {t('delete')}
          </Button>
        </View>
      </SafeAreaView>
    </ModalView>
  );
};

const coloredStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    modalRoot: {
      backgroundColor: themeColors.background,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    modalText: {
      margin: 8,
      textAlign: 'center',
    },
    modalButtons: {
      width: '100%',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-between',
    },
    modalButton: {
      flex: 1,
      margin: 8,
    },
  });

export default DeleteModal;
