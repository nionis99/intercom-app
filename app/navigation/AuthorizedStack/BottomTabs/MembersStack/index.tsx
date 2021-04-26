import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MembersScreen from '#screens/MembersScreen';
import MembersHeaderRightButton from '#components/Buttons/MembersHeaderRight';
import MemberHeaderRightButton from '#components/Buttons/MemberHeaderRight';
import LogoTitle from '#components/LogoTitle';
import MemberScreen from '#screens/MemberScreen';

export type MembersStackParamList = {
  Members: undefined;
  Member: { memberId: number };
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
      <Stack.Screen
        name="Member"
        options={{
          headerTitle: () => <LogoTitle />,
          headerRight: () => <MemberHeaderRightButton />,
        }}
        component={MemberScreen}
      />
    </Stack.Navigator>
  );
}

export default MembersStack;
