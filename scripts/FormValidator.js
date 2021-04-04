class FormValidator {
  //Конструктор. Принимает объект настроек, декомпозируем его + принимаем форму
  constructor({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, formElement) {
    this._formElement = formElement;
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }

  _showInputError = () => {
    //Получаем по id span
    this._errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
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
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._submitDisabledClass = this._inactiveButtonClass;
    //Выставляем состояние кнопки
    this._toggleButtonState();
  }
  _hideInputError = () => {
    //Получаем по id span
    this._errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
    //Удаляем классы ошибки и зануляем текст
    this._inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  };

  _checkInputValidity = () => {
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _setEventListeners = () => {
    //Получаем массив всех инпутов формы
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    //Получаем ссылку на кнпоку
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    // Проверяем состояние кнопки в самом начале
    this._toggleButtonState();

    //Перебираем все найденные инпуты
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      //Вешаем слушателей на ввод и проверяем валидность
      this._inputElement.addEventListener('input', () => {
        this._checkInputValidity();
        // Проверяем состояние кнопки при изменении
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    console.log("enableValidation");
    //Массив форм не нужен, есть одна форма
    //И перебирать формы не надо
    //отменяем отправку форму по сабмиту
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    //Вешаем слушателей полей ввода
    this._setEventListeners();
  };
}
