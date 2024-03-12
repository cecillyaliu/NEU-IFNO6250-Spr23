"use strict";

(function () {
  const catList = [{
    name: 'Grey Fluffball',
    price: 0.99,
    num: 0,
    img1: `<img src="http://placekitten.com/100/100?image=1" alt="Grey Fluffball">`,
    img2: `<img src="http://placekitten.com/50/50?image=1" alt="Grey Fluffball">`
  }, {
    name: 'Colorful Fluffball',
    price: 3.14,
    num: 0,
    img1: `<img src="http://placekitten.com/100/100?image=2" alt="Colorful Fluffball">`,
    img2: `<img src="http://placekitten.com/50/50?image=2" alt="Colorful Fluffball">`
  }, {
    name: 'Black Fluffball',
    price: 2.73,
    num: 0,
    img1: `<img src="http://placekitten.com/100/100?image=3" alt="Black Fluffball">`,
    img2: `<img src="http://placekitten.com/50/50?image=3" alt="Black Fluffball">`
  }];
  const state = {
    viewButton: true
  };
  const catsEl = document.querySelector('.cats');
  function updateNumber(button, amount, index) {
    const numberElement = button.querySelector('.number');
    let currentNumber = parseInt(numberElement.textContent);
    currentNumber += amount;
    if (currentNumber <= 0) {
      catList[index].num = 0;
    } else {
      numberElement.textContent = currentNumber;
      catList[index].num = currentNumber;
    }
    render();
  }
  ;
  function generateButton(number, index) {
    return `
    <button class="edit-cart" data-index="${index}" type="button">
      <span class="minus" data-index="${index}">-</span>
      <span class="number" data-index="${index}">${number}</span>
      <span class="plus" data-index="${index}">+</span>
    </button>
  `;
  }
  ;
  function render() {
    const htmlCat = catList.map((cat, index) => {
      return `
      <li>
      <span class="cat" data-index="${index}">
        ${cat.name}<br>${cat.img1}    $${cat.price}/each
      </span>
      <button data-index="${index}" class="add" type="button">
        Add
      </button>
      </li>
      `;
    }).join('');
    let viewCart;
    if (catList[0].num + catList[1].num + catList[2].num === 0) {
      viewCart = `
      <button class="view-cart" type="button">
        View Cart
      </button>
    `;
    } else {
      viewCart = `
      <button class="view-cart" type="button">
        View Cart (${catList[0].num + catList[1].num + catList[2].num})
      </button>
    `;
    }
    let hideCart;
    if (catList[0].num + catList[1].num + catList[2].num === 0) {
      hideCart = `
      <button class="hide-cart" type="button">
        Hide Cart
      </button>
    `;
    } else {
      hideCart = `
      <button class="hide-cart" type="button">
        Hide Cart (${catList[0].num + catList[1].num + catList[2].num})
      </button>
    `;
    }
    const filteredCats = catList.filter(cat => cat.num > 0);
    let htmlCart = '';
    if (filteredCats.length === 0) {
      htmlCart = `<p>Nothing in the cart.</p>`;
    } else {
      htmlCart = catList.filter(cat => cat.num > 0).map(cat => {
        let fixedIndex = 0;
        if (cat.name === 'Grey Fluffball') {
          fixedIndex = 0;
        } else if (cat.name === 'Colorful Fluffball') {
          fixedIndex = 1;
        } else {
          fixedIndex = 2;
        }
        return `
          <li>
            <span class="cartList" data-index="${fixedIndex}">
              ${cat.img2} ${cat.name}: ${generateButton(cat.num, fixedIndex)}
            </span>
          </li>
        `;
      }).join('');
    }
    const htmlSummary = `
    <span class="totalNum">
      <strong>Total number: </strong> ${catList[0].num + catList[1].num + catList[2].num} <br>
      <strong>Total price: </strong> $${(catList[0].price * catList[0].num + catList[1].price * catList[1].num + catList[2].price * catList[2].num).toFixed(2)} <br>
      <button class="checkout" type="button">
        Checkout
      </button>
    </span>
    `;
    const catsEl = document.querySelector('.cats');
    const optionEl = document.querySelector(".option");
    const cartEl = document.querySelector(".cart");
    const summaryEl = document.querySelector(".summary");
    catsEl.innerHTML = htmlCat;
    if (state.viewButton) {
      optionEl.innerHTML = viewCart;
      cartEl.style.display = "none";
      summaryEl.style.display = "none";
    } else {
      optionEl.innerHTML = hideCart;
      cartEl.style.display = "block";
      if (filteredCats.length === 0) {
        summaryEl.style.display = "none";
      } else {
        summaryEl.style.display = "block";
      }
    }
    cartEl.innerHTML = htmlCart;
    summaryEl.innerHTML = htmlSummary;
  }
  render();
  const optionEl = document.querySelector(".option");
  optionEl.addEventListener('click', e => {
    if (e.target.classList.contains('view-cart')) {
      state.viewButton = false;
      render();
    } else if (e.target.classList.contains('hide-cart')) {
      state.viewButton = true;
      render();
    }
  });
  catsEl.addEventListener('click', e => {
    if (e.target.classList.contains('add')) {
      const index = e.target.dataset.index;
      catList[index].num++;
      render();
    }
  });
  const summaryEl = document.querySelector(".summary");
  summaryEl.addEventListener('click', e => {
    if (e.target.classList.contains('checkout')) {
      catList[0].num = 0;
      catList[1].num = 0;
      catList[2].num = 0;
      state.viewButton = true;
      render();
    }
  });
  const editCartEl = document.querySelector(".cart");
  editCartEl.addEventListener('click', e => {
    if (e.target.classList.contains('minus')) {
      const index = e.target.dataset.index;
      const button = e.target.parentNode;
      updateNumber(button, -1, index);
      render();
    } else if (e.target.classList.contains('plus')) {
      const index = e.target.dataset.index;
      const button = e.target.parentNode;
      updateNumber(button, 1, index);
      render();
    }
  });
})();