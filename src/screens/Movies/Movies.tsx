import MovieCarousel from "@/components/Home/MovieCarousel";
import GenreFilter from "@/components/Movies/GenreFilter";
import EmptyResult from "@/components/Search/EmptyResult";
import MovieCard from "@/components/shared/MovieCard";
import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";
import { useEffect, useState } from "react";
import { IoSparklesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const MoviesScreen = () => {
	const [activeTab, setActiveTab] = useState<"all" | "movie" | "tv">("all");
	const [isLoading, setIsLoading] = useState(true);
	const movies = [
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
			id: 5,
			title: "The Spongebob Movie: Sponge on the Run",
			year: "2025",
			genre: "Fantasy",
			image:
				"https://image.tmdb.org/t/p/original//pDWYW9v8fmJdA7N0I1MOdQA3ETq.jpg",
			hoverImage:
				"https://image.tmdb.org/t/p/original//kVSUUWiXoNwq2wVCZ4Mcqkniqvr.jpg",
		},
		{
			id: 6,
			title: "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
			year: "2025",
			genre: "Fantasy",
			image:
				"https://image.tmdb.org/t/p/original//fWVSwgjpT2D78VUh6X8UBd2rorW.jpg",
			hoverImage:
				"https://image.tmdb.org/t/p/original//1RgPyOhN4DRs225BGTlHJqCudII.jpg",
		},
		{
			id: 7,
			title: "Now You See Me: Now You Don't",
			year: "2025",
			genre: "Magic",
			image:
				"https://image.tmdb.org/t/p/original//oD3Eey4e4Z259XLm3eD3WGcoJAh.jpg",
			hoverImage:
				"https://image.tmdb.org/t/p/original//dHSz0tSFuO2CsXJ1CApSauP9Ncl.jpg",
		},
		{
			id: 8,
			title: "Avatar: The Last Airbender",
			year: "2005",
			genre: "Action",
			image:
				"https://image.tmdb.org/t/p/original//9RQhVb3r3mCMqYVhLoCu4EvuipP.jpg",
			hoverImage:
				"https://image.tmdb.org/t/p/original//kU98MbVVgi72wzceyrEbClZmMFe.jpg",
		},
		{
			id: 9,
			title: "The Spongebob Movie: Sponge on the Run",
			year: "2025",
			genre: "Fantasy",
			image:
				"https://image.tmdb.org/t/p/original//pDWYW9v8fmJdA7N0I1MOdQA3ETq.jpg",
			hoverImage:
				"https://image.tmdb.org/t/p/original//kVSUUWiXoNwq2wVCZ4Mcqkniqvr.jpg",
		},
		{
			id: 10,
			title: "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
			year: "2025",
			genre: "Fantasy",
			image:
				"https://image.tmdb.org/t/p/original//fWVSwgjpT2D78VUh6X8UBd2rorW.jpg",
			hoverImage:
				"https://image.tmdb.org/t/p/original//1RgPyOhN4DRs225BGTlHJqCudII.jpg",
		},
		{
			id: 11,
			title: "Now You See Me: Now You Don't",
			year: "2025",
			genre: "Magic",
			image:
				"https://image.tmdb.org/t/p/original//oD3Eey4e4Z259XLm3eD3WGcoJAh.jpg",
			hoverImage:
				"https://image.tmdb.org/t/p/original//dHSz0tSFuO2CsXJ1CApSauP9Ncl.jpg",
		},
		{
			id: 12,
			title: "Avatar: The Last Airbender",
			year: "2005",
			genre: "Action",
			image:
				"https://image.tmdb.org/t/p/original//9RQhVb3r3mCMqYVhLoCu4EvuipP.jpg",
			hoverImage:
				"https://image.tmdb.org/t/p/original//kU98MbVVgi72wzceyrEbClZmMFe.jpg",
		},
	];
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

	useEffect(() => {
		const fetchData = () => {
			setIsLoading(true);
			// In a real app, you would change your API endpoint based on activeTab
			// const endpoint = activeTab === 'all' ? '/trending/all/day' : `/discover/${activeTab}`;
		};

		const timer = setTimeout(() => {
			fetchData();
			setIsLoading(false);
		}, 1200);
		return () => clearTimeout(timer);
	}, [activeTab]);

	return (
		<div className='flex-1 py-20 overflow-y-auto no-scrollbar bg-black/40 backdrop-blur-xs px-4 md:px-6'>
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

			{/* Trending Highlight */}
			<section className='mb-12'>
				{movies.length > 0 ? (
					<MovieCarousel
						isLoading={isLoading}
						movies={movies.slice(0, 8)}
						title={`Trending ${
							activeTab === "all"
								? "Content"
								: activeTab === "movie"
								? "Movies"
								: "Series"
						}`}
					/>
				) : (
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
							description={`We couldn't find any movies or TV series matching your search. Try different keywords or browse our trending titles.`}
						/>
					</div>
				)}
			</section>

			{/* Filters */}
			<GenreFilter
				selectedGenres={selectedGenres}
				onUpdateGenres={(genres: string[]) => setSelectedGenres(genres)}
			/>

			<div className='relative min-h-100'>
				{isLoading ? (
					<div className='flex flex-wrap justify-center gap-6'>
						{Array(12)
							.fill(0)
							.map((_, i) => (
								<MovieCardSkeleton key={i} />
							))}
					</div>
				) : !isLoading && movies.length > 0 ? (
					<div className='flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out'>
						{movies.map((movie) => (
							<Link to={`/movie/${movie.id}`}>
								<MovieCard key={movie.id} {...movie} />
							</Link>
						))}
					</div>
				) : (
					<EmptyResult
						description={`We couldn't find any ${
							activeTab === "all"
								? "movies or TV series"
								: activeTab === "movie"
								? "movies"
								: "TV series"
						} matching your search. Try different keywords or browse our trending titles.`}
					/>
				)}
			</div>
		</div>
	);
};

export default MoviesScreen;
