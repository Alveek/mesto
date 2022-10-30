let profileEditButton = document.querySelector('.profile__edit-button');
let popupElem = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let nameInput = document.querySelector('.form__input_user_name');
let jobInput = document.querySelector('.form__input_user_job');
let formElem = document.querySelector('.form');

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function onOpen(popup) {
  popup.classList.add('popup_opened');
}

function onClose(popup) {
  popup.classList.remove('popup_opened');
}

function handlePopupDisplay(event) {
  const isOverlay = event.target.classList.contains('popup_opened');
  const isCloseButton = event.target.classList.contains('popup__close-button');

  if (isOverlay || isCloseButton) {
    onClose(popupElem);
  }
}

profileEditButton.addEventListener('click', () => {
  onOpen(popupElem);
});

function formSubmitHandler(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  onClose(popupElem);
}

popupElem.addEventListener('click', function (event) {
  handlePopupDisplay(event);
});

formElem.addEventListener('submit', formSubmitHandler);