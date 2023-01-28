export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteCardClick) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._myId = "566e2a3d42321cf23bda3bad";
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
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

  _showDeleteButton() {
    if (this._ownerId && this._ownerId !== this._myId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', this._toggleLikeCard);
    this._deleteButton ? this._deleteButton
      .addEventListener('click', () => this._handleDeleteCardClick(this._id, this._element)) : null;
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardName, this._cardLink));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardLikeCounter = this._element.querySelector('.card__like-counter');
    this._deleteButton = this._element.querySelector('.card__delete-button');

    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardTitle.textContent = this._cardName;
    this._cardLikeCounter.textContent = this._likes.length;
    this._showDeleteButton();
    this._setEventListeners();

    return this._element;
  }
}
