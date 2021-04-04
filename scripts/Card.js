class Card {
  //конструктор - данные, темплейт, колбек openFullViewPopup (открытие фуллвь попапа)
  constructor(placeData, templateCard, openFullViewPopup) {
    this._placeData = placeData;
    this._templateCard = templateCard;
    this._openFullViewPopup = openFullViewPopup;

  }
  //Публичный метод один - возвращает элемент карточки
  //Функция создания карточки (Публичный метод)
  createCardDomNode() {
    /*Создаём временные переменне. newCard для заполнения новой карточки
    и cardDescription и CardPhoto - элементы новых карточек*/
    this._newCard =this._templateCard.content.cloneNode(true);
    this._cardDescription = this._newCard.querySelector('.card__description');
    this._cardPhoto = this._newCard.querySelector('.card__photo');
    //Заполняем поля новой карточки элементами поступившего в функцию объекта
    this._cardDescription.textContent = this._placeData.name;
    this._cardPhoto.src = this._placeData.link;
    this._cardPhoto.alt = this._placeData.name;
    //Навешиваем слушателей на карточку
    this._addCardsListeners();
    //Возвращаем карточку
    return this._newCard;
  }

  //Функция выставления лайка
  _toggleLikeButton(evt) {
    this._likeBtn = evt.target;
    this._likeBtn.classList.toggle('card__like-button_status_active');
  }

  //Обработчик удаления карточки
  _deleteCard(evt) {
    //Вытаскиваем карточку из таргета
    this._target = evt.target;
    this._card = target.closest('.card');
    this._card.remove();
  }

  //Обработчик открывания попапа с фулвью попапом передан колбеком

  //Функция навешивания слушателей на кнопки карточки
  _addCardsListeners() {
    this._likeBtn = this._newCard.querySelector('.card__like-button');
    this._likeBtn.addEventListener('click', this._toggleLikeButton);
    this._deleteCardBtn = this._newCard.querySelector('.card__delete-button');
    this._deleteCardBtn.addEventListener('click', this._deleteCard);
    this._cardImage = this._newCard.querySelector('.card__photo');
    this._cardImage.addEventListener('click', this._openFullViewPopup);
  }

  //Пример объекта на вход
  /* name: 'Лыткарино',
    link: 'https://sun9-35.userapi.com/impg/5dNmV-IcN0BafK_xK8xv2XT1ulh2NO9YJBTvqQ/dImxq2hEho4.jpg?size=2560x1707&quality=96&sign=28edc76e95462d7a0ac529e9bc21d0f1&type=album'
  */
}
