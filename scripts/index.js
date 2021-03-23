//Получаем Попап с редактированием профиля
const editForm = document.querySelector('.edit-form_type_profile');
//Получаем Попап с добавление карточки
const editFormNewPlace = document.querySelector('.edit-form_type_place');
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
//Получаем поля ввода второго Попапа
const editFormPlaceName = document.querySelector('.edit-form__info-input_type_place');
const editFormPlaceLink = document.querySelector('.edit-form__info-input_type_link');
//Получаем Темплейт карточки
const cardTemplate = document.querySelector('.card-template');
//Получаем список с карточками
const contentGalleryCardsList = document.querySelector('.content-gallery__cards');
//Получаем изображение и описание фуллвью попапа + сам попап
const fullViewPopupImg = document.querySelector('.image-popup__picture');
const fullViewPopupDescr = document.querySelector('.image-popup__description');
const fullViewPopup = document.querySelector('.image-popup');
//Получаем кнопку закрытия фуллвью попапа
const fullViewPopupCloseBtn = document.querySelector('.image-popup__close-button');

//Функция открытия любого попапа
function openPopup(popup) {
  popup.classList.add('popup_status_active');
}

//Функция закрытия любого попапа
function closePopup(popup) {
  popup.classList.remove('popup_status_active');
}

//Функция создания карточки
function createCardDomNode(item) {
  /*Создаём временные переменне. newCard для заполнения новой карточки
  и cardDescription и CardPhoto - элементы новых карточек*/
  const newCard = cardTemplate.content.cloneNode(true);
  const cardDescription = newCard.querySelector('.card__description');
  const cardPhoto = newCard.querySelector('.card__photo');
  //Заполняем поля новой карточки элементами поступившего в функцию объекта
  cardDescription.textContent = item.name;
  cardPhoto.src = item.link;
  cardPhoto.alt = item.name;
  //Навешиваем слушателей на карточку
  addCardsListeners(newCard);
  //Возвращаем карточку
  return newCard;
}

//Функция выставления лайка
function toggleLikeButton(evt) {
  const likeBtn = evt.target;
  likeBtn.classList.toggle('card__like-button_status_active');
}

//Обработчик удаления карточки
function deleteCard(evt) {
  //Вытаскиваем карточку из таргета
  const target = evt.target;
  const card = target.closest('.card');
  card.remove();
}

//Обработчик открывания попапа с фулвью попапом
function openFullViewPopup(evt) {
  const target = evt.target;
  //Заполняем атрибуты попапа
  fullViewPopupImg.src = target.src;
  fullViewPopupImg.alt = target.alt;
  fullViewPopupDescr.textContent = target.alt;
  //показываем попап
  openPopup(fullViewPopup);
}

//Функция навешивания слушателей на кнпоки карточки
function addCardsListeners(card) {
  const likeBtn = card.querySelector('.card__like-button');
  likeBtn.addEventListener('click', toggleLikeButton);
  const deleteCardBtn = card.querySelector('.card__delete-button');
  deleteCardBtn.addEventListener('click', deleteCard);
  const cardImage = card.querySelector('.card__photo');
  cardImage.addEventListener('click', openFullViewPopup);
}

//Функция отрисовки карточки на странице
function renderInitialCards() {
  const result = initialCards.map(function (item){
    const card = createCardDomNode(item);
    return card;
  });
  contentGalleryCardsList.append(...result);
}

//Обработчик для первичного заполнения полей и открытия
//Попапа изменения профиля
function openPopupProfileHandler (popupOpen) {
  //Заполняем поля формы
  editFormProfileName.value = profileName.textContent;
  editFormProfileDescription.value = profileDescription.textContent;
  openPopup(popupOpen);
}

//Обработчик для первичного заполнения полей и открытия
//Попапа добавления новой карточки
function openPopupNewCardHandler (popupOpen) {
  //Предварительно очищаем поля ввода от возможных
  //Старых значений
  editFormPlaceName.value = "";
  editFormPlaceLink.value = "";
  //Открываем попап
  openPopup(popupOpen);
}
//Обработчик события для закрытия первой формы
function editFormSubmitHandler (event) {
  event.preventDefault();
  //Передаём поля в форму
  profileName.textContent = editFormProfileName.value;
  profileDescription.textContent = editFormProfileDescription.value;
  //Закрываем форму
  closePopup(editForm);
}

//Обработчик события для второй формы
function editFormNewCardSubmitHandler (event) {
  event.preventDefault();
  //Необходимо создать новую карточку с новыми полями
  const newPlace = { name: editFormPlaceName.value, link: editFormPlaceLink.value };
  const newPlaceCard = createCardDomNode(newPlace);
  //Добавляем карточку на страницу
  contentGalleryCardsList.prepend(newPlaceCard);
  closePopup(editFormNewPlace);
}

//Рендерим начальные карточки
renderInitialCards();
//Вешаем слушателей на открытие и закрытие первого попапа
editButton.addEventListener('click', () => {openPopupProfileHandler(editForm);});
closePopupProfileButton.addEventListener('click', () => {closePopup(editForm);});
//Вешаем слушателей на открытие и закрытие второго попапа
addCardButton.addEventListener('click', () => {openPopupNewCardHandler(editFormNewPlace);});
closePopupPlaceButton.addEventListener('click', () => {closePopup(editFormNewPlace);});
//Сохранение первого попапа
editForm.addEventListener('submit', editFormSubmitHandler);
//Сохранение второго попапа
editFormNewPlace.addEventListener('submit', editFormNewCardSubmitHandler);
//Закрытие фуллвьюпопапа
fullViewPopupCloseBtn.addEventListener('click', () => {closePopup(fullViewPopup)});

//Активируем валидацию
enableValidation({
  formSelector: '.edit-form__form-container',
  inputSelector: '.edit-form__info-input',
  submitButtonSelector: '.edit-form__submit-button',
  inactiveButtonClass: 'edit-form__submit-button_disabled',
  inputErrorClass: 'edit-form__info-input_error',
  errorClass: 'edit-form__error-text_active'
});
