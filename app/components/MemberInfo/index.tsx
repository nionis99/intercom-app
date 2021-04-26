import React from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { useAppState } from '#contexts/AppContext';
import Text, { FontWeight, TextTypes } from '#components/Text';

interface Props {
  materialIconName: string;
  text: string;
}

const MemberInfo = ({ materialIconName, text }: Props) => {
  const { theme } = useAppState();

  return (
    <View style={styles.memberInfoView}>
      <MaterialIcon name={materialIconName} size={24} color={theme.colors.primary} />
      <Text type={TextTypes.H2} weight={FontWeight.BOLD} style={styles.memberInfoText} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  memberInfoView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberInfoText: {
    display: 'flex',
    marginHorizontal: 10,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
});

export default MemberInfo;
