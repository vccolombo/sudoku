$(function () {
    generateNewGame();

    $(".cell").click(function () {
        unselectPreviousCell();
        selectCell(this);
    });

    $(document).keypress(function(event) {
        if (event.key >= 1 && event.key <= 9 && !$(".selected").hasClass("value-locked")) {
            $(".selected").text(event.key);
        }
    });
});

function generateNewGame() {
    var game = new Sudoku();
    var grid = game.grid;

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] !== 0) {
                let cell = $('.row').eq(row).children().eq(col);
                $(cell).text(grid[row][col]);
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