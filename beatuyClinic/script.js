"use strict";
const productContainer = document.querySelector(".featured-center");
const cart = document.querySelector(".cart");
const cartbar = document.querySelector(".cartbar");
const closeCartBtn = document.querySelector(".cart-close");
const cartItemsContainer = document.querySelector(".cart-items");
const cartNum = document.querySelector(".num");
let count = 0;
let priceArr = [];
let titleArr = [];
let urlArr = [];

// get json data and display data
export async function getData() {
  const resp = await fetch("products.json");
  const data = await resp.json();

  for (let x = 0; x < data.items.length; x++) {
    let html = `
    <article class="tour-card">
          <div class="tour-img-container">
            <img src="${data.items[x].image}" class="tour-img" />
            <p class="tour-date">${+data.items[x].price}kr</p>
          </div>
          <!-- tour info -->
          <div class="tour-info">
            <div class="tour-title">
              <h4>${data.items[x].title}</h4>
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum vel
              voluptate soluta illum beatae mollitia minus non dolor molestiae
              praesentium.
            </p>
            <div class="tour-footer">
              <p>
                <span>
                  <i class="fas fa-map"></i>
                  nyhet
                </span>
              </p>
              <button class="btn buy-btn">köp</button>
            
            </div>
          </div>
        </article>
    `;
    // insert html json data to productContainer
    productContainer.insertAdjacentHTML("afterbegin", html);
    // get img, title and price from the target btn clicked and add it to cart
  }
  document.querySelectorAll(".buy-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      count++;
      // const li = document.createElement("li");
      const title = e.target.closest(".tour-footer").closest(".tour-info")
        .children[0].textContent;
      console.log(title);
      const imgUrl = e.target.closest(".tour-footer").closest(".tour-info")
        .previousElementSibling.children[0].src;
      const price = parseFloat(
        e.target.closest(".tour-footer").closest(".tour-info")
          .previousElementSibling.children[1].textContent
      );
      // let html = `
      //    <div class="tour-img-container cart-img-cont">
      //       <img src="${imgUrl}" class="tour-img cart-img" />
      //       <p class="tour-date cart-price">${+price}kr</p>
      //     </div>
      //     <!-- tour info -->
      //     <div class="tour-info">
      //       <div class="tour-title cart-title">
      //         <h4>${title}</h4>
      //       </div>
      //   `;
      // li.innerHTML = `${html}`;
      // cartItemsContainer.append(li);
      priceArr.push(price);
      titleArr.push(title);
      urlArr.push(imgUrl);
      setLocal();
      cartNum.innerHTML = `${count}`;
    });
  });
}
getData();

// smooth scrolling

document.querySelectorAll(".scroll-link").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    let id = e.target.getAttribute("href").slice(1);
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  });
});

// toggle navbar
document.querySelector(".nav-toggle").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("show-links");
});

// add items to local storage and navigate to kassa.html

cart.addEventListener("click", function () {
  window.location.href = "./kassa.html";
});
function setLocal() {
  localStorage.setItem("title", JSON.stringify(titleArr));
  localStorage.setItem("price", JSON.stringify(priceArr));
  localStorage.setItem("url", JSON.stringify(urlArr));
}

function displayNumItemsCart() {
  let title = JSON.parse(localStorage.getItem("title"));
  cartNum.innerHTML = `${+title.length}`;
  if (title === 0) {
    cartNum.innerHTML = 0;
  }
}
displayNumItemsCart();
// closeCartBtn.addEventListener("click", function () {
//   cartbar.classList.remove("showCart");
// });

// till kassa btn clicked navigate to kassa.html
// document.querySelector(".kassa-btn").addEventListener("click", () => {
//   window.location.href = "./kassa.html";
// });
