import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import MemberScreen from '#screens/MemberScreen';

export type MemberStackParamList = {
  Member: { memberId: string };
};

function MemberStack() {
  const { t } = useTranslation();
  const Stack = createStackNavigator<MemberStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Member" options={{ title: t('member') }} component={MemberScreen} />
    </Stack.Navigator>
  );
}

export default MemberStack;
