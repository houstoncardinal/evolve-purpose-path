const AnnouncementBar = () => (
  <div
    className="fixed top-0 left-0 right-0 z-[60] h-11 flex items-center justify-center px-4"
    style={{
      background: "linear-gradient(90deg, #1a0a12 0%, #2d0e1e 40%, #2d0e1e 60%, #1a0a12 100%)",
      borderBottom: "1px solid rgba(255,45,170,0.25)",
    }}
  >
    {/* Subtle left glow */}
    <div
      className="absolute left-0 top-0 h-full w-32 pointer-events-none"
      style={{ background: "linear-gradient(90deg, rgba(255,45,170,0.08), transparent)" }}
    />
    {/* Subtle right glow */}
    <div
      className="absolute right-0 top-0 h-full w-32 pointer-events-none"
      style={{ background: "linear-gradient(270deg, rgba(255,45,170,0.08), transparent)" }}
    />

    <p className="relative z-10 text-[11px] font-semibold text-white/70 text-center leading-tight tracking-wide">
      {/* Pulse dot */}
      <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle animate-pulse" style={{ background: "#FF2DAA" }} />

      <span className="text-[#FF2DAA] font-bold">New Launch</span>

      {/* Mobile: short version */}
      <span className="sm:hidden">
        {" "}— Feedback?{" "}
        <a
          href="mailto:Info@Evolve2Purpose.com"
          className="text-[#FF2DAA] hover:text-white transition-colors underline underline-offset-2 font-bold"
        >
          Email us
        </a>
      </span>

      {/* Desktop: full version */}
      <span className="hidden sm:inline">
        {" "}— We're making powerful upgrades for the community. Spotted an issue or have a suggestion?{" "}
        <a
          href="mailto:Info@Evolve2Purpose.com"
          className="text-[#FF2DAA] hover:text-white transition-colors underline underline-offset-2"
        >
          Info@Evolve2Purpose.com
        </a>
      </span>
    </p>
  </div>
);

export default AnnouncementBar;
