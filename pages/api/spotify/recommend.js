import { getUserAuthorizedToken } from '../../../server/service/token';
import { mapToSongList } from '../../../server/map/song-search';

export default async function handler(req, res) {
  // single song only

  if (
    req.query.uri.substring(0, 14) == 'spotify:track:' &&
    !req.query.uri.includes(',')
  ) {
    const getTracks = await fetch(
      `https://api.spotify.com/v1/playlists/7uzJXp5Hn8McnoTHEL2LsQ/tracks?uris=${req.query.uri}`,
      {
        headers: {
          Authorization: `Bearer ${await getUserAuthorizedToken()}`,
        },
      }
    ).then((res) => res.json());
    console.log(getTracks);
    const ids = getTracks.items.map((song) => song.track.id);

    if (!ids.includes(req.query.uri.substring(14))) {
      const playlist = await fetch(
        `https://api.spotify.com/v1/playlists/7uzJXp5Hn8McnoTHEL2LsQ/tracks?uris=${req.query.uri}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await getUserAuthorizedToken()}`,
          },
        }
      ).then((res) => res.json());

      console.log(playlist);
    }
  }

  res.statusCode = 200;
  res.end();
}
