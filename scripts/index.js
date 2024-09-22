const initialCards = [
{
  name: "Venice Beach Skate Park",
  link: "https://i.imgur.com/DNBmqc0.jpeg}",
},
{
  name: "Drinks in downtown LA",
  link: "https://i.imgur.com/adQIaGo.jpeg",
},
{
  name: "East Side of Los Angeles",
  link: "https://i.imgur.com/atPkbSV.jpeg",
},
{
  name: "Mutato Muzika record production",
  link: "https://i.imgur.com/H1yfTHh.jpeg",
},
{
  name: "Southern California beaches",
  link: "https://i.imgur.com/LGEkmhf.jpeg",
},

{
  name: "Beautiful cars in Tuningen, Germany",
  link: "https://i.imgur.covm/CFcBAd2.jpeg",
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

// Rendering cards  Last Chapter