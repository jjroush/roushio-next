import { mapToArtists, mapToPlaylist } from "../map/spotify-data";
import { curatedPlaylistIds } from "../../data/spotify";

import { getUserAuthorizedToken } from "./token";

export const getMusicPageData = async () => {
	const topArtists = await fetch(
		`https://api.spotify.com/v1/me/top/artists?limit=6`,
		{
			headers: {
				Authorization: `Bearer ${await getUserAuthorizedToken()}`,
			},
		},
	).then((res) => res.json());

	const playlist = await Promise.all(
		curatedPlaylistIds.map(async ({ id, fathomId }) =>
			fetch(`https://api.spotify.com/v1/playlists/${id}`, {
				headers: {
					Authorization: `Bearer ${await getUserAuthorizedToken()}`,
				},
			})
				.then((res) => res.json())
				.then((data) => ({ ...data, fathomId })),
		),
	);

	return {
		topArtists: mapToArtists(topArtists),
		curatedPlaylists: mapToPlaylist(playlist),
	};
};
