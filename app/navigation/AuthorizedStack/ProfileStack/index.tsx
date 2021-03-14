import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import ProfileScreen from '#screens/ProfileScreen';
import LogoTitle from '#components/LogoTitle';
import LanguagePicker from '#components/Buttons/LanguagePicker';

export type ProfileStackParamList = {
  Profile: undefined;
};

function ProfileStack() {
  const Stack = createStackNavigator<ProfileStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Profile"
        options={{
          headerTitle: () => <LogoTitle />,
          headerRight: () => <LanguagePicker style={styles.flagButton} />,
        }}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  flagButton: { marginRight: 8 },
});

export default ProfileStack;
