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

// cape woman: with each correct letter, you come closer to finidng your inner heroine.
//build woman symbol from array of functions (style.XXXX);
// correct solution reveals cape

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


	},
	//pass random word form api to display function
	updateData: function(data){

		var word = data[0].word;
		var clueWord = word.split('');
		console.log(`The solution is ${clueWord}`);

		// //how to return the next word each time ina longer array?
		// function randWord(){
		// 		console.log("randWord: "+data[0].word)
		// 		return data[0].word;
		// 		data.shift();
		// }

		//update cont by letters replaced
			//when count === word.length, view.displayVictory()
			$('document').ready(function(){
				$('#word').html(view.displayBlank(clueWord));

			})

		// Use key events to listen for the letters that your players will type.
		window.addEventListener("keyup", function(event){
			view.displayLetter(clueWord, event.key)
			view.displayGuessed(event.key)

		});

	},
	//when last letter is satisfied, trigger func that draws score in view
	updateCount: function(){
		view.displayScore(model.increaseCount())
	},
	searchLetter: function(){

	}
}

//view should exist without data (loading view)
var view = {
	init: function(){
		var count = 0;

	},
	// As the user guesses the correct letters, reveal them: m a d o _  _ a.
	displayBlank: function(word){
		var display = [];
		//if key pressed in word data, find index of letter and replace blank in view
		for(let i=0; i<word.length; i++){
			display.push(' _ ')
		}
		return display;
		console.log(display);
	},
	displayLetter: function(word, key){
		///figure out how to replace letter at index

		if (word.indexOf(key.toLowerCase()) != -1){
			var display = $('#word').html();
			var index = word.indexOf(key.toLowerCase());
			//display is not a string
			display = display.split(/[ ,]+/).filter(Boolean);
			display[index] = key;
			// now display pushes as a string
			$('#word').html(display);
			console.log(display);

			}


		},
	// Letters Already Guessed: (Letters the user has guessed, displayed like L Z Y H).
	displayGuessed: function(key){
		var newLetter = `<span>${key},</span>`
		$('#guessed').append(newLetter);
	},
	displayGuessRemaining: function(){

	},
	// update score value in DOM
	displayScore: function(count){
		$('#score').html(count);

	},
	displayLine: function(startx,starty,finishx,finishy){
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.moveTo(startx,starty);
		ctx.lineTo(finishx,finishy);
		ctx.stroke();
	}
}

controller.init();

//render



// $.get('http://www.setgetgo.com/randomword/get.php', {len:5}, (data) => controller.updateData(data));
// $.get('http://www.setgetgo.com/randomword/get.php', (data) => controller.updateData(data));

$.get('http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5' , (data) => controller.updateData(data));

  //get synonyms and give hints

  //keep track of states
  //state - word
  //state - letters tried
  //

