const productlist = document.querySelector('#product-list');
const apiKey = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODU5Yjg1MjRlZjFiYzAwMTVkZjVhZDIiLCJpYXQiOjE3NTA3MTAzNTUsImV4cCI6MTc1MTkxOTk1NX0._MYUSgBuaN93vfb-R8oodPAi6XG3chYGaSMBgugZlPY";

const searchInput = document.querySelector('#search');    
const dati = [];
    async function fetchProduct() {
  try {
    const result = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const data = await result.json();
    console.log(data);
    dati.push(...data);
    renderProducts(data,productlist);
  } catch (e) {
    console.log("errore nella fetch ", e);
  }
}

 function renderProducts(products , productlist) {
    productlist.innerHTML = ''; 
    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-md-3', 'mb-4');
        productlist.appendChild(productCard);
       // const randomColor = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
       productCard.innerHTML = `
  <div class="card h-100">
    <div class="img-container d-flex justify-content-center align-items-center" style="height: 200px; overflow: hidden; background-color:white;">
      <img src="${product.imageUrl}" class="img-fluid" alt="${product.name}" style="max-height: 100%; max-width: 100%; object-fit: contain;" />
    </div>
    <div class="card-body d-flex flex-column justify-content-between" style="background-color: #3498f6;">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">Brand: ${product.brand}</p>
      <p class="card-text">Price: €${product.price}</p>
      <a href="dettaglio.html?id=${product._id}" class="btn btn-primary mt-auto">Vedi dettagli</a>
    </div>
  </div>
`;
    });
    }

fetchProduct();

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = dati.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  renderProducts(filtered, productlist);
 } );
