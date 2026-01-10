import MovieCard from "@/components/shared/MovieCard";
import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";

type CarouselMovie = {
	id: number;
	title: string;
	year: string;
	genre: string;
	image: string;
	hoverImage: string;
};

interface MovieCarouselProps {
	isLoading: boolean;
	movies: CarouselMovie[];
	title?: string;
	type?: string;
	size?: "sm" | "lg";
}

const MovieCarousel = ({
	isLoading,
	movies,
	title,
	size = "sm",
	type,
}: MovieCarouselProps) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(true);

	const toggleArrows = () => {
		if (scrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
			setShowLeftArrow(scrollLeft > 10); // Show if scrolled more than 10px
			setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
		}
	};

	useEffect(() => {
		const el = scrollRef.current;
		if (el) {
			el.addEventListener("scroll", toggleArrows);
			// Initial check
			toggleArrows();
			return () => el.removeEventListener("scroll", toggleArrows);
		}
	}, [movies, isLoading]);

	const scroll = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const { scrollLeft, clientWidth } = scrollRef.current;
			const scrollAmount = clientWidth * 0.8; // Scroll 80% of view for better context
			const target =
				direction === "left"
					? scrollLeft - scrollAmount
					: scrollLeft + scrollAmount;

			gsap.to(scrollRef.current, {
				scrollLeft: target,
				duration: 2,
				ease: "power2.out",
				onUpdate: toggleArrows,
			});
		}
	};

	const dimensions =
		size === "sm"
			? "min-h-[210px] md:min-h-[270px]"
			: "min-h-[210px] md:min-h-[330px]";

	return (
		<div className='flex flex-col group/carousel'>
			{title && (
				<p className='capitalized tracking-normal font-plus-jakarta font-medium mb-1'>
					{title}
				</p>
			)}

			<div className='relative'>
				{!isLoading && (
					<>
						{/* Left Arrow */}
						<button
							onClick={() => scroll("left")}
							className={`absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:bg-teal-500 cursor-pointer hidden md:block ${
								showLeftArrow
									? "opacity-0 group-hover/carousel:opacity-100"
									: "opacity-0 pointer-events-none"
							}`}>
							<HiChevronLeft size={24} />
						</button>

						{/* Right Arrow */}
						<button
							onClick={() => scroll("right")}
							className={`absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:bg-teal-500 cursor-pointer hidden md:block ${
								showRightArrow
									? "opacity-0 group-hover/carousel:opacity-100"
									: "opacity-0 pointer-events-none"
							}`}>
							<HiChevronRight size={24} />
						</button>
					</>
				)}
				<div
					ref={scrollRef}
					className={`relative flex gap-3 items-center overflow-x-scroll py-4 w-full no-scrollbar ${dimensions} ${
						isLoading ? "opacity-0 z-1" : "opacity-100 z-2"
					} transition-all duration-700 ease-in-out`}>
					{movies.map((movie) => (
						<Link to={`/movie/${movie.id}`} key={movie.id}>
							<MovieCard
								id={movie.id}
								size={size}
								genre={movie.genre}
								image={movie.image}
								hoverImage={movie.hoverImage}
								title={movie.title}
								year={movie.year}
								type={type}
							/>
						</Link>
					))}
				</div>

				<div
					className={` absolute inset-0 flex gap-3 items-center overflow-x-scroll py-4 w-full no-scrollbar ${
						isLoading ? "opacity-100 z-2" : "opacity-0 z-1"
					} transition-all duration-700 ease-in-out`}>
					{Array(8)
						.fill(null)
						.map((_, index) => (
							<MovieCardSkeleton key={index} size={size} />
						))}
				</div>
			</div>
		</div>
	);
};

export default MovieCarousel;
