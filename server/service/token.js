export const getClientCredentialToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${process.env.SPOTIFY_SECRET}`,
    },
  }).then((res) => res.json());

  return response.access_token;
};

export const getUserAuthorizedToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: `grant_type=refresh_token&refresh_token=${process.env.USER_REFRESH_TOKEN}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${process.env.SPOTIFY_SECRET}`,
    },
  }).then((res) => res.json());

  return response.access_token;
};
