// Define array
const hands = ['rock', 'paper', 'scissors'];

// Define getHand()
function getHand() {
    // Return a hand from array
    return hands[parseInt(Math.random() * 10) % 3];
    }

// Define two player objects
const playerOne = {
     name: "",
     hand: getHand
}
const playerTwo = {
    name: "", //Removed names because we're going to replace them later in the tournament arguments
    hand: getHand
}

// Define playRound function
function playRound(playerOne, playerTwo) {
    // Get hands
    const p1Hand = playerOne.hand(); // Adjusted getting hands as per Brandon Wall's grading
    const p2Hand = playerTwo.hand();
    // Rewritten playRound to be more efficient and dynamic
    if (p1Hand === p2Hand) {
        console.log(`It's a tie! Both players chose ${p1Hand}`);
        return null;
    } else if ((p1Hand === 'rock' && p2Hand === 'scissors') ||
               (p1Hand === 'paper' && p2Hand === 'rock') ||
               (p1Hand === 'scissors' && p2Hand === 'paper')) {
        console.log(`${playerOne.name} wins with ${p1Hand} against ${p2Hand}`);
        return playerOne;
    } else if ((p2Hand === 'rock' && p1Hand === 'scissors') ||
                (p2Hand === 'paper' && p1Hand === 'rock') ||
                (p2Hand === 'scissors' && p1Hand === 'paper')) {
        console.log(`${playerTwo.name} wins with ${p2Hand} against ${p1Hand}`);
        return playerTwo;
    }
    else{
        console.log(`Critical Error! Something really went wrong!`) //Final error checking in case something crazy happens
        return undefined;
    }
}

function playGame(player1, player2, playUntil){
    // Initialize player wins
    player1wins = 0;
    player2wins = 0;
    // Play rounds in a loop till wins === playUntil
    while (player1wins != playUntil || player2wins != playUntil)
        {
            if(playRound(player1, player2) == playerOne){
                player1wins++;
                if (player1wins == playUntil){
                    return player1
                }
            }
            else if(playRound(player1, player2) == playerTwo){
                player2wins++;
                if (player2wins == playUntil){
                    return player2
                }
            }
        }
}

function playTournament(players, playUntil) {
    // Set names and play games for the first two players
    playerOne.name = players[0];
    playerTwo.name = players[1];
    let game1Winner = playGame(playerOne, playerTwo, playUntil);

    // UPDATE: Add code to set player visuals on webpage to reflect wins
    document.getElementById('player1Name').textContent = game1Winner.name;
    document.getElementById('player1Wins').textContent = playUntil;
    
    // Set names and play games for the second two players
    playerOne.name = players[2];
    playerTwo.name = players[3];
    let game2Winner = playGame(playerOne, playerTwo, playUntil);

    // UPDATE: same as update above.
    document.getElementById('player2Name').textContent = game2Winner.name;
    document.getElementById('player2Wins').textContent = playUntil;
    
    // Play the final game between the winners of the previous games
    playerOne.name = game1Winner.name;
    playerTwo.name = game2Winner.name;
    let grandChamp = playGame(game1Winner, game2Winner, playUntil);

    console.log(`${grandChamp.name} is the world champion!`);

    // Display Champion in webpage
    document.getElementById('tournamentWinner').textContent = grandChamp.name;
}

// Old tournament call, ignore
// playTournament(["Mike", "Justus", "Easton", "Dewey"], 3); 

