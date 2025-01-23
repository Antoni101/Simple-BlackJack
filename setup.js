
const suits = [
    { name: "Hearts", symbol: "♥", color: "red" },
    { name: "Diamonds", symbol: "♦", color: "red" },
    { name: "Clubs", symbol: "♣", color: "black" },
    { name: "Spades", symbol: "♠", color: "black" },
];

class Card { // CARD LAYOUT
    constructor(value, suit, rank, symbol) {
        this.value = value;
        this.suit = suit;
        this.rank = rank;
        this.symbol = symbol;
        this.facedown = false;
        this.element = null;
        this.color = "";
    }
}

let money = 0;
let chips = 0;
let deck = [];
let playerHand = [];
let dealerHand = [];

function newDeck() {  // RETURNS STANDARD DECK OF CARDS

    deck = [];

    for (let i = 0; i < suits.length; i++) {

        deck.push({ rank: "A", suit: suits[i].name, value: 11, symbol: suits[i].symbol, color: suits[i].color })

        for (let j= 2; j < 11; j++) {
            deck.push( { rank: j, suit: suits[i].name, value: j, symbol: suits[i].symbol, color: suits[i].color  });
        }

        deck.push({ rank: "J", suit: suits[i].name, value: 10, symbol: suits[i].symbol, color: suits[i].color  })
        deck.push({ rank: "Q", suit: suits[i].name, value: 10, symbol: suits[i].symbol, color: suits[i].color  })
        deck.push({ rank: "K", suit: suits[i].name, value: 10, symbol: suits[i].symbol, color: suits[i].color  })
    };

    deck = shuffleDeck(deck);
    return deck;
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function loadGame() {
    updateMoney(200); // GIVES STARTER PLAYER MONEY
    updateChips(0);
    loadUpgrades();

    //shopAnimation();
}

function newGame() {
    newDeck();

    // DEALS CARDS TO PLAYER AND DEALER
    givePlayer(); givePlayer(); 
    giveDealer(false); giveDealer(true); 

    hideCard();
    showGame();
    showOptions();

};

function newCard(i) {
    let card = document.createElement("div");
    card.classList.add("card");

    let rankA = document.createElement("h4");
    rankA.classList.add("topTxt");
    rankA.classList.add("cardTxt");
    rankA.append(i.rank);
    card.append(rankA);

    let suit = document.createElement("p");
    suit.classList.add("suitTxt");
    suit.classList.add("cardTxt");
    suit.append(i.symbol);
    card.append(suit);

    let rankB = document.createElement("h4");
    rankB.classList.add("bottomTxt");
    rankB.classList.add("cardTxt");
    rankB.append(i.rank);
    card.append(rankB);
    card.style.color = i.color;

    return card;
};

function getValue(hand) { // RETURNS VALUE OF HAND
    let value = 0;
    for (let i = 0; i < hand.length; i++) {
        value += hand[i].value;
    }
    return value;
};

function givePlayer() { // GIVES PLAYER NEW CARD FROM DECK
    playerHand.push(deck.shift());
    let item = playerHand[playerHand.length - 1];
    item.element = newCard(item);
    document.getElementById("playerHand").append(item.element);
    document.getElementById("A").innerHTML = getValue(playerHand);

    if (checkBust(playerHand) == true) {
        bust();
        hideOptions();
    }
};

// GIVES DEALER NEW CARD FROM DECK
function giveDealer(x) { // if x is true: MAKE ONE CARD FACEDOWN
    dealerHand.push(deck.shift());
    let item = dealerHand[dealerHand.length - 1];
    item.facedown = x;
    item.element = newCard(item);
    document.getElementById("dealerHand").append(item.element);
    document.getElementById("B").innerHTML = getValue(dealerHand);
};

function checkBust(hand) { // RETURNS TRUE OR FALSE IF HAND IS A BUST
    if ( getValue(hand) > 21) { return true; }
    else { return false; }
}

function dealerFinish() { // DEALER FINISHES HAND AFTER STAND (hand < 17)
    let df = setInterval(function() { 
        if (getValue(dealerHand) < 17) {
            giveDealer(false);
        }
        else {
            clearInterval(df);
            showCard();
            check();
        }
    }, 300);
}

function stand() {
    hideMenu();

    if (checkBust(playerHand) == false) {
        dealerFinish();
    }
    else {
        bust();
    }
}

function check() { // CHECKS COMBOS AFTER STAND
    if (getValue(dealerHand) == 21 || getValue(dealerHand) == getValue(playerHand)) { tie(); }
    else if (getValue(playerHand) == 21) { win(); }
    else if (getValue(playerHand) > getValue(dealerHand)) { win(); }
    else if (getValue(dealerHand) > 21) { win(); }
    else { lose(); }
}

function sellChips(amount) {
    if ( chips >= amount) {
        updateMoney(50); 
        updateChips(-50);
    }
}

function buyChips(amount) {
    if ( money >= amount) {
        updateMoney(-50); 
        updateChips(50);
    }
}

function allChips() {
    updateMoney(chips);
    updateChips(-chips);
}

function end() { // ENDS THE GAME AND OPENS MENU
    hideOptions();
    setTimeout(function() {
        hideGame();
        setTimeout(function() {
            showMenu();
            enableBet();
        },1000);
    },3000);
}

function restart() { // ONCLICK RESTART BUTTON
    if (disableBet() == true) {
        document.getElementById("playerHand").innerHTML = "";
        document.getElementById("dealerHand").innerHTML = "";
        
        playerHand = [];
        dealerHand = [];

        hideMenu();
        setTimeout(function() {
            newGame();
        },1000);
    }
    else {
        say("Must make a wager!");
    }
}

function win() {
    say("Player Wins " + (chips * 1.5) + " chips!");
    setTimeout(updateChips(chips * 1.5),3000);
    end();
}

function loseAllChips() {
    let save = 0;
    let lossAmount = chips;
    if (upgrades[0].enabled == true) {
        let percent = 0.1 * upgrades[0].bought;
        save = chips * percent;
        console.log("Total Lost: " + lossAmount);
        console.log("Saved Chips" + save);
        lossAmount -= save;
    }

    setTimeout(updateChips(-lossAmount),3000);
}

function bust() {
    say("Bust :(");
    loseAllChips();
    end();
}

function tie() {
    say("Push, nobody wins, nobody loses");
    end();
}

function lose() {
    say("Player Loses :(");
    loseAllChips();
    end();
}