"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();
  
  const {
    validate,
    checkRowPlacement,
    checkColPlacement,
    checkRegionPlacement,
    solve,
  } = solver;

  const error = {
    fieldMissing: { error: "Required field missing" },
    invalidChar: { error: "Invalid characters in puzzle" },
    invalidLength: { error: "Expected puzzle to be 81 characters long" },
    unsolvable: { error: "Puzzle cannot be solved" },
    invalidCoord: { error: "Invalid coordinate"},
    invalidVal: { error: "Invalid value" }

  }

  app.route("/api/check").post((req, res) => {
    const { coordinate, value, puzzle } = req.body;
    
    if (!puzzle || !coordinate || !value) return res.json({ error: "Required field(s) missing" });

    const checkPuzzle = validate(puzzle),
          checkCoord = /^[a-i][1-9]$/i,
          checkVal = /^[1-9]$/;

    if (checkPuzzle !== true) return res.json(error[checkPuzzle]);
    if (!checkCoord.test(coordinate)) return res.json(error.invalidCoord);
    if (!checkVal.test(value)) return res.json(error.invalidVal);

    const splitCoord = coordinate.split(""),
          checkRow = splitCoord[0],
          checkColumn = splitCoord[1];

    const rowResult = checkRowPlacement(puzzle, checkRow, checkColumn, value),
          columnResult = checkColPlacement(puzzle, checkRow, checkColumn, value),
          regionResult = checkRegionPlacement(puzzle, checkRow, checkColumn, value),
          conflicts = [];
    
    if(rowResult) conflicts.push('row');
    if(columnResult) conflicts.push('column');
    if(regionResult) conflicts.push('region');
    
    if (conflicts.length > 0) return res.json({ valid: false, conflict: conflicts })
      return res.json({ valid: true });
    
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;
    if (!puzzle) return res.json(error.fieldMissing);
    const checkPuzzle = validate(puzzle);
    if (checkPuzzle !== true) return res.json(error[checkPuzzle])
    const result = solve(puzzle, checkColPlacement, checkRowPlacement, checkRegionPlacement);
    if(result == 'unsolvable') return res.json(error.unsolvable);
    return res.json({solution: result})
  
      


    
  });
};
