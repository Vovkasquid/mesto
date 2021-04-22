//Проводим необходимые импорты
import {initialCards} from './utils/initial-cards.js';
import {validationConfig} from './utils/validate.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import { editFormContainer, editFormNewPlaceContainer,
  editButton, addCardButton, editFormProfileName,
  editFormProfileDescription, cardTemplate, contentGallerySelector } from './utils/constants.js';
import '../pages/index.css'; //стили для вебпака

const profileValidation = createFormValidatorItem(validationConfig, editFormContainer);
const placeValidation = createFormValidatorItem(validationConfig, editFormNewPlaceContainer);

//Функция создание объекта валидации
function createFormValidatorItem (config, formElement) {
  return new FormValidator(config, formElement);
}

//Функция создания объекта класса Card
function createCardItem(placeData, templateCard, openFullViewPopup) {
  return new Card(placeData, templateCard, openFullViewPopup);
}

//Обработчик события для закрытия первой формы
const editFormSubmitHandler = function  ({editProfileName, editProfileDescription}) {
  //Передаём поля в форму
  userInfo.setUserInfo(editProfileName, editProfileDescription);
  //Закрываем форму
  editProfilePopup.close();
}

//Обработчик события для второй формы
const editFormNewCardSubmitHandler = function ({editPlaceName, editLinkPlace}) {
  //Необходимо создать новую карточку с новыми полями
  const newPlace = { name: editPlaceName, link: editLinkPlace };
  //Добавляем элемент на страницу
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
  const card = createCardItem(item, cardTemplate, popupWithImage.open.bind(popupWithImage));
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
