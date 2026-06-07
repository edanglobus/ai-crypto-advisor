// Styled app background: soft brand-coloured glows + a translucent gradient
// logo mark (coin + uptrend), sitting behind all content.
export function BackgroundLogo() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* soft colour glows */}
      <div className="absolute -left-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-brand/20 blur-3xl" />
      <div className="absolute -bottom-48 -right-40 h-[40rem] w-[40rem] rounded-full bg-sky-300/25 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-indigo-200/30 blur-3xl" />

      {/* centered logo mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 200 200" fill="none" className="h-[64vmin] w-[64vmin] opacity-[0.12]">
          <defs>
            <linearGradient id="bg-logo-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0071e3" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="90" stroke="url(#bg-logo-grad)" strokeWidth="4" />
          <polyline
            points="48,138 84,102 108,124 150,66"
            stroke="url(#bg-logo-grad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="123,66 150,66 150,93"
            stroke="url(#bg-logo-grad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
