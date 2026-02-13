"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { YouTubeVideo } from "@/lib/youtube";
import LiveBadge from "./LiveBadge";

interface PlaylistSidebarProps {
    videos: YouTubeVideo[];
    activeVideoId: string;
    onVideoSelect: (video: YouTubeVideo) => void;
    liveVideoId?: string | null;
}

export default function PlaylistSidebar({
    videos,
    activeVideoId,
    onVideoSelect,
    liveVideoId,
}: PlaylistSidebarProps) {
    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h3 className="font-forum text-xl text-foreground md:text-2xl">
                    Playlist Video
                </h3>
                <span className="rounded-full bg-background-section px-3 py-1 font-montserrat text-xs font-semibold text-text-muted">
                    {videos.length} video
                </span>
            </div>

            {/* Video List — Desktop: vertical scroll, Mobile: horizontal scroll */}
            <div className="hidden-scrollbar -mr-2 flex flex-col gap-2 overflow-y-auto pr-2 md:max-h-[520px] lg:max-h-[560px]">
                {videos.map((video) => {
                    const isActive = video.id === activeVideoId;
                    const isLive = video.id === liveVideoId;

                    return (
                        <button
                            key={video.id}
                            onClick={() => onVideoSelect(video)}
                            className={cn(
                                "group flex w-full items-start gap-3 rounded-xl border-2 p-2.5 text-left transition-all duration-200",
                                isActive
                                    ? "border-accent bg-accent/10 shadow-sm"
                                    : "border-transparent bg-white hover:border-border hover:bg-background-section/50 hover:shadow-sm",
                            )}
                            aria-current={isActive ? "true" : undefined}
                        >
                            {/* Thumbnail */}
                            <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg md:h-[72px] md:w-32">
                                <Image
                                    src={video.thumbnailUrl}
                                    alt={video.title}
                                    fill
                                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                                    sizes="128px"
                                />
                                {isLive && (
                                    <div className="absolute bottom-1 left-1">
                                        <LiveBadge size="sm" />
                                    </div>
                                )}
                                {isActive && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                        <div className="flex items-center gap-0.5">
                                            <span className="inline-block h-3 w-0.5 animate-pulse rounded-full bg-white" />
                                            <span
                                                className="inline-block h-4 w-0.5 animate-pulse rounded-full bg-white"
                                                style={{ animationDelay: "0.15s" }}
                                            />
                                            <span
                                                className="inline-block h-2.5 w-0.5 animate-pulse rounded-full bg-white"
                                                style={{ animationDelay: "0.3s" }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                                <p
                                    className={cn(
                                        "line-clamp-2 font-montserrat text-sm font-semibold leading-tight",
                                        isActive ? "text-accent-foreground" : "text-foreground",
                                    )}
                                >
                                    {video.title}
                                </p>
                                <span className="font-montserrat text-xs text-text-muted">
                                    {new Date(video.publishedAt).toLocaleDateString("id-ID", {
                                        weekday: "short",
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Mobile: Horizontal scroll */}
            <div className="hidden-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-2 md:hidden">
                {videos.map((video) => {
                    const isActive = video.id === activeVideoId;
                    const isLive = video.id === liveVideoId;

                    return (
                        <button
                            key={video.id}
                            onClick={() => onVideoSelect(video)}
                            className={cn(
                                "flex w-40 flex-shrink-0 flex-col gap-2 rounded-xl border-2 p-2 text-left transition-all",
                                isActive
                                    ? "border-accent bg-accent/10 shadow-sm"
                                    : "border-transparent bg-white hover:border-border",
                            )}
                        >
                            <div className="relative h-20 w-full overflow-hidden rounded-lg">
                                <Image
                                    src={video.thumbnailUrl}
                                    alt={video.title}
                                    fill
                                    className="object-cover"
                                    sizes="160px"
                                />
                                {isLive && (
                                    <div className="absolute bottom-1 left-1">
                                        <LiveBadge size="sm" />
                                    </div>
                                )}
                            </div>
                            <p className="line-clamp-2 font-montserrat text-xs font-semibold leading-tight text-foreground">
                                {video.title}
                            </p>
                            <span className="font-montserrat text-[10px] text-text-muted">
                                {new Date(video.publishedAt).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
