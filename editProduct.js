const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVhY2VjNTk2OGRlNTAwMTU1MmEzYzEiLCJpYXQiOjE3NTA3ODE2MzcsImV4cCI6MTc1MTk5MTIzN30.oq7xnSM3aDeQHx_-hTEtLwzUaRg9DsFLQUXK3aaQtxw";
const productName = document.querySelector("#name");
const productDescription = document.querySelector("#description");
const productBrand = document.querySelector("#brand");
const productImage = document.querySelector("#imageUrl");
const productPrice = document.querySelector("#price");
document.querySelector("#button-save").addEventListener("click", saveProduct);
const successAlert = document.querySelector("#success-alert");
const dangerAlert = document.querySelector("#danger-alert");

const search = window.location.search;
const searchObject = new URLSearchParams(search);
const productId = searchObject.get(`id`);

async function getProduct() {
  try {
    const result = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const data = await result.json();
    productInput(data);
  } catch (e) {
    console.log(e);
  }
}

function productInput(product) {
  productName.value = product.name;
  productDescription.value = product.description;
  productBrand.value = product.brand;
  productImage.value = product.imageUrl;
  productPrice.value = product.price;
}

async function saveProduct(e) {
  e.preventDefault();

  const data = {
    name: productName.value,
    description: productDescription.value,
    brand: productBrand.value,
    imageUrl: productImage.value,
    price: productPrice.value,
  };
  console.log(data);
  try {
    const res = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${productId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status !== 200) {
      dangerAlert.classList.remove("d-none");
      setTimeout(() => {
        dangerAlert.classList.add("d-none");
      }, 3000);
    } else {
      successAlert.classList.remove("d-none");
      setTimeout(() => {
        window.location.href = "backoffice.html";
        successAlert.classList.add("d-none");
      }, 3000);
    }
  } catch (e) {
    dangerAlert.classList.remove("d-none");
    setTimeout(() => {
      dangerAlert.classList.add("d-none");
    }, 3000);
    console.log(e);
  }
}

getProduct();
