/*
	Overall

	* Functions should be declared outside of the scope of your window.onload function.
	
	* Do not style with javascript. Add a class and style with CSS
	    - The only exception to this rule is if you are using a CSS-in-JS library with
	      an established framework like React/Angular/Vue
		- CSS is for styling, JS is for interactions. Keep it separate to avoid fatigue
		  and confusion

	* Know the difference between window.load and DOMContentLoaded. This should all really be
	  inside document.addEventListener('DOMContentLoaded', function() { ...blah })
	
	* Abstract and compose your code with functions that havea single responsibility.
	  This will make your code much easier to read and understand.

	  For example, playerChoices[i].click function should be a totally new function
	  called "handlePlayerClick" 
	
	  Some of your functions like getRandomIntInclusive should really be scoped at the 
	  top level. Putting it inside a loop will redeclare and add more event listeners
	  unnecessarily, potentially causing memory leaks if these elements were to be
	  removed from the DOM.

	* Consider learning the new version of Javascript - anything ES6+ is great.
	    - I did a talk at General Assembly in Downtown Los Angeles about this
	      Link to slides here: https://mrbenj.github.io/es6-preso/
	    - Another talk that would be great for you, but a little bit more advanced
	      https://mrbenj.github.io/js-ecosystem-preso/#/
	    - You can start using ES6+ with Babel transpiling. Link below
          https://babeljs.io/
  
 */

window.onload = function() {

	/*I'm using global variables here for the scores. I think I should put them in a function with a closure or something to avoid this, but
	I'm not sure how. Or maybe it's acceptable to use global variables for the score. Let me know.*/
	var playerScore = 0;	//Player Score starts at 0.
	var compScore = 0;	//Computer Score starts at 0.

	//This selects the buttons that the player clicks on (R, P, S). Again, it is in a global context. Let me know if I should change this.
	var playerChoices = document.querySelectorAll("#player .space");

	//Change color and background color of button when Player R, P, or S is clicked; determine winner; display winner
	for (var i = 0; i < playerChoices.length; i++) {
		playerChoices[i].addEventListener("click", function(event) {
			event.target.style.color = "white";
			event.target.style.backgroundColor = "#7CC6FE";

			//Disable player choice buttons after clicking it
			for (var i = 0; i < playerChoices.length; i++) {
			playerChoices[i].disabled = true;
			playerChoices[i].style.cursor = "default";
			}

			//Generate random num between 1 and 3 inclusive
			function getRandomIntInclusive(min, max) {
			    min = Math.ceil(min);
			    max = Math.floor(max);
			    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
			}

			var randNum = getRandomIntInclusive(1, 3);
			
			/*Randoms numbers 1, 2, and 3 correspond to rock, paper, scissors respectively as the computer choice.
			The random computer choice is highlighted by chaning color and background color.*/
			if (randNum === 1) {
				var compRock = document.querySelector("#cRock");
				compRock.style.backgroundColor = "#C884C6";
				compRock.style.color = "white";
			} else if (randNum === 2) {
				var compPaper = document.querySelector("#cPaper");
				compPaper.style.backgroundColor = "#C884C6";
				compPaper.style.color = "white";
			} else {
				var compScissors = document.querySelector("#cScissors");
				compScissors.style.backgroundColor = "#C884C6";
				compScissors.style.color = "white";
			}

			//Select span tag where result will be displayed
			var res = document.querySelector("#resultSpanTag");

			//Object to facilitate if/else if statement below for determining tie
			numChoiceCorrespondance = {
				1: "R",
				2: "P",
				3: "S",
			}

			//Change text of result span tag to display winner or tie depending on player and computer choice
			var clickedText = event.target.innerText;
			if (clickedText === numChoiceCorrespondance[randNum]) {
				res.innerHTML = "<strong>Tie!</strong>"
			} else if (clickedText === "R" && randNum === 3) {
				res.innerHTML = "<strong>Player wins!</strong>";
				playerScore++;
			} else if (clickedText === "P" && randNum === 1) {
				res.innerHTML = "<strong>Player wins!</strong>";
				playerScore++;
			} else if (clickedText === "S" && randNum === 2) {
				res.innerHTML = "<strong>Player wins!</strong>";
				playerScore++;
			} else {
				res.innerHTML = "<strong>Computer wins!</strong>";
				compScore++;
			}

			//Select span to display score
			var playerScoreSpan = document.querySelector("#playerScore");
			var compScoreSpan = document.querySelector("#compScore");
			playerScoreSpan.innerText = playerScore;
			compScoreSpan.innerText = compScore;
		})		
	}

	//This funtion will be used when clicking Next Round and Start Over buttons. 
	function enableColorResult() {
		//Enable player choice buttons and change colors back to default.

		var compChoices = document.querySelectorAll("#computer .space");

		for (var i = 0; i < playerChoices.length; i++) {
			playerChoices[i].disabled = false;
			playerChoices[i].style.cursor = "pointer";
			playerChoices[i].style.color = "#0066ff";
			playerChoices[i].style.backgroundColor = "white";
		}

		//Change computer choice button color back to default
		for (var j = 0; j < compChoices.length; j++) {
			compChoices[j].style.color = "#C884C6";
			compChoices[j].style.backgroundColor = "white";
		}
		
		//Clear the result that was previously displayed
		var res = document.querySelector("#resultSpanTag");
		res.innerText = "";

	}

	//This section gives commands for what happens on clicking Next Round button
	var nextRoundButton = document.querySelector("#nextRound");
	//TOOK FROM HERE!
	nextRoundButton.addEventListener("click", function() {
		enableColorResult();
		})

	//This section gives commands for what happens on clicking Start Over button
	var startOverButton = document.querySelector("#startOver");
	startOverButton.addEventListener("click", function() {
		//Set scores back to zero.
		playerScore = 0;
		compScore = 0;

		//Display score (zero) in span tag.
		var playerScoreSpan = document.querySelector("#playerScore");
		var compScoreSpan = document.querySelector("#compScore");
		playerScoreSpan.innerHTML = playerScore;
		compScoreSpan.innerHTML = compScore;

		enableColorResult();
		})

}