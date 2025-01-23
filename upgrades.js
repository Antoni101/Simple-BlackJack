
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
      shopScr.style.display = "block";      // Use lowercase "block"
    } else {
      shopScr.style.display = "none";
    }
  }

function upgradesSetup() { // CREATE NEW UPGRADE OBJECT DYNAMICALLY
    upgrades.push(new Upgrade(250, "Lose 10% less Chips."));
    upgrades.push(new Upgrade(750, "Chips won, increased by 1.5x"));

    console.log(upgrades);
    loadUpgrades();
}

function loadUpgrades() { // LOADS THE OBJECTS IN THE SHOP SCREEN ON PAGE LOAD
    shopScr = document.getElementById("shop");
    shopScr.style.display = "none";
    for (let i = 0; i < upgrades.length; i++) {
        let upgrade = document.createElement("button");
        upgrade.classList.add("shopBtns");
        upgrade.append(`$${upgrades[i].price} | ${upgrades[i].desc}`);
        upgrade.onclick = function() {
            if (money >= upgrades[i].price) {
                updateMoney(-upgrades[i].price);
                upgrades[i].enabled = true;
                upgrades[i].bought ++;
                upgrades[i].price *= 1.5;
                upgrade.innerHTML = `$${upgrades[i].price} | ${upgrades[i].desc}`;
            }
            else {
                elementAlert(document.getElementById("money"));
            }
        }
        //upgrades[i].element = upgrade;
        shopScr.append(upgrade);
    }
}
