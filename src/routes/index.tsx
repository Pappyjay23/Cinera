import MovieDetailScreen from "@/screens/MovieDetail/MovieDetail";
import AppLayout from "@/components/AppLayout";
import HomeScreen from "@/screens/Home/Home";
import LoginScreen from "@/screens/Login/Login";
import NotFoundScreen from "@/screens/NotFound/NotFound";

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
			{ path: "/search", element: <HomeScreen /> },
			{ path: "/movie/:id", element: <MovieDetailScreen /> },
		],
	},

	{ path: "/login", element: <LoginScreen /> },
	// { path: "/sign-up", element: <SignUpScreen /> },

	{ path: "*", element: <NotFoundScreen /> },
];

export default routes;
