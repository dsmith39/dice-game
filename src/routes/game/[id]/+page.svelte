<script>
	// @ts-nocheck
	import lodash from 'lodash';

	/** The Game data that is fetched from the database */
	export let data;

	//States
	/**
	 * @type {number} **The Total Number of Turns Taken**
	 * */
	let totalTurns = 1;
	/**
	 * @type {Array<Number>} **An Array that stores what dice values the user rolls**
	 */
	let diceRolls = [];
	/**
	 * @type {Array<Number>} **An Array that stores what dice values the user chooses. The choice is made by selecting a value from the `diceRolls` array**
	 */
	let chosenDice = [];
	/**
	 * @type {Array<Number>} **An Array that stores what dice values the user confirms. The choice is made by confirming the values from the `chosenDice` array**
	 */
	let confirmedDice = [];
	/**
	 * @type {{message: String, type: String}} An Array that stores user feedback messages
	 */
	let alerts = [];

	/**
	 * ## Change Turn
	 * @description **This is a function that changes the current turn. It also accumlates the number of total turns taken in the game so far**
	 * @returns {number} The current turn
	 */
	function changeTurn() {
		data.game.currentTurn++;
		totalTurns++;
		// If the current turn is greater than the number of players, reset to 1
		if (data.game.currentTurn > data.game.players.length) {
			data.game.currentTurn = 1;
		}
		data.game.currentTurn;
	}
	/**
	 * ## Roll Dice
	 * @description **This is a function that rolls the dice and returns an array of the dice rolls**
	 * @param {number} diceNumber The number of dice to roll (1-5)
	 * @returns {number[]} An array of the dice rolls
	 */
	function rollDice(diceNumber) {
		// If the diceNumber is 1, roll a single dice
		if (diceNumber === 1) {
			let dice = Math.floor(Math.random() * 6) + 1;
			console.log(dice);
			diceRolls = [dice];
		}
		// If the diceNumber is 2, roll two dice
		if (diceNumber === 2) {
			let dice1 = Math.floor(Math.random() * 6) + 1;
			let dice2 = Math.floor(Math.random() * 6) + 1;
			console.log(dice1, dice2);
			diceRolls = [dice1, dice2];
		}
		// If the diceNumber is 3, roll three dice
		if (diceNumber === 3) {
			let dice1 = Math.floor(Math.random() * 6) + 1;
			let dice2 = Math.floor(Math.random() * 6) + 1;
			let dice3 = Math.floor(Math.random() * 6) + 1;
			console.log(dice1, dice2, dice3);
			diceRolls = [dice1, dice2, dice3];
		}
		// If the diceNumber is 4, roll four dice
		if (diceNumber === 4) {
			let dice1 = Math.floor(Math.random() * 6) + 1;
			let dice2 = Math.floor(Math.random() * 6) + 1;
			let dice3 = Math.floor(Math.random() * 6) + 1;
			let dice4 = Math.floor(Math.random() * 6) + 1;
			console.log(dice1, dice2, dice3, dice4);
			diceRolls = [dice1, dice2, dice3, dice4];
		}
		// If the diceNumber is 5, roll five dice
		if (diceNumber === 5) {
			let dice1 = Math.floor(Math.random() * 6) + 1;
			let dice2 = Math.floor(Math.random() * 6) + 1;
			let dice3 = Math.floor(Math.random() * 6) + 1;
			let dice4 = Math.floor(Math.random() * 6) + 1;
			let dice5 = Math.floor(Math.random() * 6) + 1;
			console.log(dice1, dice2, dice3, dice4, dice5);
			diceRolls = [dice1, dice2, dice3, dice4, dice5];
		}
		return diceRolls;
	}
	// Function sets the diceRolls array to the result of the rollDice function
	/**
	 * ## Handle Dice Roll
	 * @description **This is a function that handles the dice roll, using `rollDice()` {@link rollDice}. It also checks if the dice roll is a Flush**
	 * @param {number} diceNumber The number of dice to roll (1-5)
	 */
	function handleDiceRoll(diceNumber) {
		diceRolls = rollDice(diceNumber);
		if (diceRolls.length === 0) {
			alerts = lodash.concat(alerts, {
				message: 'You must roll the dice before you can choose them',
				type: 'error'
			});
		}
		if (diceRolls.length > 0) {
			alerts = lodash.concat(alerts, {
				message: 'You have rolled the dice',
				type: 'success'
			});
		}
		if (lodash.toString(diceRolls) === '1,2,3,4,5' || lodash.toString(diceRolls) === '2,3,4,5,6') {
			alerts = lodash.concat(alerts, {
				message: 'You have rolled a Flush!',
				type: 'success'
			});
		}
		console.log(alerts);
	}
	// If the dice is already in the chosenDice array, remove it
	// If the dice is not in the chosenDice array, add it
	/**
	 * ## Move To Chosen Dice
	 * @description **This is a function that moves the dice from the diceRolls array to the chosenDice array**
	 * @param {number} i The index of the dice roll in the diceRolls array
	 */
	function moveToChosenDice(i) {
		console.log('Button Clicked');
		// this is the roll that was clicked
		/**
		 * @type {number} chosenRoll The dice roll that was clicked
		 */
		let chosenRoll = diceRolls[i];
		console.log(typeof chosenRoll);
		if (chosenRoll === 2 || chosenRoll === 3 || chosenRoll === 4 || chosenRoll === 6) {
			alerts = lodash.concat(alerts, {
				message: 'You cannot choose a 2, 3, 4 or 6',
				type: 'error'
			});
			console.log(alerts);
			return;
		}
		//This adds the chosen roll to the chosenDice array
		chosenDice = lodash.concat(chosenDice, chosenRoll);
		//This removes the chosen roll from the diceRolls array
		lodash.pullAt(diceRolls, [i]);
		//This removes any undefined values from the diceRolls array
		diceRolls = lodash.compact(diceRolls);
		console.log(diceRolls);
	}
	// A function to put numbers back in their original spot
	function undoChoice(i) {
		// this is the roll that was clicked
		let chosenRoll = chosenDice[i];
		//This adds the chosen roll to the diceRolls array
		diceRolls = lodash.concat(diceRolls, chosenRoll);
		//This removes the chosen roll from the chosenDice array
		lodash.pullAt(chosenDice, [i]);
		//This removes any undefined values from the chosenDice array
		chosenDice = lodash.compact(chosenDice);
		console.log(chosenDice);
	}
	// A function to confirm the chosen dice
	function confirmChoice() {
		// This adds the chosen dice to the confirmedDice array
		confirmedDice = lodash.concat(confirmedDice, chosenDice);
		// This removes the chosen dice from the chosenDice array
		chosenDice = [];
		// This removes any undefined values from the confirmedDice array
		confirmedDice = lodash.compact(confirmedDice);
		console.log(confirmedDice);
	}
