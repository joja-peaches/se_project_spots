export const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-button",
    inactiveButtonClass: "modal__submit-button_inactive",
    inputErrorClass: "modal__error",
    errorClass: "modal__input-error_active"
  }

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`);
    errorMsgEl.textContent = errorMessage;
    inputElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
    const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`);
    errorMsgEl.textContent = "";
    inputElement.classList.remove(config.errorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((element) => {
        return !element.validity.valid;
    });
};

const disableButton = (buttonElement, config) => {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;  
};

const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, config);
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    formElement.addEventListener("submit", () => {
        disableButton(buttonElement, config);
    });
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

export const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
};

export const resetValidation = (formElement, inputList, config) => {
    inputList.forEach((input) => {
        hideInputError(formElement, input, config);
    });
};

enableValidation(settings);