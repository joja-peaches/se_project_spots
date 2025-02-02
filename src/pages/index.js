import { settings, enableValidation, resetValidation } from "../scripts/validation.js";
import { Api } from "../utils/Api.js";
import "./index.css";

// const initialCards = [
//   {
//     name: "Venice Beach Skate Park",
//     link: "https://iili.io/dseeBzQ.jpg",
//   },
//   {
//     name: "Drinks in downtown LA",
//     link: "https://iili.io/dseeF5b.jpg",
//   },
//   {
//     name: "East Side of Los Angeles",
//     link: "https://iili.io/dseefmx.jpg",
//   },
//   {
//     name: "Mutato Muzika record production",
//     link: "https://iili.io/dseeKej.jpg",
//   },
//   {
//     name: "Southern California beaches",
//     link: "https://iili.io/dsee3du.jpg",
//   },

//   {
//     name: "Beautiful cars in Tuningen, Germany",
//     link: "https://iili.io/dseenLB.md.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ade92107-c8d7-4428-b12b-212211eec783",
    "Content-Type": "application/json"
  }
});

api.getAppInfo().then(([cards, userInfo]) => {

  cards.forEach((item) => {
    const cardsElement = getCardElement(item);
    cardsList.append(cardsElement);
  })

  const { about, avatar, name } = userInfo;
  profileName.textContent = name;
  profileDescription.textContent = about;
  profilePic.src = avatar;
  
}).catch(console.error);

const profileEditButton = document.querySelector(".profile__edit-btn");

const editModal = document.querySelector("#edit-modal");
const editModalCloseButton = editModal.querySelector(".modal__close-button");
const profileName = document.querySelector(".profile__name");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const profileDescription = document.querySelector(".profile__description");
const editModalDescription = editModal.querySelector(
  "#profile-description-input"
);
const profilePic = document.querySelector(".profile__avatar");
const editFormElement = document.forms.namedItem("edit-profile");
const nameInput = editFormElement.querySelector("#profile-name-input");
const jobInput = editFormElement.querySelector("#profile-description-input");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const modals = document.querySelectorAll(".modal");

const newPostOpenButton = document.querySelector(".profile__add-btn");
const addCardModal = document.querySelector("#add-card-modal");
const newPostCloseButton = addCardModal.querySelector("#new-post-close-button");

const newPostForm = document.forms["add-card-form"];
const newPostImageLink = newPostForm.querySelector("#add-card-link-input");
const newPostCaption = newPostForm.querySelector("#add-card-name-input");
const previewModal = document.querySelector("#preview-modal");
const previewModalImg = previewModal.querySelector(".modal__image");
const previewModalClose = previewModal.querySelector(
  ".modal__close-button_type_preview"
);
const previewModalCaption = previewModal.querySelector(".modal__caption");

const avatarModal = document.querySelector("#avatar-modal");
const avatarModalButton = document.querySelector(".profile__avatar-btn");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-button");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-button");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

const deleteModal = document.querySelector("#delete-modal");

const cardSubmitButton = addCardModal.querySelector(".modal__submit-button");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey) ;
};

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
};

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  api.editUserInfo({ name: nameInput.value, about: jobInput.value })
  .then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    evt.target.reset();
    closeModal(editModal);
  })
  .catch(console.error);
};

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  api.editAvatar(avatarInput.value)
  .then((data) => {
    profilePic.src = data.avatar;
    evt.target.reset();
    closeModal(avatarModal);
  })
  .catch(console.error);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImgEl = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  // const cardDeleteButton = cardElement.querySelector(".card__delete-btn");
  // const deleteModalDeleteBtn = cardElement.querySelector(".modal__delete-button");
  // const deleteModalCancelBtn = cardElement.querySelector(".modal__cancel-button");

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

  // cardDeleteButton.addEventListener("click", () => {
  //   openModal(deleteModal);
  // });

  // deleteModalDeleteBtn.addEventListener("click", () => {
  //   cardsList.removeChild(cardElement);
  //   closeModal(deleteModal);
  // });

  // deleteModalCancelBtn.addEventListener("click", () => {
  //   closeModal(deleteModal);
  // });

  return cardElement;
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: newPostCaption.value,
    link: newPostImageLink.value,
  };
  const newCard = getCardElement(inputValues);

  cardsList.prepend(newCard);
  closeModal(addCardModal);
  evt.target.reset();
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescription.value = profileDescription.textContent;
  openModal(editModal);
  resetValidation(editFormElement, [editModalNameInput, editModalDescription], settings);
});

modals.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(popup);
    }
  });
});


editModalCloseButton.addEventListener("click", () => {
  closeModal(editModal);
});

newPostOpenButton.addEventListener("click", () => {
  openModal(addCardModal);
});

newPostCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

previewModalClose.addEventListener("click", () => {
  closeModal(previewModal);
})

avatarModalButton.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarModalCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
})

avatarForm.addEventListener("submit", handleAvatarSubmit);


editFormElement.addEventListener("submit", handleEditFormSubmit);
newPostForm.addEventListener("submit", handleAddCardSubmit);

enableValidation(settings);