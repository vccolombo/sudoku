$(function () {
    generateNewGame();

    $(".cell").click(function () {
        unselectPreviousCell();
        selectCell(this);
    });

    $(document).keypress(function (event) {
        if (event.key >= 1 && event.key <= 9 && !$(".selected").hasClass("value-locked")) {
            $(".selected").text(event.key);
            checkGameFinished();
        }
    });
});

function generateNewGame() {
    let game = new Sudoku();

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (game.table[row][col] !== 0) {
                let cell = $('.row').eq(row).children().eq(col);
                $(cell).text(game.table[row][col]);
                $(cell).addClass("value-locked");
            }
        }
    }
}

function unselectPreviousCell() {
    $(".selected").removeClass("selected");
}

function selectCell(cell) {
    $(cell).addClass("selected");
}

function checkGameFinished() {
    // Todo
}