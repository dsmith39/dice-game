import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

/**
 * ## load
 * @description Load all game data from the database for the /resume-game page
 * @returns {Promise<Array<any>>} An array of all games
 */
export async function load() {
	let games = await fetch(`http://ec2-44-208-166-56.compute-1.amazonaws.com/games`).then((r) =>
		r.json()
	);
	if (!games || games.length === 0) throw error(404, 'There are no saved games.');
	console.log(games);

	return {
		// @ts-ignore
		games: games
	};
}
export const actions = {
	/**
	 * ## resume-game
	 * **resume-game** action
	 * @param {*} event
	 */
	default: async (event) => {
		event.preventDefault;
		const data = await event.request.formData();
		let gameID = data.get('gameID');
		throw redirect(301, `/game/${gameID}`);
		// return {
		// 	success: true,
		// };
	}
};
