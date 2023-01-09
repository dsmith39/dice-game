// @ts-nocheck
import dbConnect from '$lib/db';
import { v4 as uuidv4 } from 'uuid';
import { GameModel } from '$lib/models/Game';
export const actions = {
	create: async (event) => {
		event.preventDefault;
		const data = await event.request.formData();
		let playerNum = data.get('playerChoice');
		let players = [];
		let id = uuidv4();
		let payload = {
			id: id,
			playerNum: playerNum,
			players: players
		};
		dbConnect();
		await GameModel.create(payload);

		return {
			success: true
		};
	}
};
