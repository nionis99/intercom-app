import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import MembersStack, { MembersStackParamList } from './MembersStack';
import ProfileStack, { ProfileStackParamList } from './ProfileStack';
import getIconName from '#utils/helpers/getIconName';

export type BottomTabParamList = {
  Profile?: NavigatorScreenParams<ProfileStackParamList>;
  Members?: NavigatorScreenParams<MembersStackParamList>;
};

function BottomTabs() {
  const Tab = createBottomTabNavigator<BottomTabParamList>();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{
        showLabel: true,
        tabStyle: styles.button,
        labelStyle: styles.label,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = getIconName(route);
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Profile" options={{ title: t('profile') }} component={ProfileStack} />
      <Tab.Screen name="Members" options={{ title: t('members') }} component={MembersStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 5,
    paddingBottom: 3,
  },
  label: {
    fontSize: 10,
    lineHeight: 15,
    fontFamily: 'Poppins-Medium',
  },
});

export default BottomTabs;
