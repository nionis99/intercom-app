import React, { SetStateAction } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ListItem } from 'react-native-elements';
import { Theme } from '@react-navigation/native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import useColoredStyles from '#hooks/useColoredStyles';
import { useAppState } from '#contexts/AppContext';
import EmptyDataView from '#components/EmptyData';
import { FontWeight, Text, TextTypes } from '#components/Text';
import { ThemeColors } from '#utils/theme/types';
import Card from '#types/Card';

interface Props {
  cardsData: Card[];
  setDeletingCardId: React.Dispatch<SetStateAction<number | null>>;
  setEditingCard: React.Dispatch<SetStateAction<Card | null>>;
}

const CardsList = ({ cardsData, setDeletingCardId, setEditingCard }: Props) => {
  const { t } = useTranslation();
  const { theme } = useAppState();
  const styles = useColoredStyles(coloredStyles, theme);

  if (cardsData.length === 0) return <EmptyDataView title={t('no_cards')} />;

  return (
    <FlatList
      data={cardsData}
      renderItem={({ item: card }) => (
        <ListItem bottomDivider containerStyle={styles.listContainer} key={card.id}>
          <ListItem.Content>
            <View style={styles.title}>
              <MaterialIcon name="smart-card" size={20} color={theme.colors.primary} style={styles.cardIcon} />
              <Text style={styles.titleText} type={TextTypes.H2} weight={FontWeight.NORMAL}>
                {card.card_no}
              </Text>
            </View>
            {!!card.note && (
              <Text type={TextTypes.H2} weight={FontWeight.LIGHT}>
                {t('note')} : {card.note}
              </Text>
            )}
          </ListItem.Content>
          <ListItem.Content right={true}>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => setEditingCard(card)} style={styles.touch}>
                <EvilIcon name="pencil" size={30} color={theme.colors.secondary} style={styles.editIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDeletingCardId(card.id)} style={styles.touch}>
                <EvilIcon name="trash" size={30} color={theme.colors.danger} />
              </TouchableOpacity>
            </View>
          </ListItem.Content>
        </ListItem>
      )}
      keyExtractor={(item) => item.id.toString()}
      style={styles.scroll}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const coloredStyles = (themeColors: ThemeColors, theme: Theme) =>
  StyleSheet.create({
    scroll: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
    },
    contentContainer: {
      justifyContent: 'space-between',
      color: theme.dark ? themeColors.white : themeColors.black,
    },
    listContainer: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: theme.dark ? themeColors.black : themeColors.white,
    },
    listTitle: {
      textAlign: 'center',
      color: theme.dark ? themeColors.white : themeColors.black,
    },
    title: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      display: 'flex',
      justifyContent: 'center',
      textAlignVertical: 'center',
    },
    listSubtitle: { color: themeColors.midGrey },
    actions: {
      display: 'flex',
      flexDirection: 'row',
    },
    cardIcon: {
      marginRight: 8,
    },
    editIcon: {
      marginHorizontal: 16,
    },
    touch: {
      display: 'flex',
      justifyContent: 'center',
      height: 30,
    },
  });

export default CardsList;
