const productCatalog = new Map();
productCatalog.set(101, { name: "Laptop", price: 1200 });
productCatalog.set(102, { name: "Mouse", price: 25 });
productCatalog.set(103, { name: "Keyboard", price: 45 });
productCatalog.set(104, { name: "Monitor", price: 300 });
productCatalog.set(105, { name: "Headset", price: 80 });

const searchId = 103;
const searchedProduct = productCatalog.get(searchId);

productCatalog.delete(102); 

let catalogHtml = `<div class="container"><h3>Product Catalog</h3>`;
catalogHtml += `<p><strong>Total Products:</strong> ${productCatalog.size}</p>`;
catalogHtml += `<p><strong>Searched Product (ID ${searchId}):</strong> ${searchedProduct ? searchedProduct.name : "Not Found"}</p>`;
catalogHtml += `<p><strong>Remaining Products:</strong></p><ul>`;

productCatalog.forEach((product, id) => {
    catalogHtml += `<li>ID: ${id} - ${product.name} ($${product.price})</li>`;
});

catalogHtml += `</ul></div>`;
document.getElementById("task5").innerHTML = catalogHtml;