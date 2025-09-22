const carticon = document.querySelector('#cart-icon'); //store cart icon in a variable
const cart = document.querySelector('.cart');//store cart in a variable
const cartClose = document.querySelector('#cart-close'); //store cart close button in a variable

carticon.addEventListener('click', () => {
    cart.classList.add('active'); //when cart icon is clicked, add active class to cart
});

cartClose.addEventListener('click', () => {
    cart.classList.remove('active'); //when cart close button is clicked, remove active class from cart
});

// this is used to update the cart total and item count
const addCartButtons = document.querySelectorAll('.add-cart'); //store all add to cart buttons in a variable()

addCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productBox = event.target.closest('.product-box'); //find the closest product box to the clicked button
        addToCart(productBox); //call addToCart function with the product box as argument
    }); //add event listener to each button
});
// function to add item to cart
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector('img').src; //get the image source of the product
    const productTitle = productBox.querySelector('.product-title').textContent; //get the title of the product
    const productPrice = productBox.querySelector('.price').textContent; //get the price of the product

    //preventing duplicate items in the cart
    const cartItems = document.querySelectorAll('.cart-product-title'); //store all cart product titles in a variable
    for (let item of cartItems) {//loop to compare the product title with the cart product titles
        if (item.textContent === productTitle) {
            alert('This item is already added to the cart'); //alert if item is already in the cart
            return; //exit the function
        }
    }

    // variable name cart box
    const cartContent = document.querySelector('.cart-content'); //store cart content in a variable
    const cartBox = document.createElement('div');
    cartBox.classList.add('cart-box'); //add cart-box class to the div
    cartBox.innerHTML = `
    <img src="${productImgSrc}" class="cart-img">
                    <div class="cart-detail">
                        <h2 class="cart-product-title">${productTitle}</h2>
                        <span class="cart-price">${productPrice}</span>
                        <div class="cart-quantity">
                            <button id="decreament">-</button>
                            <span class="number">1</span>
                            <button id="increament">+</button>
                        </div>
                    </div>
                    <i class="ri-delete-bin-line cart-remove"></i>
    `;

cartContent.appendChild(cartBox); //add the cart box to the cart content

cartBox.querySelector('.cart-remove').addEventListener('click', () => {
    cartBox.remove(); //remove the cart box when the remove button is clicked
updateCartCount(-1); //call updateCartCount function to update the cart item count when an item is removed the badge decreases by 1


    updateTotalPrice(); //call updateTotalPrice function to update the total price
}); //add event listener to the remove button

// update cart total and item count
cartBox.querySelector('.cart-quantity').addEventListener('click', event => {
    const numberElement = cartBox.querySelector('.number'); //store the number element in a variable
    const decreamentButton = cartBox.querySelector('#decreament'); //store the decreament button in a variable
    let quantity = numberElement.textContent; // get the quantity from the number element
    if (event.target.id === "decreament" && quantity > 1) 
        quantity--;
    if (quantity === 1) {
        decreamentButton.style.color = "#999"; //disable the decreament button if quantity is 1
    } else if (event.target.id === "increament") {
        quantity++;
        decreamentButton.style.color = "#333"; //enable the decreament button if quantity is greater than 1
    }
    numberElement.textContent = quantity; //update the quantity in the number element
    updateTotalPrice(); //call updateTotalPrice function to update the total price
});
updateCartCount(1); //call updateCartCount function to update the cart item count

updateTotalPrice(); //call updateTotalPrice function to update the total price
};


const updateTotalPrice = () => {
    const cartContent = document.querySelector('.cart-content'); 
    const totalPriceElement = document.querySelector('.total-price');
    const cartBoxes = cartContent.querySelectorAll('.cart-box');
    let total = 0;

    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector('.cart-price');
        const quantityElement = cartBox.querySelector('.number');
        const price = parseFloat(priceElement.textContent.replace('$', '')); // convert to number
        const quantity = parseInt(quantityElement.textContent); // convert to number
        total += price * quantity;
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`; // format to 2 decimals
};

// cart item count badge

let cartItemCount = 0; //initialize cart item count to 0
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector('.cart-item-count'); //store cart item count badge in a variable
    cartItemCount += change; //update cart item count
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = 'visible'; //show cart item count badge if count is greater than 0
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = 'hidden'; //hide cart item count badge if count is 0 or less
        cartItemCountBadge.textContent = '';

    }
};

const buyNowButton = document.querySelector('.btn-buy'); //store buy now button in a variable
buyNowButton.addEventListener('click', () => {
    const cartContent = document.querySelector('.cart-content');
    const cartBoxes = cartContent.querySelectorAll('.cart-box'); //store all cart boxes in a variable retrieve cart boxes
    if (cartBoxes.length === 0) {
        alert('Your cart is empty. Please add items to your Cart before Buying.'); //alert if cart is empty
        return; //exit the function
    }

    cartBoxes.forEach(cartBox => cartBox.remove()); //remove all cart boxes from the cart content

    cartItemCount = 0; //reset cart item count to 0
    updateCartCount(0); //update cart item count badge
    updateTotalPrice(); //update total price
    alert('Thank you for your purchase!'); //alert thank you message

});

// FILTER CATEGORY VIEW
const filterButtons = document.querySelectorAll('.filter-btn');
const productBoxes = document.querySelectorAll('.shop-2 .product-box');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        productBoxes.forEach(box => {
            if (category === 'all' || box.getAttribute('data-category') === category) {
                box.style.display = 'flex';
            } else {
                box.style.display = 'none';
            }
        });
    });
});

