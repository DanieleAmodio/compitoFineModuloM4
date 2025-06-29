const productdetail = document.querySelector('#product-detail');
const h3 = document.querySelector('h3');
const apiKey = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODU5Yjg1MjRlZjFiYzAwMTVkZjVhZDIiLCJpYXQiOjE3NTA3MTAzNTUsImV4cCI6MTc1MTkxOTk1NX0._MYUSgBuaN93vfb-R8oodPAi6XG3chYGaSMBgugZlPY";

 const urlParams = new URLSearchParams(window.location.search);
 const productId = urlParams.get('id');
 async function fetchProductDetail() {
  try {
    const result = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const product = await result.json();
    console.log(product);
    renderProductDetail(product, productdetail, h3);
  } catch (e) {
    console.log("Errore nella fetch ", e);
  }
  }   
  
 function renderProductDetail(product, productdetail,h3) {
    productdetail.innerHTML = '';
    h3.textContent = product.name;
    const productconteiner = document.createElement('div');
    productconteiner.classList.add('d-flex','align-items-center', 'mb-4');
    productconteiner.innerHTML = `
      <div class="img-container d-flex justify-content-center align-items-center" style="height: 300px; overflow: hidden; background-color: #f8f9fa;">
        <img src="${product.imageUrl}" class="img-fluid" alt="${product.name}" style="max-height: 100%; max-width: 100%; object-fit: contain;" />
      </div>
      <div class="ms-4">
        <h5>${product.name}</h5>
        <p>${product.brand}</p>
        <p>€${product.price}</p>
        <p>${product.description}</p>
      </div>
    `;
    productdetail.appendChild(productconteiner);
 }

  fetchProductDetail();