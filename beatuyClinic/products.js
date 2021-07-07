"use strict";
const allBtn = document.querySelector(".all-products");
const productContainer = document.querySelector(".featured-center");
const searchInput = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");

document.querySelector(".nav-toggle").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("show-links");
});

async function getProducts() {
  try {
    const resp = await fetch("products.json");
    const data = await resp.json();
    //   nedan är hur man söker i ett object
    //   const result = Object.values(titels).includes("fridge");

    for (let x = 0; x < data.items.length; x++) {
      let html = `
    <article class="tour-card">
          <div class="tour-img-container">
            <img src="${data.items[x].image}" class="tour-img" />
            <p class="tour-date">${data.items[x].price}kr</p>
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
      productContainer.insertAdjacentHTML("afterbegin", html);
    }
  } catch (err) {
    console.error(`${err}, ${err.message}`);
  }
}

allBtn.addEventListener("click", getProducts);

searchBtn.addEventListener("click", function () {
  productContainer.innerHTML = "";
  displaySearch(searchInput.value);
});
// sökfunktion som visar data utefter söket
async function displaySearch(query) {
  try {
    const resp = await fetch("products.json");
    const data = await resp.json();
    let result = data.items.filter((el) => el.title.includes(`${query}`));

    for (let x = 0; x < result.length; x++) {
      let html = `
    <article class="tour-card">
          <div class="tour-img-container">
            <img src="${result[x].image}" class="tour-img" />
            <p class="tour-date">${result[x].price}kr</p>
          </div>
          <!-- tour info -->
          <div class="tour-info">
            <div class="tour-title">
              <h4>${result[x].title}</h4>
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
              <button class="btn">köp</button>
            
            </div>
          </div>
        </article>
    `;
      productContainer.insertAdjacentHTML("afterbegin", html);
    }
  } catch (err) {
    console.error(`${err}, ${err.message}`);
  }
}
