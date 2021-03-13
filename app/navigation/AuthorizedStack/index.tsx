import React from 'react';
// import { StyleSheet } from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
import {NavigatorScreenParams} from '@react-navigation/native';

import BottomTabs, {BottomTabParamList} from './BottomTabs';
// import LogoTitle from "#components/LogoTitle";
// import LanguagePicker from "#components/Buttons/LanguagePicker";

export type AuthorizedStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  Profile: undefined;
};

export function AuthorizedStack() {
  const Stack = createStackNavigator<AuthorizedStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="BottomTabs" options={{headerShown: false}} component={BottomTabs} />
      {/*<Stack.Screen*/}
      {/*  name="Profile"*/}
      {/*  options={{*/}
      {/*    headerTitle: () => <LogoTitle />,*/}
      {/*    headerRight: () => <LanguagePicker style={styles.flagButton} />,*/}
      {/*  }}*/}
      {/*  component={ProfileScreen}*/}
      {/*/>*/}
    </Stack.Navigator>
  );
}

// const styles = StyleSheet.create({
//   flagButton: { marginRight: 8 },
// });
