import { getUserAuthorizedToken } from "../../../server/service/token";
import { mapToSongList } from "../../../server/map/song-search";

const url =
	"https://api.spotify.com/v1/playlists/7uzJXp5Hn8McnoTHEL2LsQ/tracks";

export default async function handler(req, res) {
	const body = JSON.parse(req.body);

	if (
		req.query.uri.substring(0, 14) === "spotify:track:" &&
		!req.query.uri.includes(",")
	) {
		await fetch(
			"https://gldntwbfkilliyglkfgq.supabase.co/rest/v1/song-recommendation",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					apikey: process.env.SUPABASE_SECRET,
					Authorization: `Bearer ${process.env.SUPABASE_SECRET}`,
				},
				body: JSON.stringify({
					note: body.note,
					email: body.email,
					"song-title": body.songTitle,
					"spotify-uri": req.query.uri,
				}),
			},
		).catch((error) => console.log(error));

		const getTracks = await fetch(`${url}`, {
			headers: {
				Authorization: `Bearer ${await getUserAuthorizedToken()}`,
			},
		}).then((res) => res.json());

		const ids = getTracks.items.map((song) => song.track.id);

		if (!ids.includes(req.query.uri.substring(14))) {
			await fetch(`${url}?uris=${req.query.uri}`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${await getUserAuthorizedToken()}`,
				},
			}).then((res) => res.json());
		}
	}

	res.statusCode = 200;
	res.end();
}
