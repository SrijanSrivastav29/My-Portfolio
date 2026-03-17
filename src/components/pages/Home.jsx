import { useState, useEffect, useRef } from "react";

const roles = [
  { icon: "👔", company: "AuraLinqPr", title: "Team Manager", desc: "Leading and coordinating team operations, driving productivity and strategic alignment across departments.", color: "#00e5ff" },
  { icon: "🎓", company: "IEEE UNS — VBSPU", title: "Chair", desc: "Steering IEEE community initiatives, organizing tech events, and representing the student chapter at institutional level.", color: "#7b2fff" },
  { icon: "🛠️", company: "TechnoHacks", title: "Web Dev Intern", desc: "Hands-on internship focused on modern web development practices and real-world project delivery.", color: "#ff3e6c" },
  { icon: "📣", company: "Passion", title: "Social Media Management", desc: "Crafting digital narratives, growing communities, and building brand presence through strategic content.", color: "#7b2fff" },
  { icon: "🔐", company: "Deep Interest", title: "Cybersecurity", desc: "Exploring web security, ethical hacking, and secure coding at the intersection of web dev and infosec.", color: "#ff3e6c" },
  { icon: null, logo: "/sricore-logo.png", company: "SriCore", title: "Founder", desc: "Building SriCore — a tech venture at the intersection of development, security, and digital innovation.", color: "#00e5ff", link: "https://sricore.com" },
];

const skills = [
  { name: "React JS", pct: 90 },
  { name: "HTML / CSS", pct: 92 },
  { name: "JavaScript", pct: 85 },
  { name: "Responsive Design", pct: 88 },
  { name: "Team Leadership", pct: 87 },
  { name: "Social Media Strategy", pct: 82 },
];

const interests = [
  { icon: "⚛️", title: "React JS Development", desc: "Building modern, component-driven UIs with hooks, context & clean architecture" },
  { icon: "🔐", title: "Cybersecurity", desc: "Web security, ethical hacking, and secure coding practices" },
  { icon: "📣", title: "Social Media Management", desc: "Content strategy, community growth, and digital brand building" },
  { icon: "🏛️", title: "IEEE Community", desc: "Tech community leadership, student chapters & collaborative initiatives" },
  { icon: "🌱", title: "Always Learning", desc: "Exploring the crossroads of web development and cybersecurity" },
  { icon: "🤝", title: "Team Management", desc: "Coordinating teams, aligning goals, and driving collaborative outcomes" },
];

const openTo = [
  { emoji: "✅", title: "Social Media Management", desc: "Open to roles where strategy meets creativity and community growth." },
  { emoji: "🤝", title: "IEEE & Tech Community", desc: "Seeking initiatives that make a meaningful impact on student ecosystems." },
  { emoji: "🔐", title: "Cybersecurity Projects", desc: "Eager to collaborate on CTFs, security research & infosec projects." },
];

function useInView(ref, threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function RevealSection({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
    }}>{children}</div>
  );
}

function SkillBar({ name, pct, delay }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div ref={ref} style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: "clamp(0.82rem, 2.2vw, 0.9rem)", fontWeight: 500, color: "#e2eaf4" }}>{name}</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.68rem, 1.8vw, 0.75rem)", color: "#00e5ff" }}>{pct}%</span>
      </div>
      <div style={{ height: 2, background: "#1a2332", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, height: "100%",
          background: "linear-gradient(90deg, #00e5ff, #7b2fff)",
          width: visible ? `${pct}%` : "0%",
          transition: `width 1.2s ${delay}s cubic-bezier(.4,0,.2,1)`,
        }} />
      </div>
    </div>
  );
}

