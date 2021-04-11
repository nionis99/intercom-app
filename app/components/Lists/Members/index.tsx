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
}

const MembersList = ({ membersData, setDeletingMemberId }: Props) => {
  const { t } = useTranslation();
  const { theme } = useAppState();
  const styles = useColoredStyles(coloredStyles, theme);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
      {membersData.map((member) => (
        <ListItem key={member.id} bottomDivider containerStyle={styles.listContainer}>
          <FAIcon name="circle" color={member.is_active ? theme.colors.lightGreen : theme.colors.danger} size={20} />
          <Avatar source={avatarSrc} />
          <ListItem.Content>
            <ListItem.Title>{member.name || t(DEFAULT_MEMBER_NAME)}</ListItem.Title>
            {member.pin && (
              <ListItem.Subtitle>
                {t('pin')}: {member.pin}
              </ListItem.Subtitle>
            )}
          </ListItem.Content>
          <TouchableOpacity onPress={() => console.log('toMemberInfo')} style={styles.touch}>
            <ListItem.Chevron size={30} color={theme.colors.primary} style={styles.chevron} />
          </TouchableOpacity>
          <ListItem.Content right={true}>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => console.log('edit')} style={styles.touch}>
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
    },
    listContainer: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: theme.dark ? themeColors.midGrey : themeColors.white,
    },
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
