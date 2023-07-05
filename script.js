const options = ['rock', 'paper', 'scissors']

function getComputerSelection() {
    let computerSelection = options[Math.floor(Math.random() * options.length)]
    //console.log(computerSelection)
    return computerSelection
}

function checkWinner(playerSelection, computerSelection) { // return the winner of the round
    if (playerSelection === computerSelection) {
        return 'tie'
    }
    else if (
        playerSelection == 'rock' && computerSelection == 'scissors' ||
        playerSelection == 'scissors' && computerSelection == 'paper' ||
        playerSelection == 'paper' && computerSelection == 'rock'
    ) {
        return 'player'
    }
    else {
        return 'computer'
    }
}

function playRound(playerSelection, computerSelection) { // return the result of the round
    let result = checkWinner(playerSelection, computerSelection)
    if (result == 'tie') {
        return 'It\'s a tie'
    }
    else if (result == 'player') {
        return `You win this round! ${playerSelection} beats ${computerSelection}`
    }
    else {
        return `Computer win this round! ${computerSelection} beats ${playerSelection}`
    }
}

function getPlayerSelection() {
    let validateInput = false
    while (validateInput == false) { // request to enter a choice, until gotten one from options
        const choice = prompt('rock paper scissors')
        if (choice == null) {
            continue
        }
        const choiceInLower = choice.toLowerCase()
        if (options.includes(choiceInLower)) {
            validateInput = true
            return choiceInLower
        }
    }
}

function game() {
    console.log('Welcome!')
    let playerScore = 0
    let computerScore = 0
    for (i = 0; i < 5; i++) {
        console.log(`---------- round ${i} -----------`)
        const playerSelection = getPlayerSelection()
        const computerSelection = getComputerSelection()
        console.log(playRound(playerSelection, computerSelection)) // return the result of the round
        if (checkWinner(playerSelection, computerSelection) == 'player') {
            playerScore++
        }
        else if (checkWinner(playerSelection, computerSelection) == 'computer') {
            computerScore++
        }
    }
    console.log('Game Over')

    if (playerScore > computerScore) {
        console.log('You win the game')
    }
    else if (playerScore < computerScore) {
        console.log('Computer win the game')
    }
    else {
        console.log(`It's a tie in the game`)
    }
}

game()