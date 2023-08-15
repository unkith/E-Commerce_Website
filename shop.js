// To open and close modal 
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
  displayCart();
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

loadItems();

// Stores all the items in the cart
let cart = [];

// Stores all the items in the catalogue
let items = []

function loadItems(){
  fetch('catalogue.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    items = data.map(item => {
      return {
      name : item.name,
      id : item.id,
      category : item.category,
      price : item.price,
      quantity : item.quantity,
      description : item.description}
    });
    console.log(items);
    displayItems(items);
  });
}

let itemsContainer = document.querySelector('#itemContainer');

// display all the items when the page loads
displayItems(items);

function displayItems(allItems) {
  itemsContainer.innerHTML = '';
  allItems.forEach(item => {
    // show the items in html 
    let itemDiv = document.createElement('div');
    itemDiv.className = 'item my-4 ms-3';
    itemDiv.innerHTML = `
      <h4>${item.name}</h4>
      <h5 style="color:red">---> ${item.category}</h5>
      <h6> ${item.description}</h6>
      <p>Price: $${item.price}</p>
      <label>Quantity:</label>
      <input type="number" id="quantity-${item.id}" value="1" min="1">
      <button class="add-to-cart btn btn-primary" id="button-${item.id}" style="background-color: #00ABE4;">Add to Cart</button>
      <hr>
    `;

    // the cart button for each div, will add that item to the cart
    let addToCartButton = itemDiv.querySelector(`#button-${item.id}`);
    let quantityInp = itemDiv.querySelector(`#quantity-${item.id}`);
    addToCartButton.onclick = function () {
      if (quantityInp.value < 1) {
        alert('Quantity cannot be less than 1');
      }
      else {
        let itemDuplicate = {
          name: item.name,
          price: item.price,
          quantity: parseInt(quantityInp.value)
        };
        //add to cart
        cart.push(itemDuplicate);
        // show that item is added to cart
        showPopup(addToCartButton);
      }
    }

    itemsContainer.appendChild(itemDiv);
  });
}


// reset search field
function reset() {
  let search = document.querySelector('#searchBox');
  search.value = '';
  itemsContainer.innerHTML = '';
  displayItems(items);
}

// filter results based on search
function search() {
  let search = document.querySelector('#searchBox');
  let filter = items.filter(item => item.name.toLowerCase().includes(search.value.toLowerCase()));
  displayItems(filter);
}

//clear cart
function clearCart() {
  cart = [];
  console.log(cart);
  displayCart();
}

//display cart
function displayCart() {

  console.log(cart);
  var table = document.getElementById("table");

  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  let total = 0;

  for (var i = 0; i < cart.length; i++) {
    var cartItem = cart[i];
    var row = table.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    cell1.textContent = cartItem.name;
    cell2.textContent = cartItem.quantity;
    cell3.textContent = `$` + cartItem.quantity * cartItem.price;
    total += (cartItem.quantity * cartItem.price);
  }

  let displayTotal = document.querySelector('#totalPrice');
  displayTotal.innerHTML = `<h3 id="totalPrice">Total: $${total}</h3>`;

}

// show that item is added to cart
function showPopup(button) {
  var popup = document.getElementById("popup");

  popup.style.display = "block";

  setTimeout(function () {
    popup.style.display = "none";
  }, 1000);

  button.addEventListener('click', () => {
    popup.style.display = 'block';
  });
}

// show thank you message after placing order
function thankYou(){
  if(cart.length!=0){
    alert('Order Placed, Thank you!');
  }
  else alert('Cannot place empty order');
}