"use client";

import { useState, useEffect, useCallback } from "react";
import { ExternalLink, Youtube, Loader2 } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import PlaylistSidebar from "./PlaylistSidebar";
import {
    fetchLivePageData,
    type YouTubeVideo,
    type LiveStatus,
} from "@/lib/youtube";

// Fallback data for initial render / loading state
const INITIAL_LIVE_STATUS: LiveStatus = {
    isLive: false,
    liveVideoId: null,
    liveTitle: null,
};

interface LivePageClientProps {
    channelUrl: string;
}

export default function LivePageClient({ channelUrl }: LivePageClientProps) {
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [liveStatus, setLiveStatus] = useState<LiveStatus>(INITIAL_LIVE_STATUS);
    const [currentVideo, setCurrentVideo] = useState<YouTubeVideo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data on mount (client-side to respect API key referrer restrictions)
    useEffect(() => {
        async function loadData() {
            try {
                setIsLoading(true);
                setError(null);
                const data = await fetchLivePageData();
                setVideos(data.videos);
                setLiveStatus(data.liveStatus);

                // Set initial video: prefer live stream, else first video
                if (data.liveStatus.isLive && data.liveStatus.liveVideoId) {
                    const liveVideo = data.videos.find(
                        (v) => v.id === data.liveStatus.liveVideoId,
                    ) || {
                        id: data.liveStatus.liveVideoId,
                        title: data.liveStatus.liveTitle || "Live Stream",
                        description: "",
                        thumbnailUrl: `https://img.youtube.com/vi/${data.liveStatus.liveVideoId}/mqdefault.jpg`,
                        publishedAt: new Date().toISOString(),
                        channelTitle: "Salman ITB",
                    };
                    setCurrentVideo(liveVideo);
                } else if (data.videos.length > 0) {
                    setCurrentVideo(data.videos[0] || null);
                }
            } catch (err) {
                console.error("[LivePage] Failed to load data:", err);
                setError("Gagal memuat video. Silakan coba lagi.");
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    const handleVideoSelect = useCallback((video: YouTubeVideo) => {
        setCurrentVideo(video);
        // Scroll to top of player on mobile
        if (window.innerWidth < 768) {
            const playerEl = document.getElementById("live-player-section");
            if (playerEl) {
                playerEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, []);

    const isCurrentLive =
        liveStatus.isLive &&
        currentVideo !== null &&
        currentVideo.id === liveStatus.liveVideoId;

    // Loading state
    if (isLoading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="font-montserrat text-sm font-medium text-text-muted">
                        Memuat video...
                    </p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="text-center">
                    <Youtube className="mx-auto mb-4 h-16 w-16 text-text-muted opacity-40" />
                    <h2 className="mb-2 font-forum text-2xl text-foreground">
                        Terjadi Kesalahan
                    </h2>
                    <p className="mb-4 font-montserrat text-sm text-text-muted">
                        {error}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-full bg-primary px-6 py-2 font-montserrat text-sm font-bold text-white transition-all hover:bg-primary/90"
                    >
                        Muat Ulang
                    </button>
                </div>
            </div>
        );
    }

    // Empty state
    if (!videos.length || !currentVideo) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="text-center">
                    <Youtube className="mx-auto mb-4 h-16 w-16 text-text-muted opacity-40" />
                    <h2 className="mb-2 font-forum text-2xl text-foreground">
                        Belum Ada Video
                    </h2>
                    <p className="font-montserrat text-sm text-text-muted">
                        Video akan muncul di sini setelah diupload ke channel YouTube.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Main Player — 2/3 width on desktop */}
            <div id="live-player-section" className="lg:col-span-2">
                <VideoPlayer
                    videoId={currentVideo.id}
                    title={currentVideo.title}
                    publishedAt={currentVideo.publishedAt}
                    isLive={isCurrentLive}
                />

                {/* CTA Button */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                        href={`https://www.youtube.com/watch?v=${currentVideo.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 font-montserrat text-sm font-bold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg"
                    >
                        <Youtube size={18} />
                        Lihat di YouTube
                        <ExternalLink size={14} />
                    </a>
                    <a
                        href={channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-accent bg-accent/10 px-5 py-2.5 font-montserrat text-sm font-bold text-accent-foreground transition-all hover:bg-accent hover:shadow-md"
                    >
                        Channel Salman ITB
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>

            {/* Sidebar — 1/3 width on desktop */}
            <div className="lg:col-span-1">
                <div className="rounded-2xl border bg-card p-4 shadow-sm lg:sticky lg:top-24">
                    <PlaylistSidebar
                        videos={videos}
                        activeVideoId={currentVideo.id}
                        onVideoSelect={handleVideoSelect}
                        liveVideoId={liveStatus.liveVideoId}
                    />
                </div>
            </div>
        </div>
    );
}
