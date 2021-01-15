const getDurationInMinutesFromTracks = (items) =>
  Math.floor(
    items
      .map(({ track }) => track.duration_ms)
      .reduce((accumulator, currentValue) => accumulator + currentValue) / 60000
  );

export const mapToArtists = ({ items }) =>
  items.map((artist) => ({
    name: artist.name,
    image: artist.images[2].url,
    url: artist.external_urls.spotify,
    genres: artist.genres,
  }));

export const mapToPlaylist = (items) =>
  items.map((playlist) => ({
    name: playlist.name,
    fathomId: playlist.fathomId,
    url: playlist.external_urls.spotify,
    description: playlist.description,
    image: playlist.images[0].url,
    duration: getDurationInMinutesFromTracks(playlist.tracks.items),
  }));
