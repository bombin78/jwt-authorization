import React, {
	type ReactNode,
} from 'react';
import { Button as NextUiButton } from '@nextui-org/react';

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
		<NextUiButton
			className={className}
			type={type}
			color={color}
			startContent={icon}
			fullWidth={fullWidth}
			size='lg'
			variant='light'
		>
			{children}
		</NextUiButton>
	);
};
