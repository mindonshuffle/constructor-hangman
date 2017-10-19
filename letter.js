function Letter( letter, guessedCorrectly ) {
	
	this.letter = letter;
	this.guessedCorrectly = guessedCorrectly;
	
	this.display = function() {
		if( this.guessedCorrectly ){
			return this.letter;
		} else {
			return '*';
		} 
	}
}

module.exports = Letter;


// create an array of letter

// take a guess and checks array