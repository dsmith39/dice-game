<script>
	// @ts-nocheck

	import lodash from 'lodash';

	export let data;

	//States
	let totalTurns = 1;
	let diceRolls = [];
	let chosenDice = [];

	// Function to change the current turn
	function changeTurn() {
		data.game.currentTurn++;
		totalTurns++;
		// If the current turn is greater than the number of players, reset to 1
		if (data.game.currentTurn > data.game.players.length) {
			data.game.currentTurn = 1;
		}
		console.log(data.game.currentTurn);
	}
	// Function to roll dice and return an array of the dice rolls
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
	// Function to handle the dice roll
	// This function will be called when the user clicks the roll dice button
	// It will pass the number of dice to roll to the rollDice function
	// It will then set the diceRolls variable to the returned array
	function handleDiceRoll(diceNumber) {
		diceRolls = rollDice(diceNumber);
	}
	// If the dice is already in the chosenDice array, remove it
	// If the dice is not in the chosenDice array, add it
	function handleDiceSelect(i) {
		console.log('Button Clicked');
		// this is the roll that was clicked
		let chosenRoll = diceRolls[i];
		//This adds the chosen roll to the chosenDice array
		chosenDice = lodash.concat(chosenDice, chosenRoll);
		//This removes the chosen roll from the diceRolls array
		lodash.pullAt(diceRolls, [i]);
		//This removes any undefined values from the diceRolls array
		diceRolls = lodash.compact(diceRolls);
		console.log(diceRolls);
	}
	// A function to put numbers back in their original spot
	function returnChoice(i) {
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
</script>

<article>
	<p>Turn: {totalTurns}</p>
	<p>Player: {data.game.players[data.game.currentTurn - 1].nickname}</p>
	<p>Round Score: {data.game.players[data.game.currentTurn - 1].currentScore}</p>
	<p>Total Score: {data.game.players[data.game.currentTurn - 1].totalScore}</p>
</article>

<article>
	<h2>Dice Roll</h2>
	<section class="diceSection">
		{#each diceRolls as dice, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			{#if diceRolls[i] === undefined}
				<div class="hidden">
					{dice}
				</div>
			{:else}
				<div on:click={() => handleDiceSelect(i)}>
					{dice}
				</div>
			{/if}
		{/each}
	</section>
</article>
<article>
	<h2>Chosen Dice</h2>
	<section class="diceSection">
		{#each chosenDice as dice, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => returnChoice(i)}>
				{dice}
			</div>
		{/each}
	</section>
</article>

<button on:click|preventDefault={() => handleDiceRoll(5)}>Roll Dice</button>
<button on:click|preventDefault={() => changeTurn()}>Next Turn</button>

<style>
	.diceSection {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.hidden {
		display: none;
	}
</style>
