import { Navigate } from "react-router-dom";
import { UserAuth } from "@/context/AuthContext";
import LoadingScreen from "@/screens/Loading/Loading";

const GuestOnlyRoute = ({ children }: { children: React.ReactNode }) => {
	const { session, isLoadingSession } = UserAuth();

	if (isLoadingSession) {
		return <LoadingScreen />;
	}

	if (session) {
		const returnTo = sessionStorage.getItem("returnTo") || "/";
		return <Navigate to={returnTo} replace />;
	}

	return <>{children}</>;
};

export default GuestOnlyRoute;
