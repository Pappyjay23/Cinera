import EmptyResult from "@/components/Search/EmptyResult";
import MovieCard from "@/components/shared/MovieCard";
import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";
import { UseAppContext } from "@/context/AppCinemaContext";
import { useSearch } from "@/hooks/useSearch";
import { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const SearchScreen = () => {
	const { searchQuery, setSearchQuery } = UseAppContext();
	const { ref, inView } = useInView();
	const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useSearch(searchQuery);

	const movies = data?.pages.flatMap((page) => page.results) || [];

	const lastPage = data?.pages[data.pages.length - 1];
	const hasMoviesOnLastPage = lastPage ? lastPage.pageItemsCount > 0 : false;

	useEffect(() => {
		// Only fetch if:
		// 1. Element is in view
		// 2. There is a next page
		// 3. We aren't already loading
		// 4. THE LAST PAGE ACTUALLY HAD CONTENT (Prevents the "Ghost Page" loop)
		if (inView && hasNextPage && !isFetchingNextPage && hasMoviesOnLastPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, hasMoviesOnLastPage]);

	return (
		<div className='overflow-hidden w-full pt-15 md:pt-20 pb-8 bg-black/40 backdrop-blur-xs px-4 md:px-6'>
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

			{movies.length > 0 ? (
				<div className='relative flex mt-4'>
					<div
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
								/>
							</Link>
						))}
						{hasNextPage && hasMoviesOnLastPage && (
							<div
								ref={ref}
								className='w-full h-px flex justify-center items-center'>
								{isFetchingNextPage && <></>}
							</div>
						)}
						{/* Infinite Scroll Trigger */}
						{hasNextPage && hasMoviesOnLastPage && (
							<div className='w-full flex justify-center py-10'>
								<button
									onClick={() => fetchNextPage()}
									disabled={isFetchingNextPage}
									className='text-xs cursor-pointer px-8 py-3 rounded-full bg-teal-600 text-white font-medium hover:bg-teal-500 transition-all duration-700 ease-in-out active:scale-95 disabled:opacity-50'>
									{isFetchingNextPage ? "Loading more..." : "Load More Results"}
								</button>
							</div>
						)}
					</div>

					<div
						className={`absolute py-4 flex flex-wrap justify-center gap-3 items-center no-scrollbar h-[70svh] md:h-[60svh] [@media(min-width:2000px)]:h-[35svh] overflow-y-auto  ${
							isLoading ? "opacity-100 z-2" : "opacity-0 z-1"
						} transition-all duration-700 ease-in-out`}>
						{Array(12)
							.fill(null)
							.map((_, index) => (
								<MovieCardSkeleton key={index} size='lg' />
							))}
					</div>
				</div>
			) : (
				!isLoading && !movies.length && <EmptyResult />
			)}
		</div>
	);
};

export default SearchScreen;
