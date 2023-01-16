<script>
	// @ts-nocheck
	import lodash from 'lodash';

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
	 * @type {{jackpot: boolean, crapout: boolean, choseWrongInput: boolean, rollSuccess: boolean, triplet: boolean}} An Array that stores user feedback messages
	 */
	let alerts = {
		jackpot: false,
		crapout: false,
		triplet: false,
		choseWrongInput: false,
		rollSuccess: false
	};
	/**
	 * @type {{totalScore: number, onesScore: number, fivesScore: number, jackpot: number, triplet: number}} An Array that stores the user's potential score
	 */
	let potentialScore = {
		totalScore: 0,
		onesScore: 0,
		fivesScore: 0,
		jackpot: 0,
		triplet: 0
	};
	/**
	 * @type {{totalScore: number, onesScore: number, fivesScore: number, jackpot: number, triplet: number}} An Array that stores the user's chosen score
	 */
	let finalScore = {
		totalScore: 0,
		onesScore: 0,
		fivesScore: 0,
		jackpot: 0,
		triplet: 0
	};
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
			rollSuccess: false,
			triplet: false
		};
	}
	/**
	 * ## Detect Crapout
	 * @description **This is a function that detects if the user Crapped Out**
	 * @param {Array<Number>} array An array of the dice rolls
	 */
	function detectCrapout(array) {
		console.log('The Array That detectCrapout Uses: \n', array);
		for (let i = 0; i < array.length; i++) {
			if (array[i] === 1 || array[i] === 5) {
				return false;
			}
		}
		if (alerts.triplet === false) {
			return false;
		} else {
			return true;
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
			chosenDice = lodash.concat(chosenDice, array);
			diceRolls = lodash.difference(diceRolls, array);
			potentialScore.jackpot = 750;
			potentialScore.totalScore += potentialScore.jackpot;
			return true;
		}
	}
	/**
	 * ## Detect triple
	 * @description **This is a function that detects if the user rolled a Straight**
	 * @param {Array<Number>} array An array of the dice rolls
	 */
	function detectStraight(array) {
		let tripArray = [];
		let collection = lodash.countBy(array);
		console.log('Triplet collection: \n', collection);

		for (let key in collection) {
			if (collection[key] === 3) {
				tripArray = lodash.fill(Array(3), parseInt(key));
				chosenDice = lodash.concat(chosenDice, tripArray);
				console.log('tripArray: \n', tripArray);
			} else if (collection[key] > 3) {
				tripArray = lodash.fill(Array(3), parseInt(key));
				chosenDice = lodash.concat(chosenDice, tripArray);
				console.log('tripArray: \n', tripArray);
			}
		}
		if (tripArray.length > 0) {
			diceRolls = lodash.difference(diceRolls, tripArray);
			alerts.triplet = true;
			alerts.crapout = false;
		}
		if (tripArray[0] === 1) {
			potentialScore.triplet = 1000;
			potentialScore.totalScore += potentialScore.triplet;
		} else if (tripArray[0] === 2) {
			potentialScore.triplet = 200;
			potentialScore.totalScore += potentialScore.triplet;
		} else if (tripArray[0] === 3) {
			potentialScore.triplet = 300;
			potentialScore.totalScore += potentialScore.triplet;
		} else if (tripArray[0] === 4) {
			potentialScore.triplet = 400;
			potentialScore.totalScore += potentialScore.triplet;
		} else if (tripArray[0] === 5) {
			potentialScore.triplet = 500;
			potentialScore.totalScore += potentialScore.triplet;
		} else if (tripArray[0] === 6) {
			potentialScore.triplet = 600;
			potentialScore.totalScore += potentialScore.triplet;
		}
	}
	/**
	 * ## Handle Dice Roll
	 * @description **This is a function that handles the dice roll, using `rollDice()`. It also checks if the dice roll is a Flush**
	 * @param {number} diceNumber The number of dice to roll (1-5)
	 */
	function handleDiceRoll(diceNumber) {
		diceRolls = rollDice(diceNumber);
		alerts.crapout = false;
		alerts.triple = false;

		alerts.crapout = detectCrapout(diceRolls);
		if (alerts.crapout === true) {
			return;
		}
		detectStraight(diceRolls);
		alerts.jackpot = detectFlush(diceRolls);
		console.log('Crapout Status', alerts.crapout);
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
		//Dont allow the user to pick anything thats a 2, 3, 4, or 6
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

		if (chosenRoll === 1) {
			potentialScore.onesScore += 100;
			potentialScore.totalScore += 100;
		} else if (chosenRoll === 5) {
			potentialScore.fivesScore += 50;
			potentialScore.totalScore += 50;
		}
	}
	// A function to put numbers back in their original spot
	function undoChoice(i) {
		// this is the roll that was clicked
		let chosenRoll = chosenDice[i];
		if (chosenRoll === 1) {
			potentialScore.onesScore -= 100;
			potentialScore.totalScore -= 100;
		} else if (chosenRoll === 5) {
			potentialScore.fivesScore -= 50;
			potentialScore.totalScore -= 50;
		}
		//This adds the chosen roll to the diceRolls array
		diceRolls = lodash.concat(diceRolls, chosenRoll);
		//This removes the chosen roll from the chosenDice array
		lodash.pullAt(chosenDice, [i]);
		//This removes any undefined values from the chosenDice array
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
		finalScore.triplet = potentialScore.triplet;
		finalScore.jackpot = potentialScore.jackpot;
		finalScore.onesScore = potentialScore.onesScore;
		finalScore.fivesScore = potentialScore.fivesScore;
		finalScore.totalScore = potentialScore.totalScore;
	}
	// A function to undo the Confirm Choice and reset the chosenDice array
	function undoConfirmChoice() {
		// This add the chosen dice back into the chosenDice array
		chosenDice = lodash.concat(chosenDice, confirmedDice);
		// This removes the chosen dice from the confirmedDice array
		confirmedDice = [];
		// This removes any undefined values from the chosenDice array
		chosenDice = lodash.compact(chosenDice);
		finalScore.onesScore = 0;
		finalScore.fivesScore = 0;
		finalScore.totalScore = 0;
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
{#if confirmedDice.length === 0}
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
		{#if alerts.crapout === false}
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
				<button on:click|preventDefault={() => handleDiceRoll(5)}>Roll</button>
			{/if}
			{#if diceRolls.length === 5}
				<button on:click|preventDefault={() => handleDiceRoll(5)}>Roll 5 Dice</button>
			{/if}
		{/if}
	</article>
{/if}

<!-- Chosen Dice Section -->
{#if chosenDice.length > 0 && alerts.crapout === false}
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

<!-- Show crapout -->
{#if alerts.crapout}
	<h3>You Crapped Out</h3>
	<h3>Score: {finalScore.totalScore}</h3>
	<button on:click|preventDefault={() => changeTurn()}>Submit Score and End turn</button>
{/if}

<!-- Show Jackpot -->
{#if alerts.jackpot === true}
	<p>You Hit the Jackpot</p>
	<button on:click|preventDefault={() => changeTurn()}>Submit Score and End turn</button>
{/if}

<!-- Potential Score -->
{#if chosenDice.length > 0 && alerts.crapout === false}
	<article>
		<h2>Potential Score</h2>
		<section>
			<h3>Chosen Dice</h3>
			<div class="diceSection">
				{#each chosenDice as dice, i}
					<p>{dice}</p>
				{/each}
			</div>
		</section>
		<section>
			<h3>Score:</h3>
			{#if potentialScore.jackpot === true}
				<p>Jackpot</p>
			{/if}
			{#if potentialScore.onesScore > 0}
				<p>Ones: {potentialScore.onesScore}</p>
			{/if}
			{#if potentialScore.fivesScore > 0}
				<p>Fives: {potentialScore.fivesScore}</p>
			{/if}
			<p>Total: {potentialScore.totalScore}</p>
		</section>
	</article>
{/if}

<!-- Confirm Score Score -->
{#if confirmedDice.length > 0 && alerts.crapout === false}
	<article>
		<h2>Confirm Score</h2>
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
			{#if finalScore.onesScore > 0}
				<p>Ones: {finalScore.onesScore}</p>
			{/if}
			{#if finalScore.fivesScore > 0}
				<p>Fives: {finalScore.fivesScore}</p>
			{/if}
			{#if finalScore.totalScore > 0}
				<p>Total Score: {finalScore.totalScore}</p>
			{/if}
		</section>
		<button on:click|preventDefault={() => undoConfirmChoice()}>Undo</button>
		<button on:click|preventDefault={() => changeTurn()}>Submit Score and End turn</button>
	</article>
{/if}

<!-- Go To Next Turn -->
<style>
	.diceSection {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
	}
</style>
