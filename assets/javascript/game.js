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
	updatedCount: 0,
	increaseCount: function(){
		this.updatedCount++;
		return this.updatedCount;
	}

}

var controller = {
	init: function(){
		//grab button div
		$('#button').click(function(){
			view.displayScore(model.increaseCount());
		})

	},
	//
	updateData: function(data){
		console.log(data);
		$('#word').html(view.displayBlank(data));

	},
	//when last letter is satisfied, trigger func that draws score in view
	updateCount: function(){
		//fire view  and pass value to displaycount();
	}
}

//view should exist without data (loading view)
var view = {
	init: function(){
		var count = 0;
		// Use key events to listen for the letters that your players will type.
		window.addEventListener("keyup", function(event){
			console.log('linked');
		});


	},
	// As the user guesses the correct letters, reveal them: m a d o _  _ a.
	displayLetter: function(){

	},
	// If the word is madonna, display it like this when the game starts: _ _ _ _ _ _ _.
	displayBlank: function(word){
		var blanks = [];
		for(i = 0; i < word.length; i++){
			blanks.push('_', ' ');
		}
		return blanks;

	},
	// Letters Already Guessed: (Letters the user has guessed, displayed like L Z Y H).
	displayGuessed: function(){

	},
	// update score value in DOM
	displayScore: function(count){
		$('#score').html(count);

	}
}

controller.init();
view.init();

//render



// $.get('http://www.setgetgo.com/randomword/get.php', {len:5}, (data) => controller.updateData(data));
$.get('http://www.setgetgo.com/randomword/get.php', (data) => controller.updateData(data));
  //get synonyms and give hints

  //keep track of states
  //state - word
  //state - letters tried
  //

