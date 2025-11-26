
// PLUS / MINUS

document.addEventListener("click", function (e) { // listens for every click on entire page
  if (e.target.classList.contains("qty-plus") ||  // the function checks what was clicked
      e.target.classList.contains("qty-minus")) {

    const item = e.target.closest(".cart-item1"); //Finds the whole item box (panda/red panda/etc.) around the button.
    const span = item.querySelector(".qty1"); //  //Inside that item, get the LEFT displayed number (the one between + and −).
    const input = item.querySelector(".item-quantity"); //Grabs the right-side dropdown/input where quantity is stored. 

    let value = Number(input.value); //Convert the right-side quantity value (string) → number. 

    if (e.target.classList.contains("qty-plus")) value++; //plus one
    if (e.target.classList.contains("qty-minus")) value--; //minus one

    if (value < 0) value = 0; //this prevents negative values

    input.value = value; //updates the right value
    span.textContent = value; //updates the left value

    updateSubtotal(); //recalculates the full cart
  }
});

// SYNC DROPDOWN TO LEFT COUNTER

document.querySelectorAll(".item-quantity").forEach(select => { // for each function finds every right-side quantity dropdown/input on the page.
  select.addEventListener("change", function () { // When the user manually changes a number in the dropdown/input (NOT the +/− button), run this code.
    const item = select.closest(".cart-item1"); //Finds the full item container that this dropdown belongs to.
    const span = item.querySelector(".qty1"); // inside that cart item, find the LEFT number between the + and − buttons.

    span.textContent = select.value;   // LEFT number updates
    updateSubtotal(); //recalculates
  });
});


// SAVE ITEMS FOR CHECKOUT

function saveItemsToLocalStorage() {                    // Start: function that saves all cart items before going to checkout
  const items = [];                                     // Create an empty array — we'll store each product here

  document.querySelectorAll(".cart-item1").forEach(item => {   // Loop through EVERY product box in the cart
    const name = item.querySelector(".item-description").textContent.trim();  // Get the product name (e.g., "Panda"), trim removes extra spaces

    const price = Number(item.querySelector(".item-price").textContent.replace("$", "")); // Get the price, remove the "$", convert it from string → number

    const qty = Number(item.querySelector(".item-quantity").value); // Get the selected quantity from the RIGHT input box (string → number)

    if (qty > 0) {                                        // Only save items that have quantity greater than zero
      items.push({ name, price, quantity: qty });         // Add a JS object to the array, e.g. { name: "Panda", price: 16.99, quantity: 2 }
    }
  });

  console.log("Saving to localStorage:", items);          // Debug: print the items to console so we can check what will be saved

  localStorage.setItem("cartItems", JSON.stringify(items));// Convert the array → JSON string and save it under the key "cartItems"

  window.location.href = "checkout1.html";                // Redirect user to the checkout page AFTER saving the cart
}



// SUMMARY UPDATE

function updateSubtotal() { //Starts the function that updates subtotal and item count.
  const itemCount = document.getElementById("itemCount1"); //Gets the places where numbers will be displayed: item count and total price
  const subtotal = document.getElementById("subtotalAmount");

  //  If we are on checkout Page → STOP HERE If these elements DON'T exist, it means we’re on the checkout page. - not sure if this is what breaks my code
  // if (!itemCount || !subtotal) return;

  let total = 0;
  let count = 0;

  document.querySelectorAll(".cart-item1").forEach(item => { //loops through every product
    const price = Number(item.querySelector(".item-price").textContent.replace("$", "")); //Gets the price of that product.
    const qty = Number(item.querySelector(".item-quantity").value); //Gets the quantity the user selected.
    total += price * qty;
    count += qty; //Add to the subtotal and total item count.
  });

  itemCount.textContent = `${count} items`; //updates the text
  subtotal.textContent = `$${total.toFixed(2)}`; //updates the subtotal prices and formats it to  2 decimal places.
}


// LOAD CART PAGE

document.addEventListener("DOMContentLoaded", function () {
  updateSubtotal(); //immediately calculate subtotal.
});
