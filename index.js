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

function checkGameFinished(game) {
    return game.isCurrGameEqualToSolution();
}

function showWinMessage() {
    $(".win-container").show();
}