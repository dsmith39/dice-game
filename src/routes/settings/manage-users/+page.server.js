import dbConnect from '$lib/db';
import { error } from '@sveltejs/kit';
import { PlayerModel } from '$lib/models/Player';
export async function load() {
	dbConnect();
	let players = await PlayerModel.find();
	players = JSON.parse(JSON.stringify(players));
	if (!players || players.length === 0) throw error(404, 'There are no saved players.');
	return {
		players: players
	};
}
