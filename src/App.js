import React, { useState } from 'react';
import './App.css';

function App() {
  const [topDisplay, setTopDisplay] = useState(0);

  return (
    <div className="App">
      <h1>Calculator</h1>
      <div className="calculator-box">
        <div className="top-display">{topDisplay}</div>
        <div className="buttons-area">
          <div className="left-side">
            <div className="clear-button">C</div>
            <div className="digit-buttons">
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
            </div>
            <div className="zero-button">0</div>
          </div>

          <div className="right-side">
            <div>÷</div>
            <div>x</div>
            <div>-</div>
            <div>+</div>
            <div className="equal-button">=</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
