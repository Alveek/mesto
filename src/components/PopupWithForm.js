import Popup from './Popup.js';
import {logPlugin} from '@babel/preset-env/lib/debug';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmitForm}) {
    super({popupSelector});
    this._form = this._popupElement.querySelector('form[name]');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._handleSubmitForm = handleSubmitForm;
    this._submitButton = this._form.querySelector('button');
  }

  _getInputValues() {
    this._formData = {};
    this._inputList.forEach((input) => (this._formData[input.name] = input.value));
    return this._formData;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
      this._handleSubmitForm(this._getInputValues())
        .then(() => this.close()).finally(() => this._submitButton.textContent = initialText);
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
