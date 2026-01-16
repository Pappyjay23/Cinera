import { useState, useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { movieService } from "@/api/movieService";
import { getTmdbImage } from "@/utils/tmdb";

interface SearchResult {
	id: number;
	media_type: "movie" | "tv";
	title?: string;
	name?: string;
	release_date?: string;
	first_air_date?: string;
	genre_ids?: number[];
	poster_path?: string;
	backdrop_path?: string;
	vote_average: number;
}

export const useSearch = (query: string) => {
	const [debouncedQuery, setDebouncedQuery] = useState(query);

	// Debounce logic: update the internal query only after user stops typing for 500ms
	useEffect(() => {
		const handler = setTimeout(() => setDebouncedQuery(query), 500);
		return () => clearTimeout(handler);
	}, [query]);

	const { data: genreMap } = useQuery({
		queryKey: ["genres", "unified"],
		queryFn: movieService.getUnifiedGenres,
	});

	return useInfiniteQuery({
		queryKey: ["search", debouncedQuery],
		queryFn: async ({ pageParam = 1 }) => {
			const data = await movieService.getSearchResults(
				debouncedQuery,
				pageParam
			);

			const transformed = data.results
				.filter(
					(item: SearchResult) =>
						item.media_type === "movie" || item.media_type === "tv"
				)
				.map((item: SearchResult) => ({
					id: item.id,
					title: item.title || item.name,
					year:
						(item.release_date || item.first_air_date || "").split("-")[0] ||
						"N/A",
					genre:
						item.genre_ids?.map((id: number) => genreMap?.[id])[0] || "N/A",
					image: getTmdbImage(item.poster_path ?? "", "medium"),
					hoverImage: getTmdbImage(item.backdrop_path ?? "", "medium"),
					mediaType: item.media_type,
					rating: item.vote_average.toFixed(1),
				}));

			return {
				results: transformed,
				nextPage: pageParam + 1,
				totalPages: data.total_pages,
				pageItemsCount: transformed.length,
			};
		},
		getNextPageParam: (lastPage) =>
			lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
		enabled: debouncedQuery.length > 1 && !!genreMap,
		initialPageParam: 1,
	});
};
