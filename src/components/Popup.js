import {popups} from '../utils/constants.js';

export default class Popup {
  constructor({popupSelector}) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    // this.close = this.close.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    console.log('from close ', this);
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup_opened')) {
        console.log('from listener ', this);
        this.close();
      }
    });
  }
}
