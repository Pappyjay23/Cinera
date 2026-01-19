import CastImage from "@/components/Movies/CastImage";
import { UseAppContext, type MovieData } from "@/context/AppCinemaContext";
import { useMediaDetails } from "@/hooks/useMovies";
import { formatRuntime, getTrailer } from "@/utils";
import { getTmdbImage } from "@/utils/tmdb";
import { useState } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { HiChevronLeft } from "react-icons/hi";
import {
	IoCheckmarkDoneSharp,
	IoFilmOutline,
	IoTrashOutline,
} from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ErrorScreen from "../Error/Error";
import LoadingScreen from "../Loading/Loading";
import { UserAuth } from "@/context/AuthContext";

interface Provider {
	provider_id: number;
	display_priority: number;
	logo_path: string;
	provider_name: string;
}

const MovieDetailScreen = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const {
		setShowTrailerModal,
		setTrailer,
		handleAddToWatchlist,
		bookmarks,
		handleRemoveFromWatchlist,
	} = UseAppContext();
	const { session } = UserAuth();
	const isLoggedIn = !!session;

	const [imgError, setImgError] = useState(false);

	const location = useLocation();

	const handleBack = () => {
		if (location.key === "default") {
			navigate("/");
		} else {
			navigate(-1);
		}
	};

	const handleAdd = () => {
		if (isLoggedIn) {
			handleAddToWatchlist(watchlistDetails);

			toast.success("Added to Watchlist", {
				description: `${title} has been added to your library.`,
				action: {
					label: "View",
					onClick: () => navigate("/watchlist"),
				},
			});
		} else {
			sessionStorage.setItem("returnTo", location.pathname);

			toast.info("Please login to add to watchlist");
			setTimeout(() => navigate("/login"), 300);
		}
	};

	const handleRemove = () => {
		handleRemoveFromWatchlist(media.id!);

		toast.info("Removed from Watchlist", {
			description: `${title} has been removed from your library.`,
		});
	};

	const Placeholder = (
		<div className='absolute inset-0 flex flex-col items-center justify-center bg-slate-950'>
			<div className='absolute w-20 h-20 bg-teal-500/10 blur-2xl rounded-full' />

			<div className='relative z-10 flex flex-col items-center -mt-50 text-6xl'>
				<IoFilmOutline className='text-teal-500/30 mb-2 transform group-hover:scale-110 transition-transform duration-700' />
				<span className='text-[8px] uppercase tracking-widest text-white/50 font-bold'>
					No Preview
				</span>
			</div>
		</div>
	);

	const mediaType = window.location.pathname.split("/")[1];

	const { data: media, isLoading, error } = useMediaDetails(mediaType, id);

	if (isLoading) return <LoadingScreen />;

	if (error || !media) {
		return (
			<ErrorScreen
				message="The cinematic universe couldn't find this page."
				onBack={() => navigate("/")}
			/>
		);
	}

	const getUSProviders = () => {
		const usData = media["watch/providers"]?.results?.["US"];
		if (!usData) return [];

		// Combine Streaming (flatrate), Rent, and Buy
		const all = [
			...(usData.flatrate || []),
			...(usData.rent || []),
			...(usData.buy || []),
		];

		// Unique by provider_id and Sort by TMDB priority
		return Array.from(new Map(all.map((p) => [p.provider_id, p])).values())
			.sort(
				(a: Provider, b: Provider) => a.display_priority - b.display_priority,
			)
			.slice(0, 6); // Keep it clean, show top 6
	};

	const movieProviders = getUSProviders();
	const tmdbWatchLink = media["watch/providers"]?.results?.["US"]?.link;

	const releaseDate = media.release_date || media.first_air_date;
	const title = media.title || media.name;
	const runtime =
		mediaType === "movie" && media.runtime
			? formatRuntime(media.runtime)
			: mediaType === "tv" &&
				media.number_of_seasons &&
				`${media.number_of_seasons} ${
					media.number_of_seasons === 1 ? "Season" : "Seasons"
				}`;

	const casts = media.credits?.cast?.slice(0, 10) || [];
	const trailer = getTrailer(media.videos?.results);
	const isReleased = new Date(releaseDate) <= new Date();

	const watchlistDetails: MovieData = {
		title,
		year: releaseDate ? releaseDate.split("-")[0] : "",
		image: getTmdbImage(media.poster_path, "medium"),
		hoverImage: getTmdbImage(media.backdrop_path, "medium"),
		genre: media.genres?.[0]?.name || "",
		size: "lg",
		mediaType: mediaType as "movie" | "tv",
		type: "watchlist",
		id: media.id,
		rating: media.vote_average.toFixed(1),
	};

	const isBookmarked = bookmarks.some((movie) => movie.id === media.id);

	return (
		<div
			className='min-h-svh w-full relative'
			style={{
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${
					getTmdbImage(media.poster_path, "medium") || ""
				})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundAttachment: "fixed",
			}}>
			<div className='absolute inset-0 bg-black/60 z-5 backdrop-blur-sm'></div>

			<div className='px-4 md:px-6 z-10 relative h-svh overflow-y-auto pt-20 pb-35 md:pb-80 xl:pb-50 [@media(min-width:2000px)]:pb-180'>
				<div
					onClick={handleBack}
					className='flex gap-1 items-center text-sm md:text-base font-medium cursor-pointer mb-4'>
					<HiChevronLeft />
					<p>Go back</p>
				</div>

				<div className='md:w-[80%] mx-auto flex flex-col items-center lg:items-start lg:flex-row gap-5 lg:gap-10'>
					<div
						className={`relative w-60 md:w-75 aspect-2/3 shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-[#053330] shadow-xl group border border-white/30transition-all duration-700 ease-in-out transform-gpu flex items-center justify-center flex-1`}>
						{imgError ? (
							Placeholder
						) : (
							<>
								<img
									src={getTmdbImage(media.poster_path, "medium") || ""}
									alt={title}
									onError={() => setImgError(true)}
									className='absolute inset-0 w-full h-full object-cover will-change-transform opacity-100 group-hover:opacity-0 transition-all duration-700 ease-in-out group-hover:scale-110'
								/>
								<img
									src={getTmdbImage(media.backdrop_path, "original") || ""}
									alt={title}
									className='absolute inset-0 w-full h-full object-cover will-change-transform opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:scale-110'
								/>
							</>
						)}

						{/* Premium Scrim (Bottom Gradient) */}
						<div className='absolute inset-0 bg-linear-to-b from-transparent via-black/60 to-black z-10' />

						<div className='flex flex-col gap-3'>
							{isBookmarked ? (
								<button
									onClick={() => handleRemove()}
									className='relative z-20 flex items-center justify-center gap-2 px-4 py-3 min-w-40 md:min-w-50 rounded-full backdrop-blur-sm font-normal bg-teal-700 threed-effect transition-all duration-700 ease-in-out cursor-pointer active:scale-90 text-[10px] md:text-sm group'>
									<div className='flex items-center justify-center gap-2 transition-opacity duration-500 ease-in-out group-hover:opacity-0'>
										<IoCheckmarkDoneSharp />
										<span>Added to Watchlist</span>
									</div>

									<div className='absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 text-white/90'>
										<IoTrashOutline />
										<span>Remove from Watchlist</span>
									</div>
								</button>
							) : (
								<button
									onClick={() => handleAdd()}
									className='relative z-20 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white/10 backdrop-blur-sm font-normal hover:bg-teal-700 threed-effect transition-all duration-700 ease-in-out cursor-pointer active:scale-90 text-[10px] md:text-sm'>
									<FaPlus />
									<span>Add to Watchlist</span>
								</button>
							)}
							<button
								onClick={() => {
									setTrailer({
										title: title,
										url: `https://www.youtube.com/embed/${trailer?.key}`,
									});
									setShowTrailerModal(true);
								}}
								className='relative z-20 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white/10 backdrop-blur-sm font-normal hover:bg-teal-700 threed-effect transition-all duration-700 ease-in-out cursor-pointer active:scale-90 text-[10px] md:text-sm'>
								<FaPlay />
								<span>Watch Trailer</span>
							</button>
						</div>
					</div>
					<div className='flex flex-col gap-2 flex-1 w-[95%] lg:w-[50%]'>
						<h1 className='text-[1.7rem] leading-8 lg:text-[2.6rem] lg:leading-12 font-bold text-center lg:text-left drop-shadow-[0_2px_1px_rgba(0,0,0,0.8)] [text-shadow:0px_1px_0px_rgba(255,255,255,0.4)]'>
							{title}
						</h1>

						<div className='mt-3'>
							<p className='capitalize tracking-normal text-xs md:text-sm font-normal mb-1'>
								Overview
							</p>
							<p className='font-extralight tracking-wide text-[10px] md:text-xs font-plus-jakarta leading-[1.3rem]'>
								{media.overview ? media.overview : "No overview"}
							</p>
						</div>

						<div className='flex items-center flex-wrap gap-3 text-white text-[10px] md:text-xs tracking-wide font-medium'>
							{releaseDate && (
								<>
									<span>{new Date(releaseDate).getFullYear()}</span>
									<span className='w-1 h-1 bg-white/50 rounded-full' />
									<span>
										{new Intl.DateTimeFormat("en-US", {
											month: "short",
											day: "numeric",
										}).format(new Date(releaseDate))}
									</span>
									<span className='w-1 h-1 bg-white/50 rounded-full' />
								</>
							)}
							<div className='flex items-center gap-1 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm font-normal threed-effect'>
								<span className='text-yellow-500 text-[10px]'>★</span>
								<span className='text-white'>
									{media.vote_average.toFixed(1)}
								</span>
							</div>
							<span className='w-1 h-1 bg-white/50 rounded-full' />
							<span className='text-teal-400 font-semibold'>
								{mediaType === "movie" ? "Movie" : "Tv Series"}
							</span>
							<span className='w-1 h-1 bg-white/50 rounded-full' />
							{runtime && (
								<>
									<span className='text-white font-semibold'>{runtime}</span>
								</>
							)}
						</div>

						<div className='mt-3'>
							<p className='capitalize tracking-normal text-xs md:text-sm font-normal mb-1'>
								Genre
							</p>
							<div className='flex items-center gap-1 text-[10px] md:text-xs flex-wrap'>
								{media.genres.map((genre: { id: number; name: string }) => (
									<button
										key={genre.id}
										className='relative z-20 flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm font-normal threed-effect'>
										<span>{genre.name}</span>
									</button>
								))}
								{media.genres.length === 0 && (
									<p className='text-white/50'>No Genre available.</p>
								)}
							</div>
						</div>

						<div className='mt-3'>
							<p className='capitalize tracking-normal text-xs md:text-sm font-normal mb-1'>
								Cast
							</p>
							<div className='flex items-start gap-2 overflow-x-auto no-scrollbar w-full text-xs text-center font-medium'>
								{casts.map(
									(cast: {
										id: number;
										profile_path: string;
										name: string;
									}) => (
										<div
											key={cast.id}
											className='flex flex-col gap-1 items-center w-25 shrink-0'>
											<CastImage path={cast.profile_path} name={cast.name} />
											<p>{cast.name}</p>
										</div>
									),
								)}
								{casts.length === 0 && (
									<p className='text-white/50'>No Cast available.</p>
								)}
							</div>
						</div>
						<div className='mt-3'>
							<p className='capitalize tracking-normal text-xs md:text-sm font-normal mb-2'>
								Available to Watch On
							</p>
							<div className='flex flex-wrap items-center gap-2'>
								{movieProviders.length > 0 ? (
									movieProviders.map((provider: Provider) => (
										<a
											key={provider.provider_id}
											href={tmdbWatchLink}
											target='_blank'
											rel='noopener noreferrer'
											className={`
											group relative z-20 flex items-center gap-2 px-3 py-1.5 
											rounded-full cursor-pointer threed-effect bg-white/5 backdrop-blur-md 
											border border-white/10 text-white/80
											transition-all duration-500 ease-in-out
											hover:bg-white/10 hover:border-white/30 hover:scale-105
										`}>
											<div className='w-5 h-5 rounded-md overflow-hidden shrink-0 shadow-md transition-transform duration-500 group-hover:scale-110'>
												<img
													src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
													alt={provider.provider_name}
													className='w-full h-full object-cover'
												/>
											</div>
											<span className='text-[10px] font-medium tracking-wide text-white'>
												{provider.provider_name}
											</span>
										</a>
									))
								) : (
									<p className='text-xs text-white/60 flex items-center gap-1'>
										<IoFilmOutline />{" "}
										{!isReleased
											? "Coming soon to theaters"
											: "Streaming information unavailable"}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieDetailScreen;
