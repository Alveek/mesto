import { cards } from "./cards-data.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupElem = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_profile-info');
const popupAddCard = document.querySelector('.popup_type_add-card');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.form__input_user_name');
const jobInput = document.querySelector('.form__input_user_job');
const formElem = document.querySelectorAll('.form');
const cardsContainer = document.querySelector('.card__items');


function addProfileDataToForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function changeProfileInfo() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function closePopup(event) {
  event.target.closest('.popup').classList.remove('popup_opened');
}

function openPopup(popup) {
  if (popup.target === profileEditButton) {
    popupEditProfile.classList.add('popup_opened');
  } else if (popup.target === addCardButton) {
    popupAddCard.classList.add('popup_opened')
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formName = event.target.closest('form').name;
  if (formName === 'profile-form') {
    changeProfileInfo();
  } else if (formName === 'add-form') {
    addNewCard();
  }
  closePopup(event);
}

function addNewCard() {
  let cardName = document.querySelector('.form__input_card_name');
  let cardLink = document.querySelector('.form__input_card_link');
  const card = { name: cardName.value, link: cardLink.value };
  cards.push(card);
  cardName.value = '';
  cardLink.value = '';
  createCard(card);
}

profileEditButton.addEventListener('click', (event) => {
  addProfileDataToForm();
  openPopup(event);
});

addCardButton.addEventListener('click', (event) => {
  openPopup(event);
});

addCardButton.addEventListener('click', (event) => {
  event.preventDefault();

})

popupElem.forEach(item => {
  item.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup__close-button')) {
      closePopup(event);
    }
  })
})

formElem.forEach(item => {
  item.addEventListener('submit', (event) => {
    handleFormSubmit(event);
  });
})

function createCard(card) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardsContainer.prepend(cardElement);
}

function renderCards() {
  cards.forEach(function (card) {
    createCard(card);
  });
}

renderCards();