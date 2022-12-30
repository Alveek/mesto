import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
  }

  _getInputValues() {

  }

  setEventListeners() {
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}
