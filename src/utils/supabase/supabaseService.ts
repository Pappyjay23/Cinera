import type { MovieData } from "@/context/AppCinemaContext";
import { supabase } from "./supabaseClient";

export const bookmarkService = {
    async getBookmarks(userId: string) {
        const { data, error } = await supabase
            .from("bookmarks")
            .select("movie_data")
            .eq("user_id", userId);

        if (error) throw error;
        return data.map((b) => b.movie_data as MovieData);
    },

    async addToWatchlist(userId: string, movie: MovieData) {
        const { error } = await supabase
            .from("bookmarks")
            .insert({
                user_id: userId,
                movie_id: movie.id,
                movie_data: movie,
            });

        if (error) throw error;
    },

    async removeFromWatchlist(userId: string, movieId: number) {
        const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("user_id", userId)
            .eq("movie_id", movieId);

        if (error) throw error;
    }
};