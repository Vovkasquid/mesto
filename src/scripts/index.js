//Проводим необходимые импорты
import {initialCards} from './utils/initial-cards.js';
import {validationConfig} from './utils/validate.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Api from './components/Api.js';
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
const userInfo = new UserInfo('.profile__name',
  '.profile__description',
  '.profile__avatar'
  );

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

//функция для установки данных о пользователе. Аватар меняем не всегда, поэтому если он null, то не меняем
const updateUserInformation = function (userName, userDescription, userAvatar) {
  userInfo.setUserInfo(userName, userDescription);
  if (userAvatar) {
    userInfo.setUserAvatar(userAvatar);
  }
}

//Функция получает карточки с сервера и рендерит их
const updateCardList = function () {
  const initialCardFromServer = api.getInitialCards();
  initialCardFromServer.then(data => {
    //Рендерим карточки
    section.renderAllElements(data);
  })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

//Функция, которая получает данные с сервера и первично рендерит данные пользователя
const initializeUser = function () {
  //Необходимо получить данные о пользователе и установить их
//Получаем промис с данными
  const userInfoPromise = api.getUserInformation();
//Обновляем данные пользователя
  userInfoPromise.then(data => {
    updateUserInformation(data.name, data.about, data.avatar);
  })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

//Создаём экземпляр Секции
const section = new Section(renderer, contentGallerySelector);
//Создаём экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '07ccc369-ef7d-4b71-a2f4-33043b0ad800',
    'Content-Type': 'application/json'
  }
});

//Получаем данные с сервера о пользователи и рендерим их
initializeUser();
//Рендерим первоначальные карточки с сервера
updateCardList();

//Активируем валидацию
profileValidation.enableValidation();
placeValidation.enableValidation();

