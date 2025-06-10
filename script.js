// Recupera el valor almacenado o arranca en 0
let count = Number(localStorage.getItem("click-count")) || 0;

// Elementos del DOM
const counter = document.getElementById("counter");
const btnClick = document.getElementById("btn-click");
const btnReset = document.getElementById("btn-reset");

// Muestra el valor actual
updateDisplay();

/**
 * Incrementa el contador, actualiza la vista y guarda en localStorage
 */
btnClick.addEventListener("click", () => {
  count++;
  updateDisplay();
  localStorage.setItem("click-count", count);
});

/**
 * Reinicia el contador
 */
btnReset.addEventListener("click", () => {
  count = 0;
  updateDisplay();
  localStorage.removeItem("click-count");
});

/**
 * Refresca el número mostrado en pantalla
 */
function updateDisplay() {
  counter.textContent = count;
}
