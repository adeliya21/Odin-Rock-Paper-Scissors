//UI
//buttons
const selectionButtons = document.querySelectorAll('[data-selection]');

//emoji
const playerEmoji = document.getElementById('playerEmoji');
const computerEmoji = document.getElementById('computerEmoji');

//score
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');

//message
const whoWon = document.getElementById('who-won')
const whyWon = document.getElementById('why-won')

//end
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

const SELECTIONS = [
    {
      name: 'rock',
      emoji: '✊',
      beats: 'scissors'
    },
    {
      name: 'paper',
      emoji: '✋',
      beats: 'rock'
    },
    {
      name: 'scissors',
      emoji: '✌',
      beats: 'paper'
    }
  ]

//listeners

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', () => handleClick(selectionButton.dataset.selection))
})

restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(selectionName) {
    if (isGameOver()) {
        openEndgameModal();
        return;
    }

    const playerSelection = getPlayerSelection(selectionName);
    const computerSelection = getComputerSelection();
    playRound(playerSelection, computerSelection);

    if (isGameOver()) {
        openEndgameModal();
        setFinalMessage();
    }
}

function getPlayerSelection(selectionName) {
    const playerSelection = SELECTIONS.find(selection => selection.name === selectionName);
    return playerSelection;
}

function getComputerSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    const computerSelection = SELECTIONS[randomIndex];
    return computerSelection;
}

let playerNumber = 0;
let computerNumber = 0;
let roundWinner = '';

function playRound(playerSelection, computerSelection) {
    //emoji
    addSelectionResult(playerSelection, playerEmoji);
    addSelectionResult(computerSelection, computerEmoji);

    //score
    incrementScore(playerSelection, computerSelection);

    //message
    updateScoreMessage(roundWinner, playerSelection, computerSelection)
}

function addSelectionResult(selection, uiElement) {
    uiElement.textContent = selection.emoji;
    // uiElement.classList.add('result-selection');
    // if (winnerStatus) uiElement.classList.add('winner');
}

function incrementScore(playerSelection, computerSelection) {
    if (playerSelection.beats === computerSelection.name) {
        playerNumber += 1;
        playerScore.innerText = `Player: ${playerNumber}`;
        roundWinner = 'player';
    }
    if (computerSelection.beats === playerSelection.name) {
        computerNumber += 1;
        computerScore.innerText = `Computer: ${computerNumber}`;
        roundWinner = 'computer';
    }
    if (playerSelection.name === computerSelection.name) {
        roundWinner = 'tie';
    }
}

function updateScoreMessage(roundWinner, playerSelection, computerSelection) {
    if (roundWinner === 'player') {
        whoWon.textContent = 'You won!';
        whyWon.textContent = `${(playerSelection.name)} beats ${computerSelection.name}`;
        return;
    }
    if (roundWinner === 'computer') {
        whoWon.textContent = 'Computer won!';
        whyWon.textContent = `${playerSelection.name} is beaten by ${computerSelection.name}`;
        return;
    }

    whoWon.textContent = 'It\'s a tie';
    whyWon.textContent = `${playerSelection.name} ties with ${computerSelection.name}`;
}

//end

function isGameOver() {
    return playerNumber === 3 || computerNumber === 3;
}

function openEndgameModal() {
    endgameModal.classList.add('active')
    overlay.classList.add('active')
}
  
function closeEndgameModal() {
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}
  
function setFinalMessage() {
    return playerNumber > computerNumber
      ? (endgameMsg.textContent = 'You won!')
      : (endgameMsg.textContent = 'You lost...')
}
  
function restartGame() {
    playerNumber = 0
    computerNumber = 0

    whoWon.textContent = 'Choose your weapon'
    whyWon.textContent = 'Play until 3'

    playerScore.textContent = 'Player: 0'
    computerScore.textContent = 'Computer: 0'

    playerEmoji.textContent = '👤'
    computerEmoji.textContent = '🤖'

    closeEndgameModal();
}