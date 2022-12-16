import { toggleLikeCard, deleteCard, previewImage } from "./index.js";

export default class Card {
  constructor(data, templateSelector) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card__item")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners(element, cardImage) {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", toggleLikeCard);
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", deleteCard);
    cardImage.addEventListener("click", () =>
      previewImage(this._cardLink, this._cardName)
    );
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");

    cardImage.src = this._cardLink;
    cardImage.alt = this._cardName;
    cardTitle.textContent = this._cardName;

    this._setEventListeners(this._element, cardImage);

    return this._element;
  }
}
