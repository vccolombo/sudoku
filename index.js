$(function () {
    let game = generateNewGame();

    $(".cell").click(function () {
        unselectPreviousCell();
        selectCell(this);
    });

    $(document).keypress(function (event) {
        let selectedCell = $(".selected");
        let valueElement = $(".value", selectedCell);
        if (event.key >= 1 && event.key <= 9 && !valueElement.hasClass("value-locked")) {
            updateCellValue(valueElement, event.key);
            updateInternalGameTable(game);
            checkAndUpdateCollisions();
            if (checkGameFinished(game)) {
                showWinMessage();
            }
        }
    });
});

function generateNewGame() {
    let game = new Sudoku();

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (game.originalGame[row][col] !== 0) {
                let cell = $(".row").eq(row).children().eq(col);
                $(".value", cell).text(game.originalGame[row][col]);
                $(".value", cell).addClass("value-locked");
            }
        }
    }

    return game;
}

function unselectPreviousCell() {
    $(".selected").removeClass("selected");
}

function selectCell(cell) {
    $(cell).addClass("selected");
}

function updateCellValue(cell, value) {
    cell.text(value);
}

function updateInternalGameTable(game) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let cell = $(".row").eq(row).children().eq(col);
            let value = $(".value", cell).text();
            game.currGame[row][col] = value;
        }
    }
}

function checkAndUpdateCollisions() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let cell = $(".row").eq(row).children().eq(col);
            let value = $(".value", cell);

            if (value.text() === "" || value.hasClass("value-locked")) {
                continue;
            }

            value.removeClass("collision");

            checkAndUpdateCollisionsRow(row, col, value);
            checkAndUpdateCollisionsColumn(row, col, value);
            checkAndUpdateCollisionsGrid(row, col, value);
        }
    }
}

function checkAndUpdateCollisionsRow(row, col, value) {
    for (let j = 0; j < 9; j++) {
        if (j === col) continue;

        let currCell = $(".row").eq(row).children().eq(j);
        let currValue = $(".value", currCell);
        if (currValue.text() === value.text()) {
            value.addClass("collision");
        }
    }
}

function checkAndUpdateCollisionsColumn(row, col, value) {
    for (let i = 0; i < 9; i++) {
        if (i === row) continue;

        let currCell = $(".row").eq(i).children().eq(col);
        let currValue = $(".value", currCell);
        if (currValue.text() === value.text()) {
            value.addClass("collision");
        }
    }
}

function checkAndUpdateCollisionsGrid(row, col, value) {
    let rowStart = Math.floor(row / 3) * 3;
    let rowEnd = rowStart + 3;
    let columnStart = Math.floor(col / 3) * 3;
    let columnEnd = columnStart + 3;

    for (let i = rowStart; i < rowEnd; i++) {
        for (let j = columnStart; j < columnEnd; j++) {
            if (i === row && j === col) continue;

            let currCell = $(".row").eq(i).children().eq(j);
            let currValue = $(".value", currCell);
            if (currValue.text() === value.text()) {
                value.addClass("collision");
            }
        }
    }
}

function checkGameFinished(game) {
    return game.isCurrGameEqualToSolution();
}

function showWinMessage() {
    $(".win-container").show();
}