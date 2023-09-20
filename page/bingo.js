$(document).ready(function() {
    const riftCards = [
        "Someone gets a pentakill",
        "Profanity",
        "Someone says 'GG EZ/EZ'",
        "Something in polish/french",
        "Someone says 'JG DIFF'",
        "Baron steal",
        "Dragon steal",
        "Red/blue buff steal",
        "Level 7 mastery",
        "100k+ mastery points",
        "Everyone in a team is Level 5+ mastery",
        "Everyone has a skin",
        "Skin from the newest skin-line",
        "Yasuo/Yone level 7",
        "Threatening to AFK",
        "Someone says 'Dont FF, I can carry'",
        "'Lets FF' / FF15",
        "Accusing someone of feeding",
        "Complaining about a champion",
        "Complaining about an item",
        "Complaining about a summoner spell",
        "Deal the most amount of damage",
        "Deal the least amount of damage",
        "Support outdamages ADC",
        "Someone saying 'Dont end'",
        "ADC has 0 kills while SUP has 3",
        "Matching nicknames",
        "Insulting nickname",
        "Teemo pick",
        "Emote spam",
        "Fail flash",
        "Fail ward",
        "Missed ultimate",
        "Spam ping",
        "Spam ping 'Enemy missing'",
        "Spam ping 'Bait'",
        "Executed",
        "Scuttle crab dodging skillshots",
        "BM-ing",
        "Off-meta build",
        "Perma split pusher",
        "Successful 1v3",
        "4 honors",
        "Questioning someone's play",
        "Level 1 fiesta",
        "Someone is autofilled",
        "Jungler taxing laner",
        "3 man bot dive",
        "Someone goes legendary",
        "Yuumi pick",
        "Someone goes AFK",
        "Someone is late to the first wave",
        "Surrender vote at 15",
        "Backdoor attempt",
        "Double teleport",
        "Top lane goes 0-5",
        "Invade",
        "Someone gets 30 kills"
    ];
    
    const aramCards = [
        "Someone gets a pentakill",
        "Profanity",
        "Someone says 'GG EZ/EZ'",
        "Something in polish/french",
        "Level 7 mastery",
        "100k+ mastery points",
        "Everyone in a team is Level 5+ mastery",
        "Everyone has a skin",
        "Skin from the newest skin-line",
        "Yasuo/Yone level 7",
        "Threatening to AFK",
        "Someone says 'Dont FF, I can carry'",
        "'Lets FF' / FF15",
        "Accusing someone of feeding",
        "Complaining about a champion",
        "Complaining about an item",
        "Poro explodes in ARAM",
        "Complaining about a summoner spell",
        "Heal/Exhaust summoner spell",
        "Clarity/Cleanse summoner spell",
        "Everyone has the snowball spell",
        "Get dove 1v5 under your turret",
        "Deal the most amount of damage",
        "Deal the least amount of damage",
        "Someone saying 'Dont end'",
        "Matching nicknames",
        "Insulting nickname",
        "Teemo pick",
        "Emote spam",
        "Missed ultimate",
        "Spam ping",
        "Spam ping 'Enemy missing'",
        "Spam ping 'Bait'",
        "Executed",
        "BM-ing",
        "Off-meta build",
        "Successful 1v3",
        "4 honors",
        "Questioning someone's play",
        "Someone goes AFK",
        "Backdoor attempt",
        "Snowball kill",
        "Surrender vote at 8",
        "Someone gets 30 kills"
    ];
    
    let boardState = {}
    let rowCount = [0, 0, 0, 0];
    let colCount = [0, 0, 0, 0];
    let diag1Count = 0;
    let diag2Count = 0;
    let mode = "rift";
    setupCards();


    function setupCards() {
        let cards = shuffleCards();
        $('.bingoButton').each(function(i, obj) {
            $(this).html(cards[i]);
            $(this).removeClass('bingoButtonCheck');
            $(this).removeClass('bingoButtonBlink');
            $(this).removeAttr('disabled');
        });
        $('.splashScreenLeft').remove()
        $('.splashScreenRight').remove()
        boardState = {}
        rowCount = [0, 0, 0, 0];
        colCount = [0, 0, 0, 0];
        diag1Count = 0;
        diag2Count = 0;
    }


    // https://stackoverflow.com/a/46545530
    function shuffleCards() {
        let deck = mode ===  "rift" ? riftCards : aramCards;

        let shuffledCards = deck
            .map(value => ({value, sort: Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value)
        return shuffledCards;
    }
   

    function updateGameState(buttonId) {
        const button = $('#' + buttonId);
        const [row, col] = buttonId.slice(2).split('').map(Number);
        
        if (boardState[buttonId]) {
            delete boardState[buttonId];
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
        showSplashScreen()
        startAnimation();
        $('.bingoButton').each(function() {
            const buttonId = $(this).attr('id');
            const [row, col] = buttonId.slice(2).split('').map(Number);
            if (rowCount[row] === 4 || colCount[col] === 4 || (row === col && diag1Count === 4) || (row + col === 3 && diag2Count === 4)) {
                $(this).addClass('bingoButtonBlink');
            }
            $(this).attr('disabled', 'true');
        });
    }

    
    function showSplashScreen() {
        var splashScreenRight = $("<div>", {
            "class": "splashScreenRight",
            html: $("<div>", {
              "class": "splashScreenText",
              html: "Winner!"
            })
        });

        $('.background').append(splashScreenRight);
        var splashScreenLeft = $("<div>", {
            "class": "splashScreenLeft",
            html: $("<div>", {
              "class": "splashScreenText",
              html: "Winner!"
            })
        });
        $('.background').append(splashScreenLeft);
    }


    $('.bingoButton').click(function() {
        const buttonId = $(this).attr('id');
        updateGameState(buttonId);
    });


    $('.resetButton').click(function() {
        stopAnimation();
        setupCards();
        $('.splashScreen').remove();
    });

    
    var tutorialModal = new bootstrap.Modal($('#tutorialModal'));
    $('#tutorialButton').click(function() {
        tutorialModal.show();
    });

    $('#switch').change(function() {
        let userConfirmed = true;
        if (Object.keys(boardState).length !== 0) {
            userConfirmed = window.confirm("Are you sure you want to switch modes and start a new game?");
        }

        if ($(this).is(':checked')) {
            mode = "aram";
        } else {
            mode = "rift"
        }

        if (!userConfirmed) {
            $(this).prop('checked', !$(this).prop('checked'));
        } else {
            $('.background').toggleClass('aram');
            stopAnimation();
            setupCards();
        }
    });


    // Confetti
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    const confettiColors = ['#e74c3c', '#3498db', '#1abc9c', '#f39c12', '#9b59b6', '#e67e22'];
    const confettiParticles = [];
    

    function createConfettiParticle() {
        return {
            x: Math.random() * canvas.width,
            y: -10,
            size: Math.random() * 20 + 5,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            rotation: Math.random() * 360,
            speed: Math.random() * 2 + 1,
        };
    }
    

    function drawConfettiParticle(particle) {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
    }
    

    function updateConfettiParticles() {
        for (let i = 0; i < confettiParticles.length; i++) {
            const particle = confettiParticles[i];
            particle.y += particle.speed;
            if (particle.y > canvas.height) {
                confettiParticles.splice(i, 1);
                i--;
            }
        }
    }
    

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const particle of confettiParticles) {
            drawConfettiParticle(particle);
        }
        updateConfettiParticles();
        animationFrameId = requestAnimationFrame(animate);
    }
    

    function startAnimation() {
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(animate);
            setInterval(() => {
                confettiParticles.push(createConfettiParticle());
            }, 100);
        }
    }
    

    function stopAnimation() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            confettiParticles.length = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
});
