import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function displaySuccess(title, message) {
  iziToast.success({
    title,
    message,
  });
}

function displayError(title, message) {
  iziToast.error({
    title,
    message,
  });
}

function displayServerError(error) {
  if (error.response) {
    displayError(
      '❌',
      error.response.statusText ||
        `Server response status ${error.response.status}`
    );
  } else if (error.request) {
    displayError('❌', `Server not responds`);
  } else {
    displayError('❌', `Error: ${error.message}`);
  }
}

class HideableElement {
  constructor(element, visibleClass, hiddenClass = 'hidden') {
    this.elementInstance = element;
    this.visibleClass = visibleClass;
    this.hiddenClass = hiddenClass;
  }

  show() {
    this.elementInstance.classList.replace(this.hiddenClass, this.visibleClass);
  }

  hide() {
    this.elementInstance.classList.replace(this.visibleClass, this.hiddenClass);
  }

  get element() {
    return this.elementInstance;
  }
}

export { displaySuccess, displayError, displayServerError, HideableElement };
