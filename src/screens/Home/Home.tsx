import Hero from "@/components/Home/Hero";

const HomeScreen = () => {
	return (
		<div className='flex-1'>
			<Hero />
			<div className='h-svh p-4 relative'>
				<div className='absolute inset-0 z-20 bg-linear-to-b from-black/40 via-black/80 to-black blur-lg' />
				<p className='uppercase tracking-wider font-raleway font-medium'>
					Trending:
				</p>
			</div>
		</div>
	);
};

export default HomeScreen;
