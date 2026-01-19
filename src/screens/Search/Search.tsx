import EmptyResult from "@/components/Search/EmptyResult";
import MovieCard from "@/components/shared/MovieCard";
import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";
import { UseAppContext } from "@/context/AppCinemaContext";
import { useSearch } from "@/hooks/useSearch";
import { useEffect, useRef, useState } from "react";
import { IoArrowUp, IoSearch } from "react-icons/io5";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const SearchScreen = () => {
	const { searchQuery, setSearchQuery } = UseAppContext();
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

	const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useSearch(searchQuery);

	const movies = data?.pages.flatMap((page) => page.results) || [];

	const lastPage = data?.pages[data.pages.length - 1];
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

	return (
		<div className='overflow-hidden w-full pt-15 md:pt-20 pb-8 bg-black/40 backdrop-blur-xs px-4 md:px-6 relative'>
			<div className='flex justify-center mt-5'>
				<div className=' threed-effect text-xs flex items-center gap-2 px-4 py-3 rounded-full bg-white/10 backdrop-blur-md font-extralight w-[90%] md:w-[40%] lg:w-[30%]'>
					<IoSearch className='text-xl' />
					<div className='h-5 w-px bg-white/20 rounded-full'></div>
					<input
						type='text'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='outline-none border-0 w-full text-white placeholder:text-white'
						placeholder='Search for a Movie or TV Series'
						autoFocus
					/>
				</div>
			</div>

			{isLoading && movies.length === 0 && (
				<div className='relative py-4 flex flex-wrap justify-center gap-3 items-center h-[70svh] md:h-[60svh] overflow-y-auto px-2'>
					{Array(8)
						.fill(null)
						.map((_, index) => (
							<MovieCardSkeleton key={index} size='lg' />
						))}
				</div>
			)}

			{movies.length > 0 ? (
				<div className='relative flex mt-4'>
					<div
						ref={containerRef}
						onScroll={handleScroll}
						className={`relative flex justify-center gap-3 items-center pt-4 w-full h-[70svh] md:h-[60svh] [@media(min-width:2000px)]:h-[35svh] pb-10 lg:pb-20 overflow-y-auto flex-wrap ${
							isLoading ? "opacity-0 z-1" : "opacity-100 z-2"
						} transition-all duration-700 ease-in-out`}>
						{movies.map((movie) => (
							<Link to={`/${movie.mediaType}/${movie.id}`} key={movie.id}>
								<MovieCard
									id={movie.id}
									size='lg'
									genre={movie.genre}
									image={movie.image}
									hoverImage={movie.hoverImage}
									title={movie.title}
									year={movie.year}
									mediaType={movie.mediaType}
									rating={movie.rating}
								/>
							</Link>
						))}
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
				</div>
			) : (
				!isLoading && !movies.length && <EmptyResult />
			)}

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

export default SearchScreen;
