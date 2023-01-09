// @ts-nocheck
import dbConnect from '$lib/db';
import { GameModel } from '$lib/models/Game';
export async function load({ params }) {
	let id = params.id;
	dbConnect();
	let game = await GameModel.find({ id: id });

	console.log(game[0].playerNum);
	return {
		playerNum: game[0].playerNum
	};
}
