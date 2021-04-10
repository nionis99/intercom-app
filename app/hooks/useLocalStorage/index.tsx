import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default function useLocalStorage(key: string, initialValue: null) {
  const [storedValue, setStoredValue] = useState<string | null>(initialValue);
  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((value) => (value === null ? initialValue : JSON.parse(value)))
      .then(setStoredValue);
  }, [key, initialValue]);

  const setValue = (value: string) =>
    AsyncStorage.setItem(key, JSON.stringify(value)).then(() => setStoredValue(value));

  return [storedValue, setValue];
}
