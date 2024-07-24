function togglePasswordVisibility() {
  const password = document.getElementsByName('password')[0];
  const confirm_password = document.getElementsByName('confirm_password')[0];
  const newType = password.type === 'password' ? 'text' : 'password';

  password.type = newType;
  confirm_password.type = newType;
}

document.addEventListener('DOMContentLoaded', function() {
  const password = document.getElementsByName("password")[0];
  const confirm_password = document.getElementsByName("confirm_password")[0];
  const passwordMatch = document.getElementById("passwordMatch");
  const passwordCriteria = document.getElementById("passwordCriteria");
  const submitButton = document.getElementById('getStartedButton');
  submitButton.classList.add('button-disabled');
  submitButton.disabled = true;

  function validatePassword() {
    const passwordsMatch = password.value === confirm_password.value;
    passwordMatch.style.display = !passwordsMatch && confirm_password.value.length > 0 ? "block" : "none";
    return passwordsMatch; // Return the match status
  }

  function updatePasswordCriteria() {
    const criteriaChecks = {
      'lengthCheck': password.value.length >= 8,
      'lowercaseCheck': /[a-z]/.test(password.value),
      'uppercaseCheck': /[A-Z]/.test(password.value),
      'numberCheck': /\d/.test(password.value),
      'specialCheck': /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/.test(password.value)
    };
    Object.keys(criteriaChecks).forEach(criteria => updateCriteria(criteria, criteriaChecks[criteria]));

    const allCriteriaMet = Object.values(criteriaChecks).every(isValid => isValid);
    const passwordsMatch = validatePassword(); // Ensure passwords match

    // Enable or disable the submit button based on the criteria and password match
    submitButton.disabled = !(allCriteriaMet && passwordsMatch);
    submitButton.classList.toggle('button-disabled', submitButton.disabled);
  }

  function updateCriteria(criteria, isValid) {
    const element = document.getElementById(criteria);
    element.classList.toggle("valid", isValid);
    element.classList.toggle("invalid", !isValid);
  }

  function showPasswordCriteria() {
    passwordCriteria.style.maxHeight = "300px"; // Adjust this value based on the content size
    passwordCriteria.style.opacity = "1";
    passwordCriteria.style.visibility = "visible";
  }
  
  function hidePasswordCriteria() {
    passwordCriteria.style.maxHeight = "0";
    passwordCriteria.style.opacity = "0";
    passwordCriteria.style.visibility = "hidden";
  }
  
  // Update event listeners
  password.onfocus = showPasswordCriteria;
  password.onblur = hidePasswordCriteria;
  password.oninput = updatePasswordCriteria; // Changed from onchange to oninput for immediate feedback
  confirm_password.oninput = updatePasswordCriteria; // Use oninput for immediate feedback
});