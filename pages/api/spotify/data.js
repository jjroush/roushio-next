import { getUserAuthorizedToken } from '../../../server/service/token';
import { mapToArtists, mapToPlaylist } from '../../../server/map/spotify-data';
import { curatedPlaylistIds } from '../../../data/spotify';

// personalization api - get genres
// get 3 playlist
export default async function handler(req, res) {
  // const response = await fetch(`https://api.spotify.com/v1/me/top/tracks`, {
  //   headers: {
  //     Authorization: `Bearer ${await getUserAuthorizedToken()}`,
  //   },
  // }).then((res) => res.json());

  const topArtists = await fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=6`,
    {
      headers: {
        Authorization: `Bearer ${await getUserAuthorizedToken()}`,
      },
    }
  ).then((res) => res.json());

  const playlist = await Promise.all(
    curatedPlaylistIds.map(async (id) =>
      fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: {
          Authorization: `Bearer ${await getUserAuthorizedToken()}`,
        },
      }).then((res) => res.json())
    )
  );
  console.log(playlist);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      topArtists: mapToArtists(topArtists),
      curatedPlaylists: mapToPlaylist(playlist),
    })
  );
}
