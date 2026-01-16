import { getDynamicDate, getTrailer } from "@/utils";
import axiosInstance from "./axiosInstance";
interface MediaItem {
	release_date?: string;
	first_air_date?: string;
	[key: string]: unknown;
}

interface Genre extends MediaItem {
	id: number;
	name: string;
}

// helpers
const MAX_FUTURE_YEARS = 1;

const makeMaxFutureDate = () => {
	const now = new Date();
	return new Date(
		now.getFullYear() + MAX_FUTURE_YEARS,
		now.getMonth(),
		now.getDate()
	);
};

const parseReleaseTime = (item: MediaItem) => {
	const dateStr = item.release_date || item.first_air_date || null;
	if (!dateStr) return null;
	const t = new Date(dateStr).getTime();
	return Number.isFinite(t) ? t : null;
};

const filterAndSortByDate = (items: MediaItem[]) => {
	const maxTime = makeMaxFutureDate().getTime();
	return items
		.filter((it) => {
			const time = parseReleaseTime(it);
			return time !== null && time <= maxTime;
		})
		.sort((a, b) => {
			const ta = parseReleaseTime(a)!;
			const tb = parseReleaseTime(b)!;
			return tb - ta;
		});
};

const tag = (items: MediaItem[], mediaType: string) =>
	items.map((r) => ({ ...r, media_type: mediaType }));

export const movieService = {
	getGenresList: async (type: "all" | "movie" | "tv" = "all") => {
		if (type === "movie") {
			const { data } = await axiosInstance.get("/genre/movie/list");
			return data.genres || [];
		}
		if (type === "tv") {
			const { data } = await axiosInstance.get("/genre/tv/list");
			return data.genres || [];
		}
		const [movieRes, tvRes] = await Promise.all([
			axiosInstance.get("/genre/movie/list"),
			axiosInstance.get("/genre/tv/list"),
		]);
		const combined = [
			...(movieRes.data.genres || []),
			...(tvRes.data.genres || []),
		];
		const map = new Map<number, MediaItem>();
		combined.forEach((g: Genre) => {
			if (!map.has(g.id)) map.set(g.id, g);
		});
		return Array.from(map.values());
	},
	getUnifiedGenres: async () => {
		const [movieRes, tvRes] = await Promise.all([
			axiosInstance.get("/genre/movie/list"),
			axiosInstance.get("/genre/tv/list"),
		]);

		const combined = [...movieRes.data.genres, ...tvRes.data.genres];

		// Use a Map or Object to store unique ID -> Name pairs
		return combined.reduce((acc: Record<number, string>, genre: MediaItem) => {
			acc[genre.id as number] = genre.name as string;
			return acc;
		}, {});
	},
	getTrending: async (type: "all" | "movie" | "tv" = "movie") => {
		const { data } = await axiosInstance.get(`/trending/${type}/day`);
		return data.results;
	},
	getDetails: async (type: string, id: string) => {
		// type will be either "movie" or "tv"
		const { data } = await axiosInstance.get(`/${type}/${id}`, {
			params: { append_to_response: "videos,credits,watch/providers" },
		});
		return data;
	},
	getTrailerById: async (type: string, id: string) => {
		const { data } = await axiosInstance.get(`/${type}/${id}/videos`);
		return getTrailer(data.results);
	},
	getUpcoming: async () => {
		const { data } = await axiosInstance.get("/movie/upcoming");
		return data.results;
	},

	getModernClassics: async () => {
		const { data } = await axiosInstance.get("/discover/movie", {
			params: {
				"vote_count.gte": 1000,
				"vote_average.gte": 7.5,
				"primary_release_date.gte": getDynamicDate(6),
				sort_by: "vote_average.desc",
			},
		});
		return data.results;
	},

	getPopularByGenre: async (genreId: number) => {
		const { data } = await axiosInstance.get("/discover/movie", {
			params: { with_genres: genreId, sort_by: "popularity.desc" },
		});
		return data.results;
	},
	getSearchResults: async (query: string, page: number = 1) => {
		if (!query) return { results: [], total_pages: 0 };
		const { data } = await axiosInstance.get("/search/multi", {
			params: { query, include_adult: false, page },
		});
		return data;
	},
	getDiscover: async (
		type: "movie" | "tv",
		genreIds: number[],
		page: number = 1
	) => {
		const params = { with_genres: genreIds.join(","), page };
		const response = await axiosInstance.get(`/discover/${type}`, { params });

		const results = response.data?.results || [];
		const tagged = tag(results, type);
		const filtered = filterAndSortByDate(tagged);

		return {
			results: filtered,
			total_pages: response.data?.total_pages || 1,
		};
	},

	getDiscoverAll: async (genreIds: number[], page: number = 1) => {
		const params = { with_genres: genreIds.join(","), page };

		const [moviesRes, tvRes] = await Promise.all([
			axiosInstance.get(`/discover/movie`, { params }),
			axiosInstance.get(`/discover/tv`, { params }),
		]);

		const movies = moviesRes.data?.results || [];
		const tv = tvRes.data?.results || [];

		const taggedMovies = tag(movies, "movie");
		const taggedTv = tag(tv, "tv");
		const filtered = filterAndSortByDate([...taggedMovies, ...taggedTv]);

		// Use the max total_pages from either response for "all" mode
		const totalPages = Math.max(
			moviesRes.data?.total_pages || 1,
			tvRes.data?.total_pages || 1
		);

		return {
			results: filtered,
			total_pages: totalPages,
		};
	},
};
