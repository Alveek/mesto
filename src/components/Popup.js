export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this._popupSelector = document.querySelector(".popup_opened");
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.forEach((popup) => {
      popup.addEventListener("mousedown", (event) => {
        this._popupSelector = popup;
        if (event.target.classList.contains("popup__close-button") || event.target.classList.contains("popup_opened")) {
          this.close();
        }
      });
    });
  }
}
