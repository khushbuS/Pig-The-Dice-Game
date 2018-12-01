/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach winning score on GLOBAL score wins the game
- Winnning score by default is set to 100 but it can also be set by the user itself to any number.
*/

//declaring game variables
var scores, roundScore, activePlayer, gamePlaying;

//Calling the Game initialization function
init();


//Setting event listener on the "Roll Dice" button
document.querySelector('.btn-roll').addEventListener('click', function(){

	if(gamePlaying)
	{

			// generate the random number and assign to dice
			var dice = Math.floor(Math.random()*6 )+ 1;
		    //display the result
		    var diceDOM = document.querySelector('.dice');
		    diceDOM.style.display = 'block';
		    diceDOM.src = 'dice-' + dice + '.png';
		    
		    if(dice !== 1){
		       
		   //set the result to current score of active player
		   roundScore += dice;
		   document.querySelector('#current-' + activePlayer).textContent = roundScore;
		    }else{
		    	 
		   
		           nextPlayer();

		    }

	}
});

//Setting event listener on the "Hold" button
document.querySelector('.btn-hold').addEventListener('click', function(){

	if(gamePlaying){
			  scores[activePlayer] += roundScore;
			  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			  var input = document.querySelector('.final-score').value;
			  var winningScore
			  if(input)
			  {
			  	winningScore = input;
			  }else{
			  	winningScore = 100;
			  }
			  if(scores[activePlayer] >= winningScore)
			  {
				  	document.querySelector('#name-' + activePlayer).textContent = "WINNER!"; 
				  	document.querySelector('.dice').style.display = 'none';
				  	document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
				    document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
				    gamePlaying = false;
			  }
			  else{
			  	   
			  	 	nextPlayer();
			  }		
	} 
});


function nextPlayer(){
	       activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
           roundScore = 0;
           document.getElementById('current-0').textContent = '0';
           document.getElementById('current-1').textContent = '0';

           document.querySelector('.player-0-panel').classList.toggle('active');
           document.querySelector('.player-1-panel').classList.toggle('active');

           document.querySelector('.dice').style.display = 'none';
}




//Setting event listener on the "New game" button
document.querySelector('.btn-new').addEventListener('click', init);


//Game initialization function
function init(){
			scores = [0,0];
			roundScore = 0;
			activePlayer = 0;
			gamePlaying = true;

			document.getElementById('score-0').textContent = '0';
			document.getElementById('current-0').textContent = '0';
			document.getElementById('score-1').textContent = '0';
			document.getElementById('current-1').textContent = '0';


			document.querySelector('.dice').style.display = 'none';
			document.getElementById('name-0').textContent = 'Player 1';
			document.getElementById('name-1').textContent = 'Player 2';
			document.querySelector('.player-0-panel').classList.remove('winner');
			document.querySelector('.player-1-panel').classList.remove('winner');
			document.querySelector('.player-0-panel').classList.remove('active');
			document.querySelector('.player-1-panel').classList.remove('active');

			document.querySelector('.player-0-panel').classList.add('active');
			document.querySelector('.final-score').value = "";

}