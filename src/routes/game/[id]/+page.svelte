<script>
	// @ts-nocheck
	//MARK: - Import Modules
	import lodash from 'lodash';
	//import dice images
	import dice1 from '$lib/assets/dice1.svg';
	import dice2 from '$lib/assets/dice2.svg';
	import dice3 from '$lib/assets/dice3.svg';
	import dice4 from '$lib/assets/dice4.svg';
	import dice5 from '$lib/assets/dice5.svg';
	import dice6 from '$lib/assets/dice6.svg';

	//MARK: - Import Data From Database
	/** The Game data that is fetched from the database */
	export let data;

	//MARK: - States

	/**
	 * @type {boolean} **A Boolean that stores the state of the roll button**
	 */
	let rollButtonDisabled = false;
	/**
	 * @type {boolean} **A Boolean that stores the state of the end turn button**
	 */
	let endTurnButtonDisabled = true;
	/**
	 * @type {number[]} **An Array that stores what dice values the user rolls**
	 */
	let diceRolls = [];
	/**
	 * @type {number[]} **Stores an Array of Triplets if the user gets a triplet**
	 */
	let tripArray = [];
	/**
	 * @type {number[]} **Stores an Array of Quads if the user gets a quad**
	 */
	let quadArray = [];
	/**
	 * @type {Array<Number>} **An Array that stores what dice values the user chooses. The choice is made by selecting a value from the `diceRolls` array**
	 */
	let chosenDice = [];
	/**
	 * @type {boolean} **A Boolean that stores the state of the game. If the game is over, then the value is `true`**
	 */
	let gameOver = false;
	/**
	 * @type {{jackpot: boolean, crapout: boolean, choseWrongInput: boolean, rollSuccess: boolean, triplet: boolean, quad: boolean, }} An object that stores user feedback messages
	 */
	let alerts = {
		jackpot: false,
		crapout: false,
		triplet: false,
		quad: false,
		choseWrongInput: false,
		rollSuccess: false
	};
	/**
	 * @type {{ones: number, fives: number, triplet: number, quad: number, jackpot: number, totalScore: number, quad: number}} An Object that stores the score of the user
	 */
	let score = {
		ones: 0,
		fives: 0,
		triplet: 0,
		quad: 0,
		jackpot: 0,
		totalScore: 0
	};

	//MARK: - Data Reset Functions
	/**
	 * ## Reset Data
	 * @description **A Function for resetting the data of the game all at once**
	 */
	function resetData() {
		//Reset the dice rolls
		diceRolls = [];
		//Reset the chosen dice
		chosenDice = [];
		//Reset the alerts
		resetAlerts();
		//Disable the end turn button
		endTurnButtonDisabled = true;
		//Enable the roll button
		rollButtonDisabled = false;
		// reset the score
		score = {
			ones: 0,
			fives: 0,
			triplet: 0,
			jackpot: 0,
			quad: 0,
			totalScore: 0
		};
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
			triplet: false,
			quad: false
		};
	}

	//MARK: - Score Functions

	/**
	 * ## Accumulate Score
	 * @description **This is a function that adds the user's unsaved score, to the user's saved score**
	 */
	function accumulateScore() {
		data.game.players[data.game.currentTurn - 1].totalScore += score.totalScore;
		console.log('The Submited Score: \n', data.game.players[data.game.currentTurn - 1].totalScore);
	}

	/**
	 * ## Detect Crapout
	 * @description **This is a function that detects if the user Crapped Out**
	 * @param {Array<Number>} array An array of the dice rolls
	 */
	function detectCrapout(array) {
		let collection = lodash.countBy(array);
		//If there is no 1 or 5 key in the collection, then the user Crapped Out
		if (!collection[1] && !collection[5]) {
			return true;
		}
		return false;
	}

	/**
	 * ## Detect Flush
	 * @description **This is a function that detects if the user rolled a Flush**
	 * @param {Array<Number>} array An array of the dice rolls
	 */
	function detectJackpot(array) {
		//Sort Dice Rolls
		let sortedDiceRoll = [...array].sort((a, b) => {
			return a - b;
		});
		if (
			lodash.toString(sortedDiceRoll) === '1,2,3,4,5' ||
			lodash.toString(sortedDiceRoll) === '2,3,4,5,6'
		) {
			return true;
		}
		return false;
	}

	/**
	 *
	 * ## Detect triple
	 * @description **This is a function that detects if the user rolled a Triplet**
	 * @param {Array<Number>} array An array of the dice rolls
	 */
	function detectTriplet(array) {
		/**
		 * @description **The Array of Triplets**
		 * @type {string | lodash.List<any>}
		 */
		let collection = lodash.countBy(array);
		console.log('Triplet collection: \n', collection);

		for (let key in collection) {
			if (collection[key] === 3) {
				tripArray = lodash.fill(Array(3), parseInt(key));
				lodash.pullAll(array, tripArray);
				console.log('tripArray: \n', tripArray);
				return true;
			}
		}
		return false;
	}

	/**
	 * ## Detect quad
	 * @description **This is a function that detects if the user rolled a Quad**
	 * @param {Array<Number>} array An array of the dice rolls
	 */
	function detectQuad(array) {
		/**
		 * @description **The Array of Triplets**
		 * @type {string | lodash.List<any>}
		 */
		let collection = lodash.countBy(array);
		console.log('Quad collection: \n', collection);

		for (let key in collection) {
			if (collection[key] === 4) {
				quadArray = lodash.fill(Array(4), parseInt(key));
				lodash.pullAll(array, quadArray);
				console.log('quadArray: \n', quadArray);
				return true;
			}
		}
		return false;
	}
	// MARK: - Move Dice Functions and Helpers

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
		if (detectJackpot(diceRolls) === true) {
			return;
		}
		rollButtonDisabled = false;
		let chosenRoll = diceRolls[i];
		endTurnButtonDisabled = false;
		//Dont allow the user to pick anything thats a 2, 3, 4, or 6
		if (chosenRoll === 2 || chosenRoll === 3 || chosenRoll === 4 || chosenRoll === 6) {
			alerts.choseWrongInput = true;
			rollButtonDisabled = true;
			endTurnButtonDisabled = true;
			return;
		}
		//This adds the chosen roll to the chosenDice array
		chosenDice = lodash.concat(chosenDice, chosenRoll);
		//This removes the chosen roll from the diceRolls array
		lodash.pullAt(diceRolls, [i]);
		//This removes any undefined values from the diceRolls array
		diceRolls = lodash.compact(diceRolls);

		if (chosenRoll === 1) {
			score.onesScore += 100;
			score.totalScore += 100;
		} else if (chosenRoll === 5) {
			score.fivesScore += 50;
			score.totalScore += 50;
		}
	}

	/**
	 * @param {number} i **The index of the chosen dice roll in the chosenDice array**
	 */
	function undoChoice(i) {
		// this is the roll that was clicked
		if (alerts.crapout === true) {
			return;
		}
		rollButtonDisabled = true;
		if (diceRolls.length === 5) {
			rollButtonDisabled = false;
		} else {
			rollButtonDisabled = true;
		}
		if (chosenDice.length === 0) {
			endTurnButtonDisabled = true;
		} else {
			endTurnButtonDisabled = false;
		}
		let chosenRoll = chosenDice[i];
		if (chosenRoll === 1) {
			score.onesScore -= 100;
			score.totalScore -= 100;
		} else if (chosenRoll === 5) {
			score.fivesScore -= 50;
			score.totalScore -= 50;
		}
		//This adds the chosen roll to the diceRolls array
		diceRolls = lodash.concat(diceRolls, chosenRoll);
		//This removes the chosen roll from the chosenDice array
		lodash.pullAt(chosenDice, [i]);
		//This removes any undefined values from the chosenDice array
		chosenDice = lodash.compact(chosenDice);
	}

	// MARK: - Roll Dice Functions and Helpers

	/**
	 * ## Roll Dice
	 * @description **This is a function that rolls the dice and returns an array of the dice rolls**
	 * @param {number} diceNumber The number of dice to roll (1-5)
	 * @returns {number[]} An array of the dice rolls
	 */
	function rollDice(diceNumber) {
		console.clear();
		let dice1, dice2, dice3, dice4, dice5;
		/**
		 * @type {number[]} **An Array that stores what dice values the user rolls*
		 */
		resetAlerts();
		// If the diceNumber is 1, roll a single dice
		if (diceNumber === 1) {
			dice1 = Math.floor(Math.random() * 6) + 1;
			diceRolls = [dice1];
		}
		// If the diceNumber is 2, roll two dice
		else if (diceNumber === 2) {
			dice1 = Math.floor(Math.random() * 6) + 1;
			dice2 = Math.floor(Math.random() * 6) + 1;
			diceRolls = [dice1, dice2];
		}
		// If the diceNumber is 3, roll three dice
		else if (diceNumber === 3) {
			dice1 = Math.floor(Math.random() * 6) + 1;
			dice2 = Math.floor(Math.random() * 6) + 1;
			dice3 = Math.floor(Math.random() * 6) + 1;
			diceRolls = [dice1, dice2, dice3];
		}
		// If the diceNumber is 4, roll four dice
		else if (diceNumber === 4) {
			dice1 = Math.floor(Math.random() * 6) + 1;
			dice2 = Math.floor(Math.random() * 6) + 1;
			dice3 = Math.floor(Math.random() * 6) + 1;
			dice4 = Math.floor(Math.random() * 6) + 1;
			diceRolls = [dice1, dice2, dice3, dice4];
		}
		// If the diceNumber is 5, roll five dice
		else if (diceNumber === 5) {
			dice1 = Math.floor(Math.random() * 6) + 1;
			dice2 = Math.floor(Math.random() * 6) + 1;
			dice3 = Math.floor(Math.random() * 6) + 1;
			dice4 = Math.floor(Math.random() * 6) + 1;
			dice5 = Math.floor(Math.random() * 6) + 1;
			diceRolls = [dice1, dice2, dice3, dice4, dice5];
		}
		console.log('diceRolls: \n', diceRolls);
		if (detectQuad(diceRolls) === true) {
			if (tripArray[0] === 1) {
				score.quad = 4000;
				score.totalScore += score.triplet;
			} else if (tripArray[0] === 2) {
				score.triplet = 600;
				score.totalScore += score.triplet;
			} else if (tripArray[0] === 3) {
				score.triplet = 900;
				score.totalScore += score.triplet;
			} else if (tripArray[0] === 4) {
				score.triplet = 1200;
				score.totalScore += score.triplet;
			} else if (tripArray[0] === 5) {
				score.triplet = 1500;
				score.totalScore += score.triplet;
			} else if (tripArray[0] === 6) {
				score.triplet = 1800;
				score.totalScore += score.triplet;
			}
			console.log('Quad!');
			alerts.quad = true;
			endTurnButtonDisabled = false;
			return;
		}
		if (detectTriplet(diceRolls) === true) {
			if (tripArray[0] === 1) {
				score.triplet = 1000;
				score.totalScore += score.triplet;
			} else if (tripArray[0] === 2) {
				score.triplet = 200;
				score.totalScore += score.triplet;
			} else if (tripArray[0] === 3) {
				score.triplet = 300;
				score.totalScore += score.triplet;
			} else if (tripArray[0] === 4) {
				score.triplet = 400;
				score.totalScore += score.triplet;
			} else if (tripArray[0] === 5) {
				score.triplet = 500;
				score.totalScore += score.triplet;
			} else if (tripArray[0] === 6) {
				score.triplet = 600;
				score.totalScore += score.triplet;
			}
			console.log('Triplet!');
			alerts.triplet = true;
			endTurnButtonDisabled = false;
			return;
		}
		if (detectCrapout(diceRolls) === true) {
			console.log('Crapout!');
			score.totalScore = 0;
			alerts.crapout = true;
			rollButtonDisabled = true;
			endTurnButtonDisabled = false;
			return;
		}
		if (detectJackpot(diceRolls) === true) {
			console.log('Jackpot!');
			score.jackpot += 750;
			score.totalScore += score.jackpot;
			alerts.jackpot = true;
			return;
		}
		rollButtonDisabled = true;
		console.log('Data At Time of Dice Roll: \n', data);
	}

	// MARK: - Turn Ending Functions

	/**
	 * ## Change Turn
	 * @description **A Function for changing the turn**
	 */
	function changeTurn() {
		//Change the turn
		data.game.currentTurn += 1;
		//Accumulate the total number of turns
		data.game.totalTurns += 1;
		//Reset the dice rolls
		if (data.game.currentTurn > data.game.playerNum) {
			data.game.currentTurn = 1;
		}
	}
	/**
	 * ## End Turn
	 * @description **Ends the Turn and performs ending functions**
	 * @returns {boolean} Returns true if the dice roll is a triplet
	 */
	async function endTurn() {
		//Accumulate the score
		accumulateScore();
		//Check if the User's Score now totals 10,000
		if (data.game.players[data.game.currentTurn - 1].totalScore >= 10000) {
			//If the User's Score is 10,000 or more, end the game
			endGame();
			return;
		}
		//Change the turn
		changeTurn();
		//save the game to the database
		await fetch(`http://ec2-44-208-166-56.compute-1.amazonaws.com/games/${data.game.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: data.game.id,
				playerNum: data.game.playerNum,
				players: data.game.players,
				currentTurn: data.game.currentTurn,
				totalTurns: data.game.totalTurns
			})
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('Data Sent To Database', data);
			});
		//Change the turn
		console.log("User's Data When End Turn Is Pressed \n", data);
		resetData();
	}
	/**
	 * ## End Game
	 * @description **Ends Game once someone has reached 10,000 score**
	 * @returns {void} Returns nothing
	 */
	async function endGame() {
		gameOver = true;
		await fetch(`http://ec2-44-208-166-56.compute-1.amazonaws.com/games/${data.game.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('Data Sent To Database', data);
			});
	}
