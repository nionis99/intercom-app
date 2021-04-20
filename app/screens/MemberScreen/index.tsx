import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { RouteProp } from '@react-navigation/native';

import useColoredStyles from '#hooks/useColoredStyles';
import Text, { TextTypes } from '#components/Text';
import { ThemeColors } from '#utils/theme/types';
import { getCards } from '#redux/actions/Cards';
import { MembersStackParamList } from '#navigation/AuthorizedStack/BottomTabs/MembersStack';
import { useStateSelector } from '#hooks/useReduxStateSelector';
import LoadingView from '#components/LoadingView';
import CardsList from '#components/Lists/Cards';
import { DEFAULT_MEMBER_NAME } from '#utils/constants';
import Divider from '#components/Divider';

type MembersScreenRouteProps = RouteProp<MembersStackParamList, 'Member'>;

type Props = {
  route: MembersScreenRouteProps;
};

function MemberScreen({ route }: Props) {
  const { t } = useTranslation();
  const { member } = route.params;
  const dispatch = useDispatch();
  const styles = useColoredStyles(coloredStyles);
  const { cardsData, cardsLoading } = useStateSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getCards(member.id));
  }, [dispatch, member]);

  if (cardsLoading) return <LoadingView />;

  return (
    <SafeAreaView style={styles.root}>
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
      <CardsList cardsData={cardsData} setDeletingCardId={() => null} setEditingCard={() => null} />
    </SafeAreaView>
  );
}

const coloredStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    root: {
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
