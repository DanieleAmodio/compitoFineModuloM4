const tableBody = document.querySelector("#table-body");
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODU5Yjg1MjRlZjFiYzAwMTVkZjVhZDIiLCJpYXQiOjE3NTA3MTAzNTUsImV4cCI6MTc1MTkxOTk1NX0._MYUSgBuaN93vfb-R8oodPAi6XG3chYGaSMBgugZlPY";
const productName = document.querySelector("#name");
const productDescription = document.querySelector("#description");
const productBrand = document.querySelector("#brand");
const productImage = document.querySelector("#imageUrl");
const productPrice = document.querySelector("#price");
document.querySelector("#button-save").addEventListener("click", saveProduct);
const successAlert = document.querySelector("#success-alert");
const dangerAlert = document.querySelector("#danger-alert");


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
    inputArray(data);
  } catch (e) {
    console.log("Errore durante il salvataggio", e);
  }
}

//funzione che dati input prende e cicla mappando l'array
function inputArray(products) {
  tableBody.innerHTML = "";
  const productTr = products.map((product) => createTableRow(product));
  console.log(productTr);
  tableBody.append(...productTr);
  //tableBody.append(productTr[0], productTr[1]);
}

function createTableRow(product) {
  const tr = document.createElement("tr");
  const tdName = document.createElement("td");
  tdName.innerText = product.name;

  const tdBrand = document.createElement("td");
  tdBrand.innerText = product.brand;

  const tdImage = document.createElement("td");
  tdImage.innerText = product.imageUrl;

  const tdPrice = document.createElement("td");
  tdPrice.innerText = product.price;

  // Colonna: Actions
const actionsTd = document.createElement('td');

// Bottone Edit
const editBtn = document.createElement('a');
editBtn.classList.add('btn', 'btn-sm', 'btn-outline-primary', 'me-2');
editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>';
editBtn.title = 'Modifica';
editBtn.href = `editProduct.html?id=${product._id}`;



// Bottone Delete
const deleteBtn = document.createElement('button');
deleteBtn.classList.add('btn', 'btn-sm', 'btn-outline-danger');
deleteBtn.innerHTML = '<i class="bi bi-trash-fill"></i>';
deleteBtn.title = 'Elimina';
const modalEl = document.getElementById('confirmDeleteModal');
const modal = new bootstrap.Modal(modalEl);
let currentRowToDelete = null;
let currentProductId = null;
deleteBtn.addEventListener("click", () => {
  currentRowToDelete = deleteBtn.closest("tr");
  currentProductId = product._id;
  const productNameSpan= document.querySelector("#productNameToDelete");
  productNameSpan.textContent = product.name;
  modal.show();
});
document.querySelector("#confirmDeleteBtn").addEventListener("click", async() => {
  if (currentProductId) {
   await deleteProduct(currentProductId);
    modal.hide();
  }
    
});
document.querySelector("#annulla").addEventListener("click", () => {
  modal.hide();
});
document.querySelector("#chiudi").addEventListener("click", () => {
  modal.hide();
});

console.log(editBtn, deleteBtn);

actionsTd.appendChild(editBtn);
actionsTd.appendChild(deleteBtn);



 /*const tdEdit = document.createElement("td");
  const Edit = document.createElement(`<ion-icon name="pencil-outline"></ion-icon>`);
  tdEdit.appendChild(Edit);
  const tdDelete = document.createElement("td");
  const Delete = document.createElement(`<ion-icon name="trash-outline"></ion-icon>`);
  tdDelete.appendChild(Delete);*/


  tr.append(tdName, tdBrand, tdImage, tdPrice,  actionsTd); 
  return tr;
}
function productInput(product) {
  productName.value = product.name;
  productDescription.value = product.description;
  productBrand.value = product.brand;
  productImage.value = product.imageUrl;
  productPrice.value = product.price;
  input.value = product._id;
}

async function deleteProduct(productId) {
  try {
    await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    fetchProduct();
  } catch (e) {
    console.log("Errore durante il salvataggio",error);
  }
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
   const res= await fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    if (res.status !== 200) {
      dangerAlert.classList.remove("d-none");
      setTimeout(() => {
        dangerAlert.classList.add("d-none");
      }, 3000);
    } else {
    fetchProduct();
    successAlert.classList.remove("d-none");
      setTimeout(() => {
        successAlert.classList.add("d-none");
      }, 3000);
    }
  } catch (e) {
    dangerAlert.classList.remove("d-none");
    setTimeout(() => {
      dangerAlert.classList.add("d-none");
    }, 3000);
    console.log("Errore durante il salvataggio", e);
  }
}

fetchProduct();
