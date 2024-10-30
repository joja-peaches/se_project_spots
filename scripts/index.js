const initialCards = [
{
  name: "Venice Beach Skate Park",
  link: "https://iili.io/dseeBzQ.jpg",
},
{
  name: "Drinks in downtown LA",
  link: "https://iili.io/dseeF5b.jpg",
},
{
  name: "East Side of Los Angeles",
  link: "https://iili.io/dseefmx.jpg",
},
{
  name: "Mutato Muzika record production",
  link: "https://iili.io/dseeKej.jpg",
},
{
  name: "Southern California beaches",
  link: "https://iili.io/dsee3du.jpg",
},
 
{
  name: "Beautiful cars in Tuningen, Germany",
  link: "https://iili.io/dseenLB.md.jpg",
},
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-modal");
const editModalSaveButton = editModal.querySelector(".modal__close-button");
const profileName = document.querySelector(".profile__name");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const profileDescription = document.querySelector(".profile__description");
const editModalDescription = editModal.querySelector("#profile-description-input");
const editFormElement = document.forms.namedItem("edit-profile");
const nameInput = editFormElement.querySelector("#profile-name-input");
const jobInput = editFormElement.querySelector("#profile-description-input");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const newPostOpenButton = document.querySelector(".profile__add-btn");
const addCardModal = document.querySelector("#add-card-modal");
const newPostCloseButton = addCardModal.querySelector("#new-post-close-button");

const newPostModal = document.querySelector("#add-card-modal");
const newPostForm = newPostModal.querySelector("#add-card-form");
const newPostImageLink = newPostModal.querySelector("#add-card-link-input");
const newPostCaption = newPostModal.querySelector("#add-card-name-input");
const previewModal = document.querySelector("#preview-modal");
const previewModalImg = previewModal.querySelector(".modal__image");
const previewModalClose = previewModal.querySelector(".modal__close_type_preview");
const previewModalCaption = previewModal.querySelector(".modal__caption");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImgEl = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  const cardDeleteButton = cardElement.querySelector(".card__delete-btn");
  
  cardNameEl.textContent = data.name;
  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-btn_liked");
  });

  cardImgEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImg.src = cardImgEl.src;
    previewModalImg.alt = cardImgEl.alt;
    previewModalCaption.textContent = cardImgEl.alt;
  });

  cardDeleteButton.addEventListener("click", () => {
    cardsList.removeChild(cardElement);
  });

  return cardElement;
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = { name: newPostCaption.value, link: newPostImageLink.value };
  const newCard = getCardElement(inputValues);

  cardsList.prepend(newCard);

  closeModal(addCardModal);
  newPostImageLink.value = "";
  newPostCaption.value = "";
}

initialCards.forEach((item) => {
  const cardsElement = getCardElement(item);
  cardsList.append(cardsElement);
});

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescription.value = profileDescription.textContent;
  openModal(editModal);
});

editModalSaveButton.addEventListener("click", () => {
  closeModal(editModal);
});

newPostOpenButton.addEventListener("click", () => {
  openModal(addCardModal);
})

newPostCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

previewModalClose.addEventListener("click", () => {
  closeModal(previewModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
newPostForm.addEventListener("submit", handleAddCardSubmit);