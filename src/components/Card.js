export default class Card {
  constructor(data, myId, templateSelector, handleCardClick, handleDeleteCardClick, likeCard, dislikeCard) {
    this.id = data._id;
    this._cardName = data.name;
    this._cardLink = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._myId = myId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._likeCard = likeCard;
    this._dislikeCard = dislikeCard;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card__item")
      .cloneNode(true);
    return this._cardElement;
  }

  deleteCardDOM() {
    this._element.remove();
    this._element = null;
  }

  toggleLikeCard() {
    this._likeButton.classList.toggle("card__like-button_liked");
  }

  updateCounter(data) {
    this._cardLikeCounter.textContent = data.likes.length;
  }

  _showDeleteButton() {
    if (this._ownerId && this._ownerId !== this._myId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.contains("card__like-button_liked") ? this._dislikeCard(this) : this._likeCard(this);
    });

    this._deleteButton ? this._deleteButton.addEventListener("click", () => this._handleDeleteCardClick(this)) : null;

    this._cardImage.addEventListener("click", () => this._handleCardClick(this._cardName, this._cardLink));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardLikeCounter = this._element.querySelector(".card__like-counter");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");

    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardTitle.textContent = this._cardName;
    this._cardLikeCounter.textContent = this._likes.length;
    this._likes.some((item) => item._id === this._myId)
      ? this._likeButton.classList.add("card__like-button_liked")
      : null;
    this._setEventListeners();
    this._showDeleteButton();

    return this._element;
  }
}
