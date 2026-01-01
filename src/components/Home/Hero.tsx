import { UseHomeCinema } from "@/context/HomeCinemaContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { GrCircleInformation } from "react-icons/gr";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const Hero = () => {
	const { activeMovie, nextMovie, handleNext, heroMovies, isTransitioning } =
		UseHomeCinema();

	const textContainerRef = useRef<HTMLDivElement>(null);

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
				stagger: 0.1, // Each line (H1, p, etc.) follows the other
				ease: "power3.out",
			}
		);
	}, [activeMovie.id]);

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
						{heroMovies.map((movie) => (
							<img
								key={movie.id}
								src={movie.bg}
								alt='Preview'
								className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110
                ${
									movie.id === nextMovie.id
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
					<div className='px-4 py-1 bg-black/10 border border-white/20 rounded-full backdrop-blur-[1px]'>
						Action
					</div>
					<div className='px-4 py-1 bg-black/10 border border-white/20 rounded-full backdrop-blur-[1px]'>
						Adventure
					</div>
					<div className='px-4 py-1 bg-black/10 border border-white/20 rounded-full backdrop-blur-[1px]'>
						Drama
					</div>
					<div className='px-4 py-1 bg-black/10 border border-white/20 rounded-full backdrop-blur-[1px]'>
						Fantasy
					</div>
				</div>
				<h1 className='uppercase mb-2 text-2xl md:text-4xl font-light font-raleway tracking-normal drop-shadow-[0_2px_1px_rgba(0,0,0,0.8)] [text-shadow:0px_1px_0px_rgba(255,255,255,0.4)] transition-all'>
					{activeMovie.title}
				</h1>
				<div className='flex mb-4'>
					<button className='text-[10px] md:text-xs mr-4 px-6 py-2 rounded bg-white/10 font-medium flex items-center backdrop-blur-[2px] cursor-pointer active:scale-95 transition-all duration-300 ease-in-out'>
						<span className='mr-1'>
							<BsFillPlayFill />
						</span>
						Play Trailer
					</button>
					<Link to={""}>
						<button className='text-[10px] md:text-xs mr-4 px-6 py-2 rounded bg-white/10 font-medium flex items-center backdrop-blur-[2px] cursor-pointer active:scale-95 transition-all duration-300 ease-in-out'>
							<span className='text-white mr-2'>
								<GrCircleInformation />
							</span>
							More info
						</button>
					</Link>
				</div>
				<p className='text-xs md:text-sm font-normal'>
					Released: 24th February, 2025
				</p>
				<p className='text-[10px] md:text-xs tracking-wide w-full md:w-[70%] lg:w-[50%] line-clamp-2'>
					The 4th Season of this blockbuster broke viewership records hitting
					the top spot in 91 countries and becoming the most watched in the
					world at a point.The 4th Season of this blockbuster broke viewership
					records hitting the top spot in 91 countries and becoming the most
					watched in the world at a point.
				</p>
			</div>
		</div>
	);
};

export default Hero;
