import { Route, Routes } from "react-router-dom";
import VideoModal from "./components/shared/VideoModal";
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
	const { showTrailerModal, setShowTrailerModal } = UseHomeCinema();

	const activeVideo = {
		title: "Spider-Man: Across the Spider-Verse",
		url: `https://www.youtube.com/embed/${"shW9i6k8cB0"}`,
	};

	if (!isOnline) {
		return <OfflineScreen />;
	}
	return (
		<div className='relative min-h-svh'>
			<VideoModal
				isOpen={showTrailerModal}
				onClose={() => setShowTrailerModal(false)}
				videoUrl={activeVideo?.url || ""}
				videoTitle={activeVideo?.title || ""}
			/>
			<Routes>{routes.map((r) => renderRoute(r))}</Routes>
		</div>
	);
};

export default App;
