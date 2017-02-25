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
	guessed: [],
	display:[],
	updateScoreCount: 0,
	updateGuessCount:12,
	increaseGuessCount: function(){
		this.updateGuessCount--;
		return this.updateScoreCount;
	},
	increaseCount: function(){
		this.updateScoreCount++;
		return this.updateScoreCount;
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

			if(event.which >=65 && event.which <=90 && model.guessed.indexOf(event.key.toLowerCase()) === -1){
				view.displayLetter(clueWord, event.key.toLowerCase())
				view.displayGuessed(event.key.toLowerCase())
				view.removeInstructions();
				model.increaseGuessCount();
				view.displayRemainingGuessed(model.updateGuessCount);
				if(model.updateGuessCount === 0){
					location.reload();
				}
			}
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

	},
	// As the user guesses the correct letters, reveal them: m a d o _  _ a.
	displayBlank: function(word){

		//if key pressed in word data, find index of letter and replace blank in view
		for(let i=0; i<word.length; i++){
			model.display.push(' _ ')
		}
		return model.display;

	},
	displayLetter: function(word, key){
		//store coordinates for drawing in array
		var drawing = [[800/2, 800/8, 800/8, (800-800/8)]];

		///figure out how to replace letter at index



		var findIndex= function(){
			var indices = [];
			var str = word;
			for(var i=0; i<str.length;i++) {
			    if (str[i].toLowerCase() === key){ indices.push(i)};
			}
			return indices;
		}
		var indexVals = findIndex();
		console.log(indexVals);

		for (let i=0; i<indexVals.length; i++){

				model.display[indexVals[i]] = key;
				$('#word').html(model.display);

				view.displayLine(drawing[0]);
				}



		},
	// Letters Already Guessed: (Letters the user has guessed, displayed like L Z Y H).
	displayGuessed: function(key){
		model.guessed.push(key);
		var newLetter = `<span>${key},</span>`
		$('#guessed').append(newLetter);
	},
	displayRemainingGuessed: function(count){
		$('#turns').html(`Remaining Guesses: ${count}`);

	},
	// update score value in DOM
	displayScore: function(count){
		$('#score').html(count);

	},
	displayLine: function(coordinates){
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.moveTo(coordinates[0], coordinates[1]);
		ctx.lineTo(coordinates[2], coordinates[3]);
		ctx.stroke();
	},
	removeInstructions: function(){
		$('#intro').html("");
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

  // count remaining guessed
  // draw lines to canvas
  //how to keep score when game reinitiates on page load


