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
//Получаем изображение и описание фуллвью попапа + сам попап + контейнер
const fullViewPopupImg = document.querySelector('.image-popup__picture');
const fullViewPopupDescr = document.querySelector('.image-popup__description');
const fullViewPopup = document.querySelector('.image-popup');
const fullViewPopupContainer = fullViewPopup.querySelector('.image-popup__container');
//Получаем кнопку закрытия фуллвью попапа
const fullViewPopupCloseBtn = document.querySelector('.image-popup__close-button');

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
function openPopupProfileHandler () {
  //Заполняем поля формы
  editFormProfileName.value = profileName.textContent;
  editFormProfileDescription.value = profileDescription.textContent;
  //Предварительно удаляем старые ошибки
  resetFormInputError(editForm);
  //Открываем форму
  openPopup(editForm);
  //Выставляем актуальное состояние кнопки сохранения
  checkFormButtonState(editForm, inputListEditForm);
}

//Обработчик для первичного заполнения полей и открытия
//Попапа добавления новой карточки
function openPopupNewCardHandler () {
  //Предварительно очищаем поля ввода от возможных
  //Старых значений
  editFormPlaceName.value = "";
  editFormPlaceLink.value = "";
  //Предварительно удаляем старые ошибки
  resetFormInputError(editFormNewPlace)
  //Открываем попап
  openPopup(editFormNewPlace);
  //Выставляем актуальное состояние кнопки сохранения
  checkFormButtonState(editFormNewPlace, inputListEditFormNewPlace);
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
//Активируем валидацию
enableValidation(validationConfig);
