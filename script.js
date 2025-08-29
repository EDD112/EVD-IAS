// Tic-Tac-Toe Game Logic (Unchanged)
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const boardDiv = document.getElementById('ticTacToeBoard');

function initializeBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    boardDiv.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => makeMove(i));
        boardDiv.appendChild(cell);
    }
}

function makeMove(index) {
    if (gameOver || board[index] !== '') return;
    board[index] = currentPlayer;
    renderBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function renderBoard() {
    const cells = boardDiv.children;
    for (let i = 0; i < board.length; i++) {
        cells[i].textContent = board[i];
    }
}

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

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            alert(`${board[a]} wins!`);
            return;
        }
    }

    if (!board.includes('')) {
        gameOver = true;
        alert('It\'s a draw!');
    }
}

function resetTicTacToe() {
    initializeBoard();
}

// Racing Game Logic (Unchanged)
const car = document.getElementById('car');
const raceTrack = document.getElementById('raceTrack');
let carPosition = 0; // car position on the Y-axis (upwards)

function moveCar(e) {
    if (e.key === "ArrowUp" && carPosition > 0) {
        carPosition -= 5;
    } else if (e.key === "ArrowDown" && carPosition < raceTrack.offsetHeight - car.offsetHeight) {
        carPosition += 5;
    }
    car.style.bottom = carPosition + 'px';
}

function resetRacing() {
    carPosition = 0;
    car.style.bottom = carPosition + 'px';
}

document.getElementById('racingBtn').addEventListener('click', () => {
    document.getElementById('racing').style.display = 'block';
    document.getElementById('tictactoe').style.display = 'none';
    document.getElementById('pacman').style.display = 'none';
});

document.getElementById('tictactoeBtn').addEventListener('click', () => {
    document.getElementById('tictactoe').style.display = 'block';
    document.getElementById('racing').style.display = 'none';
    document.getElementById('pacman').style.display = 'none';
    initializeBoard();
});

document.getElementById('pacmanBtn').addEventListener('click', () => {
    document.getElementById('pacman').style.display = 'block';
    document.getElementById('racing').style.display = 'none';
    document.getElementById('tictactoe').style.display = 'none';
});

// Pac-Man Game Logic

let pacman = document.getElementById('pacman');
let pacmanPosition = { x: 135, y: 135 };  // Starting position
let pacmanSpeed = 5;
let dots = [];
let score = 0;

// Generate random dots
function generateDots() {
    const numDots = 10;
    const dotsContainer = document.getElementById('dots');
    dotsContainer.innerHTML = ''; // Clear existing dots

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        const x = Math.floor(Math.random() * 280);
        const y = Math.floor(Math.random() * 280);
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        dots.push({ x, y, element: dot });
        dotsContainer.appendChild(dot);
    }
}

// Move Pac-Man
function movePacman(e) {
    if (e.key === "ArrowUp") {
        pacmanPosition.y -= pacmanSpeed;
    } else if (e.key === "ArrowDown") {
        pacmanPosition.y += pacmanSpeed;
    } else if (e.key === "ArrowLeft") {
        pacmanPosition.x -= pacmanSpeed;
    } else if (e.key === "ArrowRight") {
        pacmanPosition.x += pacmanSpeed;
    }

    // Ensure Pac-Man doesn't go out of bounds
    if (pacmanPosition.x < 0) pacmanPosition.x = 0;
    if (pacmanPosition.x > 270) pacmanPosition.x = 270;
    if (pacmanPosition.y < 0) pacmanPosition.y = 0;
    if (pacmanPosition.y > 270) pacmanPosition.y = 270;

    pacman.style.left = `${pacmanPosition.x}px`;
    pacman.style.top = `${pacmanPosition.y}px`;

    checkDotCollision();
}

// Check if Pac-Man collects any dots
function checkDotCollision() {
    dots.forEach((dot, index) => {
        const dist = Math.sqrt(Math.pow(pacmanPosition.x - dot.x, 2) + Math.pow(pacmanPosition.y - dot.y, 2));
        if (dist < 15) {  // Pac-Man collects the dot
            dots.splice(index, 1);  // Remove the dot from the array
            dot.element.remove();  // Remove it from the DOM
            score++;  // Increment score
            updateScore();
        }
    });
}

// Update Score
function updateScore() {
    document.getElementById('pacman').innerText = `Score: ${score}`;
}

// Reset Pac-Man Game
function resetPacman() {
    pacmanPosition = { x: 135, y: 135 };
    pacman.style.left = `${pacmanPosition.x}px`;
    pacman.style.top = `${pacmanPosition.y}px`;
    score = 0;
    dots = [];
    generateDots();
    updateScore();
}

document.addEventListener('keydown', movePacman);

generateDots(); // Generate dots when the game starts
