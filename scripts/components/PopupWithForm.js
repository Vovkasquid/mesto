import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    //Получаем элемент формы, чтобы сбрасывать его при закрытии
    this._formContainer = this._popupContainer.querySelector('.edit-form__form-container');
    console.log('Отработал конструктор PopupWithForm');
  }
  _getInputValues() {
    //Ищем инпуты
    const allInputs = this._formContainer.querySelectorAll('.edit-form__info-input');
    //Пустой объект, который будем возвращать
    const dataObj = {};
    //Перебираем инпуты и записываем в объект
    allInputs.forEach(input => {
      dataObj[input.name] = input.value;
    });
    console.log('Отработал _getInputValues');
    console.log(dataObj);
    return dataObj;
  }
  setEventListeners() {
    //Вызываем сначала метод предка
    super.setEventListeners();
    //Вешаем слушатель на сабмит по форме
    console.log(this._popupContainer);
    this._popupContainer.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log('Отработал Сабмит PopupWithForm');
      //Вызываем колбек для установки данных в формы
      this._submitCallback(this._getInputValues());
    });
    console.log('Отработал метод setEventListeners PopupWithForm');
  }

  close() {
    //Закрываем попап
    super.close();
    //Сбрасываем форму
    this._formContainer.reset();
    //Снимаем новый слушатель
    this._popupContainer.removeEventListener('submit', this._submitCallback);
    console.log('Отработал метод close PopupWithForm');
  }
}
