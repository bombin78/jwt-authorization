import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../app/services/postsApi";
import { Card } from "../../components/Card";
import { GoBack } from "../../components/GoBack";
import { CreateComment } from "../../components/CreateComment";

export const CurrentPost = () => {
	const params = useParams<{ id: string }>();
	const { data } = useGetPostByIdQuery(params?.id ?? '');

	if(!data) {
		return (<h2>Поста не существует</h2>);
	}

	const {
		id,
		authorId,
		author,
		content,
		comments,
		likes,
		likedByUser,
		createdAt,
	} = data;

	return (
		<>
			<GoBack />

			<Card
				cardFor="current-post"
				id={id}
				authorId={authorId}
				avatarUrl={author.avatarUrl ?? ''}
				content={content}
				name={author.name ?? ''}
				likesCount={likes.length}
				commentsCount={comments.length}
				likedByUser={likedByUser}
				createdAt={createdAt}
			/>

			<div className="mt-10">
				<CreateComment />
			</div>
			
			<div className="mt-10">
				{data.comments 
					? (data.comments.map((comment) => (
						<Card 
							cardFor="comment"
							key={comment.id}
							id={id}
							authorId={comment.userId}
							commentId={comment.id}
							avatarUrl={comment.user.avatarUrl ?? ''}
							content={comment.content}
							name={comment.user.name ?? ''}
						/>
					)))
					: null
				}
			</div>
		</>
	);
};
