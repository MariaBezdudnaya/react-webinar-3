/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   *  Пересчёт totalPrice и uniqueCartItemsCount на основе содержимого корзины.
   */
  calculateCartSummary() {
    const { cart, list } = this.state;
    let totalPrice = 0;
    // Итерируемся по корзине и суммируем цены товаров
    cart.forEach((cartItem) => {
      const item = list.find((listItem) => listItem.code === cartItem.code);
      if (item) {
        totalPrice += item.price * cartItem.quantity;
      }
    });
    this.setState({
      ...this.state,
      totalPrice: totalPrice,
      uniqueCartItemsCount: cart.length,
    });
  }
  
  /**
   * Добавление товара в корзину по коду
   * @param code
   */
  addItemToCart(code) {
    const { cart } = this.state;
    const existingCartItemIndex = cart.findIndex((item) => item.code === code); // Проверяем, есть ли товар в корзине
    if (existingCartItemIndex !== -1) {
      // Если товар есть, увеличиваем количество
      const newCart = [...cart];
      newCart[existingCartItemIndex].quantity += 1; // Увеличиваем количество
      this.setState({ ...this.state, cart: newCart }); // Обновляем состояние
    } else {
      // Если товара нет, добавляем новый элемент в корзину
      const newCart = [...cart, { code: code, quantity: 1 }]; // Добавляем товар в корзину
      this.setState({ ...this.state, cart: newCart }); // Обновляем состояние
    }
  }

  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  removeItemFromCart(code) {
    let { cart } = this.state;
    cart = cart.filter((item) => item.code !== code);
    this.setState({ ...this.state, cart: cart });
  }

  /**
   * Открытие модального окна
   */
  openModal() {
    this.setState({ ...this.state, isModalOpen: true });
  }

  /**
   * Закрытие модального окна
   */
  closeModal() {
    this.setState({ ...this.state, isModalOpen: false });
  }
}

export default Store;
