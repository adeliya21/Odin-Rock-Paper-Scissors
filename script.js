const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const playerScoreSpan = document.querySelector('[data-player-score]');
const computerScoreSpan = document.querySelector('[data-computer-score]');

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

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', (event) => {
        //console.log(event);
        const selectionName = selectionButton.dataset.selection;
        const playerSelection = getPlayerSelection(selectionName);
        const computerSelection = getComputerSelection();
        //console.log(playerSelection);
        //console.log(computerSelection);
        playRound(playerSelection, computerSelection);
    })
})

function getPlayerSelection(selectionName) {
    const playerSelection = SELECTIONS.find(selection => selection.name === selectionName);
    return playerSelection;
}

function getComputerSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    const computerSelection = SELECTIONS[randomIndex];
    return computerSelection;
}

function playRound(playerSelection, computerSelection) {

    const playerWinnerStatus = isWinner(playerSelection, computerSelection);
    const computerWinnerStatus = isWinner(computerSelection, playerSelection);

    //order is important
    addSelectionResult(computerSelection, computerWinnerStatus);
    addSelectionResult(playerSelection, playerWinnerStatus);

    if (playerWinnerStatus) incrementScore(playerScoreSpan);
    if (computerWinnerStatus) incrementScore(computerScoreSpan);
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;
}

function addSelectionResult(selection, winnerStatus) {
    const div = document.createElement('div');
    div.innerText = selection.emoji;
    div.classList.add('result-selection');
    if (winnerStatus) div.classList.add('winner');
    finalColumn.after(div); //adds to computer column first, to player column second
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}