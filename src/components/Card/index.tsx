import { useState } from 'react';
import {
	CardBody,
	CardFooter,
	CardHeader,
	Card as NextUICard,
	Spinner,
} from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri';
import { User } from '../User';
import { MetaInfo } from '../MetaInfo';
import { useAppSelector } from '../../app/hooks';
import { Typography } from '../Typography';
import {
	unlikePost,
	useLikePostMutation,
	useUnlikePostMutation,
} from '../../app/services/likesApi';
import {
	useDeletePostMutation,
	useLazyGetAllPostsQuery,
	useLazyGetPostByIdQuery,
} from '../../app/services/postsApi';
import { useDeleteCommentMutation } from '../../app/services/commentsApi';
import { selectCurrent } from '../../features/user/userSlice';
import { formatToClientDate } from '../../utils/formatToClientDate';
import { FcDislike } from 'react-icons/fc';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { FaRegComment } from 'react-icons/fa';
import { ErrorMessage } from '../ErrorMessage';
import { hasErrorField } from '../../utils/hasErrorField';

type CardProps = {
	id?: string,
	authorId: string,
	commentId?: string,
	name: string,
	content: string,
	avatarUrl: string,
	likesCount?: number,
	commentsCount?: number,
	createdAt?: Date,
	likedByUser?: boolean,
	cardFor: 'comment' | 'post' | 'current-post',
};

export const Card = (props: CardProps) => {
	const {
		id = '',
		authorId = '',
		commentId = '',
		name = '',
		content = '',
		avatarUrl = '',
		likesCount = 0,
		commentsCount = 0,
		createdAt,
		likedByUser = false,
		cardFor = 'post',
	} = props;

	console.log('useLazyGetAllPostsQuery()', useLazyGetAllPostsQuery());

	const [likePost] = useLikePostMutation();
	const [unlikePost] = useUnlikePostMutation();
	const [triggerGetAllPost] = useLazyGetAllPostsQuery();
	const [triggerGetPostById] = useLazyGetPostByIdQuery();
	const [deletePost, deletePostStatus] = useDeletePostMutation();
	const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const currentUser = useAppSelector(selectCurrent);

	const refetchPosts = async () => {
		switch (cardFor) {
			case 'post':
				await triggerGetAllPost().unwrap();
				break;

			case 'current-post':
				await triggerGetAllPost().unwrap();
				break;

			case 'comment':
				await triggerGetPostById(id).unwrap();
				break;

			default:
				throw new Error('Неверный аргумент cardFor');

		}
	};

	const handleDelete = async () => {
		try {
			switch (cardFor) {
				case "post":
					await deletePost(id).unwrap();
					await refetchPosts();
					break;

				case "current-post":
					await deletePost(id).unwrap();
					navigate('/');
					break;

				case "comment":
					await deleteComment(commentId).unwrap();
					await refetchPosts();
					break;

				default:
					throw new Error('Неверный аргумент cardFor');
			}
		} catch (error) {
			if (hasErrorField(error)) {
				setError(error.data.error);
			} else {
				setError(error as string);
			}
		}
	};

	const handleClick = async () => {
		try {
			likedByUser
				? await unlikePost(id).unwrap()
				: await likePost({ postId: id }).unwrap();
			
			if(cardFor === 'current-post') {
				await triggerGetPostById(id).unwrap();
			}
			if(cardFor === 'post') {
				await triggerGetAllPost().unwrap();
			}
		} catch (error) {
			if (hasErrorField(error)) {
				setError(error.data.error);
			} else {
				setError(error as string);
			}
		}
	};

	return (
		<NextUICard className='mb-5'>
			<CardHeader className='justify-between items-center bg-transparent'>
				<Link to={`/users/${authorId}`}>
					<User
						className='text-small font-semibold leading-non text-default-600'
						name={name}
						avatarUrl={avatarUrl}
						description={createdAt && formatToClientDate(createdAt)}
					/>
				</Link>
				{authorId === currentUser?.id && (
					<div className='cursor-pointer' onClick={handleDelete}>
						{(deletePostStatus.isLoading || deleteCommentStatus.isLoading)
							? <Spinner />
							: <RiDeleteBinLine />
						}
					</div>
				)}
			</CardHeader>

			<CardBody className='px-3 py-2 mb-5'>
				<Typography>
					{content}
				</Typography>
			</CardBody>

			{cardFor !== 'comment' && (
				<CardFooter className='gap-3'>
					<div className="flex gap-5 items-center">
						<div onClick={handleClick}>
							<MetaInfo
								count={likesCount}
								Icon={likedByUser
									? FcDislike
									: MdOutlineFavoriteBorder
								}
							/>
						</div>
						<Link to={`/posts/${id}`}>
							<MetaInfo
								count={commentsCount}
								Icon={FaRegComment}
							/>
						</Link>
					</div>
					<ErrorMessage error={error} />
				</CardFooter>
			)}
		</NextUICard>
	);
};
