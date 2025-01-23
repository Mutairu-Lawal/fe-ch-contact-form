$(document).ready(function () {
  // handle the form submit event
  $('form').on('submit', function (e) {
    e.preventDefault();

    $firstName = $('#firstName').val();
    $lastName = $('#lastName').val();
    $email = $('#email').val();
    $queryType = $('input[name="queryType"]:checked').val();
    $message = $('#messageBox').val();
    $consent = $('#consent').is(':checked');

    validateForm();

    if (
      $firstName &&
      $lastName &&
      $email &&
      $queryType &&
      $message &&
      $consent
    ) {
      showAlert();
      userData = {
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        queryType: $queryType,
        message: $message,
        consent: $consent,
      };

      console.log(userData);
    }
  });

  // handle the radio input change event
  const inputBoxs = document.querySelectorAll('.input-box');

  inputBoxs.forEach((inputBox) => {
    inputBox.addEventListener('click', () => {
      // Get the selected radio input within the clicked input-box
      const radioInputs = inputBox.querySelectorAll('input[type="radio"]');

      // Get the selected radio input
      const selectedRadio = inputBox.querySelector('input[name="queryType"]');

      // RESET the 'selected' class from all input-boxes
      resetInputClasses();

      // Set the 'selected' class to the clicked input-box
      radioInputs.forEach((radioInput) => {
        if (radioInput.value === selectedRadio.value) {
          radioInput.checked = true;
          inputBox.classList.add('selected');
        } else {
          radioInput.checked = false;
          inputBox.classList.remove('selected');
        }
      });
    });
  });
});

function showAlert() {
  setTimeout(function () {
    $('.alert-modal').slideUp();
    $('form').trigger('reset');
    resetInputClasses();
  }, 2500);
  $('.alert-modal').slideDown();
}

function validateForm() {
  // Get all input fields
  const inputs = document.querySelectorAll('.input-container');

  // Loop through each input field
  inputs.forEach((input) => {
    const inputValue =
      input.querySelector('input') || input.querySelector('textarea');

    // Check if the input field is empty
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

function resetInputClasses() {
  document.querySelectorAll('.input-box').forEach((box) => {
    box.classList.remove('selected');
  });
}
