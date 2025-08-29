// Tic-Tac-Toe Game Logic
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

document.getElementById('tictactoeBtn').addEventListener('click', () => {
    document.getElementById('tictactoe').style.display = 'block';
    document.getElementById('racing').style.display = 'none';
    document.getElementById('pacman').style.display = 'none';
    initializeBoard();
});

document.getElementById('racingBtn').addEventListener('click', () => {
    document.getElementById('racing').style.display = 'block';
    document.getElementById('tictactoe').style.display = 'none';
    document.getElementById('pacman').style.display = 'none';
});

document.getElementById('pacmanBtn').addEventListener('click', () => {
    document.getElementById('pacman').style.display = 'block';
    document.getElementById('racing').style.display = 'none';
    document.getElementById('tictactoe').style.display = 'none';
});
