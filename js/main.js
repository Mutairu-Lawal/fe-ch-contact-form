$(document).ready(function () {
  $('form').on('submit', function (e) {
    e.preventDefault();

    $firstName = $('#firstName').val();
    $lastName = $('#lastName').val();
    $email = $('#email').val();
    $queryType = $('input[name="queryType"]:checked').val();
    $message = $('#messageBox').val();
    $consent = $('#consent').is(':checked');

    validateForm();

    $firstName &&
      $lastName &&
      $email &&
      $queryType &&
      $message &&
      $consent &&
      showAlert(),
      (userData = {
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        queryType: $queryType,
        message: $message,
        consent: $consent,
      });
  });
});

function showAlert() {
  setTimeout(function () {
    $('.alert-modal').slideUp();
    $('form').trigger('reset');
  }, 2000);
  $('.alert-modal').slideDown();
}

function validateForm() {
  const inputs = document.querySelectorAll('.input-container');

  inputs.forEach((input) => {
    const inputValue =
      input.querySelector('input') || input.querySelector('textarea');

    if (inputValue.type === 'radio') {
      const radioInputs = input.querySelectorAll('input[type="radio"]');
      let isChecked = false;
      radioInputs.forEach((radio) => {
        if (radio.checked) {
          isChecked = true;
        }
      });
      if (!isChecked) {
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    } else if (inputValue.type === 'checkbox') {
      const checkboxInputs = input.querySelector(
        'input[type="checkbox"]:checked'
      );
      if (!checkboxInputs) {
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    } else if (inputValue.type === 'text' || inputValue.type === 'textarea') {
      if (inputValue.value === '') {
        input.classList.add('error');
      } else if (inputValue.value && inputValue.name === 'email') {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(inputValue.value)) {
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      } else {
        input.classList.remove('error');
      }
    }
  });
}
