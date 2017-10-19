var Letter = require( './letter.js' );

function Word ( wordInput ){

	this.currentWord = wordInput;

	// this.completed = false;

	this.letterArray = [];

	this.createArray = function(){

		for( var i = 0; i < this.currentWord.length; i++ ){

			var currentLetter = new Letter( this.currentWord[i], false );
			this.letterArray.push(currentLetter);

		}

	}

	this.printWord = function(){

		var wordToPrint = '';

		for(var i = 0; i < this.letterArray.length; i++ ){

			// console.log(this.letterArray[i].display());
			wordToPrint += this.letterArray[i].display();
		}

		console.log( wordToPrint );

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

}

module.exports = Word;

// --- MAIN / TEST Logic

var testWord = new Word( 'mummers' );
testWord.createArray();
testWord.printWord();
testWord.isSolved();

