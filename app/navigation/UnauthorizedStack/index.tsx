import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "#screens/LoginScreen";
import LogoTitle from "#components/LogoTitle";

export type UnauthorizedStackParamList = {
  Login: undefined;
};

export function UnauthorizedStack() {
  const Stack = createStackNavigator<UnauthorizedStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerTitle: () => <LogoTitle /> }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
