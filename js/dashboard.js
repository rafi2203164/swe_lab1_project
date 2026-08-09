// Protect this page — redirect to login if not logged in
const loggedInUser = sessionStorage.getItem("loggedInUser");

if (!loggedInUser) {
  window.location.href = "index.html";
}

document.getElementById("welcomeMsg").textContent = `Welcome, ${loggedInUser}!`;

document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
});