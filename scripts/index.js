//Получаем необходимые нам элементы и записываем их в переменные
let editForm = document.querySelector('.edit-form');
let editButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.edit-form__close-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let editFormProfileName = document.querySelector('.edit-form__info-input_type_name');
let editFormProfileDescription = document.querySelector('.edit-form__info-input_type_description');

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
