class FormValidator {
  //Конструктор. Принимает объект настроек, декомпозируем его + принимаем форму
  constructor({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, formItem) {
    this._formItem = formItem;
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }

  _showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    //Получаем по id span
    this._errorElement = formElement.querySelector(`.${this._inputElement.id}-error`);
    //Добавляем классы ошибки и текст ошибки
    this._inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = this._errorMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  _hasInvalidInput = () => {
    //Проводим древнюю тёмную магию с помощью some
    return this._inputList.some((inputElement) => {
      return !this._inputElement.validity.valid;
    });
  }

  _toggleButtonState = () => {
    //Проверяем на валидность и, если надо, меняем состояние кнопки
    if (hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }
  _checkFormButtonState = () => {
    //Получаем необходимые элементы
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._submitDisabledClass = this._inactiveButtonClass;
    //Выставляем состояние кнопки
    this._toggleButtonState();
  }
  _hideInputError = () => {
    //Получаем по id span
    this._errorElement = formElement.querySelector(`.${this._inputElement.id}-error`);
    //Удаляем классы ошибки и зануляем текст
    this._inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  };

  _checkInputValidity = () => {
    if (!this._inputElement.validity.valid) {
      showInputError();
    } else {
      hideInputError();
    }
  };

  _setEventListeners = () => {
    //Получаем массив всех инпутов формы
    this._inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
    //Получаем ссылку на кнпоку
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);
    // Проверяем состояние кнопки в самом начале
    this._toggleButtonState();

    //Перебираем все найденные инпуты
    this._inputList.forEach((inputElement) => {
      //Вешаем слушателей на ввод и проверяем валидность
      inputElement.addEventListener('input', function () {
        this._checkInputValidity();
        // Проверяем состояние кнопки при изменении
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    //Массив форм не нужен, есть одна форма
    //И перебирать формы не надо
    //отменяем отправку форму по сабмиту
    this._formItem.addEventListener('submit', function (evt) {
      evt.preventDefault();
      this._setEventListeners();
    });
  };
}
