import { getClientCredentialToken } from "../../../server/service/token";
import { mapToSongList } from "../../../server/map/song-search";

export default async function handler(req, res) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${req.query.q}&type=track&limit=8`,
    {
      headers: {
        Authorization: `Bearer ${await getClientCredentialToken()}`,
      },
    }
  ).then((res) => res.json());
  console.log(response.tracks.items[0].album.images[1]);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(mapToSongList(response.tracks.items)));
}
