const HeroSkeleton = () => {
	return (
		<div className='flex items-center relative h-full w-full px-4 md:px-6 animate-pulse'>
			<div className='w-full flex flex-col gap-3'>
				{/* Logo Skeleton */}
				<div className='w-8 h-8 rounded-full bg-white/5 border border-white/10' />

				{/* Genres Skeleton */}
				<div className='flex gap-2 mb-2'>
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className='w-16 h-6 rounded-full bg-white/5 border border-white/10'
						/>
					))}
				</div>

				{/* Title Skeleton */}
				<div className='w-3/4 md:w-1/2 h-10 md:h-14 bg-white/10 rounded-lg mb-4' />

				{/* Buttons Skeleton */}
				<div className='flex gap-4 mb-6'>
					<div className='w-32 h-10 bg-white/5 rounded border border-white/10' />
					<div className='w-32 h-10 bg-white/5 rounded border border-white/10' />
				</div>

				{/* Release Date Skeleton */}
				<div className='w-40 h-4 bg-white/5 rounded' />

				{/* Description Skeleton */}
				<div className='flex flex-col gap-2 w-full md:w-[60%] mt-2'>
					<div className='w-full h-3 bg-white/5 rounded' />
					<div className='w-full h-3 bg-white/5 rounded' />
					<div className='w-5/6 h-3 bg-white/5 rounded' />
				</div>
			</div>

			{/* Next Movie Preview Skeleton (Right Side) */}
			<div className='absolute bottom-10 right-5 hidden md:block'>
				<div className='h-25 w-40 bg-white/5 border border-white/10 rounded-2xl' />
			</div>
		</div>
	);
};

export default HeroSkeleton;
