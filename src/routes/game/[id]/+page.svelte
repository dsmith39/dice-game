<script>
	// @ts-nocheck

	export let data;
	let totalTurns = 1;
	function changeTurn() {
		data.game.currentTurn++;
		totalTurns++;
		// If the current turn is greater than the number of players, reset to 1
		if (data.game.currentTurn > data.game.players.length) {
			data.game.currentTurn = 1;
		}
		console.log(data.game.currentTurn);
	}
	let diceRolls = [];
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
	function handleDiceRoll(diceNumber) {
		diceRolls = rollDice(diceNumber);
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
		{#each diceRolls as dice}
			<p>{dice}</p>
		{/each}
	</section>
</article>

<button on:click|preventDefault={() => handleDiceRoll(5)}>Roll Dice</button>
<button on:click|preventDefault={() => changeTurn}>Next Turn</button>

<style>
	.diceSection {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
