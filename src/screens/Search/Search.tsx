import EmptyResult from "@/components/Search/EmptyResult";
import MovieCard from "@/components/shared/MovieCard";
import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const SearchScreen = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

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
	];

	return (
		<div className='overflow-hidden w-full pt-15 md:pt-20 pb-8 bg-black/40 backdrop-blur-xs px-4 md:px-6'>
			<div className='flex justify-center mt-5'>
				<div className=' threed-effect text-xs flex items-center gap-2 px-4 py-3 rounded-full bg-white/10 backdrop-blur-md font-extralight w-[90%] md:w-[40%] lg:w-[30%]'>
					<IoSearch className='text-xl' />
					<div className='h-5 w-px bg-white/20 rounded-full'></div>
					<input
						type='text'
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
							<Link to={`/movie/${movie.id}`} key={movie.id}>
								<MovieCard
									id={movie.id}
									size='lg'
									genre={movie.genre}
									image={movie.image}
									hoverImage={movie.hoverImage}
									title={movie.title}
									year={movie.year}
								/>
							</Link>
						))}
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
				<EmptyResult />
			)}
		</div>
	);
};

export default SearchScreen;
