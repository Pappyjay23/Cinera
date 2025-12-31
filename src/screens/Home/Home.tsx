import { BsFillPlayFill } from "react-icons/bs";
import { MdLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const HomeScreen = () => {
	return (
		<div className='flex items-center '>
			<div className='w-full md:w-[70%] flex flex-col gap-1'>
				<div className='flex items-center gap-1.5'>
					<img
						src={'/logo.png'}
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
				<h1 className='uppercase mb-2 text-3xl md:text-4xl font-light font-raleway tracking-wider drop-shadow-[0_2px_1px_rgba(0,0,0,0.8)] [text-shadow:0px_1px_0px_rgba(255,255,255,0.4)]'>
					jujutsu kaisen war arc
				</h1>
				<div className='flex mb-4'>
					<button className='text-xs mr-4 px-6 py-2 rounded bg-white/10 font-medium flex items-center backdrop-blur-[2px] cursor-pointer active:scale-95 transition-all duration-300 ease-in-out'>
						<span className='mr-1'>
							<BsFillPlayFill />
						</span>
						Play
					</button>
					<Link to={"/myList"}>
						<button className='text-xs mr-4 px-6 py-2 rounded bg-white/10 font-medium flex items-center backdrop-blur-[2px] cursor-pointer active:scale-95 transition-all duration-300 ease-in-out'>
							<span className='text-white mr-2'>
								<MdLibraryAdd />
							</span>
							My List
						</button>
					</Link>
				</div>
				<p className='text-xs md:text-sm font-normal'>Released: 24th February, 2025</p>
				<p className='text-[10px] md:text-xs tracking-wide'>
					The 4th Season of this blockbuster broke viewership records hitting
					the top spot in 91 countries and becoming the most watched in the
					world at a point.
				</p>
			</div>
		</div>
	);
};

export default HomeScreen;
