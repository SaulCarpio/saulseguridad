document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que el formulario se envíe

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  // Credenciales válidas (usuario: admin, contraseña: admin123)
  if (username === "admin" && password === "admin123") {
    window.location.href = "dashboard.html"; // Redirige al dashboard
  } else {
    errorMessage.textContent = "Usuario o contraseña incorrectos.";
  }
});