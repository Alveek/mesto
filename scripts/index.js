import { initialCards } from "./cards-data.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const popupElem = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.form__input_user_name');
const jobInput = document.querySelector('.form__input_user_job');
const formElem = document.querySelector('.form');
const cardsContainer = document.querySelector('.card__items');


function addDataToForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function changeProfileInfo() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function closePopup() {
  popupElem.classList.remove('popup_opened');
}

function openPopup() {
  popupElem.classList.add('popup_opened');
}

function handleFormSubmit(event) {
  event.preventDefault();
  changeProfileInfo();
  closePopup();
}

profileEditButton.addEventListener('click', () => {
  addDataToForm();
  openPopup();
});

popupElem.addEventListener('click', function (event) {
  if (event.target.classList.contains('popup__close-button')) {
    closePopup();
  }
})

formElem.addEventListener('submit', handleFormSubmit);


function renderCards() {
  initialCards.forEach(function (card) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardsContainer.prepend(cardElement);
  });


  // songElement.querySelector('.song__artist').textContent = artistValue;
  // songElement.querySelector('.song__title').textContent = titleValue;
  // songsContainer.append(songElement);
}

renderCards();

{/* <li class="card__item">
  <img class="card__image">
    <div class="card__description">
      <p class="card__title"></p>
      <button type="button" class="card__like-button opacity" aria-label="Лайк"></button>
    </div>
</li> */}