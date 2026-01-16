import { movieService } from "@/api/movieService";
import { getTmdbImage } from "@/utils/tmdb";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export interface MovieData {
	id: number;
	title?: string;
	name?: string;
	overview?: string;
	release_date?: string;
	first_air_date?: string;
	genre_ids?: number[];
	poster_path?: string;
	backdrop_path?: string;
	vote_average: number;
	media_type?: string;
	genres?: string[];
}

interface GenreMap {
	[key: number]: string;
}

const transformMovieData = (
	results: MovieData[],
	genreMap: GenreMap | undefined,
	mediaType?: string
) => {
	return results.map((movie) => ({
		id: movie.id,
		title: movie.title ?? movie.name ?? "Untitled",
		year: movie.release_date
			? movie.release_date.split("-")[0]
			: movie?.first_air_date
			? movie?.first_air_date.split("-")[0]
			: "N/A",
		genre: movie.genre_ids?.map((id: number) => genreMap?.[id])[0] || "N/A",
		image: getTmdbImage(movie.poster_path ?? "", "medium"),
		hoverImage: getTmdbImage(movie.backdrop_path ?? "", "medium"),
		rating: movie.vote_average.toFixed(1),
		media_type: movie.media_type ?? mediaType ?? "movie",
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

			return shuffled.slice(0, 7).map((movie) => ({
				...movie,
				genres: movie.genre_ids
					?.map((id: number) => genreMap?.[id])
					.filter(Boolean),
			}));
		},
		enabled: !!genreMap,
		staleTime: 1000 * 60 * 60,
	});
};

export const useMediaDetails = (
	type: string | undefined,
	id: string | undefined
) => {
	return useQuery({
		queryKey: ["details", type, id],
		queryFn: () => movieService.getDetails(type!, id!),
		enabled: !!id && !!type,
		staleTime: 1000 * 60 * 30,
	});
};

export const useTrendingMovieAndShow = (
	activeTab: "all" | "movie" | "tv" | undefined
) => {
	const { data: genreMap, isLoading: isGenreLoading } = useQuery({
		queryKey: ["genres", "unified"],
		queryFn: movieService.getUnifiedGenres,
		staleTime: Infinity,
	});

	const trendingQuery = useQuery({
		queryKey: ["trending", activeTab],
		queryFn: async () => {
			const results = await movieService.getTrending(activeTab);
			return transformMovieData(results, genreMap);
		},
		staleTime: 1000 * 60 * 30,
		enabled: !!genreMap,
	});

	return {
		...trendingQuery,
		isLoading: isGenreLoading || trendingQuery.isLoading,
	};
};

export const useDiscoverMovies = (
	type: "all" | "movie" | "tv",
	selectedGenreNames: string[]
) => {
	const { data: genreMap } = useQuery({
		queryKey: ["genres", "unified"],
		queryFn: movieService.getUnifiedGenres,
		staleTime: Infinity,
	});

	return useInfiniteQuery({
		queryKey: ["discover", type, selectedGenreNames],
		queryFn: async ({ pageParam = 1 }) => {
			// Create reverse lookup: name -> id
			const nameToIdMap = Object.entries(genreMap || {}).reduce(
				(acc, [id, name]) => {
					acc[name as string] = Number(id);
					return acc;
				},
				{} as Record<string, number>
			);

			const genreIds = selectedGenreNames
				.map((name) => nameToIdMap[name])
				.filter((id) => id !== undefined);

			let data;
			if (type === "all") {
				data = await movieService.getDiscoverAll(genreIds, pageParam);
			} else {
				data = await movieService.getDiscover(type, genreIds, pageParam);
			}

			return {
				results: transformMovieData(
					data.results as unknown as MovieData[],
					genreMap
				),
				nextPage: pageParam + 1,
				totalPages: data.total_pages,
				pageItemsCount: data.results.length,
			};
		},
		getNextPageParam: (lastPage) =>
			lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
		enabled: !!genreMap,
		staleTime: 1000 * 60 * 30,
		initialPageParam: 1,
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
		queryKey: ["movies", "trendingHome"],
		queryFn: () => movieService.getTrending(),
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

			return results.filter((movie: MovieData) => {
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
		queryFn: () =>
			movieService.getPopularByGenre({ genreId: 28, mediaType: "movie" }),
		enabled: fetchEnabled,
	});

	const sciFiTv = useQuery({
		queryKey: ["tv", "sci-fi"],
		queryFn: () =>
			movieService.getPopularByGenre({
				genreId: 10765,
				mediaType: "tv",
			}),
		enabled: fetchEnabled,
	});

	// 2. deduplication Logic
	const getDeduplicatedData = () => {
		const seenIds = new Set<number>();

		// Helper to filter and transform
		const process = (rawList: MovieData[], mediaType?: string, limit = 20) => {
			const unique = rawList
				.filter((m) => {
					if (seenIds.has(m.id)) return false;
					seenIds.add(m.id);
					return true;
				})
				.slice(0, limit);
			return transformMovieData(unique, genreMap, mediaType);
		};

		return {
			trending: process(trending.data || []),
			upcoming: process(upcoming.data || []),
			topRated: process(topRated.data || []),
			action: process(action.data || []),
			sciFi: process(sciFiTv.data || [], "tv"),
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
			? { trending: [], upcoming: [], topRated: [], action: [], sciFi: [] }
			: getDeduplicatedData(),
	};
};
