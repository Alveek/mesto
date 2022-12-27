/* eslint-disable import/extensions */
import { initialCards } from "../utils/cards-data.js";
import { validationConfig } from "../utils/config.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

import {
  profileEditButton,
  cardAddButton,
  popups,
  popupEditProfile,
  popupAddCard,
  profileNameText,
  profileJobText,
  profileNameInput,
  profileJobInput,
  formProfile,
  formNewCard,
  cardsContainer,
  cardName,
  cardLink,
  popupImage,
  popupImagePreview,
  popupImageText,
} from "../utils/constants.js";

const profileFormValidator = new FormValidator(formProfile, validationConfig);
const cardFormValidator = new FormValidator(formNewCard, validationConfig);

// Чтобы при открытии страницы не мелькали попапы
// после загрузки содержимого у попапов удаляется класс скрывающий их
window.addEventListener("DOMContentLoaded", () => {
  popups.forEach((popup) => popup.classList.remove("popup_hidden"));
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(event) {
  if (event.key === "Escape") {
    const currentOpenedPopup = document.querySelector(".popup_opened");
    closePopup(currentOpenedPopup);
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

function previewImage(name, link) {
  popupImage.src = link;
  popupImageText.textContent = name;
  popupImage.alt = name;

  openPopup(popupImagePreview);
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

function renderCard(card) {
  const newCard = new Card(card, "#card-template", previewImage);
  cardsContainer.prepend(newCard.generateCard());
}

function renderInitialCards() {
  initialCards.forEach((card) => {
    renderCard(card);
  });
}

renderInitialCards();

function handleAddNewCard(event) {
  event.preventDefault();

  const card = { name: cardName.value, link: cardLink.value };
  renderCard(card);
  closePopup(popupAddCard);
}

profileEditButton.addEventListener("click", () => {
  addProfileDataToForm();
  profileFormValidator.resetValidation();
  openPopup(popupEditProfile);
});

cardAddButton.addEventListener("click", () => {
  formNewCard.reset();
  cardFormValidator.resetValidation();
  openPopup(popupAddCard);
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup__close-button") || event.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});

formProfile.addEventListener("submit", handleChangeProfileInfo);
formNewCard.addEventListener("submit", handleAddNewCard);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
