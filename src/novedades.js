let carrito = JSON.parse(localStorage.getItem("data")) || [];
const url = 'src/api.json'


let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);
  };
  
calculation();


const novCards = document.querySelector('#novCards')

fetch(url)
    .then( (res) => res.json())
    .then( (data) => {

        data.forEach((item) => {
            const div = document.createElement('div')
            div.innerHTML = `
            <div class="card mb-4 text-center">
            <img height="300em" src="${item.img}" class="card-img-top" alt="${item.alt}">
            <div class="card-body">
              <h4 class="card-title">${item.title}</h4>
              <p class="card-text">${item.desc}</p>
              <a href="${item.url}" class="btn btn-primary">Ir a Noticia</a>
            </div>
          </div>
            `
   
            novCards.append(div)
        })
    })
