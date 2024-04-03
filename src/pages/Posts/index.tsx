import { useGetAllPostsQuery } from '../../app/services/postsApi';
import { CreatePost } from '../../components/CreatePost';
import { Card } from '../../components/Card';

export const Posts = () => {
	const { data } = useGetAllPostsQuery();

	return (
		<>
			<div className="mb-10 w-full">
				<CreatePost />
			</div>
			{(data && data.length > 0)
				? data.map(({
					id,
					authorId,
					author,
					content,
					comments,
					likes,
					likedByUser,
					createdAt,
				}) => (
					<Card 
						id={id}
						key={id}
						avatarUrl={author.avatarUrl ?? ''}
						content={content}
						name={author.name ?? ''}
						likesCount={likes.length}
						commentsCount={comments.length}
						authorId={authorId}
						likedByUser={likedByUser}
						createdAt={createdAt}
						cardFor='post'
					/>
				))
				: null
			}
		</>
	);
};
