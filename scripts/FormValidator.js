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

  _showInputError = (inputElement, errorMessage) => {
    //Получаем по id span
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    //Добавляем классы ошибки и текст ошибки
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  _hasInvalidInput = (inputList) => {
    //Проводим древнюю тёмную магию с помощью some
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = (inputList) => {
    //Проверяем на валидность и, если надо, меняем состояние кнопки
    if (this._hasInvalidInput(inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  //Функция, для проверки состояния кнопки формы
  checkFormButtonState = (formElement, formInputList) => {
    //Получаем необходимые элементы
    //Получаем все поля формы
    const formInputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    //Выставляем состояние кнопки
    toggleButtonState(formInputList);
  }

  _hideInputError = (inputElement) => {
    //Получаем по id span
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    //Удаляем классы ошибки и зануляем текст
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  };

  //Функция очистки всех полей формы от ошибок
  resetFormInputError = () => {
    //Получаем все поля формы
    const formInputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    //Перебираем поля и каждое очищаем
    formInputList.forEach((inputElement) => {
      hideInputError(inputElement);
    });
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    //Получаем массив всех инпутов
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    //Получаем ссылку на кнпоку
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);
    // Проверяем состояние кнопки в самом начале
    this._toggleButtonState(inputList);

    //Перебираем все найденные инпуты
    inputList.forEach((inputElement) => {
      //Вешаем слушателей на ввод и проверяем валидность
      inputElement.addEventListener('input', function () {
        this._checkInputValidity(inputElement);
        // Проверяем состояние кнопки при изменении
        this._toggleButtonState(inputList);
      });
    });
  };

  _enableValidation = () => {
    //отменяем отправку форму по сабмиту
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    //Вешаем слушателей на форму
    this._setEventListeners();
  };
}
