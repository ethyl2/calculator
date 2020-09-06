import React, { useState, useEffect } from 'react';

export default function Calculator2() {
  const [topDisplay, setTopDisplay] = useState(0);
  const [history, setHistory] = useState('');
  const [result, setResult] = useState('');
  const [input, setInput] = useState();
  const [operator, setOperator] = useState();
  const [prevWasOperator, setPrevWasOperator] = useState(true);

  useEffect(() => {
    setTopDisplay(result);
    if (!result) {
      setTopDisplay(input);
    }
  }, [result, input]);

  const handleClear = () => {
    setTopDisplay(0);
    setResult(null);
    setInput(null);
    setOperator(null);
    setHistory('');
    setPrevWasOperator(true);
  };

  const handleClick = (e) => {
    setPrevWasOperator(false);
    const currentNum = e.target.id;

    if (operator === 'calculate') {
      setResult('');
    }

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
          setPrevWasOperator(true);
        }
      }
    }

    if (currentOperator !== 'calculate') {
      setPrevWasOperator(true);
      if (!history) {
        setHistory(result + operators[currentOperator]);
      } else {
        setHistory((prevHistory) => prevHistory + operators[currentOperator]);
      }
    } else {
      setHistory('');
      setTopDisplay(result);
    }

    setInput(null);
    setOperator(currentOperator);
  };

  const toggleNegative = () => {
    console.log('in toggle Negative');
    if (input) {
      setInput(-Number(input));

      let historyCopy = history;

      let regex = /[\+\-\\\*]/g,
        result,
        indices = [];
      while ((result = regex.exec(historyCopy))) {
        indices.push(result.index);
      }
      console.log(indices);
      console.log(indices[indices.length - 1]);
      const lastOperatorIndex = indices[indices.length - 1];
      const leftHistory = historyCopy.slice(0, lastOperatorIndex + 1);
      console.log(leftHistory);
      let newHistory = '';
      if (Number(input) > 0) {
        newHistory = leftHistory + '-' + input.toString();
        setHistory(newHistory);
      } else {
        newHistory = leftHistory + input.toString();
      }
      console.log(newHistory);
    } else {
      setResult(-Number(result));
    }
  };

  return (
    <div className="calculator-box">
      <div className="input-display">input: {input}</div>
      <div className="input-display">result: {result}</div>
      <div className="history-display">{history}</div>
      <div className="top-display">{topDisplay}</div>
      <div className="buttons-area">
        <div className="left-side">
          <div className="top-buttons">
            <div className="clear-button" onClick={handleClear}>
              C
            </div>
            <div className="toggle-negative" onClick={toggleNegative}>
              +/-
            </div>
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

        <div className="right-side">
          <div
            id="divide"
            onClick={(e) => !prevWasOperator && handleOperatorClick(e)}
            className={prevWasOperator ? 'disabled' : 'enabled'}
          >
            ÷
          </div>
          <div
            id="multiply"
            onClick={(e) => !prevWasOperator && handleOperatorClick(e)}
            className={prevWasOperator ? 'disabled' : 'enabled'}
          >
            x
          </div>
          <div
            id="subtract"
            onClick={(e) => !prevWasOperator && handleOperatorClick(e)}
            className={prevWasOperator ? 'disabled' : 'enabled'}
          >
            -
          </div>
          <div
            id="add"
            onClick={(e) => !prevWasOperator && handleOperatorClick(e)}
            className={prevWasOperator ? 'disabled' : 'enabled'}
          >
            +
          </div>
          <div
            id="calculate"
            onClick={handleOperatorClick}
            className="equal-button"
          >
            =
          </div>
        </div>
      </div>
    </div>
  );
}
