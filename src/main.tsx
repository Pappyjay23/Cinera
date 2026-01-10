import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Providers from "./components/Providers.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // Data stays "fresh" for 5 minutes
			retry: 1, // Retry failed requests once before showing error
			refetchOnWindowFocus: false, // Don't refetch when user switches tabs
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Providers>
				{/* <Toaster /> */}
				<App />
			</Providers>
		</QueryClientProvider>
	</StrictMode>
);
