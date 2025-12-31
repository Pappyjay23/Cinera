import { FiPower } from "react-icons/fi";
import { RiWifiOffLine } from "react-icons/ri";

const OfflineScreen = () => {
	const handleReload = () => {
		window.location.reload();
	};

	return (
		<section className='relative h-svh overflow-hidden w-full flex justify-center items-center font-plus-jakarta'>
			<img
				src={"/app-bg.jpg"}
				alt='Hero Background'
				className='fixed top-0 left-0 w-full h-full object-cover z-1 blur-2xl scale-110 grayscale opacity-60'
			/>

			<div className='fixed inset-0 z-2 bg-[radial-gradient(circle_at_center,var(--tw-gradient-from)_0%,var(--tw-gradient-to)_100%)] from-black/40 to-black' />

			<div className='flex flex-col items-center relative z-3 text-white px-6 text-center'>
				<div className='p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 shadow-[inset_0px_1px_2px_rgba(255,255,255,0.1)]'>
					<RiWifiOffLine className='text-[2.5rem] md:text-[4rem] opacity-80' />
				</div>

				<p className='uppercase text-[10px] md:text-xs font-bold tracking-[0.5em] text-white/50 mb-2'>
					Signal Interrupted
				</p>

				<h1 className='text-[4rem] md:text-[7rem] font-black tracking-tighter flex items-center leading-none bg-linear-to-b from-white via-white/80 to-white/20 bg-clip-text text-transparent drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]'>
					<span className='inline-block mr-1 text-white animate-power-pulse'>
						<FiPower className='stroke-[3px]' />
					</span>
					ffline
				</h1>

				<div className='h-px w-32 md:w-48 bg-linear-to-r from-transparent via-white/40 to-transparent my-6' />

				<p className='font-medium text-sm md:text-lg max-w-75 md:max-w-md opacity-80 leading-relaxed'>
					{`Don't worry, your data is safe.`}
					<span className='block text-xs mt-2 font-light opacity-60'>
						We'll sync your cinematic journey once you're back.
					</span>
				</p>

				<button
					className='
                        cursor-pointer mt-5 
                        py-3 px-10 
                        rounded-full 
                        bg-white/5 
                        border border-white/10 
                        backdrop-blur-md 
                        text-white font-extralight text-[12px] uppercase tracking-[0.2em]
                        shadow-[inset_0px_1px_1px_rgba(255,255,255,0.2),0px_10px_20px_rgba(0,0,0,0.4)]
                        hover:bg-white/10 
                        hover:border-white/30 
                        hover:shadow-[inset_0px_1px_2px_rgba(255,255,255,0.3),0px_15px_30px_rgba(0,0,0,0.5)]
                        active:scale-95 
                        transform-gpu will-change-transform
                        transition-all duration-300 ease-out
                    '
					onClick={handleReload}
					type='button'>
					Reconnect
				</button>
			</div>
		</section>
	);
};

export default OfflineScreen;
