import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { useAppState } from '#contexts/AppContext';
import { useStateSelector } from '#hooks/useReduxStateSelector';
import MembersFilterModal from '#components/Modals/MembersFilter';
import CreateMemberModal from '#components/Modals/CreateMember';

const MembersHeaderRightButton = () => {
  const { theme } = useAppState();
  const { placeData } = useStateSelector((state) => state.place);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isCreateMemberShown, setIsCreateMemberShown] = useState(false);

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.createButton} onPress={() => setIsCreateMemberShown(true)}>
        <FAIcon name="user-plus" size={28} color={theme.colors.primary} />
      </TouchableOpacity>
      {placeData.length > 1 && (
        <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterModalVisible(true)}>
          <Ionicon name="filter" size={32} color={theme.dark ? theme.colors.white : theme.colors.dark} />
        </TouchableOpacity>
      )}
      <MembersFilterModal
        isFilterModalVisible={isFilterModalVisible}
        setIsFilterModalVisible={setIsFilterModalVisible}
      />
      <CreateMemberModal show={isCreateMemberShown} onClose={() => setIsCreateMemberShown(false)} />
    </View>
  );
};

export default MembersHeaderRightButton;

const styles = StyleSheet.create({
  header: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  createButton: { marginRight: 16 },
  filterButton: { marginRight: 8 },
});
