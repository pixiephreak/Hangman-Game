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

var word;
var clueWord;

var model = {
	//words array (backup for random words to array from wordnik API)
	words:['water buffalo','wild dog','warthog','billy goat','bush baby','linx','secretary bird','antelope'],
	//store letters which have already been guessed.
	guessed: [],
	//store an array of '_' the length of clue word
	display:[],
	//store user's score
	updateScoreCount: 0,
	//store number of guesses the user has left.
	updateGuessCount: 0 ,
	//store index for retrieving canvasCoords
	updateDrawingCount: 0,
	//decrease number of guesses available to user before reset
	decreaseGuessCount: function(){
		this.updateGuessCount--;
		return this.updateScoreCount;
	},
	//increase score count by one
	increaseCount: function(){
		this.updateScoreCount++;
		return this.updateScoreCount;
	},
	//increase count used to retreive line coords
	increaseDrawingCount: function(){
		this.updateDrawingCount++;
		return this.updateDrawingCount;
	},
	//store parameters called to populate displayLine
	canvasCoords: {
		//retrieve canvas dimension
		width: $( 'canvas' ).attr( "width" ),
		height: $( 'canvas' ).attr( "height" ),

		//store coordinates for drawing line function in array
		drawing: [[350,200,50,400], [350,200,700,400], [700,400,50,400],[350,200,350,150],[350,150, 325, 125], [325,125,300,125],[300,125, 275, 150],[275, 150, 275, 175],[300,300, 325, 300], [400,300,425,300], [350,320,360,320],[325,350,375,350]]
	},
	reset: function(){
		//reset counts to initial values
		this.guessed = [];
		console.log(this.guessed);
		this.display = [];
		this.updateGuessCount = word.length+5;
		this.updateDrawingCount = 0;
	}

}

var controller = {
	//TO-DO: revise retrieval and display of clue word on init (repeating same word)
	init: function(data){


		// var word = data[0].word; (to use wordnik api) TO-DO: write if statment here
		word = data;
		//split array into letters and store in an array
		clueWord = word.split('');
		console.log(clueWord);
		//remove clue word from the words array in model
		model.words.splice(model.words.indexOf(word), 1);
		//reset model to initial vals
		model.reset();
		//empty word div in DOM
		$('#word').html('');
		//empty guessed-letters spans in DOM
		$('.guessed-letters').html('');
		//empty remaining guesses count val in DOM
		$('#turns').html(`Remaining Guesses: `);
		//clear the canvas of previousley drawn lines
		view.clearCanvas();
		// fill #word elem with num of '_' equal to clueword.length
		$('#word').html(view.displayBlank(clueWord));
		console.log(`The solution is ${word}`);


		// Use key events to listen for the letters that your players will type.
		window.addEventListener("keyup", function(event){
			//check if keys are letters, space, or apostrophe
			if(event.which >=65 && event.which <=90 || event.which == 222 || event.which == 189 || event.which == 32){
				// TO-DO: prevent default
				//check if the letter has been pressed or not
				if(model.guessed.indexOf(event.key) === -1){
					//if it's a new letter, store it in an array of pressed letters
					model.guessed.push(event.key);
					//check for the letter in the clueword and replace it if present
					//TO-DO: why doesn't this update?!?! (logging only initial clueWord)
					view.displayLetter(clueWord, event.key.toLowerCase())
					//show the already guessed letter in the #guessed div
					view.displayGuessed(event.key.toLowerCase())
					//remove initial instrucitons from screen
					view.removeInstructions();
					//descrease the number of guesses left to player
					model.decreaseGuessCount();
					//show num of guesses left in #turns div
					view.displayRemainingGuessed(model.updateGuessCount);
					//if the letter pressed isn't in the clueWord array
					if(clueWord.indexOf(event.key.toLowerCase()) === -1){
						//draw a line of the hange rimage to the canvas
						view.displayLine(model.canvasCoords.drawing[model.updateDrawingCount]);
						//increase drawing count by one in order to select the next array of coords
						model.increaseDrawingCount();
					}
					//check if the player has run out of guesses
					if(model.updateGuessCount <= 0){
						//reset game state with new word and initial values
						controller.init(model.words[controller.random(model.words.length-1)]);
					//check if word has been completed
					}else if(model.display.indexOf(' _ ') === -1){
						console.log("won");
						//increase the user's score in model
						model.increaseCount();
						//display the updated score in DOM
						view.displayScore(model.updateScoreCount);
						//reset game state with new word and initial values
						controller.init(model.words[controller.random(model.words.length-1)]);
					}
				}

			}
		});


	},
	//return a random letter between 0 and given param
	random: function(length){
		num = Math.floor((Math.random() * length) + 1);
		return num;
	}
}

//view should exist without data (loading view)
var view = {
	init: function(){

	},
	// create a blank for each letter in word and store in an array
	displayBlank: function(word){


		for(let i=0; i<word.length; i++){
			model.display.push(' _ ')
		}
		return model.display;

	},
	//if key pressed in word, find index of letter and replace blank in view with letter
	displayLetter: function(word, key){



		var findIndex= function(){
			var indices = [];
			var str = word;
			//Logging only to initial word
			for(var i=0; i<str.length;i++) {
			    if (str[i].toLowerCase() === key){ indices.push(i)};
			}
			return indices;
		}
		var indexVals = findIndex();

		for (let i=0; i<indexVals.length; i++){

				model.display[indexVals[i]] = key;
				$('#word').html(model.display);

				}



		},
	// Letters Already Guessed: (Letters the user has guessed, displayed like L Z Y H).
	displayGuessed: function(key){
		var newLetter = `<span class='guessed-letters'>${key},</span>`
		$('#guessed').append(newLetter);
	},
	displayRemainingGuessed: function(count){
		$('#turns').html(`Remaining Guesses: ${count}`);

	},
	// update score value in DOM
	displayScore: function(count){
		$('#score').html(`Score: ${count}`);

	},
	displayLine: function(coordinates){
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.moveTo(coordinates[0], coordinates[1]);
		ctx.lineTo(coordinates[2], coordinates[3]);
		ctx.stroke();
	},
	clearCanvas: function(){
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		//retrieve canvas dimension
		var width = $( 'canvas' ).attr( "width" );
		var height = $( 'canvas' ).attr( "height" );

		ctx.clearRect(0, 0, width, height);
	},
	removeInstructions: function(){
		$('#intro').html("");
	}
}

controller.init(model.words[controller.random(model.words.length-1)]);



// removed wordnik get request due to mixed content error.
// GET request generates random word from API, but no HTTPS support. Runs locally, but does not deploy to Heroku/Pages due to SSL
// $.get('http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5' , (data) => controller.updateData(data));

  // TO-DO:
  //get synonyms and give hints
  //fallback when API wont load
  // turn off heroku https:


