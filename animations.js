function say(text) {
    let txt = document.getElementById("txt");
    txt.innerHTML = text;

    txt.style.display = "Block";

    setTimeout(function() {
        txt.style.opacity = "1.0";
        txt.style.transform = "Scale(1.0)";

        setTimeout(function() {
            txt.style.opacity = "0.0";
            txt.style.transform = "Scale(0.0)";
        }, 2500);
    }, 500);
}

function updateMoney(amount) {
    if (amount > 0) {
        let gain = setInterval(function() {
            if (amount > 0) {
                money ++;
                amount --;
            }
            else {
                clearInterval(gain);
            }
            document.getElementById("money").innerHTML = "$" + money;
        }, 5);
    }
    else {
        let gain = setInterval(function() {
            if (amount < 0 && money > 0) {
                money --;
                amount ++;
            }
            else clearInterval(gain);
            document.getElementById("money").innerHTML = "$" + money;
        }, 5);
    }
}

function updateChips(amount) {
    if (amount > 0) {
        let gain = setInterval(function() {
            if (amount > 0) {
                chips ++;
                amount --;
            }
            else {
                clearInterval(gain);
            }
            document.getElementById("chips").innerHTML = "❂" + chips;
        }, 5);
    }
    else {
        let gain = setInterval(function() {
            if (amount < 0 && chips > 0) {
                chips --;
                amount ++;
            }
            else clearInterval(gain);
            document.getElementById("chips").innerHTML = "❂" + chips;
        }, 5);
    }
}

function hideOptions() {
    let options =  document.getElementById("options");

    options.style.opacity = "0.0";
    options.style.transform = "Scale(0.5)";
    setTimeout(function() {
        options.style.display = "None";
    }, 300);
    
}

function showOptions() {
    let options =  document.getElementById("options");

    options.style.display = "Block";

    setTimeout(function() {
        options.style.opacity = "1.0";
        options.style.transform = "Scale(1.0)";
    }, 300);
}

function hideMenu() {
    let menu =  document.getElementById("menu");
    menu.style.transition = "0.3s";
    menu.style.opacity = "0.0";

    menu.style.display = "Block";

    setTimeout(function() {
        menu.style.display = "None";
    }, 300);
}

function showMenu() {
    let menu =  document.getElementById("menu");

    menu.style.display = "Block";
    setTimeout(function() {
        menu.style.transition = "0.3s";
        menu.style.opacity = "1.0";
    }, 1000);
}

function showGame() {
    let game =  document.getElementById("game");

    game.style.display = "Flex";
    setTimeout(function() {
        game.style.transition = "0.5s";
        game.style.opacity = "1.0";
    }, 500);
}

function hideGame() {
    let game =  document.getElementById("game");
    game.style.transition = "0.3s";
    game.style.opacity = "0.0";

    setTimeout(function() {
        game.style.display = "None";
    }, 300);
}

function hideCard() { // HIDES FACEDOWN CARD FROM PLAYER
    document.getElementById("B").style.display = "None";

    let backColor = "White";
    for (let i = 0; i < dealerHand.length; i++) {
        if (dealerHand[i].facedown == true) {
            //dealerHand[i].element.style.border = "None";
            dealerHand[i].element.style.color = backColor;
            dealerHand[i].element.style.backgroundColor = backColor;
        }
    }
}

function showCard() { // REVEALS FACEDOWN CARD FOR PLAYER
    document.getElementById("B").style.display = "Block";
    for (let i = 0; i < dealerHand.length; i++) {
        if (dealerHand[i].facedown == true) {
            dealerHand[i].element.style.transition = "1s";
            dealerHand[i].element.style.color = dealerHand[i].color;
            dealerHand[i].element.style.backgroundColor = "White";
            dealerHand[i].facedown == false;
        }
    }
}

function elementAlert(element) {
    let originalColor = element.style.color;
    element.style.color = "Red";
    element.style.transform = "Scale(1.1)";
    setTimeout(function() {
        element.style.color = originalColor;
        element.style.transform = "Scale(1.0)";
    },1000);
}