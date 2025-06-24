$(document).ready(function () {
  // Handle the form submit event
  $('form').on('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // Get input values
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const email = $('#email').val();
    const queryType = $('input[name="queryType"]:checked').val();
    const message = $('#messageBox').val();
    const consent = $('#consent').is(':checked');

    // Validate form inputs
    validateForm();

    // Check if any input-container has error class
    $('.input-container').each(function () {
      if ($(this).hasClass('error')) {
        isValid = false;
        return false; // break out of .each loop early
      }
    });

    if (isValid) {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email,
        messages: message,
        query_type: queryType,
        consent,
      };

      fetch('http://127.0.0.1:8000/api/v1/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status ${res.status}`);
          }
          console.log('data uploaded successfully');
          showAlert();
        })
        .catch((err) => console.log(err.message));
    }
  });

  // Handle clicking on .input-box to select radio inputs
  $('.input-box').on('click', function () {
    const $inputBox = $(this);
    const $radioInputs = $inputBox.find('input[type="radio"]');
    const $selectedRadio = $inputBox.find('input[name="queryType"]');

    // Reset all input-box classes
    resetInputClasses();

    // Check and select the radio that matches selectedRadio's value
    $radioInputs.each(function () {
      if ($(this).val() === $selectedRadio.val()) {
        $(this).prop('checked', true);
        $inputBox.addClass('selected');
      }
    });
  });
});

// ------ Global functions ------

function showAlert() {
  $('.alert-modal').slideDown();

  setTimeout(function () {
    $('.alert-modal').slideUp();
    $('form').trigger('reset');
    resetInputClasses();
  }, 2500);
}

function validateForm() {
  $('.input-container').each(function () {
    const $container = $(this);
    const $input = $container.find('input, textarea').first();

    if ($input.attr('type') === 'radio') {
      const isChecked =
        $container.find('input[type="radio"]:checked').length > 0;
      $container.toggleClass('error', !isChecked);
    } else if ($input.attr('type') === 'checkbox') {
      const isChecked =
        $container.find('input[type="checkbox"]:checked').length > 0;
      $container.toggleClass('error', !isChecked);
    } else if (
      $input.attr('type') === 'text' ||
      $input.prop('tagName').toLowerCase() === 'textarea'
    ) {
      const value = $input.val().trim();

      if (value === '') {
        $container.addClass('error');
      } else if ($input.attr('name') === 'email') {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        $container.toggleClass('error', !emailRegex.test(value));
      } else {
        $container.removeClass('error');
      }
    }
  });
}

function resetInputClasses() {
  $('.input-box').removeClass('selected');
}
