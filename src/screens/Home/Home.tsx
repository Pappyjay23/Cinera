import Hero from "@/components/Home/Hero";
import MovieCarousel from "@/components/Home/MovieCarousel";
import { useEffect, useState } from "react";

const HomeScreen = () => {
	const trendingMovies = [
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

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='flex-1 overflow-x-hidden'>
			<Hero />
			<div className='p-4 relative w-full'>
				<div className='absolute inset-0 z-20 bg-linear-to-b from-black/40 via-black/80 to-black blur-lg' />
				<div className='relative flex flex-col gap-2 z-30 pb-10'>
					<MovieCarousel isLoading={isLoading} movies={trendingMovies} title="Trending:" />
					<MovieCarousel isLoading={isLoading} movies={trendingMovies} title="Upcoming Movies:" />
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
