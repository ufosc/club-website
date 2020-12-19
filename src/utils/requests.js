import { server } from './hosts'
import axios from "axios";

// return user token from strapi
export const postUser = async (body) => {
	const response = await axios.post(`${server}/auth/login`, body, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return response;
}
