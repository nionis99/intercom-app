import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';

import BottomTabs, { BottomTabParamList } from './BottomTabs';

export type AuthorizedStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
};

export function AuthorizedStack() {
  const Stack = createStackNavigator<AuthorizedStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="BottomTabs" options={{ headerShown: false }} component={BottomTabs} />
    </Stack.Navigator>
  );
}
