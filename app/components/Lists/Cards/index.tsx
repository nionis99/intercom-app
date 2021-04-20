import React, { SetStateAction } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ListItem } from 'react-native-elements';
import { Theme } from '@react-navigation/native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import useColoredStyles from '#hooks/useColoredStyles';
import { useAppState } from '#contexts/AppContext';
import { ThemeColors } from '#utils/theme/types';
import Card from '#types/Card';
import EmptyDataView from '#components/EmptyData';

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
    <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
      {cardsData.map((card) => (
        <ListItem bottomDivider containerStyle={styles.listContainer} key={card.id}>
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>{card.card_no}</ListItem.Title>
            <ListItem.Subtitle style={styles.listSubtitle}>{card.type}</ListItem.Subtitle>
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
      ))}
    </ScrollView>
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
    listTitle: { color: theme.dark ? themeColors.white : themeColors.black },
    listSubtitle: { color: themeColors.midGrey },
    actions: {
      display: 'flex',
      flexDirection: 'row',
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
