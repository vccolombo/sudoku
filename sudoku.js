function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Sudoku {
    constructor() {
        this.generateNewGame();
    }

    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],

    gamesDatabase = [
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 1, 6, 0],
            [0, 6, 7, 0, 3, 5, 0, 0, 4],
            [6, 0, 8, 1, 2, 0, 9, 0, 0],
            [0, 9, 0, 0, 8, 0, 0, 3, 0],
            [0, 0, 2, 0, 7, 9, 8, 0, 6],
            [8, 0, 0, 6, 9, 0, 3, 5, 0],
            [0, 2, 6, 0, 0, 0, 0, 9, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 8, 0, 0, 0, 0, 2, 0, 0],
            [0, 0, 0, 0, 8, 4, 0, 9, 0],
            [0, 0, 6, 3, 2, 0, 0, 1, 0],
            [0, 9, 7, 0, 0, 0, 0, 8, 0],
            [8, 0, 0, 9, 0, 3, 0, 0, 2],
            [0, 1, 0, 0, 0, 0, 9, 5, 0],
            [0, 7, 0, 0, 4, 5, 8, 0, 0],
            [0, 3, 0, 7, 1, 0, 0, 0, 0],
            [0, 0, 8, 0, 0, 0, 0, 4, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 9, 2, 6],
            [2, 6, 0, 9, 1, 0, 5, 0, 0],
            [0, 5, 4, 0, 3, 0, 0, 0, 0],
            [6, 0, 0, 8, 0, 5, 0, 9, 7],
            [8, 0, 0, 0, 0, 0, 0, 0, 1],
            [5, 4, 0, 1, 0, 9, 0, 0, 2],
            [0, 0, 0, 0, 2, 0, 1, 6, 0],
            [0, 0, 2, 0, 9, 6, 0, 3, 5],
            [3, 8, 6, 0, 0, 0, 0, 0, 0],
        ]
    ];

    generateNewGame() {
        let problem = getRndInteger(0, this.gamesDatabase.length);
        this.grid = this.gamesDatabase[problem];
    }

    solve() {
        let [row, col] = this.checkMissing();

        if (row === -1 || col === -1) {
            return true;
        }

        for (let value = 1; value <= 9; value++) {
            if (this.canInsert(row, col, value)) {
                this.grid[row][col] = value;
                if (this.solve()) {
                    return true;
                } else {
                    this.grid[row][col] = 0;
                }
            }
        }

        return false;
    }

    checkMissing() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.grid[i][j] === 0) {
                    return [i, j];
                }
            }
        }

        return [-1, -1];
    }

    canInsert(row, column, value) {
        let rowSafe = this.isRowSafe(row, value);
        let columnSafe = this.isColumnSafe(column, value);
        let gridSafe = this.isGridSafe(row, column, value);
        return rowSafe && columnSafe && gridSafe;
    }

    isRowSafe(row, value) {
        for (let column = 0; column < 9; column++) {
            if (this.grid[row][column] === value) {
                return false;
            }
        }

        return true;
    }

    isColumnSafe(column, value) {
        for (let row = 0; row < 9; row++) {
            if (this.grid[row][column] === value) {
                return false;
            }
        }

        return true;
    }

    isGridSafe(row, column, value) {
        let rowStart = Math.floor(row / 3) * 3;
        let rowEnd = rowStart + 3;
        let columnStart = Math.floor(column / 3) * 3;
        let columnEnd = columnStart + 3;

        for (let i = rowStart; i < rowEnd; i++) {
            for (let j = columnStart; j < columnEnd; j++) {
                if (this.grid[i][j] === value) {
                    return false;
                }
            }
        }

        return true;
    }
}

sudoku = new Sudoku();
sudoku.solve();
console.log(sudoku.grid);