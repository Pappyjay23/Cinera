import MovieCard from "@/components/shared/MovieCard";
import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";
import { UseAppContext } from "@/context/AppCinemaContext";
import { useEffect, useRef, useState } from "react";
import { IoArrowUp, IoBookmark } from "react-icons/io5";
import { Link } from "react-router-dom";

const WatchlistScreen = () => {
	const { bookmarks } = UseAppContext();

	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<"all" | "movie" | "tv">("all");

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

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	const filteredBookmarks = bookmarks.filter((movie) => {
		if (activeTab === "all") return true;
		return movie.mediaType === activeTab;
	});

	const hasItems = filteredBookmarks.length > 0;

	return (
		<div className='relative flex-1 overflow-hidden pt-20 pb-12 px-4 md:px-6 bg-black/40 backdrop-blur-xs w-full'>
			{/* Header Section */}
			<div className='flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3 border-b border-white/5 pb-4'>
				<div>
					<div className='flex items-center gap-2 text-teal-500 mb-2 text-[10px]'>
						<IoBookmark />
						<span className='uppercase tracking-[0.3em] font-bold'>
							Personal Collection
						</span>
					</div>
					<h1 className='text-2xl md:text-4xl font-bold tracking-tight text-white'>
						My Watchlist ({bookmarks.length})
					</h1>
				</div>

				{/* Premium Segmented Control */}
				<div className='flex gap-1 p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full w-fit cursor-pointer'>
					{["all", "movie", "tv"].map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab as "movie" | "tv" | "all")}
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

			<div className='relative flex-1 w-full'>
				{hasItems && (
					<div className='relative'>
						{/* Skeleton */}
						{isLoading && (
							<div className='absolute inset-0 flex flex-wrap justify-center gap-6 h-[70svh] md:h-[60svh] [@media(min-width:2000px)]:h-[35svh] pb-30 md:pb-20'>
								{Array(filteredBookmarks.length)
									.fill(0)
									.map((_, i) => (
										<MovieCardSkeleton size='lg' key={i} />
									))}
							</div>
						)}

						{/* Scroll container */}
						{!isLoading && (
							<div
								ref={containerRef}
								onScroll={handleScroll}
								className='flex flex-wrap justify-center gap-6 overflow-y-auto h-[70svh] md:h-[60svh] [@media(min-width:2000px)]:h-[35svh] pb-30 md:pb-20'>
								{filteredBookmarks.map((movie) => {
									const path = movie.mediaType || "movie";
									return (
										<Link key={movie.id} to={`/${path}/${movie.id}`}>
											<MovieCard size='lg' type='watchlist' {...movie} />
										</Link>
									);
								})}
							</div>
						)}
					</div>
				)}

				{!hasItems && (
					<div className='flex flex-col items-center justify-center text-center'>
						<div className='w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10'>
							<IoBookmark className='text-4xl text-white' />
						</div>
						<h2 className='text-lg md:text-xl font-semibold text-white mb-2'>
							Your list is empty
						</h2>
						<p className='text-white/40 text-xs md:text-sm max-w-xs mb-8'>
							Content you add to your watchlist will appear here so you can
							easily find it later.
						</p>
						<Link
							to='/movies'
							className='px-8 py-3 bg-white text-black rounded-full font-medium text-sm hover:bg-teal-500 hover:text-white active:scale-95 transition-all duration-500 ease-in-out'>
							Explore Content
						</Link>
					</div>
				)}
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

export default WatchlistScreen;
