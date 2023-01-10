<script>
	// @ts-nocheck
	import { enhance } from '$app/forms';
	let playerChoice;
</script>

<h2>How many people are playing?</h2>
<form method="POST" action="?/create" use:enhance>
	<input name="playerChoice" type="number" min="2" max="10" bind:value={playerChoice} />
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
