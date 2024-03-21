import { createListenerMiddleware } from "@reduxjs/toolkit";
import { userApi } from "../app/services/userApi";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	// Слушаем успешный ответ login, чтобы перехватить
	// token и записать его в localStorage
	matcher: userApi.endpoints.login.matchFulfilled,
	effect: async (action, listenerApi) => {
		// Прекращаем прослушивание
		listenerApi.cancelActiveListeners();

		if(action.payload.token) {
			localStorage.setItem('token', action.payload.token);
		}
	}
});
