import { HomeCinemaProvider } from "@/context/HomeCinemaContext";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import OfflineScreen from "@/screens/Offline/Offline";
import { BrowserRouter } from "react-router-dom";

const ProvidersInner = ({ children }: { children: React.ReactNode }) => {
	const { isOnline } = useNetworkStatus();

	if (!isOnline) {
		return <OfflineScreen />;
	}

	return <main className='grow'>{children}</main>;
};

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<BrowserRouter>
			<HomeCinemaProvider>
				<ProvidersInner>{children}</ProvidersInner>
			</HomeCinemaProvider>
		</BrowserRouter>
	);
};

export default Providers;
