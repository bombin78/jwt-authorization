import {
	type ReactNode,
} from 'react';
import { Button as NextUIButton } from '@nextui-org/react';

type ButtonProps = {
	children: ReactNode,
	icon?: JSX.Element,
	className?: string,
	type?: 'button' | 'submit' | 'reset',
	fullWidth?: boolean,
	color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger",
};

export const Button = (props: ButtonProps) => {
	const {
		children,
		icon,
		className,
		type,
		fullWidth,
		color,
	} = props;

	return (
		<NextUIButton
			className={className}
			type={type}
			color={color}
			startContent={icon}
			fullWidth={fullWidth}
			size='lg'
			variant='light'
		>
			{children}
		</NextUIButton>
	);
};
