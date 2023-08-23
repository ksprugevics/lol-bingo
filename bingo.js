$(document).ready(function() {
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
        "'Lets FF' / FF15",
        "Accusing someone of feeding",
        "Complaining about an op champ",
        "Complaining about an op item",
        "Poro explodes in ARAM",
        "Complaining about a summoner spell"
    ];

    let boardState = {}
    let rowCount = [0, 0, 0, 0];
    let colCount = [0, 0, 0, 0];
    let diag1Count = 0;
    let diag2Count = 0;
    setupCards();


    function setupCards() {
        let cards = shuffleCards();
        $(".bingoButton").each(function(i, obj) {
            $(this).html(cards[i]);
            $(this).removeClass("bingoButtonCheck");
            $(this).removeClass("bingoButtonBlink");
        });
        boardState = {}
        rowCount = [0, 0, 0, 0];
        colCount = [0, 0, 0, 0];
        diag1Count = 0;
        diag2Count = 0;
    }


    // https://stackoverflow.com/a/46545530
    function shuffleCards() {
        let shuffledCards = CARDS
            .map(value => ({value, sort: Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value)
        return shuffledCards;
    }
   

    function updateGameState(buttonId) {
        const button = $('#' + buttonId);
        const [row, col] = buttonId.slice(2).split('').map(Number);
        
        if (boardState[buttonId]) {
            boardState[buttonId] = false;
            button.removeClass('bingoButtonCheck');
            rowCount[row]--;
            colCount[col]--;
            if (row === col) diag1Count--;
            if (row + col === 3) diag2Count--;
        } else {
            boardState[buttonId] = true;
            button.addClass('bingoButtonCheck');
            rowCount[row]++;
            colCount[col]++;
            if (row === col) diag1Count++;
            if (row + col === 3) diag2Count++;
        }
        
        // Check for bingo
        if (rowCount[row] === 4 || colCount[col] === 4 || diag1Count === 4 || diag2Count === 4) {
            handleWin();
        }
    }

    function handleWin() {
        alert('You win!');
        $('.bingoButton').each(function() {
            const buttonId = $(this).attr('id');
            const [row, col] = buttonId.slice(2).split('').map(Number);
            if (rowCount[row] === 4 || colCount[col] === 4 || (row === col && diag1Count === 4) || (row + col === 3 && diag2Count === 4)) {
                $(this).addClass('bingoButtonBlink');
            }
        });
    }


    $('.bingoButton').click(function() {
        const buttonId = $(this).attr('id');
        updateGameState(buttonId);
    });

    $('.resetButton').click(function() {
        setupCards();
    });
});
