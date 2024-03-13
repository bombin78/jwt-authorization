import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import type { RootState } from "../store";

const baseQuery = fetchBaseQuery({
	baseUrl: `${BASE_URL}/api`,
	// prepareHeaders: (headers, {getState}) => {
	// 	const token = (getState() as RootState).auth.token || localStorage.getItem('token');

	// 	if (token) {
	// 		headers.set('authorization', `Bearer ${token}`)
	// 	}

	// 	return headers;
	// }
});

// Если запрос один раз не прошел, делаем вторую попытку (maxRetries = 1)
const baseQueryWithRetry = retry(baseQuery, {maxRetries: 1});

export const api = createApi({
	reducerPath: "splitApi",
	baseQuery: baseQueryWithRetry,
	// Если меняется аргумент, то вместо получения
	// данных из кэша будет сделан новый запрос
	refetchOnMountOrArgChange: true,
	endpoints: () => ({}),
});
