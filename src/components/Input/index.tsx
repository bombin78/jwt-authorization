import { Input as NextUIInput } from '@nextui-org/react';
import {
	useController,
	type Control,
} from 'react-hook-form';

type InputProps = {
	name: string,
	label: string,
	placeholder?: string,
	type?: string,
	control: Control<any>,
	required?: string,
	endContent?: JSX.Element,
};

export const Input = (props: InputProps) => {
	const {
		name,
		label,
		placeholder,
		type,
		control,
		required = '',
		endContent,
	} = props;

	const {
		field,
		fieldState: { invalid },
		formState: { errors },
	} = useController({
		name,
		control,
		rules: {
			required
		}
	});

	return (
		<NextUIInput
			id={name}
			label={label}
			type={type}
			placeholder={placeholder}
			value={field.value}
			name={field.name}
			isInvalid={invalid}
			onChange={field.onChange}
			onBlur={field.onBlur}
			errorMessage={`${errors[name]?.message ?? ''}`}
		/>
	);
};
