// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
export const actions = {
	create: async (event) => {
		event.preventDefault;
		const data = await event.request.formData();
		let playerNum = data.get('playerChoice');
		let players = [];
		for (let i = 0; i <= playerNum; i++) {
			players.push({
				nickname: data.get(`player${i}`),
				turnIndex: i,
				totalScore: 0
			});
			let playerID = uuidv4();
			let playerPayload = {
				id: playerID,
				nickname: data.get(`player${i}`),

				isPlaying: true
			};
			await fetch(`http://ec2-44-208-166-56.compute-1.amazonaws.com/players`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(playerPayload)
			});
		}
		let gameID = uuidv4();
		let gamePayload = {
			id: gameID,
			playerNum: playerNum,
			players: players,
			currentTurn: 1,
			totalTurns: 1
		};
		await fetch(`http://ec2-44-208-166-56.compute-1.amazonaws.com/games`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(gamePayload)
		});
		throw redirect('301', `/game/${gameID}`);
	}
};
