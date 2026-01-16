import { movieService } from "@/api/movieService";
import { UseAppContext, type MovieData } from "@/context/AppCinemaContext";
import { useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { FaPlay, FaPlus } from "react-icons/fa";
import { IoCheckmarkDoneSharp, IoFilmOutline, IoStar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface MovieCardProps {
	title: string;
	year: string;
	image: string;
	hoverImage: string;
	genre: string;
	size?: "sm" | "lg";
	mediaType?: "movie" | "tv";
	type?: string;
	id?: number;
	rating: string;
}

const MovieCard = ({
	title,
	year,
	image,
	genre,
	hoverImage,
	type,
	size = "sm",
	id,
	mediaType = "movie",
	rating,
}: MovieCardProps) => {
	const {
		setShowTrailerModal,
		setTrailer,
		handleAddToWatchlist,
		handleRemoveFromWatchlist,
		bookmarks,
	} = UseAppContext();
	const [imgError, setImgError] = useState(false);
	const [isImageLoading, setIsImageLoading] = useState(true);
	const navigate = useNavigate();

	const handlePlayTrailer = async (movieId: string) => {
		if (!movieId || !mediaType) return;
		try {
			const trailer = await movieService.getTrailerById(mediaType, movieId);
			if (trailer?.key) {
				setTrailer({
					title: title || trailer.name,
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

	const handleAdd = () => {
		handleAddToWatchlist(watchlistDetails);

		toast.success("Added to Watchlist", {
			description: `${title} has been added to your library.`,
			action: {
				label: "View",
				onClick: () => navigate("/watchlist"),
			},
		});
	};

	const handleRemove = () => {
		handleRemoveFromWatchlist(id!);

		toast.info("Removed from Watchlist", {
			description: `${title} has been removed from your library.`,
		});
	};

	const dimensions =
		size === "sm"
			? "w-[140px] md:w-[180px] h-[210px] md:h-[270px]"
			: "w-[140px] md:w-[220px] h-[210px] md:h-[330px]";

	const Placeholder = (
		<div className='absolute inset-0 flex flex-col items-center justify-center bg-slate-950'>
			<div className='absolute w-20 h-20 bg-teal-500/10 blur-2xl rounded-full' />

			<div className='relative z-10 flex flex-col items-center'>
				<IoFilmOutline
					className='text-teal-500/30 mb-2 transform group-hover:scale-110 transition-transform duration-700'
					size={size === "sm" ? 32 : 44}
				/>
				<span className='text-[8px] uppercase tracking-widest text-white/50 font-bold'>
					No Preview
				</span>
			</div>
		</div>
	);

	const watchlistDetails: MovieData = {
		title,
		year,
		image,
		hoverImage,
		genre,
		size: "lg",
		mediaType,
		type: "watchlist",
		id,
		rating,
	};

	const isBookmarked = bookmarks.some((movie) => movie.id === id);

	return (
		<div
			className={`relative ${dimensions} shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-[#053330] shadow-xl group border ${
				imgError ? "border-white/10" : "border-white/30"
			} transition-all duration-700 ease-in-out transform-gpu active:[&:not(:has(button:hover))]:scale-95`}>
			{isImageLoading && !imgError && (
				<div className='absolute inset-0 z-40 bg-slate-900 overflow-hidden'>
					<MovieCardSkeleton size={size} />
				</div>
			)}

			{!image || imgError ? (
				Placeholder
			) : (
				<>
					<img
						src={image}
						alt={title}
						onLoad={() => setIsImageLoading(false)}
						onError={() => {
							setImgError(true);
							setIsImageLoading(false);
						}}
						className={`absolute inset-0 w-full h-full object-cover will-change-transform transition-all duration-700 ease-in-out group-hover:scale-110 
                        ${
													isImageLoading
														? "opacity-0"
														: "opacity-100 group-hover:opacity-0"
												}`}
					/>
					<img
						src={hoverImage || image}
						alt={title}
						className='absolute inset-0 w-full h-full object-cover will-change-transform opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:scale-110'
					/>
				</>
			)}

			{/* Premium Scrim (Bottom Gradient) */}
			<div className='absolute inset-0 bg-linear-to-b from-transparent via-black/60 to-black z-10' />

			{/* Hover Overlay Content */}
			<div className='absolute inset-0 lg:bg-black/40 lg:backdrop-blur-[1px] z-20 transition-all duration-700 ease-in-out group-hover:opacity-100 opacity-100 lg:opacity-0'>
				<div className='absolute top-4 right-4 flex gap-2'>
					{type === "watchlist" ? (
						<>
							<button
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									handlePlayTrailer(String(id));
								}}
								className='transform-gpu p-2 bg-teal-500/50 lg:bg-white/10 threed-effect hover:bg-teal-500 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-700 ease-in-out cursor-pointer active:scale-90 h-7 w-7 flex justify-center items-center'>
								<FaPlay className='text-[6px] md:text-[8px]' />
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									handleRemove();
								}}
								className='transform-gpu p-2 bg-red-500 lg:bg-white/10 threed-effect hover:bg-red-500 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-700 ease-in-out cursor-pointer active:scale-90 h-7 w-7 flex justify-center items-center'>
								<BsTrashFill className='text-[8px] md:text-[10px]' />
							</button>
						</>
					) : (
						<>
							{isBookmarked ? (
								<button
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										handleRemove();
									}}
									className='transform-gpu p-2 bg-teal-500/50 threed-effect backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-700 ease-in-out cursor-pointer active:scale-90 h-7 w-7 flex justify-center items-center'>
									<IoCheckmarkDoneSharp className='text-[10px] md:text-[12px]' />
								</button>
							) : (
								<button
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										handleAdd();
									}}
									className='transform-gpu p-2 bg-teal-500/50 lg:bg-white/10 threed-effect hover:bg-teal-500 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-700 ease-in-out cursor-pointer active:scale-90 h-7 w-7 flex justify-center items-center'>
									<FaPlus className='text-[6px] md:text-[8px]' />
								</button>
							)}
							<button
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									handlePlayTrailer(String(id));
								}}
								className='transform-gpu p-1 bg-teal-500/50 lg:bg-white/10 threed-effect hover:bg-teal-500 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-700 ease-in-out cursor-pointer active:scale-90 h-7 w-7 flex justify-center items-center'>
								<FaPlay className='text-[6px] md:text-[8px]' />
							</button>
						</>
					)}
				</div>
			</div>

			<div className='absolute bottom-0 left-0 w-full p-5 z-30'>
				<span
					className={`px-2 py-0.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[8px] capitalize tracking-wide font-normal text-teal-400 select-none`}>
					{genre}
				</span>
				<h3
					className={`my-2 ${
						size === "sm" ? "text-[10px] md:text-xs" : "text-[10px] md:text-sm"
					} font-light text-white leading-tight`}>
					{title}
				</h3>
				<div
					className={`flex items-center gap-2 flex-wrap mt-1 ${
						size === "sm"
							? "text-[8px] md:text-[10px]"
							: "text-[8px] md:text-xs"
					}`}>
					<span className='text-white'>{year}</span>
					<span className='w-1 h-1 bg-white/30 rounded-full' />
					{mediaType && (
						<>
							<span className='text-teal-500 font-medium flex items-center gap-1'>
								{mediaType === "tv" ? "Tv Series" : "Movie"}
							</span>
							<span className='w-1 h-1 bg-white/30 rounded-full' />
						</>
					)}
					<span className='text-white font-medium flex items-center gap-1'>
						<IoStar className='text-[10px] text-orange-500' />{" "}
						<span className='flex items-center'>{rating}</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
