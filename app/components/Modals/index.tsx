import React, { ReactNode, SetStateAction } from 'react';
import { Modal, StyleSheet, TouchableHighlight } from 'react-native';
import { Theme } from '@react-navigation/native';

import { useAppState } from '#contexts/AppContext';
import { ThemeColors } from '#utils/theme/types';
import useColoredStyles from '#hooks/useColoredStyles';

interface Props {
  show: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const ModalView = ({ show, onClose, children }: Props) => {
  const { theme } = useAppState();
  const coloredStyles = useColoredStyles(styles, theme);

  return (
    <Modal
      visible={show}
      presentationStyle="overFullScreen"
      transparent={true}
      animationType="slide"
      onRequestClose={() => onClose(false)}
    >
      <TouchableHighlight
        style={coloredStyles.background}
        onPressOut={() => onClose(false)}
        underlayColor={'transparent'}
      >
        <></>
      </TouchableHighlight>
      {children}
    </Modal>
  );
};

const styles = (themeColors: ThemeColors, theme: Theme) =>
  StyleSheet.create({
    background: {
      backgroundColor: theme.dark ? themeColors.whiteA(0.4) : themeColors.midGreyA(0.4),
      flex: 1,
    },
  });

export default ModalView;
