import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '#screens/LoginScreen';
import LogoTitle from '#components/LogoTitle';
import LanguagePicker from '#components/Buttons/LanguagePicker';
import { StyleSheet } from 'react-native';

export type UnauthorizedStackParamList = {
  Login: undefined;
};

export function UnauthorizedStack() {
  const Stack = createStackNavigator<UnauthorizedStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <LogoTitle />,
        headerRight: () => <LanguagePicker style={styles.flagButton} />,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  flagButton: { marginRight: 8 },
});
