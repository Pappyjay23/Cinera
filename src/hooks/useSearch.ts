import { useState, useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { movieService } from "@/api/movieService";
import { getTmdbImage } from "@/utils/tmdb";

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
				.filter((item: any) => item.media_type !== "person")
				.map((item: any) => ({
					id: item.id,
					title: item.title || item.name,
					year:
						(item.release_date || item.first_air_date || "").split("-")[0] ||
						"N/A",
					genre:
						item.genre_ids?.map((id: number) => genreMap?.[id])[0] || "N/A",
					image: getTmdbImage(item.poster_path, "medium"),
					hoverImage: getTmdbImage(item.backdrop_path, "medium"),
					mediaType: item.media_type,
				}));

			return {
				results: transformed,
				nextPage: pageParam + 1,
				totalPages: data.total_pages,
				pageItemsCount: transformed.length,
			};
		},
		// This tells the query how to find the next page
		getNextPageParam: (lastPage) =>
			lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
		enabled: debouncedQuery.length > 1 && !!genreMap,
		initialPageParam: 1,
	});
};
