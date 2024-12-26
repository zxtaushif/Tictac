// Elements
const gameBoard = document.getElementById("gameBoard");
const lightThemeButton = document.getElementById("light-theme-btn");
const darkThemeButton = document.getElementById("dark-theme-btn");
const resultModal = document.getElementById("resultModal");
const modalMessage = document.getElementById("modalMessage");
const closeModal = document.getElementById("closeModal");
const restartGame = document.getElementById("restartGame");

let currentPlayer = "X";
let board = Array(9).fill("");

// Load sounds
const clickSound = new Audio("sounds/click.mp3");
const restartSound = new Audio("sounds/restart.mp3");
const themeChangeSound = new Audio("sounds/theme-change.mp3");

// Initialize game board
function initializeBoard() {
  gameBoard.innerHTML = "";
  board = Array(9).fill("");
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    gameBoard.appendChild(cell);
  }
}

// Handle cell clicks
gameBoard.addEventListener("click", (e) => {
  const cell = e.target;
  const index = cell.dataset.index;

  if (!cell.classList.contains("cell") || cell.classList.contains("taken")) return;

  cell.textContent = currentPlayer;
  cell.classList.add("taken");
  board[index] = currentPlayer;

  clickSound.play(); // Play click sound

  if (checkWinner()) {
    showModal(`${currentPlayer} Wins! 🎉`);
  } else if (board.every((cell) => cell)) {
    showModal("It's a Tie! 🤝");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
});

// Check winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Show modal
function showModal(message) {
  modalMessage.textContent = message;
  resultModal.style.display = "flex";
}

// Close modal
closeModal.addEventListener("click", () => {
  resultModal.style.display = "none";
});

restartGame.addEventListener("click", () => {
  resultModal.style.display = "none";
  initializeBoard();
  currentPlayer = "X";
  restartSound.play(); // Play restart sound
});

// Theme switching
lightThemeButton.addEventListener("click", () => {
  document.body.classList.remove("dark-theme");
  document.body.classList.add("light-theme");
  themeChangeSound.play(); // Play theme change sound
});

darkThemeButton.addEventListener("click", () => {
  document.body.classList.remove("light-theme");
  document.body.classList.add("dark-theme");
  themeChangeSound.play(); // Play theme change sound
});

// Initialize on load
initializeBoard();
document.body.classList.add("light-theme");