<script>
	// @ts-nocheck
	export let data;
	console.log(data);
</script>

{#each data.games as game}
	<div>
		<h2>A {game.playerNum} player game</h2>
		<h3>On Turn {game.currentTurn}</h3>
		<h3>The Players are:</h3>
		{#each game.players as player}
			<p>
				{player.nickname} (Score: {player.currentScore})
			</p>
		{/each}
	</div>
{/each}
