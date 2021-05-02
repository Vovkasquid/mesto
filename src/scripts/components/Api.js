//Токен: 07ccc369-ef7d-4b71-a2f4-33043b0ad800
// Идентификатор группы: cohort-23


/*const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '07ccc369-ef7d-4b71-a2f4-33043b0ad800',
    'Content-Type': 'application/json'
  }
});*/
export default class Api {
  //По пути родим, что надо добавить
  //TODO родить, что надо передавать в конструктор
  constructor({baseUrl, headers}) {
  this._baseUrl = baseUrl;
  this._headers = headers;
  }

  getUserInformation() {
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
      /*.then((result) => {
        console.log(result);
        this._userID = result._id;
        console.log(this._userID);
      });*/

    return userInfoPromise;
  }

  getInitialCard() {

  }
}
