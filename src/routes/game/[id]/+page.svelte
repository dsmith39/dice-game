<script>
	// @ts-nocheck
	import lodash from 'lodash';
	import { object_without_properties } from 'svelte/internal';

	/** The Game data that is fetched from the database */
	export let data;

	//Statesdetect
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
	 * @type {{jackpot: boolean, crapout: boolean, choseWrongInput: boolean, rollSuccess: boolean}} An Array that stores user feedback messages
	 */
	let alerts = {
		jackpot: false,
		crapout: false,
		choseWrongInput: false,
		rollSuccess: false
	};
	let score = { totalScore: 0, onesScore: 0, fivesScore: 0 };
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
		let dice1, dice2, dice3, dice4, dice5;
		// If the diceNumber is 1, roll a single dice
		if (diceNumber === 1) {
			dice1 = Math.floor(Math.random() * 6) + 1;
			diceRolls = [dice1];
		}
		// If the diceNumber is 2, roll two dice
		if (diceNumber === 2) {
			dice1 = Math.floor(Math.random() * 6) + 1;
			dice2 = Math.floor(Math.random() * 6) + 1;
			diceRolls = [dice1, dice2];
		}
		// If the diceNumber is 3, roll three dice
		if (diceNumber === 3) {
			dice1 = Math.floor(Math.random() * 6) + 1;
			dice2 = Math.floor(Math.random() * 6) + 1;
			dice3 = Math.floor(Math.random() * 6) + 1;
			diceRolls = [dice1, dice2, dice3];
		}
		// If the diceNumber is 4, roll four dice
		if (diceNumber === 4) {
			dice1 = Math.floor(Math.random() * 6) + 1;
			dice2 = Math.floor(Math.random() * 6) + 1;
			dice3 = Math.floor(Math.random() * 6) + 1;
			dice4 = Math.floor(Math.random() * 6) + 1;
			diceRolls = [dice1, dice2, dice3, dice4];
		}
		// If the diceNumber is 5, roll five dice
		if (diceNumber === 5) {
			dice1 = Math.floor(Math.random() * 6) + 1;
			dice2 = Math.floor(Math.random() * 6) + 1;
			dice3 = Math.floor(Math.random() * 6) + 1;
			dice4 = Math.floor(Math.random() * 6) + 1;
			dice5 = Math.floor(Math.random() * 6) + 1;
			diceRolls = [dice1, dice2, dice3, dice4, dice5];
		}
		return diceRolls;
	}

	/**
	 * ## Reset Alerts
	 * @description **This is a function that resets the alerts**
	 */
	function resetAlerts() {
		alerts = {
			jackpot: false,
			crapout: false,
			choseWrongInput: false,
			rollSuccess: false
		};
	}
	/**
	 * ## Detect Crapout
	 * @description **This is a function that detects if the user Crapped Out**
	 * @param {Array<Number>} array An array of the dice rolls
	 */
	function detectCrapout(array) {
		let elementCount = 0;
		array.forEach((element) => {
			console.log(element);
			if (element === 1 || element === 5) {
				elementCount++;
			}
		});
		if (elementCount > 0) {
			alerts.crapout = false;
		} else {
			alerts.crapout = true;
		}
	}
	/**
	 * ## Detect Flush
	 * @description **This is a function that detects if the user rolled a Flush**
	 * @param {Array<Number>} array An array of the dice rolls
	 */
	function detectFlush(array) {
		//Sort Dice Rolls
		let sortedDiceRoll = [...array].sort((a, b) => {
			return a - b;
		});
		if (
			lodash.toString(sortedDiceRoll) === '1,2,3,4,5' ||
			lodash.toString(sortedDiceRoll) === '2,3,4,5,6'
		) {
			alerts.crapout = false;
			alerts.jackpot = true;
			return;
		}
	}
	/**
	 * ## Handle Dice Roll
	 * @description **This is a function that handles the dice roll, using `rollDice()`. It also checks if the dice roll is a Flush**
	 * @param {number} diceNumber The number of dice to roll (1-5)
	 */
	function handleDiceRoll(diceNumber) {
		diceRolls = rollDice(diceNumber);
		resetAlerts();
		detectCrapout(diceRolls);
		detectFlush(diceRolls);
		if (alerts.crapout === true) {
			return;
		}
		alerts.rollSuccess = true;
	}
	/**
	 * ## Move To Chosen Dice
	 * @description **This is a function that moves the dice from the diceRolls array to the chosenDice array**
	 * @param {number} i The index of the dice roll in the diceRolls array
	 */
	function moveToChosenDice(i) {
		// this is the roll that was clicked
		/**
		 * @type {number} chosenRoll The dice roll that was clicked
		 */
		let chosenRoll = diceRolls[i];
		if (chosenRoll === 2 || chosenRoll === 3 || chosenRoll === 4 || chosenRoll === 6) {
			alerts.choseWrongInput = true;
			return;
		}
		//This adds the chosen roll to the chosenDice array
		chosenDice = lodash.concat(chosenDice, chosenRoll);
		//This removes the chosen roll from the diceRolls array
		lodash.pullAt(diceRolls, [i]);
		//This removes any undefined values from the diceRolls array
		diceRolls = lodash.compact(diceRolls);
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
	}
	//A function to reset the score
	function resetScore() {
		score.onesScore = 0;
		score.fivesScore = 0;
		score.totalScore = 0;
	}
	// A function to handle the score
	function handleScore() {
		if (alert.type === 'Crapout') {
			resetScore();
		}
		for (let i = 0; i < confirmedDice.length; i++) {
			if (confirmedDice[i] === 1) {
				score.onesScore = score.onesScore + 100;
				score.totalScore = score.totalScore + score.onesScore;
			}
			if (confirmedDice[i] === 5) {
				score.fivesScore = score.fivesScore + 50;
				score.totalScore = score.totalScore + score.fivesScore;
			}
		}
	}
	// A function to undo the Confirm Choice and reset the chosenDice array
	function undoConfirmChoice() {
		// This add the chosen dice back into the chosenDice array
		chosenDice = lodash.concat(chosenDice, confirmedDice);
		// This removes the chosen dice from the confirmedDice array
		confirmedDice = [];
		// This removes any undefined values from the chosenDice array
		chosenDice = lodash.compact(chosenDice);
	}
	// A function to confirm the chosen dice
	function confirmChoice() {
		// This adds the chosen dice to the confirmedDice array
		confirmedDice = lodash.concat(confirmedDice, chosenDice);
		// This removes the chosen dice from the chosenDice array
		chosenDice = [];
		// This removes any undefined values from the confirmedDice array
		confirmedDice = lodash.compact(confirmedDice);
		handleScore();
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
{#if confirmedDice.length === 0 || !alerts.crapout}
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

		{#if diceRolls.length === 4}
			<button on:click|preventDefault={() => handleDiceRoll(4)}>Roll 4 Dice</button>
		{/if}
		{#if diceRolls.length === 3}
			<button on:click|preventDefault={() => handleDiceRoll(3)}>Roll 3 Dice</button>
		{/if}
		{#if diceRolls.length === 2}
			<button on:click|preventDefault={() => handleDiceRoll(2)}>Roll 2 Dice</button>
		{/if}
		{#if diceRolls.length === 1}
			<button on:click|preventDefault={() => handleDiceRoll(1)}>Roll 1 Dice</button>
		{/if}
		{#if diceRolls.length === 0}
			<button on:click|preventDefault={() => handleDiceRoll(5)}>First Roll</button>
		{/if}
		{#if diceRolls.length === 5}
			<button on:click|preventDefault={() => handleDiceRoll(5)}>Roll 5 Dice</button>
		{/if}
	</article>
{/if}

<!-- Choose Dice Section -->
<!-- Only show if there are  -->
{#if chosenDice.length > 0}
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
{/if}

<!-- Potential Score -->
{#if confirmedDice.length > 0}
	<article>
		<h2>Potential Score</h2>
		<section>
			<h3>Confirmed Dice</h3>
			<div class="diceSection">
				{#each confirmedDice as dice, i}
					<p>{dice}</p>
				{/each}
			</div>
		</section>
		<section>
			<h3>Score:</h3>
			{#if score.onesScore > 0}
				<p>Ones: {score.onesScore}</p>
			{/if}
			{#if score.fivesScore > 0}
				<p>Fives: {score.fivesScore}</p>
			{/if}
			{#if score.totalScore > 0}
				<p>Total Score: {score.totalScore}</p>
			{/if}
		</section>
		<button on:click|preventDefault={() => undoConfirmChoice()}>Undo</button>
		<button on:click|preventDefault={() => changeTurn()}>Submit Score and End turn</button>
	</article>
{/if}
{#if alerts.crapout === true}
	<p>You Crapped Out</p>
{/if}
{#if alerts.jackpot === true}
	<p>You Hit the Jackpot</p>
{/if}
<!-- Messages -->

<!-- Go To Next Turn -->
<style>
	.diceSection {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
	}
	.hidden {
		display: none;
	}
</style>
