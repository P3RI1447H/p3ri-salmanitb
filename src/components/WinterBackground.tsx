import Sparkle from "./Sparkle";

/** Snow drifts, light arcs, grain and sparkles behind every page. */
export default function WinterBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="snow-drift absolute -top-[12%] -left-[18%] h-[70%] w-[75%] rotate-[-18deg] rounded-[50%]" />
      <div className="snow-drift absolute -right-[22%] bottom-[-14%] h-[62%] w-[80%] rotate-[-24deg] rounded-[50%]" />
      <div className="snow-drift snow-drift-soft absolute top-[38%] -left-[25%] h-[34%] w-[60%] rotate-[12deg] rounded-[50%]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path
          d="M-80 140 C 260 120, 620 360, 1080 900"
          fill="none"
          stroke="white"
          strokeOpacity="0.4"
          strokeWidth="28"
          strokeLinecap="round"
        />
        <path
          d="M-60 40 C 360 -10, 880 80, 1080 40"
          fill="none"
          stroke="white"
          strokeOpacity="0.35"
          strokeWidth="18"
          strokeLinecap="round"
        />
      </svg>

      <div className="grain absolute inset-0" />

      <Sparkle className="absolute top-[14%] right-[12%] h-20 w-20 md:h-28 md:w-28" />
      <Sparkle className="absolute top-[30%] right-[24%] h-10 w-10 md:h-14 md:w-14" />
      <Sparkle className="absolute bottom-[18%] left-[10%] h-12 w-12 md:h-16 md:w-16" />
      <Sparkle
        variant="star"
        className="absolute top-[22%] left-[14%] h-16 w-16 md:h-24 md:w-24"
      />
    </div>
  );
}
