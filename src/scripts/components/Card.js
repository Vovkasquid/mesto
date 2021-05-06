export default class Card {
  //конструктор - данные, темплейт, колбек openFullViewPopup (открытие фуллвь попапа)
  constructor(placeData, templateCard, openFullViewPopup, userID, deleteCardCallback, likeCardCallback) {
    this._placeData = placeData;
    this._templateCard = templateCard;
    this._openFullViewPopup = openFullViewPopup;
    this._likeCounterSelector = '.card__like-counter';
    this._userID = userID;
    this._deleteCardCallback = deleteCardCallback;
    this._isLiked = false;
    this._likeCardCallback = likeCardCallback;
  }
  //Публичный метод один - возвращает элемент карточки
  //Функция создания карточки (Публичный метод)
  createCardDomNode() {
    /*Создаём временные переменне. newCard для заполнения новой карточки
    и cardDescription и CardPhoto - элементы новых карточек*/
    this._newCard = this._templateCard.content.cloneNode(true);
    this._cardDescription = this._newCard.querySelector('.card__description');
    this._cardPhoto = this._newCard.querySelector('.card__photo');
    this._likeCounter = this._newCard.querySelector(this._likeCounterSelector);
    //Заполняем поля новой карточки элементами поступившего в функцию объекта
    this._cardDescription.textContent = this._placeData.name;
    this._cardPhoto.src = this._placeData.link;
    this._cardPhoto.alt = this._placeData.name;
    //устанавливаем количество лайков
    this._likeCounter.textContent = this._placeData.likes.length;
    //Навешиваем слушателей на карточку
    this._addCardsListeners();
    //Проверяем надо ли скрывать корзину
    if (this._userID !== this._placeData.owner._id) {
      this._deleteCardBtn.classList.add('card__delete-button_type_invisible');
    }
    //Нужно понять есть ли мой лайк в карточке
    //Для этого нужно перебрать массив лайков и сравнить ID лайкателя
    //Если есть мой лайк, красим сердце
    //массив лайков лежит в this._placeData.likes
    //внутри массива объекты. В объекте есть поле _id. Оно нам и нужно
    this._placeData.likes.forEach(person => {
      if (person._id === this._userID) {
        //Если айди совпал с моим, рендерю лайк
        this._toggleLikeButton();
        //Записываем, что лайк есть
        this._isLiked = true;
      }
    });
    //Возвращаем карточку
    return this._newCard;
  }

  //Функция рендера лайка
  _toggleLikeButton = () => {
    this._likeBtn.classList.toggle('card__like-button_status_active');
  }

  //Функция выставляющая количество лайков
  setLikeCounter (number) {
    this._likeCounter.textContent = number;
  }

  //Обработчик клика по лайку
  _likeButtonHandler = () => {
    //Красим или наоборот обесцвечиваем лайк
    this._toggleLikeButton();
    //меняем статус лайка
    this._isLiked = !this._isLiked;
    //Вызываем колбек, который сделает запрос на сервер
    //и либо удалит лайк, либо поставит
    //В колбек передаём this, чтобы он смог асинхронно изменить количество лайков
     this._likeCardCallback(this._isLiked, this._placeData, this);
  }

  //Публичный метод локального удаления карточки
  deleteCard = (evt) => {
    //Вытаскиваем карточку из таргета
    const target = evt.target;
    const card = target.closest('.card');
    card.remove();
}

  //Обработчик удаления карточки
  _deleteCardHandler = (evt) => {
    evt.preventDefault();
    //Передаём необходимые данные в колбек
    //Вторым параметром передадим this (экземпляр объекта)
    //Чтобы колбек мог вызвать публичный метод deleteCard
    //evt прокидываем, чтобы потом удалить карточку в методе deleteCard
    this._deleteCardCallback(this._placeData, this, evt);
  }

  //Обработчик открывания попапа с фулвью попапом передан колбеком
  //Функция навешивания слушателей на кнопки карточки
  _addCardsListeners() {
    this._likeBtn = this._newCard.querySelector('.card__like-button');
    this._likeBtn.addEventListener('click', this._likeButtonHandler);
    this._deleteCardBtn = this._newCard.querySelector('.card__delete-button');
    this._deleteCardBtn.addEventListener('click', this._deleteCardHandler);
    this._cardPhoto.addEventListener('click', this._openFullViewPopup);
  }
}
