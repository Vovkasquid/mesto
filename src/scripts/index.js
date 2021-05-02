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
/*
//Создаём экземпляр Секции
const section = new Section({initialCards, renderer}, contentGallerySelector);
//Рендерим начальные карточки
section.renderAllElements();*/

//Активируем валидацию
profileValidation.enableValidation();
placeValidation.enableValidation();

//Зона свободная от логики, тут проверяю код

//Токен: 07ccc369-ef7d-4b71-a2f4-33043b0ad800
// Идентификатор группы: cohort-23

//TODO переделать вызов констуктора
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '07ccc369-ef7d-4b71-a2f4-33043b0ad800',
    'Content-Type': 'application/json'
  }
});

//const api = new Api(token, cohordID);
const userInfoPromise = api.getUserInformation();
userInfoPromise.then(data => {
  console.log(`userID = ${data._id}`);
  console.log(data);
  /*name: "Jacques Cousteau",
  about: "Sailor, researcher",
  avatar: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
  _id: "518e2d17af43d2b3f0d5031a",
  cohort: "cohort-23"*/
});

//Установить Юзера на страницу
userInfoPromise.then(data => {
  updateUserInformation(data.name, data.about, data.avatar);
  //userInfo.setUserInfo(data.name, data.about);
  //userInfo.setUserAvatar(data.avatar);
})
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

//Зона работы в получением карточки
const initialCardFromServer = api.getInitialCards();
initialCardFromServer.then(data => {
  console.log('карточки');
  console.log(data);
  //Создаём экземпляр Секции
  const section = new Section({data, renderer}, contentGallerySelector);
//Рендерим начальные карточки
  section.renderAllElements();
})
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
