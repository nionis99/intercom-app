import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';

import { useUserState } from '#contexts/UserContext';
import { useStateSelector } from '#hooks/useReduxStateSelector';
import { deleteMember, getMembers } from '#redux/actions/Members';
import useColoredStyles from '#hooks/useColoredStyles';
import LoadingView from '#components/LoadingView';
import DeleteModal from '#components/Modals/DeleteModal';
import MembersList from '#components/Lists/Members';
import EditMemberModal from '#components/Modals/EditMember';
import { ThemeColors } from '#utils/theme/types';
import Member from '#types/Member';

function MembersScreen() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const styles = useColoredStyles(coloredStyles);
  const { selectedFlatId } = useUserState();
  const { membersLoading, deleteLoading, membersData } = useStateSelector((state) => state.members);
  const [deletingMemberId, setDeletingMemberId] = useState<number | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const deleteResponseText = t('member_deleted');

  useEffect(() => {
    dispatch(getMembers(selectedFlatId));
  }, [dispatch, selectedFlatId]);

  const onDeleteMember = async () => {
    if (deletingMemberId) await dispatch(deleteMember(deletingMemberId, deleteResponseText));
    setDeletingMemberId(null);
  };

  if (membersLoading) return <LoadingView />;

  return (
    <SafeAreaView style={styles.root}>
      <MembersList
        membersData={membersData}
        setDeletingMemberId={setDeletingMemberId}
        setEditingMember={setEditingMember}
      />
      <DeleteModal
        title={t('delete_member')}
        show={!!deletingMemberId}
        onClose={() => setDeletingMemberId(null)}
        onDeleteModal={onDeleteMember}
        isLoading={deleteLoading}
      />
      <EditMemberModal editingMember={editingMember} show={!!editingMember} onClose={() => setEditingMember(null)} />
    </SafeAreaView>
  );
}

const coloredStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    root: {
      backgroundColor: themeColors.background,
    },
    userText: {
      marginTop: 24,
      marginBottom: 16,
    },
  });

export default MembersScreen;
