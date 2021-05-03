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
}
