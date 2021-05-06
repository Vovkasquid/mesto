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
  editFormProfileDescription, cardTemplate, contentGallerySelector, editAvatarBtn, avatarFormContainer } from './utils/constants.js';
import '../pages/index.css'; //стили для вебпака

const toggleLoading = (popup, isLoaded) => {
  if (isLoaded) {
    //Сравниваем по ссылку попап
    //Если ссылка ведёт на createCardPopup то необходимо
    //Написать не "сохранить", а создать
    if (popup === createCardPopup) {
      popup.setSubmitBtnText('Создать');
    } else {
      popup.setSubmitBtnText('Сохранить');
    }
  } else {
    popup.setSubmitBtnText('Сохранение...');
  }
}

//Колбек постановки или удаление лайка
const likeCardCallback = (isLiked, cardData, card) => {
  //Если isLiked === true, то надо ставить лайк, иначе снять
  if (isLiked) {
    api.addLike(cardData._id)
      .then(answer => {
        //Устанавливаем новое количество лайков
        card.setLikeCounter(answer.likes.length);
      })
      .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  } else {
    api.removeLike(cardData._id)
      .then(answer => {
        //Устанавливаем новое количество лайков
        card.setLikeCounter(answer.likes.length);
      }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }
}

//Колбек удаления карточки локально и с сервера
const deleteCardCallback = (cardData, card, evt) => {
  //Перезаписываем колбек попапа
  confirmPopup.setSubmitCallback(() => {
    //Просим сервер удалить карту
    api.removeCard(cardData._id)
      .then(data => {
        //Раз мы здесь, значит карточка удалилась с сервера. Удаляем теперь её локально
        //с помощью переданного в колбек экземпляра
        card.deleteCard(evt);
        //Карточка уже удалена из разметки, можно закрыть попап
        confirmPopup.close();
    })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  });
  //Открываем попап по клику
  confirmPopup.open();
}

//Функция создание объекта валидации
function createFormValidatorItem (config, formElement) {
  return new FormValidator(config, formElement);
}

//Функция создания объекта класса Card
function createCardItem(placeData, templateCard, openFullViewPopup, userID, deleteCardCallback, likeCardCallback) {
  return new Card(placeData, templateCard, openFullViewPopup, userID, deleteCardCallback, likeCardCallback);
}

//Обработчик события для закрытия первой формы
const editFormSubmitHandler = function  ({editProfileName, editProfileDescription}) {
  //Меняем текст на кнопке сабмита
  toggleLoading(editProfilePopup, false);
  //Отправляем новый данные на сервер
  api.editProfile(editProfileName, editProfileDescription)
    .then(answer => {
    //Раз мы здесь, значит данные установились и пришёл ответ с новыми данными
    //Установим их по серверу, а не по локальным данным
    userInfo.setUserInfo(answer.name, answer.about);
    //Закрываем форму
    editProfilePopup.close();
  })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      toggleLoading(editProfilePopup, true);
    });
}

//Обработчик события для второй формы
const editFormNewCardSubmitHandler = function ({editPlaceName, editLinkPlace}) {
  //Меняем текст на кнопке сабмита
  toggleLoading(createCardPopup, false);
  //Необходимо создать новую карточку с новыми полями
  //Надо добавить страницу на сервер, а потом отрендерить локально
  api.addCard(editPlaceName, editLinkPlace)
    .then(newPlace => {
      //Если мы здесь, значит запрос добавления карточки вызван успешно
      //Необходимо отрендерить карточку локально
      section.addItem(newPlace);
      //Попап необходимо закрывать здесь же, чтобы
      //Не было ситуации, что попап закрылся, а запрос не выполнен
      createCardPopup.close();
    })
    .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
    .finally(() => {
      toggleLoading(createCardPopup, true);
    });
}

//колбек сабмита для попапа редактирования аватара
const editAvatarSubmitHandler = function ({editLinkAvatar}) {
  //Меняем текст на кнопке сабмита
  toggleLoading(editAvatarPopup, false);
  //Забираем из форм данные и отправляем их на сервер
  const editAvatarPromise = api.editAvatar(editLinkAvatar);
  editAvatarPromise
    .then(data => {
      userInfo.setUserAvatar(data.avatar);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      toggleLoading(editAvatarPopup, true);
    });
}

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

