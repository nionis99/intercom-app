import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '#screens/LoginScreen';
import HeaderRightButtons from '#components/Buttons/headerRightButtons';
import LogoTitle from '#components/LogoTitle';

export type UnauthorizedStackParamList = {
  Login: undefined;
};

export function UnauthorizedStack() {
  const Stack = createStackNavigator<UnauthorizedStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <LogoTitle />,
        headerRight: () => <HeaderRightButtons />,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
