import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import { useAppState } from '#contexts/AppContext';
import MembersFilterModal from '#components/Modals/MembersFilter';

const MembersHeaderRightButton = () => {
  const { theme } = useAppState();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterModalVisible(true)}>
        <Icon name="filter" size={32} color={theme.dark ? theme.colors.white : theme.colors.dark} />
      </TouchableOpacity>
      <MembersFilterModal
        isFilterModalVisible={isFilterModalVisible}
        setIsFilterModalVisible={setIsFilterModalVisible}
      />
    </View>
  );
};

export default MembersHeaderRightButton;

const styles = StyleSheet.create({
  header: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  filterButton: { marginRight: 8 },
});
