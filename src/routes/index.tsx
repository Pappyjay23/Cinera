import MovieDetailScreen from "@/screens/MovieDetail/MovieDetail";
import AppLayout from "@/components/AppLayout";
import HomeScreen from "@/screens/Home/Home";
import LoginScreen from "@/screens/Login/Login";
import NotFoundScreen from "@/screens/NotFound/NotFound";
import SearchScreen from "@/screens/Search/Search";
import MoviesScreen from "@/screens/Movies/Movies";
import BookmarksScreen from "@/screens/Bookmarks/Bookmarks";

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
			{ path: "/bookmarks", element: <BookmarksScreen /> },
		],
	},

	{ path: "/login", element: <LoginScreen /> },
	// { path: "/sign-up", element: <SignUpScreen /> },

	{ path: "*", element: <NotFoundScreen /> },
];

export default routes;
