"use strict";

const varukorgen = document.querySelector(".varor");
const payBtns = document.querySelector(".payBtn");
const attbetala = document.querySelector(".attbetala");
let topay = 0;
let summa = 0;
let skallBetala = [];
let uppdateratPris = [];
let varorIPaypal = [];
let prisIPaypayl = {};
let nummerAntal = 0;
let sumtot = 0;

document.querySelector(".nav-toggle").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("show-links");
});

function getItems() {
  let count = 0;
  let title = JSON.parse(localStorage.getItem("title"));
  let price = JSON.parse(localStorage.getItem("price"));
  let url = JSON.parse(localStorage.getItem("url"));
  for (let x = 0; x < title.length; x++) {
    let imgTih = document.createElement("h4");
    imgTih.textContent = title[x];
    imgTih.classList.add("imgTih");
    varorIPaypal.push(imgTih.textContent);
    let stPris = document.createElement("h4");
    let antal = document.createElement("h4");
    stPris.setAttribute("class", "styckPris");
    antal.classList.add("antalItems");
    summa = document.createElement("span");
    summa.classList.add("summa");
    stPris.innerHTML = `${+price[x]}`;
    prisIPaypayl.pris = price;
    count += price;
    // +stPris.textContent);

    antal.innerHTML = 1;
    summa.textContent = `${+price[x]}kr`;

    let img = document.createElement("img");
    img.setAttribute("src", url[x]);
    img.classList.add("prod-img");
    img.style.width = "80px";

    varukorgen.append(imgTih);
    varukorgen.append(img);
    varukorgen.append(stPris);
    varukorgen.append(antal);
    varukorgen.append(summa);
  }
  document.querySelectorAll(".fa-window-close").forEach((el) => {
    el.addEventListener("click", function (e) {});
  });
}
getItems();

function payButtons() {
  let html;
  html = `
   <button class="btn btn-cart clear-cart">töm korgen</button>
     <br>
    <br>
    <button class="btn btn-cart pay-cart">betala nu</button>
  `;
  payBtns.insertAdjacentHTML("afterbegin", html);
  document.querySelector(".clear-cart").addEventListener("click", () => {
    localStorage.clear();
    localStorage.removeItem("title");
    localStorage.removeItem("price");
    localStorage.removeItem("url");
    location.href = "./index.html";
  });
  document.querySelector(".pay-cart").addEventListener("click", pay);
}
payButtons();

varukorgen.addEventListener("click", function (e) {
  let totalen = 0;
  let thePrice = +e.target.parentNode.previousSibling.textContent;
  let antalet = +e.target.value;
  totalen += thePrice * antalet;

  let sum = e.target.parentNode.nextSibling;
  sum.textContent = totalen + "kr";
});

function pay() {
  const sum = JSON.parse(localStorage.getItem("price"));
  for (let amount of sum) {
    topay += amount;
  }

  if (window.PaymentRequest) {
    const supportedPaymentMethods = [
      {
        supportedMethods: ["basic-card"],
      },
    ];
    const paymentdetails = {
      total: {
        label: "Att Betala",
        amount: {
          currency: "SEK",
          value: skallBetala[0],
        },
      },
    };
    const options = {};
    const paymentRequest = new PaymentRequest(
      supportedPaymentMethods,
      paymentdetails,
      options
    );
    paymentRequest
      .show()
      .then((payment) => console.log(payment))
      .catch((error) => console.log(error));
  } else {
    // fallback to your other implementation
    checkout();
  }
}

function totaltAttBetala() {
  const sum = JSON.parse(localStorage.getItem("price"));
  for (let amount of sum) {
    topay += amount;
  }
  skallBetala.push(topay);
  attbetala.textContent = ` Tot: ${topay}kr`;
}

totaltAttBetala();

function checkout() {
  prisIPaypayl.pris.forEach((el) => {
    sumtot += el;
  });
  let paypalFormHTML = `
    <form id="paypal-form" action="https://www.paypal.com/cgi-bin/webscr" method="post">
      <input type="hidden" name="cmd" value="_cart">
      <input type="hidden" name="upload" value="1">
      <input type="hidden" name="currency_code" value="SEK">
      <input type="hidden" name="business" value="louiestokk@gmail.com">
       <input type="hidden" name="amount_${1}" value="${sumtot}">
  `;

  varorIPaypal.forEach((cartItem, index) => {
    ++index;
    paypalFormHTML += `
      <input type="hidden" name="item_name_${index}" value="${cartItem}">
      <input type="hidden" name="quantity_${index}" value="${1}">
    `;
  });

  paypalFormHTML += `
      <input type="submit" value="PayPal">
    </form>
    <div class="overlay"></div>
  `;

  document
    .querySelector("body")
    .insertAdjacentHTML("beforeend", paypalFormHTML);
  document.getElementById("paypal-form").submit();
}

console.log(sumtot);
