import { useCallback, useEffect, useMemo } from 'react';

import { useUserState } from '#contexts/UserContext';
import Place from '#types/Place';

export const usePlaceValues = (placeData: Place[]) => {
  const {
    selectedProject,
    setSelectedProject,
    setSelectedAddress,
    setSelectedHouse,
    setSelectedFlat,
    setSelectedFlatId,
  } = useUserState();

  const uniqueProjects = useMemo(() => [...new Set(placeData.map((place) => place.project))], [placeData]);

  const uniqueStreets = useMemo(
    () => [...new Set(placeData.flatMap((place) => (place.project === selectedProject ? [place.street] : [])))],
    [placeData, selectedProject]
  );

  const uniqueHouseNumbers = useMemo(
    () => [...new Set(placeData.flatMap((place) => (place.project === selectedProject ? [place.house_no] : [])))],
    [placeData, selectedProject]
  );

  const uniqueFlatNumbers = useMemo(
    () => [...new Set(placeData.flatMap((place) => (place.project === selectedProject ? [place.flat_no] : [])))],
    [placeData, selectedProject]
  );

  useEffect(() => {
    if (!selectedProject && placeData.length !== 0) {
      setSelectedProject(placeData[0].project);
      setSelectedAddress(placeData[0].street);
      setSelectedHouse(placeData[0].house_no);
      setSelectedFlat(placeData[0].flat_no);
      setSelectedFlatId(placeData[0].id.toString());
    }
  }, [
    placeData,
    selectedProject,
    setSelectedAddress,
    setSelectedFlat,
    setSelectedFlatId,
    setSelectedHouse,
    setSelectedProject,
  ]);

  const changeProject = useCallback(
    (value: string) => {
      setSelectedProject(value);
      setSelectedAddress(placeData.find((place) => place.project === value)?.street || '');
      setSelectedHouse(placeData.find((place) => place.project === value)?.house_no || '');
      setSelectedFlat(placeData.find((place) => place.project === value)?.flat_no || '');
      setSelectedFlatId(placeData.find((place) => place.project === value)?.id.toString() || '');
    },
    [placeData, setSelectedAddress, setSelectedFlat, setSelectedFlatId, setSelectedHouse, setSelectedProject]
  );

  const changeAddress = useCallback(
    (value: string) => {
      setSelectedAddress(value);
      setSelectedHouse(placeData.find((place) => place.street === value)?.house_no || '');
      setSelectedFlat(placeData.find((place) => place.street === value)?.flat_no || '');
      setSelectedFlatId(placeData.find((place) => place.street === value)?.id.toString() || '');
    },
    [placeData, setSelectedAddress, setSelectedFlat, setSelectedFlatId, setSelectedHouse]
  );

  const changeHouseNumber = useCallback(
    (value: string) => {
      setSelectedHouse(value);
      setSelectedFlat(placeData.find((place) => place.house_no === value)?.flat_no || '');
      setSelectedFlatId(placeData.find((place) => place.house_no === value)?.id.toString() || '');
    },
    [placeData, setSelectedFlat, setSelectedFlatId, setSelectedHouse]
  );

  const changeFlatNumber = useCallback(
    (value: string) => {
      setSelectedFlat(value);
      setSelectedFlatId(
        placeData.find((place) => place.flat_no === value && place.project === selectedProject)?.id.toString() || ''
      );
    },
    [placeData, selectedProject, setSelectedFlat, setSelectedFlatId]
  );

  return {
    uniqueProjects,
    uniqueStreets,
    uniqueHouseNumbers,
    uniqueFlatNumbers,
    changeProject,
    changeAddress,
    changeHouseNumber,
    changeFlatNumber,
  };
};
