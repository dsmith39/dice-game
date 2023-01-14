// @ts-nocheck
import dbConnect from '$lib/db';
import { GameModel } from '$lib/models/Game';
export async function load({ params }) {
	let id = params.id;
	dbConnect();
	let game = await GameModel.find({ id: id });
	game = JSON.parse(JSON.stringify(game));
	return {
		game: game[0]
	};
}
