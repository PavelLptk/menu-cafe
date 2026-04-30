// Логика не работает с HTML. Она получает данные и возвращает результат.

function getCategories(menuItems) {
  // Set убирает повторяющиеся категории, например несколько блюд из "Десерты".
  return [...new Set(menuItems.map((dish) => dish.category))];
}

function isDishInSelectedPrice(dish, selectedPrice) {
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

function filterDishes(menuItems, filters) {
  const searchText = filters.searchText.trim().toLowerCase();

  return menuItems.filter((dish) => {
    // Блюдо остаётся в списке, только если подходит под все выбранные фильтры.
    const matchesSearch = dish.name.toLowerCase().includes(searchText);
    const matchesCategory = filters.category === "all" || dish.category === filters.category;
    const matchesPrice = isDishInSelectedPrice(dish, filters.price);

    return matchesSearch && matchesCategory && matchesPrice;
  });
}
