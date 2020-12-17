import { getUserAuthorizedToken } from "../../../server/service/token";
import { mapToArtists } from "../../../server/map/spotify-data";
// personalization api - get genres
// get 3 playlist
export default async function handler(req, res) {
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks`, {
    headers: {
      Authorization: `Bearer ${await getUserAuthorizedToken()}`,
    },
  }).then((res) => res.json());

  const topArtists = await fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=5`,
    {
      headers: {
        Authorization: `Bearer ${await getUserAuthorizedToken()}`,
      },
    }
  ).then((res) => res.json());
  console.log(JSON.stringify(response));

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      topArtists: mapToArtists(topArtists),
    })
  );
}
