/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.lastGeneratedCode = initState.list ? Math.max(...initState.list.map(item => item.code), 0) : 0;
    this.state.list = this.state.list.map(item => ({ ...item, selections: 0 })); // Инициализируем selections для каждого элемента
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
    for (const listener of this.listeners)
    listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.lastGeneratedCode++;
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.lastGeneratedCode, title: 'Новая запись', selections: 0, selected: false }], // Добавляем selections при создании
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, multiSelect) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          const newSelected = !item.selected;

          return {
            ...item,
            selected: newSelected, // Используем сохраненное значение
            selections: item.selections + (newSelected ? 1 : 0), // Увеличиваем только при выделении
          };
        } else if (!multiSelect) {
          return {
            ...item,
            selected: false, // Снимаем выделение с других элементов
          };
        }
        return item;
      }),
    });
  }
}

export default Store;
