// UI отвечает за страницу: элементы, карточки, события и счётчик заказа.

const menuGrid = document.querySelector("#menuGrid");
const emptyMessage = document.querySelector("#emptyMessage");
const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categorySelect");
const priceSelect = document.querySelector("#priceSelect");
const sortSelect = document.querySelector("#sortSelect");
const currentCategory = document.querySelector("#currentCategory");
const orderCountElement = document.querySelector("#orderCount");

// Счётчик хранится в переменной, а на странице показывается в orderCountElement.
let orderCount = 0;

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

function createDishCard(dish) {
  const card = document.createElement("article");
  card.className = "dish-card";

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

  // Перед новой отрисовкой очищаем старые карточки.
  menuGrid.innerHTML = "";

  sortedDishes.forEach((dish) => {
    menuGrid.append(createDishCard(dish));
  });

  emptyMessage.classList.toggle("visible", sortedDishes.length === 0);
  currentCategory.textContent = filters.category === "all" ? "Все блюда" : filters.category;
}

function addDishToOrder(dishName) {
  orderCount += 1;
  orderCountElement.textContent = orderCount;
  alert(`Блюдо "${dishName}" добавлено в заказ.`);
}

searchInput.addEventListener("input", renderMenu);
categorySelect.addEventListener("change", renderMenu);
priceSelect.addEventListener("change", renderMenu);
sortSelect.addEventListener("change", renderMenu);

// Один обработчик на всю сетку удобнее, чем добавлять обработчик каждой кнопке отдельно.
menuGrid.addEventListener("click", (event) => {
  const orderButton = event.target.closest(".order-button");

  if (!orderButton) {
    return;
  }

  addDishToOrder(orderButton.dataset.dishName);
});

// Старт приложения: сначала заполняем категории, потом показываем меню.
fillCategories();
renderMenu();
