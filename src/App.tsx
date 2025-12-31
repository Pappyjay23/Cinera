import { BrowserRouter, Route, Routes } from "react-router-dom";
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

  if (!isOnline) {
      return <OfflineScreen />;
    }
	return (
		<BrowserRouter>
			<div className='relative min-h-svh'>
				{/* Hidden image to force caching */}
				<img
					src='/offline-bg.jpg'
					alt=''
					width={1}
					height={1}
					style={{ display: "none" }}
				/>
				<Routes>
					{/* <Route element={<AppLayout />}> */}
						{routes.map((r) => renderRoute(r))}
					{/* </Route> */}
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
