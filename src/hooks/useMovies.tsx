import { movieService } from "@/api/movieService";
import { useQuery } from "@tanstack/react-query";

const transformMovieData = (results: any[], genreMap: any) => {
	return results.map((movie: any) => ({
		id: movie.id,
		title: movie.title,
		year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
		genre: movie.genre_ids?.map((id: number) => genreMap?.[id])[0] || "Action",
		image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
		hoverImage: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
	}));
};

export const useTrendingMovies = () => {
	const { data: genreMap } = useQuery({
		queryKey: ["genres", "unified"],
		queryFn: movieService.getUnifiedGenres,
		staleTime: Infinity,
	});

	return useQuery({
		queryKey: ["movies", "trending"],
		queryFn: async () => {
			const results = await movieService.getTrending();

			if (!Array.isArray(results)) return [];

			const shuffled = results.sort(() => 0.5 - Math.random());

			return shuffled.slice(0, 7).map((movie: any) => ({
				...movie,
				genres: movie.genre_ids
					.map((id: number) => genreMap?.[id])
					.filter(Boolean),
			}));
		},
		enabled: !!genreMap,
		staleTime: 1000 * 60 * 60, // Consider data fresh for 1 hour
	});
};

export const useMovieDetails = (id: string | undefined) => {
	return useQuery({
		queryKey: ["movie", id],
		queryFn: () => movieService.getMovieDetails(id!),
		enabled: !!id, // Only run if id is provided
		staleTime: 1000 * 60 * 30, // 30 mins
	});
};

export const useHomeMovies = () => {
	const { data: genreMap } = useQuery({
		queryKey: ["genres", "unified"],
		queryFn: movieService.getUnifiedGenres,
		staleTime: Infinity,
	});

	const fetchEnabled = !!genreMap;

	const trending = useQuery({
		queryKey: ["movies", "trending"],
		queryFn: movieService.getTrending,
		enabled: fetchEnabled,
	});

	const upcoming = useQuery({
		queryKey: ["movies", "newReleases"],
		queryFn: async () => {
			const results = await movieService.getUpcoming();

			// Calculate a date 6 months ago to keep the row full
			const sixMonthsAgo = new Date();
			sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
			const limitDate = sixMonthsAgo.toISOString().split("T")[0];

			return results.filter((movie: any) => {
				if (!movie.release_date) return false;

				const releaseYear = parseInt(movie.release_date.split("-")[0]);

				// 1. DITCH THE RE-RELEASES: Only movies produced in 2025 or 2026
				const isModernProduction = releaseYear >= new Date().getFullYear() - 1;

				// 2. WINDOW: released in last 6 months OR in the future
				const isInWindow = movie.release_date >= limitDate;

				return isModernProduction && isInWindow;
			});
		},
		enabled: fetchEnabled,
	});

	const topRated = useQuery({
		queryKey: ["movies", "modernClassics"],
		queryFn: () => movieService.getModernClassics(),
		enabled: fetchEnabled,
	});

	const action = useQuery({
		queryKey: ["movies", "action"],
		queryFn: () => movieService.getPopularByGenre(28),
		enabled: fetchEnabled,
	});

	// 2. deduplication Logic
	const getDeduplicatedData = () => {
		const seenIds = new Set<number>();

		// Helper to filter and transform
		const process = (rawList: any[]) => {
			const unique = rawList.filter((m) => {
				if (seenIds.has(m.id)) return false;
				seenIds.add(m.id);
				return true;
			});
			return transformMovieData(unique, genreMap);
		};

		return {
			trending: process(trending.data || []),
			upcoming: process(upcoming.data || []),
			topRated: process(topRated.data || []),
			action: process(action.data || []),
		};
	};

	const isLoading =
		!fetchEnabled ||
		trending.isLoading ||
		upcoming.isLoading ||
		topRated.isLoading ||
		action.isLoading;

	return {
		isLoading,
		data: isLoading
			? { trending: [], upcoming: [], topRated: [], action: [] }
			: getDeduplicatedData(),
	};
};
