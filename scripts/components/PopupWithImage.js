import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    //Сразу ищем элементы, которые нужно будет изменять при открытии
    this._fullViewPopupImg = document.querySelector('.image-popup__picture');
    this._fullViewPopupDescr = document.querySelector('.image-popup__description');
    console.log('Отработал конструктор PopupWithImage');
  }
  open(evt) {
    const target = evt.target;
    //Заполняем атрибуты попапа
    this._fullViewPopupImg.src = target.src;
    this._fullViewPopupImg.alt = target.alt;
    this._fullViewPopupDescr.textContent = target.alt;
    //показываем попап
    super.open();
    console.log('Отработал метод Open класса PopupWithImage');
  }
}
