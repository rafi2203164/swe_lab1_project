const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");
const passwordStrength = document.getElementById("passwordStrength");
const togglePassword = document.getElementById("togglePassword");
const rememberMe = document.getElementById("rememberMe");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const switchLink = document.getElementById("switchLink");
const switchText = document.getElementById("switchText");

let mode = "login"; // "login" or "register"

window.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("rememberedUser");
  if (savedUser) {
    usernameInput.value = savedUser;
    rememberMe.checked = true;
  }
});

togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePassword.textContent = isHidden ? "🙈" : "👁";
});

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;

  if (!password) {
    passwordStrength.textContent = "";
    return;
  }

  let score = 0;

  if (password.length >= 4) score++;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    passwordStrength.textContent = "Weak password";
    passwordStrength.style.color = "red";
  } else if (score <= 3) {
    passwordStrength.textContent = "Medium password";
    passwordStrength.style.color = "orange";
  } else {
    passwordStrength.textContent = "Strong password";
    passwordStrength.style.color = "green";
  }
});

switchLink.addEventListener("click", (e) => {
  e.preventDefault();
  mode = mode === "login" ? "register" : "login";

  if (mode === "register") {
    formTitle.textContent = "Register";
    submitBtn.textContent = "Register";
    switchText.textContent = "Already have an account?";
    switchLink.textContent = "Login";
  } else {
    formTitle.textContent = "Login";
    submitBtn.textContent = "Login";
    switchText.textContent = "Don't have an account?";
    switchLink.textContent = "Register";
  }
  errorMsg.textContent = "";
});

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "{}");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function showError(text, isSuccess = false) {
  errorMsg.textContent = text;
  errorMsg.style.color = isSuccess ? "green" : "red";
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    showError("Please fill in both fields.");
    return;
  }

  if (password.length < 4) {
    showError("Password must be at least 4 characters.");
    return;
  }

  const users = getUsers();

  if (mode === "register") {
    if (users[username]) {
      showError("Username already exists. Try logging in.");
      return;
    }
    users[username] = password;
    saveUsers(users);
    showError("Registration successful! You can now log in.", true);
    mode = "login";
    formTitle.textContent = "Login";
    submitBtn.textContent = "Login";
    switchText.textContent = "Don't have an account?";
    switchLink.textContent = "Register";
    return;
  }

  // Login mode
  if (users[username] && users[username] === password) {
    if (rememberMe.checked) {
      localStorage.setItem("rememberedUser", username);
    } else {
      localStorage.removeItem("rememberedUser");
    }
    sessionStorage.setItem("loggedInUser", username);
    showError(`Welcome back, ${username}!`, true);

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);
  } else {
    showError("Invalid username or password.");
  }
});