import { contains } from "jquery";
import { settings, enableValidation, resetValidation } from "../scripts/validation.js";
import { Api } from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";
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

// Modals
const modals = document.querySelectorAll(".modal");

// Profile elements
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profilePic = document.querySelector(".profile__avatar");
const editFormElement = document.forms.namedItem("edit-profile");
const nameInput = editFormElement.querySelector("#profile-name-input");
const jobInput = editFormElement.querySelector("#profile-description-input");
const profileEditButton = document.querySelector(".profile__edit-btn");
// const profileSubmitButton = editFormElement.querySelector(".modal__submit-button");

// Edit form elements
const editModal = document.querySelector("#edit-modal");
const editModalCloseButton = editModal.querySelector(".modal__close-button");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescription = editModal.querySelector(
  "#profile-description-input"
);

// Card elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const newPostOpenButton = document.querySelector(".profile__add-btn");
const addCardModal = document.querySelector("#add-card-modal");
const newPostCloseButton = addCardModal.querySelector("#new-post-close-button");
const newPostForm = document.forms["add-card-form"];
const newPostImageLink = newPostForm.querySelector("#add-card-link-input");
const newPostCaption = newPostForm.querySelector("#add-card-name-input");
const newPostSubmitBtn = newPostForm.querySelector(".modal__submit-button");

// Preview elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImg = previewModal.querySelector(".modal__image");
const previewModalClose = previewModal.querySelector(
  ".modal__close-button_type_preview"
);
const previewModalCaption = previewModal.querySelector(".modal__caption");

// Avatar form elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarModalButton = document.querySelector(".profile__avatar-btn");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-button");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

// Delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteModalCloseButton = deleteModal.querySelector(".modal__close-button");
const modalCancelButton = deleteModal.querySelector(".modal__cancel-button");

let selectedCard, selectedCardId;

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
  const profileSubmitButton = evt.submitter;
  setButtonText(profileSubmitButton, true);

  api.editUserInfo({ name: nameInput.value, about: jobInput.value })
  .then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    evt.target.reset();
    closeModal(editModal);
  })
  .catch(console.error)
  .finally(
    setButtonText(profileSubmitButton, false)
  );
};

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const avatarSubmitButton = evt.submitter;
  setButtonText(avatarSubmitButton, true);

  api.editAvatar(avatarInput.value)
  .then((data) => {
    profilePic.src = data.avatar;
    evt.target.reset();
    closeModal(avatarModal);
  })
  .catch(console.error)
  .finally(
    setButtonText(avatarSubmitButton, false)
  );
}

function handlePostCard(evt) {
  evt.preventDefault();
  const postCardSubmitBtn = evt.submitter;
  setButtonText(postCardSubmitBtn, true);

  api.postCard({ name: newPostCaption.value, link: newPostImageLink.value })
  .then((data) => {
    const newCard = getCardElement(data);

    cardsList.prepend(newCard);

    closeModal(addCardModal);
    evt.target.reset();
  })
  .catch(console.error)
  .finally(
    setButtonText(postCardSubmitBtn, false)
  );
}

function handleLike(evt, cardId) {
  evt.preventDefault();
  const likeButton = evt.target;
  const isLikedEl = likeButton.classList.contains("card__like-btn_liked");
  const isLikedStatus = isLikedEl.isLiked;
  api.handleLike(cardId, isLikedStatus).then((isLikedStatus) => {
    if (isLikedStatus) {
      likeButton.classList.toggle("card__like-btn_liked");
    } else {
      likeButton.classList.toggle("card__like-btn_liked");
    }
  }).catch(console.error);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const deleteButton = evt.submitter;
  setButtonText(deleteButton, true, "Delete", "Deleting...");

  api.deleteCard(selectedCardId).then(() => {
    selectedCard.remove();
    closeModal(deleteModal)
  }).catch(console.error)
  .finally(() => {
    setButtonText(deleteButton, false, "Delete", "Deleting...");
    deleteButton.disabled = false;
});
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
  modalCancelButton.addEventListener("click", () => {
    closeModal(deleteModal)
  });
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImgEl = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  const cardDeleteButton = cardElement.querySelector(".card__delete-btn");

  cardNameEl.textContent = data.name;
  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;

  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-btn_liked");
  }
  
  cardLikeButton.addEventListener("click", (evt) => {
    handleLike(evt, data._id)
  });

  cardImgEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImg.src = cardImgEl.src;
    previewModalImg.alt = cardImgEl.alt;
    previewModalCaption.textContent = cardImgEl.alt;
  });

  cardDeleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
  });

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

deleteModalCloseButton.addEventListener("click", () => {
  closeModal(deleteModal);
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
deleteForm.addEventListener("submit", handleDeleteSubmit);
editFormElement.addEventListener("submit", handleEditFormSubmit);
newPostForm.addEventListener("submit", handlePostCard);

enableValidation(settings);