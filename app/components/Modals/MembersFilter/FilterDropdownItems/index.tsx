import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Theme } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';

import { useAppState } from '#contexts/AppContext';
import useColoredStyles from '#hooks/useColoredStyles';
import Text, { TextTypes } from '#components/Text';
import { ThemeColors } from '#utils/theme/types';
import { Maybe } from '#types';

interface Props {
  filterTitle: string;
  defaultItem: Maybe<string>;
  items: string[];
  onChangeValue: (value: string) => void;
  containerStyle?: ViewStyle;
}

const PlaceFilterDropdownItems = ({ filterTitle, defaultItem, items, onChangeValue, containerStyle }: Props) => {
  const { theme } = useAppState();
  const styles = useColoredStyles(coloredStyles, theme);
  const isEnabled = (value: string[]) => value.length > 1;

  return (
    <View style={containerStyle}>
      <Text type={TextTypes.H2} style={styles.filterTitle}>
        {filterTitle}
      </Text>
      <View style={[styles.container, isEnabled(items) ? undefined : styles.disabledContent]}>
        <Picker
          selectedValue={defaultItem || items[0]}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={(itemValue) => onChangeValue(itemValue as string)}
          enabled={isEnabled(items)}
        >
          {items.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
      </View>
    </View>
  );
};

const coloredStyles = (themeColors: ThemeColors, theme: Theme) =>
  StyleSheet.create({
    disabledContent: {
      borderColor: themeColors.midGreyA(0.2),
      borderWidth: 1,
      borderStyle: 'solid',
    },
    container: {
      borderColor: theme.dark ? themeColors.white : themeColors.black,
      borderWidth: 1,
      borderStyle: 'solid',
      marginHorizontal: 16,
    },
    filterTitle: {
      textAlign: 'center',
      padding: 16,
    },
    picker: {
      color: theme.dark ? themeColors.white : themeColors.black,
      height: 50,
    },
    pickerItem: {
      color: themeColors.black,
    },
  });

export default PlaceFilterDropdownItems;
