// ---- ---- VARIABLES AND DEPENDANCIES ---- ----

var Word = require( './word.js' );
var inquirer = require( 'inquirer' );
var fs = require( 'fs' );


var wordArray = [];
var currentWord = null;
var guessesLeft = 9;
var guessedLetters = [];


// ---- ---- GLOBAL FUNCTIONS ---- ----

//read in txt file, use comma separation to create word list array
function createWordList(){

	// read in wordlist.txt with f
	fs.readFile("wordfile.txt", "utf8", function(error, data) {

		if (error) {
		return console.log(error);
		}

		//set wordArray to contents of file, split by commas
		wordArray = data.split(",");

		//choose a word to begin game
		newWord();
	});

}

function newWord(){

	//randomly pick word from wordArray

	var randomIndex = Math.floor(Math.random() * wordArray.length);

	var wordPick = wordArray[randomIndex];

	// initialize word object to currentWord

	currentWord = new Word (wordPick);

	currentWord.createArray();

	//reset guesses
	guessesLeft = 9;
	guessedLetters = [];

	//start new round
	gameRound();

}


function gameRound(){

	// Print Turns Remaining

	console.log('Guesses Remaining: ' +guessesLeft);

	// Print Current Word state

	currentWord.printWord();

	// Prompt for letter guess

	inquirer.prompt([
		{
	    	type: "input",
	    	name: "letterGuess",
	    	message: "Please guess a letter: "
	  	}

	]).then( function ( response ) {

		// FIRST validate input is single letter

		// and not already guessed

		// THEN check the guess using word method

		if( currentWord.checkGuess( response.letterGuess ) ){

			console.log('Correct!');

		}

		// if guess incorrect, decrement guesses
		else{

			console.log('Incorrect!')
			guessesLeft --;

		}

		// If word completed, win

		if( currentWord.isSolved() ){

			endGame(true);
			// console.log('You Win!');

		}

		// If no more guesses, lose

		else if( guessesLeft <= 0 ){

			endGame(false);
			// console.log('You Lose!');

		}

		else {

			gameRound();

		}

	});

}

//function to prompt for new game
function endGame( won ){

	// display appropriate win/loss message
	if(won){
		console.log('You have won!')
	}
	else{
		console.log('You have lost! The correct answer was:')
	};

	// reveals the current word in full
	currentWord.revealWord();

	//prompts for new game
	inquirer.prompt([
		{
	    	type: "list",
	    	name: "newGame",
	    	message: "Would you like to play again?",
	    	choices: ["Yes", "No"]
	  	}
	]).then( function ( response ) {

		//if yes, picks new word
		if( response.newGame === 'Yes'){
			
			newWord();

		}

		//otherwise returns
		else {
			return;
		}

	});
}

// ---- ---- MAIN LOGIC ---- ----

//initializes wordlist and begins game
createWordList();
