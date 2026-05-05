import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  green: "#3D7A45",
  greenDark: "#2d5e34",
  greenLight: "#5a9b63",
  cream: "#F5DEC8",
  dark: "#1a2e1c",
  muted: "#4a5e4b",
  white: "#FFFFFF",
  paper: "#FFF8F2",
};

const FONTS = {
  display: "'Playfair Display', serif",
  body: "'Montserrat', sans-serif",
};

const GS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Montserrat:wght@200;300;400;500&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Montserrat', sans-serif; background: #F5DEC8; overflow-x: hidden; }

  ::selection { background: #3D7A45; color: white; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #F5DEC8; }
  ::-webkit-scrollbar-thumb { background: #3D7A45; border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideRight {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(0.95); opacity: 0.6; }
    50%  { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(0.95); opacity: 0.6; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes leafDrift {
    0%   { transform: translate3d(0, 0, 0) rotate(-16deg) scale(1); }
    50%  { transform: translate3d(14px, -18px, 0) rotate(-11deg) scale(1.04); }
    100% { transform: translate3d(0, 0, 0) rotate(-16deg) scale(1); }
  }
  @keyframes leafDriftAlt {
    0%   { transform: translate3d(0, 0, 0) rotate(18deg) scale(1); }
    50%  { transform: translate3d(-12px, 16px, 0) rotate(24deg) scale(0.96); }
    100% { transform: translate3d(0, 0, 0) rotate(18deg) scale(1); }
  }

  .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
  .fade-up.d1 { transition-delay: 0.1s; }
  .fade-up.d2 { transition-delay: 0.2s; }
  .fade-up.d3 { transition-delay: 0.3s; }
  .fade-up.d4 { transition-delay: 0.4s; }
  .fade-up.d5 { transition-delay: 0.5s; }
`;

const CONTACT_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/zeekarhcosmetics?igsh=MTI1Y2E1MTFzemxjMg==",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@zeekarhcosmetics?_r=1&_t=ZS-95HpJgzxL3B",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 4v8.5a4.5 4.5 0 1 1-4.5-4.5" />
        <path d="M14 4c1 2 2.8 3.2 5 3.4" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/447901714126",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 11.5A8.5 8.5 0 0 1 7.5 19l-3.5 1 1-3.3A8.5 8.5 0 1 1 20 11.5Z" />
        <path d="M9.3 8.8c.2-.4.3-.4.6-.4h.5c.2 0 .4 0 .5.3l.7 1.7c.1.3 0 .4-.1.6l-.3.4c-.1.1-.2.3-.1.5.2.5.7 1 1.2 1.4.5.4 1.1.8 1.7 1 .2.1.4.1.5 0l.4-.4c.2-.2.3-.2.6-.1l1.6.7c.3.1.3.2.3.5v.5c0 .3 0 .4-.4.6-.4.2-1.3.5-2.2.3-.9-.2-2.1-.8-3.2-1.9-1.1-1.1-1.8-2.2-2-3.1-.2-.9.1-1.8.3-2.1Z" />
      </svg>
    ),
  },
  {
    label: "Call",
    href: "tel:+442045423996",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.4 19.4 0 0 1 5.2 12a19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4 1.2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 2.9a2 2 0 0 1-.5 2.1L8 9.2a16 16 0 0 0 6.8 6.8l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.9.7 2.9.8a2 2 0 0 1 1.7 1.9Z" />
      </svg>
    ),
  },
];

const LEAF_SVG_TEMPLATE = (color) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="675 688 900 873">
    <path fill="${color}" d="M 1559.539062 698.144531 C 1533.050781 716.425781 1491.136719 735.375 1441.511719 751.476562 C 1394.738281 766.738281 1368.753906 773.28125 1240.167969 802.800781 C 1124.824219 829.300781 1063.46875 849.089844 1002.109375 880.117188 C 945.609375 908.464844 907.050781 936.472656 864.46875 980.082031 C 783.496094 1062.597656 738.898438 1173.628906 738.898438 1292.207031 L 738.898438 1323.070312 L 754.992188 1302.269531 C 783.160156 1266.546875 798.582031 1249.273438 840.160156 1207.84375 C 895.316406 1152.664062 944.941406 1111.910156 1002.945312 1073.667969 C 1077.71875 1024.359375 1166.066406 981.589844 1251.066406 953.582031 C 1281.578125 943.515625 1310.746094 934.796719 1311.585938 935.632812 C 1311.921875 936.136719 1304.042969 939.996094 1294.152344 944.523438 C 1223.90625 976.390625 1147.125 1018.992188 1088.445312 1058.40625 C 943.933594 1155.515625 825.40625 1279.460938 730.851562 1431.917969 C 703.695312 1475.863281 675.195312 1531.710938 675.195312 1541.273438 C 675.195312 1547.144531 681.398438 1555.695312 687.765625 1558.714844 C 692.292969 1560.894531 694.976562 1561.0625 699.835938 1559.890625 C 706.039062 1558.378906 706.207031 1558.042969 714.925781 1535.738281 C 725.488281 1508.398438 733.199219 1491.796875 745.269531 1469.488281 C 754.324219 1452.714844 774.945312 1419.171875 780.476562 1411.960938 L 783.328125 1408.269531 L 808.808594 1416.488281 C 894.140625 1444.496094 989.535156 1452.214844 1073.691406 1438.292969 C 1224.410156 1413.300781 1350.144531 1322.734375 1437.824219 1175.976562 C 1508.742188 1057.566406 1550.484375 917.019531 1570.265625 730.679688 C 1572.277344 712.734375 1574.125 695.960938 1574.625 693.277344 C 1574.960938 690.761719 1574.792969 688.75 1574.125 688.75 C 1573.453125 688.75 1566.914062 692.941406 1559.539062 698.144531 Z"/>
  </svg>`;

const LEAF_GREENS = ["#3D7A45", "#2d5e34", "#5a9b63", "#4a7c52", "#6aab6e", "#2a5230", "#7bbf7f"];
const LEAF_DATA_URLS = LEAF_GREENS.map((color) => `data:image/svg+xml;utf8,${encodeURIComponent(LEAF_SVG_TEMPLATE(color))}`);

function FloatingLeaves() {
  const [leaves, setLeaves] = useState([]);
  const counter = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    function spawnLeaf() {
      const id = counter.current++;
      const size = 10 + Math.random() * 22;
      const left = Math.random() * 100;
      const duration = 6 + Math.random() * 10;
      const rotation = Math.random() * 360;
      const rotDir = Math.random() > 0.5 ? 1 : -1;
      const swayAmt = 18 + Math.random() * 30;
      const colorIndex = Math.floor(Math.random() * LEAF_GREENS.length);
      const opacity = 0.1 + Math.random() * 0.28;
      const travelPx = (containerRef.current ? containerRef.current.offsetHeight : 600) + size + 20;

      setLeaves((prev) => [
        ...prev,
        { id, size, left, duration, rotation, rotDir, swayAmt, colorIndex, opacity, travelPx },
      ]);

      setTimeout(() => {
        setLeaves((prev) => prev.filter((leaf) => leaf.id !== id));
      }, duration * 1000 + 200);
    }

    for (let index = 0; index < 12; index++) {
      setTimeout(spawnLeaf, index * 400);
    }

    const interval = setInterval(spawnLeaf, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <style>{`
        @keyframes leafRise {
          0%   { transform: translateY(0px) translateX(0) rotate(var(--r0)) scale(1); opacity: 0; }
          8%   { opacity: var(--op); }
          50%  { transform: translateY(var(--half)) translateX(var(--sx)) rotate(var(--r1)) scale(0.95); opacity: var(--op); }
          92%  { opacity: var(--op); }
          100% { transform: translateY(var(--full)) translateX(0) rotate(var(--r2)) scale(0.85); opacity: 0; }
        }
      `}</style>
      {leaves.map((leaf) => (
        <img
          key={leaf.id}
          aria-hidden="true"
          src={LEAF_DATA_URLS[leaf.colorIndex]}
          width={leaf.size}
          height={leaf.size}
          style={{
            position: "absolute",
            bottom: 0,
            left: `${leaf.left}%`,
            pointerEvents: "none",
            animation: `leafRise ${leaf.duration}s linear forwards`,
            "--r0": `${leaf.rotation}deg`,
            "--r1": `${leaf.rotation + leaf.rotDir * 45}deg`,
            "--r2": `${leaf.rotation + leaf.rotDir * 90}deg`,
            "--sx": `${leaf.swayAmt}px`,
            "--op": leaf.opacity,
            "--half": `-${leaf.travelPx * 0.5}px`,
            "--full": `-${leaf.travelPx}px`,
          }}
        />
      ))}
    </div>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { setVisible(e.isIntersecting); }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => {
      obs.unobserve(el);
      obs.disconnect();
    };
  }, []);
  return [ref, visible];
}

function AnimBlock({ children, delay = "", className = "", style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`fade-up${delay ? " " + delay : ""}${className ? " " + className : ""}${visible ? " visible" : ""}`} style={style}>
      {children}
    </div>
  );
}

function DecorativeHeroCircles() {
  return (
    <>
      <div className="hero-bg-circle" style={{ width: 420, height: 420, right: -120, top: -120, zIndex: 0 }} />
      <div className="hero-bg-circle" style={{ width: 240, height: 240, left: -60, bottom: 40, zIndex: 0 }} />
    </>
  );
}

function EditorialPageShell({
  eyebrow,
  title,
  intro,
  children,
  ctaLabel,
  onCtaClick,
  secondaryCtaLabel,
  onSecondaryCtaClick,
}) {
  return (
    <>
      <style>{`
        .editorial-page {
          background: #FFF8F2;
          min-height: 70svh;
        }
        .editorial-hero {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 85% 20%, rgba(61,122,69,0.2) 0%, rgba(61,122,69,0) 34%),
            linear-gradient(180deg, #1a2e1c 0%, #233926 100%);
          padding: 5.6rem 2rem 2rem;
        }
        .editorial-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }
        .editorial-eyebrow {
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(245,222,200,0.38);
          font-weight: 300;
          margin-bottom: 1.2rem;
        }
        .editorial-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-style: italic;
          font-weight: 400;
          color: #F5DEC8;
          line-height: 1.12;
          margin-bottom: 1rem;
        }
        .editorial-intro {
          max-width: 560px;
          margin: 0 auto;
          font-size: 0.86rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(245,222,200,0.52);
        }
        .editorial-card-wrap {
          margin-top: -0.6rem;
          padding: 0 2rem 3.6rem;
          position: relative;
          z-index: 2;
        }
        .editorial-card {
          max-width: 900px;
          margin: 0 auto;
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(61,122,69,0.1);
          box-shadow: 0 24px 80px rgba(26,46,28,0.1);
          backdrop-filter: blur(14px);
          border-radius: 28px;
          overflow: hidden;
        }
        .editorial-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.66rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F5DEC8;
          background: #1a2e1c;
          border: 1px solid rgba(61,122,69,0.45);
          padding: 0.86rem 1.7rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .editorial-btn:hover {
          color: white;
          background: #3D7A45;
          border-color: #3D7A45;
          transform: translateY(-1px);
        }
        .editorial-btn.ghost {
          color: #1a2e1c;
          background: rgba(61,122,69,0.08);
          border-color: rgba(61,122,69,0.26);
        }
        .editorial-btn.ghost:hover {
          color: #1a2e1c;
          background: rgba(61,122,69,0.16);
          border-color: rgba(61,122,69,0.42);
        }
        .editorial-card-header {
          padding: 2rem 2rem 0;
          display: flex;
          justify-content: center;
        }
        .editorial-mark {
          width: 70px;
          height: 70px;
          opacity: 0.26;
        }
        .editorial-card-body {
          padding: 1rem 2rem 2.5rem;
        }
        .editorial-rich {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }
        .editorial-rich p {
          font-size: 0.84rem;
          line-height: 1.95;
          color: #4a5e4b;
          font-weight: 300;
        }
        .editorial-rich strong {
          color: #1a2e1c;
          font-weight: 500;
        }
        .editorial-cta {
          margin-top: 1.6rem;
          display: flex;
          justify-content: center;
          gap: 0.7rem;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .editorial-hero {
            padding: 5rem 1.25rem 1.6rem;
          }
          .editorial-card-wrap {
            padding: 0 1rem 2.8rem;
            margin-top: -0.5rem;
          }
          .editorial-card-header {
            padding: 1.4rem 1.25rem 0;
          }
          .editorial-card-body {
            padding: 0.7rem 1.25rem 1.6rem;
          }
        }
      `}</style>

      <section className="editorial-page">
        <div className="editorial-hero">
          <DecorativeHeroCircles />
          <div className="editorial-hero-inner">
            <p className="editorial-eyebrow">{eyebrow}</p>
            <h1 className="editorial-title">{title}</h1>
            <p className="editorial-intro">{intro}</p>
          </div>
        </div>

        <div className="editorial-card-wrap">
          <div className="editorial-card">
            <div className="editorial-card-header">
              <img src="/images/logo.svg" alt="" aria-hidden="true" className="editorial-mark" />
            </div>
            <div className="editorial-card-body">
              <div className="editorial-rich">{children}</div>
              {(ctaLabel && onCtaClick) || (secondaryCtaLabel && onSecondaryCtaClick) ? (
                <div className="editorial-cta">
                  {secondaryCtaLabel && onSecondaryCtaClick && (
                    <button className="editorial-btn ghost" onClick={onSecondaryCtaClick}>{secondaryCtaLabel}</button>
                  )}
                  {ctaLabel && onCtaClick && (
                    <button className="editorial-btn" onClick={onCtaClick}>{ctaLabel}</button>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ScrollFillTextSection() {
  const sectionRef = useRef(null);
  const fillRefs = useRef([]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const fillEls = fillRefs.current.filter(Boolean);
    if (!sectionEl || fillEls.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(fillEls, { clipPath: "inset(0 100% 0 0)" });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      }).to(fillEls, {
        clipPath: "inset(0 0% 0 0)",
        ease: "none",
        stagger: 0.32,
        duration: 1,
      });

      ScrollTrigger.refresh();
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  const lines = [
    "Your skin is the first thing people notice.",
    "Taking care of it is not vanity,",
    "it's confidence, self-love,",
    "and long-term value.",
  ];

  return (
    <section ref={sectionRef} style={{ background: "#F5DEC8" }}>
      <style>{`
        .scroll-fill-section {
          min-height: 100svh;
          padding: clamp(2.5rem, 6vw, 5rem) 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .scroll-fill-wrap {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
          width: 100%;
        }
        .scroll-fill-stage {
          position: relative;
          margin-top: clamp(0.45rem, 1vw, 1rem);
          display: inline-block;
          width: 100%;
        }
        .scroll-fill-base,
        .scroll-fill-overlay {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.45rem, 4.8vw, 3.8rem);
          line-height: 1.18;
          font-style: italic;
          letter-spacing: -0.01em;
          text-align: center;
          text-wrap: balance;
          display: block;
        }
        .scroll-fill-base {
          color: rgba(26,46,28,0.22);
        }
        .scroll-fill-overlay {
          position: absolute;
          inset: 0;
          color: #1a2e1c;
          will-change: background-size;
          pointer-events: none;
          clip-path: inset(0 100% 0 0);
        }
        .scroll-fill-line {
          position: relative;
          display: inline-block;
          width: fit-content;
          max-width: 100%;
          margin: 0.4rem auto;
          padding-inline: 0.2rem;
        }
        @media (max-width: 768px) {
          .scroll-fill-section {
            min-height: 100svh;
            padding: 2.5rem 1.25rem;
          }
          .scroll-fill-wrap {
            max-width: 680px;
          }
        }
        @media (max-width: 480px) {
          .scroll-fill-base,
          .scroll-fill-overlay {
            font-size: clamp(1.25rem, 7vw, 2.1rem);
            line-height: 1.22;
          }
        }
      `}</style>
      <div className="scroll-fill-section">
        <div className="scroll-fill-wrap">
        {lines.map((line, index) => (
          <div key={line} className="scroll-fill-stage">
            <span className="scroll-fill-line">
              <span className="scroll-fill-base">{line}</span>
              <span
                ref={(element) => { fillRefs.current[index] = element; }}
                className="scroll-fill-overlay"
                aria-hidden="true"
              >
                {line}
              </span>
            </span>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}

// ─── NAV ───────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <style>{`
        .nav-wrap {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          padding: 1.2rem 2rem;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.4s ease;
          background: rgba(26,46,28,0.35);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          border-bottom: 1px solid rgba(245,222,200,0.08);
        }
        .nav-wrap.scrolled {
          background: rgba(26,46,28,0.72);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(245,222,200,0.12);
          padding: 0.9rem 2rem;
          box-shadow: 0 4px 32px rgba(0,0,0,0.18);
        }
        .nav-logo-btn {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 400;
          color: #F5DEC8;
          background: none; border: none; cursor: pointer;
          letter-spacing: 0.03em;
          text-shadow: 0 1px 6px rgba(0,0,0,0.3);
        }
        .nav-links-row { display: flex; gap: 2.4rem; list-style: none; }
        .nav-links-row button {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem; font-weight: 400;
          letter-spacing: 0.2em; text-transform: uppercase;
          background: none; border: none; cursor: pointer;
          color: rgba(245,222,200,0.75); opacity: 1; transition: color 0.3s;
        }
        .nav-links-row button:hover, .nav-links-row button.active { color: #F5DEC8; }
        .nav-cta-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem; font-weight: 400; letter-spacing: 0.18em;
          text-transform: uppercase; color: #F5DEC8;
          background: rgba(61,122,69,0.35); border: 1px solid rgba(245,222,200,0.35);
          padding: 0.5rem 1.3rem; border-radius: 100px; cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all 0.3s;
        }
        .nav-cta-btn:hover { background: #3D7A45; border-color: #3D7A45; color: white; }
        .ham-btn {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .ham-btn span {
          display: block; width: 22px; height: 1.5px;
          background: #F5DEC8; transition: all 0.3s ease;
          transform-origin: center;
        }
        .ham-btn.open span:nth-child(1) { transform: rotate(45deg) translate(4.5px, 4.5px); }
        .ham-btn.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .ham-btn.open span:nth-child(3) { transform: rotate(-45deg) translate(4.5px, -4.5px); }
        .mobile-menu {
          position: fixed; inset: 0; z-index: 190;
          background: #1a2e1c;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 2.5rem;
          opacity: 0; pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .mobile-menu.open { opacity: 1; pointer-events: all; }
        .mobile-menu button {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem; font-style: italic; font-weight: 400;
          color: rgba(245,222,200,0.7); background: none; border: none;
          cursor: pointer; transition: color 0.3s;
        }
        .mobile-menu button:hover, .mobile-menu button.active { color: #F5DEC8; }
        .mobile-book-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: white; background: #3D7A45;
          border: none; padding: 0.9rem 2.4rem; border-radius: 100px;
          cursor: pointer; margin-top: 1rem;
        }
        @media (max-width: 768px) {
          .nav-links-row, .nav-cta-btn { display: none; }
          .ham-btn { display: flex; }
        }
      `}</style>

      <nav className={`nav-wrap${scrolled ? " scrolled" : ""}`}>
        <button className="nav-logo-btn" onClick={() => { setPage("home"); setMenuOpen(false); }}>
          Zeekarh Cosmetics
        </button>
        <ul className="nav-links-row">
          {links.map(l => (
            <li key={l.id}>
              <button className={page === l.id ? "active" : ""} onClick={() => setPage(l.id)}>{l.label}</button>
            </li>
          ))}
        </ul>
        <button className="nav-cta-btn" onClick={() => setPage("contact")}>Book now</button>
        <button className={`ham-btn${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(v => !v)} aria-label="menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {links.map(l => (
          <button key={l.id} className={page === l.id ? "active" : ""} onClick={() => { setPage(l.id); setMenuOpen(false); }}>{l.label}</button>
        ))}
        <button className="mobile-book-btn" onClick={() => { setPage("contact"); setMenuOpen(false); }}>Book a consultation</button>
      </div>
    </>
  );
}

// ─── HOME ──────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const marqueeImages = ["/images/m1.svg", "/images/m2.svg", "/images/m3.webp", "/images/m4.png"];
  const [heroVisible, setHeroVisible] = useState(false);
  const marqueeTrackRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    let tween;

    const initMarquee = () => {
      if (tween) tween.kill();
      const distance = track.scrollWidth / 2;
      gsap.set(track, { x: 0, force3D: true });
      tween = gsap.to(track, {
        x: -distance,
        duration: 34,
        ease: "none",
        repeat: -1,
      });
    };

    initMarquee();
    window.addEventListener("resize", initMarquee);

    return () => {
      window.removeEventListener("resize", initMarquee);
      if (tween) tween.kill();
    };
  }, []);

  const stats = [
    { num: "600+", label: "Happy clients" },
    { num: "200+", label: "Treatments offered" },
    { num: "5★", label: "Client experience" },
  ];

  const services = [
    { num: "01", title: "Consultation", desc: "Comprehensive skin analysis & 8-month personalised routine" },
    { num: "02", title: "Facials", desc: "Glass skin, deep cleanse & bespoke radiance treatments" },
    { num: "03", title: "Chemical Peels", desc: "BioRePeel CI3, superficial & medium depth resurfacing" },
    { num: "04", title: "Microneedling", desc: "Collagen induction therapy for texture & scar revision" },
  ];

  const testimonials = [
    { quote: "My skin has never looked better. The consultation was thorough and the personalized routine actually works.", name: "Sarah M.", city: "London" },
    { quote: "Finally found a skincare expert who listens. The virtual consultation was so convenient and the results speak for themselves.", name: "Amanda K.", city: "New York" },
    { quote: "Professional, luxurious, and effective. Zeekarh Cosmetics has become an essential part of my self-care routine.", name: "Chioma O.", city: "Lagos" },
  ];

  const faqs = [
    { q: "How do I prepare for my first consultation?", a: "Come with a clean face, free of makeup if possible. Bring a list of current skincare products you use, note any allergies or skin sensitivities, and have photos ready showing your skin concerns." },
    { q: "Is there any downtime after treatments?", a: "Most treatments have minimal to no downtime. Facials and light peels may cause slight redness for a few hours. Microneedling typically results in 24–48 hours of mild redness." },
    { q: "How soon will I see results?", a: "Facials provide immediate glow. Chemical peels show full results within 5–7 days. Microneedling results develop over 4–6 weeks as collagen builds." },
    { q: "How often should I book treatments?", a: "Facials every 4–6 weeks. Chemical peels every 4–8 weeks. Microneedling sessions spaced 4–6 weeks apart for a series of 3–6 treatments." },
    { q: "Are treatments suitable for all skin types?", a: "Yes, every treatment is customised to your skin type and concerns. Your safety and comfort are our priority — we never use a one-size-fits-all approach." },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <style>{`
        .hero-section {
          min-height: 100svh;
          background: #1a2e1c;
          display: flex; flex-direction: column;
          justify-content: center;
          padding: 0 2rem;
          position: relative; overflow: hidden;
        }
        .hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
        }
        .hero-video-overlay {
          position: absolute; inset: 0;
          background:
            radial-gradient(circle at 72% 22%, rgba(61,122,69,0.2) 0%, rgba(61,122,69,0) 36%),
            linear-gradient(to bottom, rgba(12,24,15,0.88) 0%, rgba(12,24,15,0.66) 46%, rgba(12,24,15,0.9) 100%);
          z-index: 1;
        }
        .hero-bg-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(61,122,69,0.12);
          pointer-events: none;
        }
        .hero-inner { max-width: 760px; margin: 0 auto; width: 100%; padding-top: 6rem; padding-bottom: 5rem; position: relative; z-index: 2; }
        .hero-eyebrow {
          font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(245,222,200,0.72); font-weight: 300; margin-bottom: 1.35rem;
          text-shadow: 0 1px 3px rgba(0,0,0,0.35);
          opacity: 0; transform: translateY(16px);
          transition: all 0.6s ease 0.1s;
        }
        .hero-eyebrow.in { opacity: 1; transform: translateY(0); }
        .hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.6rem, 7vw, 5rem);
          font-weight: 400; font-style: italic;
          color: #F5DEC8; line-height: 1.08; margin-bottom: 1.35rem;
          text-shadow: 0 6px 24px rgba(0,0,0,0.38);
          opacity: 0; transform: translateY(24px);
          transition: all 0.7s ease 0.25s;
        }
        .hero-h1.in { opacity: 1; transform: translateY(0); }
        .hero-h1 em { color: #7bc884; font-style: normal; }
        .hero-sub {
          font-size: 0.96rem; font-weight: 300; line-height: 1.8;
          color: rgba(245,222,200,0.84); max-width: 520px; margin-bottom: 2.2rem;
          text-wrap: balance;
          opacity: 0; transform: translateY(20px);
          transition: all 0.7s ease 0.4s;
        }
        .hero-sub.in { opacity: 1; transform: translateY(0); }
        .hero-btns {
          display: flex; gap: 1rem; flex-wrap: wrap;
          opacity: 0; transform: translateY(16px);
          transition: all 0.7s ease 0.55s;
        }
        .hero-btns.in { opacity: 1; transform: translateY(0); }
        .btn-solid {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: white; background: #3D7A45; border: none;
          padding: 0.9rem 2.2rem; border-radius: 100px; cursor: pointer;
          transition: background 0.3s, transform 0.2s;
        }
        .btn-solid:hover { background: #2d5e34; transform: translateY(-2px); }
        .btn-outline {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(245,222,200,0.9); background: rgba(245,222,200,0.05);
          border: 1px solid rgba(245,222,200,0.38);
          padding: 0.9rem 2.2rem; border-radius: 100px; cursor: pointer;
          transition: all 0.3s;
        }
        .btn-outline:hover { border-color: rgba(245,222,200,0.68); color: #F5DEC8; background: rgba(245,222,200,0.1); }
        .scroll-indicator {
          position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem; z-index: 2;
          opacity: 0; animation: fadeIn 1s ease 1.2s forwards;
        }
        .scroll-label {
          font-size: 0.58rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(245,222,200,0.25); font-weight: 300;
        }
        .scroll-line {
          width: 1px; height: 40px; background: rgba(61,122,69,0.3);
          position: relative; overflow: hidden;
        }
        .scroll-line::after {
          content: ''; position: absolute; top: -40px; width: 100%; height: 100%;
          background: #3D7A45; animation: slideDown 1.8s ease infinite;
        }
        @keyframes slideDown {
          0%   { top: -100%; }
          100% { top: 100%; }
        }
        .marquee-wrap {
          background: #3D7A45; padding: 1rem 0; overflow: hidden;
        }
        .marquee-track {
          display: flex; gap: 1.2rem;
          width: max-content;
          align-items: center;
          will-change: transform;
        }
        .marquee-item {
          width: clamp(120px, 18vw, 190px);
          height: clamp(72px, 10vw, 108px);
          border-radius: 14px;
          background: rgba(245,222,200,0.1);
          border: 1px solid rgba(245,222,200,0.18);
          display: grid;
          place-items: center;
          padding: 0.7rem;
          flex-shrink: 0;
          backdrop-filter: blur(4px);
        }
        .marquee-item img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        /* ABOUT STRIP */
        .about-strip {
          background: #F5DEC8; padding: 6rem 2rem;
        }
        .about-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
        }
        .section-eyebrow {
          font-size: 0.62rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: #3D7A45; font-weight: 300; margin-bottom: 1.4rem;
        }
        .section-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 400; font-style: italic;
          color: #1a2e1c; line-height: 1.2; margin-bottom: 1.6rem;
        }
        .section-body {
          font-size: 0.88rem; font-weight: 300; line-height: 1.95;
          color: #4a5e4b; margin-bottom: 2rem;
        }
        .stats-row { display: flex; gap: 2.5rem; }
        .stat-item { display: flex; flex-direction: column; gap: 0.2rem; }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem; font-weight: 400; color: #3D7A45;
        }
        .stat-label {
          font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: #4a5e4b; font-weight: 300;
        }
        .about-visual {
          position: relative; height: 420px;
        }
        .about-card-main {
          position: absolute; right: 0; top: 0;
          width: 75%; height: 85%;
          background-image: url('/images/Room.JPG');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .about-card-main::before {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(26,46,28,0.86) 0%, rgba(26,46,28,0.52) 55%, rgba(26,46,28,0.3) 100%);
        }
        .about-card-float {
          position: absolute; left: 0; bottom: 0;
          width: 60%; background: white; border-radius: 16px;
          padding: 1.4rem; box-shadow: 0 16px 48px rgba(26,46,28,0.12);
          animation: float 5s ease-in-out infinite;
        }
        .float-label {
          font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #3D7A45; font-weight: 400; margin-bottom: 0.5rem;
        }
        .float-val {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem; color: #1a2e1c; line-height: 1;
        }
        .float-sub { font-size: 0.7rem; color: #4a5e4b; font-weight: 300; margin-top: 0.3rem; }
        .about-inner-text {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; gap: 0.5rem; padding: 2.5rem;
          width: 100%;
        }
        .about-inner-eyebrow {
          font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(245,222,200,0.72); font-weight: 300;
        }
        .about-inner-big {
          font-family: 'Playfair Display', serif;
          font-size: 3.5rem; font-weight: 400; font-style: italic;
          color: rgba(245,222,200,0.92); line-height: 1;
          text-shadow: 0 4px 16px rgba(0,0,0,0.35);
        }

        /* SCATTERED PHOTOS SECTION */
        .scatter-section {
          background: #F5DEC8; padding: 6rem 2rem;
          overflow: hidden;
        }
        .scatter-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1.1fr 1fr;
          gap: 2.5rem; align-items: center; position: relative;
        }
        .scatter-mobile-grid {
          display: none;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.9rem;
          margin-top: 2rem;
        }
        .scatter-col { display: flex; flex-direction: column; gap: 1.5rem; }
        .scatter-col.top { padding-top: 0; justify-content: flex-start; }
        .scatter-col.bottom { justify-content: flex-end; padding-top: 3rem; }
        .scatter-photo {
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 12px 40px rgba(26,46,28,0.12);
          position: relative;
          background: rgba(255,255,255,0.35);
        }
        .scatter-photo-inner {
          width: 100%; padding-top: 125%;
          position: relative; overflow: hidden;
        }
        .scatter-photo-inner.wide { padding-top: 75%; }
        .scatter-photo-inner.tall { padding-top: 140%; }
        .scatter-photo-bg {
          position: absolute; inset: 0;
          transition: transform 0.7s ease;
        }
        .scatter-photo:hover .scatter-photo-bg { transform: scale(1.04); }
        .scatter-center { text-align: center; padding: 2rem 1rem; }
        .scatter-ornament {
          margin-bottom: 1.5rem;
          display: inline-block;
        }
        .scatter-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.4rem);
          font-weight: 400; color: #1a2e1c; line-height: 1.2; margin-bottom: 1.4rem;
        }
        .scatter-body {
          font-size: 0.85rem; font-weight: 300; line-height: 1.95;
          color: #4a5e4b; margin-bottom: 2.2rem; max-width: 340px; margin-left: auto; margin-right: auto;
        }

        /* MEET SECTION */
        .meet-section {
          background:
            radial-gradient(circle at 84% 18%, rgba(111, 156, 102, 0.2) 0%, rgba(111, 156, 102, 0) 36%),
            radial-gradient(circle at 12% 90%, rgba(73, 126, 79, 0.18) 0%, rgba(73, 126, 79, 0) 42%),
            #F5DEC8;
          padding: 6rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .meet-leaf-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .meet-leaf {
          position: absolute;
          border-radius: 72% 28% 66% 34% / 38% 68% 32% 62%;
          background: linear-gradient(145deg, rgba(114, 163, 101, 0.22), rgba(61, 122, 69, 0.08));
          border: 1px solid rgba(61, 122, 69, 0.16);
          filter: blur(0.2px);
          transform-origin: center;
        }
        .meet-leaf::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 11%;
          width: 1px;
          height: 78%;
          transform: translateX(-50%);
          background: rgba(61, 122, 69, 0.2);
        }
        .meet-leaf.l1 {
          width: 280px;
          height: 180px;
          top: 48px;
          left: -84px;
          animation: leafDrift 10s ease-in-out infinite;
        }
        .meet-leaf.l2 {
          width: 210px;
          height: 136px;
          bottom: 74px;
          right: -56px;
          animation: leafDriftAlt 11s ease-in-out infinite;
        }
        .meet-leaf.l3 {
          width: 140px;
          height: 90px;
          top: 38%;
          right: 14%;
          opacity: 0.7;
          animation: leafDrift 9s ease-in-out infinite reverse;
        }
        .meet-leaf-dot {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: rgba(61, 122, 69, 0.17);
          box-shadow: 0 0 0 8px rgba(61, 122, 69, 0.05);
          animation: float 6.5s ease-in-out infinite;
        }
        .meet-leaf-dot.d1 { top: 16%; right: 24%; }
        .meet-leaf-dot.d2 { bottom: 20%; left: 8%; animation-delay: 0.8s; }
        .meet-leaf-dot.d3 { top: 64%; right: 8%; width: 12px; height: 12px; }
        .meet-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1.6fr;
          gap: 5rem; align-items: center;
        }
        .meet-photo {
          position: relative;
          border-radius: 24px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(26,46,28,0.16);
          aspect-ratio: 3/4;
          flex-shrink: 0;
        }
        .meet-photo img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
          transition: transform 0.8s ease;
        }
        .meet-photo:hover img { transform: scale(1.04); }
        .meet-content {
          display: flex; flex-direction: column;
          justify-content: center;
        }
        .meet-eyebrow {
          font-size: 0.62rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: #3D7A45; font-weight: 300; margin-bottom: 1.4rem;
        }
        .meet-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 3.8vw, 3.4rem);
          font-weight: 400; color: #1a2e1c; line-height: 1.15;
          margin-bottom: 2rem;
        }
        .meet-body {
          font-size: 0.88rem; font-weight: 300; line-height: 2;
          color: #4a5e4b; margin-bottom: 1.4rem; max-width: 520px;
        }
        .meet-body + .meet-body { margin-bottom: 2.4rem; }
        .meet-btn {
          display: inline-flex; align-items: center; gap: 0.7rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: white; background: #1a2e1c; border: none;
          padding: 1rem 2.4rem; border-radius: 100px; cursor: pointer;
          transition: background 0.3s, transform 0.2s;
          align-self: flex-start;
        }
        .meet-btn:hover { background: #3D7A45; transform: translateY(-2px); }
        .meet-btn-ornament { font-size: 0.7rem; opacity: 0.55; }
        @media (max-width: 900px) {
          .meet-inner { grid-template-columns: 1fr; gap: 2.5rem; }
          .meet-photo { max-width: 320px; margin: 0 auto; aspect-ratio: 3/4; }
          .meet-leaf.l1 { width: 220px; height: 142px; top: 18px; left: -96px; }
          .meet-leaf.l2 { width: 180px; height: 116px; bottom: 48px; right: -78px; }
          .meet-leaf.l3 { display: none; }
        }

        /* SERVICES STRIP — image background cards like Damai */
        .services-strip { background: #1a2e1c; padding: 6rem 2rem; }
        .services-inner { max-width: 1200px; margin: 0 auto; }
        .services-header { text-align: center; margin-bottom: 3.5rem; }
        .services-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
        }
        .service-card {
          border-radius: 20px; overflow: hidden;
          position: relative; cursor: pointer;
          aspect-ratio: 3/4;
          transition: transform 0.4s ease;
        }
        .service-card:hover { transform: scale(1.02); }
        .service-card-bg {
          position: absolute; inset: 0;
          transition: transform 0.6s ease;
        }
        .service-card:hover .service-card-bg { transform: scale(1.08); }
        .service-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,22,11,0.97) 0%, rgba(10,22,11,0.65) 50%, rgba(10,22,11,0.25) 100%);
          transition: background 0.4s;
        }
        .service-card:hover .service-card-overlay {
          background: linear-gradient(to top, rgba(10,22,11,0.98) 0%, rgba(10,22,11,0.75) 60%, rgba(10,22,11,0.3) 100%);
        }
        .service-card-badge {
          position: absolute; top: 1.2rem; left: 50%; transform: translateX(-50%);
          font-size: 0.55rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(245,222,200,0.55); font-weight: 300; white-space: nowrap;
          background: rgba(26,46,28,0.4); backdrop-filter: blur(4px);
          padding: 0.3rem 0.8rem; border-radius: 100px;
          border: 1px solid rgba(245,222,200,0.1);
        }
        .service-card-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 2rem 1.6rem;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .service-card-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 1.8vw, 1.6rem);
          font-weight: 500; color: #FFFFFF; line-height: 1.2;
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        }
        .service-card-desc {
          font-size: 0.78rem; font-weight: 300; line-height: 1.7;
          color: rgba(245,222,200,0.85);
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .service-card-btn {
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          background: rgba(245,222,200,0.15); backdrop-filter: blur(6px);
          border: 1px solid rgba(245,222,200,0.3);
          border-radius: 100px; padding: 0.55rem 1.4rem;
          font-size: 0.65rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: #F5DEC8; font-weight: 400;
          margin-top: 0.8rem; align-self: center;
          transition: all 0.3s;
        }
        .service-card:hover .service-card-btn {
          background: #3D7A45; border-color: #3D7A45; color: white;
        }
        .svc-btn-ornament { font-size: 0.7rem; opacity: 0.6; }
        .services-cta { text-align: center; margin-top: 3rem; }

        /* CONSULTATION */
        .consult-strip { background: #1a2e1c; padding: 6rem 2rem; }
        .consult-inner { max-width: 800px; margin: 0 auto; text-align: center; }
        .consult-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 3rem); font-style: italic;
          color: #F5DEC8; margin-bottom: 1rem; font-weight: 400;
        }
        .consult-sub {
          font-size: 0.88rem; font-weight: 300; line-height: 1.9;
          color: rgba(245,222,200,0.5); margin-bottom: 2.5rem;
        }
        .pricing-row {
          display: flex; justify-content: center; gap: 1.2rem;
          flex-wrap: wrap; margin-bottom: 2.5rem;
        }
        .price-chip {
          background: rgba(245,222,200,0.05);
          border: 1px solid rgba(245,222,200,0.1);
          border-radius: 12px; padding: 1.2rem 1.8rem;
          display: flex; flex-direction: column; gap: 0.3rem; min-width: 110px; align-items: center;
        }
        .price-flag { font-size: 1.2rem; align-self: center; }
        .price-currency { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,222,200,0.35); font-weight: 300; }
        .price-val {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem; color: #F5DEC8; font-weight: 400;
        }
        .consult-features {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 0.8rem; margin-bottom: 2.5rem; text-align: left;
        }
        .consult-feat {
          display: flex; align-items: flex-start; gap: 0.7rem;
          font-size: 0.78rem; font-weight: 300; line-height: 1.6;
          color: rgba(245,222,200,0.55);
        }
        .feat-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #3D7A45; flex-shrink: 0; margin-top: 0.4rem;
        }
        .consult-note {
          font-size: 0.65rem; letter-spacing: 0.1em;
          color: rgba(245,222,200,0.25); margin-top: 1.2rem; font-weight: 300;
        }

        /* TESTIMONIALS */
        .testi-strip { background: #F5DEC8; padding: 6rem 2rem; }
        .testi-inner { max-width: 1100px; margin: 0 auto; }
        .testi-header { text-align: center; margin-bottom: 3.5rem; }
        .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
        .testi-card {
          background: white; border-radius: 20px; padding: 2rem;
          border: 1px solid rgba(61,122,69,0.07);
          box-shadow: 0 4px 20px rgba(26,46,28,0.04);
          display: flex; flex-direction: column; gap: 1.2rem;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .testi-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(26,46,28,0.1); }
        .testi-stars { display: flex; gap: 3px; }
        .star {
          width: 9px; height: 9px; background: #3D7A45;
          clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
        }
        .testi-quote {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-style: italic; font-weight: 400;
          color: #1a2e1c; line-height: 1.75; flex: 1;
        }
        .testi-author { padding-top: 1rem; border-top: 1px solid rgba(61,122,69,0.08); }
        .testi-name { font-size: 0.8rem; font-weight: 400; color: #1a2e1c; }
        .testi-city { font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: #3D7A45; font-weight: 300; margin-top: 0.15rem; }

        /* FAQ */
        .faq-strip { background: #1a2e1c; padding: 6rem 2rem; }
        .faq-inner { max-width: 720px; margin: 0 auto; }
        .faq-header { text-align: center; margin-bottom: 3rem; }
        .faq-list { display: flex; flex-direction: column; gap: 0.8rem; }
        .faq-item {
          background: rgba(245,222,200,0.04);
          border: 1px solid rgba(245,222,200,0.07);
          border-radius: 12px; overflow: hidden;
          transition: border-color 0.3s;
        }
        .faq-item.open { border-color: rgba(61,122,69,0.3); }
        .faq-q {
          width: 100%; background: none; border: none;
          padding: 1.3rem 1.5rem; cursor: pointer;
          display: flex; justify-content: space-between; align-items: center; gap: 1rem;
          text-align: left;
        }
        .faq-q-text {
          font-size: 0.85rem; font-weight: 300; color: rgba(245,222,200,0.8); line-height: 1.5;
        }
        .faq-icon {
          width: 22px; height: 22px; border-radius: 50%;
          border: 1px solid rgba(245,222,200,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.3s;
          color: rgba(245,222,200,0.4); font-size: 1rem; line-height: 1;
        }
        .faq-item.open .faq-icon { background: #3D7A45; border-color: #3D7A45; color: white; }
        .faq-a {
          font-size: 0.8rem; font-weight: 300; line-height: 1.85;
          color: rgba(245,222,200,0.45); padding: 0 1.5rem 1.3rem;
          display: none;
        }
        .faq-item.open .faq-a { display: block; }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .scatter-inner { grid-template-columns: 1fr 1fr; }
          .scatter-col.bottom { display: none; }
        }
        @media (max-width: 900px) {
          .hero-inner { padding-top: 5.5rem; padding-bottom: 4.3rem; }
          .hero-sub { font-size: 0.92rem; max-width: 100%; }
          .about-inner { grid-template-columns: 1fr; gap: 2.5rem; }
          .about-visual { display: none; }
          .testi-grid { grid-template-columns: 1fr; }
          .consult-features { grid-template-columns: 1fr; }
          .scatter-inner { grid-template-columns: 1fr; }
          .scatter-center { padding: 0; }
          .scatter-col.top, .scatter-col.bottom { display: none; }
          .scatter-mobile-grid { display: grid; }
          .services-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .hero-section { padding: 0 1rem; }
          .hero-inner { padding-top: 5.2rem; padding-bottom: 4rem; }
          .hero-eyebrow { font-size: 0.57rem; letter-spacing: 0.24em; }
          .hero-h1 { font-size: clamp(2.05rem, 10vw, 3rem); line-height: 1.12; margin-bottom: 1.05rem; }
          .hero-sub { font-size: 0.88rem; line-height: 1.72; margin-bottom: 1.7rem; }
          .hero-btns { gap: 0.7rem; }
          .btn-solid, .btn-outline { width: 100%; justify-content: center; padding: 0.82rem 1.2rem; }
          .pricing-row { gap: 0.8rem; }
          .stats-row { gap: 1.5rem; }
          .services-grid { grid-template-columns: 1fr; }
          .service-card { aspect-ratio: 4/3; }
          .scatter-section { padding: 4.5rem 1rem; }
          .scatter-inner { gap: 1.5rem; }
          .scatter-mobile-grid { gap: 0.75rem; }
          .scatter-photo { border-radius: 14px; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero-section">
        <video className="hero-video" autoPlay muted loop playsInline preload="auto">
          <source src="/video.webm" type="video/webm" />
        </video>
        <div className="hero-video-overlay" />
        <div className="hero-bg-circle" style={{ width: 600, height: 600, right: -200, top: -100, zIndex: 2 }} />
        <div className="hero-bg-circle" style={{ width: 300, height: 300, left: -80, bottom: 80, zIndex: 2 }} />
        <div className="hero-inner">
          <p className={`hero-eyebrow${heroVisible ? " in" : ""}`}>Zeekarh Cosmetics · Med Spa</p>
          <h1 className={`hero-h1${heroVisible ? " in" : ""}`}>
            Skin that tells your<br /><em>best story.</em>
          </h1>
          <p className={`hero-sub${heroVisible ? " in" : ""}`}>
            Your Skin Journey Is Unique, And Your Treatment Should Be Too
          </p>
          <div className={`hero-btns${heroVisible ? " in" : ""}`}>
            <button className="btn-solid" onClick={() => setPage("contact")}>Book a consultation</button>
            <button className="btn-outline" onClick={() => setPage("services")}>View services</button>
          </div>
        </div>
        <div className="scroll-indicator">
          <span className="scroll-label">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div ref={marqueeTrackRef} className="marquee-track">
          {[...marqueeImages, ...marqueeImages].map((src, i) => (
            <div key={i} className="marquee-item">
              <img src={src} alt="" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT STRIP */}
      <section className="about-strip">
        <div className="about-inner">
          <div>
            <AnimBlock><p className="section-eyebrow">Who we are</p></AnimBlock>
            <AnimBlock delay="d1"><h2 className="section-h2">Where expertise meets the art of skincare.</h2></AnimBlock>
            <AnimBlock delay="d2"><p className="section-body">At Zeekarh Cosmetics, we excel in delivering professional skincare treatments and bespoke facials tailored to individual needs. With a focus on expertise, clients can expect to rejuvenate their skin while indulging in a moment of self-care. Our advanced beauty services ensure a flawless experience that caters to both relaxation and effective skincare solutions..</p></AnimBlock>
            <AnimBlock delay="d3">
              <div className="stats-row">
                {stats.map(s => (
                  <div key={s.label} className="stat-item">
                    <span className="stat-num">{s.num}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </AnimBlock>
            <AnimBlock delay="d4" style={{ marginTop: "2rem" }}>
              <button className="btn-solid" onClick={() => setPage("about")}>Our story</button>
            </AnimBlock>
          </div>
          <div className="about-visual">
            <div className="about-card-main">
              <div className="about-inner-text">
                <span className="about-inner-eyebrow">Clinical precision</span>
                <span className="about-inner-big">Skin</span>
                <span style={{ color: "rgba(245,222,200,0.85)", fontSize: "0.75rem", fontWeight: 300, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>Science-backed. Results-driven.</span>
              </div>
            </div>
            <div className="about-card-float">
              <p className="float-label">Clients served</p>
              <p className="float-val">600+</p>
              <p className="float-sub">Across UK, US & Nigeria</p>
            </div>
          </div>
        </div>
      </section>

      {/* SCATTERED PHOTOS — Damai-inspired */}
      <section className="scatter-section">
        <div className="scatter-inner">
          {/* Left column — two staggered photos */}
          <div className="scatter-col top">
            <AnimBlock delay="d1">
              <div className="scatter-photo" style={{ alignSelf: "flex-end", width: "80%" }}>
                <div className="scatter-photo-inner wide">
                  <div className="scatter-photo-bg" style={{
                    backgroundImage: "url('/images/skinana1.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }} />
                </div>
              </div>
            </AnimBlock>
            <AnimBlock delay="d3">
              <div className="scatter-photo" style={{ width: "90%" }}>
                <div className="scatter-photo-inner">
                  <div className="scatter-photo-bg" style={{
                    backgroundImage: "url('/images/skinana2.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }} />
                </div>
              </div>
            </AnimBlock>
          </div>

          {/* Centre — headline */}
          <div className="scatter-center">
            <AnimBlock>
              <img src="/images/logo.svg" alt="Zeekarh Cosmetics" className="scatter-ornament" style={{ width: 110, height: 110, opacity: 0.28 }} />
            </AnimBlock>
            <AnimBlock delay="d1">
              <h2 className="scatter-h2">Your skin deserves
<br />
expert attention</h2>
            </AnimBlock>
            <AnimBlock delay="d2">
              <p className="scatter-body">Just a consultation away. Results that last. A treatment that feels like luxury — and works like science.</p>
            </AnimBlock>
            <AnimBlock delay="d3">
              <button className="btn-solid" onClick={() => setPage("services")}>Explore treatments</button>
            </AnimBlock>
            <div className="scatter-mobile-grid">
              {[
                { src: "/images/skinana1.jpeg", ratioClass: "wide" },
                { src: "/images/Glow.jpeg", ratioClass: "tall" },
                { src: "/images/skinana2.jpeg", ratioClass: "tall" },
                { src: "/images/skinana.jpg", ratioClass: "wide" },
              ].map((image, index) => (
                <AnimBlock key={image.src} delay={`d${(index % 4) + 1}`}>
                  <div className="scatter-photo" style={{ width: "100%" }}>
                    <div className={`scatter-photo-inner ${image.ratioClass}`}>
                      <div className="scatter-photo-bg" style={{
                        backgroundImage: `url('${image.src}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }} />
                    </div>
                  </div>
                </AnimBlock>
              ))}
            </div>
          </div>

          {/* Right column — two staggered photos */}
          <div className="scatter-col bottom">
            <AnimBlock delay="d2">
              <div className="scatter-photo" style={{ width: "85%" }}>
                <div className="scatter-photo-inner tall">
                  <div className="scatter-photo-bg" style={{
                    backgroundImage: "url('/images/Glow.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }} />
                </div>
              </div>
            </AnimBlock>
            <AnimBlock delay="d4">
              <div className="scatter-photo" style={{ width: "75%", alignSelf: "flex-end" }}>
                <div className="scatter-photo-inner wide">
                  <div className="scatter-photo-bg" style={{
                    backgroundImage: "url('/images/skinana.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }} />
                </div>
              </div>
            </AnimBlock>
          </div>
        </div>
      </section>

      {/* MEET THE AESTHETICIAN */}
      <section className="meet-section">
        <div className="meet-leaf-layer" aria-hidden="true">
          <FloatingLeaves />
        </div>
        <div className="meet-inner">
          <AnimBlock>
            <div className="meet-photo">
              <img src="/images/Zee.jpg" alt="Ngozi — Founder & Lead Aesthetician at Zeekarh Cosmetics" />
            </div>
          </AnimBlock>
          <div className="meet-content">
          <AnimBlock>
            <p className="meet-eyebrow">Meet your aesthetician</p>
          </AnimBlock>
          <AnimBlock delay="d1">
            <h2 className="meet-h2">Hi there! I'm Ngozi<br />(your skin's best friend).</h2>
          </AnimBlock>
          <AnimBlock delay="d2">
            <p className="meet-body">I'm an Aesthetician based in Leeds, UK. I don't just treat skin, I help you understand it. I specialise in the management of inflammatory conditions like acne, rosacea, and pigmentation. Whether we're meeting for an in-person treatment or an online consultation, my goal is to cut through the noise of the retail market and build a tailored skincare routine and treatment plan that actually work for your unique concerns.</p>
          </AnimBlock>
          <AnimBlock delay="d3">
            <p className="meet-body">With over six years of experience in hands-on clinical treatments and product curation, I'll say you've found the right person.</p>
          </AnimBlock>
          <AnimBlock delay="d4">
            <button className="meet-btn" onClick={() => setPage("about")}>
              <span className="meet-btn-ornament">✦</span>
              Learn more
              <span className="meet-btn-ornament">✦</span>
            </button>
          </AnimBlock>
        </div>
        </div>
      </section>

      <ScrollFillTextSection />

      {/* SERVICES — image-background cards like The Damai */}
      <section className="services-strip">
        <div className="services-inner">
          <div className="services-header">
            <AnimBlock><p className="section-eyebrow" style={{ color: "rgba(245,222,200,0.35)" }}>What we offer</p></AnimBlock>
            <AnimBlock delay="d1"><h2 className="section-h2" style={{ color: "#F5DEC8" }}>Treatments for every skin story.</h2></AnimBlock>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <AnimBlock key={s.num} delay={`d${i + 1}`}>
                <div className="service-card" onClick={() => setPage("services")}>
                  {/* Background gradient unique to each card */}
                  <div className="service-card-bg" style={{
                    backgroundImage: `url(${[
                      "/images/service_consultation.jpg",
                      "/images/service_facials.jpg",
                      "/images/service_peels.jpg",
                      "/images/service_microneedling.jpg",
                    ][i]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }} />
                  <div className="service-card-overlay" />
                  <span className="service-card-badge">
                    {["Personalised · Virtual", "Glow & Radiance", "Advanced Resurfacing", "Collagen Induction"][i]}
                  </span>
                  <div className="service-card-content">
                    <h3 className="service-card-title">{s.title}</h3>
                    <p className="service-card-desc">{s.desc}</p>
                    <span className="service-card-btn">
                      <span className="svc-btn-ornament">✦</span>
                      More info
                      <span className="svc-btn-ornament">✦</span>
                    </span>
                  </div>
                </div>
              </AnimBlock>
            ))}
          </div>
          <div className="services-cta">
            <AnimBlock>
              <button className="btn-solid" onClick={() => setPage("services")}>View all treatments</button>
            </AnimBlock>
          </div>
        </div>
      </section>

      {/* CONSULTATION */}
      <section className="consult-strip">
        <div className="consult-inner">
          <AnimBlock><p className="section-eyebrow" style={{ color: "rgba(245,222,200,0.3)" }}>Start here</p></AnimBlock>
          <AnimBlock>
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", margin: "1.4rem 0" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(245,222,200,0.15)" }} />
              <img src="/images/logo.svg" alt="" aria-hidden="true" style={{ width: 60, height: 60, opacity: 0.55, flexShrink: 0 }} />
              <div style={{ flex: 1, height: 1, background: "rgba(245,222,200,0.15)" }} />
            </div>
          </AnimBlock>
          <AnimBlock delay="d1"><h2 className="consult-h2">Your skin deserves expert attention.</h2></AnimBlock>
          <AnimBlock delay="d2"><p className="consult-sub">Begin your skincare journey with a virtual consultation. A comprehensive, personalised session designed to understand your skin deeply and set you on the right path.</p></AnimBlock>
          <AnimBlock delay="d3">
            <div className="pricing-row">
              {[{ flag: "gb", label: "UK", val: "£70" }, { flag: "us", label: "US", val: "$87" }].map(p => (
                <div key={p.label} className="price-chip">
                  <img className="price-flag" src={`https://flagcdn.com/w40/${p.flag}.png`} alt={p.label} style={{ width: 28, height: "auto", borderRadius: 3, display: "block" }} />
                  <span className="price-currency">{p.label}</span>
                  <span className="price-val">{p.val}</span>
                </div>
              ))}
            </div>
          </AnimBlock>
          <AnimBlock delay="d4">
            <div className="consult-features">
              {["Comprehensive skin analysis", "8-month personalised skincare routine", "Product recommendations for your budget", "Guidance on where to purchase products"].map(f => (
                <div key={f} className="consult-feat"><div className="feat-dot" />{f}</div>
              ))}
            </div>
          </AnimBlock>
          <AnimBlock delay="d5">
            <button className="btn-solid" onClick={() => setPage("contact")}>Book your consultation</button>
            <p className="consult-note">£20 credited towards your first in-clinic treatment</p>
          </AnimBlock>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-strip">
        <div className="testi-inner">
          <div className="testi-header">
            <AnimBlock><p className="section-eyebrow">Client love</p></AnimBlock>
            <AnimBlock delay="d1"><h2 className="section-h2">Stories of transformation.</h2></AnimBlock>
          </div>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <AnimBlock key={t.name} delay={`d${i + 1}`}>
                <div className="testi-card">
                  <div className="testi-stars">{[...Array(5)].map((_, j) => <div key={j} className="star" />)}</div>
                  <p className="testi-quote">"{t.quote}"</p>
                  <div className="testi-author">
                    <p className="testi-name">{t.name}</p>
                    <p className="testi-city">{t.city}</p>
                  </div>
                </div>
              </AnimBlock>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-strip">
        <div className="faq-inner">
          <div className="faq-header">
            <AnimBlock><p className="section-eyebrow" style={{ color: "rgba(245,222,200,0.3)" }}>Questions answered</p></AnimBlock>
            <AnimBlock delay="d1"><h2 className="consult-h2" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)" }}>Everything you need to know.</h2></AnimBlock>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <AnimBlock key={i} delay={`d${(i % 5) + 1}`}>
                <div className={`faq-item${openFaq === i ? " open" : ""}`}>
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="faq-q-text">{f.q}</span>
                    <span className="faq-icon">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  <p className="faq-a">{f.a}</p>
                </div>
              </AnimBlock>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  return (
    <>
      <style>{`
        .about-hero {
          min-height: 70svh; background: #1a2e1c;
          display: grid; grid-template-columns: 1fr 1fr;
          position: relative; overflow: hidden;
        }
        .about-hero-photo {
          background: #2a3e2c;
          display: flex; align-items: center; justify-content: center;
          position: relative; min-height: 400px;
          overflow: hidden;
        }
        .about-hero-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .photo-placeholder {
          display: flex; flex-direction: column; align-items: center;
          gap: 1rem; opacity: 0.35;
        }
        .photo-ring {
          width: 80px; height: 80px; border-radius: 50%;
          border: 2px dashed rgba(61,122,69,0.5);
          display: flex; align-items: center; justify-content: center;
          animation: pulse-ring 2.5s ease-in-out infinite;
        }
        .photo-hint-text {
          font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(245,222,200,0.4); font-weight: 300; text-align: center;
        }
        .about-hero-content {
          padding: 8rem 3.5rem 5rem;
          display: flex; flex-direction: column; justify-content: center;
          animation: fadeUp 0.8s ease 0.2s both;
        }
        .about-creds {
          background: white; padding: 4rem 2rem;
        }
        .creds-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
        }
        .cred-item {
          padding: 1.6rem 2rem;
          border-left: 1px solid rgba(61,122,69,0.12);
        }
        .cred-item:first-child { border-left: none; }
        .cred-label {
          font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: #3D7A45; font-weight: 300; margin-bottom: 0.5rem;
        }
        .cred-val {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem; font-weight: 400; color: #1a2e1c; line-height: 1.3;
        }
        .philosophy-section {
          background:
            radial-gradient(circle at 14% 18%, rgba(61,122,69,0.18) 0%, rgba(61,122,69,0) 36%),
            radial-gradient(circle at 88% 82%, rgba(45,94,52,0.16) 0%, rgba(45,94,52,0) 42%),
            #F5DEC8;
          padding: 6.5rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .phil-orb {
          position: absolute;
          border-radius: 999px;
          border: 1px solid rgba(61,122,69,0.12);
          pointer-events: none;
        }
        .phil-orb.a {
          width: 230px;
          height: 230px;
          left: -78px;
          top: -62px;
        }
        .phil-orb.b {
          width: 170px;
          height: 170px;
          right: -52px;
          bottom: 30px;
        }
        .phil-inner {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .phil-panel {
          background: rgba(255,248,242,0.72);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(61,122,69,0.14);
          border-radius: 28px;
          box-shadow: 0 24px 70px rgba(26,46,28,0.12);
          padding: 2.5rem 2.2rem;
          text-align: left;
          display: grid;
          gap: 1.25rem;
        }
        .phil-kicker {
          font-size: 0.62rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #3D7A45;
          font-weight: 400;
        }
        .phil-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.9rem, 3.2vw, 2.8rem);
          line-height: 1.2;
          color: #1a2e1c;
          font-style: italic;
          font-weight: 400;
        }
        .phil-body {
          font-size: 0.9rem;
          line-height: 1.95;
          color: #4a5e4b;
          font-weight: 300;
          max-width: 740px;
        }
        .phil-cta-row {
          margin-top: 0.45rem;
        }
        .phil-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F5DEC8;
          background: linear-gradient(135deg, #1a2e1c 0%, #2d5e34 100%);
          border: 1px solid rgba(61,122,69,0.35);
          border-radius: 999px;
          padding: 0.95rem 2.2rem;
          cursor: pointer;
          box-shadow: 0 12px 28px rgba(26,46,28,0.2);
          transition: transform 0.2s ease, box-shadow 0.25s ease, filter 0.25s ease;
        }
        .phil-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 32px rgba(26,46,28,0.26);
          filter: brightness(1.06);
        }
        .phil-btn-mark {
          opacity: 0.72;
          font-size: 0.72rem;
        }
        @media (max-width: 768px) {
          .about-hero { grid-template-columns: 1fr; }
          .about-hero-photo { min-height: 280px; }
          .about-hero-content { padding: 3rem 2rem; }
          .creds-inner { grid-template-columns: 1fr 1fr; }
          .cred-item:nth-child(3) { border-left: none; }
          .philosophy-section { padding: 4.5rem 1rem; }
          .phil-panel { padding: 1.7rem 1.25rem; border-radius: 22px; }
          .phil-body { font-size: 0.86rem; }
        }
      `}</style>

      <section className="about-hero" style={{ paddingTop: "5rem" }}>
        <div className="about-hero-photo">
          <img src="/images/Zee.jpg" alt="Ngozi - Founder and Lead Aesthetician at Zeekarh Cosmetics" />
        </div>
        <div className="about-hero-content">
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,222,200,0.35)", fontWeight: 300, marginBottom: "1.2rem" }}>Meet your aesthetician</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 400, color: "#F5DEC8", lineHeight: 1.15, marginBottom: "0.5rem" }}>Hi there! I'm Ngozi (your skin's best friend).</h1>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D7A45", fontWeight: 300, marginBottom: "1.8rem" }}>Founder & Lead Aesthetician</p>
          <div style={{ width: 32, height: 1, background: "rgba(245,222,200,0.15)", marginBottom: "1.8rem" }} />
          <p style={{ fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.95, color: "rgba(245,222,200,0.55)", maxWidth: 420, marginBottom: "1rem" }}>I'm an Aesthetician based in Leeds, UK. I don't just treat skin, I help you understand it. I specialise in the management of inflammatory conditions like acne, rosacea, and pigmentation.</p>
          <p style={{ fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.95, color: "rgba(245,222,200,0.55)", maxWidth: 420 }}>Whether we're meeting for an in-person treatment or an online consultation, my goal is to cut through the noise of the retail market and build a tailored skincare routine and treatment plan that actually work for your unique concerns.</p>
        </div>
      </section>

      <div className="about-creds">
        <div className="creds-inner">
          {[
            { label: "Role", val: "Founder & Lead Aesthetician" },
            { label: "Specialisation", val: "Acne, Rosacea & Pigmentation" },
            { label: "Experience", val: "6+ Years in Clinical Skincare" },
            { label: "Based in", val: "Leeds, United Kingdom" },
          ].map(c => (
            <AnimBlock key={c.label}>
              <div className="cred-item">
                <p className="cred-label">{c.label}</p>
                <p className="cred-val">{c.val}</p>
              </div>
            </AnimBlock>
          ))}
        </div>
      </div>

      <section className="philosophy-section">
        <div className="phil-orb a" aria-hidden="true" />
        <div className="phil-orb b" aria-hidden="true" />
        <div className="phil-inner">
          <div className="phil-panel">
            <AnimBlock><p className="phil-kicker">The philosophy</p></AnimBlock>
            <AnimBlock delay="d1"><h2 className="phil-title">Skincare rooted in science, delivered with care.</h2></AnimBlock>
            <AnimBlock delay="d2"><p className="phil-body">At Zeekarh Cosmetics, every treatment is approached with clinical precision and a deep respect for the skin's natural intelligence. The goal is never to mask - it's to understand, restore, and elevate. Each client receives a bespoke experience built around their unique skin profile, lifestyle, and goals.</p></AnimBlock>
            <AnimBlock delay="d3" className="phil-cta-row">
              <button className="phil-btn" onClick={() => setPage("contact")}>
                <span className="phil-btn-mark">✦</span>
                Book a consultation
                <span className="phil-btn-mark">✦</span>
              </button>
            </AnimBlock>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── SERVICES ──────────────────────────────────────────────────────────────
function ServicesPage({ setPage }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Facials", "Peels", "Microneedling", "Consultation"];

  const services = [
    { cat: "Consultation", title: "Virtual Skin Consultation", desc: "Comprehensive skin analysis with 8-month personalised routine and product recommendations tailored to your budget.", duration: "60 min", price: "£70 / $87", tag: "Most popular" },
    { cat: "Facials", title: "Glass Skin Facial", desc: "Achieve a luminous, poreless complexion with this multi-step hydration and brightening treatment.", duration: "75 min", price: "Book for pricing" },
    { cat: "Facials", title: "Deep Cleanse Facial", desc: "A thorough purifying treatment targeting congestion, breakouts, and excess sebum production.", duration: "60 min", price: "Book for pricing" },
    { cat: "Facials", title: "Radiance Boost Facial", desc: "Vitamin C-infused brightening treatment designed to even skin tone and restore natural luminosity.", duration: "60 min", price: "Book for pricing" },
    { cat: "Peels", title: "BioRePeel CI3", desc: "A biphasic trichloroacetic peel that stimulates cell renewal without downtime. Suitable for all skin types.", duration: "45 min", price: "Book for pricing", tag: "No downtime" },
    { cat: "Peels", title: "Superficial Chemical Peel", desc: "Gentle exfoliation targeting surface dullness, fine lines, and uneven texture with AHA/BHA formulations.", duration: "45 min", price: "Book for pricing" },
    { cat: "Peels", title: "Medium Depth Peel", desc: "More intensive resurfacing for deeper pigmentation, acne scars, and textural irregularities.", duration: "60 min", price: "Book for pricing" },
    { cat: "Microneedling", title: "Collagen Induction Therapy", desc: "Precision needling to stimulate the skin's natural collagen production for firmer, smoother skin.", duration: "90 min", price: "Book for pricing" },
    { cat: "Microneedling", title: "Scar Revision Therapy", desc: "Targeted microneedling protocol designed to break down scar tissue and rebuild healthy skin architecture.", duration: "90 min", price: "Book for pricing", tag: "Advanced" },
    { cat: "Microneedling", title: "Microneedling + Serum Infusion", desc: "Enhanced protocol combining collagen induction with active serum delivery for amplified results.", duration: "100 min", price: "Book for pricing" },
  ];

  const visible = activeFilter === "All" ? services : services.filter(s => s.cat === activeFilter);

  return (
    <>
      <style>{`
        .svcs-hero {
          background: #1a2e1c; padding: 10rem 2rem 6rem;
          text-align: center; position: relative; overflow: hidden;
        }
        .svcs-hero-inner { max-width: 600px; margin: 0 auto; position: relative; z-index: 2; animation: fadeUp 0.7s ease both; }
        .filter-row { display: flex; gap: 0.7rem; justify-content: center; flex-wrap: wrap; }
        .filter-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem; letter-spacing: 0.16em; text-transform: uppercase;
          padding: 0.5rem 1.2rem; border-radius: 100px; cursor: pointer;
          transition: all 0.25s; font-weight: 400;
          border: 1px solid rgba(245,222,200,0.15);
          background: transparent; color: rgba(245,222,200,0.45);
        }
        .filter-btn:hover { border-color: rgba(245,222,200,0.35); color: rgba(245,222,200,0.7); }
        .filter-btn.active { background: #3D7A45; border-color: #3D7A45; color: white; }
        .svcs-grid-section { background: #FFF8F2; padding: 5rem 2rem; }
        .svcs-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
        .svc-card {
          background: white; border-radius: 16px;
          border: 1px solid rgba(61,122,69,0.08);
          padding: 1.8rem;
          display: flex; flex-direction: column; gap: 0.8rem;
          transition: all 0.3s; cursor: pointer; position: relative;
        }
        .svc-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: #3D7A45; transform: scaleX(0);
          transform-origin: left; transition: transform 0.3s; border-radius: 2px 2px 0 0;
        }
        .svc-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(26,46,28,0.09); }
        .svc-card:hover::before { transform: scaleX(1); }
        .svc-tag {
          display: inline-block; font-size: 0.58rem; letter-spacing: 0.14em;
          text-transform: uppercase; color: #3D7A45; font-weight: 400;
          background: rgba(61,122,69,0.08); padding: 0.25rem 0.7rem; border-radius: 100px;
          align-self: flex-start;
        }
        .svc-cat { font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(61,122,69,0.5); font-weight: 300; }
        .svc-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-style: italic; font-weight: 400; color: #1a2e1c; }
        .svc-desc { font-size: 0.78rem; font-weight: 300; line-height: 1.75; color: #4a5e4b; flex: 1; }
        .svc-meta { display: flex; justify-content: space-between; align-items: center; padding-top: 0.8rem; border-top: 1px solid rgba(61,122,69,0.08); }
        .svc-duration { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: #4a5e4b; font-weight: 300; }
        .svc-price { font-family: 'Playfair Display', serif; font-size: 0.95rem; color: #1a2e1c; }
        .svcs-cta-section { background: #1a2e1c; padding: 5rem 2rem; text-align: center; }
        .services-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #F5DEC8;
          background: linear-gradient(135deg, #3D7A45 0%, #2d5e34 100%);
          border: 1px solid rgba(245,222,200,0.28);
          border-radius: 999px;
          padding: 1rem 2.5rem;
          cursor: pointer;
          box-shadow: 0 14px 30px rgba(0,0,0,0.28), 0 0 0 1px rgba(245,222,200,0.08) inset;
          transition: transform 0.2s ease, box-shadow 0.25s ease, filter 0.25s ease;
        }
        .services-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 34px rgba(0,0,0,0.32), 0 0 0 1px rgba(245,222,200,0.18) inset;
          filter: brightness(1.05);
        }
        .services-cta-btn:active {
          transform: translateY(0);
        }
        .services-cta-btn-mark {
          font-size: 0.74rem;
          opacity: 0.72;
        }
        @media (max-width: 900px) { .svcs-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .svcs-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section className="svcs-hero">
        <div className="hero-bg-circle" style={{ width: 400, height: 400, right: -100, top: -100, position: "absolute", borderRadius: "50%", border: "1px solid rgba(61,122,69,0.1)", pointerEvents: "none" }} />
        <div className="svcs-hero-inner">
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,222,200,0.35)", fontWeight: 300, marginBottom: "1.2rem" }}>What we offer</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem,5vw,4rem)", fontStyle: "italic", fontWeight: 400, color: "#F5DEC8", lineHeight: 1.15, marginBottom: "1rem" }}>Treatments for every skin story.</h1>
          <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "rgba(245,222,200,0.45)", lineHeight: 1.9, marginBottom: "2.5rem" }}>Every treatment is customised to your unique skin profile, concerns, and goals.</p>
          <div className="filter-row">
            {filters.map(f => (
              <button key={f} className={`filter-btn${activeFilter === f ? " active" : ""}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="svcs-grid-section">
        <div className="svcs-grid">
          {visible.map((s, i) => (
            <AnimBlock key={s.title} delay={`d${(i % 3) + 1}`}>
              <div className="svc-card" onClick={() => setPage("contact")}>
                {s.tag && <span className="svc-tag">{s.tag}</span>}
                <span className="svc-cat">{s.cat}</span>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>
                <div className="svc-meta">
                  <span className="svc-duration">⏱ {s.duration}</span>
                  <span className="svc-price">{s.price}</span>
                </div>
              </div>
            </AnimBlock>
          ))}
        </div>
      </section>

      <section className="svcs-cta-section">
        <AnimBlock><p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,222,200,0.3)", fontWeight: 300, marginBottom: "1.2rem" }}>Not sure where to start?</p></AnimBlock>
        <AnimBlock delay="d1"><h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#F5DEC8", marginBottom: "1rem", fontWeight: 400 }}>Let us guide you.</h2></AnimBlock>
        <AnimBlock delay="d2"><p style={{ fontSize: "0.85rem", fontWeight: 300, color: "rgba(245,222,200,0.45)", lineHeight: 1.9, marginBottom: "2rem", maxWidth: 460, margin: "0 auto 2rem" }}>Start with a consultation and we'll build a treatment plan designed around your skin's specific needs and goals.</p></AnimBlock>
        <AnimBlock delay="d3">
          <button className="services-cta-btn" onClick={() => setPage("contact")}>
            <span className="services-cta-btn-mark">✦</span>
            Book a consultation
            <span className="services-cta-btn-mark">✦</span>
          </button>
        </AnimBlock>
      </section>
    </>
  );
}

// ─── CONTACT ───────────────────────────────────────────────────────────────
function ContactPage() {
  function handleBookNow() {
    window.open("https://www.fresha.com/book-now/zeekarh-cosmetics-rw9b4t2o/services?lid=2601580&eid=4582419&share=true&pId=2519631", "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <style>{`
        .contact-page { min-height: 100svh; background: #1a2e1c; }
        .contact-hero { padding: 9rem 2rem 5rem; text-align: center; border-bottom: 1px solid rgba(245,222,200,0.06); }
        .contact-grid { max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: 1.35fr 1.25fr; gap: 5rem; padding: 5rem 2rem; }
        .contact-info { display: flex; flex-direction: column; gap: 2.5rem; }
        .booking-card {
          background: rgba(245,222,200,0.04);
          border: 1px solid rgba(245,222,200,0.08);
          border-radius: 24px;
          padding: 1.45rem;
          min-height: 100%;
        }
        .booking-image-wrap {
          width: 78%;
          margin: 0 auto 1.15rem;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(245,222,200,0.12);
          box-shadow: 0 10px 30px rgba(0,0,0,0.24);
        }
        .booking-image {
          width: 100%;
          display: block;
          aspect-ratio: 5/4;
          object-fit: cover;
          object-position: center top;
        }
        .booking-btn {
          width: 100%;
          padding: 1rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.76rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          background: #3D7A45;
          color: white;
          border: none;
          border-radius: 100px;
          cursor: pointer;
          font-weight: 400;
          transition: background 0.3s, transform 0.2s;
        }
        .booking-btn:hover { background: #2d5e34; transform: translateY(-1px); }
        .contact-note-card {
          background: rgba(245,222,200,0.05);
          border: 1px solid rgba(245,222,200,0.12);
          border-radius: 20px;
          padding: 1.4rem;
        }
        .contact-note-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.45rem;
          font-style: italic;
          font-weight: 400;
          color: rgba(245,222,200,0.9);
          margin-bottom: 0.8rem;
        }
        .contact-note-text {
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(245,222,200,0.62);
        }
        .contact-note-list {
          margin: 0.9rem 0 0.8rem 1.1rem;
          display: grid;
          gap: 0.5rem;
        }
        .contact-note-list li {
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(245,222,200,0.66);
        }
        .contact-fee-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.7rem;
          margin: 0.9rem 0;
        }
        .contact-fee-chip {
          border: 1px solid rgba(245,222,200,0.14);
          background: rgba(245,222,200,0.03);
          border-radius: 12px;
          padding: 0.7rem 0.9rem;
          text-align: center;
        }
        .contact-fee-country {
          display: block;
          font-size: 0.74rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(245,222,200,0.42);
          margin-bottom: 0.2rem;
        }
        .contact-fee-value {
          font-family: 'Playfair Display', serif;
          font-size: 1.12rem;
          color: rgba(245,222,200,0.9);
        }
        .contact-note-highlight {
          margin-top: 0.8rem;
          padding: 0.8rem 0.9rem;
          border-radius: 12px;
          background: rgba(61,122,69,0.18);
          border: 1px solid rgba(61,122,69,0.34);
          color: rgba(245,222,200,0.92);
          font-size: 0.9rem;
          line-height: 1.75;
          font-weight: 300;
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; padding: 3rem 1.5rem; }
          .booking-card { max-width: 500px; margin: 0 auto; }
          .booking-image-wrap { width: 72%; }
          .contact-fee-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="contact-page">
        <div className="contact-hero" style={{ animation: "fadeUp 0.7s ease both" }}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,222,200,0.3)", fontWeight: 300, marginBottom: "1.2rem" }}>Get in touch</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,5vw,3.8rem)", fontStyle: "italic", fontWeight: 400, color: "#F5DEC8", lineHeight: 1.15, marginBottom: "1rem" }}>Begin your skin journey.</h1>
          <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "rgba(245,222,200,0.4)", lineHeight: 1.9, maxWidth: 460, margin: "0 auto" }}>Book a consultation or reach out with any questions — we're here to help you find the right path to your skin goals.</p>
        </div>

        <div className="contact-grid">
          <AnimBlock>
            <div className="contact-info">
              <div className="contact-note-card">
                <h2 className="contact-note-title">Please Read Before Booking</h2>
                <p className="contact-note-text">This is a virtual skincare consultation, so kindly ensure you're in a quiet space with good lighting for the best experience.</p>

                <p className="contact-note-text" style={{ marginTop: "0.8rem" }}>The consultation includes:</p>
                <ul className="contact-note-list">
                  <li>A comprehensive skin analysis</li>
                  <li>An 8-month personalized skincare routine/guide</li>
                  <li>Product recommendations tailored to your skin type, concerns, and budget</li>
                  <li>Guidance on where to purchase the right products</li>
                </ul>

                <p className="contact-note-text" style={{ marginTop: "0.8rem" }}>Consultation Fee:</p>
                <div className="contact-fee-grid">
                  <div className="contact-fee-chip">
                    <span className="contact-fee-country">🇬🇧 UK</span>
                    <span className="contact-fee-value">£70</span>
                  </div>
                  <div className="contact-fee-chip">
                    <span className="contact-fee-country">🇺🇸 US</span>
                    <span className="contact-fee-value">$87</span>
                  </div>
                </div>

                <p className="contact-note-highlight">✨ If you decide to book an in-clinic treatment afterwards, £20 from your consultation fee will be credited towards your treatment.</p>
                <p className="contact-note-text" style={{ marginTop: "0.9rem" }}>To get the most out of your session, please have a list or clear photos of all the skincare products you're currently using.</p>
              </div>
            </div>
          </AnimBlock>

          <AnimBlock delay="d2">
            <div className="booking-card">
              <div className="booking-image-wrap">
                <img className="booking-image" src="/images/Zee.jpg" alt="Zee - Lead Aesthetician" />
              </div>
              <button className="booking-btn" onClick={handleBookNow}>Book now</button>
            </div>
          </AnimBlock>
        </div>
      </div>
    </>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  const businessHours = [
    { day: "Mon – Fri", hours: "6:00 pm – 7:30 pm" },
    { day: "Saturday", hours: "12:00 pm – 6:00 pm" },
    { day: "Sunday", hours: "1:00 pm – 6:00 pm" },
  ];

  return (
    <footer>
      <style>{`
        .footer-root {
          background: #0e1f10;
          border-top: 1px solid rgba(245,222,200,0.06);
          padding: 5rem 2rem 2.5rem;
          font-family: 'Montserrat', sans-serif;
        }
        .footer-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 3rem;
          padding-bottom: 3.5rem;
          border-bottom: 1px solid rgba(245,222,200,0.07);
        }
        .footer-brand-col {}
        .footer-brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 400;
          color: rgba(245,222,200,0.85);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-bottom: 1rem;
          display: block;
          text-align: left;
        }
        .footer-brand-tagline {
          font-size: 0.76rem;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(245,222,200,0.38);
          max-width: 220px;
          margin-bottom: 1.8rem;
        }
        .footer-socials {
          display: flex;
          gap: 0.55rem;
        }
        .footer-social-link {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(245,222,200,0.55);
          border: 1px solid rgba(245,222,200,0.12);
          background: rgba(245,222,200,0.03);
          transition: all 0.25s;
          text-decoration: none;
        }
        .footer-social-link:hover {
          color: #F5DEC8;
          border-color: rgba(245,222,200,0.4);
          background: rgba(245,222,200,0.07);
          transform: translateY(-2px);
        }
        .footer-col-heading {
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #3D7A45;
          font-weight: 500;
          margin-bottom: 1.2rem;
        }
        .footer-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .footer-nav-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.78rem;
          font-weight: 300;
          color: rgba(245,222,200,0.5);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-align: left;
          transition: color 0.25s;
          line-height: 1.4;
        }
        .footer-nav-btn:hover { color: rgba(245,222,200,0.88); }
        .footer-info-line {
          font-size: 0.78rem;
          font-weight: 300;
          color: rgba(245,222,200,0.5);
          line-height: 1.75;
          text-decoration: none;
          display: block;
          transition: color 0.25s;
        }
        a.footer-info-line:hover { color: rgba(245,222,200,0.88); }
        .footer-hours-row {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          font-size: 0.76rem;
          font-weight: 300;
          line-height: 1.8;
        }
        .footer-hours-day { color: rgba(245,222,200,0.38); }
        .footer-hours-val { color: rgba(245,222,200,0.6); }
        .footer-bottom {
          max-width: 1100px;
          margin: 2rem auto 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .footer-legal-links {
          display: flex;
          gap: 1.4rem;
          flex-wrap: wrap;
        }
        .footer-legal-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(245,222,200,0.22);
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 300;
          padding: 0;
          transition: color 0.25s;
        }
        .footer-legal-btn:hover { color: rgba(245,222,200,0.5); }
        .footer-copy {
          font-size: 0.62rem;
          color: rgba(245,222,200,0.18);
          font-weight: 300;
          text-align: right;
          line-height: 1.6;
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.8rem;
          }
          .footer-copy { text-align: left; }
        }
      `}</style>

      <div className="footer-root">
        <div className="footer-grid">

          {/* ── Brand col ── */}
          <div className="footer-brand-col">
            <button className="footer-brand-name" onClick={() => setPage("home")}>
              Zeekarh Cosmetics
            </button>
            <p className="footer-brand-tagline">
              Clinical skincare rooted in science, delivered with care. Based in Leeds, UK.
            </p>
            <p className="footer-col-heading" style={{ marginBottom: "0.8rem" }}>Follow Us</p>
            <div className="footer-socials">
              {CONTACT_LINKS.filter(link => link.label !== "Call" && link.label !== "WhatsApp").map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-social-link"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Navigation col ── */}
          <div>
            <p className="footer-col-heading">Navigate</p>
            <ul className="footer-nav-list">
              {[["Home","home"],["About","about"],["Services","services"],["Contact","contact"],["Privacy Policy","privacy"],["Terms & Conditions","terms"]].map(([label, id]) => (
                <li key={id}>
                  <button className="footer-nav-btn" onClick={() => setPage(id)}>{label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact col ── */}
          <div>
            <p className="footer-col-heading">Get in Touch</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              <a href="mailto:info@zeekarhcosmetics.com" className="footer-info-line">
                info@zeekarhcosmetics.com
              </a>
              <a href="tel:+442045423996" className="footer-info-line">
                +44 20 4542 3996
              </a>
              <a href="https://wa.me/442045423996" target="_blank" rel="noreferrer" className="footer-info-line">
                WhatsApp us
              </a>
              <a href="https://maps.app.goo.gl/zcZRg7XQmcptAKHL6" target="_blank" rel="noreferrer" className="footer-info-line" style={{ marginTop: "0.4rem" }}>
                Unit 2 Viaduct Street<br />
                Pudsey LS28 6AU<br />
                Stanningley, Leeds
              </a>
            </div>
          </div>

          {/* ── Hours col ── */}
          <div>
            <p className="footer-col-heading">Opening Hours</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {businessHours.map(({ day, hours }) => (
                <div key={day} className="footer-hours-row">
                  <span className="footer-hours-day">{day}</span>
                  <span className="footer-hours-val">{hours}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom" style={{ justifyContent: "center" }}>
          <p className="footer-copy" style={{ textAlign: "center" }}>
            © 2026 Zeekarh Cosmetics. All rights reserved.<br />
            Made by <a href="https://wa.me/2348091394796" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>James Durodola</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function PrivacyPolicyPage({ setPage }) {
  return (
    <EditorialPageShell
      eyebrow="Your information"
      title="Privacy, handled with care."
      intro="Your trust matters. We only collect what is necessary to manage bookings, respond to enquiries, and deliver a smooth consultation experience."
      ctaLabel="Book a consultation"
      onCtaClick={() => setPage("contact")}
    >
      <AnimBlock>
        <p><strong>What we collect.</strong> Information you submit through the website, including your name, email address, skin concerns, and any message you provide, is used only to process your enquiry and coordinate your consultation.</p>
      </AnimBlock>
      <AnimBlock delay="d1">
        <p><strong>How we use it.</strong> We use your details to contact you, confirm bookings, prepare for your session, and improve how we communicate with clients. We do not sell your data or share it for unrelated marketing.</p>
      </AnimBlock>
      <AnimBlock delay="d2">
        <p><strong>Third-party services.</strong> We may rely on trusted scheduling, communication, payment, or analytics providers when needed. Where those tools are used, they operate under their own security and privacy obligations.</p>
      </AnimBlock>
      <AnimBlock delay="d3">
        <p><strong>Your choices.</strong> You may request access to, correction of, or deletion of your information by contacting Zeekarh Cosmetics directly. Continued use of the website means you accept the current version of this policy.</p>
      </AnimBlock>
    </EditorialPageShell>
  );
}

function TermsPage({ setPage }) {
  return (
    <EditorialPageShell
      eyebrow="Before you book"
      title="Clear terms, thoughtful service."
      intro="Every appointment is shaped around safety, suitability, and personalised care. These terms set expectations for bookings, consultations, and treatment planning."
      ctaLabel="Contact us"
      onCtaClick={() => setPage("contact")}
    >
      <AnimBlock>
        <p><strong>Appointments and fees.</strong> Services are offered by appointment only. Consultation fees are non-refundable unless stated otherwise, and treatment recommendations are always based on the information you provide and your practitioner’s professional assessment.</p>
      </AnimBlock>
      <AnimBlock delay="d1">
        <p><strong>Your responsibilities.</strong> You are responsible for sharing accurate medical history, current skincare use, allergies, and any other information that may affect treatment suitability or aftercare guidance.</p>
      </AnimBlock>
      <AnimBlock delay="d2">
        <p><strong>Results and outcomes.</strong> Skincare results vary from person to person. No specific outcome can be guaranteed, even when following a treatment plan or product routine consistently.</p>
      </AnimBlock>
      <AnimBlock delay="d3">
        <p><strong>Cancellations and updates.</strong> Missed appointments or late cancellations may incur a fee where applicable. By using this website or booking a service, you agree to the current terms, which may be updated from time to time.</p>
      </AnimBlock>
    </EditorialPageShell>
  );
}

function NotFoundPage({ setPage }) {
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    setPage("home");
  };

  return (
    <EditorialPageShell
      eyebrow="Page not found"
      title="This page slipped out of reach."
      intro="The link may be outdated, the address may be incorrect, or the page may have moved."
      secondaryCtaLabel="Go back"
      onSecondaryCtaClick={goBack}
      ctaLabel="Return home"
      onCtaClick={() => setPage("home")}
    >
      <AnimBlock>
        <p><strong>404.</strong> The page you requested is not available right now. Use the main navigation or head back to the homepage to continue browsing Zeekarh Cosmetics.</p>
      </AnimBlock>
    </EditorialPageShell>
  );
}

// ─── LOADING SCREEN ────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState("enter"); // enter → hold → exit
  const [showCenterLogo, setShowCenterLogo] = useState(false);

  useEffect(() => {
    // Hold for 2s then begin exit
    const t1 = setTimeout(() => setPhase("exit"), 2200);
    // Tell parent we're done after exit animation completes
    const t2 = setTimeout(() => onDone(), 3000);
    // Show the logo SVG after the ring has been rotating briefly
    const t3 = setTimeout(() => setShowCenterLogo(true), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <>
      <style>{`
        .loader-wrap {
          position: fixed; inset: 0; z-index: 9999;
          background: #1a2e1c;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .loader-wrap.exit {
          opacity: 0;
          transform: scale(1.03);
          pointer-events: none;
        }

        /* Animated leaf / petal ring */
        .loader-ring-svg {
          animation: loader-spin 8s linear infinite;
        }
        .loader-ring-stage {
          width: 110px;
          height: 110px;
          position: relative;
          display: grid;
          place-items: center;
        }
        .loader-center-logo {
          width: 62px;
          height: 62px;
          object-fit: contain;
          position: absolute;
          opacity: 0;
          transform: scale(0.88);
          transition: opacity 0.45s ease, transform 0.45s ease;
          pointer-events: none;
        }
        .loader-center-logo.show {
          opacity: 0.88;
          transform: scale(1);
        }
        @keyframes loader-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Logo text fades up */
        .loader-logo {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 5vw, 2.2rem);
          font-weight: 400; font-style: italic;
          color: #F5DEC8;
          letter-spacing: 0.04em;
          opacity: 0; transform: translateY(18px);
          animation: loader-fadeup 0.8s ease 0.3s forwards;
          margin-top: 2rem;
        }
        @keyframes loader-fadeup {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Tagline */
        .loader-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(245,222,200,0.35); font-weight: 300;
          opacity: 0;
          animation: loader-fadeup 0.8s ease 0.6s forwards;
          margin-top: 0.5rem;
        }

        /* Progress bar */
        .loader-bar-wrap {
          width: 120px; height: 1px;
          background: rgba(245,222,200,0.1);
          margin-top: 2.5rem; border-radius: 1px; overflow: hidden;
          opacity: 0;
          animation: loader-fadeup 0.5s ease 0.8s forwards;
        }
        .loader-bar-fill {
          height: 100%; background: #3D7A45;
          border-radius: 1px;
          animation: loader-progress 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.9s forwards;
          width: 0%;
        }
        @keyframes loader-progress {
          0%   { width: 0%; }
          60%  { width: 75%; }
          85%  { width: 90%; }
          100% { width: 100%; }
        }

        /* Decorative corner lines */
        .loader-corner {
          position: absolute;
          width: 28px; height: 28px;
          opacity: 0;
          animation: loader-fadeup 0.7s ease 0.4s forwards;
        }
        .loader-corner.tl { top: 2rem; left: 2rem; border-top: 1px solid rgba(245,222,200,0.15); border-left: 1px solid rgba(245,222,200,0.15); }
        .loader-corner.tr { top: 2rem; right: 2rem; border-top: 1px solid rgba(245,222,200,0.15); border-right: 1px solid rgba(245,222,200,0.15); }
        .loader-corner.bl { bottom: 2rem; left: 2rem; border-bottom: 1px solid rgba(245,222,200,0.15); border-left: 1px solid rgba(245,222,200,0.15); }
        .loader-corner.br { bottom: 2rem; right: 2rem; border-bottom: 1px solid rgba(245,222,200,0.15); border-right: 1px solid rgba(245,222,200,0.15); }
      `}</style>

      <div className={`loader-wrap${phase === "exit" ? " exit" : ""}`}>
        {/* Corner decorations */}
        <div className="loader-corner tl" />
        <div className="loader-corner tr" />
        <div className="loader-corner bl" />
        <div className="loader-corner br" />

        {/* Spinning botanical ring SVG */}
        <div className="loader-ring-stage">
          <svg
            className="loader-ring-svg"
            width="110" height="110"
            viewBox="0 0 110 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer dashed circle */}
            <circle cx="55" cy="55" r="50" stroke="rgba(245,222,200,0.08)" strokeWidth="0.5" strokeDasharray="3 6" />
            {/* 8 leaf-petal shapes distributed around the ring */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8;
              const rad = (angle * Math.PI) / 180;
              const cx = 55 + 38 * Math.sin(rad);
              const cy = 55 - 38 * Math.cos(rad);
              return (
                <g key={i} transform={`rotate(${angle}, 55, 55)`}>
                  <ellipse
                    cx="55" cy="19"
                    rx="3.5" ry="7"
                    fill={i % 2 === 0 ? "rgba(61,122,69,0.55)" : "rgba(245,222,200,0.12)"}
                  />
                </g>
              );
            })}
            {/* Inner circle */}
            <circle cx="55" cy="55" r="22" stroke="rgba(61,122,69,0.2)" strokeWidth="0.5" />
            {/* Centre dot */}
            <circle cx="55" cy="55" r="3" fill="rgba(61,122,69,0.5)" />
            {/* 4 small diamond accents between petals */}
            {Array.from({ length: 4 }).map((_, i) => {
              const angle = (i * 90) + 45;
              return (
                <g key={i} transform={`rotate(${angle}, 55, 55)`}>
                  <rect x="53.5" y="30" width="3" height="3"
                    fill="rgba(245,222,200,0.2)"
                    transform="rotate(45, 55, 31.5)"
                  />
                </g>
              );
            })}
          </svg>

          {showCenterLogo && (
            <img
              src="/images/logo.svg"
              alt=""
              aria-hidden="true"
              className={`loader-center-logo${showCenterLogo ? " show" : ""}`}
            />
          )}
        </div>

        <p className="loader-logo">Zeekarh Cosmetics</p>
        <p className="loader-tag">Med Spa · Leeds, UK</p>

        <div className="loader-bar-wrap">
          <div className="loader-bar-fill" />
        </div>
      </div>
    </>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────
const VALID_PAGES = ["home", "about", "services", "contact", "privacy", "terms"];

function resolvePageFromLocation() {
  const pathRoute = window.location.pathname.replace(/^\/+|\/+$/g, "").trim().toLowerCase();
  if (pathRoute === "") return "home";
  return VALID_PAGES.includes(pathRoute) ? pathRoute : "404";
}

export default function App() {
  const [page, setPage] = useState(() => resolvePageFromLocation());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onPopState = () => setPage(resolvePageFromLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const changePage = (p) => {
    const next = String(p || "home").toLowerCase();
    setPage(next);
    window.history.pushState(null, "", next === "home" ? "/" : `/${next}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = {
    home: HomePage,
    about: AboutPage,
    services: ServicesPage,
    contact: ContactPage,
    privacy: PrivacyPolicyPage,
    terms: TermsPage,
  };
  const PageComp = pages[page] || NotFoundPage;

  return (
    <>
      <style>{GS}</style>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      {!loading && <Nav page={page} setPage={changePage} />}
      <main style={{ visibility: loading ? "hidden" : "visible" }}>
        <PageComp setPage={changePage} />
      </main>
      {!loading && <Footer setPage={changePage} />}
    </>
  );
}