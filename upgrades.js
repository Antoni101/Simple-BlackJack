
let shopVisible = false;
let shopScr;

const upgrades = [
    {price: 250, desc:"Lose 10% less Chips.", enabled: false, mult: 3, bought: 0},
    {price: 750, desc:"Chips won, increased by 1.5x,", enabled: false, mult: 15, bought: 0}
]

function shop() {
    if (shopVisible == false) {
        shopScr.style.display = "Block";
        shopVisible = true;
    }
    else {
        shopScr.style.display = "None";
        shopVisible = false;
    }
}

function loadUpgrades() {
    shopScr = document.getElementById("shop");
    shopScr.innerHTML = "";
    for (let i = 0; i < upgrades.length; i++) {
        let upgrade = document.createElement("button");
        upgrade.classList.add("shopBtns");
        upgrade.append(`$${upgrades[i].price} | ${upgrades[i].desc}`);
        upgrade.onclick = function(){ 
            if (money >= upgrades[i].price) {
                updateMoney(-upgrades[i].price);
                upgrades[i].bought ++;
                upgrades[i].enabled = true;
                upgrades[i].price = upgrades[i].price * upgrades[i].mult
                loadUpgrades();
                checkUpgrades();
            }
        };
        shopScr.append(upgrade);
    }
}

