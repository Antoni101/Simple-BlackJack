
let canSay = true;
let canAlert = true;

function say(text) {
    if (canSay == true) {
        canSay = false;
        let txt = document.getElementById("txt");
        txt.innerHTML = "";
        txt.style.opacity = "1.0";
        let counter = 100;
        txt.style.transform = "Scale(1.0)";
        for (let i = 0; i < text.length; i++) {
            setTimeout(function() {
                txt.innerHTML += text.charAt(i);
            },counter);
            counter += 20;
        }

        setTimeout(function() {

            txt.style.transform = "Scale(0.0)";
            txt.style.opacity = "0.0";
            canSay = true;
        }, 150 * text.length);
    }

}

function updateMoney(amount) {

    if (amount > 0) {
        let moneyChange = setInterval(function() {
            if (amount > 0) {
                money += 1;
                amount -= 1;
            }
            else {
                clearInterval(moneyChange);
            }
            document.getElementById("money").innerHTML = "$" + money;
        }, 1);
    }
    else {
        let moneyChange = setInterval(function() {
            if (amount < 0 && money > 0) {
                money -= 1;
                amount += 1;
            }
            else clearInterval(moneyChange);
            document.getElementById("money").innerHTML = "$" + money;
        }, 1);
    }
}

function updateChips(amount) {
    if (amount > 0) {
        let moneyChange = setInterval(function() {
            if (amount > 0) {
                chips ++;
                amount --;
            }
            else {
                clearInterval(moneyChange);
            }
            document.getElementById("chips").innerHTML = "❂" + chips;
        }, 1);
    }
    else {
        let moneyChange = setInterval(function() {
            if (amount < 0 && chips > 0) {
                chips --;
                amount ++;
            }
            else clearInterval(moneyChange);
            document.getElementById("chips").innerHTML = "❂" + chips;
        }, 1);
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
    if (canAlert == true) {
        canAlert = false;
        let originalColor = element.style.color;
        element.style.color = "Red";
        element.style.transform = "Scale(1.2)";
        setTimeout(function() {
            element.style.color = originalColor;
            element.style.transform = "Scale(1.0)";
            canAlert = true;
        },300);
    }
}