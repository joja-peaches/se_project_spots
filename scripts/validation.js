const showInputError = (formElement, inputElement, errorMessage) => {
    const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`);
    errorMsgEl.textContent = errorMessage;
    inputElement.classList.add("modal__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
    const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`);
    errorMsgEl.textContent = "";
    inputElement.classList.remove("modal__input-error_active");
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((element) => {
        return !element.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("modal__submit-button_inactive");
        buttonElement.disabled = true;  
    } else {
        buttonElement.classList.remove("modal__submit-button_inactive");
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
    const buttonElement = formElement.querySelector(".modal__submit-button");

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
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