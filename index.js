var timer = 0;

$(function () {
    var game = generateNewGame();

    $(".cell").click(function () {
        unselectPreviousCell();
        selectCell(this);
    });

    $(document).keypress(function (event) {
        var selectedCell = $(".selected");
        var valueElement = $(".value", selectedCell);
        if (event.key >= 1 && event.key <= 9 && !valueElement.hasClass("value-locked")) {
            updateCellValue(valueElement, event.key);
            updateInternalGameTable(game);
            checkAndUpdateCollisions();
            if (checkGameFinished(game)) {
                showWinMessage();
            }
        }
    });

    setInterval(function () {
        updateTimer();
    }, 1000);
});

function generateNewGame() {
    var game = new Sudoku();

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (game.originalGame[row][col] !== 0) {
                var cell = $(".row").eq(row).children().eq(col);
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
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            var cell = $(".row").eq(row).children().eq(col);
            var value = $(".value", cell).text();
            game.currGame[row][col] = value;
        }
    }
}

function checkAndUpdateCollisions() {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            var cell = $(".row").eq(row).children().eq(col);
            var value = $(".value", cell);

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
    for (var j = 0; j < 9; j++) {
        if (j === col) continue;

        var currCell = $(".row").eq(row).children().eq(j);
        var currValue = $(".value", currCell);
        if (currValue.text() === value.text()) {
            value.addClass("collision");
        }
    }
}

function checkAndUpdateCollisionsColumn(row, col, value) {
    for (var i = 0; i < 9; i++) {
        if (i === row) continue;

        var currCell = $(".row").eq(i).children().eq(col);
        var currValue = $(".value", currCell);
        if (currValue.text() === value.text()) {
            value.addClass("collision");
        }
    }
}

function checkAndUpdateCollisionsGrid(row, col, value) {
    var rowStart = Math.floor(row / 3) * 3;
    var rowEnd = rowStart + 3;
    var columnStart = Math.floor(col / 3) * 3;
    var columnEnd = columnStart + 3;

    for (var i = rowStart; i < rowEnd; i++) {
        for (var j = columnStart; j < columnEnd; j++) {
            if (i === row && j === col) continue;

            var currCell = $(".row").eq(i).children().eq(j);
            var currValue = $(".value", currCell);
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

function updateTimer() {
    timer++;
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    $(".timer").text(zeroPad(minutes, 2) + ":" + zeroPad(seconds, 2));
}

// https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
const zeroPad = (num, places) => String(num).padStart(places, '0');