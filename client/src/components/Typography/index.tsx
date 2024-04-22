type TypographyProps = {
	children: string;
	size?: string;
}

export const Typography = (props: TypographyProps) => {
	const {
		children,
		size = 'text-xl',
	} = props;

	return (
		<p className={`${size}`}>
			{children}
		</p>
	);
};
