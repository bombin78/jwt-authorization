import {
	type ReactNode,
} from 'react';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

type NavButtonProps = {
	children: ReactNode,
	icon: JSX.Element,
	href: string,
};

export const NavButton = (props: NavButtonProps) => {
	const {
		children,
		icon,
		href,
	} = props;

	return (
		<Button
			className='flex justify-start text-xl'
			icon={icon}
		>
			<Link to={href}>
				{children}
			</Link>
		</Button>
	);
};
