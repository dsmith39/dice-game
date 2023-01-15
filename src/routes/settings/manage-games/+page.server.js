import { error } from '@sveltejs/kit';
export async function load() {
	let games = await fetch(`http://ec2-44-208-166-56.compute-1.amazonaws.com/games`).then((r) =>
		r.json()
	);
	if (!games || games.length === 0) throw error(404, 'There are no saved games.');
	console.log(games);
	return {
		games: games
	};
}
