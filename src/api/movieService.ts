import { getDynamicDate, getTrailer } from "@/utils";
import axiosInstance from "./axiosInstance";

export const movieService = {
	getUnifiedGenres: async () => {
		const [movieRes, tvRes] = await Promise.all([
			axiosInstance.get("/genre/movie/list"),
			axiosInstance.get("/genre/tv/list"),
		]);

		const combined = [...movieRes.data.genres, ...tvRes.data.genres];

		// Use a Map or Object to store unique ID -> Name pairs
		return combined.reduce((acc: Record<number, string>, genre: any) => {
			acc[genre.id] = genre.name;
			return acc;
		}, {});
	},
	getTrending: async () => {
		const { data } = await axiosInstance.get("/trending/movie/day");
		return data.results;
	},
	getMovieDetails: async (id: string) => {
		const { data } = await axiosInstance.get(`/movie/${id}`, {
			params: { append_to_response: "videos,credits,watch/providers" },
		});
		return data;
	},
	getTrailer: async (id: string) => {
		const { data } = await axiosInstance.get(`/movie/${id}/videos`);
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
};
