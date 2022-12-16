/* eslint-disable no-param-reassign */
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

class FormValidator {
  constructor() {
    this.config = validationConfig;
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this.config.formSelector));
    formList.forEach((formElement) => {
      console.log(formElement);
      setEventListeners(formElement, this.config);
    });
  }
}

export default FormValidator;
