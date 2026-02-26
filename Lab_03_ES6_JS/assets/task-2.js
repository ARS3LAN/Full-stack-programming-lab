const existingProducts = ["Laptop", "Wireless Mouse"];

function addToCart(...newItems) {
    const updatedCart = [...existingProducts, ...newItems];
    const [firstProduct, ...remainingProducts] = updatedCart;

    document.getElementById("task2").innerHTML = `
        <div class="cart-container">
            <h3>Online Shopping Cart</h3>
            <p><strong>Total Items:</strong> ${updatedCart.length}</p>
            <p><strong>First Item Extract:</strong> ${firstProduct}</p>
            <p><strong>Updated Cart:</strong> ${updatedCart.join(", ")}</p>
        </div>
    `;
}

addToCart("Mechanical Keyboard", "Monitor");