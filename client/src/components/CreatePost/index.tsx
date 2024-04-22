import { Controller, useForm } from 'react-hook-form';
import { Textarea, Button } from '@nextui-org/react';
import { IoMdCreate } from 'react-icons/io';
import { ErrorMessage } from '../ErrorMessage';
import {
	useCreatePostMutation,
	useLazyGetAllPostsQuery,
} from '../../app/services/postsApi';

export const CreatePost = () => {
	const [createPost] = useCreatePostMutation();
	const [triggerAllPosts] = useLazyGetAllPostsQuery();

	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue
	} = useForm();

	const error = errors?.post?.message as string;

	const onSubmit = handleSubmit(async (data) => {
		try {
			await createPost({ content: data.post }).unwrap();
			setValue('post', '');
			await triggerAllPosts().unwrap();
		} catch (error) {
			console.log(error);
		}
	});

	return (
		<form
			className='flex-grow'
			onSubmit={onSubmit}
		>
			<Controller
				name='post'
				control={control}
				defaultValue=''
				rules={{
					required: 'Обязательное поле'
				}}
				render={({ field }) => (
					<Textarea
						{...field}
						labelPlacement='outside'
						placeholder='Добавьте текст'
						className='mb-5'
					/>
				)}
			/>

			{errors && <ErrorMessage error={error} />}

			<Button
				color='success'
				className='flex-end'
				endContent={<IoMdCreate />}
				type='submit'
			>
				Добавить пост
			</Button>
		</form>
	);
};
