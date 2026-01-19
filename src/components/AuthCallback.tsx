import { UserAuth } from "@/context/AuthContext";
import LoadingScreen from "@/screens/Loading/Loading";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
	const { session, isLoadingSession } = UserAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoadingSession) {
			return;
		}

		const returnTo = sessionStorage.getItem("returnTo") || "/";

		if (session) {
			navigate(returnTo, { replace: true });
			sessionStorage.removeItem("returnTo");
		} else {
			navigate("/login", { replace: true });
		}
	}, [isLoadingSession, session, navigate]);

	if (isLoadingSession) {
		return <LoadingScreen />;
	}

	return null;
};

export default AuthCallback;
