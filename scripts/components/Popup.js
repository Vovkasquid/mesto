export default class Popup {
  //popupSelector - селектор попапа
  constructor(popupSelector) {
    //Сразу ищем Дом-элемент по селектору
    this._popupContainer = document.querySelector(popupSelector);
    this._closeButton = this._popupContainer.querySelector('.popup__close-btn');
    console.log('Отработал конструктор Popup');
  }

  //Метод навешивания слушателей закрытия попапа по esc, оверлею и кнопке закрытия
  setEventListeners() {
    //слушатель закрытия по esc
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    //слушатель закрытия при клике по оверлею
    document.addEventListener('click', this._handleOverleyClick.bind(this));
    //слушатель закрытия по кнопке закрытия
    this._closeButton.addEventListener('click', this.close.bind(this));
    console.log('Слушатели Popup установлены');
  }

  //Метод снимания слушателей закрытия попапа по esc, оверлею и кнопке закрытия
  removeEventListeners() {
    //слушатель закрытия по esc
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    //слушатель закрытия при клике по оверлею
    document.removeEventListener('click', this._handleOverleyClick.bind(this));
    //слушатель закрытия по кнопке закрытия
    this._closeButton.removeEventListener('click', this.close.bind(this));
    console.log('Слушатели Popup сняты');
  }

  //метод открытия попапа
  open() {
    //Навешиваем общие слушатели
    this.setEventListeners();
    //Открываем попап
    this._popupContainer.classList.add('popup_status_active');
    console.log('Отработал метод открытия Popup');
  }

  //метод закрытия попапа
  close() {
    //Снимаем общие слушатели
    this.removeEventListeners();
    //Закрываем попап
    this._popupContainer.classList.remove('popup_status_active');
    console.log('Отработал метод закрытия Popup');
  }

  //Метод, закрывающий попапы при нажатии эскейп
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      //закрываем попап
      this.close();
    }
    console.log('Отработал обработчик закрытия на экспейп Popup');
  }

  //Метод, закрывающий попапа при клике по оверлею
  //Слушатель, закрывающий попап по клику мимо него
  _handleOverleyClick(event) {
    if (event.target.classList.contains('popup')) {
      this.close();
    }
    console.log('Отработал обработчик закрытия на Оверлей Popup');
  }
}
