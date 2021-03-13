import React from 'react';
import Flag from 'react-native-flags-typescript';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleProp, ViewStyle} from 'react-native';

import {useLanguageContext} from '#contexts/LanguageContext';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const LanguagePicker = ({style}: Props) => {
  const {setIsChangeLanguageModalVisible, currentLanguageCode} = useLanguageContext();

  return (
    <TouchableOpacity style={style} onPress={() => setIsChangeLanguageModalVisible(true)}>
      <Flag code={currentLanguageCode} type="flat" size={32} />
    </TouchableOpacity>
  );
};

export default LanguagePicker;
