import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { RouteProp } from '@react-navigation/native';

import { MembersStackParamList } from '#navigation/AuthorizedStack/BottomTabs/MembersStack';
import { useStateSelector } from '#hooks/useReduxStateSelector';
import useColoredStyles from '#hooks/useColoredStyles';
import Divider from '#components/Divider';
import LoadingView from '#components/LoadingView';
import CardsList from '#components/Lists/Cards';
import MemberInfo from '#components/MemberInfo';
import EditCardModal from '#components/Modals/EditCard';
import DeleteModal from '#components/Modals/DeleteModal';
import EditMemberModal from '#components/Modals/EditMember';
import Button, { ButtonType } from '#components/Buttons';
import { getCardTypes } from '#redux/actions/CardTypes';
import { deleteCard, getCards } from '#redux/actions/Cards';
import { DEFAULT_MEMBER_NAME } from '#utils/constants';
import { ThemeColors } from '#utils/theme/types';
import Member from '#types/Member';
import Card from '#types/Card';
import { getMember } from '#redux/actions/Member';

export type MembersScreenRouteProps = RouteProp<MembersStackParamList, 'Member'>;

type Props = {
  route: MembersScreenRouteProps;
};

function MemberScreen({ route }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const styles = useColoredStyles(coloredStyles);
  const [deletingCardId, setDeletingCardId] = useState<number | null>(null);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const { cardsData, cardsLoading, deleteLoading } = useStateSelector((state) => state.cards);
  const { memberLoading, memberData } = useStateSelector((state) => state.member);
  const { memberId } = route.params;

  const deleteResponseText = t('card_deleted');

  useEffect(() => {
    dispatch(getMember(memberId));
  }, [dispatch, memberId]);

  useEffect(() => {
    dispatch(getCards(memberId));
  }, [dispatch, memberId]);

  useEffect(() => {
    dispatch(getCardTypes());
  }, [dispatch]);

  const onDeleteCard = async () => {
    if (deletingCardId) await dispatch(deleteCard(deletingCardId, deleteResponseText));
    setDeletingCardId(null);
  };

  if (memberLoading || cardsLoading) return <LoadingView />;

  return (
    <View style={styles.root}>
      <View style={styles.memberInfoContainer}>
        <View style={styles.memberInfo}>
          <MemberInfo materialIconName="account-circle" text={memberData?.name || t(DEFAULT_MEMBER_NAME)} />
          <MemberInfo materialIconName="email" text={memberData?.email || '-'} />
        </View>
        <View style={styles.memberInfo}>
          <MemberInfo materialIconName="fiber-pin" text={memberData?.pin || '-'} />
          <MemberInfo materialIconName="local-phone" text={memberData?.phone || '-'} />
        </View>
      </View>
      <View style={styles.editMember}>
        <Button onPress={() => setEditingMember(memberData)} type={ButtonType.PRIMARY} style={styles.editButton}>
          {t('edit_member')}
        </Button>
      </View>
      <Divider />
      <EditMemberModal editingMember={editingMember} show={!!editingMember} onClose={() => setEditingMember(null)} />
      <CardsList cardsData={cardsData} setDeletingCardId={setDeletingCardId} setEditingCard={setEditingCard} />
      <EditCardModal editingCard={editingCard} show={!!editingCard} onClose={() => setEditingCard(null)} />
      <DeleteModal
        title={t('delete_card')}
        show={!!deletingCardId}
        onClose={() => setDeletingCardId(null)}
        onDeleteModal={onDeleteCard}
        isLoading={deleteLoading}
      />
    </View>
  );
}

const coloredStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    memberInfoContainer: {
      width: '100%',
      height: 100,
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: 12,
    },
    memberInfo: {
      width: '50%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingHorizontal: 12,
    },
    editMember: {
      padding: 16,
      width: '100%',
      flexDirection: 'row',
    },
    editButton: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
    },
  });

export default MemberScreen;
