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
console.log(initialCards);

const profileEditButton = document.querySelector(".profile__edit-btn");

const editModal = document.querySelector("#edit-modal");

const editModalCloseButton = editModal.querySelector(".modal__close-button");

function openModal() {
  editModal.classList.add("modal__opened");
}

function closeModal() {
  editModal.classList.remove("modal__opened");
}

profileEditButton.addEventListener("click", openModal);

editModalCloseButton.addEventListener("click", closeModal);


//test

// test

////tetsetsesetsetstste