import { User as NextUIUser } from '@nextui-org/react';
import { BASE_URL } from '../../constants';

type UserProps = {
	name: string;
	avatarUrl: string;
	description?: string;
	className?: string;
}

export const User = (props: UserProps) => {
	const {
		name = '',
		avatarUrl = '',
		description = '',
		className = '',
	} = props;

	return (
		<NextUIUser
			name={name}
			className={className}
			description={description}
			avatarProps={{
				src: `${BASE_URL}${avatarUrl}`
			}}
		/>
	);
};
