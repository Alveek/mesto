import {initialCards} from '../utils/cards-data.js';
import {validationConfig} from '../utils/config.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
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
  popupImagePreview,
} from '../utils/constants.js';

// Чтобы при открытии страницы не мелькали попапы
// после загрузки содержимого у попапов удаляется класс скрывающий их
window.addEventListener('DOMContentLoaded', () => {
  popups.forEach((popup) => popup.classList.remove('popup_hidden'));
});

const profileFormValidator = new FormValidator(formProfile, validationConfig);
const cardFormValidator = new FormValidator(formNewCard, validationConfig);
const userInfo = new UserInfo(profileNameText, profileJobText);
const popupWithImage = new PopupWithImage({popupSelector: popupImagePreview});

const renderCard = new Section({
  data: initialCards, renderer: (card) => {
    createNewCard(card);
  },
}, cardsContainer,);

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

function addProfileDataToForm() {
  profileNameInput.value = userInfo.getUserInfo().userName;
  profileJobInput.value = userInfo.getUserInfo().userJob;
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function createNewCard(card) {
  const newCard = new Card(card, '#card-template', handleCardClick);
  const newCardElement = newCard.generateCard();

  renderCard.addItem(newCardElement);
}

profileEditButton.addEventListener('click', () => {
  addProfileDataToForm();
  profileFormValidator.resetValidation();
  profileFormPopup.open();
});

cardAddButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  newCardFormPopup.open();
});

renderCard.renderItems();

profileFormPopup.setEventListeners();
newCardFormPopup.setEventListeners();
popupWithImage.setEventListeners();

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
