import { IoFilmOutline } from "react-icons/io5";

const LoadingScreen = () => (
    <div className="h-svh w-full bg-background flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[150px] animate-pulse delay-700" />
        
        <div className="flex flex-col items-center gap-4 z-10">
            {/* Minimalist Film Icon with Shimmer */}
            <div className="relative">
                <IoFilmOutline className="text-teal-500/20 text-6xl animate-pulse" />
                <div className="absolute inset-0 text-teal-500/40 text-6xl animate-ping opacity-20">
                    <IoFilmOutline />
                </div>
            </div>
            
            <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-teal-500/50 font-bold animate-pulse">
                    Preparing Cinema
                </span>
                {/* Subtle progress bar line */}
                <div className="w-32 h-px bg-white/5 overflow-hidden">
                    <div className="w-full h-full bg-teal-500/40 -translate-x-full animate-[shimmer_1.5s_infinite]" />
                </div>
            </div>
        </div>
    </div>
);

export default LoadingScreen;