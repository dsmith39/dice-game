import { error } from '@sveltejs/kit';
export async function load() {
	let players = await fetch(`http://ec2-44-208-166-56.compute-1.amazonaws.com/players`).then((r) =>
		r.json()
	);
	if (!players || players.length === 0) throw error(404, 'There are no saved players.');
	return {
		players: players
	};
}
