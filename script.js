// Простые демо-данные. Чтобы добавить блюдо, скопируйте объект и поменяйте поля.
const dishes = [
  {
    name: "Брауни с карамелью",
    category: "Десерты",
    price: 270,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Графские развалины",
    category: "Десерты",
    price: 300,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Имбирная панакота",
    category: "Десерты",
    price: 110,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Медовый торт",
    category: "Десерты",
    price: 190,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Наполеон",
    category: "Десерты",
    price: 260,
    image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Фруктовая нарезка",
    category: "Десерты",
    price: 360,
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Чизкейк Нью-Йорк",
    category: "Десерты",
    price: 150,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Чизкейк шоколадный",
    category: "Десерты",
    price: 260,
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Греческий салат",
    category: "Салаты",
    price: 230,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Куриный суп",
    category: "Горячее",
    price: 180,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Паста с томатами",
    category: "Горячее",
    price: 320,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Апельсиновый лимонад",
    category: "Напитки",
    price: 120,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80"
  }
];

const menuGrid = document.querySelector("#menuGrid");
const emptyMessage = document.querySelector("#emptyMessage");
const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categorySelect");
const priceSelect = document.querySelector("#priceSelect");
const currentCategory = document.querySelector("#currentCategory");

// Категории берутся из массива блюд, поэтому при добавлении блюда список обновится сам.
const categories = [...new Set(dishes.map((dish) => dish.category))];

categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categorySelect.append(option);
});

function isDishInSelectedPrice(dish) {
  const selectedPrice = priceSelect.value;

  if (selectedPrice === "cheap") {
    return dish.price < 150;
  }

  if (selectedPrice === "middle") {
    return dish.price >= 150 && dish.price <= 250;
  }

  if (selectedPrice === "expensive") {
    return dish.price > 250;
  }

  return true;
}

function getFilteredDishes() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;

  return dishes.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategory === "all" || dish.category === selectedCategory;

    return matchesSearch && matchesCategory && isDishInSelectedPrice(dish);
  });
}

function createDishCard(dish) {
  const card = document.createElement("article");
  card.className = "dish-card";

  card.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}" loading="lazy">
    <div class="dish-info">
      <div>
        <h2 class="dish-name">${dish.name}</h2>
        <p class="dish-price">${dish.price} RUB</p>
      </div>
      <button class="order-button" type="button" data-dish-name="${dish.name}">Заказать</button>
    </div>
  `;

  return card;
}

function renderMenu() {
  const filteredDishes = getFilteredDishes();

  menuGrid.innerHTML = "";
  filteredDishes.forEach((dish) => {
    menuGrid.append(createDishCard(dish));
  });

  emptyMessage.classList.toggle("visible", filteredDishes.length === 0);
  currentCategory.textContent = categorySelect.value === "all" ? "Все блюда" : categorySelect.value;
}

searchInput.addEventListener("input", renderMenu);
categorySelect.addEventListener("change", renderMenu);
priceSelect.addEventListener("change", renderMenu);

// Один обработчик на всю сетку удобнее, чем добавлять обработчик каждой кнопке отдельно.
menuGrid.addEventListener("click", (event) => {
  const orderButton = event.target.closest(".order-button");

  if (!orderButton) {
    return;
  }

  alert(`Блюдо "${orderButton.dataset.dishName}" добавлено в заказ.`);
});

renderMenu();
