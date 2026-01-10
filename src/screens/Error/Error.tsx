import { HiChevronLeft } from "react-icons/hi";
import { IoFilmOutline } from "react-icons/io5";

const ErrorScreen = ({ message, onBack }: { message: string, onBack: () => void }) => (
    <div className="h-svh w-full bg-background flex flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-6">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
            <div className="relative border border-white/10 bg-white/5 p-6 rounded-2xl backdrop-blur-xl">
                <IoFilmOutline className="text-white/20 text-5xl mb-2 mx-auto" />
                <div className="h-0.5 w-8 bg-red-500/50 mx-auto rounded-full" />
            </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">Lost in the Reels?</h2>
        <p className="text-white/50 text-sm max-w-xs mb-8 leading-relaxed">
            {message || "We couldn't retrieve the details for this title. It might be unavailable in your region."}
        </p>

        <button 
            onClick={onBack}
            className="flex items-center gap-2 px-8 py-3 bg-transparent hover:bg-white/5 hover:border-white/30 text-white border border-white/20 rounded-full font-medium cursor-pointer text-sm transition-all duration-700 ease-in-out active:scale-95"
        >
            <HiChevronLeft className="text-lg" />
            Back to Browse
        </button>
    </div>
);

export default ErrorScreen;