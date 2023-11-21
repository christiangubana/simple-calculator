import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    try {
      setResult(eval(input));
    } catch (error) {
      setResult("Error");
    }
  };

  const handleClear = () => {
    setInput("");
    setResult(0);
  };

  return (
    <div className="calculator-wrapper">
      <div className="input-wrapper">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="buttons-wrapper">
        <div className="operators">
          {["+", "-", "*", "/"].map((operator) => (
            <button key={operator} onClick={() => handleButtonClick(operator)}>
              {operator}
            </button>
          ))}
        </div>
        <div className="numbers">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((number) => (
            <button key={number} onClick={() => handleButtonClick(number)}>
              {number}
            </button>
          ))}
        </div>
        <div className="calculate-button">
          <button onClick={handleCalculate}>=</button>
        </div>
        <div className="clear-button">
          <button onClick={handleClear}>C</button>
        </div>
      </div>
      <div className="result-wrapper">
        <div className="result-label">Result:</div>
        <div className="result-value">{result}</div>
      </div>
    </div>
  );
};

export default Calculator;
