import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAppState } from '#contexts/AppContext';
import CreateCardModal from '#components/Modals/CreateCard';

const MemberHeaderRightButton = () => {
  const { theme } = useAppState();
  const [isCreateCardShown, setIsCreateCardShown] = useState(false);

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.createButton} onPress={() => setIsCreateCardShown(true)}>
        <MaterialIcon name="card-plus" size={28} color={theme.colors.primary} />
      </TouchableOpacity>
      <CreateCardModal show={isCreateCardShown} onClose={() => setIsCreateCardShown(false)} />
    </View>
  );
};

export default MemberHeaderRightButton;

const styles = StyleSheet.create({
  header: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  createButton: { marginRight: 16 },
  filterButton: { marginRight: 8 },
});
