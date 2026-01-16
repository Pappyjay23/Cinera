import { UseAppContext } from "@/context/AppCinemaContext";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { IoBookmark, IoSearch } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";

const navItems = [
	{
		name: "Home",
		href: "/",
		icon: FaHome,
	},
	{
		name: "Search",
		href: "/search",
		icon: IoSearch,
	},
	{
		name: "Movies & TV Series",
		href: "/movies",
		icon: BiSolidMoviePlay,
	},
	{
		name: "Watchlist",
		href: "/watchlist",
		icon: IoBookmark,
	},
];

const AppLayout = () => {
	const { heroMovies, activeIndex } = UseAppContext();

	return (
		<div className='relative h-svh flex justify-center items-center px-2 md:px-6'>
			{/* Blurred Bg */}
			<img
				src={"/app-bg.jpg"}
				alt='Hero Background'
				className='fixed top-0 left-0 w-full h-full object-cover z-1 blur-xl'
			/>

			{/* Main Content */}
			<div className='z-5 relative w-full max-w-300 mx-auto bg-teal-500/10 rounded-3xl h-[90%] md:h-[80%] xl:h-[85%] [@media(min-width:2000px)]:h-[50%] bg-cover bg-center border border-white/30'>
				{/* Floating Nav */}
				<div className='p-4 z-30 absolute -bottom-10 left-1/2 -translate-x-1/2'>
					<div className='flex justify-center'>
						<div className='flex gap-3 bg-white/3 rounded-full p-2 backdrop-blur-sm border border-white/15 shadow-[inset_0px_1px_2px_rgba(255,255,255,0.15),0px_2px_8px_rgba(0,0,0,0.15)]'>
							{navItems.map((item) => {
								const Icon = item.icon;

								return (
									<NavLink
										key={item.name}
										to={item.href}
										className={() =>
											`relative group active:scale-90 transition-transform duration-300 ease-in-out transform-gpu will-change-transform outline-none border-0`
										}>
										{({ isActive }) => (
											<>
												<div
													className={`flex justify-center items-center w-8 md:w-10 h-8 md:h-10 text-base md:text-lg rounded-full backdrop-blur-3xl border transition-all duration-300 cursor-pointer threed-effect
													${
														isActive
															? "bg-teal-900 border-white/40 text-white shadow-[0_0_10px_rgba(255,255,255,0.35)]"
															: "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
													}`}>
													<Icon />
												</div>

												{/* Tooltip */}
												<div className='absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-md text-[10px] font-medium text-background bg-foreground opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-all duration-500 ease-in-out shadow-md'>
													{item.name}
													<div className='absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-foreground rotate-45' />
												</div>
											</>
										)}
									</NavLink>
								);
							})}
						</div>
					</div>
				</div>

				<div className='relative z-10 h-full flex-1 w-full overflow-hidden rounded-3xl'>
					{heroMovies?.map((movie, index) => (
						<img
							key={movie.id}
							src={movie.bg}
							alt=''
							className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out
                        ${
													index === activeIndex
														? "opacity-100 scale-110 z-10"
														: "opacity-0 scale-100 z-0"
												}`}
						/>
					))}

					<div className='absolute inset-0 z-30 bg-linear-to-b from-black/40 via-black/80 to-black' />

					<div className=' w-full relative z-60 flex flex-col h-full'>
						<Navbar />
						<div className='flex-1 flex overflow-hidden'>
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppLayout;
