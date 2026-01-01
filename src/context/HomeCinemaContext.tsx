import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

type Movie = {
	id: number;
	title: string;
	bg: string;
};

interface HomeCinemaContextType {
	activeMovie: Movie;
	nextMovie: Movie;
	activeIndex: number;
	handleNext: () => void;
	isTransitioning: boolean;
	heroMovies: Movie[];
}

const HomeCinemaContext = createContext<HomeCinemaContextType | undefined>(
	undefined
);

export const HomeCinemaProvider = ({ children }: { children: ReactNode }) => {
	const heroMovies = [
		{
			id: 1,
			title: "jujutsu kaisen war arc shibuya district",
			bg: "https://image.tmdb.org/t/p/original//pAyImoslSnpMgjRwhaS5ZEdl8UI.jpg",
		},
		{
			id: 2,
			title: "attack on titan final season",
			bg: "https://image.tmdb.org/t/p/original//kVSUUWiXoNwq2wVCZ4Mcqkniqvr.jpg",
		},
		{
			id: 3,
			title: "demon slayer infinity castle",
			bg: "https://image.tmdb.org/t/p/original//qCOGGi8JBVEZMc3DVby8rUivyXz.jpg",
		},
	];

	const [activeIndex, setActiveIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const activeMovie = heroMovies[activeIndex];
	const nextIndex = (activeIndex + 1) % heroMovies.length;
	const nextMovie = heroMovies[nextIndex];

	const handleNext = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);

		setTimeout(() => {
			setActiveIndex(nextIndex);
			setIsTransitioning(false);
		}, 500);
	};

	// Auto-rotate (premium feel)
	useEffect(() => {
		const timer = setInterval(handleNext, 10000);
		return () => clearInterval(timer);
	}, [activeIndex]);

	return (
		<HomeCinemaContext.Provider
			value={{
				activeMovie,
				nextMovie,
				activeIndex,
				handleNext,
				isTransitioning,
				heroMovies,
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
