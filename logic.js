// Логика не работает с HTML. Она получает данные и возвращает результат.

function getCategories(menuItems) {
  // Set убирает повторяющиеся категории, например несколько блюд из "Десерты".
  return [...new Set(menuItems.map((dish) => dish.category))];
}

function isDishInSelectedPrice(dish, selectedPrice) {
  // Выбираем диапазон цены по значению из выпадающего списка.
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

function matchesDishSearch(dish, searchText) {
  // Поиск идёт только по названию блюда.
  return dish.name.toLowerCase().includes(searchText);
}

function matchesDishCategory(dish, selectedCategory) {
  // Категория проходит, если выбрано "Все блюда" или совпадение точное.
  return selectedCategory === "all" || dish.category === selectedCategory;
}

function filterDishes(menuItems, filters) {
  const searchText = filters.searchText.trim().toLowerCase();

  return menuItems.filter((dish) => {
    // Блюдо остаётся в списке, только если подходит под все выбранные фильтры.
    const matchesSearch = matchesDishSearch(dish, searchText);
    const matchesCategory = matchesDishCategory(dish, filters.category);
    const matchesPrice = isDishInSelectedPrice(dish, filters.price);

    return matchesSearch && matchesCategory && matchesPrice;
  });
}

function sortDishes(menuItems, sortType) {
  const sortedItems = [...menuItems];

  // Сортировка создаёт копию массива, чтобы не менять исходные данные.
  if (sortType === "name-asc") {
    return sortedItems.sort((firstDish, secondDish) => firstDish.name.localeCompare(secondDish.name, "ru"));
  }

  if (sortType === "name-desc") {
    return sortedItems.sort((firstDish, secondDish) => secondDish.name.localeCompare(firstDish.name, "ru"));
  }

  if (sortType === "price-asc") {
    return sortedItems.sort((firstDish, secondDish) => firstDish.price - secondDish.price);
  }

  if (sortType === "price-desc") {
    return sortedItems.sort((firstDish, secondDish) => secondDish.price - firstDish.price);
  }

  return sortedItems;
}
