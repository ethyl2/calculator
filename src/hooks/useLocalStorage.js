import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, updateValue] = useState(() => {
    const item = localStorage.getItem(key);
    //localStorage.setItem(key, JSON.stringify(value));
    return item ? JSON.parse(item) : initialValue;
  });
  const setValue = (value) => {
    updateValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };
  return [value, setValue];
};

export default useLocalStorage;
