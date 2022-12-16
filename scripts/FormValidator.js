class FormValidator {
  constructor(formElement, config) {
    this.config = config;
    this.formElement = formElement;
  }

  showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };

  hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  };

  checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      this.showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        config
      );
    } else {
      this.hideInputError(formElement, inputElement, config);
    }
  }

  hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  toggleButtonState(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  }

  setEventListeners(formElement, config) {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );

    this.toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(formElement, inputElement, config);
        this.toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this.setEventListeners(this.formElement, this.config);
  }
}

export default FormValidator;
