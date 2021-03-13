import React, {Component, ReactNode} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import RNRestart from 'react-native-restart';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as Sentry from '@sentry/react-native';
import {withTranslation} from 'react-i18next';
import {TFunction} from 'i18next';

import {StaticColors} from '#utils/theme/colors';
import Text, {TextTypes} from '#components/Text';

interface Props {
  children: ReactNode;
  t: TFunction;
}

interface StateTypes {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, StateTypes> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error) {
    Sentry.captureException(error);
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.root}>
          <FontAwesomeIcon name="question-circle" size={60} color={StaticColors.primary} />
          <Text type={TextTypes.H1}>{this.props.t('oops_an_error_occurred')}</Text>
          <Text type={TextTypes.BODY_MEDIUM} style={styles.text}>
            {this.props.t('an_error_is_reported_to_us')}
            {'\n'}
            {this.props.t('press_the_button_below_to_restart_the_application')}
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => RNRestart.Restart()}>
            <Text type={TextTypes.H4} style={styles.buttonText}>
              {this.props.t('restart_application')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);

export const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 2,
    height: '100%',
    width: '100%',
    backgroundColor: StaticColors.white,
  },
  text: {
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: StaticColors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: StaticColors.white,
  },
});
