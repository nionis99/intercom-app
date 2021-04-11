import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { Theme } from '@react-navigation/native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { useAppState } from '#contexts/AppContext';
import { useUserState } from '#contexts/UserContext';
import { useStateSelector } from '#hooks/useReduxStateSelector';
import useColoredStyles from '#hooks/useColoredStyles';
import { getMembers } from '#redux/actions/Members';
import Text, { TextTypes } from '#components/Text';
import LoadingView from '#components/LoadingView';
import { ThemeColors } from '#utils/theme/types';
import { DEFAULT_MEMBER_NAME } from '#utils/constants';
import avatarSrc from '#assets/images/user.png';

function MembersScreen() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { theme } = useAppState();
  const styles = useColoredStyles(coloredStyles, theme);
  const { selectedFlatId } = useUserState();
  const { membersLoading, membersData } = useStateSelector((state) => state.members);

  useEffect(() => {
    dispatch(getMembers(selectedFlatId));
  }, [dispatch, selectedFlatId]);

  if (membersLoading) return <LoadingView />;

  if (membersData.length === 0) {
    return (
      <Text type={TextTypes.H3} style={styles.userText}>
        {t('no_members')}
      </Text>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
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
              <ListItem.Chevron size={30} color={theme.colors.primary} />
            </TouchableOpacity>
            <ListItem.Content right={true}>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => console.log('edit')} style={styles.touch}>
                  <EvilIcon name="pencil" size={30} color={theme.colors.secondary} style={styles.icons} />
                </TouchableOpacity>
                {!member.is_owner && (
                  <TouchableOpacity onPress={() => console.log('delete')} style={styles.touch}>
                    <EvilIcon name="trash" size={30} color={theme.colors.danger} />
                  </TouchableOpacity>
                )}
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const coloredStyles = (themeColors: ThemeColors, theme: Theme) =>
  StyleSheet.create({
    root: {
      backgroundColor: themeColors.background,
    },
    scroll: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
    },
    contentContainer: {
      justifyContent: 'space-between',
    },
    userText: {
      marginTop: 24,
      marginBottom: 16,
    },
    listContainer: {
      backgroundColor: theme.dark ? themeColors.midGrey : themeColors.white,
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    icons: {
      height: '100%',
      paddingHorizontal: 16,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    touch: {
      height: 30,
    },
  });

export default MembersScreen;
