function togglePasswordVisibility() {
    var password = document.getElementsByName('password')[0];
    var confirm_password = document.getElementsByName('confirm_password')[0];
    if (password.type === 'password') {
      password.type = 'text';
      confirm_password.type = 'text';
    } else {
      password.type = 'password';
      confirm_password.type = 'password';
    }
  }

document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.querySelector('input[name="password"]');
  passwordInput.addEventListener('keyup', updatePasswordCriteria);

  function updatePasswordCriteria() {
      const password = passwordInput.value;
      // Define the emojis
      const tickEmoji = '✅';
      const crossEmoji = '❌';

      // Minimum 8 characters
      document.getElementById('lengthCheck').innerHTML = password.length >= 8 ? tickEmoji : crossEmoji;
      // At least one lowercase letter
      document.getElementById('lowercaseCheck').innerHTML = /[a-z]/.test(password) ? tickEmoji : crossEmoji;
      // At least one uppercase letter
      document.getElementById('uppercaseCheck').innerHTML = /[A-Z]/.test(password) ? tickEmoji : crossEmoji;
      // At least one number
      document.getElementById('numberCheck').innerHTML = /\d/.test(password) ? tickEmoji : crossEmoji;
      // At least one special character
      document.getElementById('specialCheck').innerHTML = /[!@#$%^&*(),.?":{}|<>]/.test(password) ? tickEmoji : crossEmoji;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.querySelector('input[name="password"]');
  const passwordCriteria = document.getElementById('passwordCriteria');

  passwordInput.addEventListener('focus', function() {
      passwordCriteria.style.opacity = '1';
      passwordCriteria.style.visibility = 'visible';
  });

  passwordInput.addEventListener('blur', function() {
      passwordCriteria.style.opacity = '0';
      passwordCriteria.style.visibility = 'hidden';
  });
});