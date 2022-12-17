/* eslint-disable import/extensions */
import { initialCards } from "./cards-data.js";
import { validationConfig } from "./config.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_profile-info");
const popupAddCard = document.querySelector(".popup_type_add-card");
const profileNameText = document.querySelector(".profile__name");
const profileJobText = document.querySelector(".profile__job");
const profileNameInput = document.querySelector(".form__input_user_name");
const profileJobInput = document.querySelector(".form__input_user_job");
const formProfile = document.querySelector(".form_type_profile");
const formProfileButton = formProfile.querySelector(".form__button");
const formNewCard = document.querySelector(".form_type_new-card");
const formNewCardButton = formNewCard.querySelector(".form__button");
const cardsContainer = document.querySelector(".card__items");
const cardName = document.querySelector(".form__input_card_name");
const cardLink = document.querySelector(".form__input_card_link");
export const popupImagePreview = document.querySelector(
  ".popup_type_image-preview"
);
export const popupImage = document.querySelector(".popup__image");
export const popupImageText = document.querySelector(
  ".popup__image-description"
);

const profileFormValidator = new FormValidator(formProfile, validationConfig);
const cardFormValidator = new FormValidator(formNewCard, validationConfig);

// Чтобы при открытии страницы не мелькали попапы
// после загрузки содержимого у попапов удаляется класс скрывающий их
window.addEventListener("DOMContentLoaded", () => {
  popups.forEach((popup) => popup.classList.remove("popup_hidden"));
});

// function resetErrors(form) {
//   const inputs = form.querySelectorAll('.form__input');
//   inputs.forEach((input) => {
//     hideInputError(form, input, validationConfig);
//   });
// }

function closePopupByEsc(event) {
  if (event.key === "Escape") {
    const currentOpenedPopup = document.querySelector(".popup_opened");
    closePopup(currentOpenedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
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
  formProfileButton.disabled = false;
  // resetErrors(formProfile);
  openPopup(popupEditProfile);
});

cardAddButton.addEventListener("click", () => {
  formNewCardButton.disabled = true;
  formNewCard.reset();
  // resetErrors(formNewCard);
  openPopup(popupAddCard);
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    if (
      event.target.classList.contains("popup__close-button") ||
      event.target.classList.contains("popup_opened")
    ) {
      closePopup(popup);
    }
  });
});

formProfile.addEventListener("submit", handleChangeProfileInfo);
formNewCard.addEventListener("submit", handleAddNewCard);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
