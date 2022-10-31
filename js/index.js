let profileEditButton = document.querySelector('.profile__edit-button');
let popupElem = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let nameInput = document.querySelector('.form__input_user_name');
let jobInput = document.querySelector('.form__input_user_job');
let formElem = document.querySelector('.form');

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function closePopup() {
  popupElem.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

profileEditButton.addEventListener('click', () => {
  popupElem.classList.add('popup_opened');
});

popupElem.addEventListener('click', function (event) {
  if (event.target.classList.contains('popup__close-button')) {
    closePopup();
  }
})

formElem.addEventListener('submit', formSubmitHandler);