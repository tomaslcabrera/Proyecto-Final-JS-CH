let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");


let carrito = JSON.parse(localStorage.getItem("data")) || [];

/**
 Calcula el total de productos seleccionados
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

/*
Genera el stock
*/

let generateCartItems = () => {
  if (carrito.length !== 0) {
    return (ShoppingCart.innerHTML = carrito
      .map((x) => {
        let { id, item } = x;
        let search = stockTienda.find((x) => x.id === id) || [];
        let { img, precio, nombre } = search;
        return `
      <div class="cart-item">
        <img width="100" height="80" src=${img} alt="" />
        <div class="details">
        
          <div class="title-precio-x">
            <h4 class="title-precio">
              <p>${nombre}</p>
              <p class="cart-item-price">$ ${precio}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>
          <div class="cart-buttons">
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-bag-dash"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-bag-plus"></i>
            </div>
          </div>
          <h3>$ ${item * precio}</h3>
        
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = "";
    label.innerHTML = `
    <h2>El Carrito esta vacio</h2>
    <a href="index.html">
      <button class="HomeBtn">Volver Inicio</button>
    </a>
    `;
  }
};

generateCartItems();

/*
Usado para aumentar el valor del producto seleccionado
 */

let increment = (id) => {
  let selectedItem = id;
  let search = carrito.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    carrito.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  actualizar(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(carrito));
};

/*
Usado para disminuir el valor del producto seleccionado
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = carrito.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  actualizar(selectedItem.id);
  carrito = carrito.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(carrito));
};



let actualizar = (id) => {
  let search = carrito.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

/*
 Sirve para remover un producto en especifico
 */

let removeItem = (id) => {
  let selectedItem = id;
  carrito = carrito.filter((x) => x.id !== selectedItem.id);
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(carrito));
};

/*
 Calcula el total de los productos seleccionados
 */

let TotalAmount = () => {
  if (carrito.length !== 0) {
    let amount = carrito
      .map((x) => {
        let { id, item } = x;
        let filterData = stockTienda.find((x) => x.id === id);
        return filterData.precio * item;
      })
      .reduce((x, y) => x + y, 0);

    return (label.innerHTML = `
    <h2>Precio Total : $ ${amount}</h2>
    <button class="checkout">Comprar</button>
    <button onclick="clearCart()" class="removeAll">Vaciar Carrito</button>
    <br>
    <br>
    <a class="contCompr" href="index.html">Continuar Comprando</a>
    `);
  } else return;
};

TotalAmount();

/*
 Vacia el Carrito
 */

let clearCart = () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Estas Seguro?',
    text: "No será posible revertir esto",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, vaciar el carrito',
    cancelButtonText: 'Mantener productos',
    reverseButtons: false
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire({
        title: 'Carrito Vacio',
        icon: 'success',
      })
      carrito = [];
      generateCartItems();
      calculation();
      localStorage.setItem("data", JSON.stringify(carrito));
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      
    }
  })
  localStorage.setItem("data", JSON.stringify(carrito));
};
