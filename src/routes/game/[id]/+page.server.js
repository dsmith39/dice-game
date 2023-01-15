// @ts-nocheck
export async function load({ fetch, params }) {
	let id = params.id;
	let game = await fetch(`http://ec2-44-208-166-56.compute-1.amazonaws.com/games/${id}`).then((r) =>
		r.json()
	);

	return {
		game: game[0]
	};
}
