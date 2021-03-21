import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '#screens/ProfileScreen';
import HeaderRightButtons from '#components/Buttons/headerRightButtons';
import LogoTitle from '#components/LogoTitle';

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
          headerRight: () => <HeaderRightButtons />,
        }}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
