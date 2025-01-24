import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '@/lib/features/authentication/authenticationSlice';
import chatReducer from '@/lib/features/chat/chatSlice';
export const makeStore = () => {
	return configureStore({
		reducer: {
			authentication: authenticationReducer,
			chat: chatReducer,
		},
	});
};
