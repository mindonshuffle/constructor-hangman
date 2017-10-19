var Letter = require( './letter.js' );

function Word ( wordInput ){

	this.currentWord = wordInput;

	// this.completed = false;

	this.letterArray = [];

	this.createArray = function(){

		for( var i = 0; i < this.currentWord.length; i++ ){

			var currentLetter = new Letter( this.currentWord[i], false );

			if ( currentLetter.letter === ' '){
				currentLetter.guessedCorrectly = true;
			}

			this.letterArray.push(currentLetter);

		}

	}


	this.isSolved = function(){

		var solvedCheck = true;

		for( var i = 0; i < this.letterArray.length; i++ ){

			if( !this.letterArray[i].guessedCorrectly ){
				solvedCheck = false;
			}

		}

		return solvedCheck;

	}

	this.checkGuess = function( guessLetter ){

		var correctGuess = false;

		for( var i = 0; i < this.letterArray.length; i++ ){

			if( this.letterArray[i].letter === guessLetter ){

				correctGuess = true;
				this.letterArray[i].guessedCorrectly = true;

			}

		}

		return correctGuess;
	}

	this.printWord = function(){

		var wordToPrint = '';

		for(var i = 0; i < this.letterArray.length; i++ ){

			wordToPrint += this.letterArray[i].display();
			wordToPrint += ' ';
		}

		console.log('\n    ' +wordToPrint +'\n' );

	}

	this.revealWord = function(){

		var wordToPrint = '';

		for(var i = 0; i < this.letterArray.length; i++ ){

			wordToPrint += this.letterArray[i].letter;
			wordToPrint += ' ';
		}

		console.log('\n    ' +wordToPrint +'\n' );

	}

}

module.exports = Word;