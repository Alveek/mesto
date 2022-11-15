import { initialCards } from "./cards-data.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_profile-info");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupImagePreview = document.querySelector(".popup_type_image-preview");
const popupImage = document.querySelector(".popup__image");
const popupImageText = document.querySelector(".popup__image-description");
const profileNameText = document.querySelector(".profile__name");
const profileJobText = document.querySelector(".profile__job");
const profileNameInput = document.querySelector(".form__input_user_name");
const profileJobInput = document.querySelector(".form__input_user_job");
const formProfile = document.querySelector(".form_type_profile");
const formNewCard = document.querySelector(".form_type_new-card");
const cardsContainer = document.querySelector(".card__items");
const cardName = document.querySelector(".form__input_card_name");
const cardLink = document.querySelector(".form__input_card_link");
const cardTemplate = document.querySelector("#card-template").content;


//Чтобы при открытии страницы не мелькали попапы, после загрузки содержимого у попапов удаляется класс скрывающий их
window.addEventListener("DOMContentLoaded", (event) => {
  popups.forEach(popup => popup.classList.remove("popup_hidden"));
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  event.target.closest(".popup").classList.remove("popup_opened");
}

function addProfileDataToForm() {
  profileNameInput.value = profileNameText.textContent;
  profileJobInput.value = profileJobText.textContent;
}

function handleChangeProfileInfo(event) {
  event.preventDefault();
  profileNameText.textContent = profileNameInput.value;
  profileJobText.textContent = profileJobInput.value;

  closePopup(popupEditProfile);
}

function deleteCard(event) {
  event.target.closest(".card__item").remove();
}

function toggleLikeCard(event) {
  event.target.classList.toggle("card__like-button_liked");
}

function previewImage(cardImage, cardTitle) {
  popupImage.src = cardImage;
  popupImageText.textContent = cardTitle;
  popupImage.alt = cardTitle;

  openPopup(popupImagePreview);
}

function createCard(card) {
  const cardElement = cardTemplate.querySelector(".card__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardElement.querySelector(".card__like-button").addEventListener("click", toggleLikeCard);
  cardElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);
  cardImage.addEventListener("click", () => previewImage(cardImage.src, cardTitle.textContent));

  return cardElement;
}

function renderCard(card) {
  const newCard = createCard(card);
  cardsContainer.prepend(newCard);
}

function renderInitialCards() {
  initialCards.forEach(function (card) {
    renderCard(card);
  });
}

renderInitialCards();

function handleAddNewCard(event) {
  event.preventDefault();

  const card = { name: cardName.value, link: cardLink.value };
  renderCard(card);

  formNewCard.reset();
  closePopup(popupImagePreview);
}

popups.forEach((popup) => {
  popup.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("popup__close-button") ||
      event.target.classList.contains("popup_opened")
    ) {
      closePopup(popup);
    }
  });
});

profileEditButton.addEventListener("click", () => {
  addProfileDataToForm();
  openPopup(popupEditProfile);
});

cardAddButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

formProfile.addEventListener("submit", handleChangeProfileInfo);
formNewCard.addEventListener("submit", handleAddNewCard);