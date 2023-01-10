import dbConnect from '$lib/db';
import { error } from '@sveltejs/kit';
import { GameModel } from '$lib/models/Game';
export async function load() {
	dbConnect();
	let games = await GameModel.find();
	if (!games || games.length === 0) throw error(404, 'There are no saved games.');
	console.log(games);
	return {
		games: games
	};
}