</script>

<!-- The Player Information Box -->
<article>
	<p>Turn: {totalTurns}</p>
	<p>Player: {data.game.players[data.game.currentTurn - 1].nickname}</p>
	<p>Round Score: {data.game.players[data.game.currentTurn - 1].currentScore}</p>
	<p>Total Score: {data.game.players[data.game.currentTurn - 1].totalScore}</p>
</article>
<!-- Dice Rolling Section -->
<article>
	<h2>Dice Roll</h2>
	<section class="diceSection">
		{#each diceRolls as dice, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => moveToChosenDice(i)}>
				{dice}
			</div>
		{/each}
	</section>
	<button on:click|preventDefault={() => handleDiceRoll(5)}>Roll Dice</button>
</article>
<!-- Choose Dice Section -->
<article>
	<h2>Chosen Dice</h2>
	<section class="diceSection">
		{#each chosenDice as dice, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => undoChoice(i)}>
				{dice}
			</div>
		{/each}
	</section>
	<button on:click|preventDefault={() => confirmChoice()}>Save These Dice</button>
</article>
<!-- Show Chosen Dice -->
<article>
	<h2>Round Summary</h2>
	<section class="diceSection">
		{#each confirmedDice as dice, i}
			<div>
				{dice}
			</div>
		{/each}
	</section>
</article>

<!-- Go To Next Turn -->
<button on:click|preventDefault={() => changeTurn()}>Next Turn</button>

<style>
	.diceSection {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
