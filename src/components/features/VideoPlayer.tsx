"use client";

import LiveBadge from "./LiveBadge";

interface VideoPlayerProps {
    videoId: string;
    title: string;
    publishedAt: string;
    isLive?: boolean;
}

export default function VideoPlayer({
    videoId,
    title,
    publishedAt,
    isLive = false,
}: VideoPlayerProps) {
    const formattedDate = new Date(publishedAt).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const formattedTime = new Date(publishedAt).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    });

    return (
        <div className="flex flex-col gap-4">
            {/* Video Embed */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-lg">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>

                {/* Live Badge Overlay */}
                {isLive && (
                    <div className="absolute left-3 top-3 z-10">
                        <LiveBadge />
                    </div>
                )}
            </div>

            {/* Video Info */}
            <div className="flex flex-col gap-1.5 px-1">
                <h2 className="font-forum text-xl leading-tight text-foreground md:text-2xl lg:text-3xl">
                    {title}
                </h2>
                <p className="font-montserrat text-sm font-medium text-text-muted md:text-base">
                    {formattedDate} • {formattedTime}
                </p>
            </div>
        </div>
    );
}
