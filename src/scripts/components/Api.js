export default class Api {

  constructor({baseUrl, headers}) {
  this._baseUrl = baseUrl;
  this._headers = headers;
  }

  getUserInformation() {
    //Получаем Промис с данными от сервера
    const userInfoPromise = fetch(`${this._baseUrl}/users/me`,{
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        //Проверяем успешен ли запрос
        if (res.ok) {
          return res.json();
        }
        //Если условие не выполнено, то делаем промис с ошибкой
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    //Отдаём промис выше
    return userInfoPromise;
  }

  getInitialCards() {
    const initialCardPromise = fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        //Проверяем успешен ли запрос
        if (res.ok) {
          return res.json();
        }
        //Если условие не выполнено, то делаем промис с ошибкой
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    //Отдаём промис
    return initialCardPromise;
  }

  editProfile(userName, userAbout) {
    const editProfilePromise = fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    })
      .then(res => {
        //Проверяем успешен ли запрос
        if (res.ok) {
          return res.json();
        }
        //Если условие не выполнено, то делаем промис с ошибкой
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    //Отдаём промис
    return editProfilePromise;
  }

  editAvatar(userAvatar) {
    const editAvatarePromise = fetch(`${this._baseUrl}/users/me/avatar `, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userAvatar
      })
    })
      .then(res => {
        //Проверяем успешен ли запрос
        if (res.ok) {
          return res.json();
        }
        //Если условие не выполнено, то делаем промис с ошибкой
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    //Отдаём промис
    return editAvatarePromise;
  }

  addCard(placeName, pictureLink) {
    const addCardPromise = fetch(`${this._baseUrl}/cards `, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: placeName,
        link: pictureLink
      })
    })
      .then(res => {
        //Проверяем успешен ли запрос
        if (res.ok) {
          return res.json();
        }
        //Если условие не выполнено, то делаем промис с ошибкой
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    //Отдаём промис
    return addCardPromise;
  }

  removeCard(cardID) {
    const removeCardPromise = fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        //Проверяем успешен ли запрос
        if (res.ok) {
          return res.json();
        }
        //Если условие не выполнено, то делаем промис с ошибкой
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    //Отдаём промис
    return removeCardPromise;
  }

  addLike(cardID) {
    const addLikePromise = fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => {
        //Проверяем успешен ли запрос
        if (res.ok) {
          return res.json();
        }
        //Если условие не выполнено, то делаем промис с ошибкой
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    //Отдаём промис
    return addLikePromise;
  }

  removeLike(cardID) {
    const removeLikePromise = fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        //Проверяем успешен ли запрос
        if (res.ok) {
          return res.json();
        }
        //Если условие не выполнено, то делаем промис с ошибкой
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    //Отдаём промис
    return removeLikePromise;
  }
}
