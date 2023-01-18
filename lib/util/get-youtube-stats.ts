import axios from "axios";
import { YouTubeChannelResponse } from "types/youtube";

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

export const getYoutubeStats = async (): Promise<YouTubeChannelResponse> => {
  try {
    const res = await axios.get<YouTubeChannelResponse>(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
