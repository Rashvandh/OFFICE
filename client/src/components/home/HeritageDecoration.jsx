export default function HeritageDecoration() {
  return (
    <>
      {/* Subtle Upper-Right Botanical Leaves */}
      <svg
        viewBox="0 0 200 150"
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-2 h-28 w-40 scale-x-[-1] text-[#000000]/15 sm:h-36 sm:w-48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M12 10 C45 36, 75 64, 118 102" />
        <path
          d="M36 28 C18 40, 14 58, 28 70 C46 64, 52 44, 36 28 Z"
          fill="#C02B0B"
          fillOpacity="0.06"
        />
        <path
          d="M66 54 C56 26, 72 12, 92 24 C92 44, 80 56, 66 54 Z"
          fill="#C02B0B"
          fillOpacity="0.06"
        />
        <path
          d="M92 78 C74 90, 70 108, 86 118 C104 110, 108 92, 92 78 Z"
          fill="#C02B0B"
          fillOpacity="0.05"
        />
      </svg>

      {/* Bottom-Left South Indian Village & Countryside Line Art */}
      <svg
        viewBox="0 0 360 120"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-0 hidden h-28 w-80 text-[#000000]/22 md:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Left Palm Tree */}
        <path d="M28 112 Q32 72 38 42" />
        <path d="M38 42 Q20 34 10 44" />
        <path d="M38 42 Q24 26 16 24" />
        <path d="M38 42 Q44 24 56 28" />
        <path d="M38 42 Q54 38 64 48" />
        {/* Village Tiled-Roof House */}
        <path d="M74 76 L124 50 L176 76 Z" />
        <path d="M84 76 L84 106 L166 106 L166 76" />
        <path d="M116 106 L116 86 L132 86 L132 106" />
        <rect x="92" y="84" width="12" height="10" />
        <rect x="142" y="84" width="12" height="10" />
        {/* Right Palm Trees */}
        <path d="M214 112 Q210 78 206 52" />
        <path d="M206 52 Q192 44 184 52" />
        <path d="M206 52 Q200 36 212 34" />
        <path d="M206 52 Q222 42 230 52" />
        <path d="M248 112 Q246 84 244 64" />
        <path d="M244 64 Q232 58 226 64" />
        <path d="M244 64 Q242 50 252 50" />
        <path d="M244 64 Q258 58 264 66" />
        {/* Countryside Horizon */}
        <path d="M4 112 Q160 107 348 114" />
      </svg>

      {/* Organic Vermilion Curved Border Along Bottom */}
      <svg
        viewBox="0 0 1440 44"
        aria-hidden="true"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 left-0 h-6 w-full text-[#C02B0B] sm:h-9"
      >
        <path
          d="M0,12 C280,44 580,44 820,40 C1080,36 1280,28 1440,6 L1440,44 L0,44 Z"
          fill="currentColor"
        />
      </svg>
    </>
  );
}
