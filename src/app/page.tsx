import Sparkle from "../components/Sparkle";

const COMING = [..."Coming"];

export default function Home() {
  return (
    <main
      id="main-content"
      className="coming-soon relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      {/* Snow drifts, light arcs, and grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
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

      <header className="px-6 pt-8 md:px-12 md:pt-10">
        <p className="font-montserrat text-olive text-xs font-semibold tracking-[0.2em] uppercase md:text-sm">
          P3RI Masjid Salman ITB
        </p>
      </header>

      <section
        aria-labelledby="coming-soon-heading"
        className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center"
      >
        <h1
          id="coming-soon-heading"
          aria-label="Coming Soon"
          className="title-glow text-navy flex flex-col items-center leading-none"
        >
          <span aria-hidden="true" className="display-word flex items-end">
            {COMING.map((letter, i) => {
              // Bend the word along a gentle arch: middle letters rise, ends tip outward.
              const t =
                (i - (COMING.length - 1) / 2) / ((COMING.length - 1) / 2);
              return (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    transform: `translateY(${t * t * 0.14}em) rotate(${t * 6}deg)`,
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </span>
          <span aria-hidden="true" className="display-word mt-[0.08em]">
            Soon
          </span>
        </h1>

        <p className="font-montserrat text-olive mt-4 max-w-sm text-sm leading-relaxed font-medium md:text-base">
          Di tengah musim dingin, kami sedang menyiapkan rumah hangat untuk
          berkumpul kembali. Nantikan program Ramadhan dan Idul Adha bersama
          P3RI Salman ITB.
        </p>
      </section>

      <footer className="px-6 pb-8 text-center md:px-12 md:pb-10">
        <a
          href="https://www.instagram.com/salmanitb"
          target="_blank"
          rel="noopener noreferrer"
          className="font-montserrat text-navy/80 hover:text-navy focus-visible:outline-navy text-xs font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 md:text-sm"
        >
          Ikuti kabar terbaru di @salmanitb
        </a>
      </footer>
    </main>
  );
}
