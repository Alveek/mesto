const profileEditButton = document.querySelector('.profile__edit-button');
const popupElem = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.form__input_user_name');
const jobInput = document.querySelector('.form__input_user_job');
const formElem = document.querySelector('.form');

function addDataToForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function changeProfileInfo() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function closePopup() {
  popupElem.classList.remove('popup_opened');
}

function openPopup() {
  popupElem.classList.add('popup_opened');
}

function handleFormSubmit(event) {
  event.preventDefault();
  changeProfileInfo();
  closePopup();
}

profileEditButton.addEventListener('click', () => {
  addDataToForm();
  openPopup();
});

popupElem.addEventListener('click', function (event) {
  if (event.target.classList.contains('popup__close-button')) {
    closePopup();
  }
})

formElem.addEventListener('submit', handleFormSubmit);