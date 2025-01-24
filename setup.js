
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
let doContinue = false;

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

function shuffleDeck() { // SHUFFLES DECK
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function loadGame() {
    upgradesSetup();
    gainMoney(500); // GIVES STARTER PLAYER MONEY
    updateChips(0);
}

function newGame() {
    hideMenu();
    setTimeout(makeBets,500);
};

function gainInterest() {
    let intPercent = 0.1 * upgrades[2].bought;
    let intGain = Math.round(money * intPercent);
    console.log("Gained $",intGain + " in interest");
    return intGain
}

function makeBets() {
    doContinue = false;
    document.getElementById("newroundBtn").style.display = "None";
    document.getElementById("continueBtn").style.display = "None";
    if (upgrades[2].enabled == true) {
        gainMoney(gainInterest());
    }
    setTimeout(showBets,500);
}

function showBets() {
    document.getElementById("bets").style.display = "Block";
    document.getElementById("money").style.display = "Block";
    document.getElementById("shopBtn").style.display = "Block";
}

function done() {
    if (chips > 0) {
        document.getElementById("bets").style.display = "None";
        document.getElementById("money").style.display = "None";
        document.getElementById("shopBtn").style.display = "None";
        newRound();
    }
    else {
        say("Must buy chips");
        elementAlert(document.getElementById("chips"));
    }
}

function sellChips(amount) {
    let cashout = amount;
    if ( chips >= cashout) {
        gainMoney(cashout); 
        updateChips(-cashout);
    }
}

function buyChips(amount) {
    if ( money >= amount) {
        loseMoney(amount); 
        updateChips(amount);
    }
}

function keepGoing() {
    doContinue = true
    newRound();
}

function end() { // ENDS THE GAME AND OPENS MENU
    hideOptions();
    setTimeout(function() {
        hideGame();
        setTimeout(function() {
            if (chips > 0) {
                document.getElementById("newroundBtn").style.display = "Block";
                document.getElementById("continueBtn").style.display = "Block";
            }
            else {
                makeBets();
            }
        },500);
    },2000);
}

function newRound() {
    document.getElementById("newroundBtn").style.display = "None";
    document.getElementById("continueBtn").style.display = "None";
    shopScr.style.display = "none";
    document.getElementById("playerHand").innerHTML = "";
    document.getElementById("dealerHand").innerHTML = "";
    playerHand = [];
    dealerHand = [];

    newDeck();

    // DEALS CARDS TO PLAYER AND DEALER
    givePlayer(); givePlayer(); 
    giveDealer(false); giveDealer(true); 
    hideCard();
    showOptions();
    showGame();
    logs();
}

function logs() {
    console.log("Player:"+getValue(playerHand),"| Dealer:"+getValue(dealerHand));
    console.log("Next card:",deck[0].value);
}

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
    if (i.rank == "A" && i.facedown != true) {
        card.style.border = `4px solid Orange`;
    }
    else {
        card.style.border = `3px solid ${i.color}`;
    }
    card.onclick = function() {
        if (i.rank == "A" && i.value == 11) {
            i.value = 1;
            document.getElementById("A").innerHTML = getValue(playerHand);
        }
        else if (i.rank == "A" && i.value == 1) {
            i.value = 11;
            document.getElementById("A").innerHTML = getValue(playerHand);
        }
    };

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
    logs();
};

// GIVES DEALER NEW CARD FROM DECK
function giveDealer(x) { // if x is true: MAKE ONE CARD FACEDOWN
    dealerHand.push(deck.shift());
    let item = dealerHand[dealerHand.length - 1];
    item.facedown = x;
    item.element = newCard(item);
    document.getElementById("dealerHand").append(item.element);
    document.getElementById("B").innerHTML = getValue(dealerHand);
    logs();
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
    if (getValue(dealerHand) == getValue(playerHand)) {
        tie(); 
    }
    else if (getValue(playerHand) == 21) { win(); }
    else if (getValue(playerHand) > getValue(dealerHand)) { win(); }
    else if (getValue(dealerHand) > 21) { win(); }
    else if (getValue(dealerHand) == 21) { lose(); }
    else { lose(); }
}

function allChips() {
    gainMoney(chips);
    updateChips(-chips);
}

function loseAllChips() {
    let save = 0;
    let lossAmount = chips;
    if (upgrades[0].enabled == true) {
        let percent = 0.1 * upgrades[0].bought;
        save = chips * percent;
        lossAmount -= save;
    }

    say("-" + lossAmount + " chips");
    setTimeout(updateChips(-lossAmount),3000);
}

function win() {
    let bonus = 0;
    let extraChips = 0;
    let reward = chips * 2;
    if (upgrades[1].enabled == true) {
        bonus += 1.5 * upgrades[1].bought;
        extraChips = (reward * bonus) - reward;
        say(`Player wins ${reward}(+${extraChips}) chips`);
        reward = (reward * bonus);
    }
    if (doContinue == true) {
        bonus += 0.25;
        extraChips = (reward * bonus) - reward;
        say(`Player wins ${reward}(+${extraChips}) chips`);
        reward = (reward * bonus);
    }
    else {
        say(`Player wins ${reward} chips`);
    }
    setTimeout(updateChips(reward),3000);
    end();
}

function bust() {
    say("Bust");
    loseAllChips();
    end();
}

function tie() {
    say("Push");
    end();
}

function lose() {
    say("Player Loses");
    loseAllChips();
    end();
}