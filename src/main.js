let shop = document.getElementById("shop");

let carrito = JSON.parse(localStorage.getItem("data")) || [];


/*Anadiendo stock a la pagina*/ 

let generateShop = () => {
    return (shop.innerHTML= stockTienda.map((x)=>{
        let {id,nombre,precio,desc,img,} = x;
        let search = carrito.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${id} class="item" id="card">
                <img class width="221" height="150px" src=${img} alt="Teclado Gamer">
                <div class="details">
                    <h3>${nombre}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${precio}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-bag-dash"></i>
                            <div id=${id} class="quantity">
                            ${search.item === undefined? 0 : search.item}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-bag-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
    
        `
    }).join(""));
};

generateShop();

let increment = (id)=> {
    let selectedItem = id;
    let search = carrito.find((object)=> object.id === selectedItem.id);

    
    if(search === undefined){
        carrito.push({
            id: selectedItem.id,
            item: 1,
        });
    }else{
        search.item += 1;
    }

    
    // console.log(carrito);
    actualizar(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(carrito));
}
let decrement = (id)=>{
    let selectedItem = id;
    let search = carrito.find((object)=> object.id === selectedItem.id);

    if(search === undefined) return;
    if(search.item === 0){return;
    }else{
        search.item -= 1;
    }

    actualizar(selectedItem.id);
    carrito = carrito.filter((x) => x.item !== 0);
    // console.log(carrito);
    
    localStorage.setItem("data",JSON.stringify(carrito));
}
let actualizar = (id)=>{
    let search = carrito.find((x)=> x.id=== id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

let calculation = ()=> {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = carrito.map((x) => x.item).reduce((x,y) => x + y , 0);
}

calculation();
