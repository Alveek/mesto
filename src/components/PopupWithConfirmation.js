import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({
    popupSelector,
    handleSubmitForm
  }) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector('form[name]');
    this._handleSubmitForm = handleSubmitForm;
  }

  open(cardEl)  {
    this._cardEl = cardEl;
    super.open();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._cardEl);
    });
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}
