import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import ModalView from '#components/Modals';
import MemberForm, { MemberFormInputs } from '#components/Forms/MemberForm';
import Text, { TextTypes } from '#components/Text';
import { ThemeColors } from '#utils/theme/types';
import useColoredStyles from '#hooks/useColoredStyles';
import { createMember } from '#redux/actions/Members';

interface Props {
  show: boolean;
  onClose: () => void;
}

const CreateMemberModal = ({ show, onClose }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const coloredStyles = useColoredStyles(styles);

  const responseText = t('member_created');

  const onCreateMember = async (data: MemberFormInputs) => {
    await dispatch(createMember(data, responseText));
    onClose();
  };

  return (
    <ModalView show={show} onClose={onClose}>
      <View style={coloredStyles.modalContent}>
        <Text type={TextTypes.H2} style={coloredStyles.sectionTitle}>
          {t('create_member')}
        </Text>
        <MemberForm onSubmit={onCreateMember} onCancel={onClose} />
      </View>
    </ModalView>
  );
};

const styles = (themeColors: ThemeColors) =>
  StyleSheet.create({
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

export default CreateMemberModal;
