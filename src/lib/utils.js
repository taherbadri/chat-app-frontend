import axios from 'axios';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const customFetch = axios.create({
	baseURL: 'http://localhost:5000/api/v1',
	withCredentials: true,
});

export const errorFormat = (payload) => {
	console.log(`file: utils.js:148 - errorFormat - payload:`, payload);
	if (!payload) {
		return 'Something went wrong, payload not received in error';
	}
	let message;
	switch (payload.status) {
		case 400:
			message = Object.keys(payload.error.error)
				.map((key) => `${payload.error.error[key]}`)
				.join(',\n ');
			break;

		default:
			message = payload?.error?.message;
			break;
	}

	// return typeof payload === 'string'
	// 	? payload
	// 	: payload?.message
	// 	? payload?.message
	// 	: Object.keys(payload)
	// 			.map((key) => `${key}: ${payload[key]}`)
	// 			.join(', ');
	return message;
};
