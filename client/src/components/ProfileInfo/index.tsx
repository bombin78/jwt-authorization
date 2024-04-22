type ProfileInfoProps = {
	title: string,
	info?: string,
};

export const ProfileInfo = (props: ProfileInfoProps) => {
	const {
		title,
		info,
	} = props;

	if (!info) {
		return null;
	}

	return (
		<p className='font-semibold'>
			<span className='text-grey-500 mr-2'>
				{title}
			</span>
			{info}
		</p>
	);
};
