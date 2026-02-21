"use client";

import { cn } from "@/lib/utils";

interface LiveBadgeProps {
    className?: string;
    size?: "sm" | "md";
}

export default function LiveBadge({
    className,
    size = "md",
}: LiveBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-md bg-red-600 font-montserrat font-bold uppercase tracking-wider text-white shadow-lg",
                size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
                className,
            )}
        >
            <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            LIVE
        </span>
    );
}
