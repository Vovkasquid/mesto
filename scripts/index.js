//Проводим необходимые импорты
import {initialCards} from './utils/initial-cards.js';
import {validationConfig} from './utils/validate.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

//Получаем Попап с редактированием профиля
const editForm = document.querySelector('.edit-form_type_profile');
//Получаем контейнер попапа с редактированием профиля
const editFormContainer = editForm.querySelector('.edit-form__form-container');
//Получаем Попап с добавление карточки
const editFormNewPlace = document.querySelector('.edit-form_type_place');
//Получаем контейнер попапа с добавлением карточки
const editFormNewPlaceContainer = editFormNewPlace.querySelector('.edit-form__form-container');
//Получаем кнопку редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
//Получаем кнопку добавления карточки
const addCardButton = document.querySelector('.profile__new-photo-button');
//Получаем кнопку закрытия Попапа с редактированием профиля
const editFormProfileName = document.querySelector('.edit-form__info-input_type_name');
const editFormProfileDescription = document.querySelector('.edit-form__info-input_type_description');
//Получаем список всех полей попапа editForm
const editFormPlaceName = document.querySelector('.edit-form__info-input_type_place');
const editFormPlaceLink = document.querySelector('.edit-form__info-input_type_link');
//Получаем Темплейт карточки
const cardTemplate = document.querySelector('.card-template');
//Получаем список с карточками
const contentGallerySelector = '.content-gallery__cards';
const profileValidation = createFormValidatorObj(validationConfig, editFormContainer);
const placeValidation = createFormValidatorObj(validationConfig, editFormNewPlaceContainer);
//Функция создание объекта валидации
function createFormValidatorObj (config, formElement) {
  return new FormValidator(config, formElement);
}

//Функция закрытия любого попапа
function closePopup(popup) {
  //Закрываем попап
  popup.classList.remove('popup_status_active');
  //Cнимаем слушатель с клавиатуры
  removeKeyboardEscListener();
  //Снимаем слушатель на документ, чтобы отлавливать клики по оверлею
  removeClickOverlayDocumentListener();
}

//Функция для снятия слушателя клавиатуры с документа
function removeKeyboardEscListener() {
  document.removeEventListener('keydown', closePopupKeyBoardHandler);
}

//Функция для снятия слушателя клика по оверлею с документа
function removeClickOverlayDocumentListener() {
  document.removeEventListener('click', closePopupOverlayClickHandler);
}

//Функция, для навешивания слушателя клавиатуры на документ
function setKeyboardEscListener() {
  document.addEventListener('keydown', closePopupKeyBoardHandler);
}

//Функция для навешивания слушателя клика по оверлею на документ
function setClickOverlayDocumentListener() {
  document.addEventListener('click', closePopupOverlayClickHandler);
}

//Слушатель, закрывающий попапы при нажатии эскейп
function closePopupKeyBoardHandler(event) {
  if (event.key === 'Escape') {
    //Ищем открытый попап
    const openedPopup = document.querySelector('.popup_status_active');
    //закрываем попап
    closePopup(openedPopup);
  }
}

//Слушатель, закрывающий попап по клику мимо него
function closePopupOverlayClickHandler(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
}

//Функция создания объекта класса Card
function createCardObject(placeData, templateCard, openFullViewPopup) {
  return new Card(placeData, templateCard, openFullViewPopup);
}

//Обработчик события для закрытия первой формы
const editFormSubmitHandler = function  (event) {
  console.log('отработал сабмит формы с именем');
  event.preventDefault();
  //Передаём поля в форму
  userInfo.setUserInfo(editFormProfileName.value, editFormProfileDescription.value);
  //Закрываем форму
  editProfilePopup.close();
}

//Обработчик события для второй формы
const editFormNewCardSubmitHandler = function (event) {
  event.preventDefault();
  //Необходимо создать новую карточку с новыми полями
  const newPlace = { name: editFormPlaceName.value, link: editFormPlaceLink.value };
  //const newPlaceObjectCart = createCardObject(newPlace, cardTemplate, openFullViewPopup);
  //const newPlaceCard = newPlaceObjectCart.createCardDomNode();
  //Добавляем карточку на страницу
  //contentGalleryCardsList.prepend(newPlaceCard);
  section.addItem(newPlace);
  createCardPopup.close();
}
//Дебажим класс PopupWithImage
const popupWithImage = new PopupWithImage('.image-popup');

//Дебажим класс PopupWithForm
const editProfilePopup = new PopupWithForm('.edit-form_type_profile', editFormSubmitHandler);
const createCardPopup = new PopupWithForm('.edit-form_type_place', editFormNewCardSubmitHandler);

//Создаём экземпляр UserInfo
const userInfo = new UserInfo('.profile__name', '.profile__description');

//Обработчик для первичного заполнения полей и открытия
//Попапа изменения профиля
const openPopupProfileHandler = function () {
  //Заполняем поля формы
  const profileData = userInfo.getUserInfo();
  editFormProfileName.value = profileData.userName;
  editFormProfileDescription.value = profileData.userDescription;
  //Предварительно удаляем старые ошибки
  profileValidation.resetFormInputError();
  //Открываем форму
  editProfilePopup.open();
  //Выставляем актуальное состояние кнопки сохранения
  profileValidation.checkFormButtonState();
}

//Обработчик для первичного заполнения полей и открытия
//Попапа добавления новой карточки
const openPopupNewCardHandler = function () {
  //Предварительно удаляем старые ошибки
  placeValidation.resetFormInputError();
  //Открываем попап
  createCardPopup.open();
  //Выставляем актуальное состояние кнопки сохранения
  placeValidation.checkFormButtonState();
}

//Вешаем слушателей на открытие и первого попапа
editButton.addEventListener('click', openPopupProfileHandler);
//Вешаем слушателей на открытие и закрытие второго попапа
addCardButton.addEventListener('click', openPopupNewCardHandler);


//Колбек отрисовки карточки. Создаёт карточку и добавляет её в контейнер
const renderer = (item, container) => {
  //Биндим контекст на объекте. А то потеряется, проверено.
  const card = createCardObject(item, cardTemplate, popupWithImage.open.bind(popupWithImage));
  const cardDomNode = card.createCardDomNode();
  container.prepend(cardDomNode);
}

//Создаём экземпляр Секции
const section = new Section({initialCards, renderer}, contentGallerySelector);
//Рендерим начальные карточки
section.renderAllElements();

//Активируем валидацию
profileValidation.enableValidation();
placeValidation.enableValidation();
