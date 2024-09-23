const initialCards = [
{
  name: "Venice Beach Skate Park",
  link: "https://i.ibb.co/yghyG3H/venice.jpg",
},
{
  name: "Drinks in downtown LA",
  link: "https://i.ibb.co/GFKk4mD/drink.jpg",
},
{
  name: "East Side of Los Angeles",
  link: "https://i.ibb.co/PmSkQt7/night.jpg",
},
{
  name: "Mutato Muzika record production",
  link: "https://i.ibb.co/5GvtwCz/mutato.jpg",
},
{
  name: "Southern California beaches",
  link: "https://i.ibb.co/k0bnYQK/beach.jpg",
},

{
  name: "Beautiful cars in Tuningen, Germany",
  link: "https://i.ibb.co/4jb33Yf/royce.jpg",
},
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-modal");
const editModalCloseButton = editModal.querySelector(".modal__close-button");

const profileName = document.querySelector(".profile__name");
const editModalNameInput = editModal.querySelector("#profile-name-input");

const profileDescription = document.querySelector(".profile__description");
const editModalDescription = editModal.querySelector("#profile-description-input");

const editFormElement = editModal.querySelector(".modal__form");
const nameInput = editFormElement.querySelector("#profile-name-input");
const jobInput = editFormElement.querySelector("#profile-description-input");

function openModal() {
  editModalNameInput.value = profileName.textContent;
  editModalDescription.value = profileDescription.textContent;
  editModal.classList.add("modal__opened");
}

function closeModal() {
  editModal.classList.remove("modal__opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal();
}

profileEditButton.addEventListener("click", openModal);

editModalCloseButton.addEventListener("click", closeModal);

editFormElement.addEventListener("submit", handleEditFormSubmit);

// Rendering cards

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImgEl = cardElement.querySelector(".card__image");

  cardNameEl.textContent = data.name;
  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;

  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  const cardsElement = getCardElement(initialCards[i]);
  cardsList.append(cardsElement);
}