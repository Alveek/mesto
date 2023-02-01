import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({
    popupSelector,
    handleSubmitForm
  }) {
    super({ popupSelector });
    this._form = this._popupSelector.querySelector('form[name]');
    this._handleSubmitForm = handleSubmitForm;
  }

  open(id, cardElement)  {
    this._cardId = id;
    this._cardElement = cardElement;
    super.open();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._cardId, this._cardElement);
    });
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}
