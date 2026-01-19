import { Navigate, useLocation } from "react-router-dom";
import { UserAuth } from "@/context/AuthContext";
import LoadingScreen from "@/screens/Loading/Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { session, isLoadingSession } = UserAuth();
	const location = useLocation();

	if (isLoadingSession) {
		return <LoadingScreen />;
	}

	if (!session) {
		return <Navigate to='/login' replace state={{ from: location.pathname }} />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
