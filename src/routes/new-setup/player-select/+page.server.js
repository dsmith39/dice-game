// @ts-nocheck
import dbConnect from '$lib/db';
import { redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import { GameModel } from '$lib/models/Game';
import { PlayerModel } from '$lib/models/Player';
export const actions = {
	create: async (event) => {
		event.preventDefault;
		await dbConnect();
		const data = await event.request.formData();
		let playerNum = data.get('playerChoice');
		let players = [];
		for (let i = 0; i < playerNum; i++) {
			players.push({
				nickname: data.get(`player${i}`),
				turnOrder: i + 1,
				currentScore: 0,
				totalScore: 0
			});
			let playerID = uuidv4();
			let playerPayload = {
				id: playerID,
				nickname: data.get(`player${i}`),

				isPlaying: true
			};
			await PlayerModel.create(playerPayload);
		}
		let gameID = uuidv4();
		let gamePayload = {
			id: gameID,
			playerNum: playerNum,
			players: players,
			currentTurn: 1
		};
		await GameModel.create(gamePayload);
		throw redirect('301', `/game`);
	}
};
