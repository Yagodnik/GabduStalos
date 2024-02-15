class Item {
    constructor(id, amount, name="", price=0) {
        this.id = id;
        this.amount = amount;
        this.name = name;
        this.price = price;
    }
}

class Shop {
    constructor() {
        this.items = [
            new Item(1, 0, "Футболка GABDUSTALOS", 998),
            new Item(2, 0, "Футболка с логотипом GABDUSTALOS", 998),
            new Item(3, 0, 'Вода "The Puriest"', 180)
        ];
        this.cart = [];
        this.readyHandler = function() {};
    }
    
    updateUI() {
        this.itemCountTag.innerHTML = this.itemsInCartCount();
    }

    onLoad() {
        this.itemCountTag = document.getElementById("itemsCount");

        if (localStorage.getItem("cart") != "") { 
            this.cart = JSON.parse(localStorage.getItem("cart"));
            if (this.cart === null)
                this.cart = [];
        } else {
            this.cart = [];
        }

        this.readyHandler();
        this.updateUI();
    }

    itemById(id) {
        for (var i = 0;i < this.items.length;i++) {
            if (id === this.items[i].id)
                return this.items[i];
        }

        return null;
    }

    itemInCartById(id) {
        for (var i = 0;i < this.items.length;i++) {
            if (id === this.cart[i].id)
                return this.cart[i];
        }

        return null;
    }

    addToCart(id, step=1) {
        for (var i = 0;i < this.cart.length;i++) {
            const element = this.cart[i];

            if (element.id === id) {
                this.cart[i].amount += step;
                localStorage.setItem("cart", JSON.stringify(this.cart));
                this.updateUI();
                return;
            }
        }

        this.cart.push(new Item(id, 1));

        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.updateUI();
    }

    removeFromCart(id) {
        for (var i = 0;i < this.cart.length;i++) {
            const element = this.cart[i];

            if (element.id === id) {
                this.cart.splice(i, 1);
                localStorage.setItem("cart", JSON.stringify(this.cart));
                this.readyHandler();
                return;
            }
        }
    }

    fullPrice() {
        var price = 0;

        for (var i = 0;i < this.cart.length;i++) {
            const item = this.itemById(this.cart[i].id);
            if (item === null)
                continue;

            price += item.price * this.cart[i].amount;
        }

        return price;
    }

    reset() {
        localStorage.setItem("cart", "");
        this.cart = [];
        this.readyHandler();
    }

    itemsInCartCount() {
        if (this.cart === null)
            return 0;

        var count = 0;
        for (var i = 0;i < this.cart.length;i++) {
            count += this.cart[i].amount;
        }

        return count;
    }
}

const shop = new Shop();

window.onload = function(e) {
    shop.onLoad();
}

function buyStuff() {
    const phoneNumber = document.getElementById("phone-number");
    const cardNumber = document.getElementById("card-number");
    const dateInput = document.getElementById("date-input");
    const csvNumber = document.getElementById("csv-number");

    if (shop.fullPrice() <= 0 && 
        phoneNumber.value  === "" &&
        cardNumber.value  === "" &&
        dateInput.value  === "" &&
        csvNumber.value  === ""
    )
        return;

    shop.reset();

    const bsOffcanvas = new bootstrap.Offcanvas('#offcanvasTop')

    bsOffcanvas.show();
}

function checkInput() {
    const phoneNumber = document.getElementById("phone-number");
    const cardNumber = document.getElementById("card-number");
    const dateInput = document.getElementById("date-input");
    const csvNumber = document.getElementById("csv-number");
    const buyButton = document.getElementById("buy-button");

    if (shop.fullPrice() > 0 && 
        phoneNumber.value  != "" &&
        cardNumber.value  != "" &&
        dateInput.value  != "" &&
        csvNumber.value  != ""
    ) {
        console.log(1);
        buyButton.classList.remove("disabled");
    }
}
