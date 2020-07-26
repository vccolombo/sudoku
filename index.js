$(function () {
    let game = generateNewGame();

    $(".cell").click(function () {
        unselectPreviousCell();
        selectCell(this);
    });

    $(document).keypress(function (event) {
        let selectedCell = $(".selected");
        let valueElement = $(".value", selectedCell)
        if (event.key >= 1 && event.key <= 9 && !valueElement.hasClass("value-locked")) {
            valueElement.text(event.key);
            if (checkGameFinished(game)) {
                console.log("You Win");
            }
        }
    });
});

function generateNewGame() {
    let game = new Sudoku();

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (game.table[row][col] !== 0) {
                let cell = $(".row").eq(row).children().eq(col);
                $(".value", cell).text(game.table[row][col]);
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

function checkGameFinished(game) {
    if (isAnyCellEmpty() || isUserGameEqualToSolution(game)) {
        return false;
    }
    
    return true;
}

function isUserGameEqualToSolution(game) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let cell = $(".row").eq(row).children().eq(col);
            let value = $(".value", cell).text();
            if (value != game.solution[row][col]) {
                return false;
            }
        }
    }

    return true;
}

function isAnyCellEmpty() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let cell = $(".row").eq(row).children().eq(col);
            let valueElement = $(".value", cell)
            if (isEmpty(valueElement)) {
                return true;
            }
        }
    }

    return false;
}

function isEmpty(element) {
    return !$.trim(element.html())
}