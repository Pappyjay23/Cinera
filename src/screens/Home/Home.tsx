import Hero from "@/components/Home/Hero";
import MovieCarousel from "@/components/Home/MovieCarousel";
import { useHomeMovies } from "@/hooks/useMovies";

const HomeScreen = () => {
	const { data, isLoading } = useHomeMovies();

	return (
		<div className='flex-1 overflow-x-hidden'>
			<Hero />
			<div className='p-4 relative w-full'>
				<div className='absolute inset-0 z-20 bg-linear-to-b from-black/40 via-black/80 to-black blur-lg' />
				<div className='relative flex flex-col gap-2 z-30 pb-10'>
					<MovieCarousel
						title='Trending Now'
						movies={data.trending}
						isLoading={isLoading}
					/>

					<MovieCarousel
						title='New Releases'
						movies={data.upcoming}
						isLoading={isLoading}
					/>

					<MovieCarousel
						title='Modern Classics'
						movies={data.topRated}
						isLoading={isLoading}
						size='lg'
					/>

					<MovieCarousel
						title='Adrenaline Rush'
						movies={data.action}
						isLoading={isLoading}
					/>
					
					<MovieCarousel
						title='Scifi TV'
						movies={data.sciFi}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
