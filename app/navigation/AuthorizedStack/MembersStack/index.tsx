import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import MembersScreen from '#screens/MembersScreen';

export type MembersStackParamList = {
  Members: undefined;
};

function MembersStack() {
  const { t } = useTranslation();
  const Stack = createStackNavigator<MembersStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Members" options={{ title: t('members') }} component={MembersScreen} />
    </Stack.Navigator>
  );
}

export default MembersStack;
