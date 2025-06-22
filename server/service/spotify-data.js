import { mapToArtists, mapToPlaylist } from "../map/spotify-data";
import { curatedPlaylistIds } from "../../data/spotify";

import { getUserAuthorizedToken } from "./token";

// Utility function for better error handling
const fetchWithErrorHandling = async (url, options) => {
	const response = await fetch(url, options);
	if (!response.ok) {
		throw new Error(`HTTP ${response.status}: ${response.statusText}`);
	}
	return response.json();
};

export const getMusicPageData = async () => {
	const token = await getUserAuthorizedToken();
	
	// Fetch top artists
	const topArtists = await fetchWithErrorHandling(
		`https://api.spotify.com/v1/me/top/artists?limit=6`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	// Fetch playlists with better error handling
	const playlistResults = await Promise.allSettled(
		curatedPlaylistIds.map(async ({ id, fathomId }) => {
			const data = await fetchWithErrorHandling(
				`https://api.spotify.com/v1/playlists/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return { ...data, fathomId };
		})
	);

	// Filter successful results and log failures
	const successfulPlaylists = playlistResults
		.filter(result => result.status === 'fulfilled')
		.map(result => result.value);

	const failedPlaylists = playlistResults
		.filter(result => result.status === 'rejected')
		.map((result, index) => ({
			id: curatedPlaylistIds[index].id,
			error: result.reason.message
		}));

	// Log any failures for debugging
	if (failedPlaylists.length > 0) {
		console.warn('Failed to fetch some playlists:', failedPlaylists);
	}

	return {
		topArtists: mapToArtists(topArtists),
		curatedPlaylists: mapToPlaylist(successfulPlaylists),
	};
};
