let profileEditButton = document.querySelector('.profile__edit-button');
let popupElem = document.querySelector('.popup');

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

popupElem.addEventListener('click', function (event) {
  handlePopupDisplay(event);
});
