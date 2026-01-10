import { UseHomeCinema } from "@/context/HomeCinemaContext";
import { useState } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { IoFilmOutline, IoTrashOutline } from "react-icons/io5";

interface MovieCardProps {
	title: string;
	year: string;
	image: string;
	hoverImage: string;
	genre: string;
	size?: "sm" | "lg";
	type?: string;
}

const MovieCard = ({
	title,
	year,
	image,
	genre,
	hoverImage,
	type,
	size = "sm",
}: MovieCardProps) => {
	const { setShowTrailerModal } = UseHomeCinema();
	const [imgError, setImgError] = useState(false);

	const containerClasses =
		size === "sm" ? "w-[140px] md:w-[180px]" : "w-[140px] md:w-[220px]";

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

	return (
		<div
			className={`relative ${containerClasses} aspect-2/3 shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-[#053330] shadow-xl group border ${imgError ? "border-white/10":"border-white/30"} transition-all duration-700 ease-in-out transform-gpu active:[&:not(:has(button:hover))]:scale-95`}>
			{!image || imgError ? (
				Placeholder
			) : (
				<>
					<img
						src={image}
						alt={title}
						onError={() => setImgError(true)}
						className='absolute inset-0 w-full h-full object-cover will-change-transform opacity-100 group-hover:opacity-0 transition-all duration-700 ease-in-out group-hover:scale-110'
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
									setShowTrailerModal(true);
								}}
								className='transform-gpu p-2 lg:p-3 bg-teal-500/50 lg:bg-white/10 threed-effect hover:bg-teal-500 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-700 ease-in-out cursor-pointer active:scale-90'>
								<FaPlay
									className={`${
										size === "sm"
											? "text-[6px] md:text-[8px]"
											: "text-[8px] md:text-xs"
									}`}
								/>
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
								}}
								className='transform-gpu p-2 lg:p-3 bg-red-500 lg:bg-white/10 threed-effect hover:bg-red-500 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-700 ease-in-out cursor-pointer active:scale-90'>
								<IoTrashOutline
									className={`${
										size === "sm"
											? "text-[8px] md:text-[10px]"
											: "text-[10px] md:text-sm"
									}`}
								/>
							</button>
						</>
					) : (
						<>
							<button
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
								}}
								className='transform-gpu p-2 lg:p-3 bg-teal-500/50 lg:bg-white/10 threed-effect hover:bg-teal-500 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-700 ease-in-out cursor-pointer active:scale-90'>
								<FaPlus
									className={`${
										size === "sm"
											? "text-[6px] md:text-[8px]"
											: "text-[8px] md:text-xs"
									}`}
								/>
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									setShowTrailerModal(true);
								}}
								className='transform-gpu p-2 lg:p-3 bg-teal-500/50 lg:bg-white/10 threed-effect hover:bg-teal-500 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-700 ease-in-out cursor-pointer active:scale-90'>
								<FaPlay
									className={`${
										size === "sm"
											? "text-[6px] md:text-[8px]"
											: "text-[8px] md:text-xs"
									}`}
								/>
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
					className={`flex items-center gap-2 mt-1 ${
						size === "sm"
							? "text-[8px] md:text-[10px]"
							: "text-[8px] md:text-xs"
					}`}>
					<span className='text-white/60'>{year}</span>
					<span className='w-1 h-1 bg-white/30 rounded-full' />
					<span className='text-teal-500 font-medium'>Ultra HD</span>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
