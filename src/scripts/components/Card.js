export default class Card {
  //конструктор - данные, темплейт, колбек openFullViewPopup (открытие фуллвь попапа)
  constructor(placeData, templateCard, openFullViewPopup) {
    this._placeData = placeData;
    this._templateCard = templateCard;
    this._openFullViewPopup = openFullViewPopup;
    this._likeCounterSelector = '.card__like-counter';
  }
  //Публичный метод один - возвращает элемент карточки
  //Функция создания карточки (Публичный метод)
  createCardDomNode() {
    /*Создаём временные переменне. newCard для заполнения новой карточки
    и cardDescription и CardPhoto - элементы новых карточек*/
    this._newCard =this._templateCard.content.cloneNode(true);
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
    this._card = this._target.closest('.card');
    this._card.remove();
  }

  //Обработчик открывания попапа с фулвью попапом передан колбеком

  //Функция навешивания слушателей на кнопки карточки
  _addCardsListeners() {
    this._likeBtn = this._newCard.querySelector('.card__like-button');
    this._likeBtn.addEventListener('click', this._toggleLikeButton);
    this._deleteCardBtn = this._newCard.querySelector('.card__delete-button');
    this._deleteCardBtn.addEventListener('click', this._deleteCard);
    this._cardPhoto.addEventListener('click', this._openFullViewPopup);
  }
}
