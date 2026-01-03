import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const EmptyResult = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
      <div className="relative mb-6">
        <IoSearch className="text-7xl text-white/10" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-teal-500 rounded-full animate-pulse" />
      </div>
      
      <h3 className="text-xl font-medium text-white mb-2">No Results Found</h3>
      <p className="text-white/70 text-xs max-w-xs mb-8">
        We couldn't find any movies or TV series matching your search. Try different keywords or browse our trending titles.
      </p>

      {/* Re-engagement chips */}
      <div className="flex flex-wrap justify-center gap-2">
        {["Action", "Comedy", "Trending", "New Releases", "Fantasy"].map((tag) => (
          <Link to='/movies' key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs hover:bg-teal-500/20 hover:border-teal-500/50 active:scale-95 cursor-pointer transition-all duration-500 ease-in-out">
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EmptyResult;