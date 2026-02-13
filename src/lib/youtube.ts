export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  channelTitle: string;
}

export interface LiveStatus {
  isLive: boolean;
  liveVideoId: string | null;
  liveTitle: string | null;
}

interface LivePageData {
  videos: YouTubeVideo[];
  liveStatus: LiveStatus;
}

/**
 * Returns the YouTube channel URL based on the configured channel ID.
 */
export function getChannelUrl(): string {
  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "";
  return channelId
    ? `https://www.youtube.com/channel/${channelId}`
    : "https://www.youtube.com";
}

/**
 * Fetches both the live status and recent videos from the internal API route.
 * Intended to be called client-side.
 */
export async function fetchLivePageData(): Promise<LivePageData> {
  const [liveRes, videosRes] = await Promise.all([
    fetch("/api/youtube?type=live"),
    fetch("/api/youtube?type=videos&maxResults=8"),
  ]);

  if (!liveRes.ok) {
    throw new Error(`Failed to fetch live status: ${liveRes.statusText}`);
  }
  if (!videosRes.ok) {
    throw new Error(`Failed to fetch videos: ${videosRes.statusText}`);
  }

  const liveData = (await liveRes.json()) as LiveStatus;
  const videosData = (await videosRes.json()) as { videos: YouTubeVideo[] };

  return {
    liveStatus: {
      isLive: liveData.isLive,
      liveVideoId: liveData.liveVideoId,
      liveTitle: liveData.liveTitle,
    },
    videos: videosData.videos || [],
  };
}
