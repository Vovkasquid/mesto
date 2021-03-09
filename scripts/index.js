//Получаем необходимые нам элементы и записываем их в переменные
let editForm = document.querySelector('.edit-form');
let editButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.edit-form__close-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let editFormProfileName = document.querySelector('.edit-form__info-input_type_name');
let editFormProfileDescription = document.querySelector('.edit-form__info-input_type_description');

//Пишем обработчики, которые потом будут применяться при кликах на кнопки
function openPopupHandler () {
  editFormProfileName.value = profileName.textContent;
  editFormProfileDescription.value = profileDescription.textContent;
  editForm.classList.add('edit-form_status_active');
}

function closePopupHandler () {
  editForm.classList.remove('edit-form_status_active');
}

function editFormSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent = editFormProfileName.value;
  profileDescription.textContent = editFormProfileDescription.value;
  closePopupHandler();
}

//Вешаем слушателей на кнопки и форму
editButton.addEventListener('click', openPopupHandler);
closePopupButton.addEventListener('click', closePopupHandler);
editForm.addEventListener('submit', editFormSubmitHandler);
