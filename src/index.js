import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from './store.js';
import 'theme.css';

const store = new Store({
  list: [
    { code: 1, title: 'Название товара', price: 100.0 },
    { code: 2, title: 'Книга про React', price: 770 },
    { code: 3, title: 'Конфета', price: 33 },
    { code: 4, title: 'Трактор', price: 7955320 },
    { code: 5, title: 'Телефон iPhone XIXV', price: 120000 },
    { code: 6, title: 'Карандаши цветные', price: 111 },
    { code: 7, title: 'Товар сюрприз', price: 0 },
  ],
  cart: {}, // {code: quantity}
  isModalOpen: false,
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
