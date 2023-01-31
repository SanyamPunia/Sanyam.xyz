import axios from "axios";
import { ARTIST_ID } from "lib/constants";
import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const token = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const ARTIST_ENDPOINT = "https://api.spotify.com/v1/artists/";
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const res = await axios.post<{ access_token: string }>(
    TOKEN_ENDPOINT,
    querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
    {
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res.data.access_token;
};

export const getArtist = async () => {
  const access_token: string = await getAccessToken();
  const artistId: string = "2QbtOIjb8mUIsnCNqvyWAW";
  // 2QbtOIjb8mUIsnCNqvyWAW

  const response = await axios.get(ARTIST_ENDPOINT + artistId, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.data;
};

export default async function spotifyGetData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getArtist();

  return res.status(200).json(response);
}
