$(function() {
    $(".cell").click(function() {
        unselectPreviousCell();
        selectCell(this);
    });
});

function unselectPreviousCell() {
    $(".selected").removeClass("selected");
}

function selectCell(cell) {
    $(cell).addClass("selected");
}