function RoleCard({ icon, logo, company, title, desc, color, link }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#111923" : "#0f1923",
        padding: "clamp(24px, 4vw, 40px) clamp(20px, 3vw, 32px)",
        position: "relative",
        overflow: "hidden",
        cursor: link ? "pointer" : "default",
        transition: "background 0.3s",
      }}
      onClick={() => link && window.open(link, "_blank")}
    >
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: color,
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.4s ease",
      }} />
      <div style={{ marginBottom: 16 }}>
        {logo ? (
          <img src={logo} alt={company} style={{ width: "clamp(48px, 8vw, 64px)", height: "clamp(48px, 8vw, 64px)", objectFit: "contain", display: "block" }} />
        ) : (
          <span style={{ fontSize: "clamp(1.6rem, 4vw, 2rem)", display: "block" }}>{icon}</span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.58rem, 1.5vw, 0.65rem)", color, letterSpacing: "0.15em", textTransform: "uppercase" }}>{company}</div>
        {link && (
          <a href={link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{
            fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.52rem, 1.2vw, 0.58rem)",
            color: "#5a6a7e", letterSpacing: "0.08em", textDecoration: "none",
            border: "1px solid #1a2332", padding: "2px 8px",
            transition: "color 0.2s, border-color 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#5a6a7e"; e.currentTarget.style.borderColor = "#1a2332"; }}
          >↗ sricore.com</a>
        )}
      </div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.3rem, 3.5vw, 1.7rem)", letterSpacing: "0.05em", marginBottom: 12, color: "#e2eaf4", lineHeight: 1.1 }}>{title}</div>
      <p style={{ fontSize: "clamp(0.78rem, 2vw, 0.88rem)", color: "#5a6a7e", lineHeight: 1.8, fontWeight: 300 }}>{desc}</p>
    </div>
  );
}

function InterestChip({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "clamp(14px, 2.5vw, 20px) clamp(16px, 3vw, 24px)",
        border: `1px solid ${hovered ? "#00e5ff" : "#1a2332"}`,
        background: "#0f1923",
        transform: hovered ? "translateX(6px)" : "translateX(0)",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
    >
      <span style={{ fontSize: "clamp(1.2rem, 3vw, 1.5rem)", flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ fontSize: "clamp(0.82rem, 2.2vw, 0.92rem)", fontWeight: 500, color: "#e2eaf4", marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: "clamp(0.72rem, 1.8vw, 0.8rem)", color: "#5a6a7e", fontWeight: 300 }}>{desc}</div>
      </div>
    </div>
  );
}

function OpenCard({ emoji, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#0d1520" : "#0d1117",
        padding: "clamp(32px, 5vw, 52px) clamp(20px, 4vw, 36px)",
        textAlign: "center",
        transition: "background 0.3s",
        cursor: "default",
      }}
    >
      <span style={{ fontSize: "clamp(2rem, 5vw, 2.6rem)", display: "block", marginBottom: 16 }}>{emoji}</span>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem, 3.5vw, 1.5rem)", letterSpacing: "0.08em", color: "#e2eaf4", marginBottom: 10 }}>{title}</div>
      <p style={{ fontSize: "clamp(0.78rem, 2vw, 0.86rem)", color: "#5a6a7e", lineHeight: 1.8, fontWeight: 300 }}>{desc}</p>
    </div>
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const move = (e) => { posRef.current = { x: e.clientX, y: e.clientY }; setPos({ x: e.clientX, y: e.clientY }); };
    window.addEventListener("mousemove", move);
    let raf;
    const anim = () => {
      ringRef.current.x += (posRef.current.x - ringRef.current.x) * 0.13;
      ringRef.current.y += (posRef.current.y - ringRef.current.y) * 0.13;
      setRing({ ...ringRef.current });
      raf = requestAnimationFrame(anim);
    };
    raf = requestAnimationFrame(anim);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, [isMobile]);

  if (isMobile) return null;
  return (
    <>
      <div style={{ position: "fixed", pointerEvents: "none", zIndex: 9999, left: pos.x, top: pos.y, width: 10, height: 10, background: "#00e5ff", borderRadius: "50%", transform: "translate(-50%,-50%)", mixBlendMode: "difference" }} />
      <div style={{ position: "fixed", pointerEvents: "none", zIndex: 9998, left: ring.x, top: ring.y, width: 34, height: 34, border: "1px solid #00e5ff", borderRadius: "50%", transform: "translate(-50%,-50%)", opacity: 0.4 }} />
    </>
  );
}

