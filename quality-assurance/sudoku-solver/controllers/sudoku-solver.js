const e = require("cors");

class SudokuSolver {
  

  validate(puzzleString) {

    const checkInvalidChar = /[^\d\.]+/g,
          checkInvalidLength = puzzleString.length == 81;

    if (checkInvalidChar.test(puzzleString)) return "invalidChar";
    if (!checkInvalidLength) return 'invalidLength';
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
          columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          splitStr = puzzleString.split(""),
          mappedString = [];

    splitStr.map((e, i) => {
      const rowIndex = Math.floor(i / 9),
            columnIndex = i % 9;

      mappedString.push({
        value: e, 
        row: rows[rowIndex],
        column: columns[columnIndex],
      });
    });

    const result = mappedString
      .filter((o) => o.row == row.toUpperCase() && !(o.row == row.toUpperCase() && o.column == column))
      .some((o) => o.value == value);

      return result ? true: false;
  }

  checkColPlacement(puzzleString, row, column, value) {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
          columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const splitStr = puzzleString.split(""),
          mappedString = [];

    splitStr.map((e, i) => {
      const rowIndex = Math.floor(i / 9),
            columnIndex = i % 9;

      mappedString.push({
        value: e,
        row: rows[rowIndex],
        column: columns[columnIndex],
      });
    });

    const result = mappedString
      .filter((o) => o.column == column && !(o.row == row.toUpperCase() && o.column == column))
      .some((o) => o.value == value);

      return result ? true : false;
  }


  checkRegionPlacement(puzzleString, row, column, value) {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
          columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          regions = ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9"],
          splitStr = puzzleString.split(""),
          mappedString = [];

    splitStr.map((e, i) => {
      const rowIndex = Math.floor(i / 9),
            columnIndex = i % 9,
            regionIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(columnIndex / 3);

      mappedString.push({
        value: e,
        row: rows[rowIndex],
        column: columns[columnIndex],
        region: regions[regionIndex]
      });
    });

    const valueReg = mappedString.find(e => e.row == row.toUpperCase() && e.column == column),
          result = mappedString
            .filter((o) => o.region == valueReg.region && !(o.row == row.toUpperCase() && o.column == column))
            .some((o) => o.value == value);

      return result ? true : false;
  }



  solve(puzzleString, checkColPlacement, checkRowPlacement, checkRegionPlacement) {
    let solvedSudoku = '';
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
          columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          regions = ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9"],
          splitStr = puzzleString.split(""),
          mappedString = [];

    splitStr.map((e, i) => {

      const rowIndex = Math.floor(i / 9),
            columnIndex = i % 9,
            regionIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(columnIndex / 3);

      mappedString.push({ value: e, row: rows[rowIndex], column: columns[columnIndex], region: regions[regionIndex] });

    });
    const mappedValues = mappedString.map(e => e.value);

    const recurseFunc = (puzzleStr,currentSpot, currentRow, currentCol, possibilities) => {
      let p;
      solvedSudoku = solvedSudoku.slice(0, currentSpot)
      let posStr = puzzleStr.slice();
      if(currentSpot > 80) return solvedSudoku;

      for (p = 0; p < possibilities.length; p++){
   
        
        if(puzzleStr[currentSpot] != '.'){
          
          const validRow = checkRowPlacement(puzzleStr, currentRow, currentCol, puzzleStr[currentSpot]),
          validCol = checkColPlacement(puzzleStr, currentRow, puzzleStr[currentSpot]),
          validReg = checkRegionPlacement(puzzleStr, currentRow, currentCol, puzzleStr[currentSpot])
          
          if(!validRow && !validCol && !validReg){
            solvedSudoku += puzzleStr[currentSpot]
            break;
          }
          return 'unsolvable'
        }
        const rowResult = checkRowPlacement(puzzleStr, currentRow, currentCol, possibilities[p]),
              columnResult = checkColPlacement(puzzleStr, currentRow, currentCol, possibilities[p]),
              regionResult = checkRegionPlacement(puzzleStr, currentRow, currentCol, possibilities[p]);
          
          if(!rowResult && !columnResult && !regionResult){
            solvedSudoku += possibilities[p];
            posStr = puzzleStr.split('').fill(possibilities[p], currentSpot, currentSpot + 1).join('');
            break;
          }
        

      }
      if(solvedSudoku.length == 81){return solvedSudoku}
      if(mappedValues.indexOf('.') == currentSpot && p == possibilities.length) return 'unsolvable'
      if(p != possibilities.length){
        currentSpot++;
        possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const nextRow = mappedString[currentSpot].row,
              nextCol = mappedString[currentSpot].column;
        
        return recurseFunc(posStr, currentSpot, nextRow, nextCol, possibilities)
      }
      else{

        possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const backtrack = mappedValues.lastIndexOf('.', currentSpot - 1),
              negativeStr = puzzleStr.split('').fill('.', backtrack, backtrack + 1).join(''),
              backRow = mappedString[backtrack].row,
              backColumn = mappedString[backtrack].column,
              bPossibilities = possibilities.filter(e => parseInt(e) > parseInt(puzzleStr[backtrack]));

        return recurseFunc(negativeStr, backtrack, backRow, backColumn, bPossibilities)
      }

    
      }
      const result = recurseFunc(puzzleString, 0, mappedString[0].row, mappedString[0].column, [1, 2, 3, 4, 5, 6, 7, 8, 9] )
      return result;
    }
}

module.exports = SudokuSolver;
