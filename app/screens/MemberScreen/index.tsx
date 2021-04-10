import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
// import { StackNavigationProp } from '@react-navigation/stack';
import { /*CompositeNavigationProp, */ RouteProp } from '@react-navigation/native';

import useColoredStyles from '#hooks/useColoredStyles';
import { MemberStackParamList } from '#navigation/AuthorizedStack/MemberStack';
// import { AuthorizedStackParamList } from '#navigation/AuthorizedStack';
import Text, { TextTypes } from '#components/Text';
import { ThemeColors } from '#utils/theme/types';

// export type ScreenNavigationProp = CompositeNavigationProp<
//   StackNavigationProp<MemberStackParamList, 'Member'>,
//   StackNavigationProp<AuthorizedStackParamList>
// >;

type ScreenRouteProp = RouteProp<MemberStackParamList, 'Member'>;

type Props = {
  // navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

function MemberScreen({ route }: Props) {
  const { t } = useTranslation();
  const styles = useColoredStyles(coloredStyles);
  const { memberId } = route.params;
  console.log(memberId);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
        <Text type={TextTypes.H3} style={styles.userText}>
          {t('member')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const coloredStyles = (themeColors: ThemeColors) =>
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
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    userText: {
      marginTop: 24,
      marginBottom: 16,
    },
    buttons: {
      width: '60%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      marginTop: 40,
      marginBottom: 32,
    },
    button: {
      marginTop: 8,
    },
  });

export default MemberScreen;
