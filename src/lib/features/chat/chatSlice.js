import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '@/lib/utils';

export const getChats = createAsyncThunk(
	'chat/getChats',
	async (_, thunkAPI) => {
		try {
			const { data } = await customFetch.get('/chats');
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const createChat = createAsyncThunk(
	'chat/createChat',
	async (chatData, thunkAPI) => {
		try {
			const { data } = await customFetch.post('/chats', chatData);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const getMessages = createAsyncThunk(
	'chat/getMessages',
	async (chatId, thunkAPI) => {
		try {
			const { data } = await customFetch.get(`/message/${chatId}`);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const sendMessage = createAsyncThunk(
	'chat/sendMessage',
	async ({ chatId, content }, thunkAPI) => {
		try {
			const { data } = await customFetch.post(`/message`, {
				content,
				chatId,
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const markChatAsRead = createAsyncThunk(
	'chat/markChatAsRead',
	async (messageId, thunkAPI) => {
		try {
			const { data } = await customFetch.patch(`/message/${messageId}`);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const chatSlice = createSlice({
	name: 'chat',
	initialState: {
		chats: [],
		selectedChat: null,
		messages: [],
		isLoading: false,
		error: null,
		selectedChatUser: null,
	},
	reducers: {
		setSelectedChat: (state, action) => {
			state.selectedChat = action.payload;
			state.selectedChatUser = state.chats.find(
				(c) => c._id === action.payload
			);
		},
		receiveMessage: (state, action) => {
			if (state.selectedChat === action.payload.chat) {
				state.messages.push(action.payload);
			}
		},
		markMessageAsRead: (state, action) => {
			// const message = state.messages.find((m) => m._id === action.payload);
			// if (message) {
			// 	message.isRead = true;
			// }
			state.messages = state.messages.map((m) =>
				m._id === action.payload ? { ...m, isRead: true } : m
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getChats.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getChats.fulfilled, (state, action) => {
				state.chats = action.payload.data;
				state.isLoading = false;
			})
			.addCase(getChats.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			})
			.addCase(createChat.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createChat.fulfilled, (state, action) => {
				state.chats.push(action.payload);
				state.isLoading = false;
			})
			.addCase(createChat.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			})
			.addCase(getMessages.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMessages.fulfilled, (state, action) => {
				state.messages = action.payload.data;
				state.isLoading = false;
			})
			.addCase(getMessages.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const {} = chatSlice.actions;

export const { setSelectedChat, receiveMessage, markMessageAsRead } =
	chatSlice.actions;
export default chatSlice.reducer;
