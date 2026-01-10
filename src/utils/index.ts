export const formatReadableDate = (dateString: string) => {
	const date = new Date(dateString);

	const day = date.getDate();
	const month = date.toLocaleString("en-US", { month: "long" });
	const year = date.getFullYear();

	const ordinal =
		day % 10 === 1 && day !== 11
			? "st"
			: day % 10 === 2 && day !== 12
			? "nd"
			: day % 10 === 3 && day !== 13
			? "rd"
			: "th";

	return `${day}${ordinal} ${month} ${year}`;
};

export const formatRuntime = (minutes: number): string => {
	if (!minutes) return "N/A";

	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;

	// Returns "2h 4m" or "45m" if less than an hour
	return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
};

export const getTrailer = (videos: any[]) => {
	if (!videos || videos.length === 0) return null;

	// 1. Prioritize "Official Trailer" (Exact match or includes keywords)
	const officialTrailer = videos.find(
		(v) => v.type === "Trailer" && v.name === "Official Trailer"
	);

	if (officialTrailer) return officialTrailer;

	// 2. Fallback to any "Trailer" type
	const generalTrailer = videos.find((v) => v.type === "Trailer");
	if (generalTrailer) return generalTrailer;

	// 3. Last resort: Fallback to "Teaser"
	return videos.find((v) => v.type === "Teaser") || videos[0];
};

export const getDynamicDate = (yearsBack: number) => {
	const date = new Date();
	date.setFullYear(date.getFullYear() - yearsBack);
	return date.toISOString().split("T")[0];
};
