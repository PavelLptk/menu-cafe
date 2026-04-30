// Данные меню хранятся отдельно от логики и интерфейса.
// Чтобы добавить блюдо, скопируйте объект и поменяйте поля.
// Поля у каждого блюда одинаковые: название, категория, цена и ссылка на фото.
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
