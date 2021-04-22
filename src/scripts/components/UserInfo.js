export default class UserInfo {
  constructor(selectorName, selectorDescription) {
  //Получаем селекторы имени пользователя и описания. Сразу найдём эти элементы и запишем
  //в приватные свойства
    this._nameElement = document.querySelector(selectorName);
    this._descriptionElement = document.querySelector(selectorDescription);
  }

  //Метод, возвращающий данные пользователя
  getUserInfo() {
    return {userName: this._nameElement.textContent, userDescription: this._descriptionElement.textContent};
  }

  //Метод, устанавливающий новые данные пользователя
  setUserInfo(userName, userDescription) {
    this._nameElement.textContent = userName;
    this._descriptionElement.textContent = userDescription;
  }
}
