import { 
	type ReactElement,
} from 'react';

type ContainerProps = {
	children: ReactElement[] | ReactElement,
};

export const Container = (props: ContainerProps) => {
	const {
		children,
	} = props;

	return (
		<div className='flex max-w-screen-xl mx-auto mt-10'>
			{children}
		</div>
	);
};
