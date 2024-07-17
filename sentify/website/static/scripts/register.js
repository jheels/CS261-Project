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
    const password_match = document.getElementById("password_match");
    const passwordCriteria = document.getElementById("passwordCriteria");
  
    function validatePassword() {
      password_match.style.display = (password.value !== confirm_password.value && confirm_password.value.length > 0) ? "flex" : "none";
    }
  
    function updatePasswordCriteria() {
      const criteriaChecks = {
        'lengthCheck': password.value.length >= 8,
        'lowercaseCheck': /[a-z]/.test(password.value),
        'uppercaseCheck': /[A-Z]/.test(password.value),
        'numberCheck': /\d/.test(password.value),
        'specialCheck': /[!@#$%^&*(),.?":{}|<>]/.test(password.value)
      };
      Object.keys(criteriaChecks).forEach(criteria => updateCriteria(criteria, criteriaChecks[criteria]));
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
    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;
    password.onkeyup = updatePasswordCriteria;
  });