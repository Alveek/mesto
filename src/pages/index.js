/* eslint-disable import/extensions */
import {initialCards} from "../utils/cards-data.js";
import {validationConfig} from "../utils/config.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

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
  popupImage,
  popupImagePreview,
  popupImageText,
  cardName,
  cardLink
} from "../utils/constants.js";

const profileFormValidator = new FormValidator(formProfile, validationConfig);
const cardFormValidator = new FormValidator(formNewCard, validationConfig);

// Чтобы при открытии страницы не мелькали попапы
// после загрузки содержимого у попапов удаляется класс скрывающий их
window.addEventListener("DOMContentLoaded", () => {
  popups.forEach((popup) => popup.classList.remove("popup_hidden"));
});

const popupElement = new Popup(popups);
popupElement.setEventListeners();

const userInfo = new UserInfo(profileNameText, profileJobText);

function addProfileDataToForm() {
  profileNameInput.value = userInfo.getUserInfo().userName;
  profileJobInput.value = userInfo.getUserInfo().userJob;
}

function handleCardClick(name, link) {
  const popupWithImage = new PopupWithImage(popupImagePreview);
  popupWithImage.open(name, link);
}

function createNewCard(card) {
  const newCard = new Card(card, "#card-template", handleCardClick);
  const newCardElement = newCard.generateCard();
  renderCard.addItem(newCardElement);
}

const renderCard = new Section({
  data: initialCards, renderer: (card) => {
    createNewCard(card);
  },
}, cardsContainer,);

renderCard.renderItems();

function handleChangeProfileInfo(event) {
  event.preventDefault();
  // profileNameText.textContent = profileNameInput.value;
  // profileJobText.textContent = profileJobInput.value;
  userInfo.setUserInfo(profileNameInput.value, profileJobInput.value);
  // popup.close();
}

function handleAddNewCard(event) {
  event.preventDefault();
  const card = {name: cardName.value, link: cardLink.value};
  createNewCard(card);
  // closePopup(popupAddCard);
}


profileEditButton.addEventListener("click", () => {
  addProfileDataToForm();
  profileFormValidator.resetValidation();
  const popup = new Popup(popupEditProfile);
  popup.open();
});

cardAddButton.addEventListener("click", () => {
  formNewCard.reset();
  cardFormValidator.resetValidation();
  const popup = new Popup(popupAddCard);
  popup.open();
});


formProfile.addEventListener("submit", handleChangeProfileInfo);
formNewCard.addEventListener("submit", handleAddNewCard);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
