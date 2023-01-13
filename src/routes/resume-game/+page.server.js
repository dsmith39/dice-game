// @ts-nocheck
import dbConnect from '$lib/db';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { GameModel } from '$lib/models/Game';
export async function load() {
	dbConnect();
	let games = await GameModel.find();
	games = JSON.parse(JSON.stringify(games));
	if (!games || games.length === 0) throw error(404, 'There are no saved games.');
	console.log(games);

	return {
		games: games
	};
}
export const actions = {
	default: async (event) => {
		event.preventDefault;
		await dbConnect();
		const data = await event.request.formData();
		let gameID = data.get('gameID');
		throw redirect('301', `/game/${gameID}`);
		// return {
		// 	success: true,
		// };
	}
};
