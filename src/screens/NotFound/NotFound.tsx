import { useNavigate } from "react-router-dom";

const NotFoundScreen = () => {
	const navigate = useNavigate();

	return (
		<section className='relative h-svh overflow-hidden w-full flex justify-center items-center font-plus-jakarta selection:bg-white/30'>
			<img
				src={'/app-bg.jpg'}
				alt='Hero Background'
				className='fixed top-0 left-0 w-full h-full object-cover z-1 blur-xl scale-110'
			/>

			<div className='fixed inset-0 z-2 bg-[radial-gradient(circle_at_center,var(--tw-gradient-from)_0%,var(--tw-gradient-to)_100%)] from-black/60 to-black' />

			<div className='flex flex-col items-center relative z-3 text-white px-6'>
				<h1
					className='
          text-[8rem] md:text-[12rem] 
          font-black tracking-tighter 
          bg-linear-to-b from-white via-white/80 to-transparent 
          bg-clip-text text-transparent 
          drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]
          [text-shadow:0px_2px_1px_rgba(255,255,255,0.2)]
          select-none
          animate-power-pulse
        '>
					404
				</h1>

				<p
					className='
          -mt-6 md:-mt-10 
          font-raleway text-xl md:text-3xl 
          uppercase tracking-wider 
          text-white/90 
          drop-shadow-md
        '>
					Lost in the Shadows
				</p>

				<div className='h-px w-32 md:w-48 bg-linear-to-r from-transparent via-white/40 to-transparent my-6' />

				<p className='text-xs md:text-sm font-light font-raleway tracking-wider uppercase opacity-60 text-center max-w-70 md:max-w-none'>
					The page you're looking for does not exist
				</p>

				<button
					onClick={() => navigate("/")}
					type='button'
					className='
            cursor-pointer mt-5 
            py-3 px-10 
            rounded-full 
            bg-white/5 
            border border-white/10 
            backdrop-blur-md 
            text-white font-extralight text-[12px] uppercase tracking-widest
            shadow-[inset_0px_1px_1px_rgba(255,255,255,0.2),0px_10px_20px_rgba(0,0,0,0.4)]
            hover:bg-white/10 
            hover:border-white/30 
            hover:shadow-[inset_0px_1px_2px_rgba(255,255,255,0.3),0px_15px_30px_rgba(0,0,0,0.5)]
            active:scale-95 
            transform-gpu will-change-transform
            transition-all duration-300 ease-out
          '>
					Return Home
				</button>
			</div>
		</section>
	);
};

export default NotFoundScreen;
