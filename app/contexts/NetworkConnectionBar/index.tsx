import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';

import useNetwork from '#hooks/useNetwork';
import Text, { TextTypes } from '#components/Text';
import { LightThemeColors } from '#utils/theme/colors';

interface Props {
  children: ReactNode;
}

export default function NetworkStatusBar({ children }: Props) {
  const { t } = useTranslation();
  const { isConnectedToNetwork } = useNetwork();

  return (
    <>
      {!isConnectedToNetwork && (
        <SafeAreaView style={styles.safeView}>
          <Text type={TextTypes.BODY_SMALL} style={styles.text} color={'white'}>
            {t('no_internet')}
          </Text>
        </SafeAreaView>
      )}
      {children}
    </>
  );
}

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: LightThemeColors.danger,
    alignItems: 'center',
  },
  text: {
    paddingVertical: 5,
  },
});
