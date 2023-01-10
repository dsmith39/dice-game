<script>
	// @ts-nocheck
	export let data;
</script>

<h1>Manage Users</h1>

{#each data.players as player}
	<h2>{player.nickname}</h2>
{/each}
