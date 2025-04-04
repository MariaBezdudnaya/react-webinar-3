import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
    };
  }

  async load({ limit, skip }) {
    console.log("Catalog.load вызывается");
    try {
      const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
      const json = await response.json();
      console.log("Catalog.load: данные из API", json); // Проверяем данные
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
        },
        'Загружены товары из АПИ',
      );
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
    }
  }


  async getTotalCount() {
    try {
      const response = await fetch('/api/v1/articles?limit=1000,count');
      const json = await response.json();
      console.log("Catalog.getTotalCount: данные из API", json);
      return json.result.items.length;
    } catch (error) {
      console.error("Ошибка при получении общего количества товаров:", error);
    }
  }
}

export default Catalog;
