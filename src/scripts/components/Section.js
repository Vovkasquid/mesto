export default class Section {
  constructor(renderer, containerSelector) {
    //renderer - колбек отрисовки карточек
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderAllElements(cardsArray) {
    cardsArray.forEach((item) => {
      //renderer(item, container) кладём в аргумент item, колбек его добавляет в разметку в контейнер
      this._renderer(item, this._container);
    });
  }

  addItem(item) {
    this._renderer(item, this._container);
  }
}
