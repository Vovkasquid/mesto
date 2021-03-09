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

//Массив с первоначальными карточками
const initialCards = [
  {
    name: 'Лыткарино',
    link: 'https://sun9-35.userapi.com/impg/5dNmV-IcN0BafK_xK8xv2XT1ulh2NO9YJBTvqQ/dImxq2hEho4.jpg?size=2560x1707&quality=96&sign=28edc76e95462d7a0ac529e9bc21d0f1&type=album'
  },
  {
    name: 'Крепость орешек',
    link: 'https://sun9-34.userapi.com/impg/MwRJsBY7hZGQwAcSCgBlVWGkvta2OZEH-IL_Gw/WYba50g-obM.jpg?size=2560x1707&quality=96&sign=0e342caa76313508ec0b0c4d0dd03603&type=album'
  },
  {
    name: 'Репино',
    link: 'https://sun9-31.userapi.com/impg/WBBFmZYr7_pg1CdnBUMUwtm9S4R_BCqUmayRIg/pqnt0-owSKA.jpg?size=2560x1707&quality=96&sign=618914e0a94eb6a5c49b0aa0d304ddb2&type=album'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://sun9-69.userapi.com/impg/ayMQ-7EgZR1Q6KagsDsTzaew1bjPjOds0XrQ4Q/CRRQqErViWE.jpg?size=2560x1707&quality=96&sign=41e29f112a3f8e8875b86f6a881ee975&type=album'
  },
  {
    name: 'Терней',
    link: 'https://sun9-20.userapi.com/impg/T4CEUi9jtBa7LIgAHcdMe_PD8FFnuab9-SvKMQ/ChTyEk9HkEY.jpg?size=2560x1920&quality=96&sign=ca4823a98c7bd4755e34559c59273f39&type=album'
  },
  {
    name: 'Вантовый мост',
    link: 'https://sun9-65.userapi.com/impg/PPWM1zcTf4CaUaqYEExjfgUEokOtZRHTGN2X3g/CEHzEWwZJ8c.jpg?size=2560x1707&quality=96&sign=52fbfed632c675c51876067bf25f685d&type=album'
  }
];

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
  //Возвращаем карточку
  return newCard;
}

//Функция выставления лайка
function toggleLikeButton(evt) {
  const likeBtn = evt.target;
  likeBtn.classList.toggle('card__like-button_status_active');
}

//Функция навешивания слушателей на кнпоки карточки
function addCardsListeners(card) {
  const likeBtn = card.querySelector('.card__like-button');
  likeBtn.addEventListener('click', toggleLikeButton);
}

//Функция отрисовки карточки на странице
function renderInitialCards() {
  const result = initialCards.map(function (item){
    const card = createCardDomNode(item);
    //Навешиваем слушателей на карточку
    addCardsListeners(card);
    return card;
  });
  contentGalleryCardsList.append(...result);
}


//Пишем обработчики, которые потом будут применяться при кликах на кнопки
function openPopupHandler (popupOpen) {
  /*Проверяем какой попап пришёл. Если редактирования имени,то надо предварительно заполнить поля*/
    if (popupOpen.classList.contains('edit-form_type_profile')) {
      editFormProfileName.value = profileName.textContent;
      editFormProfileDescription.value = profileDescription.textContent;
    }
    popupOpen.classList.add('edit-form_status_active');
}

function closePopupHandler (popupClose) {
  popupClose.classList.remove('edit-form_status_active');
}

//Обработчик события для закрытия первой формы
function editFormSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent = editFormProfileName.value;
  profileDescription.textContent = editFormProfileDescription.value;
  closePopupHandler(editForm);
}

//Обработчик события для второй формы
function editFormNewCardSubmitHandler (event) {
  event.preventDefault();
  //Необходимо создать новую карточку с новыми полями
  const newPlace = { name: editFormPlaceName.value, link: editFormPlaceLink.value };
  console.log(editFormPlaceName.value);
  console.log(editFormPlaceLink.value);
  const newPlaceCard = createCardDomNode(newPlace);
  //Добавляем слушателей карточке
  addCardsListeners(newPlaceCard);
  //Добавляем карточку на страницу
  contentGalleryCardsList.prepend(newPlaceCard);
  //Обнуляем поля ввода
  editFormPlaceName.value = "";
  editFormPlaceLink.value = "";
  closePopupHandler(editFormNewPlace);
}

//Рендерим начальные карточки
renderInitialCards();
//Вешаем слушателей на открытие и закрытие первого попапа
editButton.addEventListener('click', () => {openPopupHandler(editForm);});
closePopupProfileButton.addEventListener('click', () => {closePopupHandler(editForm);});
//Вешаем слушателей на открытие и закрытие второго попапа
addCardButton.addEventListener('click', () => {openPopupHandler(editFormNewPlace);});
closePopupPlaceButton.addEventListener('click', () => {closePopupHandler(editFormNewPlace);});
//Сохранение первого попапа
editForm.addEventListener('submit', editFormSubmitHandler);
//Сохранение второго попапа
editFormNewPlace.addEventListener('submit', editFormNewCardSubmitHandler);
