import { UseAppContext } from "@/context/AppCinemaContext";
import { useTrendingMovies, type MovieData } from "@/hooks/useMovies";
import { formatReadableDate } from "@/utils";
import { getTmdbImage } from "@/utils/tmdb";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { GrCircleInformation } from "react-icons/gr";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import HeroSkeleton from "./HeroSkeleton";
import { movieService } from "@/api/movieService";
import { toast } from "sonner";

const Hero = () => {
	const {
		activeMovie,
		nextMovie,
		handleNext,
		heroMovies,
		setHeroMovies,
		isTransitioning,
		setShowTrailerModal,
		setTrailer,
	} = UseAppContext();

	const textContainerRef = useRef<HTMLDivElement>(null);

	const { data } = useTrendingMovies();

	const handlePlayTrailer = async (movieId: string) => {
		try {
			const trailer = await movieService.getTrailerById("movie", movieId);
			if (trailer?.key) {
				setTrailer({
					title: activeMovie?.title || trailer.name,
					url: `https://www.youtube.com/embed/${trailer.key}`,
				});
				setShowTrailerModal(true);
			} else {
				toast.error("Trailer not available");
			}
		} catch (error) {
			toast.error("Failed to load trailer");
			console.error("Failed to load trailer", error);
		}
	};

	useEffect(() => {
		if (data && heroMovies.length === 0) {
			setHeroMovies(
				data.map((movie: MovieData) => ({
					id: movie.id,
					// Fallback to name if title is missing, then to "Untitled"
					title: movie.title ?? movie.name ?? "Untitled",
					// Use fallback for strings to satisfy HeroMovie interface
					bg: getTmdbImage(movie.backdrop_path ?? "", "original"),
					description: movie.overview ?? "No description available.",
					releaseDate: movie.release_date ?? movie.first_air_date ?? "",
					genres: movie.genres ?? [],
				}))
			);
		}
	}, [data, setHeroMovies, heroMovies.length]);

	useGSAP(() => {
		if (!textContainerRef.current) return;

		const tl = gsap.timeline();

		tl.fromTo(
			textContainerRef.current.children,
			{
				opacity: 0,
				y: 20,
				filter: "blur(10px)",
			},
			{
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				duration: 0.8,
				stagger: 0.1,
				ease: "power3.out",
			}
		);
	}, [activeMovie?.id]);

	useGSAP(() => {
		if (!textContainerRef.current) return;

		if (isTransitioning) {
			// Fade OUT when the transition starts
			gsap.to(textContainerRef.current.children, {
				opacity: 0,
				y: -20,
				filter: "blur(10px)",
				duration: 0.3,
				ease: "power2.in",
			});
		}
	}, [isTransitioning]);

	if (!activeMovie) return <HeroSkeleton />;

	return (
		<div className='flex items-center relative h-full w-full px-4 md:px-6'>
			<div className='text-[9px] absolute bottom-10 left-5 text-white text-center'>
				<p className='flex items-center gap-1 font-normal animate-bounce'>
					Scroll down to explore <MdKeyboardDoubleArrowDown />
				</p>
			</div>

			<div className='absolute bottom-10 z-40 right-5' onClick={handleNext}>
				<div className='flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform duration-500 ease-in-out group'>
					<div className='h-20 md:h-25 w-30 md:w-40 border border-white/5 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden relative'>
						{heroMovies?.map((movie) => (
							<img
								key={movie.id}
								src={movie.bg}
								alt='Preview'
								className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110
                ${
									movie.id === nextMovie?.id
										? "opacity-100 scale-100"
										: "opacity-0 scale-110"
								}`}
							/>
						))}
						<div className='absolute inset-0 z-20 bg-black/40 group-hover:bg-transparent transition-all duration-300 ease-in-out' />
					</div>
					<span className='capitalize font-normal flex items-center gap-1 text-[9px] md:text-[10px] animate-pulse group-hover:animate-none'>
						up next <IoIosArrowRoundForward className='' />
					</span>
				</div>
			</div>

			<div ref={textContainerRef} className='w-full flex flex-col gap-1'>
				<div className='flex items-center gap-1.5'>
					<img
						src={"/logo.png"}
						alt='Logo'
						className='w-6 md:w-7 h-6 md:h-7 rounded-full border border-white/15 bg-black/5 p-0.45 threed-effect backdrop-blur-[1px]'
					/>
				</div>
				<div className='flex items-center gap-1 md:gap-1.5 font-normal text-[8px] md:text-[10px] mb-2'>
					{activeMovie.genres?.map((genre, index) => (
						<div
							key={index}
							className='px-2 py-1 bg-black/10 border border-white/20 rounded-full backdrop-blur-[1px]'>
							{genre}
						</div>
					))}
				</div>
				<h1 className='uppercase mb-2 text-2xl md:text-4xl font-light font-raleway tracking-normal drop-shadow-[0_2px_1px_rgba(0,0,0,0.8)] [text-shadow:0px_1px_0px_rgba(255,255,255,0.4)] transition-all'>
					{activeMovie.title}
				</h1>
				<div className='flex mb-4'>
					<button
						onClick={() => handlePlayTrailer(String(activeMovie.id))}
						className='text-[10px] md:text-xs mr-4 px-6 py-2 rounded bg-white/10 font-medium flex items-center backdrop-blur-[2px] cursor-pointer active:scale-95 transition-all duration-300 ease-in-out'>
						<span className='mr-1'>
							<BsFillPlayFill />
						</span>
						Play Trailer
					</button>
					<Link to={`/movie/${activeMovie.id}`}>
						<button className='text-[10px] md:text-xs mr-4 px-6 py-2 rounded bg-white/10 font-medium flex items-center backdrop-blur-[2px] cursor-pointer active:scale-95 transition-all duration-300 ease-in-out'>
							<span className='text-white mr-2'>
								<GrCircleInformation />
							</span>
							More info
						</button>
					</Link>
				</div>
				<p className='text-xs md:text-sm font-normal'>
					Released: {formatReadableDate(activeMovie.releaseDate || "")}
				</p>
				<p className='text-[10px] md:text-xs tracking-wide w-full md:w-[70%] lg:w-[50%] line-clamp-2'>
					{activeMovie.description}
				</p>
			</div>
		</div>
	);
};

export default Hero;
