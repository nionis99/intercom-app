import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useColoredStyles from '#hooks/useColoredStyles';
import MemberForm, { MemberFormInputs } from '#components/Forms/MemberForm';
import ModalView from '#components/Modals';
import Text, { TextTypes } from '#components/Text';
import { updateMemberData } from '#redux/actions/Member';
import { updateMember } from '#redux/actions/Members';
import { ThemeColors } from '#utils/theme/types';
import { Maybe } from '#types';
import Member from '#types/Member';

interface Props {
  editingMember: Maybe<Member>;
  show: boolean;
  onClose: () => void;
}

const EditMemberModal = ({ editingMember, show, onClose }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const coloredStyles = useColoredStyles(styles);

  const responseText = t('member_updated');

  const onUpdateMember = async (data: MemberFormInputs) => {
    if (editingMember) {
      await dispatch(updateMemberData(data, editingMember.id, responseText));
      await dispatch(updateMember(data, editingMember.id, responseText));
    }
    onClose();
  };

  return (
    <ModalView show={show} onClose={onClose}>
      <KeyboardAwareScrollView style={coloredStyles.scroll}>
        <SafeAreaView style={coloredStyles.modalContent}>
          <Text type={TextTypes.H2} style={coloredStyles.sectionTitle}>
            {t('edit_member')}
          </Text>
          {editingMember && <MemberForm editingMember={editingMember} onSubmit={onUpdateMember} onCancel={onClose} />}
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

export default EditMemberModal;
