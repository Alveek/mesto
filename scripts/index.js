import { initialCards } from "./cards-data.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const popupElem = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_profile-info");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupImagePreview = document.querySelector(".popup_type_image-preview");
const profileNameText = document.querySelector(".profile__name");
const profileJobText = document.querySelector(".profile__job");
const profileNameInput = document.querySelector(".form__input_user_name");
const profileJobInput = document.querySelector(".form__input_user_job");
const formProfile = document.querySelector(".form_type_profile");
const formNewCard = document.querySelector(".form_type_new-card");
const cardsContainer = document.querySelector(".card__items");

//Чтобы при открытии страницы не мелькали попапы, контейнер попапов становится блоком только после загрузки содержимого
window.addEventListener("DOMContentLoaded", (event) => {
  document.querySelector(".popups").style = `display: block`;
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(event) {
  event.target.closest(".popup").classList.remove("popup_opened");
}

function addProfileDataToForm() {
  profileNameInput.value = profileNameText.textContent;
  profileJobInput.value = profileJobText.textContent;
}

function handleChangeProfileInfo(event) {
  event.preventDefault();
  profileNameText.textContent = profileNameInput.value;
  profileJobText.textContent = profileJobInput.value;

  closePopup(event);
}

function handleAddNewCard(event) {
  event.preventDefault();
  let cardName = document.querySelector(".form__input_card_name");
  let cardLink = document.querySelector(".form__input_card_link");
  const card = { name: cardName.value, link: cardLink.value };
  createCard(card);

  formNewCard.reset();
  closePopup(event);
}

function deleteCard(event) {
  event.target.closest(".card__item").remove();
}

function toggleLikeCard(event) {
  event.target.classList.toggle("card__like-button_liked");
}

function previewImage(image) {
  let popupImage = document.querySelector(".popup__image");
  let popupImageText = document.querySelector(".popup__image-description");

  popupImage.src = image.target.src;
  popupImageText.textContent = image.target.alt;

  openPopup(popupImagePreview);
}

function createCard(card) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card__item").cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__like-button").addEventListener("click", toggleLikeCard);
  cardElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);
  cardElement.querySelector(".card__image").addEventListener("click", previewImage);

  cardsContainer.prepend(cardElement);
}

function renderCards() {
  initialCards.forEach(function (card) {
    createCard(card);
  });
}

renderCards();

popupElem.forEach((item) => {
  item.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("popup__close-button") ||
      event.target.classList.contains("popup_opened")
    ) {
      closePopup(event);
    }
  });
});

profileEditButton.addEventListener("click", () => {
  addProfileDataToForm();
  openPopup(popupEditProfile);
});

cardAddButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

formProfile.addEventListener("submit", handleChangeProfileInfo);
formNewCard.addEventListener("submit", handleAddNewCard);