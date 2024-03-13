import { api } from "./api";
import type { Like } from "../types";

export const likesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		likePost: builder.mutation<Like, {postId: string}>({
			query: (likeData) => ({
				url: '/likes',
				method: 'POST',
				body: likeData,
			})
		}),
		unLikePost: builder.mutation<void, string>({
			query: (postId) => ({
				url: `/likes/${postId}`,
				method: 'DELETE',
			})
		}),
	})
});

export const {
	useLikePostMutation,
	useUnLikePostMutation,
} = likesApi;

export const {
	endpoints: {
		likePost,
		unLikePost,
	}
} = likesApi;
