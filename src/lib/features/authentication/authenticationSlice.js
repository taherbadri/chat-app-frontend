import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '@/lib/utils';
import { toast } from 'sonner';

const initialState = {
	isLoading: false,
	user: null,
	isLoggedOut: false,
};

export const login = createAsyncThunk(
	'authentication/login',
	async ({ email, password }, thunkAPI) => {
		try {
			const { data } = await customFetch.post('/auth/login', {
				email,
				password,
			});
			if (data.success) {
				thunkAPI.dispatch(showMe());
			}
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const register = createAsyncThunk(
	'authentication/register',
	async ({ email, password, username }, thunkAPI) => {
		try {
			const { data } = await customFetch.post('/auth/register', {
				email,
				password,
				username,
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const logout = createAsyncThunk(
	'authentication/logout',
	async (_, thunkAPI) => {
		try {
			const { data } = await customFetch.delete('/auth/logout');
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const verifyEmail = createAsyncThunk(
	'authentication/verifyEmail',
	async (tokenData, thunkAPI) => {
		try {
			const { data } = await customFetch.post(`/auth/verify-email`, {
				...tokenData,
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const showMe = createAsyncThunk(
	'authentication/showMe',
	async (_, thunkAPI) => {
		try {
			const { data } = await customFetch.get('/users/showMe');
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isLoggedOut = false;
				toast.success(payload.message);
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isLoggedOut = true;
				toast.error(payload);
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.user = payload;
				toast.success(payload.message);
			})
			.addCase(register.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.user = null;
				state.isLoggedOut = true;
				toast.success(payload.message);
			})
			.addCase(logout.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(verifyEmail.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(verifyEmail.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				toast.success(payload.message);
			})
			.addCase(verifyEmail.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(showMe.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(showMe.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isLoggedOut = false;
				state.user = payload.user;
			})
			.addCase(showMe.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isLoggedOut = true;
				toast.error(payload);
			});
	},
});

export default authenticationSlice.reducer;
