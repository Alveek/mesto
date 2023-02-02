import './index.css';

import { validationConfig } from '../utils/config.js';
import { apiOptions } from '../utils/api-config.js';
import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

import {
  profileEditButton,
  cardAddButton,
  profileAvatarButton,
  popups,
  formProfile,
  formNewCard,
  formUpdateAvatar,
  profileSection,
  cardSection,
  loader,
} from '../utils/constants.js';

// Чтобы при открытии страницы не мелькали попапы
// после загрузки содержимого у попапов удаляется класс скрывающий их
window.addEventListener('DOMContentLoaded', () => {
  popups.forEach((popup) => popup.classList.remove('popup_hidden'));
});

const api = new Api(apiOptions);
const profileFormValidator = new FormValidator(formProfile, validationConfig);
const cardFormValidator = new FormValidator(formNewCard, validationConfig);
const avatarFormValidator = new FormValidator(formUpdateAvatar, validationConfig);
const userInfo = new UserInfo(".profile__name", ".profile__job", ".profile__avatar");
const popupWithImage = new PopupWithImage({popupSelector: '.popup_type_image-preview'});

function showLoader() {
  loader.classList.add('show');
  profileSection.classList.add('hide');
  cardSection.classList.add('hide');
}

showLoader();

function hideLoader() {
  loader.classList.remove('show');
  loader.classList.add('hide');
  profileSection.classList.remove('hide');
  cardSection.classList.remove('hide');
}

function toggleSubmitButtonText(button) {
  button.textContent = button.textContent === 'Сохранить' ? 'Сохранение...' : 'Сохранить';
}

let render = true;

const profileFormPopup = new PopupWithForm({
  popupSelector: '.popup_type_profile-info',
  handleSubmitForm: editProfile,
});

function editProfile(user, btn) {
  toggleSubmitButtonText(btn);
  return api.editProfile(user)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profileFormPopup.close();
      setTimeout(() => toggleSubmitButtonText(btn), 1000);
    });
}

function deleteCard(cardId, card) {
  api.deleteCard(cardId)
    .then(() => {
      card.remove();
      card = null;
      popupWithConfirmation.close();
    })
    .catch((err) => console.log(err));
}

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-card',
  handleSubmitForm: deleteCard,
});


function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleDeleteCardClick(id, el) {
  popupWithConfirmation.open(id, el);
}

function updateCounter(data, counter) {
  counter.textContent = data.likes.length;
}

function handleLikeCard(cardId, cardLikeButton, likeCounter) {
  cardLikeButton.classList.toggle('card__like-button_liked');
  if (cardLikeButton.classList.contains('card__like-button_liked')) {
    api.likeCard(cardId)
      .then((data) => updateCounter(data, likeCounter))
      .catch((err) => console.log(err));
  } else {
    api.unlikeCard(cardId)
      .then((data) => updateCounter(data, likeCounter))
      .catch((err) => console.log(err));
  }
}

function createCard(card, myId) {
  const newCard = new Card(card, myId, '#card-template', handleCardClick, handleDeleteCardClick, handleLikeCard);
  return newCard.generateCard();
}

const renderCard = new Section({
  renderer: (card, myId) => {
    renderCard.addItem(createCard(card, myId));
  },
}, '.card__items');

const newCardFormPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleSubmitForm: addNewCard,
});

function addNewCard(data) {
  const card = {
    name: data.cardName,
    link: data.cardLink,
  };
  api.addNewCard(card)
    .then((newCard) => {
      renderCard.addItem(createCard(newCard, newCard.owner._id));
      newCardFormPopup.close();
    })
    .catch((err) => console.log(err));
}

const updateAvatarFormPopup = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  handleSubmitForm: updateAvatar,
});

function updateAvatar(link, btn) {
  toggleSubmitButtonText(btn);
  api.updateAvatar(link)
    .then(() => {
      userInfo.setUserAvatar(link);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      updateAvatarFormPopup.close();
      setTimeout(() => toggleSubmitButtonText(btn), 1000);
    });
}

profileEditButton.addEventListener('click', () => {
  api.getUserInfo()
    .then((res) => {
      profileFormPopup.setInputValues(res);
    })
    .then(() => {
      profileFormValidator.resetValidation();
      profileFormPopup.open();
    })
    .catch((err) => console.log(err));
});

cardAddButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  newCardFormPopup.open();
});

profileAvatarButton.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  updateAvatarFormPopup.open();
});

profileFormPopup.setEventListeners();
newCardFormPopup.setEventListeners();
popupWithImage.setEventListeners();
popupWithConfirmation.setEventListeners();
updateAvatarFormPopup.setEventListeners();

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    cards.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    renderCard.renderItems(cards, user._id);
  })
  .catch((err) => {
    render = false;
    loader.innerHTML = `Что-то пошло не так... (${err})`;
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => (render ? hideLoader() : null), 500);
  });
