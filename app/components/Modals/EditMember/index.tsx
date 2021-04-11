import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';

import useColoredStyles from '#hooks/useColoredStyles';
import MemberForm, { MemberFormInputs } from '#components/Forms/MemberForm';
import ModalView from '#components/Modals';
import Text, { TextTypes } from '#components/Text';
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
    if (editingMember) await dispatch(updateMember(data, editingMember.id, responseText));
    onClose();
  };

  return (
    <ModalView show={show} onClose={onClose}>
      <ScrollView style={coloredStyles.scroll}>
        <View style={coloredStyles.modalContent}>
          <Text type={TextTypes.H2} style={coloredStyles.sectionTitle}>
            {t('edit_member')}
          </Text>
          {editingMember && <MemberForm editingMember={editingMember} onSubmit={onUpdateMember} onCancel={onClose} />}
        </View>
      </ScrollView>
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
