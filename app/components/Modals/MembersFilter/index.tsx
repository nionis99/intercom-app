import React, { SetStateAction } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useUserState } from '#contexts/UserContext';
import { usePlaceValues } from '#hooks/usePlacesValues';
import useColoredStyles from '#hooks/useColoredStyles';
import { useStateSelector } from '#hooks/useReduxStateSelector';
import PlaceFilterDropdownItems from '#components/Modals/MembersFilter/FilterDropdownItems';
import Text, { TextTypes } from '#components/Text';
import ModalView from '#components/Modals';
import { ThemeColors } from '#utils/theme/types';

interface Props {
  isFilterModalVisible: boolean;
  setIsFilterModalVisible: React.Dispatch<SetStateAction<boolean>>;
}

const MembersFilterModal = ({ isFilterModalVisible, setIsFilterModalVisible }: Props) => {
  const { t } = useTranslation();
  const { placeData } = useStateSelector((state) => state.place);
  const { selectedProject, selectedAddress, selectedHouse, selectedFlat } = useUserState();

  const styles = useColoredStyles(coloredStyles);

  const {
    uniqueProjects,
    uniqueStreets,
    uniqueHouseNumbers,
    uniqueFlatNumbers,
    changeProject,
    changeAddress,
    changeHouseNumber,
    changeFlatNumber,
  } = usePlaceValues(placeData);

  return (
    <ModalView show={isFilterModalVisible} onClose={setIsFilterModalVisible}>
      <View style={styles.outerContainer}>
        <Text type={TextTypes.H1} style={styles.modalTitle}>
          {t('flat_filter')}
        </Text>
        <SafeAreaView style={styles.contentContainer}>
          <PlaceFilterDropdownItems
            filterTitle={t('select_project')}
            defaultItem={selectedProject}
            items={uniqueProjects}
            onChangeValue={changeProject}
          />
          <PlaceFilterDropdownItems
            filterTitle={t('select_street')}
            defaultItem={selectedAddress}
            items={uniqueStreets}
            onChangeValue={changeAddress}
          />
          <View style={styles.numbersDropdownContainer}>
            <PlaceFilterDropdownItems
              filterTitle={t('select_house')}
              defaultItem={selectedHouse}
              items={uniqueHouseNumbers}
              onChangeValue={changeHouseNumber}
              containerStyle={styles.numbersDropdown}
            />
            <PlaceFilterDropdownItems
              filterTitle={t('select_flat')}
              defaultItem={selectedFlat}
              items={uniqueFlatNumbers}
              onChangeValue={changeFlatNumber}
              containerStyle={styles.numbersDropdown}
            />
          </View>
        </SafeAreaView>
      </View>
    </ModalView>
  );
};

const coloredStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    contentContainer: {
      paddingVertical: 16,
    },
    modalTitle: {
      padding: 16,
      textAlign: 'center',
    },
    outerContainer: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      backgroundColor: themeColors.background,
      shadowColor: themeColors.lightGrey,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    numbersDropdownContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    numbersDropdown: {
      display: 'flex',
      width: '50%',
    },
  });

export default MembersFilterModal;
