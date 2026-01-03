const MovieCardSkeleton = ({ size = "sm" }: { size?: "sm" | "lg" }) => {
	const containerClasses =
		size === "sm" ? "w-[140px] md:w-[180px]" : "w-[140px] md:w-[220px]";

	return (
		<div
			className={`relative ${containerClasses} aspect-2/3 shrink-0 rounded-2xl overflow-hidden bg-[#053330]/50 border border-white/10`}>
			{/* The Shimmer Effect */}
			<div className='absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent z-0' />

			<div className='absolute bottom-0 left-0 w-full p-5 z-10 animate-pulse'>
				{/* Genre Tag Skeleton */}
				<div
					className={`h-4 w-12 bg-white/10 rounded-full mb-3 ${
						size === "sm" ? "w-10" : "w-14"
					}`}
				/>

				{/* Title Skeleton */}
				<div
					className={`h-3 bg-white/10 rounded-sm mb-2 ${
						size === "sm" ? "w-24" : "w-24 md:w-32"
					}`}
				/>
				<div
					className={`h-3 bg-white/10 rounded-sm mb-3 ${
						size === "sm" ? "w-16" : "w-20"
					}`}
				/>

				{/* Meta Info Skeleton */}
				<div className='flex items-center gap-2 mt-1'>
					<div className='h-2 w-8 bg-white/10 rounded-sm' />
					<div className='w-1 h-1 bg-white/10 rounded-full' />
					<div className='h-2 w-12 bg-white/10 rounded-sm' />
				</div>
			</div>
		</div>
	);
};

export default MovieCardSkeleton;