export default function Portfolio() {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #080b10; font-family: 'DM Sans', sans-serif; overflow-x: hidden; width: 100%; }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(0,230,118,0.4); } 50% { box-shadow: 0 0 0 8px rgba(0,230,118,0); } }
      @keyframes scan { from { top: -2px; } to { top: 100vh; } }
      @keyframes fadeDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
      .scanline { position:fixed; top:0; left:0; right:0; height:2px; background:rgba(0,229,255,0.08); pointer-events:none; z-index:999; animation: scan 8s linear infinite; }
      .grid-bg::after { content:''; position:fixed; inset:0; background-image: linear-gradient(rgba(0,229,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.022) 1px,transparent 1px); background-size:64px 64px; pointer-events:none; z-index:0; }
      @media (hover:none) { body { cursor: auto; } }
      @media (hover:fine) { body { cursor: none; } }
      @media (max-width: 768px) {
        .nav-links { display: none !important; }
        .hamburger { display: flex !important; }
        .hero-grid { grid-template-columns: 1fr !important; padding: 100px 20px 60px !important; gap: 40px !important; }
        .profile-col { order: -1; }
        .roles-grid { grid-template-columns: 1fr !important; }
        .skills-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        .opento-grid { grid-template-columns: 1fr !important; }
        .section-pad { padding: 60px 20px !important; }
        .contact-pad { padding: 70px 20px !important; }
        .footer-inner { flex-direction: column !important; gap: 20px !important; text-align: center !important; }
        .nav-inner { padding: 14px 20px !important; }
        .mobile-menu { display: block !important; }
      }
      @media (max-width: 480px) {
        .hero-grid { padding: 90px 16px 50px !important; }
        .section-pad { padding: 50px 16px !important; }
        .contact-pad { padding: 60px 16px !important; }
      }
    `;
    document.head.appendChild(style);
    document.body.classList.add("grid-bg");
    return () => { document.head.removeChild(style); document.body.classList.remove("grid-bg"); };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = ["about", "roles", "skills", "open-to", "contact"];

  return (
    <div style={{ background: "#080b10", color: "#e2eaf4", minHeight: "100vh", position: "relative", zIndex: 1, width: "100%", overflowX: "hidden" }}>
      <Cursor />
      <div className="scanline" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: "1px solid #1a2332",
        background: navSolid ? "rgba(8,11,16,0.95)" : "rgba(8,11,16,0.7)",
        backdropFilter: "blur(16px)",
        transition: "background 0.3s",
      }}>
        <div className="nav-inner" style={{ padding: "16px 60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.1em", cursor: "pointer" }} onClick={() => scrollTo("about")}>
            SRIJAN SRIVASTAV<span style={{ color: "#00e5ff" }}></span>
          </div>

          {/* Desktop links */}
          <div className="nav-links" style={{ display: "flex", gap: 32 }}>
            {navItems.map(id => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Space Mono', monospace", fontSize: "0.65rem",
                color: "#5a6a7e", letterSpacing: "0.12em", textTransform: "uppercase",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "#00e5ff"}
                onMouseLeave={e => e.target.style.color = "#5a6a7e"}
              >{id}</button>
            ))}
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} style={{
            display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4,
          }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ width: 24, height: 1.5, background: "#e2eaf4", display: "block", transition: "0.3s",
                transform: menuOpen && i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu" style={{ display: "block", borderTop: "1px solid #1a2332", animation: "fadeDown 0.25s ease" }}>
            {navItems.map(id => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                display: "block", width: "100%", padding: "16px 20px", background: "none", border: "none",
                borderBottom: "1px solid #1a2332", cursor: "pointer",
                fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#e2eaf4",
                letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "left",
              }}>{id}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="about" style={{ width: "100%" }}>
        <div className="hero-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          alignItems: "flex-end", padding: "100px 60px 0", gap: 60,
          maxWidth: 1280, margin: "0 auto", position: "relative",
        }}>
          <div style={{ position: "absolute", top: "20%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(123,47,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

          {/* Text */}
          <div style={{ position: "relative", zIndex: 1, paddingBottom: "clamp(40px, 6vw, 80px)" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.6rem, 1.5vw, 0.72rem)", color: "#00e5ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 28, height: 1, background: "#00e5ff", display: "inline-block", flexShrink: 0 }} />
              Full Stack of Ambition
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 9vw, 9rem)", lineHeight: 0.9, letterSpacing: "0.02em", marginBottom: 28 }}>
              <span style={{ color: "#00e5ff" }}>SRIJAN</span><br />
              <span style={{ color: "#e2eaf4" }}>SRIVASTAV</span>
            </h1>
            <p style={{ fontSize: "clamp(0.9rem, 2.2vw, 1.05rem)", color: "#5a6a7e", lineHeight: 1.85, maxWidth: 480, marginBottom: 40, fontWeight: 300 }}>
              Frontend developer, IEEE leader, and aspiring cybersecurity specialist. Building at the intersection of clean code, community, and digital security — one commit at a time.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("roles")} style={{
                padding: "clamp(11px,2vw,14px) clamp(22px,3vw,32px)", background: "#00e5ff", color: "#080b10",
                fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.65rem, 1.5vw, 0.74rem)", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer",
                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 28px rgba(0,229,255,0.35)"; }}
                onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
              >View Experience</button>
              <button onClick={() => scrollTo("open-to")} style={{
                padding: "clamp(11px,2vw,14px) clamp(22px,3vw,32px)", background: "transparent", color: "#e2eaf4",
                fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.65rem, 1.5vw, 0.74rem)",
                letterSpacing: "0.12em", textTransform: "uppercase",
                border: "1px solid #1a2332", cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.target.style.borderColor = "#00e5ff"; e.target.style.color = "#00e5ff"; }}
                onMouseLeave={e => { e.target.style.borderColor = "#1a2332"; e.target.style.color = "#e2eaf4"; }}
              >Open To Work</button>
            </div>
          </div>

          {/* Portrait Photo */}
          <div className="profile-col" style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", position: "relative" }}>
            {/* Ambient glow behind photo */}
            <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "70%", height: "60%", background: "radial-gradient(ellipse at bottom, rgba(0,229,255,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "50%", height: "40%", background: "radial-gradient(ellipse, rgba(123,47,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

            {/* Decorative vertical line accents */}
            <div style={{ position: "absolute", left: "8%", top: "10%", width: 1, height: "30%", background: "linear-gradient(to bottom, transparent, #00e5ff44, transparent)" }} />
            <div style={{ position: "absolute", right: "8%", top: "30%", width: 1, height: "25%", background: "linear-gradient(to bottom, transparent, #7b2fff44, transparent)" }} />

            <div style={{ position: "relative", width: "clamp(260px, 42vw, 420px)" }}>
              {/* Corner accent top-left */}
              <div style={{ position: "absolute", top: -8, left: -8, width: 32, height: 32, borderTop: "2px solid #00e5ff", borderLeft: "2px solid #00e5ff", zIndex: 2 }} />
              {/* Corner accent bottom-right */}
              <div style={{ position: "absolute", bottom: -8, right: -8, width: 32, height: 32, borderBottom: "2px solid #7b2fff", borderRight: "2px solid #7b2fff", zIndex: 2 }} />

              <img
                src="/profile.png"
                alt="Srijan Srivastav"
                style={{
                  width: "100%",
                  aspectRatio: "3 / 4",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                  filter: "grayscale(15%) contrast(1.05)",
                }}
              />

              {/* Bottom name overlay */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "40px 20px 18px",
                background: "linear-gradient(to top, rgba(8,11,16,0.92) 0%, transparent 100%)",
                display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", letterSpacing: "0.1em", lineHeight: 1 }}>SRIJAN SRIVASTAV</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.52rem, 1.2vw, 0.6rem)", color: "#00e5ff", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 5 }}>IEEE Chair · Social Media Management · Web Development · Cyber Security</div>
                </div>
                <div style={{ width: 10, height: 10, background: "#00e676", borderRadius: "50%", border: "2px solid #080b10", animation: "pulse 2s infinite", flexShrink: 0, marginBottom: 4 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 60px" }}>
          <RevealSection>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)", color: "#00e5ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 22, height: 1, background: "#00e5ff", display: "inline-block" }} /> Experience
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem, 6vw, 5rem)", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 48 }}>
              Current <span style={{ color: "#00e5ff" }}>Roles</span>
            </h2>
          </RevealSection>
          <RevealSection delay={0.1}>
            <div className="roles-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              border: "1px solid #00e5ff33", background: "linear-gradient(135deg, #00e5ff33, #7b2fff33)", gap: 1,
            }}>
              {roles.map((r, i) => <RoleCard key={i} {...r} />)}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 60px" }}>
          <RevealSection>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)", color: "#7b2fff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 22, height: 1, background: "#7b2fff", display: "inline-block" }} /> Capabilities
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem, 6vw, 5rem)", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 48 }}>
              Skills & <span style={{ color: "#7b2fff" }}>Interests</span>
            </h2>
          </RevealSection>

          <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
            <div>
              <RevealSection delay={0.1}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.58rem, 1.4vw, 0.65rem)", color: "#5a6a7e", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24, borderBottom: "1px solid #1a2332", paddingBottom: 12 }}>// Core Skills</div>
                {skills.map((s, i) => <SkillBar key={i} {...s} delay={i * 0.1} />)}
              </RevealSection>
            </div>
            <div>
              <RevealSection delay={0.15}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.58rem, 1.4vw, 0.65rem)", color: "#5a6a7e", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24, borderBottom: "1px solid #1a2332", paddingBottom: 12 }}>// Passions & Deep Interests</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {interests.map((item, i) => (
                    <RevealSection key={i} delay={0.1 + i * 0.07}>
                      <InterestChip {...item} />
                    </RevealSection>
                  ))}
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* OPEN TO */}
      <section id="open-to" style={{ background: "#0d1117", borderTop: "1px solid #1a2332", borderBottom: "1px solid #1a2332", position: "relative", zIndex: 1, width: "100%" }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 60px" }}>
          <RevealSection>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)", color: "#ff3e6c", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 22, height: 1, background: "#ff3e6c", display: "inline-block" }} /> Availability
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem, 6vw, 5rem)", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 48 }}>
              Open <span style={{ color: "#ff3e6c" }}>To</span>
            </h2>
          </RevealSection>
          <RevealSection delay={0.1}>
            <div className="opento-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid #ff3e6c33", background: "linear-gradient(135deg, #ff3e6c33, #7b2fff33)", gap: 1 }}>
              {openTo.map((o, i) => <OpenCard key={i} {...o} />)}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="contact-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "110px 60px", textAlign: "center" }}>
          <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 300, background: "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
          <RevealSection>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)", color: "#00e5ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <span style={{ width: 22, height: 1, background: "#00e5ff", display: "inline-block" }} /> Let's Connect
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem, 9vw, 7rem)", letterSpacing: "0.03em", lineHeight: 0.9, marginBottom: 28 }}>
              Let's Build<br /><span style={{ color: "#00e5ff" }}>Something</span>
            </h2>
            <p style={{ color: "#5a6a7e", fontSize: "clamp(0.88rem, 2.2vw, 1.02rem)", maxWidth: 500, margin: "0 auto 48px", lineHeight: 1.85, fontWeight: 300 }}>
              Frontend project, cybersecurity collab, social media campaign, or an IEEE initiative — I'm ready to connect.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="mailto:srivastav.srijan@ieee.org" style={{
                padding: "clamp(11px,2vw,14px) clamp(22px,3vw,32px)", background: "#00e5ff", color: "#080b10",
                fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.65rem, 1.5vw, 0.74rem)", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "inline-block",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(0,229,255,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >Get In Touch</a>
              {[
                { label: "GitHub", href: "https://github.com/SrijanSrivastav29" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/srijansrivastav29" },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                  padding: "clamp(11px,2vw,14px) clamp(22px,3vw,32px)", background: "transparent", color: "#e2eaf4",
                  fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.65rem, 1.5vw, 0.74rem)",
                  letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                  border: "1px solid #1a2332", transition: "border-color 0.2s, color 0.2s", display: "inline-block",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#00e5ff"; e.currentTarget.style.color = "#00e5ff"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a2332"; e.currentTarget.style.color = "#e2eaf4"; }}
                >{label}</a>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "clamp(28px,4vw,48px) clamp(20px,5vw,60px)", borderTop: "1px solid #1a2332", position: "relative", zIndex: 1, width: "100%" }}>
        <div className="footer-inner" style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", letterSpacing: "0.1em" }}>
            SRIJAN<span style={{ color: "#00e5ff" }}> </span>SRIVASTAV
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { label: "📧", href: "mailto:srivastav.srijan@ieee.org" },
              { label: "📱", href: "tel:+918853942888" },
              { label: "🐙", href: "https://github.com/SrijanSrivastav29" },
              { label: "💼", href: "https://www.linkedin.com/in/srijansrivastav29" },
            ].map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noreferrer" style={{ fontSize: "1.2rem", textDecoration: "none", opacity: 0.6, transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                onMouseLeave={e => e.currentTarget.style.opacity = "0.6"}
              >{c.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}