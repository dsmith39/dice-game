<script>
	// @ts-nocheck
	import { page } from '$app/stores';
</script>

{#if $page.status === 404}
	<h1>There Are No Users Saved</h1>
	<a href="/new-setup/player-select">Create a new game!</a>
	<a href="/settings/create-user">Create a new user!</a>
{:else}
	<h1>{$page.status}</h1>
	<h2>{$page.error.message}</h2>
{/if}
