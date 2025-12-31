import { BiSolidMoviePlay } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { IoBookmark, IoSearch } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { Link, Outlet } from "react-router-dom";

const navItems = [
	{
		name: "Home",
		href: "/",
		icon: <FaHome />,
	},
	// {
	// 	name: "Search",
	// 	href: "/search",
	// 	icon: <IoSearch />,
	// },
	{
		name: "Movies",
		href: "/search",
		icon: <BiSolidMoviePlay />,
	},
	{
		name: "Bookmarks",
		href: "/search",
		icon: <IoBookmark />,
	},
	{
		name: "Profile",
		href: "/login",
		icon: <LuUserRound />,
	},
];

const AppLayout = () => {
	return (
		<div className='relative min-h-svh flex justify-center items-center px-2 md:px-6'>
			{/* Blurred Bg */}
			<img
				src={'/app-bg.jpg'}
				alt='Hero Background'
				className='fixed top-0 left-0 w-full h-full object-cover z-1 blur-xl'
			/>

			{/* Main Content */}
			<div
				className='z-5 relative w-full max-w-300 mx-auto bg-teal-500/10 rounded-3xl h-full min-h-[90vh] md:min-h-[80vh] xl:min-h-[85vh] [@media(min-width:2000px)]:min-h-[50vh] flex flex-col gap-2 bg-cover bg-center border border-white/30'
				style={{
					backgroundImage: `url('https://image.tmdb.org/t/p/original//pAyImoslSnpMgjRwhaS5ZEdl8UI.jpg')`,
					// backgroundImage: `url('https://image.tmdb.org/t/p/original//kVSUUWiXoNwq2wVCZ4Mcqkniqvr.jpg')`,
					// backgroundImage: `url('https://image.tmdb.org/t/p/original//qCOGGi8JBVEZMc3DVby8rUivyXz.jpg')`,
				}}>
				<div className='absolute inset-0 z-2 bg-linear-to-b from-black/40 via-black/80 to-black rounded-3xl' />
				{/* Floating Nav */}
				<div className='p-4 z-30 absolute -bottom-10 left-1/2 transform -translate-x-1/2'>
					<div className='w-full justify-center flex'>
						<div className='flex gap-3 w-full justify-center items-center bg-white/3 rounded-full p-2 h-full backdrop-blur-sm border border-white/15 shadow-[inset_0px_1px_2px_rgba(255,255,255,0.15),0px_2px_8px_rgba(0,0,0,0.15)]  '>
							<div className='flex gap-3'>
								{navItems.map((item, index) => (
									<div
										key={index}
										className='relative group active:scale-90 transition-transform duration-300 ease-in-out transform-gpu will-change-transform'>
										<div className='flex justify-center items-center w-8 md:w-10 h-8 md:h-10 text-base md:text-lg bg-white/5 rounded-full border border-white/10 backdrop-blur-3xl cursor-pointer threed-effect'>
											{item.icon}
										</div>
										<div className='absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-md text-[10px] font-medium text-background bg-foreground opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-all duration-700 ease-in-out shadow-md'>
											{item.name}
											<div className='absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-foreground rotate-45'></div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className='z-10 p-4 h-full flex-1 w-full flex flex-col overflow-auto'>
					<div className='flex items-center justify-between gap-2'>
						{/* Logo */}
						<Link
							to='/'
							className='bg-white/3 rounded-full py-1 pl-1 pr-3 w-fit backdrop-blur-sm border border-white/15 shadow-[inset_0px_1px_2px_rgba(255,255,255,0.15),0px_2px_8px_rgba(0,0,0,0.15)] active:scale-95 transition-all duration-300 ease-in-out'>
							<div className='flex items-center gap-1.5'>
								<img
									src={'/logo.png'}
									alt='Logo'
									className='w-7 md:w-9 h-7 md:h-9 rounded-full border border-white/10 bg-teal-900 p-0.75 threed-effect'
								/>
								<p className='text-[0.8rem] md:text-[1rem] lowercase font-plus-jakarta tracking-tight font-bold drop-shadow-[0_2px_1px_rgba(0,0,0,0.8)] [text-shadow:0px_1px_0px_rgba(255,255,255,0.4)]'>
									cinera
								</p>
							</div>
						</Link>
						<div className='flex justify-center items-center w-8 md:w-10 h-8 md:h-10 text-base md:text-lg bg-white/5 rounded-full border border-white/10 backdrop-blur-3xl cursor-pointer threed-effect active:scale-90 transition-all duration-300 ease-in-out'>
							<span>
								<IoSearch />
							</span>
						</div>
					</div>
					<div className='h-max flex-1 flex overflow-auto'>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppLayout;
