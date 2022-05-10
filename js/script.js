const productUI = document.querySelector(".products");
const tempTotalNum = document.querySelectorAll(".tempTotal");
const totalPrice = document.querySelector(".final-prices");
const clearAll = document.querySelector(".clearAll");

let cart = [];

class Products {
    async getProduct(){
        try {
            const response = await fetch("https://drone-2022.herokuapp.com/products")
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.log(error)
        }
    }
}
class UI {
    displayProducts(products){
        let productMap = products.map((product) => {
            const { img_url, title, price, id } = product;
            return `
            <div class="singleProduct">
            <div class="product-img">
                <img
                src=${!undefined && img_url} alt="bag">
            </div>
            <p class="title">${!undefined && title}</p>
            <p class="product-price">${!undefined &&price}</p>
            <div class="btn">
                <button 
                data-id=${id}
                class="bag-btn">Add to Cart</button>
            </div>
            </div>
            `
        });
        productUI.innerHTML = (productMap).join(" ");
    }
    getBtns(){
        const btns = [...document.querySelectorAll(".bag-btn")]
        btns.forEach((btn) => {
            let id = Number(btn.dataset.id);
            let isProductInCart = cart.find((item) => item.id === id);
            if(isProductInCart){
                btn.innerText = "Item added";
                btn.disabled = true;
            }
            btn.addEventListener("click", ({target}) => {
                target.innerText = "Item added";
                target.disabled = true;
                let displayProduct = {...Storage.getProducts(id), amount : 1};
                cart = [...cart, displayProduct];
                window.scroll(0,2000)
                Storage.saveCart(cart);
                this.getValue(cart);
                this.addItem(displayProduct);
            });
        });
    }
    setAppCart(){
        cart = Storage.getCart();
        this.getValue(cart);
        this.populateCart(cart);
    }
    populateCart(cart){
        cart.forEach((item)=> this.addItem(item));
    }
    addItem(items){
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
        <div class="img">
        <img src=${items.img_url} alt="drone">
        <p class="title">${items.title}</p>
        </div>
        <p class="price">$${items.price}</p>
        <div class="arrows">
            <span data-id = ${items.id}><i class="fa-solid fa-angle-left"></i></span>
            <span class="tempTotal">${items.amount}</span>
            <span data-id = ${items.id}><i class="fa-solid fa-angle-right"></i></span>
        </div>
        <p class="total-price">$${items.price * items.amount}</p>
        <span><i class="fa-solid fa-trash"></i></span>
        ` 
       let singleItem = document.querySelector(".productUI");
       singleItem.appendChild(div);
       console.log(singleItem)
    }
    getValue(cart){
        let itemTotal = 0;
        let totalPrices = 0;
        cart.map((item) => {
            itemTotal += item.amount
        });
        totalPrices = cart.reduce((acc, item) => acc + item.price,0).toFixed(2);
        totalPrice.innerText = totalPrices;
        tempTotalNum.forEach((item) => {
            return item.innerText = itemTotal;
        });
    }
    cartLogic(){
        clearAll.addEventListener("click", this.clearCart);
    }
    clearCart(){
    }
}
class Storage {
    static storeProduct(product){
        localStorage.setItem("product", JSON.stringify(product))
    }
    static getProducts(id){
        let products = JSON.parse(localStorage.getItem("product"));
        return products.find((product) => product.id === id);
    }
    static saveCart(cart){
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart(){
        return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let product = new Products();
    let ui = new UI();
    ui.setAppCart();
    product.getProduct().then((product) => {
        ui.displayProducts(product);
        Storage.storeProduct(product);
    }).then(() => {
        ui.getBtns();
        ui.cartLogic();
    })
})