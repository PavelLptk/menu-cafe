// UI отвечает за страницу: элементы, карточки, события и счётчик заказа.

// DOM-элементы
const menuGrid = document.querySelector("#menuGrid");
const emptyMessage = document.querySelector("#emptyMessage");
const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categorySelect");
const priceSelect = document.querySelector("#priceSelect");
const sortSelect = document.querySelector("#sortSelect");
const currentCategory = document.querySelector("#currentCategory");
const resultsCountElement = document.querySelector("#resultsCount");
const orderToggleButton = document.querySelector("#orderToggleButton");
const orderCountElement = document.querySelector("#orderCount");
const orderDropdown = document.querySelector("#orderDropdown");
const orderList = document.querySelector("#orderList");
const orderEmptyMessage = document.querySelector("#orderEmptyMessage");
const clearOrderButton = document.querySelector("#clearOrderButton");
const checkoutOrderButton = document.querySelector("#checkoutOrderButton");
const orderItemsTotal = document.querySelector("#orderItemsTotal");
const orderTotalPrice = document.querySelector("#orderTotalPrice");

// Состояние заказа
const orderItems = [];

// Вспомогательные функции
function updateOrderCounter() {
  orderCountElement.textContent = orderItems.length;
}

function getOrderSummary() {
  const summary = new Map();

  orderItems.forEach((dishName) => {
    summary.set(dishName, (summary.get(dishName) || 0) + 1);
  });

  return [...summary.entries()].map(([name, count]) => ({ name, count }));
}

function getDishByName(dishName) {
  return dishes.find((dish) => dish.name === dishName);
}

function isDishInOrder(dishName) {
  return orderItems.includes(dishName);
}

function getOrderTotal() {
  return orderItems.reduce((total, dishName) => {
    const dish = getDishByName(dishName);
    return total + (dish ? dish.price : 0);
  }, 0);
}

function setOrderDropdownOpen(isOpen) {
  orderDropdown.hidden = !isOpen;
  orderToggleButton.setAttribute("aria-expanded", String(isOpen));
}

function fillCategories() {
  // Категории берутся из массива блюд, поэтому список обновится сам.
  const categories = getCategories(dishes);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  });
}

function getFiltersFromPage() {
  // Собираем текущие значения фильтров со страницы в один объект.
  return {
    searchText: searchInput.value,
    category: categorySelect.value,
    price: priceSelect.value,
    sort: sortSelect.value
  };
}

// Отрисовка интерфейса
function renderOrderDropdown() {
  const summary = getOrderSummary();
  const totalPrice = getOrderTotal();

  updateOrderCounter();
  orderList.innerHTML = "";
  orderEmptyMessage.hidden = summary.length > 0;
  clearOrderButton.disabled = summary.length === 0;
  checkoutOrderButton.disabled = summary.length === 0;
  orderItemsTotal.textContent = String(orderItems.length);
  orderTotalPrice.textContent = `${totalPrice} RUB`;

  summary.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "order-list-item";

    const itemLabel = document.createElement("span");
    itemLabel.textContent = item.count === 1 ? item.name : `${item.name} × ${item.count}`;

    const removeButton = document.createElement("button");
    removeButton.className = "remove-order-item-button";
    removeButton.type = "button";
    removeButton.dataset.dishName = item.name;
    removeButton.setAttribute("aria-label", `Удалить блюдо ${item.name} из заказа`);
    removeButton.textContent = "×";

    listItem.append(itemLabel, removeButton);
    orderList.append(listItem);
  });
}

function createDishCard(dish) {
  const card = document.createElement("article");
  card.className = isDishInOrder(dish.name) ? "dish-card in-order" : "dish-card";
  card.tabIndex = 0;

  card.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}" loading="lazy">
    <div class="dish-info">
      <div>
        <h2 class="dish-name">${dish.name}</h2>
        <p class="dish-description">${dish.description}</p>
        <p class="dish-price">${dish.price} RUB</p>
      </div>
      <button class="order-button" type="button" data-dish-name="${dish.name}">Заказать</button>
    </div>
  `;

  return card;
}

function renderMenu() {
  const filters = getFiltersFromPage();
  const filteredDishes = filterDishes(dishes, filters);
  const sortedDishes = sortDishes(filteredDishes, filters.sort);
  const searchText = filters.searchText.trim();

  // Перед новой отрисовкой очищаем старые карточки.
  menuGrid.innerHTML = "";

  sortedDishes.forEach((dish) => {
    menuGrid.append(createDishCard(dish));
  });

  emptyMessage.classList.toggle("visible", sortedDishes.length === 0);
  currentCategory.textContent = filters.category === "all" ? "Все блюда" : filters.category;
  if (searchText) {
    resultsCountElement.hidden = false;
    resultsCountElement.textContent = `Совпадений: ${sortedDishes.length}`;
  } else {
    resultsCountElement.hidden = true;
    resultsCountElement.textContent = "";
  }
}

// Действия с заказом
function toggleOrderDropdown() {
  setOrderDropdownOpen(orderDropdown.hidden);
}

function clearOrder() {
  // Очищаем именно список, а не отдельный счётчик, чтобы состояние всегда было в одном месте.
  orderItems.length = 0;
  renderOrderDropdown();
  renderMenu();
}

function checkoutOrder() {
  if (orderItems.length === 0) {
    return;
  }

  const totalPrice = getOrderTotal();

  alert(`Заказ оформлен. Итоговая сумма: ${totalPrice} RUB.`);
  clearOrder();
  setOrderDropdownOpen(false);
}

function removeDishFromOrder(dishName) {
  const itemIndex = orderItems.indexOf(dishName);

  if (itemIndex === -1) {
    return;
  }

  // Удаляем только один экземпляр блюда, если оно было добавлено несколько раз.
  orderItems.splice(itemIndex, 1);
  renderOrderDropdown();
  renderMenu();
}

function addDishToOrder(dishName) {
  orderItems.push(dishName);
  renderOrderDropdown();
  renderMenu();
  alert(`Блюдо "${dishName}" добавлено в заказ.`);
}

// Обработчики событий
searchInput.addEventListener("input", renderMenu);
categorySelect.addEventListener("change", renderMenu);
priceSelect.addEventListener("change", renderMenu);
sortSelect.addEventListener("change", renderMenu);
orderToggleButton.addEventListener("click", toggleOrderDropdown);
clearOrderButton.addEventListener("click", clearOrder);
checkoutOrderButton.addEventListener("click", checkoutOrder);

document.addEventListener("click", (event) => {
  // Если список закрыт, ничего делать не нужно.
  if (orderDropdown.hidden) {
    return;
  }

  // Клик внутри блока заказа не закрывает dropdown.
  if (event.target.closest(".order-panel")) {
    return;
  }

  // Клик снаружи — закрываем список.
  setOrderDropdownOpen(false);
});

orderList.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-order-item-button");

  if (!removeButton) {
    return;
  }

  removeDishFromOrder(removeButton.dataset.dishName);
});

// Один обработчик на всю сетку удобнее, чем добавлять обработчик каждой кнопке отдельно.
menuGrid.addEventListener("click", (event) => {
  const orderButton = event.target.closest(".order-button");

  if (orderButton) {
    // Нажали на кнопку "Заказать" — добавляем блюдо в текущий заказ.
    addDishToOrder(orderButton.dataset.dishName);
    return;
  }

  const dishCard = event.target.closest(".dish-card");

  if (!dishCard) {
    return;
  }

  // По клику на карточку показываем или скрываем описание блюда.
  dishCard.classList.toggle("show-description");
});

// Инициализация
fillCategories();
renderMenu();
renderOrderDropdown();
