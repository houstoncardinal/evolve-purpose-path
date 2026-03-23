const AnnouncementBar = () => (
  <div
    className="fixed top-0 left-0 right-0 z-[60] h-10 flex items-center justify-center px-4"
    style={{ background: "linear-gradient(90deg, #1a0a12, #2a0d1a, #1a0a12)", borderBottom: "1px solid rgba(255,45,170,0.2)" }}
  >
    <p className="text-[11px] font-semibold text-white/70 text-center leading-tight">
      <span className="text-[#FF2DAA] font-bold mr-1.5">New Launch</span>
      This platform recently launched — we're making powerful upgrades for the community. Spotted an error or have a suggestion?{" "}
      <a
        href="mailto:Info@Evolve2Purpose.com"
        className="text-[#FF2DAA] hover:text-white transition-colors underline underline-offset-2"
      >
        Info@Evolve2Purpose.com
      </a>
    </p>
  </div>
);

export default AnnouncementBar;
