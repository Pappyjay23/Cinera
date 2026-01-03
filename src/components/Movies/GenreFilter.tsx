import { useState } from "react";
import { IoFilterOutline, IoChevronDown, IoCheckmark, IoCloseOutline } from "react-icons/io5";

const GenreFilter = ({ selectedGenres, onUpdateGenres }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const genres = [
        "Action", "Adventure", "Animation", "Comedy", "Crime", 
        "Documentary", "Drama", "Family", "Fantasy", "History", 
        "Horror", "Music", "Mystery", "Romance", "Science Fiction", "Thriller"
    ];

    const toggleGenre = (genre: string) => {
        if (selectedGenres.includes(genre)) {
            // Remove if already selected
            onUpdateGenres(selectedGenres.filter((g: string) => g !== genre));
        } else {
            // Add if not selected
            onUpdateGenres([...selectedGenres, genre]);
        }
    };

    return (
        <div className="w-full mb-8">
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-base font-medium text-white/90'>Recently Added</h2>
                
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-all duration-500 cursor-pointer active:scale-95 border ${
                        isOpen || selectedGenres.length > 0
                        ? "bg-teal-500 border-teal-400 text-white" 
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                    }`}
                >
                    <IoFilterOutline />
                    <span>Filter by Genre</span>
                    {selectedGenres.length > 0 && (
                        <span className="bg-white text-teal-600 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold animate-in zoom-in">
                            {selectedGenres.length}
                        </span>
                    )}
                    <IoChevronDown className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
                </button>
            </div>

            <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0"
            }`}>
                <div className="min-h-0">
                    <div className="flex flex-wrap gap-2 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                        {genres.map((genre) => {
                            const isActive = selectedGenres.includes(genre);
                            return (
                                <button
                                    key={genre}
                                    onClick={() => toggleGenre(genre)}
                                    className={`px-4 py-1.5 rounded-full text-[9px] md:text-[11px] font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                                        isActive
                                        ? "bg-teal-500 text-white"
                                        : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    {isActive && <IoCheckmark className="text-sm" />}
                                    {genre}
                                </button>
                            );
                        })}
                        
                        {selectedGenres.length > 0 && (
                            <button 
                                onClick={() => onUpdateGenres([])}
                                className="px-4 py-1.5 rounded-full text-[11px] font-medium text-teal-400 hover:text-teal-300 transition-colors cursor-pointer flex items-center gap-1"
                            >
                                <IoCloseOutline className="text-sm" />
                                Clear All
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenreFilter;