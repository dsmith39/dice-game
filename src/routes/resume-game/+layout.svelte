<main>
	<a href="/">Home</a>
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	a {
		text-decoration: none;
		font-size: 2rem;
		color: black;
		margin: 1rem 0 1rem 0;
	}
	a:visited {
		color: black;
	}
	a:hover {
		color: rgb(127, 127, 127);
	}
</style>
