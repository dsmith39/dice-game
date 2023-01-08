<script>
	// @ts-nocheck

	import { playerNum } from '../../stores.js';

	let selectedPlayers = $playerNum;

	function handleSubmit(event) {
		playerNum.set(selectedPlayers);
	}
</script>

<h2>How many people are playing</h2>
<form action="/setup-players" on:submit={handleSubmit}>
	<input type="number" min="1" max="10" bind:value={selectedPlayers} />
	<button type="submit">Submit</button>
</form>
