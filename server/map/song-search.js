export const mapToSongList = (items) =>
	items.map((item) => ({
		title: item.name,
		artists: item.artists.map((artist) => artist.name),
		uri: item.uri,
		image: item.album.images[1].url,
	}));
