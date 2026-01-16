import MovieCarousel from "@/components/Home/MovieCarousel";
import GenreFilter from "@/components/Movies/GenreFilter";
import EmptyResult from "@/components/Search/EmptyResult";
import MovieCard from "@/components/shared/MovieCard";
import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";
import { UseAppContext } from "@/context/AppCinemaContext";
import { useDiscoverMovies, useTrendingMovieAndShow } from "@/hooks/useMovies";
import { useEffect, useRef, useState } from "react";
import { IoArrowUp, IoSparklesOutline } from "react-icons/io5";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const MoviesScreen = () => {
	const [activeTab, setActiveTab] = useState<"all" | "movie" | "tv">("all");
	const { selectedGenres, setSelectedGenres } = UseAppContext();
	const { ref, inView } = useInView();

	const containerRef = useRef<HTMLDivElement | null>(null);
	const [showScrollTop, setShowScrollTop] = useState(false);

	const handleScroll = () => {
		const el = containerRef.current;
		if (!el) return;

		window.requestAnimationFrame(() => {
			setShowScrollTop(el.scrollTop > 500);
		});
	};

	const scrollToTop = () => {
		containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
	};

	const { data: trendingData, isLoading: isTrendingLoading } =
		useTrendingMovieAndShow(activeTab);

	const trendingMovies = trendingData || [];

	const {
		data: discoverData,
		isLoading: isDiscoverLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useDiscoverMovies(activeTab, selectedGenres);

	const discoverMovies =
		discoverData?.pages.flatMap((page) => page.results) || [];

	const lastPage = discoverData?.pages[discoverData.pages.length - 1];
	const hasMoviesOnLastPage = lastPage ? lastPage.pageItemsCount > 0 : false;

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage && hasMoviesOnLastPage) {
			fetchNextPage();
		}
	}, [
		inView,
		hasNextPage,
		isFetchingNextPage,
		hasMoviesOnLastPage,
		fetchNextPage,
	]);

	useEffect(() => {}, [activeTab, selectedGenres]);

	return (
		<div className='relative h-full w-full overflow-hidden flex flex-col'>
			<div
				ref={containerRef}
				onScroll={handleScroll}
				className='flex-1 py-20 overflow-y-auto no-scrollbar bg-black/40 backdrop-blur-xs px-4 md:px-6 relative'>
				<div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight text-white flex items-center gap-2'>
							Explore <IoSparklesOutline className='text-teal-400 text-2xl' />
						</h1>
						<p className='text-white/60 text-sm mt-1'>
							Discover your next favorite story
						</p>
					</div>

					{/* Premium Segmented Control */}
					<div className='flex gap-1 p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full w-fit cursor-pointer'>
						{["all", "movie", "tv"].map((tab) => (
							<button
								key={tab}
								onClick={() => {
									setActiveTab(tab as "all" | "movie" | "tv");
									setSelectedGenres([]);
								}}
								className={`px-6 py-2 rounded-full threed-effect cursor-pointer text-xs font-medium active:scale-95 transition-all duration-500 ease-in-out capitalize ${
									activeTab === tab
										? "bg-teal-700 text-white shadow-lg shadow-teal-500/20 border border-transparent"
										: "text-white/50 hover:text-white border border-white/10"
								}`}>
								{tab === "tv" ? "TV Series" : tab}
							</button>
						))}
					</div>
				</div>

				{/* Trending Highlight */}
				<section className='mb-12'>
					{trendingMovies.length === 0 && !isTrendingLoading ? (
						<div>
							<p className='text-base font-medium text-white/90'>
								{`Trending ${
									activeTab === "all"
										? "Content"
										: activeTab === "movie"
										? "Movies"
										: "Series"
								}`}
							</p>
							<EmptyResult
								description={`We couldn't find any movies or TV series matching your filter. Try different keywords or browse our trending titles.`}
							/>
						</div>
					) : (
						<MovieCarousel
							isLoading={isTrendingLoading}
							movies={trendingMovies}
							title={`Trending ${
								activeTab === "all"
									? "Content"
									: activeTab === "movie"
									? "Movies"
									: "Series"
							}`}
							activeTab={activeTab}
						/>
					)}
				</section>

				{/* Filters */}
				<GenreFilter
					mediaType={activeTab}
					selectedGenres={selectedGenres}
					onUpdateGenres={(genres: string[]) => setSelectedGenres(genres)}
				/>

				<div className='relative min-h-100'>
					{isDiscoverLoading ? (
						<div className='flex flex-wrap justify-center gap-6'>
							{Array(12)
								.fill(0)
								.map((_, i) => (
									<MovieCardSkeleton key={i} />
								))}
						</div>
					) : !isDiscoverLoading && discoverMovies.length > 0 ? (
						<>
							<div className='flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out'>
								{discoverMovies.map((movie) => {
									const path = movie.media_type || activeTab;
									return (
										<Link
											to={`/${path}/${movie.id}`}
											key={`discover-${path}-${movie.id}`}>
											<MovieCard
												{...movie}
												mediaType={
													(movie.media_type as "movie" | "tv") ||
													(activeTab === "all" ? "movie" : activeTab)
												}
											/>
										</Link>
									);
								})}
								{/* Infinite scroll with subtle loader */}
								{hasNextPage && hasMoviesOnLastPage && (
									<div
										ref={ref}
										className='w-full h-5 flex justify-center items-center'>
										{isFetchingNextPage && (
											<div className='flex flex-col items-center gap-3'>
												<div className='w-4 h-4 border-2 border-teal-600/30 border-t-teal-500 rounded-full animate-spin' />
											</div>
										)}
									</div>
								)}
							</div>
						</>
					) : (
						<EmptyResult
							description={`We couldn't find any ${
								activeTab === "all"
									? "movies or TV series"
									: activeTab === "movie"
									? "movies"
									: "TV series"
							} matching your filter.`}
						/>
					)}
				</div>
			</div>
			{showScrollTop && (
				<button
					onClick={scrollToTop}
					aria-label='Scroll to top'
					className='absolute bottom-4 md:bottom-8 right-4 md:right-8 z-80 w-9 h-9 text-sm rounded-full bg-teal-600 text-white flex items-center justify-center shadow-2xl hover:bg-teal-500 active:scale-95 transition-all duration-500 ease-in-out cursor-pointer'>
					<IoArrowUp />
				</button>
			)}
		</div>
	);
};

export default MoviesScreen;
