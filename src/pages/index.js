import "./index.css";

// import { initialCards } from "../utils/cards-data.js";
import {validationConfig} from "../utils/config.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

import {
  profileEditButton,
  cardAddButton,
  popups,
  profileNameText,
  profileJobText,
  formProfile,
  formNewCard,
  cardsContainer,
  profileAvatar
} from "../utils/constants.js";
import {logPlugin} from "@babel/preset-env/lib/debug";


// Чтобы при открытии страницы не мелькали попапы
// после загрузки содержимого у попапов удаляется класс скрывающий их
window.addEventListener("DOMContentLoaded", () => {
  popups.forEach((popup) => popup.classList.remove("popup_hidden"));
});

const profileFormValidator = new FormValidator(formProfile, validationConfig);
const cardFormValidator = new FormValidator(formNewCard, validationConfig);
const userInfo = new UserInfo(profileNameText, profileJobText, profileAvatar);
const popupWithImage = new PopupWithImage({popupSelector: ".popup_type_image-preview"});

const apiOptions = {
  url: "https://mesto.nomoreparties.co/v1/cohort-58",
  headers: {
    authorization: "2cf1ae4c-ba37-45f7-aec7-ad1edf235188",
    "Content-Type": "application/json",
  },
};

const api = new Api(apiOptions);

const renderCard = new Section(
  {
    data: api.getInitialCards(),
    renderer: (card) => {
      renderCard.addItem(createCard(card));
    },
  },
  cardsContainer
);

const profileFormPopup = new PopupWithForm({
  popupSelector: ".popup_type_profile-info",
  handleSubmitForm: (formData) => {
    api.editProfile(formData).then(res => res.json()).then(data => userInfo.setUserInfo(data));
    profileFormPopup.close();
  },
});

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: ".popup_type_delete-card", handleSubmitForm: (id, card) => {
    api.deleteCard(id).then(() => {
      card.remove();
      card = null;
      popupWithConfirmation.close();
    });
  }
});

api.getUserInfo().then((res) => userInfo.getUserInfo(res));

const newCardFormPopup = new PopupWithForm({
  popupSelector: ".popup_type_add-card",
  handleSubmitForm: (formData) => {
    const card = {name: formData.cardName, link: formData.cardLink};
    api.addNewCard(card).then(res => res.json()).then(newCard => renderCard.addItem(createCard(newCard)));
    newCardFormPopup.close();
  },
});

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleDeleteCardClick(id, el) {
  popupWithConfirmation.open(id, el);
}

function createCard(card) {
  const newCard = new Card(card, "#card-template", handleCardClick, handleDeleteCardClick);
  return newCard.generateCard();
}

profileEditButton.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  profileFormPopup.open();
});

cardAddButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  newCardFormPopup.open();
});

api.getUserInfo().then((data) => {
    if (data._id) renderCard.renderItems();
  }
);

profileFormPopup.setEventListeners();
newCardFormPopup.setEventListeners();
popupWithImage.setEventListeners();
popupWithConfirmation.setEventListeners();

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
