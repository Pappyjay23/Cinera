import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export type HeroMovie = {
	id: number;
	title: string;
	bg: string;
	description?: string;
	releaseDate?: string;
	genres?: string[];
};

export type MovieData = {
	title: string;
	year: string;
	image: string;
	hoverImage: string;
	genre: string;
	size?: "sm" | "lg";
	mediaType?: "movie" | "tv";
	type?: string;
	id?: number;
	rating: string;
};

type Trailer = {
	title: string;
	url: string;
};

interface AppCinemaContextType {
	activeMovie: HeroMovie | null;
	nextMovie: HeroMovie | null;
	activeIndex: number;
	handleNext: () => void;
	isTransitioning: boolean;
	heroMovies: HeroMovie[];
	setHeroMovies: React.Dispatch<React.SetStateAction<HeroMovie[]>>;
	showTrailerModal: boolean;
	setShowTrailerModal: React.Dispatch<React.SetStateAction<boolean>>;
	trailer: Trailer;
	setTrailer: React.Dispatch<React.SetStateAction<Trailer>>;
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	selectedGenres: string[];
	setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
	bookmarks: MovieData[];
	handleAddToWatchlist: (movie: MovieData) => void;
	handleRemoveFromWatchlist: (id: number) => void;
}

const AppCinemaContext = createContext<AppCinemaContextType | undefined>(
	undefined
);

export const AppCinemaProvider = ({ children }: { children: ReactNode }) => {
	const [heroMovies, setHeroMovies] = useState<HeroMovie[]>([]);

	const [activeIndex, setActiveIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const activeMovie = heroMovies.length > 0 ? heroMovies[activeIndex] : null;
	const nextIndex =
		heroMovies.length > 0 ? (activeIndex + 1) % heroMovies.length : 0;
	const nextMovie = heroMovies.length > 0 ? heroMovies[nextIndex] : null;

	const [trailer, setTrailer] = useState<Trailer>({
		title: "",
		url: "",
	});
	const [showTrailerModal, setShowTrailerModal] = useState(false);

	const [searchQuery, setSearchQuery] = useState("");

	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

	const [bookmarks, setBookmarks] = useState<MovieData[]>([]);

	const handleAddToWatchlist = (movie: MovieData) => {
		setBookmarks((prevBookmarks) => [...prevBookmarks, movie]);
	};
	const handleRemoveFromWatchlist = (id: number) => {
		setBookmarks((prevBookmarks) => prevBookmarks.filter((m) => m.id !== id));
	};

	const handleNext = () => {
		if (isTransitioning || heroMovies.length === 0) return;

		setIsTransitioning(true);

		setTimeout(() => {
			setActiveIndex(nextIndex);
			setIsTransitioning(false);
		}, 500);
	};

	// Auto-rotate (premium feel)
	useEffect(() => {
		if (heroMovies.length === 0) return;
		const timer = setInterval(handleNext, 10000);
		return () => clearInterval(timer);
	}, [activeIndex, heroMovies.length]);

	return (
		<AppCinemaContext.Provider
			value={{
				activeMovie,
				nextMovie,
				activeIndex,
				handleNext,
				isTransitioning,
				heroMovies,
				setHeroMovies,
				setShowTrailerModal,
				showTrailerModal,
				trailer,
				setTrailer,
				searchQuery,
				setSearchQuery,
				selectedGenres,
				setSelectedGenres,
				bookmarks,
				handleAddToWatchlist,
				handleRemoveFromWatchlist,
			}}>
			{children}
		</AppCinemaContext.Provider>
	);
};

export const UseAppContext = () => {
	const context = useContext(AppCinemaContext);
	if (!context)
		throw new Error("useAppCinema must be used within a CinemaProvider");
	return context;
};
