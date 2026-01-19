import { Route, Routes } from "react-router-dom";
import TrailerModal from "@/components/shared/TrailerModal";
import { UseAppContext } from "@/context/AppCinemaContext";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import type { AppRoute } from "@/routes";
import routes from "@/routes";
import OfflineScreen from "@/screens/Offline/Offline";
import ProtectedRoute from "@/components/ProtectedRoute";
import GuestOnlyRoute from "@/components/GuestOnlyRoute";

const wrapElement = (route: AppRoute) => {
	if (route.protected) {
		return <ProtectedRoute>{route.element}</ProtectedRoute>;
	}

	if (route.guestOnly) {
		return <GuestOnlyRoute>{route.element}</GuestOnlyRoute>;
	}

	return route.element;
};

const renderRoute = (route: AppRoute) => {
	const element = wrapElement(route);

	if (!route.children || route.children.length === 0) {
		return <Route key={route.path} path={route.path} element={element} />;
	}

	return (
		<Route key={route.path} path={route.path} element={element}>
			{route.children.map((child) => renderRoute(child))}
		</Route>
	);
};

const App = () => {
	const { isOnline } = useNetworkStatus();
	const { showTrailerModal, setShowTrailerModal, trailer } = UseAppContext();

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
