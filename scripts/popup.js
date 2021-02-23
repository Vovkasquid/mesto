//Получаем необходимые нам элементы и записываем их в переменные
let editForm = document.querySelector('.edit-form');
let editButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.edit-form__close-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

//Пишем обработчики, которые потом будут применяться при кликах на кнопки
function openPopupHandler () {
    document.querySelector('.edit-form__profile-name').value = document.querySelector('.profile__name').textContent;
    document.querySelector('.edit-form__profile-description').value = document.querySelector('.profile__description').textContent;
    editForm.classList.add('edit-form_status_active');
}

function closePopupHandler () {
    editForm.classList.remove('edit-form_status_active');
}

function editFormSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = document.querySelector('.edit-form__profile-name').value;
    profileDescription.textContent = document.querySelector('.edit-form__profile-description').value;
    closePopupHandler();
}

//Вешаем слушателей на кнопки и форму
editButton.addEventListener('click', openPopupHandler);
closePopupButton.addEventListener('click', closePopupHandler);
editForm.addEventListener('submit', editFormSubmitHandler);