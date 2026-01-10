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

type Trailer = {
	title: string;
	url: string;
};

interface HomeCinemaContextType {
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
}

const HomeCinemaContext = createContext<HomeCinemaContextType | undefined>(
	undefined
);

export const HomeCinemaProvider = ({ children }: { children: ReactNode }) => {
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
		<HomeCinemaContext.Provider
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
			}}>
			{children}
		</HomeCinemaContext.Provider>
	);
};

export const UseHomeCinema = () => {
	const context = useContext(HomeCinemaContext);
	if (!context)
		throw new Error("useCinema must be used within a CinemaProvider");
	return context;
};
