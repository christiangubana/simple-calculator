import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);
  const [selectedOperator, setSelectedOperator] = useState("");

  const handleButtonClick = (value) => {
    if (["+", "-", "*", "/"].includes(value)) {
      // If the clicked button is an operator
      const lastCharIsOperator = ["+", "-", "*", "/"].includes(input.slice(-1));

      if (lastCharIsOperator) {
        // If the last character is an operator, replace it with the new operator
        setInput((prevInput) => prevInput.slice(0, -1) + value);
        setSelectedOperator(value);
      } else {
        // If the last character is not an operator, append the new operator to input
        setInput((prevInput) => prevInput + value);
        setSelectedOperator(value);
      }
    } else {
      // If the clicked button is a number, simply append it to the input
      setInput((prevInput) => prevInput + value);
    }
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = new Function("return " + input)(); //uses the Function constructor to evaluate the expression provided in the input
      //could use `eval` but it's causing security issue on production
      setResult(calculatedResult);
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
        <div className="operators">
          {["+", "-", "*", "/"].map((operator) => (
            <button
              key={operator}
              onClick={() => handleButtonClick(operator)}
              className={
                selectedOperator === operator ? "selected-operator" : "" //Add Animation on Selected Operator:
              }
            >
              {operator}
            </button>
          ))}
        </div>
      </div>
      <div className="buttons-wrapper">
        <div className="numbers">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((number) => (
            <button key={number} onClick={() => handleButtonClick(number)}>
              {number}
            </button>
          ))}
          <button onClick={() => handleButtonClick(".")}>.</button>
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
