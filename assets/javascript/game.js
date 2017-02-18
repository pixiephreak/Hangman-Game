// Choose a theme for your game! In the demo, we picked an 80s theme: 80s questions, 80s sound and an 80s aesthetic. You can choose any subject for your theme, though, so be creative!
// Use key events to listen for the letters that your players will type.
// Display the following on the page:
// Press any key to get started!
// Wins: (# of times user guessed the word correctly).
// If the word is madonna, display it like this when the game starts: _ _ _ _ _ _ _.
// As the user guesses the correct letters, reveal them: m a d o _  _ a.
// Number of Guesses Remaining: (# of guesses remaining for the user).
// Letters Already Guessed: (Letters the user has guessed, displayed like L Z Y H).
// After the user wins/loses the game should automatically choose another word and make the user play it.


var model = {
	//TO-DO: load random words to array from a remote server or API
	words:['cat','dog','zebra','goat','bush baby','linx'],

}

var controller = {
	// program randomly selects a word from array
	pickWord: function(){

	}
}

var view = {
	init: function(){
		// Use key events to listen for the letters that your players will type.
		window.addEventListener("keyup", function(event){
			console.log('linked');
		});
	},
	// As the user guesses the correct letters, reveal them: m a d o _  _ a.
	displayLetter: function(){

	},
	// If the word is madonna, display it like this when the game starts: _ _ _ _ _ _ _.
	displayWord: function(){

	},
	// Letters Already Guessed: (Letters the user has guessed, displayed like L Z Y H).
	displayGuessed: function(){

	}
	// update score value in DOM
	displayScore: function(){

	}

}

game.init();

