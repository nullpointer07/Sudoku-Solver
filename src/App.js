import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SudokuSolver from './sudokuSolver';

function App() {
  const reset = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  const [sudoku, setSudoku] = useState(reset);

  function solveSudoku() {
    let newSudoku = new SudokuSolver(sudoku);
    if (!newSudoku.rows) {
      alert("Invalid, no solution")
      return;
    }
    setSudoku(newSudoku.rows);
  }

  function generateNumberInputs() {
    let inputs = []
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let topBorder = "1px", rightBorder = "1px", bottomBorder = "1px", leftBorder = "1px";
        if(i === 0) {
          topBorder = "5px";
        }
        if (j === 0) {
          leftBorder = "5px";
        }
        if ((i+1)%3===0) {
          bottomBorder = "5px";
        }
        if ((j + 1) % 3 === 0) {
          rightBorder = "5px";
        }

        let border = topBorder + " " + rightBorder + " " + bottomBorder + " " + leftBorder;
        inputs.push(<input key={i + "-" + j} className="App-Sudoku-input" style={{ borderWidth: border, borderStyle: 'solid'}}
          value={sudoku[i][j] || " "}
          onChange={(e) => {
          let newSudoku = JSON.parse(JSON.stringify(sudoku));
          console.log("e.target.value", e.target.value, parseInt(e.target.value))
          let newValue = parseInt(e.target.value);
          newSudoku[i][j] = newValue >= 10 ? parseInt(newValue % 10) : newValue;
          setSudoku(newSudoku);
        }} />);
      }
      inputs.push(<br />);
    }
    return inputs;
  }

  return (
    <div className="App">
      <div className="App-body">
        {generateNumberInputs()}
      </div>
      <button className="App-button" onClick={() => solveSudoku()} >Solve</button>
      <button className="App-button" onClick={() => setSudoku(reset)} >Reset</button>
    </div>
  );
}

export default App;
