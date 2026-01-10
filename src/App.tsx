import { Route, Routes } from "react-router-dom";
import TrailerModal from "./components/shared/TrailerModal";
import { UseHomeCinema } from "./context/HomeCinemaContext";
import useNetworkStatus from "./hooks/useNetworkStatus";
import type { AppRoute } from "./routes";
import routes from "./routes";
import OfflineScreen from "./screens/Offline/Offline";

const renderRoute = (route: AppRoute) => {
	// const element = route.protected ? (
	// 	<RouteGuard>{route.element}</RouteGuard>
	// ) : (
	// 	route.element
	// );

	const element = route.element;

	if (!route.children || route.children.length === 0) {
		return <Route key={route.path} path={route.path} element={element} />;
	}

	// has nested children
	return (
		<Route key={route.path} path={route.path} element={element}>
			{route.children.map((child) => renderRoute(child))}
		</Route>
	);
};

const App = () => {
	const { isOnline } = useNetworkStatus();
	const { showTrailerModal, setShowTrailerModal, trailer } = UseHomeCinema();

	if (!isOnline) {
		return <OfflineScreen />;
	}
	return (
		<div className='relative min-h-svh'>
			<TrailerModal
				isOpen={showTrailerModal}
				onClose={() => setShowTrailerModal(false)}
				trailerUrl={trailer?.url || ""}
				trailerTitle={trailer?.title || ""}
			/>
			<Routes>{routes.map((r) => renderRoute(r))}</Routes>
		</div>
	);
};

export default App;
