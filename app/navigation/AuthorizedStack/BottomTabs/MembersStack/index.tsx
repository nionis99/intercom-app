import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MembersScreen from '#screens/MembersScreen';
import MembersHeaderRightButton from '#components/Buttons/MembersHeaderRight';
import LogoTitle from '#components/LogoTitle';

export type MembersStackParamList = {
  Members: undefined;
};

function MembersStack() {
  const Stack = createStackNavigator<MembersStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Members"
        options={{
          headerTitle: () => <LogoTitle />,
          headerRight: () => <MembersHeaderRightButton />,
        }}
        component={MembersScreen}
      />
    </Stack.Navigator>
  );
}

export default MembersStack;
