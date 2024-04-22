import { useCurrentQuery } from '../../app/services/userApi';
import { Spinner } from '@nextui-org/react';

type AuthGuardProps = {
	children: JSX.Element,
}

export const AuthGuard = (props: AuthGuardProps) => {
	const {
		children,
	} = props;

	const { isLoading } = useCurrentQuery();

	if (isLoading) {
		return <Spinner />
	}

	return children;
};
