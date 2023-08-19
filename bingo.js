const CARDS = [
    "Someone gets a pentakill",
    "Racial slurs",
    "GG EZ",
    "Something in polish",
    "JG DIFF",
    "Baron",
    "Dragon steal",
    "Red/blue buff steal",
    "Level 7 mastery",
    "100k+ mastery points",
    "Everyone in a team is Level 5+ mastery",
    "Everyone has a skin",
    "Skin from the newest skin-line",
    "Yasuo/Yone level 7",
    "Threatening to AFK",
    "'Dont worry guys, I can carry'",
    "'Lets FF' / FF15"
];

let won = false;

// https://stackoverflow.com/a/46545530
function shuffleCards() {
    let shuffledCards = CARDS
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)
    return shuffledCards;
}

function setupCards() {
    let cards = shuffleCards();
    $(".bingoButton").each(function(i, obj) {
        $(this).html(cards[i]);
        $(this).removeClass("bingoButtonCheck");
        $(this).removeClass("bigngoButtonBlink");
    });
}

function checkForWin() {
    if ($(".sq11").hasClass("bingoButtonCheck") &&
        $(".sq12").hasClass("bingoButtonCheck") &&
        $(".sq13").hasClass("bingoButtonCheck") &&
        $(".sq14").hasClass("bingoButtonCheck"))
    {
        $(".sq11").addClass("bigngoButtonBlink");
        $(".sq12").addClass("bigngoButtonBlink");
        $(".sq13").addClass("bigngoButtonBlink");
        $(".sq14").addClass("bigngoButtonBlink");
        return true;
    } 
    if ($(".sq21").hasClass("bingoButtonCheck") &&
        $(".sq22").hasClass("bingoButtonCheck") &&
        $(".sq23").hasClass("bingoButtonCheck") &&
        $(".sq24").hasClass("bingoButtonCheck"))
    {
        $(".sq21").addClass("bigngoButtonBlink");
        $(".sq22").addClass("bigngoButtonBlink");
        $(".sq23").addClass("bigngoButtonBlink");
        $(".sq24").addClass("bigngoButtonBlink");
        return true;
    } 
    if ($(".sq31").hasClass("bingoButtonCheck") &&
        $(".sq32").hasClass("bingoButtonCheck") &&
        $(".sq33").hasClass("bingoButtonCheck") &&
        $(".sq34").hasClass("bingoButtonCheck"))
    {
        $(".sq31").addClass("bigngoButtonBlink");
        $(".sq32").addClass("bigngoButtonBlink");
        $(".sq33").addClass("bigngoButtonBlink");
        $(".sq34").addClass("bigngoButtonBlink");
        return true;
    } 
    if ($(".sq41").hasClass("bingoButtonCheck") &&
        $(".sq42").hasClass("bingoButtonCheck") &&
        $(".sq43").hasClass("bingoButtonCheck") &&
        $(".sq44").hasClass("bingoButtonCheck"))
    {
        $(".sq41").addClass("bigngoButtonBlink");
        $(".sq42").addClass("bigngoButtonBlink");
        $(".sq43").addClass("bigngoButtonBlink");
        $(".sq44").addClass("bigngoButtonBlink");
        return true;
    } 
    if ($(".sq11").hasClass("bingoButtonCheck") &&
        $(".sq21").hasClass("bingoButtonCheck") &&
        $(".sq31").hasClass("bingoButtonCheck") &&
        $(".sq41").hasClass("bingoButtonCheck"))
    {
        $(".sq11").addClass("bigngoButtonBlink");
        $(".sq21").addClass("bigngoButtonBlink");
        $(".sq31").addClass("bigngoButtonBlink");
        $(".sq41").addClass("bigngoButtonBlink");
        return true;
    } 
    if ($(".sq12").hasClass("bingoButtonCheck") &&
        $(".sq22").hasClass("bingoButtonCheck") &&
        $(".sq32").hasClass("bingoButtonCheck") &&
        $(".sq32").hasClass("bingoButtonCheck"))
    {
        $(".sq12").addClass("bigngoButtonBlink");
        $(".sq22").addClass("bigngoButtonBlink");
        $(".sq32").addClass("bigngoButtonBlink");
        $(".sq42").addClass("bigngoButtonBlink");
        return true;
    }
    if ($(".sq13").hasClass("bingoButtonCheck") &&
        $(".sq23").hasClass("bingoButtonCheck") &&
        $(".sq33").hasClass("bingoButtonCheck") &&
        $(".sq43").hasClass("bingoButtonCheck"))
    {
        $(".sq13").addClass("bigngoButtonBlink");
        $(".sq23").addClass("bigngoButtonBlink");
        $(".sq33").addClass("bigngoButtonBlink");
        $(".sq43").addClass("bigngoButtonBlink");
        return true;
    }
    if ($(".sq14").hasClass("bingoButtonCheck") &&
        $(".sq24").hasClass("bingoButtonCheck") &&
        $(".sq34").hasClass("bingoButtonCheck") &&
        $(".sq44").hasClass("bingoButtonCheck"))
    {
        $(".sq14").addClass("bigngoButtonBlink");
        $(".sq24").addClass("bigngoButtonBlink");
        $(".sq34").addClass("bigngoButtonBlink");
        $(".sq44").addClass("bigngoButtonBlink");
        return true;
    }
    if ($(".sq11").hasClass("bingoButtonCheck") &&
        $(".sq22").hasClass("bingoButtonCheck") &&
        $(".sq33").hasClass("bingoButtonCheck") &&
        $(".sq44").hasClass("bingoButtonCheck"))
    {
        $(".sq11").addClass("bigngoButtonBlink");
        $(".sq22").addClass("bigngoButtonBlink");
        $(".sq33").addClass("bigngoButtonBlink");
        $(".sq44").addClass("bigngoButtonBlink");
        return true;
    } 
    if ($(".sq41").hasClass("bingoButtonCheck") &&
        $(".sq32").hasClass("bingoButtonCheck") &&
        $(".sq23").hasClass("bingoButtonCheck") &&
        $(".sq14").hasClass("bingoButtonCheck"))
    {
        $(".sq41").addClass("bigngoButtonBlink");
        $(".sq32").addClass("bigngoButtonBlink");
        $(".sq23").addClass("bigngoButtonBlink");
        $(".sq14").addClass("bigngoButtonBlink");
        return true;
    } 
}

$(document).ready(function() {
    setupCards();
});

$("button").click(function() {
    $(this).toggleClass("bingoButtonCheck");
    if (checkForWin()) {
        if (!won) {
            alert("You win!")
        }
        won = true;
    }
});
