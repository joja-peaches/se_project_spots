// const showInputError = (formElement, inputElement, errorMessage.validationMessage) => {

// };

const checkInputValidity = (formElement, inputElement) => {
    // if (!inputElement.validity.valid) {
    //     console.log("invalid");
    //     // showInputError(formElement, inputElement, errorMessage.validationMessage);
    // } else {
    //     console.log("valid");
    // }
    console.log(inputElement.validationMessage);
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
    const buttonElement = formElement.querySelectorAll(".modal__submit-button");
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
        });
    });
};

const enableValidation = () => {
    const formList = document.querySelectorAll(".modal__form");
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

enableValidation();