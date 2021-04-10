import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '#screens/LoginScreen';
import ServerErrorScreen from '#screens/ServerErrorSceen';
import ProfileHeaderRightButtons from '#components/Buttons/ProfileHeaderRight';
import LogoTitle from '#components/LogoTitle';

export type UnauthorizedStackParamList = {
  Login: undefined;
  Server: undefined;
};

export function UnauthorizedStack() {
  const Stack = createStackNavigator<UnauthorizedStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <LogoTitle />,
        headerRight: () => <ProfileHeaderRightButtons />,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Server" options={{ headerShown: false }} component={ServerErrorScreen} />
    </Stack.Navigator>
  );
}
