import { NextResponse } from "next/server";
import axios from "axios";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

export async function GET(request: Request) {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "";
    const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "";

    if (!apiKey || !channelId) {
        return NextResponse.json(
            { error: "YouTube API key or Channel ID not configured" },
            { status: 500 },
        );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "videos"; // "videos" | "live"
    const maxResults = parseInt(searchParams.get("maxResults") || "8", 10);

    try {
        if (type === "live") {
            const response = await axios.get(`${YOUTUBE_API_BASE}/search`, {
                params: {
                    key: apiKey,
                    channelId: channelId,
                    part: "snippet",
                    eventType: "live",
                    type: "video",
                    maxResults: 1,
                },
                headers: {
                    Referer: "https://p3ri.salmanitb.com/",
                },
            });

            const items = response.data.items;

            if (items && items.length > 0) {
                return NextResponse.json({
                    isLive: true,
                    liveVideoId: items[0].id.videoId,
                    liveTitle: items[0].snippet.title,
                });
            }

            return NextResponse.json({
                isLive: false,
                liveVideoId: null,
                liveTitle: null,
            });
        }

        // Default: fetch recent videos
        const searchResponse = await axios.get(`${YOUTUBE_API_BASE}/search`, {
            params: {
                key: apiKey,
                channelId: channelId,
                part: "snippet",
                order: "date",
                type: "video",
                maxResults,
            },
            headers: {
                Referer: "https://p3ri.salmanitb.com/",
            },
        });

        const items = searchResponse.data.items;

        if (!items || items.length === 0) {
            return NextResponse.json({ videos: [] });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const videos = items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl:
                item.snippet.thumbnails?.medium?.url ||
                item.snippet.thumbnails?.default?.url ||
                "",
            publishedAt: item.snippet.publishedAt,
            channelTitle: item.snippet.channelTitle,
        }));

        return NextResponse.json({ videos });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                "[YouTube API Route] Error:",
                error.response?.status,
                error.response?.data,
            );
            return NextResponse.json(
                {
                    error: "YouTube API request failed",
                    details: error.response?.data?.error?.message || error.message,
                },
                { status: error.response?.status || 500 },
            );
        }
        console.error("[YouTube API Route] Unknown error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
