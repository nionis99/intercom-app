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
import { getCardTypes } from '#redux/actions/CardTypes';
import { deleteCard, getCards } from '#redux/actions/Cards';
import { DEFAULT_MEMBER_NAME } from '#utils/constants';
import { ThemeColors } from '#utils/theme/types';
import Card from '#types/Card';

export type MembersScreenRouteProps = RouteProp<MembersStackParamList, 'Member'>;

type Props = {
  route: MembersScreenRouteProps;
};

function MemberScreen({ route }: Props) {
  const { t } = useTranslation();
  const { member } = route.params;
  const dispatch = useDispatch();
  const styles = useColoredStyles(coloredStyles);
  const [deletingCardId, setDeletingCardId] = useState<number | null>(null);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const { cardsData, cardsLoading, deleteLoading } = useStateSelector((state) => state.cards);

  const deleteResponseText = t('card_deleted');

  useEffect(() => {
    dispatch(getCards(member.id));
  }, [dispatch, member]);

  useEffect(() => {
    dispatch(getCardTypes());
  }, [dispatch]);

  const onDeleteCard = async () => {
    if (deletingCardId) await dispatch(deleteCard(deletingCardId, deleteResponseText));
    setDeletingCardId(null);
  };

  if (cardsLoading) return <LoadingView />;

  return (
    <View style={styles.root}>
      <View>
        {/* style={{ width: '100%', display: 'flex', flexDirection: 'row' }}*/}
        <View style={styles.memberInfoContainer}>
          <MemberInfo materialIconName="account-circle" text={member.name || t(DEFAULT_MEMBER_NAME)} />
          <MemberInfo materialIconName="local-phone" text={member.phone || '-'} />
        </View>
        <View style={styles.memberInfoContainer}>
          <MemberInfo materialIconName="email" text={member.email || '-'} />
          <MemberInfo materialIconName="fiber-pin" text={member.pin || '-'} />
        </View>
      </View>
      <Divider />
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
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      height: 150,
      justifyContent: 'center',
      alignItems: 'flex-start',
      margin: 16,
    },
  });

export default MemberScreen;
