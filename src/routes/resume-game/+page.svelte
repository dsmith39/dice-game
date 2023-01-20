<script>
	// @ts-nocheck
	import { enhance } from '$app/forms';
	export let data;
	console.log(data);
</script>

<h1>Resume a Game</h1>
{#each data.games as game}
	<div>
		<h2>A {game.playerNum} player game</h2>
		<h3>On Turn {game.totalTurns}</h3>
		<h3>The Players are:</h3>
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
