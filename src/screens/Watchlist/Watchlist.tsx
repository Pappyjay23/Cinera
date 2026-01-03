import MovieCard from "@/components/shared/MovieCard";
import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";
import { useEffect, useState } from "react";
import { IoBookmark } from "react-icons/io5";
import { Link } from "react-router-dom";

const bookmarks = [
	{
		id: 1,
		title: "The Spongebob Movie: Sponge on the Run",
		year: "2025",
		genre: "Fantasy",
		image:
			"https://image.tmdb.org/t/p/original//pDWYW9v8fmJdA7N0I1MOdQA3ETq.jpg",
		hoverImage:
			"https://image.tmdb.org/t/p/original//kVSUUWiXoNwq2wVCZ4Mcqkniqvr.jpg",
	},
	{
		id: 2,
		title: "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
		year: "2025",
		genre: "Fantasy",
		image:
			"https://image.tmdb.org/t/p/original//fWVSwgjpT2D78VUh6X8UBd2rorW.jpg",
		hoverImage:
			"https://image.tmdb.org/t/p/original//1RgPyOhN4DRs225BGTlHJqCudII.jpg",
	},
	{
		id: 3,
		title: "Now You See Me: Now You Don't",
		year: "2025",
		genre: "Magic",
		image:
			"https://image.tmdb.org/t/p/original//oD3Eey4e4Z259XLm3eD3WGcoJAh.jpg",
		hoverImage:
			"https://image.tmdb.org/t/p/original//dHSz0tSFuO2CsXJ1CApSauP9Ncl.jpg",
	},
	{
		id: 4,
		title: "Avatar: The Last Airbender",
		year: "2005",
		genre: "Action",
		image:
			"https://image.tmdb.org/t/p/original//9RQhVb3r3mCMqYVhLoCu4EvuipP.jpg",
		hoverImage:
			"https://image.tmdb.org/t/p/original//kU98MbVVgi72wzceyrEbClZmMFe.jpg",
	},
	{
		id: 1,
		title: "The Spongebob Movie: Sponge on the Run",
		year: "2025",
		genre: "Fantasy",
		image:
			"https://image.tmdb.org/t/p/original//pDWYW9v8fmJdA7N0I1MOdQA3ETq.jpg",
		hoverImage:
			"https://image.tmdb.org/t/p/original//kVSUUWiXoNwq2wVCZ4Mcqkniqvr.jpg",
	},
	{
		id: 2,
		title: "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
		year: "2025",
		genre: "Fantasy",
		image:
			"https://image.tmdb.org/t/p/original//fWVSwgjpT2D78VUh6X8UBd2rorW.jpg",
		hoverImage:
			"https://image.tmdb.org/t/p/original//1RgPyOhN4DRs225BGTlHJqCudII.jpg",
	},
	{
		id: 3,
		title: "Now You See Me: Now You Don't",
		year: "2025",
		genre: "Magic",
		image:
			"https://image.tmdb.org/t/p/original//oD3Eey4e4Z259XLm3eD3WGcoJAh.jpg",
		hoverImage:
			"https://image.tmdb.org/t/p/original//dHSz0tSFuO2CsXJ1CApSauP9Ncl.jpg",
	},
	{
		id: 4,
		title: "Avatar: The Last Airbender",
		year: "2005",
		genre: "Action",
		image:
			"https://image.tmdb.org/t/p/original//9RQhVb3r3mCMqYVhLoCu4EvuipP.jpg",
		hoverImage:
			"https://image.tmdb.org/t/p/original//kU98MbVVgi72wzceyrEbClZmMFe.jpg",
	},
];

const WatchlistScreen = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<"all" | "movie" | "tv">("all");

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='flex-1 overflow-hidden pt-20 pb-12 px-4 md:px-6 bg-black/40 backdrop-blur-xs w-full'>
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
							onClick={() => setActiveTab(tab as any)}
							className={`px-6 py-2 rounded-full threed-effect cursor-pointer text-xs font-medium active:scale-95 transition-all duration-500 ease-in-out capitalize ${
								activeTab === tab
									? "bg-teal-700 text-white shadow-lg shadow-teal-500/20 border border-transparent"
									: "text-white/50 hover:text-white border border-white/10"
							}`}>
							{tab === "tv" ? "TV Shows" : tab}
						</button>
					))}
				</div>
			</div>

			<div className='flex flex-wrap h-[55svh] md:h-[60svh] lg:h-[60svh] [@media(min-width:2000px)]:h-[35svh] pb-5 md:pb-20 overflow-y-auto'>
				{bookmarks.length > 0 ? (
					<div className="relative">
						<div className={`absolute flex flex-wrap justify-center gap-6 ${isLoading ? "opacity-100": "opacity-0"} transition-all duration-1000 ease-in-out`}>
							{Array(8)
								.fill(0)
								.map((_, i) => (
									<MovieCardSkeleton size='lg' key={i} />
								))}
						</div>
						<div className={`flex flex-wrap justify-center gap-6 ${isLoading ? "opacity-0": "opacity-100"} transition-all duration-1000 ease-in-out`}>
							{bookmarks.map((movie) => (
								<Link to={`/movie/${movie.id}`}>
									<MovieCard
										size='lg'
										type='watchlist'
										key={movie.id}
										{...movie}
									/>
								</Link>
							))}
						</div>
					</div>
				) : (
					/* Premium Empty State */
					<div className='flex flex-col items-center justify-center text-center'>
						<div className='w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10'>
							<IoBookmark className='text-4xl text-white' />
						</div>
						<h2 className='text-lg md:text-xl font-semibold text-white mb-2'>
							Your list is empty
						</h2>
						<p className='text-white/40 text-xs md:text-sm max-w-xs mb-8'>
							Content you bookmark will appear here so you can easily find it
							later.
						</p>
						<Link
							to='/movies'
							className='px-8 py-3 bg-white text-black rounded-full font-medium text-sm hover:bg-teal-500 hover:text-white active:scale-95 transition-all duration-500 ease-in-out cursor-pointer'>
							Explore Content
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default WatchlistScreen;
