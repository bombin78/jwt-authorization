import {
	useState,
	useContext,
	type ChangeEvent,
} from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea,
} from "@nextui-org/react";
import { ThemeContext } from "../ThemeProvider";
import type { User } from "../../app/types";
import { useUpdateUserMutation } from "../../app/services/userApi";
import { MdOutlineEmail } from "react-icons/md";
import { Input } from "../Input";
import { ErrorMessage } from "../ErrorMessage";
import { hasErrorField } from "../../utils/hasErrorField";

type EditProfileProps = {
	isOpen: boolean,
	onClose: () => void,
	user?: User,
}

export const EditProfile = (props: EditProfileProps) => {
	const {
		isOpen,
		onClose,
		user,
	} = props;

	const { theme } = useContext(ThemeContext);
	const [updateUser, { isLoading }] = useUpdateUserMutation();
	const [error, setError] = useState('');
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const { id } = useParams<{ id: string }>();

	const { handleSubmit, control } = useForm<User>({
		mode: 'onChange',
		reValidateMode: 'onBlur',
		defaultValues: {
			email: user?.email,
			name: user?.name,
			dateOfBirth: user?.dateOfBirth,
			bio: user?.bio,
			location: user?.location,
		}
	});

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files !== null) {
			setSelectedFile(e.target.files[0]);
		}
	};

	const onSubmit = async (data: User) => {
		if (id) {
			try {
				const formData = new FormData();
				data.name && formData.append('name', data.name);
				data.email && data.email !== user?.email && formData.append(
					'email', data.email
				);
				data.dateOfBirth && formData.append(
					'dateOfBirth', new Date(data.dateOfBirth).toISOString()
				);
				data.bio && formData.append('bio', data.bio);
				data.location && formData.append('location', data.location);
				selectedFile && formData.append('avatar', selectedFile);

				await updateUser({userData: formData, id }).unwrap();
				
				onClose();
			} catch (error) {
				if (hasErrorField(error)) {
					setError(error.data.error)
				}
			}
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className={`${theme} text-foreground`}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Изменения профиля
						</ModalHeader>
						<ModalBody>
							<form
								className="flex flex-col gap-4"
								onSubmit={handleSubmit(onSubmit)}
							>
								<Input
									type='email'
									name='email'
									label='Email'
									control={control}
									endContent={<MdOutlineEmail />}
								/>

								<Input
									type='text'
									name='name'
									label='Имя'
									control={control}
								/>

								<input
									type="file"
									name="avatarUrl"
									placeholder="Выберите файл"
									onChange={handleFileChange}
								/>

								<Input
									type='date'
									name='dateOfBirth'
									label='Дата рождения'
									control={control}
								/>

								<Controller
									name='bio'
									control={control}
									render={({ field }) => (
										<Textarea
											{...field}
											rows={4}
											placeholder="Ваша биография"
										/>
									)}
								/>

								<Input
									type='text'
									name='location'
									label='Местоположение'
									control={control}
								/>

								<ErrorMessage error={error} />

								<div className="flex gap-2 justify-end">
									<Button
										fullWidth
										type="submit"
										color="primary"
										isLoading={isLoading}
									>
										Обновите профиль
									</Button>
								</div>
							</form>
						</ModalBody>

						<ModalFooter>
							<Button
								color="danger"
								variant="light"
								onPress={onClose}
							>
								Закрыть
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
