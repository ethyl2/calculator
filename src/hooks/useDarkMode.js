import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useDarkMode = () => {
  const [useDark, setUseDark] = useLocalStorage('darkSetting', false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all') {
      console.log('Dark mode is preferred');
      const bodyEl = document.querySelector('body');
      bodyEl.classList.add('dark-mode');
      setUseDark('true');
    }
  }, []);

  useEffect(() => {
    const bodyEl = document.querySelector('body');
    if (useDark) {
      bodyEl.classList.add('dark-mode');
    } else {
      bodyEl.classList.remove('dark-mode');
    }
  }, [useDark]);

  return [useDark, setUseDark];
};

export default useDarkMode;
