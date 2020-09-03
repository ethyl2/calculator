import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [topDisplay, setTopDisplay] = useState(0);
  const [result, setResult] = useState(0);
  const [input, setInput] = useState();
  const [operator, setOperator] = useState();

  useEffect(() => {
    setTopDisplay(result);
  }, [result]);

  const handleClear = () => {
    setTopDisplay(0);
    setResult(0);
    setInput(0);
    setOperator(null);
  };

  const handleClick = (e) => {
    const currentNum = e.target.id;
    if (!input) {
      setInput(currentNum);
      setTopDisplay(currentNum);
    } else {
      const numString = input.toString() + currentNum.toString();
      const newNum = Number(numString);
      setInput(newNum);
      setTopDisplay(newNum);
    }
  };

  const handleOperatorClick = (e) => {
    const currentOperator = e.target.id;
    console.log(currentOperator);
    if (currentOperator !== 'calculate') {
      setOperator(e.target.id);

      if (currentOperator === 'add') {
        console.log(
          `input ${input} + result ${result} = ${Number(input) + result}`
        );
        setResult(Number(input) + result);
        setInput(null);
      } else if (currentOperator === 'subtract') {
        // TODO: Fix bug when '-' is pressed mult times.
        setResult(input);
        setInput(0);
      }
    } else {
      console.log('in calculate');
      if (operator === 'add') {
        console.log(`input ${input} + result ${result}`);
        setResult(Number(input) + result);
        setInput(null);
      } else if (operator === 'subtract') {
        console.log(`result ${result} - input ${input}`);
        setResult(result - Number(input));
        setInput(0);
      }
    }
  };

  return (
    <div className="App">
      <h1>Calculator</h1>
      <div className="calculator-box">
        <div className="top-display">{topDisplay}</div>
        <div className="buttons-area">
          <div className="left-side">
            <div className="clear-button" onClick={handleClear}>
              C
            </div>
            <div className="digit-buttons" onClick={handleClick}>
              <div id="7">7</div>
              <div id="8">8</div>
              <div id="9">9</div>
              <div id="4">4</div>
              <div id="5">5</div>
              <div id="6">6</div>
              <div id="1">1</div>
              <div id="2">2</div>
              <div id="3">3</div>
            </div>
            <div className="zero-button" id="0" onClick={handleClick}>
              0
            </div>
          </div>

          <div className="right-side" onClick={handleOperatorClick}>
            <div id="divide">÷</div>
            <div id="multiply">x</div>
            <div id="subtract">-</div>
            <div id="add">+</div>
            <div id="calculate" className="equal-button">
              =
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
