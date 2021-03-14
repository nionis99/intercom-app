import React from 'react';
import { useTheme } from '#utils/theme';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import i18n from '#utils/i18n';

import Text from '#components/Text';

function LoadingView({ title = i18n.t('loading') }) {
  const { colors } = useTheme();

  return (
    <View style={styles.root}>
      <ActivityIndicator color={colors.text} style={styles.icon} />
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
});

export default LoadingView;
