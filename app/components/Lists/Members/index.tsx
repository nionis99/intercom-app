import React, { SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { Theme } from '@react-navigation/native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import useColoredStyles from '#hooks/useColoredStyles';
import { useAppState } from '#contexts/AppContext';
import { DEFAULT_MEMBER_NAME } from '#utils/constants';
import Member from '#types/Member';
import { ThemeColors } from '#utils/theme/types';
import avatarSrc from '#assets/images/user.png';

interface Props {
  membersData: Member[];
  setDeletingMemberId: React.Dispatch<SetStateAction<number | null>>;
  setEditingMember: React.Dispatch<SetStateAction<Member | null>>;
}

const MembersList = ({ membersData, setDeletingMemberId, setEditingMember }: Props) => {
  const { t } = useTranslation();
  const { theme } = useAppState();
  const styles = useColoredStyles(coloredStyles, theme);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
      {membersData.map((member) => (
        <TouchableOpacity onPress={() => console.log('/member')} key={member.id}>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <FAIcon name="circle" color={member.is_active ? theme.colors.lightGreen : theme.colors.danger} size={20} />
            <Avatar source={avatarSrc} />
            <ListItem.Content>
              <ListItem.Title style={styles.listTitle}>{member.name || t(DEFAULT_MEMBER_NAME)}</ListItem.Title>

              {member.pin && (
                <ListItem.Subtitle style={styles.listSubtitle}>
                  {t('pin')}: {member.pin}
                </ListItem.Subtitle>
              )}
            </ListItem.Content>
            <ListItem.Content right={true}>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => setEditingMember(member)} style={styles.touch}>
                  <EvilIcon name="pencil" size={30} color={theme.colors.secondary} style={styles.editIcon} />
                </TouchableOpacity>
                {!member.is_owner && (
                  <TouchableOpacity onPress={() => setDeletingMemberId(member.id)} style={styles.touch}>
                    <EvilIcon name="trash" size={30} color={theme.colors.danger} />
                  </TouchableOpacity>
                )}
              </View>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
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
    chevron: {
      marginHorizontal: 16,
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

export default MembersList;
