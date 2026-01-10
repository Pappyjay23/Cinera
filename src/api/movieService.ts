import { getTrailer } from "@/utils";
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
};
