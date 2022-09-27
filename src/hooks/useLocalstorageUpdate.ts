import { useState } from 'react';

export const useLocalStorageUpdate = (
  keyName: string,
  lastUpdate: string
): [string | undefined, (arg0: string) => void] => {
  const setValue = (newValue: string) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
  };

  const [storedValue, setStoredValue] = useState(() => {
    try {
      let value = window.localStorage.getItem(keyName);

      if (value === null) {
        setValue(`${lastUpdate}:no`);
        return `${lastUpdate}:no`;
      }

      value = value.replace('"', '');
      const splitted = value!.split(':');

      if (splitted[0] !== lastUpdate) {
        setValue(`${lastUpdate}:no`);
        return `${lastUpdate}:no`;
      }

      if (value) {
        return value;
      }
    } catch (err) {
      console.log(err);
      return `${lastUpdate}:no`;
    }
  });

  return [storedValue, setValue];
};
