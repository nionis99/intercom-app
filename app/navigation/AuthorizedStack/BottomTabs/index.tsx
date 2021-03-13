import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Feather';
import {AuthorizedStackParamList} from '..';
import getIconName from '#utils/helpers/getIconName';

export type BottomTabParamList = {
  Profile?: NavigatorScreenParams<any>;
  Members?: NavigatorScreenParams<any>;
};

interface Props {
  navigation: StackNavigationProp<AuthorizedStackParamList>;
}

function BottomTabs({navigation}: Props) {
  const Tab = createBottomTabNavigator<BottomTabParamList>();
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{
        showLabel: true,
        tabStyle: styles.button,
        labelStyle: styles.label,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          const iconName = getIconName(route);
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      {/*<Tab.Screen*/}
      {/*  name="Profile"*/}
      {/*  options={{ title: t("profile") }}*/}
      {/*  component={ProfileStack}*/}
      {/*/>*/}
      {/*<Tab.Screen*/}
      {/*  name="Members"*/}
      {/*  options={{ title: t("members") }}*/}
      {/*  component={MembersStack}*/}
      {/*/>*/}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 7,
    paddingBottom: 3,
  },
  label: {
    fontSize: 10,
    lineHeight: 15,
    fontFamily: 'Poppins-Medium',
  },
});

export default BottomTabs;
