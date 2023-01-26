export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.card__item').cloneNode(true);
    return this._cardElement;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _toggleLikeCard() {
    this.classList.toggle('card__like-button_liked');
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', this._toggleLikeCard);
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._deleteCard());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardName, this._cardLink));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardLikeCounter = this._element.querySelector('.card__like-counter');

    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardTitle.textContent = this._cardName;
    this._cardLikeCounter.textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }
}
