import StoreModule from '../module';

class Info extends StoreModule {
  initState() {
    return {
      data: {},
    };
  }

  /**
   * Получение инфо о товаре
   * @param _id Код товара
   */
  async getInfo(_id) {
    try {
      const response = await fetch(`/api/v1/articles/${_id}?fields=_id,title,description,madeIn(_type),category(_type),edition,price`);
      const json = await response.json();
      console.log("Info.getInfo: данные из API", json);
      this.setState(
        {
          ...this.getState(),
          data: json,
        },
        'Инфо о товаре',
      );
      return json;
    } catch (error) {
      console.error("Ошибка при получении информации о товаре:", error);
    }
  }
}

export default Info;