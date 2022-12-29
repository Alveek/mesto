export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    // document.addEventListener('keydown', closePopupByEsc);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    // document.removeEventListener('keydown', closePopupByEsc);
  }

  // _handleEscClose(event) {
  //   if (event.key === 'Escape') {
  //     const currentOpenedPopup = document.querySelector('.popup_opened');
  //     closePopup(currentOpenedPopup);
  //   }
  // }

  setEventListeners() {
    this._popupSelector.forEach((popup) => {
      console.log(popup);
      popup.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup_opened')) {
          this.close(popup);
        }
      });
    });
  }
}
