import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

const useNetwork = () => {
  const [isConnectedToNetwork, setIsConnectedToNetwork] = useState(true);

  const changeNetworkState = (state: NetInfoState) => setIsConnectedToNetwork(!!state.isConnected);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(changeNetworkState);
    return () => unsubscribe();
  }, []);

  const checkNetwork = () => NetInfo.fetch().then(changeNetworkState);

  return { isConnectedToNetwork, checkNetwork };
};

export default useNetwork;
