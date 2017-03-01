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
		this.display = [];
		this.updateScoreCount = 0;
		this.updateGuessCount = word.length+5;
		this.updateDrawingCount = 0;
	}

}

var controller = {
	//TO-DO: revise retrieval and display of clue word on init (repeating same word)
	init: function(data){


		// var word = data[0].word; (to use wordnik api)
		word = data;
		//split array into letters and store in an array
		var clueWord = word.split('');
		//remove clue word from the words array in model
		model.words.splice(model.words.indexOf(word), 1);
		//reset model to initial vals
		model.reset();
		//empty word div in DOM
		$('#word').html('');
		//empty guessed-letters spansin DOM
		$('.guessed-letters').html('');
		//empty remaining guesses count val in DOM
		$('#turns').html(`Remaining Guesses: `);
		//clear the canvas of previousley drawn lines
		view.clearCanvas();
		// fill #word elem with num of '_' equal to clueword.length
		$('#word').html(view.displayBlank(clueWord));
		console.log(`The solution is ${word}`);

	},
	//pass random word from api to display function
	updateData: function(){

		$('document').ready(function(){
		// Use key events to listen for the letters that your players will type.
		window.addEventListener("keyup", function(event){

			if(event.which >=65 && event.which <=90 || event.which == 222 || event.which == 189 || event.which == 32){

				if(model.guessed.indexOf(event.key) === -1){
					model.guessed.push(event.key);
					view.displayLetter(clueWord, event.key.toLowerCase())
					view.displayGuessed(event.key.toLowerCase())
					view.removeInstructions();
					model.decreaseGuessCount();
					view.displayRemainingGuessed(model.updateGuessCount);
					if(clueWord.indexOf(event.key) === -1){
						view.displayLine(model.canvasCoords.drawing[model.updateDrawingCount]);
						model.increaseDrawingCount();
					}
					if(model.updateGuessCount <= 0){
						controller.init();
					}else if(model.display.indexOf(' _ ') === -1){
						console.log("won");
						model.increaseCount();
						view.displayScore(updateScoreCount);
						controller.init();
					}
				}

			}
		});
	});

	},
	//when last letter is satisfied, trigger func that draws score in view
	updateCount: function(){
		view.displayScore(model.increaseCount())
	},
	searchLetter: function(){

	},
	random: function(length){
		num = Math.floor((Math.random() * length) + 1);
		return num;
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


