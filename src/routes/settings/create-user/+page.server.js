// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
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
		await fetch(`http://ec2-44-208-166-56.compute-1.amazonaws.com/players`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});
		throw redirect('301', `/settings/manage-users`);
		// return {
		// 	success: true,
		// };
	}
};
