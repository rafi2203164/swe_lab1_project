document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  // Placeholder check - to be replaced with real logic later
  if (username === "admin" && password === "1234") {
    errorMsg.style.color = "green";
    errorMsg.textContent = "Login successful!";
  } else {
    errorMsg.style.color = "red";
    errorMsg.textContent = "Invalid username or password.";
  }
});
