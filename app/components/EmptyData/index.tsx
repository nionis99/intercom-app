import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Text from '#components/Text';
import { useTheme } from '#utils/theme';

interface Props {
  title: string;
}

function EmptyDataView({ title }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.root}>
      <MaterialIcon name="search" color={colors.text} size={30} style={styles.icon} />
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  icon: {
    marginBottom: 5,
  },
});

export default EmptyDataView;
