//Sudoku solver
//Author : Gitesh Gupta <gitesh.iit@gmail.com>

import _ from 'lodash';

const SUDOKU_LENGTH = 9;
const EDGE_LENGTH = 3;
let test =
	[
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0]
	];


class Sudoku {
	constructor(sudoku) {
		this.rows = [];
		this.grids = [];
		this.columns = [];
		//TODO : add validation.
		if(sudoku) {
			this.generateRows(sudoku);
			this.generateGrids();
			this.generateColumns();
		}
	}

	isValid() {
		for (let i = 0; i < SUDOKU_LENGTH;i++) {
			const set = new Set();
			//console.log("set", set)
			for (let j = 0; j < SUDOKU_LENGTH; j++) {
				let value = this.rows[i][j];
				if(value === 0) {
					continue;
				}
				if (set.has(value)) {
					return false;
				}
				set.add(value);
			}
		}

		for (let i = 0; i < SUDOKU_LENGTH; i++) {
			const set = new Set();
			for (let j = 0; j < SUDOKU_LENGTH; j++) {
				let value = this.grids[i][j];
				if (value === 0) {
					continue;
				}
				if (set.has(value)) {
					return false;
				}
				set.add(value);
			}
		}

		for (let i = 0; i < SUDOKU_LENGTH; i++) {
			const set = new Set();
			for (let j = 0; j < SUDOKU_LENGTH; j++) {
				let value = this.columns[i][j];
				if (value === 0) {
					continue;
				}
				if (set.has(value)) {
					return false;
				}
				set.add(value);
			}
		}
		return true;
	}


	isSolved() {
		for (let i = 0; i < SUDOKU_LENGTH; i++) {
			const set = new Set();
			for (let j = 0; j < SUDOKU_LENGTH; j++) {
				let value = this.rows[i][j];
				if (value === 0) {
					return false;
				}
				if (set.has(value)) {
					return false;
				}
				set.add(value);
			}
		}

		for (let i = 0; i < SUDOKU_LENGTH; i++) {
			const set = new Set();
			for (let j = 0; j < SUDOKU_LENGTH; j++) {
				let value = this.grids[i][j];
				if (value === 0) {
					return false;
				}
				if (set.has(value)) {
					return false;
				}
				set.add(value);
			}
		}

		for (let i = 0; i < SUDOKU_LENGTH; i++) {
			const set = new Set();
			for (let j = 0; j < SUDOKU_LENGTH; j++) {
				let value = this.columns[i][j];
				if (value === 0) {
					return false;
				}
				if (set.has(value)) {
					return false;
				}
				set.add(value);
			}
		}
		return true;
	}
	generateGrids() {
		this.grids = [];
		for (let k = 0; k < SUDOKU_LENGTH; k += EDGE_LENGTH) {
			for (let i = 0; i < EDGE_LENGTH; i++) {
				let grid = [];
				for (let j = 0; j < EDGE_LENGTH; j++) {
					let start = i * EDGE_LENGTH;
					grid.push(_.slice(this.rows[j + k], start, start + EDGE_LENGTH));
				}
				this.grids.push(_.flatten(grid));
			}
		}
	}
	generateRows(sudoku) {
		for (let i = 0; i < SUDOKU_LENGTH ; i ++) {
			this.rows.push([...sudoku[i]]);
		}
	}
	generateColumns() {
		this.columns = [];
		for (let i = 0; i < SUDOKU_LENGTH; i++) {
			let column = [];
			for (let j = 0; j < SUDOKU_LENGTH; j++) {
				column.push(this.rows[j][i])
			}
			this.columns.push(column);
		}
	}
}

export default class SudokuSolver {
	constructor(sudokuArr) {
		let sudoku = new Sudoku(sudokuArr);
		return this.solve(sudoku);
	}
	findEmptyCell(sudoku) {
		for (let i = 0; i < SUDOKU_LENGTH; i++) {
			for (let j = 0; j < SUDOKU_LENGTH; j++) {
				if (sudoku.rows[i][j] === 0) {
					return [i,j]
				}
			}
		}
		return false;
	}
	solve(sudoku) {
		for (let i = 1; i <=SUDOKU_LENGTH;i++) {
			let empty = this.findEmptyCell(sudoku);
			if(!empty) {
				return sudoku;
			}
			sudoku.rows[empty[0]][empty[1]] = i;
			sudoku.generateGrids();
			sudoku.generateColumns();
			let isValid = sudoku.isValid();
			if (!isValid) {
				sudoku.rows[empty[0]][empty[1]] = 0;
				sudoku.generateGrids();
				sudoku.generateColumns();
				continue;
			}
			let test = sudoku.isSolved();
			if (test) {
				console.log("sudoku solved", sudoku, test)
				return sudoku;
			}
			let result = this.solve(sudoku);
			if (result) {
				return result;
			}
			sudoku.rows[empty[0]][empty[1]] = 0;
			sudoku.generateGrids();
			sudoku.generateColumns();

		}
		return false;
	}
}
