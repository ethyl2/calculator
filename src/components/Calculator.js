import React, { useState, useEffect } from 'react';

export default function Calculator() {
  const [topDisplay, setTopDisplay] = useState(0);
  const [history, setHistory] = useState('');
  const [result, setResult] = useState('');
  const [input, setInput] = useState();
  const [operator, setOperator] = useState();

  useEffect(() => {
    setTopDisplay(result);
  }, [result]);

  const handleClear = () => {
    setTopDisplay(0);
    setResult(null);
    setInput(null);
    setOperator(null);
    setHistory('');
  };

  const handleClick = (e) => {
    if (operator === 'calculate') {
      setResult('');
    }
    const currentNum = e.target.id;
    setHistory((prevHistory) => prevHistory + currentNum.toString());
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
    const operators = {
      add: '+',
      subtract: '-',
      multiply: '*',
      divide: '/',
      calculate: '=',
    };
    const currentOperator = e.target.id;

    if (!result) {
      setResult(input);
    } else {
      if (operator === 'add') {
        setResult(Number(input) + Number(result));
      } else if (operator === 'subtract') {
        setResult(Number(result) - Number(input));
      } else if (operator === 'multiply') {
        setResult(Number(result) * Number(input));
      } else if (operator === 'divide') {
        if (input !== '0') {
          setResult(Number(result) / Number(input));
        } else {
          alert('No division by zero');
          setTopDisplay(0);
          setResult(null);
          setInput(null);
          setOperator(null);
          setHistory('');
        }
      }
    }

    if (currentOperator !== 'calculate') {
      if (!history) {
        setHistory(result + operators[currentOperator]);
      } else {
        // If previous clicked-on item was an operator, take off that old operator before adding the new one.
        if (Object.values(operators).includes(history[history.length - 1])) {
          // Take off last item of history
          console.log('need to take off last operator');
          setHistory(
            (prevHistory) =>
              prevHistory.slice(0, -1) + operators[currentOperator]
          );
        } else {
          setHistory((prevHistory) => prevHistory + operators[currentOperator]);
        }
      }
    } else {
      setHistory('');
    }

    setInput(null);
    setOperator(currentOperator);
  };

  return (
    <div className="calculator-box">
      <div>input: {input}</div>
      <div>result: {result}</div>
      <div className="history-display">{history}</div>
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
  );
}
