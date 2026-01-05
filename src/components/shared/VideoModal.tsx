import { useEffect } from "react";
import { IoClose, IoInformationCircleOutline } from "react-icons/io5";

interface VideoModalProps {
	isOpen: boolean;
	onClose: () => void;
	videoUrl: string;
	videoTitle: string;
}

const VideoModal = ({
	isOpen,
	onClose,
	videoUrl,
	videoTitle,
}: VideoModalProps) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};


		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = "unset";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 md:p-12'>
			<div
				className='absolute inset-0 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-700'
				onClick={onClose}
			/>

			<button
				onClick={onClose}
				className='absolute top-4 right-4 group flex items-center gap-3 text-white/40 hover:text-white transition-all duration-300 cursor-pointer bg-white/5 hover:bg-white/10 px-2 sm:px-4 py-2 rounded-full border border-white/10 backdrop-blur-md'>
				<span className='hidden sm:block text-[10px] uppercase tracking-widest font-bold'>
					Exit Theatre
				</span>
				<IoClose
					size={20}
					className='group-hover:rotate-90 transition-transform duration-300'
				/>
			</button>

			<div className='relative w-full max-w-6xl z-10 animate-in zoom-in-95 slide-in-from-bottom-12 duration-500'>
				<div className='flex items-center justify-between mb-4 px-2'>
					<div className='flex flex-col'>
						<span className='text-teal-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-1'>
							Now Playing
						</span>
						<h2 className='text-white text-lg md:text-2xl font-semibold truncate max-w-62.5 md:max-w-xl drop-shadow-lg'>
							{videoTitle}
						</h2>
					</div>
				</div>

				<div className='relative aspect-video rounded-3xl md:rounded-[2.5rem] overflow-hidden border-2 border-white/50 backdrop-blur-md shadow-[0_0_50px_-12px_rgba(20,184,166,0.3)] h-[50vw] [@media(min-width:1000px)]:h-[40vw] lg:h-[30vw] max-w-300 [@media(min-width:2000px)]:h-[25vw] mx-auto'>
					<div className='absolute -inset-4 bg-teal-500/20 blur-[100px] -z-10 animate-pulse' />

					<iframe
						width='100%'
						height='100%'
						src={videoUrl}
						frameBorder='0'
						allow='autoplay; encrypted-media; picture-in-picture'
						allowFullScreen
						title={videoTitle}
						className='w-full h-full'
					/>
				</div>

				<div className='mt-4 flex items-center justify-center gap-2 text-white'>
					<IoInformationCircleOutline size={14} />
					<span className='text-[8px] md:text-[10px] uppercase tracking-widest'>
						Press ESC or click outside to close
					</span>
				</div>
			</div>
		</div>
	);
};

export default VideoModal;
