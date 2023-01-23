<script>
	// @ts-nocheck
	import { enhance } from '$app/forms';
	export let data;
	console.log(data);
</script>

<h1>Resume a Game</h1>
{#each data.games as game}
	<div class="gameInfo">
		<h2>A {game.playerNum} player game</h2>
		<h3>On Turn {game.totalTurns}</h3>
		<h3 class="playerHeading">The Players are:</h3>
		{#each game.players as player}
			<p>
				{player.nickname} (Score: {player.totalScore})
			</p>
		{/each}
		<form method="POST" use:enhance>
			<input type="hidden" name="gameID" value={game.id} />
			<button type="submit">Resume Game</button>
		</form>
	</div>
{/each}

<style>
	h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
	}
	.gameInfo {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 1px solid black;
		padding: 1rem 1rem 0 1rem;
		margin: 1rem 0 1rem 0;
	}
	.gameInfo h2 {
		font-size: 2rem;
		margin: 0 0 0.5rem 0;
	}
	.gameInfo h3 {
		font-size: 1.5rem;
		margin: 1rem 0 0.25rem 0;
	}
	.gameInfo .playerHeading {
		margin: 1rem 0 0.5rem 0;
		font-weight: 600;
	}
	.gameInfo p {
		font-size: 1.25rem;
		margin: 0 0 0.25rem 0;
	}
	.gameInfo form {
		margin: 0 0 3rem 0;
	}
	.gameInfo button {
		font-size: 1.25rem;
		margin: 3rem 0 0 0;
	}
</style>
