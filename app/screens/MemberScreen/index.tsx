import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { RouteProp } from '@react-navigation/native';

import useColoredStyles from '#hooks/useColoredStyles';
import Text, { TextTypes } from '#components/Text';
import { ThemeColors } from '#utils/theme/types';
import { deleteCard, getCards } from '#redux/actions/Cards';
import { MembersStackParamList } from '#navigation/AuthorizedStack/BottomTabs/MembersStack';
import { useStateSelector } from '#hooks/useReduxStateSelector';
import LoadingView from '#components/LoadingView';
import CardsList from '#components/Lists/Cards';
import { DEFAULT_MEMBER_NAME } from '#utils/constants';
import Divider from '#components/Divider';
import EditCardModal from '#components/Modals/EditCard';
import Card from '#types/Card';
import DeleteModal from '#components/Modals/DeleteModal';
import { getCardTypes } from '#redux/actions/CardTypes';

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
      <View style={styles.memberInfo}>
        <Divider />
        <Text type={TextTypes.H4} style={styles.memberInfoText}>
          {t('name')} : {member.name || t(DEFAULT_MEMBER_NAME)}
        </Text>
        <Text type={TextTypes.H4} style={styles.memberInfoText}>
          {t('email')} : {member.email || '-'}
        </Text>
        <Text type={TextTypes.H4} style={styles.memberInfoText}>
          {t('phone')} : {member.phone || '-'}
        </Text>
        <Text type={TextTypes.H4} style={styles.memberInfoText}>
          {t('pin')} : {member.pin || '-'}
        </Text>
        <Divider />
      </View>
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
    memberInfo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    memberInfoText: {
      marginVertical: 8,
    },
  });

export default MemberScreen;
