import { useState, useEffect, useRef } from "react";

const roles = [
  {
    icon: "👔",
    company: "AuraLinqPr",
    title: "Team Manager",
    desc: "Leading and coordinating team operations, driving productivity and strategic alignment across departments.",
    color: "#00e5ff",
  },
  {
    icon: "🎓",
    company: "IEEE UNS — VBSPU",
    title: "Vice Chair",
    desc: "Steering IEEE community initiatives, organizing tech events, and representing the student chapter at institutional level.",
    color: "#7b2fff",
  },
  {
    icon: "💻",
    company: "Classworks.in",
    title: "Frontend Developer",
    desc: "Building responsive, performant UIs with React JS — crafting seamless digital learning experiences.",
    color: "#00e5ff",
  },
  {
    icon: "🛠️",
    company: "TechnoHacks",
    title: "Web Dev Intern",
    desc: "Hands-on internship focused on modern web development practices and real-world project delivery.",
    color: "#ff3e6c",
  },
  {
    icon: "📣",
    company: "Passion",
    title: "Social Media Management",
    desc: "Crafting digital narratives, growing communities, and building brand presence through strategic content.",
    color: "#7b2fff",
  },
  {
    icon: "🔐",
    company: "Deep Interest",
    title: "Cybersecurity",
    desc: "Exploring web security, ethical hacking, and secure coding at the intersection of web dev and infosec.",
    color: "#ff3e6c",
  },
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

function useInView(ref, threshold = 0.15) {
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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
      }}
    >
      {children}
    </div>
  );
}

function SkillBar({ name, pct, delay }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#e2eaf4" }}>{name}</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#00e5ff" }}>{pct}%</span>
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

function RoleCard({ icon, company, title, desc, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#111923" : "#0f1923",
        padding: "36px 28px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "background 0.3s",
        borderRight: "1px solid #1a2332",
        borderBottom: "1px solid #1a2332",
      }}
    >
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: color,
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.4s ease",
      }} />
      <span style={{ fontSize: "1.8rem", marginBottom: 16, display: "block" }}>{icon}</span>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{company}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.05em", marginBottom: 12, color: "#e2eaf4", lineHeight: 1.1 }}>{title}</div>
      <p style={{ fontSize: "0.82rem", color: "#5a6a7e", lineHeight: 1.75, fontWeight: 300 }}>{desc}</p>
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
        padding: "18px 22px",
        border: `1px solid ${hovered ? "#00e5ff" : "#1a2332"}`,
        background: "#0f1923",
        transform: hovered ? "translateX(8px)" : "translateX(0)",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
    >
      <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ fontSize: "0.88rem", fontWeight: 500, color: "#e2eaf4", marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: "0.76rem", color: "#5a6a7e", fontWeight: 300 }}>{desc}</div>
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
        padding: "44px 32px",
        textAlign: "center",
        borderRight: "1px solid #1a2332",
        transition: "background 0.3s",
        cursor: "default",
      }}
    >
      <span style={{ fontSize: "2.4rem", display: "block", marginBottom: 16 }}>{emoji}</span>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.08em", color: "#e2eaf4", marginBottom: 10 }}>{title}</div>
      <p style={{ fontSize: "0.82rem", color: "#5a6a7e", lineHeight: 1.75, fontWeight: 300 }}>{desc}</p>
    </div>
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [big, setBig] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
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

    const enter = () => setBig(true);
    const leave = () => setBig(false);
    document.querySelectorAll("a,button,[data-hover]").forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 9999,
        left: pos.x, top: pos.y,
        width: big ? 20 : 10, height: big ? 20 : 10,
        background: "#00e5ff", borderRadius: "50%",
        transform: "translate(-50%,-50%)",
        transition: "width 0.2s, height 0.2s",
        mixBlendMode: "difference",
      }} />
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 9998,
        left: ring.x, top: ring.y,
        width: big ? 56 : 34, height: big ? 56 : 34,
        border: "1px solid #00e5ff", borderRadius: "50%",
        transform: "translate(-50%,-50%)",
        opacity: 0.45,
        transition: "width 0.3s, height 0.3s",
      }} />
    </>
  );
}

