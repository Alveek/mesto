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

  open(id)  {
    this._cardId = id;
    super.open();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._cardId);
    });
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}
