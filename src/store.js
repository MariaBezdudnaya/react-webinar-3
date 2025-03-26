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
   * Добавление товара в корзину по коду
   * @param code
   */
  addItemToCart(code) {
    const { cart } = this.state;
    const newCart = { ...cart };
    newCart[code] = (newCart[code] || 0) + 1;
    this.setState({ ...this.state, cart: newCart });
  }

  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  removeItemFromCart(code) {
    const { cart } = this.state;
    const newCart = { ...cart };
    delete newCart[code];
    this.setState({ ...this.state, cart: newCart });
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
