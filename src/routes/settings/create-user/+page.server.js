// @ts-nocheck
import dbConnect from '$lib/db';
import { redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import { PlayerModel } from '$lib/models/Player';
export const actions = {
	default: async (event) => {
		event.preventDefault;
		const data = await event.request.formData();
		let nickname = data.get('nickname');
		let id = uuidv4();
		let payload = {
			id: id,
			nickname: nickname
		};
		await dbConnect();
		await PlayerModel.create(payload);
		throw redirect('301', `/settings/manage-users`);
		// return {
		// 	success: true,
		// };
	}
};
