function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function copy2DArray(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = array[i].slice();
    }

    return newArray;
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
        this.table = this.gamesDatabase[problem];
        this.generateSolution();
    }

    generateSolution() {
        this.solution = copy2DArray(this.table);
        this.solve(this.solution);
    }

    solve(game) {
        let [row, col] = this.checkMissing(game);

        if (row === -1 || col === -1) {
            return true;
        }

        for (let value = 1; value <= 9; value++) {
            if (this.canInsert(game, row, col, value)) {
                game[row][col] = value;
                if (this.solve(game)) {
                    return true;
                } else {
                    game[row][col] = 0;
                }
            }
        }

        return false;
    }

    checkMissing(game) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (game[i][j] === 0) {
                    return [i, j];
                }
            }
        }

        return [-1, -1];
    }

    canInsert(game, row, column, value) {
        let rowSafe = this.isRowSafe(game, row, value);
        let columnSafe = this.isColumnSafe(game, column, value);
        let gridSafe = this.isGridSafe(game, row, column, value);
        return rowSafe && columnSafe && gridSafe;
    }

    isRowSafe(game, row, value) {
        for (let column = 0; column < 9; column++) {
            if (game[row][column] === value) {
                return false;
            }
        }

        return true;
    }

    isColumnSafe(game, column, value) {
        for (let row = 0; row < 9; row++) {
            if (game[row][column] === value) {
                return false;
            }
        }

        return true;
    }

    isGridSafe(game, row, column, value) {
        let rowStart = Math.floor(row / 3) * 3;
        let rowEnd = rowStart + 3;
        let columnStart = Math.floor(column / 3) * 3;
        let columnEnd = columnStart + 3;

        for (let i = rowStart; i < rowEnd; i++) {
            for (let j = columnStart; j < columnEnd; j++) {
                if (game[i][j] === value) {
                    return false;
                }
            }
        }

        return true;
    }
}
