import React from 'react';
import {StyleSheet} from 'react-native';
import Logo from '#assets/images/logo.svg';

const LogoTitle = () => <Logo style={styles.root} />;

export default LogoTitle;

const styles = StyleSheet.create({
  root: {
    width: 60,
    height: 24,
  },
});
