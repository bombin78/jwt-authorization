import type { IconType } from "react-icons";

type MetaInfoProps = {
	count: number,
	Icon: IconType,
}

export const MetaInfo = (props: MetaInfoProps) => {
	const {
		count,
		Icon,
	} = props;

	return (
		<div className='flex items-center gap-2 cursor-pointer'>
			{count > 0 && (
				<p className="font-semibold text-default-400 text-l">
					{count}
				</p>
			)}
			<p className="text-default-400 text-xl hover:text-2xl ease-in">
				<Icon />
			</p>
		</div>
	);
};
