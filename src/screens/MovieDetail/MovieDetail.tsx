import { FaPlay, FaPlus } from "react-icons/fa";
import { HiChevronLeft } from "react-icons/hi";
import { SiAppletv, SiNetflix, SiPrimevideo } from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const MovieDetailScreen = () => {
	const navigate = useNavigate();

	const providers = [
		{ name: "Netflix", icon: <SiNetflix />, color: "hover:text-[#E50914]" },
		{
			name: "Prime Video",
			icon: <SiPrimevideo />,
			color: "hover:text-[#00A8E1]",
		},
		{ name: "Apple TV", icon: <SiAppletv />, color: "hover:text-white" },
		{ name: "Disney+", icon: <TbBrandDisney />, color: "hover:text-[#0063E5]" },
	];

	return (
		<div
			className='min-h-svh w-full relative'
			style={{
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://image.tmdb.org/t/p/original//fWVSwgjpT2D78VUh6X8UBd2rorW.jpg')`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundAttachment: "fixed",
			}}>
			<div className='absolute inset-0 bg-black/60 z-5 backdrop-blur-sm'></div>

			<div className='px-4 md:px-6 z-10 relative h-svh overflow-y-auto pt-20 pb-35 md:pb-80 xl:pb-50 [@media(min-width:2000px)]:pb-180'>
				<div
					onClick={() => navigate(-1)}
					className='flex gap-1 items-center text-sm md:text-base font-medium cursor-pointer mb-4'>
					<HiChevronLeft />
					<p>Go back</p>
				</div>

				<div className='md:w-[80%] mx-auto flex flex-col items-center lg:items-start lg:flex-row gap-5 lg:gap-10'>
					<div
						className={`relative w-60 md:w-75 aspect-2/3 shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-[#053330] shadow-xl group border border-white/30transition-all duration-700 ease-in-out transform-gpu flex items-center justify-center flex-1`}>
						{/* Base Image */}
						<img
							src={
								"https://image.tmdb.org/t/p/original//fWVSwgjpT2D78VUh6X8UBd2rorW.jpg"
							}
							alt={"Spongebob"}
							className='absolute inset-0 w-full h-full object-cover will-change-transform opacity-100 group-hover:opacity-0 transition-all duration-700 ease-in-out group-hover:scale-110'
						/>
						<img
							src={
								"https://image.tmdb.org/t/p/original//1RgPyOhN4DRs225BGTlHJqCudII.jpg"
							}
							alt={"Spongebob"}
							className='absolute inset-0 w-full h-full object-cover will-change-transform opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:scale-110'
						/>
						{/* Premium Scrim (Bottom Gradient) */}
						<div className='absolute inset-0 bg-linear-to-b from-transparent via-black/60 to-black z-10' />

						<div className='flex flex-col gap-3'>
							<button className='relative z-20 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white/10 backdrop-blur-sm font-normal hover:bg-teal-700 threed-effect transition-all duration-700 ease-in-out cursor-pointer active:scale-90 text-[10px] md:text-sm'>
								<FaPlus />
								<span>Add to Bookmarks</span>
							</button>
							<button className='relative z-20 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white/10 backdrop-blur-sm font-normal hover:bg-teal-700 threed-effect transition-all duration-700 ease-in-out cursor-pointer active:scale-90 text-[10px] md:text-sm'>
								<FaPlay />
								<span>Watch Trailer</span>
							</button>
						</div>
					</div>
					<div className='flex flex-col gap-2 flex-1 w-[95%] lg:w-[50%]'>
						<h1 className='text-[1.7rem] leading-8 lg:text-[2.6rem] lg:leading-12 font-bold text-center lg:text-left drop-shadow-[0_2px_1px_rgba(0,0,0,0.8)] [text-shadow:0px_1px_0px_rgba(255,255,255,0.4)]'>
							Demon Slayer: Kimetsu no Yaiba Infinity Castle
						</h1>

						<div className='mt-3'>
							<p className='capitalize tracking-normal text-xs md:text-sm font-normal mb-1'>
								Overview
							</p>
							<p className='font-light text-xs md:text-sm'>
								A listless Wade Wilson toils away in civilian life with his days
								as the morally flexible mercenary, Deadpool, behind him. But
								when his homeworld faces an existential threat, Wade must
								reluctantly suit-up again with an even more reluctant Wolverine.
								A listless Wade Wilson toils away in civilian life with his days
								as the morally flexible mercenary, Deadpool, behind him. But
								when his homeworld faces an existential threat, Wade must
								reluctantly suit-up again with an even more reluctant Wolverine.
							</p>
						</div>

						<div className='flex items-center flex-wrap gap-3 text-white text-[10px] md:text-xs tracking-wide font-medium'>
							<span>2025</span>
							<span className='w-1 h-1 bg-white/50 rounded-full' />
							<span>Oct 14</span>
							<span className='w-1 h-1 bg-white/50 rounded-full' />
							<div className='flex items-center gap-1 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm font-normal threed-effect'>
								<span className='text-yellow-500 text-[10px]'>★</span>
								<span className='text-white'>8.4</span>
							</div>
							<span className='w-1 h-1 bg-white/50 rounded-full' />
							<span className='text-teal-400 font-semibold'>Ultra HD</span>
						</div>

						<div className='mt-3'>
							<p className='capitalize tracking-normal text-xs md:text-sm font-normal mb-1'>
								Genre
							</p>
							<div className='flex items-center gap-1 text-[10px] md:text-xs'>
								<button className='relative z-20 flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm font-normal threed-effect'>
									<span>Action</span>
								</button>
								<button className='relative z-20 flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm font-normal threed-effect'>
									<span>Fantasy</span>
								</button>
								<button className='relative z-20 flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm font-normal threed-effect'>
									<span>Shounen</span>
								</button>
							</div>
						</div>

						<div className='mt-3'>
							<p className='capitalize tracking-normal text-xs md:text-sm font-normal mb-1'>
								Cast
							</p>
							<div className='flex items-start gap-2 overflow-x-auto no-scrollbar w-full text-xs text-center font-medium'>
								<div className='flex flex-col gap-1 items-center w-25 shrink-0'>
									<img
										src='https://image.tmdb.org/t/p/w300//8s8owcKmpRAuhzEGjSdRpztthUg.jpg'
										alt='Cast'
										className='w-25 h-30 object-cover rounded-xl border border-white/10'
									/>
									<p>Takahiru Sakurai</p>
								</div>
								<div className='flex flex-col gap-1 items-center w-25 shrink-0'>
									<img
										src='https://image.tmdb.org/t/p/w300//nuok8ueG7k9hPZ09Tpr8e7Qn0ah.jpg'
										alt='Cast'
										className='w-25 h-30 object-cover rounded-xl border border-white/10'
									/>
									<p>Mamoru Miyano</p>
								</div>
								<div className='flex flex-col gap-1 items-center w-25 shrink-0'>
									<img
										src='https://image.tmdb.org/t/p/w300//lUR5oN1LrqGgp25IOcI1qOH1Ud5.jpg'
										alt='Cast'
										className='w-25 h-30 object-cover rounded-xl border border-white/10'
									/>
									<p>Yoshimasa Hosoya</p>
								</div>
							</div>
						</div>
						<div className='mt-3'>
							<p className='capitalize tracking-normal text-xs md:text-sm font-normal mb-1'>
								Available to Watch On
							</p>
							<div className='flex flex-wrap items-center gap-1'>
								{providers.map((provider) => (
									<button
										key={provider.name}
										className={`
              group relative z-20 flex items-center gap-2 px-4 py-2 
              rounded-full cursor-pointer threed-effect bg-white/5 backdrop-blur-md 
              border border-white/10 text-white/80
              transition-all duration-500 ease-in-out
              hover:bg-white/10 hover:border-white/30 hover:scale-102 active:scale-95
              ${provider.color}
            `}>
										<span className='text-lg transition-transform duration-500 group-hover:scale-110'>
											{provider.icon}
										</span>
										<span className='text-[10px] font-medium tracking-wide text-white'>
											{provider.name}
										</span>

										{/* Subtle Inner Glow on Hover */}
										<div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 blur-md bg-current transition-opacity duration-500' />
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieDetailScreen;
