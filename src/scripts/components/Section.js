export default class Section {
  constructor({data, renderer}, containerSelector) {
    console.log('карточки в конструкторе секции');
    console.log(data);
    //items - массив начальных карточек
    this._items = data;
    //renderer - колбек отрисовки карточек
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderAllElements() {
    this._items.forEach((item) => {
      //renderer(item, container) кладём в аргумент item, колбек его добавляет в разметку в контейнер
      this._renderer(item, this._container);
    });
  }

  addItem(item) {
    this._renderer(item, this._container);
  }
}
