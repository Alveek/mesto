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
  profileNameText,
  profileJobText,
  formProfile,
  formNewCard,
  profileAvatar,
  formUpdateAvatar,
  profileSection,
  cardSection,
  loader
} from '../utils/constants.js';

showLoader();
// Чтобы при открытии страницы не мелькали попапы
// после загрузки содержимого у попапов удаляется класс скрывающий их
window.addEventListener('DOMContentLoaded', () => {
  popups.forEach((popup) => popup.classList.remove('popup_hidden'));
});

function showLoader() {
  loader.style.display = 'block';
  profileSection.style.display = 'none';
  cardSection.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
  profileSection.style.display = 'grid';
  cardSection.style.display = 'block';
}

const profileFormValidator = new FormValidator(formProfile, validationConfig);
const cardFormValidator = new FormValidator(formNewCard, validationConfig);
const avatarFormValidator = new FormValidator(formUpdateAvatar, validationConfig);
const userInfo = new UserInfo(profileNameText, profileJobText, profileAvatar);
const popupWithImage = new PopupWithImage({ popupSelector: '.popup_type_image-preview' });

const api = new Api(apiOptions);

function createCard(card, myId) {
  const newCard = new Card(card, myId, '#card-template', handleCardClick, handleDeleteCardClick, handleLikeCard);
  return newCard.generateCard();
}

const renderCard = new Section({
  renderer: (card, myId) => {
    renderCard.addItem(createCard(card, myId));
  },
}, '.card__items');


let render = true;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.getUserInfo(user);
    cards.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    renderCard.renderItems(cards, user._id);
  })
  .catch(err => {
    render = false;
    loader.innerHTML = `Что-то пошло не так... (${err})`;
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => render ? hideLoader() : null, 500);
  });

function editProfile(user, btn) {
  btn.textContent = 'Сохранение...';
  return api.editProfile(user)
    .then(data => {
      userInfo.setUserInfo(data);
    })
    .catch(err => console.log(err))
    .finally(() => {
      profileFormPopup.close();
      setTimeout(() => btn.textContent = 'Сохранить', 1000);
    });
}

const profileFormPopup = new PopupWithForm({
  popupSelector: '.popup_type_profile-info',
  handleSubmitForm: editProfile
});

function addNewCard(data) {
  const card = {
    name: data.cardName,
    link: data.cardLink
  };
  api.addNewCard(card)
    .then(newCard => {
      renderCard.addItem(createCard(newCard, newCard.owner._id));
    })
    .catch(err => console.log(err));
}

function deleteCard(cardId, card) {
  api.deleteCard(cardId)
    .then(() => {
      card.remove();
      card = null;
    })
    .catch(err => console.log(err));
}

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-card',
  handleSubmitForm: (id, card) => {
    deleteCard(id, card);
    popupWithConfirmation.close();
  }
});

const newCardFormPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleSubmitForm: (formData) => {
    addNewCard(formData);
    newCardFormPopup.close();
  },
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
      .then(data => updateCounter(data, likeCounter))
      .catch(err => console.log(err));
  } else {
    api.unlikeCard(cardId)
      .then(data => updateCounter(data, likeCounter))
      .catch(err => console.log(err));
  }
}

function updateAvatar(link, btn) {
  btn.textContent = 'Сохранение...';
  api.updateAvatar(link)
    .then(() => {
      userInfo.setUserAvatar(link);
    })
    .catch(err => console.log(err))
    .finally(() => {
      updateAvatarFormPopup.close();
      setTimeout(() => btn.textContent = 'Сохранить', 1000);
    });
}

const updateAvatarFormPopup = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  handleSubmitForm: updateAvatar
});

profileEditButton.addEventListener('click', () => {
  api.getUserInfo()
    .then(res => {
      profileFormPopup.setInputValues(res);
    })
    .then(() => {
      profileFormValidator.resetValidation();
      profileFormPopup.open();
    })
    .catch(err => console.log(err));
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
