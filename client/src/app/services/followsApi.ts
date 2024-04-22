import { api } from "./api";

export const followsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		followUser: builder.mutation<void, {followingId: string}>({
			query: (followData) => ({
				url: '/follows',
				method: 'POST',
				body: followData,
			})
		}),
		unfollowUser: builder.mutation<void, string>({
			query: (userId) => ({
				url: `/follows/${userId}`,
				method: 'DELETE',
			})
		}),
	})
});

export const {
useFollowUserMutation,
useUnfollowUserMutation,
} = followsApi;

export const {
	endpoints: {
		followUser,
		unfollowUser,
	}
} = followsApi;