export default function Portfolio() {
  const [navSolid, setNavSolid] = useState(false);
  const [termLine, setTermLine] = useState(0);
  const termLines = [
    { type: "comment", text: "// SRIJAN SRIVASTAV — v2025" },
    { type: "kv", key: '"role"', val: '"Team Manager + Frontend Dev"', comma: true },
    { type: "kv", key: '"org"', val: '"IEEE Vice Chair"', comma: true },
    { type: "kv", key: '"stack"', val: '"React JS + Security"', comma: true },
    { type: "kv", key: '"openToWork"', val: "true", comma: true, bool: true },
    { type: "kv", key: '"coffee"', val: "Infinity", comma: false, num: true },
    { type: "cmd", text: '$ git commit -m "always learning"' },
  ];

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (termLine < termLines.length) {
      const t = setTimeout(() => setTermLine(l => l + 1), 380);
      return () => clearTimeout(t);
    }
  }, [termLine]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // CSS injection for fonts, global styles, animations
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { cursor: none; background: #080b10; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(0,230,118,0.4); } 50% { box-shadow: 0 0 0 8px rgba(0,230,118,0); } }
      @keyframes scan { from { top: -2px; } to { top: 100vh; } }
      @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
      .scanline { position:fixed; top:0; left:0; right:0; height:2px; background:rgba(0,229,255,0.1); pointer-events:none; z-index:999; animation: scan 7s linear infinite; }
      .grid-bg::after { content:''; position:fixed; inset:0; background-image: linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px); background-size:64px 64px; pointer-events:none; z-index:0; }
    `;
    document.head.appendChild(style);
    document.body.classList.add("grid-bg");
    return () => { document.head.removeChild(style); document.body.classList.remove("grid-bg"); };
  }, []);

  const S = (styles) => styles; // passthrough for readability

  return (
    <div style={{ background: "#080b10", color: "#e2eaf4", minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <Cursor />
      <div className="scanline" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "18px 60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #1a2332",
        background: navSolid ? "rgba(8,11,16,0.92)" : "rgba(8,11,16,0.6)",
        backdropFilter: "blur(14px)",
        transition: "background 0.3s",
      }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#00e5ff", letterSpacing: "0.18em", textTransform: "uppercase" }}>
          SRIJAN.DEV
        </div>
        <div style={{ display: "flex", gap: 36 }}>
          {["about", "roles", "skills", "open-to", "contact"].map(id => (
            <button key={id} data-hover onClick={() => scrollTo(id)} style={{
              background: "none", border: "none", cursor: "none",
              fontFamily: "'Space Mono', monospace", fontSize: "0.68rem",
              color: "#5a6a7e", letterSpacing: "0.1em", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#00e5ff"}
              onMouseLeave={e => e.target.style.color = "#5a6a7e"}
            >{id}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={{
        minHeight: "100vh",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "120px 60px 80px",
        gap: 60,
        position: "relative",
      }}>
        {/* Ambient glow */}
        <div style={{ position: "absolute", top: "20%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(123,47,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#00e5ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 28, height: 1, background: "#00e5ff", display: "inline-block" }} />
            Full Stack of Ambition
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4.5rem, 7vw, 8.5rem)", lineHeight: 0.9, letterSpacing: "0.02em", marginBottom: 28 }}>
            <span style={{ color: "#5a6a7e" }}>SRIJAN</span><br />
            <span style={{ color: "#00e5ff" }}>SRIVAS</span><br />
            <span style={{ color: "#e2eaf4" }}>TAV</span>
          </h1>
          <p style={{ fontSize: "1rem", color: "#5a6a7e", lineHeight: 1.85, maxWidth: 440, marginBottom: 40, fontWeight: 300 }}>
            Frontend developer, IEEE leader, and aspiring cybersecurity specialist. 
            Building at the intersection of clean code, community, and digital security — one commit at a time.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button data-hover onClick={() => scrollTo("roles")} style={{
              padding: "13px 30px", background: "#00e5ff", color: "#080b10",
              fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "none",
              clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 28px rgba(0,229,255,0.4)"; }}
              onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
            >
              View Experience
            </button>
            <button data-hover onClick={() => scrollTo("open-to")} style={{
              padding: "13px 30px", background: "transparent", color: "#e2eaf4",
              fontFamily: "'Space Mono', monospace", fontSize: "0.72rem",
              letterSpacing: "0.12em", textTransform: "uppercase",
              border: "1px solid #1a2332", cursor: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#00e5ff"; e.target.style.color = "#00e5ff"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#1a2332"; e.target.style.color = "#e2eaf4"; }}
            >
              Open To Work
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
          {/* Orbiting rings */}
          <div style={{ position: "absolute", inset: -90, pointerEvents: "none" }}>
            <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(0,229,255,0.07)", borderRadius: "50%", animation: "spin 22s linear infinite" }}>
              <div style={{ position: "absolute", top: -4, left: "calc(50% - 4px)", width: 8, height: 8, background: "#00e5ff", borderRadius: "50%", boxShadow: "0 0 12px #00e5ff" }} />
            </div>
            <div style={{ position: "absolute", inset: 22, border: "1px solid rgba(123,47,255,0.07)", borderRadius: "50%", animation: "spin 35s linear infinite reverse" }}>
              <div style={{ position: "absolute", top: -3, left: "calc(50% - 3px)", width: 6, height: 6, background: "#7b2fff", borderRadius: "50%", boxShadow: "0 0 10px #7b2fff" }} />
            </div>
          </div>

          <div style={{
            width: 300, border: "1px solid #1a2332", background: "#0f1923",
            padding: "36px 32px", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #00e5ff, #7b2fff)" }} />

            <div style={{ width: 96, height: 96, borderRadius: "50%", border: "2px solid #00e5ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", position: "relative", boxShadow: "0 0 30px rgba(0,229,255,0.2)" }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "#00e5ff", letterSpacing: "0.05em" }}>SS</span>
              <div style={{ position: "absolute", bottom: 4, right: 4, width: 13, height: 13, background: "#00e676", borderRadius: "50%", border: "2px solid #0f1923", animation: "pulse 2s infinite" }} />
            </div>

            <div style={{ textAlign: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.7rem", letterSpacing: "0.08em", marginBottom: 4 }}>SRIJAN SRIVASTAV</div>
            <div style={{ textAlign: "center", fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: "#00e5ff", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>Frontend Dev · IEEE · Security</div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center" }}>
              {["React JS", "Cybersecurity", "IEEE VP", "Social Media", "Web Dev"].map((t, i) => (
                <span key={i} style={{
                  padding: "3px 11px",
                  border: `1px solid ${i < 2 ? "#00e5ff" : "#1a2332"}`,
                  fontFamily: "'Space Mono', monospace", fontSize: "0.57rem",
                  color: i < 2 ? "#00e5ff" : "#5a6a7e",
                  background: i < 2 ? "rgba(0,229,255,0.05)" : "transparent",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "90px 60px" }}>
          <RevealSection>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "#00e5ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 22, height: 1, background: "#00e5ff", display: "inline-block" }} /> Experience
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 52 }}>
              Current <span style={{ color: "#00e5ff" }}>Roles</span>
            </h2>
          </RevealSection>
          <RevealSection delay={0.1}>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              border: "1px solid #1a2332",
              background: "#1a2332",
              gap: 1,
            }}>
              {roles.map((r, i) => <RoleCard key={i} {...r} />)}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "90px 60px" }}>
          <RevealSection>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "#7b2fff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 22, height: 1, background: "#7b2fff", display: "inline-block" }} /> Capabilities
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 52 }}>
              Skills & <span style={{ color: "#7b2fff" }}>Interests</span>
            </h2>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
            {/* Left: bars + terminal */}
            <div>
              <RevealSection delay={0.1}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: "#5a6a7e", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20, borderBottom: "1px solid #1a2332", paddingBottom: 10 }}>// Core Skills</div>
                {skills.map((s, i) => <SkillBar key={i} {...s} delay={i * 0.1} />)}
              </RevealSection>

              {/* Terminal */}
              <RevealSection delay={0.3}>
                <div style={{ marginTop: 36, background: "#060a0e", border: "1px solid #1a2332", overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 18px", background: "#0f1923", borderBottom: "1px solid #1a2332" }}>
                    {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: "#5a6a7e", marginLeft: 8, letterSpacing: "0.1em" }}>whoami.json</span>
                  </div>
                  <div style={{ padding: "24px 26px", fontFamily: "'Space Mono', monospace", fontSize: "0.76rem", lineHeight: 2 }}>
                    {termLines.slice(0, termLine).map((l, i) => (
                      <div key={i}>
                        {l.type === "comment" && <span style={{ color: "#3d5a6e" }}>{l.text}</span>}
                        {l.type === "kv" && (
                          <span>
                            <span style={{ color: "#7b2fff" }}>{l.key}</span>
                            <span style={{ color: "#5a6a7e" }}>: </span>
                            <span style={{ color: l.bool ? "#ff3e6c" : l.num ? "#00e5ff" : "#e6b450" }}>{l.val}</span>
                            {l.comma && <span style={{ color: "#5a6a7e" }}>,</span>}
                          </span>
                        )}
                        {l.type === "cmd" && <span><span style={{ color: "#5a6a7e" }}>$ </span><span style={{ color: "#e2eaf4" }}>git commit -m "always learning"</span></span>}
                      </div>
                    ))}
                    {termLine < termLines.length && (
                      <span style={{ display: "inline-block", width: 8, height: 15, background: "#00e5ff", animation: "blink 1s infinite", verticalAlign: "middle" }} />
                    )}
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* Right: interests */}
            <div>
              <RevealSection delay={0.15}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: "#5a6a7e", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20, borderBottom: "1px solid #1a2332", paddingBottom: 10 }}>// Passions & Deep Interests</div>
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
      <section id="open-to" style={{ background: "#0d1117", borderTop: "1px solid #1a2332", borderBottom: "1px solid #1a2332", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "90px 60px" }}>
          <RevealSection>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "#ff3e6c", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 22, height: 1, background: "#ff3e6c", display: "inline-block" }} /> Availability
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 52 }}>
              Open <span style={{ color: "#ff3e6c" }}>To</span>
            </h2>
          </RevealSection>
          <RevealSection delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid #1a2332", background: "#1a2332", gap: 1 }}>
              {openTo.map((o, i) => <OpenCard key={i} {...o} />)}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 60px", textAlign: "center" }}>
          <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 300, background: "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
          <RevealSection>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "#00e5ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <span style={{ width: 22, height: 1, background: "#00e5ff", display: "inline-block" }} /> Let's Connect
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 7vw, 6.5rem)", letterSpacing: "0.03em", lineHeight: 0.9, marginBottom: 28 }}>
              Let's Build<br /><span style={{ color: "#00e5ff" }}>Something</span>
            </h2>
            <p style={{ color: "#5a6a7e", fontSize: "1rem", maxWidth: 480, margin: "0 auto 44px", lineHeight: 1.85, fontWeight: 300 }}>
              Frontend project, cybersecurity collab, social media campaign, or an IEEE initiative — I'm ready to connect.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="mailto:srijan@dev.com" data-hover style={{
                padding: "13px 30px", background: "#00e5ff", color: "#080b10",
                fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 28px rgba(0,229,255,0.4)"; }}
                onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
              >Get In Touch</a>
              <a href="https://linkedin.com" data-hover style={{
                padding: "13px 30px", background: "transparent", color: "#e2eaf4",
                fontFamily: "'Space Mono', monospace", fontSize: "0.72rem",
                letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                border: "1px solid #1a2332", transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.target.style.borderColor = "#00e5ff"; e.target.style.color = "#00e5ff"; }}
                onMouseLeave={e => { e.target.style.borderColor = "#1a2332"; e.target.style.color = "#e2eaf4"; }}
              >LinkedIn</a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "48px 60px", borderTop: "1px solid #1a2332", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.1em" }}>
          SRIJAN<span style={{ color: "#00e5ff" }}>.</span>DEV
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: "#5a6a7e", letterSpacing: "0.1em", textAlign: "right", lineHeight: 1.9 }}>
          Built with React JS · IEEE · Passion<br />
          © 2025 Srijan Srivastav — All rights reserved
        </div>
      </footer>
    </div>
  );
}