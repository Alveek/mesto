import Popup from "./Popup.js";
import { logPlugin } from "@babel/preset-env/lib/debug";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector("form[name]");
    this._inputList = this._form.querySelectorAll(".form__input");
    this._handleSubmitForm = handleSubmitForm;
    this._submitButton = this._form.querySelector("button");
    this._initialBtnText = this._submitButton.textContent;
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

  isLoading(loaded) {
    loaded
      ? (this._submitButton.textContent = "Сохранение...")
      : (this._submitButton.textContent = this._initialBtnText);
  }

  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.isLoading(true);
      this._handleSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
