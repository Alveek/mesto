import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmitForm}) {
    super({popupSelector});
    this._form = popupSelector.querySelector('form[name]');
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__input');
    this._formData = {};
    this._inputList.forEach(input => this._formData[input.name] = input.value);
    return this._formData;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
