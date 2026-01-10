import { getTmdbImage } from "@/utils/tmdb";
import { useState } from "react";
import { LuUser } from "react-icons/lu";

const CastImage = ({ path, name }: { path: string | null; name: string }) => {
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	if (!path || isError) {
		return (
			<div className='w-25 h-30 flex flex-col items-center justify-center bg-slate-950 rounded-xl border border-white/10 relative overflow-hidden shrink-0'>
				<div className='absolute w-12 h-12 bg-teal-500/10 blur-xl rounded-full' />
				<div className='relative z-10 flex flex-col items-center'>
					<LuUser className='text-teal-500/30 mb-1' size={32} />
					<span className='text-[7px] uppercase tracking-tighter text-white/40 font-bold'>
						No Photo
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className='relative w-25 h-30 shrink-0'>
			{isLoading && (
				<div className='absolute inset-0 bg-white/5 animate-pulse rounded-xl border border-white/5 flex items-center justify-center'>
					<div className='w-8 h-8 bg-teal-500/5 rounded-full blur-md' />
				</div>
			)}

			<img
				src={getTmdbImage(path, "small")}
				alt={name}
				onLoad={() => setIsLoading(false)}
				onError={() => {
					setIsError(true);
					setIsLoading(false);
				}}
				className={`w-full h-full object-cover rounded-xl border border-white/10 transition-opacity duration-500 ${
					isLoading ? "opacity-0" : "opacity-100"
				}`}
			/>
		</div>
	);
};

export default CastImage;
