//Объявляем validationConfig - объект, со всеми нужны селекторами
const validationConfig = {
  formSelector: '.edit-form__form-container',
  inputSelector: '.edit-form__info-input',
  submitButtonSelector: '.edit-form__submit-button',
  inactiveButtonClass: 'edit-form__submit-button_disabled',
  inputErrorClass: 'edit-form__info-input_error',
  errorClass: 'edit-form__error-text_active'
};

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  //Получаем по id span
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //Добавляем классы ошибки и текст ошибки
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hasInvalidInput = (inputList) => {
  //Проводим древнюю тёмную магию с помощью some
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  //Проверяем на валидность и, если надо, меняем состояние кнопки
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

//Функция, для проверки состояния кнопки формы
//TODO надо что-то сделать с toggleButtonState
const checkFormButtonState = (formElement, formInputList) => {
  //Получаем необходимые элементы
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  const submitDisabledClass = validationConfig.inactiveButtonClass;
  //Выставляем состояние кнопки
  toggleButtonState(formInputList, buttonElement, submitDisabledClass);
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  //Получаем по id span
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //Удаляем классы ошибки и зануляем текст
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Функция очистки всех полей формы от ошибок
const resetFormInputError = (formElement) => {
  //Получаем все поля формы
  const formInputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  //Получаем дополнительные данные, для передачи в функцию скрытия ошибки
  const inputErrorClass = validationConfig.inputErrorClass;
  const errorClass = validationConfig.errorClass;
  //Перебираем поля и каждое очищаем
  formInputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  });
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  //const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  //Получаем массив всех инпутов
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  //Получаем ссылку на кнпоку
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // Проверяем состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  //Перебираем все найденные инпуты
  inputList.forEach((inputElement) => {
    //Вешаем слушателей на ввод и проверяем валидность
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      // Проверяем состояние кнопки при изменении
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  //Получаем массив форм
  const formList = Array.from(document.querySelectorAll(formSelector));
  //Перебираем формы
  formList.forEach((formElement) => {
    //отменяем отправку форму по сабмиту
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
};