</script>

<main class="container">
	<!-- Display Alerts -->
	<article class="alertSection">
		{#if alerts.crapout === true && gameOver === false}
			<h2>Sorry You Crapped Out...</h2>
			<div class="diceSection">
				{#each diceRolls as dice, i}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					{#if dice === 1}
						<img src={dice1} alt="Dice 1" />
					{:else if dice === 2}
						<img src={dice2} alt="Dice 2" />
					{:else if dice === 3}
						<img src={dice3} alt="Dice 3" />
					{:else if dice === 4}
						<img src={dice4} alt="Dice 4" />
					{:else if dice === 5}
						<img src={dice5} alt="Dice 5" />
					{:else if dice === 6}
						<img src={dice6} alt="Dice 6" />
					{/if}
				{/each}
			</div>
		{/if}

		<!-- Display Dice Roll -->
		{#if diceRolls.length > 0 && alerts.crapout === false && gameOver === false}
			<h2>Your Roll</h2>
			<div class="diceSection">
				{#each diceRolls as dice, i}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					{#if dice === 1}
						<img src={dice1} alt="Dice 1" on:click|preventDefault={() => moveToChosenDice(i)} />
					{:else if dice === 2}
						<img src={dice2} alt="Dice 2" on:click|preventDefault={() => moveToChosenDice(i)} />
					{:else if dice === 3}
						<img src={dice3} alt="Dice 3" on:click|preventDefault={() => moveToChosenDice(i)} />
					{:else if dice === 4}
						<img src={dice4} alt="Dice 4" on:click|preventDefault={() => moveToChosenDice(i)} />
					{:else if dice === 5}
						<img src={dice5} alt="Dice 5" on:click|preventDefault={() => moveToChosenDice(i)} />
					{:else if dice === 6}
						<img src={dice6} alt="Dice 6" on:click|preventDefault={() => moveToChosenDice(i)} />
					{/if}
				{/each}
			</div>
		{/if}

		<!-- QUAD SECTION -->
		{#if alerts.quad === true && alerts.crapout === false && gameOver === false}
			<h2>Quad!</h2>
			<div class="diceSection">
				{#each quadArray as dice, i}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					{#if dice === 1}
						<img src={dice1} alt="Dice 1" />
					{:else if dice === 2}
						<img src={dice2} alt="Dice 2" />
					{:else if dice === 3}
						<img src={dice3} alt="Dice 3" />
					{:else if dice === 4}
						<img src={dice4} alt="Dice 4" />
					{:else if dice === 5}
						<img src={dice5} alt="Dice 5" />
					{:else if dice === 6}
						<img src={dice6} alt="Dice 6" />
					{/if}
				{/each}
			</div>
		{/if}

		<!-- TRIPLET SECTION -->
		{#if alerts.triplet === true && alerts.crapout === false && gameOver === false}
			<h2>Triplet!</h2>
			<div class="diceSection">
				{#each tripArray as dice, i}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					{#if dice === 1}
						<img src={dice1} alt="Dice 1" />
					{:else if dice === 2}
						<img src={dice2} alt="Dice 2" />
					{:else if dice === 3}
						<img src={dice3} alt="Dice 3" />
					{:else if dice === 4}
						<img src={dice4} alt="Dice 4" />
					{:else if dice === 5}
						<img src={dice5} alt="Dice 5" />
					{:else if dice === 6}
						<img src={dice6} alt="Dice 6" />
					{/if}
				{/each}
			</div>
		{/if}

		<!-- JACKPOT SECTION -->
		{#if alerts.jackpot === true && alerts.crapout === false && gameOver === false}
			<h2>Jackpot!</h2>
		{/if}

		<!-- Dice Selection Section -->
		{#if chosenDice.length > 0 && gameOver === false}
			<h2>Selected Dice</h2>
			<div class="diceSection">
				{#each chosenDice as dice, i}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					{#if dice === 1}
						<img src={dice1} alt="Dice 1" on:click|preventDefault={() => undoChoice(i)} />
					{:else if dice === 2}
						<img src={dice2} alt="Dice 2" on:click|preventDefault={() => undoChoice(i)} />
					{:else if dice === 3}
						<img src={dice3} alt="Dice 3" on:click|preventDefault={() => undoChoice(i)} />
					{:else if dice === 4}
						<img src={dice4} alt="Dice 4" on:click|preventDefault={() => undoChoice(i)} />
					{:else if dice === 5}
						<img src={dice5} alt="Dice 5" on:click|preventDefault={() => undoChoice(i)} />
					{:else if dice === 6}
						<img src={dice6} alt="Dice 6" on:click|preventDefault={() => undoChoice(i)} />
					{/if}
				{/each}
			</div>
		{:else if chosenDice.length > 0 && alerts.crapout === false && gameOver === false}
			<h2>Selected Dice</h2>
			<div class="diceSection">
				{#each chosenDice as dice, i}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					{#if dice === 1}
						<img src={dice1} alt="Dice 1" />
					{:else if dice === 2}
						<img src={dice2} alt="Dice 2" />
					{:else if dice === 3}
						<img src={dice3} alt="Dice 3" />
					{:else if dice === 4}
						<img src={dice4} alt="Dice 4" />
					{:else if dice === 5}
						<img src={dice5} alt="Dice 5" />
					{:else if dice === 6}
						<img src={dice6} alt="Dice 6" />
					{/if}
				{/each}
			</div>
		{/if}
	</article>
	<!-- The Player Information Box -->
	{#if gameOver === false}
		<article class="infoBox">
			<p>Turn: {data.game.totalTurns}</p>
			<p>Player: {data.game.players[data.game.currentTurn - 1].nickname}</p>
			<p>Round Score: {score.totalScore}</p>
			<p>Game Score: {data.game.players[data.game.currentTurn - 1].totalScore}</p>
			<!-- Dice Rolling Button -->
			{#if diceRolls.length === 0}
				<button class="rollDiceButton" disabled={rollButtonDisabled} on:click={() => rollDice(5)}
					>Roll Dice</button
				>
			{:else if diceRolls.length === 1}
				<button class="rollDiceButton" disabled={rollButtonDisabled} on:click={() => rollDice(1)}
					>Roll Again</button
				>
			{:else if diceRolls.length === 2}
				<button class="rollDiceButton" disabled={rollButtonDisabled} on:click={() => rollDice(2)}
					>Roll Again</button
				>
			{:else if diceRolls.length === 3}
				<button class="rollDiceButton" disabled={rollButtonDisabled} on:click={() => rollDice(3)}
					>Roll Again</button
				>
			{:else if diceRolls.length === 4}
				<button class="rollDiceButton" disabled={rollButtonDisabled} on:click={() => rollDice(4)}
					>Roll Again</button
				>
			{:else if diceRolls.length === 5}
				<button class="rollDiceButton" disabled={rollButtonDisabled} on:click={() => rollDice(5)}
					>Roll Again</button
				>
			{/if}
			<!-- End Turn Button -->

			<button
				class="endTurnButton"
				disabled={endTurnButtonDisabled}
				on:click|preventDefault={() => endTurn()}>End Turn</button
			>
		</article>
	{/if}
	<!-- Game Won Section -->
	{#if gameOver === true}
		<article class="winningSection">
			<h2>Game Over</h2>
			<p>Winner: {data.game.players[data.game.currentTurn - 1].nickname}</p>
			<p>Score: {data.game.players[data.game.currentTurn - 1].totalScore}</p>
			<a href="/game/new">Play Again</a>
			<a href="/">Go Home</a>
		</article>
	{/if}
</main>

<style>
	.infoBox,
	.alertSection {
		position: absolute;
	}
	.infoBox {
		top: 0;
		right: 0;
		/* position in the center */
		transform: translate(0, 30vh);
		margin-right: 25vw;
	}
	.alertSection {
		top: 0;
		left: 0;
		transform: translate(0, 30vh);
		margin-left: 25vw;
	}
	.rollDiceButton,
	.endTurnButton {
		height: 3rem;
		width: 10rem;
		font-size: 1.5rem;
		display: block;
		margin-top: 2rem;
	}
	.diceSection {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		position: relative;
		margin-bottom: 2rem;
	}

	h2 {
		font-size: 2rem;
		text-decoration: underline;
		margin-bottom: 1rem;
	}
	.infoBox p {
		font-size: 1.5rem;
	}
	.winningSection {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
