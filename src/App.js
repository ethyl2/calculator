import React from 'react';
import useDarkMode from './hooks/useDarkMode';
import Calculator2 from './components/Calculator2';
import QuoteBox from './components/QuoteBox';
import './App.css';

function App() {
  const [useDark, setUseDark] = useDarkMode(false);
  const toggleDark = (e) => {
    e.preventDefault();
    setUseDark(!useDark);
  };

  return (
    <div className="App">
      <button type="button" onClick={toggleDark}>
        {useDark ? 'Light?' : 'Dark?'}
      </button>

      <QuoteBox />
      <Calculator2 />
    </div>
  );
}

export default App;
