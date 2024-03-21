import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../app/types";
import { userApi } from "../../app/services/userApi";

interface IUserState {
	user: User | null;
	users: User[] | null;
	current: User | null;
	isAuthenticated: boolean;
	token?: string;
}

const initialState: IUserState = {
	user: null,
	users: null,
	current: null,
	isAuthenticated: false,
};

const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: () => initialState,
		resetUser: (state) => {
			state.user = null;
		},
	},
	extraReducers(builder) {
		builder
			.addMatcher(
				userApi.endpoints.login.matchFulfilled,
				(state, action) => {
					state.token = action.payload.token;
					state.isAuthenticated = true;
				},
			)
			.addMatcher(
				userApi.endpoints.current.matchFulfilled,
				(state, action) => {
					state.current = action.payload;
					state.isAuthenticated = true;
				},
			)
			.addMatcher(
				userApi.endpoints.getUserById.matchFulfilled,
				(state, action) => {
					state.user = action.payload;
					state.isAuthenticated = true;
				},
			)
	},
})

export const { logout, resetUser } = slice.actions;
export default slice.reducer;
