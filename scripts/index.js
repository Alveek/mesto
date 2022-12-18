/* eslint-disable import/extensions */
import { initialCards } from "./cards-data.js";
import { validationConfig } from "./config.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

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
  formProfileButton,
  formNewCard,
  formNewCardButton,
  cardsContainer,
  cardName,
  cardLink,
} from "./constants.js";

const profileFormValidator = new FormValidator(formProfile, validationConfig);
const cardFormValidator = new FormValidator(formNewCard, validationConfig);

// Чтобы при открытии страницы не мелькали попапы
// после загрузки содержимого у попапов удаляется класс скрывающий их
window.addEventListener("DOMContentLoaded", () => {
  popups.forEach((popup) => popup.classList.remove("popup_hidden"));
});

export function openPopup(popup) {
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
  const newCard = new Card(card, "#card-template");
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
  // formProfileButton.disabled = false;
  profileFormValidator._enableButton();
  profileFormValidator.resetErrors();
  openPopup(popupEditProfile);
});

cardAddButton.addEventListener("click", () => {
  // formNewCardButton.disabled = true;
  cardFormValidator._disableButton();
  formNewCard.reset();
  cardFormValidator.resetErrors();
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