document.addEventListener('DOMContentLoaded', function() {
    let player1Wins = 0;
    let player2Wins = 0;

    // Event listener for Start Game button
    document.getElementById('startGameBtn').addEventListener('click', function() {
        // Get player names from input fields
        const player1NameInput = document.getElementById('player1NameInput').value.trim();
        const player2NameInput = document.getElementById('player2NameInput').value.trim();

        // Validate input
        if (!player1NameInput || !player2NameInput) {
            alert('Please enter names for both players.');
            return;
        }

        // Initialize game
        player1Wins = 0;
        player2Wins = 0;

        // Update score display
        document.getElementById('player1Score').textContent = `${player1NameInput}: ${player1Wins}`;
        document.getElementById('player2Score').textContent = `${player2NameInput}: ${player2Wins}`;

        // Show score section and hide input fields and button
        document.querySelector('.score').style.display = 'block';
        document.getElementById('player1NameInput').style.display = 'none';
        document.getElementById('player2NameInput').style.display = 'none';
        document.getElementById('startGameBtn').style.display = 'none';

        // Hide restart button
        document.getElementById('restartGameBtn').style.display = 'none';

        // Start the game
        playGame(player1NameInput, player2NameInput, 3); // Adjust playUntil as needed
    });

    // Event listener for Restart Game button
    document.getElementById('restartGameBtn').addEventListener('click', function() {
        // Show input fields and start game button
        document.getElementById('player1NameInput').style.display = 'block';
        document.getElementById('player2NameInput').style.display = 'block';
        document.getElementById('startGameBtn').style.display = 'block';

        // Hide score section and game results and restart button
        document.querySelector('.score').style.display = 'none';
        document.getElementById('gameResults').innerHTML = '';
        document.getElementById('restartGameBtn').style.display = 'none';

        // Reset scores
        player1Wins = 0;
        player2Wins = 0;
    });

    function playGame(player1Name, player2Name, playUntil) {
        const gameResultsDiv = document.getElementById('gameResults');
        gameResultsDiv.innerHTML = ''; // Clear previous game results

        let roundCount = 1;

        // Function to update scores and display game results
        function updateScoresAndResults(winner) {
            if (winner === player1Name) {
                player1Wins++;
            } else if (winner === player2Name) {
                player2Wins++;
            }

            // Update score display
            document.getElementById('player1Score').textContent = `${player1Name}: ${player1Wins}`;
            document.getElementById('player2Score').textContent = `${player2Name}: ${player2Wins}`;

            roundCount++;

            // Check if game is over (e.g., one player wins a certain number of rounds)
            if (player1Wins >= playUntil || player2Wins >= playUntil) {
                let gameWinner = player1Wins >= playUntil ? player1Name : player2Name;
                const finalMessage = document.createElement('p');
                finalMessage.textContent = `${gameWinner} wins the game!`;
                finalMessage.classList.add('font-weight-bold', 'text-success');
                gameResultsDiv.appendChild(finalMessage);

                // Show restart button
                document.getElementById('restartGameBtn').style.display = 'block';
            } else {
                // Continue playing rounds
                playRound(player1Name, player2Name);
            }
        }

        // Function to play a single round with Player 1 choosing their hand
        function playRound(player1, player2) {
            let p1Hand = prompt(`${player1}, choose your hand: rock, paper, or scissors`).toLowerCase();
            
            // Validate Player 1's input
            while (!['rock', 'paper', 'scissors'].includes(p1Hand)) {
                p1Hand = prompt('Invalid input. Please choose rock, paper, or scissors.').toLowerCase();
            }

            const p2Hand = getHand(); // Player 2's hand is randomly generated

            let winner = null;

            if (p1Hand === p2Hand) {
                winner = 'tie';
            } else if (
                (p1Hand === 'rock' && p2Hand === 'scissors') ||
                (p1Hand === 'paper' && p2Hand === 'rock') ||
                (p1Hand === 'scissors' && p2Hand === 'paper')
            ) {
                winner = player1;
            } else {
                winner = player2;
            }

            // Display round results
            const roundResult = document.createElement('p');
            roundResult.textContent = `Round ${roundCount}: ${player1} (${p1Hand}) vs ${player2} (${p2Hand}) - ${winner === 'tie' ? 'It\'s a tie!' : winner + ' wins!'}`;
            roundResult.classList.add('round-result');
            gameResultsDiv.appendChild(roundResult);

            // Update scores and check game end
            updateScoresAndResults(winner);
        }

        // Start the first round
        playRound(player1Name, player2Name);
    }
});
