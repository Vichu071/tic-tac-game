document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button');
    const gameBoard = document.getElementById('game-board');
    const startScreen = document.getElementById('start-screen');
    const cells = document.querySelectorAll('.cell');
    const winnerDisplay = document.createElement('div');
    winnerDisplay.id = 'winner-display';
    gameBoard.appendChild(winnerDisplay);

    let player1Name = '';
    let player2Name = '';
    let currentPlayer = 'X';
    let board = Array(9).fill(null);

    startButton.addEventListener('click', () => {
        player1Name = document.getElementById('player1').value;
        player2Name = document.getElementById('player2').value;

        if (player1Name && player2Name) {
            startScreen.style.display = 'none';
            gameBoard.style.display = 'block';
        } else {
            alert('Please enter both player names.');
        }
    });

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (board[index] || checkWinner()) return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.style.color = currentPlayer === 'X' ? '#ff6f61' : '#6f61ff';
        
        if (checkWinner()) {
            const winnerName = currentPlayer === 'X' ? player1Name : player2Name;
            winnerDisplay.textContent = `${winnerName} wins!`;
            winnerDisplay.classList.add('show');
        } else if (board.every(cell => cell)) {
            winnerDisplay.textContent = 'It\'s a tie!';
            winnerDisplay.classList.add('show');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });
    }

    function resetGame() {
        board = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.color = '';
        });
        currentPlayer = 'X';
        winnerDisplay.textContent = '';
        winnerDisplay.classList.remove('show');
    }
});
