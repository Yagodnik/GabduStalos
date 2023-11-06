function increase(element_id, id, step) {
    if (shop.itemInCartById(id).amount === 1 && step < 0) {
        return;
    }

    const element = document.getElementById(element_id);
    shop.addToCart(id, step);

    element.innerHTML = shop.itemInCartById(id).amount;

    const fullPrice = document.getElementById("fullPrice");
    fullPrice.innerHTML = shop.fullPrice() + "p";
}

function createComponent(name, id) {
    return `
        <h4>${name}</h4>

        <div class="btn-group" role="group">
            <button type="button" class="btn btn-dark btn-sm" onclick="increase('item${id}', ${id}, -1);">-</button>
            <button id="item${id}" type="button" class="btn btn-dark btn-sm count" disabled>${shop.itemInCartById(id).amount}</button>
            <button type="button" class="btn btn-dark btn-sm" onclick="increase('item${id}', ${id}, 1);">+</button>
        </div>

        <button type="button" class="btn btn-dark btn-sm" onclick="shop.removeFromCart(${id}); checkInput();"><i class="bi bi-x"></i></button>
    `.trim();
}

shop.readyHandler = function() {
    const orderList = document.getElementById("orderList");
    const fullPrice = document.getElementById("fullPrice");

    orderList.innerHTML = "";

    for (var i = 0;i < shop.cart.length;i++) {
        const item = shop.cart[i];
        var element = document.createElement("li");
        element.className = "list-group-item";
        
        if (item.id === "")
            continue;

        element.innerHTML = createComponent(shop.itemById(item.id).name, item.id)

        orderList.appendChild(element)
    }

    fullPrice.innerHTML = shop.fullPrice() + "p";
}