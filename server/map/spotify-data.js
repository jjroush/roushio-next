export const mapToArtists = ({ items }) =>
  items.map((artist) => ({
    name: artist.name,
    image: artist.images[2].url,
    genres: artist.genres,
  }));
