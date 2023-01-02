/* eslint-disable import/extensions */
import {initialCards} from '../utils/cards-data.js';
import {validationConfig} from '../utils/config.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

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
} from '../utils/constants.js';

const profileFormValidator = new FormValidator(formProfile, validationConfig);
const cardFormValidator = new FormValidator(formNewCard, validationConfig);

// Чтобы при открытии страницы не мелькали попапы
// после загрузки содержимого у попапов удаляется класс скрывающий их
window.addEventListener('DOMContentLoaded', () => {
  popups.forEach((popup) => popup.classList.remove('popup_hidden'));
});

const userInfo = new UserInfo(profileNameText, profileJobText);

function addProfileDataToForm() {
  profileNameInput.value = userInfo.getUserInfo().userName;
  profileJobInput.value = userInfo.getUserInfo().userJob;
}

const popupWithImage = new PopupWithImage({popupSelector: popupImagePreview});
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function createNewCard(card) {
  const newCard = new Card(card, '#card-template', handleCardClick);
  const newCardElement = newCard.generateCard();

  renderCard.addItem(newCardElement);
}

const renderCard = new Section({
  data: initialCards, renderer: (card) => {
    createNewCard(card);

  },
}, cardsContainer,);

renderCard.renderItems();

const profileFormPopup = new PopupWithForm({
  popupSelector: popupEditProfile, handleSubmitForm: (formData) => {
    userInfo.setUserInfo(formData);
    profileFormPopup.close();
  }
});

const newCardFormPopup = new PopupWithForm({
  popupSelector: popupAddCard, handleSubmitForm: (formData) => {
    const card = {name: formData.cardName, link: formData.cardLink};
    createNewCard(card);
    newCardFormPopup.close();
  }
});

profileEditButton.addEventListener("click", () => {
  addProfileDataToForm();
  profileFormValidator.resetValidation();
  profileFormPopup.open();
});

cardAddButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  newCardFormPopup.open();
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// const popupElements = new Popup({popupSelector: popups});

// popups.forEach(popupElement => {
//   const popup = new Popup({popupSelector: popupElement});
//   popup.setEventListeners();
// });

profileFormPopup.setEventListeners();
newCardFormPopup.setEventListeners();
