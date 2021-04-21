//Проводим необходимые импорты
import {initialCards} from './utils/initial-cards.js';
import {validationConfig} from './utils/validate.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
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
const closePopupProfileButton = editForm.querySelector('.edit-form__close-button_type_profile');
//Получаем кнопку закрытия Попапа с добавлением карточки
const closePopupPlaceButton = editFormNewPlace.querySelector('.edit-form__close-button_type_place');
//Получаем текущее имя профиля
const profileName = document.querySelector('.profile__name');
//Получаем текущее описание профиля
const profileDescription = document.querySelector('.profile__description');
//Получаем поля ввода первого Попапа
const editFormProfileName = document.querySelector('.edit-form__info-input_type_name');
const editFormProfileDescription = document.querySelector('.edit-form__info-input_type_description');
//Получаем список всех полей попапа editForm
const inputListEditForm = Array.from(editForm.querySelectorAll('.edit-form__info-input'));
//Получаем список всех полей попапа editFormNewPlace
const inputListEditFormNewPlace = Array.from(editFormNewPlace.querySelectorAll('.edit-form__info-input'));
//Получаем поля ввода второго Попапа
const editFormPlaceName = document.querySelector('.edit-form__info-input_type_place');
const editFormPlaceLink = document.querySelector('.edit-form__info-input_type_link');
//Получаем Темплейт карточки
const cardTemplate = document.querySelector('.card-template');
//Получаем список с карточками
const contentGalleryCardsList = document.querySelector('.content-gallery__cards');
//Сохраним селектор списка с карточками
const contentGallerySelector = '.content-gallery__cards';
//Получаем изображение и описание фуллвью попапа + сам попап + контейнер
const fullViewPopupImg = document.querySelector('.image-popup__picture');
const fullViewPopupDescr = document.querySelector('.image-popup__description');
const fullViewPopup = document.querySelector('.image-popup');
const fullViewPopupContainer = fullViewPopup.querySelector('.image-popup__container');
//Получаем кнопку закрытия фуллвью попапа
const fullViewPopupCloseBtn = document.querySelector('.image-popup__close-button');
//Получаем объекты класса валидации
const profileValidation = createFormValidatorObj(validationConfig, editFormContainer);
const placeValidation = createFormValidatorObj(validationConfig, editFormNewPlaceContainer);

//Функция создание объекта валидации
function createFormValidatorObj (config, formElement) {
  return new FormValidator(config, formElement);
}
//Функция открытия любого попапа
function openPopup(popup) {
  //Навешиваем слушатель на документ, чтобы отлавливать нажатия клавиатуры и закрывать попап
  setKeyboardEscListener();
  //Навешиваем слушатель на документ, чтобы отлавливать клики по оверлею
  setClickOverlayDocumentListener();
  popup.classList.add('popup_status_active');
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

//Обработчик открывания попапа с фулвью попапом
const openFullViewPopup = function (evt) {
  const target = evt.target;
  //Заполняем атрибуты попапа
  fullViewPopupImg.src = target.src;
  fullViewPopupImg.alt = target.alt;
  fullViewPopupDescr.textContent = target.alt;
  //показываем попап
  openPopup(fullViewPopup);
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

//Функция, останавливающая всплытие клика на контейнере
function stopPopupPropagation(event) {
  event.stopPropagation();
}

//Функция, навешивающая слушатель клика на контейнер
function setFormContainerListener(container) {
  container.addEventListener('click', stopPopupPropagation);
}

//Функция создания объекта класса Card
function createCardObject(placeData, templateCard, openFullViewPopup) {
  return new Card(placeData, templateCard, openFullViewPopup);
}
//Функция отрисовки карточки на странице
function renderInitialCards() {
  const result = initialCards.map(function (item) {
    const card = createCardObject(item, cardTemplate, openFullViewPopup);
    return card.createCardDomNode();
  });
  contentGalleryCardsList.append(...result);
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

/*
//Сохранение первого попапа
editForm.addEventListener('submit', editProfilePopup.close.bind(editProfilePopup));
//Сохранение второго попапа
editFormNewPlace.addEventListener('submit', createCardPopup.close.bind(createCardPopup));*/

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

/*
//Дебажим UserInfo
const userInfo = new UserInfo('.profile__name', '.profile__description');
console.log(userInfo.getUserInfo());
userInfo.setUserInfo('Вася Иванов', 'Разработчик');
*/


/*
//Дебажим класс Popup
const testPopup = new Popup('.edit-form_type_profile');
testPopup.open();

 */
/*
//Рендерим начальные карточки
renderInitialCards();
//Вешаем слушателей на открытие и закрытие первого попапа
editButton.addEventListener('click', openPopupProfileHandler);
closePopupProfileButton.addEventListener('click', () => {closePopup(editForm);});
//Вешаем слушателей на открытие и закрытие второго попапа
addCardButton.addEventListener('click', openPopupNewCardHandler);
closePopupPlaceButton.addEventListener('click', () => {closePopup(editFormNewPlace);});
//Сохранение первого попапа
editForm.addEventListener('submit', editFormSubmitHandler);
//Сохранение второго попапа
editFormNewPlace.addEventListener('submit', editFormNewCardSubmitHandler);
//Закрытие фуллвьюпопапа
fullViewPopupCloseBtn.addEventListener('click', () => {closePopup(fullViewPopup)});
//Навешиваем слушателей на контейнеры, чтобы они останавливали клики по ним
setFormContainerListener(editFormContainer);
setFormContainerListener(editFormNewPlaceContainer);
setFormContainerListener(fullViewPopupContainer);
 */
//Активируем валидацию
profileValidation.enableValidation();
placeValidation.enableValidation();
