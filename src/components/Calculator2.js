import React, { useState, useEffect } from 'react';

export default function Calculator2() {
  const [topDisplay, setTopDisplay] = useState(0);
  const [history, setHistory] = useState('');
  const [result, setResult] = useState('');
  const [input, setInput] = useState();
  const [operator, setOperator] = useState();
  const [prevWasOperator, setPrevWasOperator] = useState(true);
  const [justMadeFloat, setJustMadeFloat] = useState(false);
  const [allowDecimalPoint, setAllowDecimalPoint] = useState(true);

  useEffect(() => {
    setTopDisplay(result);
    if (!result) {
      setTopDisplay(input);
    }
  }, [result]);

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
      // Special handling when the 'current Num' is the decimal point.
      if (currentNum === '.') {
        setInput(Number(input).toFixed(1).toString());
        setTopDisplay(Number(input).toFixed(1).toString());
        setJustMadeFloat(true);
        setAllowDecimalPoint(false);
      } else {
        let newNum = 0;
        if (!Number.isInteger(input) && justMadeFloat) {
          // Get rid of the 0 to the right of the decimal before adding the new digit
          // When first adding a digit after converting the input to a float.
          const numString =
            Number(input).toFixed(0).toString() + '.' + currentNum.toString();
          newNum = Number(numString);
          setJustMadeFloat(false);
        } else {
          const numString = input.toString() + currentNum.toString();
          newNum = Number(numString);
        }
        setInput(newNum);
        setTopDisplay(newNum);
      }
    }
  };

  const handleOperatorClick = (e) => {
    setAllowDecimalPoint(true);
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
    if (input) {
      setInput(-Number(input));
      setTopDisplay(-Number(input));

      let regex = /[\+\-\\\*]/g,
        result,
        indices = [];
      while ((result = regex.exec(history))) {
        indices.push(result.index);
      }
      const lastOperatorIndex = indices[indices.length - 1];
      const leftHistory = history.slice(0, lastOperatorIndex + 1);
      const rightHistory = history.slice(lastOperatorIndex + 1, history.length);

      let newHistory = '';
      if (Number(input) > 0) {
        // The input was originally greater than 0, so add the - sign in front of it now.
        newHistory = leftHistory + '-' + input.toString();
      } else {
        // The input was originally less than 0, we exclude the - sign in front of the input in the history.
        newHistory =
          leftHistory.slice(0, leftHistory.length - 1) + rightHistory;
      }
      setHistory(newHistory);
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
            <div
              className={
                allowDecimalPoint ? 'decimal enabled' : 'decimal disabled'
              }
              onClick={(e) => allowDecimalPoint && handleClick(e)}
              id="."
            >
              .
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
