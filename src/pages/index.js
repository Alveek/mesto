import "./index.css";

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
  profileAvatarButton,
  popups,
  profileNameText,
  profileJobText,
  formProfile,
  formNewCard,
  cardsContainer,
  profileAvatar,
  formUpdateAvatar
} from "../utils/constants.js";

// Чтобы при открытии страницы не мелькали попапы
// после загрузки содержимого у попапов удаляется класс скрывающий их
window.addEventListener("DOMContentLoaded", () => {
  popups.forEach((popup) => popup.classList.remove("popup_hidden"));
});

const profileFormValidator = new FormValidator(formProfile, validationConfig);
const cardFormValidator = new FormValidator(formNewCard, validationConfig);
const avatarFormValidator = new FormValidator(formUpdateAvatar, validationConfig);
const userInfo = new UserInfo(profileNameText, profileJobText, profileAvatar);
const popupWithImage = new PopupWithImage({popupSelector: ".popup_type_image-preview"});

const apiOptions = {
  url: "https://mesto.nomoreparties.co/v1/cohort-58", headers: {
    authorization: "2cf1ae4c-ba37-45f7-aec7-ad1edf235188", "Content-Type": "application/json",
  },
};

const api = new Api(apiOptions);

const renderCard = new Section({
  renderer: (card) => {
    renderCard.addItem(createCard(card));
  },
}, ".card__items");

// Карточки должны отображаться на странице только после получения id пользователя.
api.getUserInfo().then((data) => {
  if (data._id) {
    api.getInitialCards().then(res => {
      renderCard.renderItems(res);
    });
  }
}).catch(err => console.log(err));

function editProfile(user, btn) {
  return api.editProfile(user)
    .then(res => res.json())
    .then(data => {

      userInfo.setUserInfo(data);
    }).finally(btn.textContent = 'Сохранить')
}

function addNewCard(data) {
  const card = {name: data.cardName, link: data.cardLink};
  api.addNewCard(card).then(res => res.json()).then(newCard => renderCard.addItem(createCard(newCard)));
}

function deleteCard(cardId, card) {
  api.deleteCard(cardId).then(() => {
    card.remove();
    card = null;
    popupWithConfirmation.close();
  });
}

const profileFormPopup = new PopupWithForm({
  popupSelector: ".popup_type_profile-info", handleSubmitForm: (formData, submitButton) => {
    submitButton.textContent = 'Сохранение...';
    editProfile(formData, submitButton).then(() => {
      profileFormPopup.close();

    });

  },
});

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: ".popup_type_delete-card", handleSubmitForm: (id, card) => {
    deleteCard(id, card);
  }
});

api.getUserInfo().then((res) => userInfo.getUserInfo(res));

const newCardFormPopup = new PopupWithForm({
  popupSelector: ".popup_type_add-card", handleSubmitForm: (formData) => {
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
    api.likeCard(cardId).then(res => res.json()).then(data => updateCounter(data, likeCounter));
  } else {
    api.unlikeCard(cardId).then(res => res.json()).then(data => updateCounter(data, likeCounter));
  }
}

const updateAvatarFormPopup = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar', handleSubmitForm: (link) => {
    api.updateAvatar(link).then(() => {
      userInfo.setUserAvatar(link);
      updateAvatarFormPopup.close();
    });
  }
});

function createCard(card) {
  const newCard = new Card(card, "#card-template", handleCardClick, handleDeleteCardClick, handleLikeCard);
  return newCard.generateCard();
}

profileEditButton.addEventListener("click", () => {
  api.getUserInfo().then(res => {
    profileFormPopup.setInputValues(res);
  }).then(() => {
    profileFormValidator.resetValidation();
    profileFormPopup.open();
  });

});

cardAddButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  newCardFormPopup.open();
});

profileAvatarButton.addEventListener("click", () => {
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
