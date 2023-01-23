<script>
	// @ts-nocheck

	import { page } from '$app/stores';
</script>

<h1>{$page.error.message}</h1>
<a href="/game/new">Start a new game</a>

<style>
	h1 {
		font-size: 3rem;
		margin: 0 0 1rem 0;
	}
	a {
		font-size: 1.5rem;
		text-decoration: none;
		color: rgb(59, 59, 59);
	}
</style>
