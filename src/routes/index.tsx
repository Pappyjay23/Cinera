import AppLayout from "@/components/AppLayout";
import AuthScreen from "@/screens/Auth/Auth";
import HomeScreen from "@/screens/Home/Home";
import MovieDetailScreen from "@/screens/MovieDetail/MovieDetail";
import MoviesScreen from "@/screens/Movies/Movies";
import NotFoundScreen from "@/screens/NotFound/NotFound";
import SearchScreen from "@/screens/Search/Search";
import BookmarksScreen from "@/screens/Watchlist/Watchlist";

export type AppRoute = {
	path: string;
	element: React.ReactElement;
	protected?: boolean;
	children?: AppRoute[];
};

const routes: AppRoute[] = [
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{ path: "/", element: <HomeScreen /> },
			{ path: "/search", element: <SearchScreen /> },
			{ path: "/movie/:id", element: <MovieDetailScreen /> },
			{ path: "/movies", element: <MoviesScreen /> },
			{ path: "/watchlist", element: <BookmarksScreen /> },
		],
	},

	{ path: "/login", element: <AuthScreen /> },
	{ path: "/signup", element: <AuthScreen /> },

	{ path: "*", element: <NotFoundScreen /> },
];

export default routes;
