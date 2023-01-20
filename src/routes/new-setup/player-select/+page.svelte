<script>
	// @ts-nocheck
	import { enhance } from '$app/forms';
	let playerChoice;
</script>

<h2>How many people are playing?</h2>
<form method="POST" action="?/create" use:enhance>
	<input
		name="playerChoice"
		type="number"
		min="2"
		max="10"
		bind:value={playerChoice}
		class="numberInput"
	/>
	{#if playerChoice >= 1}
		<h3>Enter the nicknames of the players</h3>
		{#each Array(playerChoice) as _, i}
			<div>
				<label for="player{i}">Player {i + 1}</label>
				<input name="player{i}" type="text" />
			</div>
		{/each}
	{/if}
	<button>Submit</button>
</form>

<style>
	h2 {
		font-size: 2rem;
		margin: 5rem 0 1rem 0;
	}
	h3 {
		font-size: 1.5rem;
		margin: 1rem 0 1rem 0;
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	input {
		font-size: 1.5rem;
		margin: 0 0 1rem 0;
	}
	label {
		display: block;
		font-size: 1.5rem;
		margin: 1rem 0 0.5rem 0;
	}
	button {
		font-size: 1.5rem;
		margin: 1rem 0 1rem 0;
	}
	.numberInput {
		width: 5rem;
	}
</style>
