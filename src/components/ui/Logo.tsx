import { Link } from "react-router-dom";

const Logo = () => {
	return (
		<Link
			to='/'
			className='bg-white/3 rounded-full py-1 pl-1 pr-3 w-fit backdrop-blur-sm border border-white/15 shadow-[inset_0px_1px_2px_rgba(255,255,255,0.15),0px_2px_8px_rgba(0,0,0,0.15)] active:scale-95 transition-all duration-300 ease-in-out'>
			<div className='flex items-center gap-1.5'>
				<img
					src={"/logo.png"}
					alt='Logo'
					className='w-7 md:w-9 h-7 md:h-9 rounded-full border border-white/10 bg-teal-900 p-0.75 threed-effect'
				/>
				<p className='text-[0.8rem] md:text-[1rem] lowercase font-plus-jakarta tracking-tight font-bold drop-shadow-[0_2px_1px_rgba(0,0,0,0.8)] [text-shadow:0px_1px_0px_rgba(255,255,255,0.4)]'>
					cinera
				</p>
			</div>
		</Link>
	);
};

export default Logo;