//Обработчик открытия попапа редактирования аватара
const openPopupAvatarHandler =  () => {
  //Предварительно удаляем старые ошибки
  avatarValidation.resetFormInputError();
  //Открываем форму
  editAvatarPopup.open();
  //Выставляем актуальное состояние кнопки сохранения
  avatarValidation.checkFormButtonState();
}

//Колбек отрисовки карточки. Создаёт карточку и добавляет её в контейнер
const renderer = (item, container) => {
  //Биндим контекст на объекте. А то потеряется, проверено.
  const card = createCardItem(item, cardTemplate, popupWithImage.open.bind(popupWithImage), userInfo.getUserId(), deleteCardCallback, likeCardCallback);
  const cardDomNode = card.createCardDomNode();
  container.prepend(cardDomNode);
}

//функция для установки данных о пользователе. Аватар меняем не всегда, поэтому если он null/undefined, то не меняем
const updateUserInformation = function (userName, userDescription, userAvatar, userID) {
  userInfo.setUserInfo(userName, userDescription);
  userInfo.setUserId(userID);
  if (userAvatar) {
    userInfo.setUserAvatar(userAvatar);
  }
}

//Функция получает карточки с сервера и рендерит их
const updateCardList = function () {
  const initialCardFromServer = api.getInitialCards();
  initialCardFromServer.then(data => {
    //Карточки с сервера приходят в странном формате, их надо ревёрснуть
    section.renderAllElements(data.reverse());
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
  //Обновляем данные пользователя и возвращаем промис
  return userInfoPromise.then(data => {
    updateUserInformation(data.name, data.about, data.avatar, data._id);
  })
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
//Предварительно вне промиса создаём те объекты
//для создания которых не нужны данные с сервера
//Создаём экземпляры объектов валидации
const profileValidation = createFormValidatorItem(validationConfig, editFormContainer);
const placeValidation = createFormValidatorItem(validationConfig, editFormNewPlaceContainer);
const avatarValidation = createFormValidatorItem(validationConfig, avatarFormContainer);

//Создаём экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage('.image-popup');

//Создаём экземпляры попапов
const editProfilePopup = new PopupWithForm('.edit-form_type_profile', editFormSubmitHandler);
const createCardPopup = new PopupWithForm('.edit-form_type_place', editFormNewCardSubmitHandler);
const editAvatarPopup = new PopupWithForm('.edit-form_type_avatar', editAvatarSubmitHandler);
//Передаём любую функцию, потому что все равно её перезапишем в колбеке
const confirmPopup = new PopupWithForm('.edit-form_type_delete', editAvatarSubmitHandler);

//Создаём экземпляр UserInfo
const userInfo = new UserInfo('.profile__name',
  '.profile__description',
  '.profile__avatar'
);

//Вешаем слушателей на открытие и первого попапа
editButton.addEventListener('click', openPopupProfileHandler);
//Вешаем слушателей на открытие и закрытие второго попапа
addCardButton.addEventListener('click', openPopupNewCardHandler);
//Вешаем слушатель на открытие попапа
editAvatarBtn.addEventListener('click', openPopupAvatarHandler);

//Активируем валидацию
profileValidation.enableValidation();
placeValidation.enableValidation();
avatarValidation.enableValidation();

Promise.all([
  //Передаём Массив промисов, которые необходимо выполнить
  //Ответ будет в массиве данных, по порядку написания промисов
  //Но не по порядку их выполнения
  api.getUserInformation(),
  api.getInitialCards()
])
  .then((values)=>{
    //Попадаем сюда, только когда оба промиса будут выполнены
    //Устанавливаем полученные данные пользователя
    updateUserInformation(values[0].name, values[0].about, values[0].avatar, values[0]._id);
    //Рендерим полученные карточки
    section.renderAllElements(values[1].reverse());
  })
  .catch((err)=>{
    console.log(err);
  })

