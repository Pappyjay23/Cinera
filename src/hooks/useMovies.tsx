import { movieService } from "@/api/movieService";
import { useQuery } from "@tanstack/react-query";

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
