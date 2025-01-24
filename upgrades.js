
let shopVisible = false;
let shopScr;
let upgrades = [];

class Upgrade { // UPGRADE LAYOUT
    constructor(price, desc) {
        this.price = price;
        this.desc = desc;
        this.enabled = false;
        this.bought = 0;
        this.element = null;
    }
}

function shop() { // OPEN / CLOSE SHOP
    if (shopScr.style.display === "none") { // Use lowercase "none"
      shopScr.style.display = "block"; 
    } else {
      shopScr.style.display = "none";
    }
  }

function upgradesSetup() { // CREATE NEW UPGRADE OBJECT DYNAMICALLY
    upgrades.push(new Upgrade(250, "Lose 10% less Chips."));
    upgrades.push(new Upgrade(750, "Chips won, increased by 1.5x"));
    upgrades.push(new Upgrade(2000, "Gain Interest every round (+10%)"));

    console.log(upgrades);
    loadUpgrades();
}

function loadUpgrades() { // LOADS THE OBJECTS IN THE SHOP SCREEN ON PAGE LOAD
    shopScr = document.getElementById("shop");
    shopScr.style.display = "none";
    for (let i = 0; i < upgrades.length; i++) {
        let upgrade = document.createElement("div");
        let text = document.createElement("p");
        let buy = document.createElement("button");
        upgrade.classList.add("eachUpgrade");
        text.classList.add("shopText");
        buy.classList.add("buyBtns");
        text.append(`${upgrades[i].desc}`);
        buy.append(`$${upgrades[i].price}`)
        buy.onclick = function() {
            if (money >= upgrades[i].price) {
                updateMoney(-upgrades[i].price);
                upgrades[i].enabled = true;
                upgrades[i].bought ++;
                upgrades[i].price *= 2.5;
                buy.innerHTML = `$${upgrades[i].price}`;
            }
            else {
                elementAlert(document.getElementById("money"));
            }
        }
        upgrade.append(text);
        upgrade.append(buy);
        shopScr.append(upgrade);
    }
}
