const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();
  
  const {
    validate,
    checkRowPlacement,
    checkColPlacement,
    checkRegionPlacement,
    solve,
  } = solver;

suite('Unit Tests', () => {

    suite('Validate Puzzle String', () => {
        test('Valid Puzzle String', () => {
             assert.equal(validate('123456789123456789123456789123456789123456789123456789123456789123456789123456789'), true);
        })
        test('Ivalid Characters in String', () => {
            assert.equal(validate('123456789123456c891234d67891b3456789123456789a23456789123456789123456789123456789'), 'invalidChar');
        })
        test('Invalid Puzzle String Length', () => {
            assert.equal(validate('12324345464569435375893589732895738497534895794387598374583794598753598794834598353785389'), 'invalidLength');
            assert.equal(validate('12345'), 'invalidLength')
        })
    

    })
    suite('Validate Row Placement', () => {
        test('Valid Row Placement', () => {
            assert.isFalse(checkRowPlacement('.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6', 'A', '1', '4'))
        })
        test('Invalid Row Placement', () => {
            assert.isTrue(checkRowPlacement('82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51', 'B', '7', '9'))
        })
    })
    suite('Validate Column Placement', () => {
        test('Valid Column Placement', () => {
            assert.isFalse(checkColPlacement('.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6', 'A', '1', '4'))
        })
        test('Invalid Colum Placement', () => {
            assert.isTrue(checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'D', '4', '7'))
        })
    })
    suite('Validate Region Placement', () => {
        test('Valid Region Placement', () => {
            assert.isFalse(checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'E', '7', '4'))
        })
        test('Invalid Region Placement', () => {
            assert.isTrue(checkRegionPlacement('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', 'G', '7', '8'))
        })
    })
    suite('Validate Solver', () => {
        test('Valid Solver String', () => {
            assert.equal(solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', checkRowPlacement, checkColPlacement, checkRegionPlacement), '135762984946381257728459613694517832812936745357824196473298561581673429269145378')
        })
        test('Invalid Solver String', () => {
            assert.equal(solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....914.37.', checkRowPlacement, checkColPlacement, checkRegionPlacement), 'unsolvable');
        })
        test('Solve solveable puzzle', () => {
            assert.equal(solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', checkRowPlacement, checkColPlacement, checkRegionPlacement), '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
            assert.equal(solve('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3', checkRowPlacement, checkColPlacement, checkRegionPlacement), '568913724342687519197254386685479231219538467734162895926345178473891652851726943');
            assert.equal(solve('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', checkRowPlacement, checkColPlacement, checkRegionPlacement), '218396745753284196496157832531672984649831257827549613962415378185763429374928561');
            assert.equal(solve('.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6', checkRowPlacement, checkColPlacement, checkRegionPlacement), '473891265851726394926345817568913472342687951197254638734162589685479123219538746');
            assert.equal(solve('82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51', checkRowPlacement, checkColPlacement, checkRegionPlacement), '827549163531672894649831527496157382218396475753284916962415738185763249374928651');
        })
    })

});
