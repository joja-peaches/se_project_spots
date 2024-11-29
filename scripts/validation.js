const showInputError = (formElement, inputElement, errorMessage) => {
    const errorMsgEl = document.querySelector(`#${inputElement.id}-error`);
    errorMsgEl.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
    const errorMsgEl = document.querySelector(`#${inputElement.id}-error`);
    errorMsgEl.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
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