import { useState, useEffect, useRef } from 'react';

/* ─── DATA ──────────────────────────────────────────────────────── */
const currentRoles = [
  { icon: '👔', title: 'Team Manager',       org: 'AuraLinqPr',                            color: '#ff6b35' },
  { icon: '🏛️', title: 'Vice Chair',         org: 'IEEE UNS Institute of Technology, VBSPU', color: '#845ef7' },
  { icon: '💻', title: 'Frontend Developer', org: 'Classworks.in',                          color: '#00c9a7' },
  { icon: '🔧', title: 'Web Dev Intern',     org: 'TechnoHacks',                            color: '#3b9eff' },
];

const skillGroups = [
  { icon: '🎨', label: 'Frontend Development', color: '#ff6b35',
    items: ['React.js', 'Next.js', 'JavaScript ES6+', 'HTML5 & CSS3', 'Tailwind CSS', 'Responsive Design', 'Git & GitHub'] },
  { icon: '📣', label: 'Social Media & Marketing', color: '#f7b731',
    items: ['Content Strategy', 'Brand Management', 'Community Building', 'Analytics & Insights', 'Campaign Planning'] },
  { icon: '🔐', label: 'Cybersecurity Interests', color: '#ff4d6d',
    items: ['Web Security', 'OWASP Top 10', 'CTF Challenges', 'Secure Coding', 'Network Fundamentals'] },
];

const aboutFacts = [
  { icon: '👔', text: 'Team Manager @ AuraLinqPr' },
  { icon: '🎓', text: 'Vice Chair | IEEE UNS Institute of Technology, VBSPU' },
  { icon: '💼', text: 'Frontend Developer @ Classworks.in' },
  { icon: '🛠️', text: 'Web Development Intern @ TechnoHacks' },
  { icon: '📣', text: 'Passionate about Social Media Management' },
  { icon: '🔐', text: 'Deeply interested in Cybersecurity' },
  { icon: '🌱', text: 'Exploring web dev × security intersection' },
];

const openTo = [
  { icon: '✅', text: 'Social Media Management opportunities', color: '#00c9a7' },
  { icon: '🔐', text: 'Cybersecurity projects & collaborations',  color: '#ff4d6d' },
  { icon: '🌍', text: 'Frontend Development freelance / remote',  color: '#3b9eff' },
  { icon: '🤝', text: 'IEEE & Tech Community initiatives',        color: '#845ef7' },
];

const ieeeWork = [
  { icon: '🏅', text: 'Vice Chair at IEEE UNS Institute of Technology, VBSPU' },
  { icon: '🤝', text: 'Organizing tech events, workshops & seminars' },
  { icon: '🌍', text: 'Bridging the gap between academia and industry' },
];

const focusItems = [
  'Web Dev × Security Intersection',
  'IEEE Community Leadership',
  'Social Media Growth Strategies',
];

const marqueeItems = [
  'React.js','Next.js','JavaScript','Tailwind CSS','IEEE','Cybersecurity',
  'Frontend Dev','Social Media','HTML5','CSS3','Git','AuraLinqPr',
  'Classworks.in','TechnoHacks','OWASP','CTF','Web Security','Content Strategy',
];

/* ─── TYPEWRITER ────────────────────────────────────────────────── */
function Typewriter({ words }) {
  const [idx, setIdx]   = useState(0);
  const [text, setText] = useState('');
  const [del, setDel]   = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    const id = setTimeout(() => {
      if (!del && text === word) { setTimeout(() => setDel(true), 1600); return; }
      if (del && text === '')    { setDel(false); setIdx(n => n + 1); return; }
      setText(p => del ? p.slice(0, -1) : word.slice(0, p.length + 1));
    }, del ? 45 : 90);
    return () => clearTimeout(id);
  }, [text, del, idx, words]);

  return (
    <span style={{ color: '#ff6b35' }}>
      {text}<span className="cursor">|</span>
    </span>
  );
}

/* ─── PARTICLES ─────────────────────────────────────────────────── */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.28,
      dy: (Math.random() - 0.5) * 0.28,
      a: Math.random() * 0.45 + 0.1,
      c: ['#ff6b35','#845ef7','#00c9a7','#3b9eff'][Math.floor(Math.random() * 4)],
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x = (p.x + p.dx + canvas.width)  % canvas.width;
        p.y = (p.y + p.dy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.strokeStyle = '#ff6b35';
            ctx.globalAlpha = (1 - d / 100) * 0.06;
            ctx.lineWidth   = 0.5;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.55 }}
    />
  );
}

/* ─── SCROLL REVEAL ─────────────────────────────────────────────── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity:    on ? 1 : 0,
        transform:  on ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(.23,1,.32,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── SKILL PILL ────────────────────────────────────────────────── */
function Pill({ name, color }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-block', padding: '6px 14px', borderRadius: 100,
        fontSize: 12.5, fontFamily: 'Syne, sans-serif', fontWeight: 600,
        cursor: 'default',
        background:  hov ? `${color}1a` : 'rgba(255,255,255,0.04)',
        border:      `1px solid ${hov ? color + '66' : 'rgba(255,255,255,0.09)'}`,
        color:       hov ? color : '#9aa3b8',
        transform:   hov ? 'scale(1.07) translateY(-2px)' : 'scale(1) translateY(0)',
        boxShadow:   hov ? `0 6px 18px ${color}22` : 'none',
        transition:  'all 0.22s cubic-bezier(.23,1,.32,1)',
      }}
    >{name}</span>
  );
}

/* ─── SECTION LABEL ─────────────────────────────────────────────── */
function SectionLabel({ children, center }) {
  return (
    <div style={{ display: 'flex', justifyContent: center ? 'center' : 'flex-start', marginBottom: 40 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
        <div style={{ height: 1, width: 26, background: 'linear-gradient(90deg,transparent,#ff6b35)' }} />
        <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 3.5, color: '#ff6b35', textTransform: 'uppercase' }}>
          {children}
        </span>
        <div style={{ height: 1, width: 26, background: 'linear-gradient(90deg,#ff6b35,transparent)' }} />
      </div>
    </div>
  );
}

/* ─── MAGNETIC BUTTON ───────────────────────────────────────────── */
function MagBtn({ href, primary, children, target }) {
  const ref = useRef(null);
  const onMove = e => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.25}px) scale(1.04)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = 'translate(0,0) scale(1)'; };

  return (
    <a
      ref={ref} href={href} target={target}
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        display: 'inline-block', padding: '13px 32px', borderRadius: 13,
        fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14,
        textDecoration: 'none', cursor: 'pointer',
        transition: 'transform 0.3s cubic-bezier(.23,1,.32,1), box-shadow 0.3s ease',
        ...(primary
          ? { background: 'linear-gradient(135deg,#ff6b35,#ff4500)', color: '#fff', boxShadow: '0 8px 28px rgba(255,107,53,0.38)', border: 'none' }
          : { background: 'rgba(255,255,255,0.05)', color: '#c0c8dc', border: '1.5px solid rgba(255,255,255,0.14)' }
        ),
      }}
    >{children}</a>
  );
}

/* ─── ROLE CARD ─────────────────────────────────────────────────── */
function RoleCard({ role, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          background:  hov ? `${role.color}12` : `${role.color}08`,
          border:      `1px solid ${hov ? role.color + '55' : role.color + '22'}`,
          borderRadius: 20, padding: '24px 22px 24px 26px',
          position: 'relative', overflow: 'hidden',
          transform:  hov ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow:  hov ? `0 18px 40px ${role.color}18` : 'none',
          transition: 'all 0.3s cubic-bezier(.23,1,.32,1)',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: `linear-gradient(180deg,${role.color},transparent)`, borderRadius: '20px 0 0 20px' }} />
        <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle,${role.color}18,transparent 70%)` }} />
        <div style={{ fontSize: 28, marginBottom: 12 }}>{role.icon}</div>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: '#dde3f0', marginBottom: 5 }}>{role.title}</div>
        <div style={{ fontSize: 12.5, color: role.color, fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>{role.org}</div>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN HOME
═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [imgHov, setImgHov] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const h = e => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  // Safe parallax — only after mount
  const px = mounted ? (mouse.x - window.innerWidth  / 2) * 0.012 : 0;
  const py = mounted ? (mouse.y - window.innerHeight / 2) * 0.012 : 0;

  return (
    <>
      {/* ── STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #05080f; color: #e2e8f0; font-family: 'Outfit', sans-serif; overflow-x: hidden; }

        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }
        @keyframes spin-cw   { to{transform:rotate(360deg)} }
        @keyframes spin-ccw  { to{transform:rotate(-360deg)} }
        @keyframes pulse-glow{ 0%,100%{box-shadow:0 0 14px rgba(255,107,53,0.3)} 50%{box-shadow:0 0 38px rgba(255,107,53,0.65)} }
        @keyframes shimmer   { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes grad-x    { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes tag-a     { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-8px) rotate(1.5deg)} }
        @keyframes tag-b     { 0%,100%{transform:translateY(0) rotate(1.5deg)}  50%{transform:translateY(-7px) rotate(-1.5deg)} }
        @keyframes marquee   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes scanline  { 0%{top:-4px} 100%{top:100vh} }
        @keyframes glitch    {
          0%,94%,100%{clip-path:none;transform:none}
          95%{clip-path:polygon(0 20%,100% 20%,100% 30%,0 30%);transform:translate(-3px,0)}
          96%{clip-path:polygon(0 60%,100% 60%,100% 68%,0 68%);transform:translate(3px,0)}
          97%{clip-path:polygon(0 42%,100% 42%,100% 50%,0 50%);transform:translate(-2px,0)}
          98%{clip-path:none;transform:none}
        }

        .hero-name   { animation: fadeUp 0.7s 0.1s cubic-bezier(.23,1,.32,1) both; }
        .hero-type   { animation: fadeUp 0.7s 0.22s cubic-bezier(.23,1,.32,1) both; }
        .hero-summ   { animation: fadeUp 0.7s 0.34s cubic-bezier(.23,1,.32,1) both; }
        .hero-cta    { animation: fadeUp 0.7s 0.46s cubic-bezier(.23,1,.32,1) both; }
        .hero-social { animation: fadeUp 0.7s 0.58s cubic-bezier(.23,1,.32,1) both; }
        .hero-img    { animation: fadeUp 0.7s 0.3s  cubic-bezier(.23,1,.32,1) both; }

        .cursor      { animation: blink 1s step-end infinite; }
        .glitch-el   { animation: glitch 7s infinite; }
        .shimmer-txt {
          background: linear-gradient(90deg,#ff6b35 0%,#ff9f6b 30%,#fff 50%,#ff9f6b 70%,#ff6b35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .marquee-row { display:flex; animation: marquee 24s linear infinite; }

        ::-webkit-scrollbar       { width: 3px; }
        ::-webkit-scrollbar-track { background: #05080f; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#ff6b35,#845ef7); border-radius: 3px; }
      `}</style>

      {/* ── PARTICLES ── */}
      {mounted && <Particles />}

      {/* ── PARALLAX ORBS ── */}
      <div style={{ position:'fixed', width:800, height:800, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,53,0.07),transparent 68%)', top:-200, right:-200, pointerEvents:'none', zIndex:0, transform:`translate(${-px}px,${-py}px)`, transition:'transform 0.5s ease' }} />
      <div style={{ position:'fixed', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(132,94,247,0.06),transparent 68%)', bottom:-100, left:-150, pointerEvents:'none', zIndex:0, transform:`translate(${px}px,${py}px)`, transition:'transform 0.5s ease' }} />
      <div style={{ position:'fixed', width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,201,167,0.04),transparent 68%)', top:'50%', left:'38%', pointerEvents:'none', zIndex:0 }} />

      {/* ── SCANLINE ── */}
      <div style={{ position:'fixed', left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,rgba(255,107,53,0.12),transparent)', animation:'scanline 9s linear infinite', zIndex:0, pointerEvents:'none' }} />

      <main style={{ position:'relative', zIndex:1 }}>

        {/* ════════════════ HERO ════════════════ */}
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', padding:'110px 6% 80px', position:'relative' }}>
          {/* Grid background */}
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,107,53,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,53,0.025) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }} />

          <div style={{ maxWidth:1200, margin:'0 auto', width:'100%', display:'flex', alignItems:'center', gap:80, flexWrap:'wrap' }}>

            {/* LEFT */}
            <div style={{ flex:1, minWidth:300 }}>

              {/* Name */}
              <h1 className="hero-name" style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'clamp(2.8rem,5.5vw,4.8rem)', lineHeight:1.06, letterSpacing:'-0.025em', marginBottom:12 }}>
                Hi, I'm{' '}
                <span className="glitch-el shimmer-txt">Srijan</span>
                <br />
                <span style={{ color:'rgba(255,255,255,0.9)' }}>Srivastav</span>
              </h1>

              {/* Typewriter */}
              <h2 className="hero-type" style={{ fontFamily:'Syne, sans-serif', fontWeight:600, fontSize:'clamp(1rem,2.2vw,1.4rem)', color:'#7a8399', marginBottom:20, minHeight:34 }}>
                <Typewriter words={['Frontend Developer','IEEE Vice Chair','Team Manager @ AuraLinqPr','Cybersecurity Enthusiast','Social Media Advocate']} />
              </h2>

              {/* Summary line */}
              <p className="hero-summ" style={{ fontSize:13.5, lineHeight:2, color:'#5e6880', maxWidth:520, marginBottom:34 }}>
                <span style={{ color:'#845ef7', fontWeight:600 }}>Vice Chair</span>
                <span style={{ color:'rgba(255,255,255,0.12)', margin:'0 7px' }}>|</span>
                IEEE UNS Institute of Technology, VBSPU
                <span style={{ color:'rgba(255,255,255,0.12)', margin:'0 7px' }}>|</span>
                <span style={{ color:'#00c9a7', fontWeight:600 }}>Frontend Developer</span>
                <span style={{ color:'rgba(255,255,255,0.12)', margin:'0 7px' }}>@</span>
                Classworks.in
                <span style={{ color:'rgba(255,255,255,0.12)', margin:'0 7px' }}>|</span>
                <span style={{ color:'#3b9eff', fontWeight:600 }}>Web Development Intern</span>
                <span style={{ color:'rgba(255,255,255,0.12)', margin:'0 7px' }}>@</span>
                TechnoHacks
              </p>

              {/* CTAs */}
              <div className="hero-cta" style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:44 }}>
                <MagBtn href="#roles" primary>Explore Roles →</MagBtn>
                <MagBtn href="#contact">Contact Me</MagBtn>
              </div>

              {/* Social links */}
              <div className="hero-social" style={{ display:'flex', alignItems:'center' }}>
                {[
                  { label:'✉ Email',    href:'mailto:srivastav.srijan@ieee.org', ext:false },
                  { label:'⌥ GitHub',   href:'https://github.com/SrijanSrivastav29', ext:true },
                  { label:'◈ LinkedIn', href:'https://www.linkedin.com/in/srijansrivastav29', ext:true },
                ].map((s, i) => (
                  <a
                    key={s.label} href={s.href}
                    target={s.ext ? '_blank' : undefined} rel="noreferrer"
                    style={{ color:'#3d4a60', fontSize:12, fontFamily:'Syne, sans-serif', fontWeight:700, letterSpacing:0.5, textDecoration:'none', padding:'8px 14px', borderRadius:8, transition:'all 0.2s ease', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.color='#ff6b35'; e.currentTarget.style.background='rgba(255,107,53,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color='#3d4a60'; e.currentTarget.style.background='transparent'; }}
                  >{s.label}</a>
                ))}
              </div>
            </div>

            {/* RIGHT — Avatar */}
            <div className="hero-img" style={{ display:'flex', justifyContent:'center', alignItems:'center', position:'relative' }}>
              {/* Orbital rings */}
              <div style={{ position:'absolute', width:380, height:380, borderRadius:'50%', border:'1px dashed rgba(255,107,53,0.12)', animation:'spin-cw 26s linear infinite', pointerEvents:'none' }} />
              <div style={{ position:'absolute', width:318, height:318, borderRadius:'50%', border:'1px solid rgba(132,94,247,0.1)', animation:'spin-ccw 18s linear infinite', pointerEvents:'none' }} />

              {/* Orbiting dots */}
              {[
                { size:380, speed:'12s', dir:'spin-cw',  color:'#ff6b35', glow:'#ff6b35' },
                { size:318, speed:'9s',  dir:'spin-ccw', color:'#845ef7', glow:'#845ef7' },
                { size:380, speed:'17s', dir:'spin-cw',  color:'#00c9a7', glow:'#00c9a7' },
              ].map((o, i) => (
                <div key={i} style={{ position:'absolute', width:o.size, height:o.size, animation:`${o.dir} ${o.speed} linear infinite` }}>
                  <div style={{ position:'absolute', top:'50%', left:'50%', width: i===0?10:i===1?7:6, height:i===0?10:i===1?7:6, borderRadius:'50%', background:o.color, boxShadow:`0 0 10px ${o.glow}`, transform:`translate(-50%,-50%) translateX(${o.size/2}px)` }} />
                </div>
              ))}

              {/* Profile circle */}
              <div
                onMouseEnter={() => setImgHov(true)}
                onMouseLeave={() => setImgHov(false)}
                style={{ position:'relative', width:240, height:240, borderRadius:'50%', animation:'float 6s ease-in-out infinite', cursor:'default' }}
              >
                {/* Animated gradient ring */}
                <div style={{ position:'absolute', inset:-4, borderRadius:'50%', background:'linear-gradient(135deg,#ff6b35,#845ef7,#00c9a7,#ff6b35)', backgroundSize:'300% 300%', animation:'grad-x 4s ease infinite', zIndex:0 }} />
                {/* Pulse glow */}
                <div style={{ position:'absolute', inset:-4, borderRadius:'50%', animation:'pulse-glow 3s ease infinite', zIndex:0 }} />
                {/* Inner white ring to separate */}
                <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#05080f', zIndex:1 }} />
                {/* Image */}
                <div style={{ position:'absolute', inset:4, borderRadius:'50%', overflow:'hidden', zIndex:2 }}>
                  <img
                    src="/assets/profile.jpg"
                    alt="Srijan Srivastav"
                    style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', transition:'transform 0.5s ease, filter 0.4s ease', transform: imgHov ? 'scale(1.08)' : 'scale(1)', filter: imgHov ? 'brightness(1.1)' : 'brightness(1)' }}
                  />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,transparent 45%,rgba(255,107,53,0.25))', opacity: imgHov ? 1 : 0, transition:'opacity 0.4s ease' }} />
                </div>
              </div>

              {/* Floating badges */}
              <div style={{ position:'absolute', top:-8, right:-55, background:'rgba(10,14,24,0.85)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,107,53,0.35)', borderRadius:12, padding:'7px 13px', fontSize:11.5, fontFamily:'Syne, sans-serif', fontWeight:700, color:'#ff6b35', whiteSpace:'nowrap', animation:'tag-a 4s ease-in-out infinite', boxShadow:'0 6px 20px rgba(255,107,53,0.2)' }}>
                💻 Classworks.in
              </div>
              <div style={{ position:'absolute', bottom:12, left:-68, background:'rgba(10,14,24,0.85)', backdropFilter:'blur(12px)', border:'1px solid rgba(132,94,247,0.35)', borderRadius:12, padding:'7px 13px', fontSize:11.5, fontFamily:'Syne, sans-serif', fontWeight:700, color:'#845ef7', whiteSpace:'nowrap', animation:'tag-b 5s ease-in-out infinite', boxShadow:'0 6px 20px rgba(132,94,247,0.2)' }}>
                ⚡ IEEE Vice Chair
              </div>
              <div style={{ position:'absolute', top:'52%', right:-72, background:'rgba(10,14,24,0.85)', backdropFilter:'blur(12px)', border:'1px solid rgba(0,201,167,0.35)', borderRadius:12, padding:'7px 13px', fontSize:11.5, fontFamily:'Syne, sans-serif', fontWeight:700, color:'#00c9a7', whiteSpace:'nowrap', animation:'tag-a 6s ease-in-out 1s infinite', boxShadow:'0 6px 20px rgba(0,201,167,0.15)' }}>
                🔐 Cyber Curious
              </div>
            </div>

          </div>
        </section>

        {/* ── MARQUEE STRIP ── */}
        <div style={{ overflow:'hidden', background:'rgba(255,107,53,0.035)', borderTop:'1px solid rgba(255,107,53,0.07)', borderBottom:'1px solid rgba(255,107,53,0.07)', padding:'13px 0' }}>
          <div className="marquee-row">
            {[...marqueeItems, ...marqueeItems].map((t, i) => (
              <span key={i} style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:11, letterSpacing:2.2, color: i%3===0?'#ff6b35':i%3===1?'#845ef7':'#00c9a7', textTransform:'uppercase', padding:'0 26px', whiteSpace:'nowrap', opacity:0.65 }}>
                {t} <span style={{ opacity:0.3 }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ════════════════ ABOUT ════════════════ */}
        <section id="about" style={{ padding:'100px 6%' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <Reveal><SectionLabel>About Me</SectionLabel></Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:44, alignItems:'start' }}>

              {/* Facts */}
              <div>
                <Reveal delay={0.05}>
                  <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3vw,2.5rem)', lineHeight:1.18, marginBottom:28 }}>
                    A bit about{' '}
                    <span style={{ background:'linear-gradient(135deg,#ff6b35,#ff9f6b)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>me</span>
                  </h2>
                </Reveal>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {aboutFacts.map((f, i) => (
                    <Reveal key={i} delay={i * 0.05}>
                      <div
                        style={{ display:'flex', alignItems:'flex-start', gap:13, padding:'12px 16px', background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:13, transition:'all 0.28s cubic-bezier(.23,1,.32,1)', cursor:'default' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,107,53,0.28)'; e.currentTarget.style.background='rgba(255,107,53,0.045)'; e.currentTarget.style.transform='translateX(8px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'; e.currentTarget.style.background='rgba(255,255,255,0.025)'; e.currentTarget.style.transform='translateX(0)'; }}
                      >
                        <span style={{ fontSize:19, flexShrink:0, marginTop:2 }}>{f.icon}</span>
                        <span style={{ fontSize:14, color:'#9aa3b8', lineHeight:1.65 }}>{f.text}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Current Focus */}
              <div>
                <Reveal delay={0.15}>
                  <div style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:22, padding:'28px' }}>
                    <div style={{ fontSize:10.5, fontFamily:'Syne, sans-serif', fontWeight:700, color:'#55607a', letterSpacing:2.5, marginBottom:20 }}>CURRENT FOCUS 🌱</div>
                    {focusItems.map((f, i) => (
                      <div
                        key={i}
                        style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14, transition:'transform 0.2s ease', cursor:'default' }}
                        onMouseEnter={e => { e.currentTarget.style.transform='translateX(6px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform='translateX(0)'; }}
                      >
                        <div style={{ width:6, height:6, borderRadius:'50%', background:'#ff6b35', flexShrink:0, boxShadow:'0 0 7px #ff6b35' }} />
                        <span style={{ fontSize:13.5, color:'#8892aa' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════ ROLES ════════════════ */}
        <section id="roles" style={{ padding:'90px 6%', background:'linear-gradient(180deg,rgba(255,107,53,0.03) 0%,transparent 100%)' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <Reveal><SectionLabel>Current Roles</SectionLabel></Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))', gap:18 }}>
              {currentRoles.map((r, i) => <RoleCard key={r.title} role={r} delay={i * 0.09} />)}
            </div>
          </div>
        </section>

        {/* ════════════════ SKILLS ════════════════ */}
        <section id="skills" style={{ padding:'90px 6%' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <Reveal><SectionLabel>Tech Stack & Skills</SectionLabel></Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:22 }}>
              {skillGroups.map((g, gi) => (
                <Reveal key={g.label} delay={gi * 0.1}>
                  <div
                    style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:22, padding:'26px 22px', height:'100%', position:'relative', overflow:'hidden', transition:'all 0.32s cubic-bezier(.23,1,.32,1)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=g.color+'44'; e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow=`0 18px 44px ${g.color}14`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
                  >
                    <div style={{ position:'absolute', top:-28, right:-28, width:90, height:90, borderRadius:'50%', background:`radial-gradient(circle,${g.color}14,transparent 70%)` }} />
                    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
                      <div style={{ width:40, height:40, borderRadius:11, background:`${g.color}14`, border:`1px solid ${g.color}2e`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:19 }}>{g.icon}</div>
                      <span style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:15, color:'#dde3f0' }}>{g.label}</span>
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                      {g.items.map(s => <Pill key={s} name={s} color={g.color} />)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ IEEE ════════════════ */}
        <section id="ieee" style={{ padding:'90px 6%', background:'linear-gradient(180deg,rgba(132,94,247,0.04) 0%,transparent 100%)' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <Reveal><SectionLabel>IEEE & Community</SectionLabel></Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:18 }}>
              {ieeeWork.map((w, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div
                    style={{ display:'flex', alignItems:'flex-start', gap:15, background:'rgba(132,94,247,0.06)', border:'1px solid rgba(132,94,247,0.14)', borderRadius:18, padding:'22px 20px', transition:'all 0.3s cubic-bezier(.23,1,.32,1)', cursor:'default' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(132,94,247,0.42)'; e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.background='rgba(132,94,247,0.1)'; e.currentTarget.style.boxShadow='0 14px 36px rgba(132,94,247,0.14)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(132,94,247,0.14)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.background='rgba(132,94,247,0.06)'; e.currentTarget.style.boxShadow='none'; }}
                  >
                    <div style={{ width:40, height:40, borderRadius:11, background:'rgba(132,94,247,0.14)', border:'1px solid rgba(132,94,247,0.28)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:19, flexShrink:0 }}>{w.icon}</div>
                    <p style={{ fontSize:14, color:'#9aa3b8', lineHeight:1.7, marginTop:5 }}>{w.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ OPEN TO ════════════════ */}
        <section id="open" style={{ padding:'90px 6%' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <Reveal><SectionLabel>Open To</SectionLabel></Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:15 }}>
              {openTo.map((o, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div
                    style={{ display:'flex', alignItems:'center', gap:13, background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:'18px 20px', transition:'all 0.28s cubic-bezier(.23,1,.32,1)', cursor:'default' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=o.color+'44'; e.currentTarget.style.background=o.color+'0a'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 10px 28px ${o.color}14`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.background='rgba(255,255,255,0.025)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
                  >
                    <div style={{ width:38, height:38, borderRadius:10, background:`${o.color}14`, border:`1px solid ${o.color}24`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:19, flexShrink:0 }}>{o.icon}</div>
                    <span style={{ fontSize:13.5, color:'#9aa3b8', lineHeight:1.55 }}>{o.text}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ CONTACT ════════════════ */}
        <section id="contact" style={{ padding:'120px 6%', background:'linear-gradient(180deg,transparent,rgba(255,107,53,0.04))', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', bottom:-80, left:'50%', transform:'translateX(-50%)', width:550, height:550, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,53,0.055),transparent 70%)', pointerEvents:'none' }} />
          <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center', position:'relative' }}>
            <Reveal>
              <SectionLabel center>Contact Me</SectionLabel>
              <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'clamp(2rem,4.5vw,3.2rem)', lineHeight:1.1, marginBottom:16 }}>
                Let's Work{' '}
                <span className="shimmer-txt">Together</span>
              </h2>
              <p style={{ color:'#6b7590', fontSize:15, lineHeight:1.9, maxWidth:460, margin:'0 auto 48px' }}>
                Whether it's a project, collaboration, or just a chat about tech, security, or IEEE — my inbox is always open.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:32, textAlign:'left' }}>
                {[
                  { href:'mailto:srivastav.srijan@ieee.org', icon:'📧', label:'EMAIL', val:'srivastav.srijan@ieee.org', color:'#ff6b35' },
                  { href:'tel:+918853942888',               icon:'📱', label:'PHONE', val:'+91 88539 42888',           color:'#00c9a7' },
                ].map(item => (
                  <a
                    key={item.label} href={item.href}
                    style={{ display:'flex', alignItems:'center', gap:13, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, padding:'20px', textDecoration:'none', transition:'all 0.28s cubic-bezier(.23,1,.32,1)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=item.color+'44'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 14px 36px ${item.color}16`; e.currentTarget.style.background=item.color+'08'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.background='rgba(255,255,255,0.03)'; }}
                  >
                    <div style={{ width:46, height:46, borderRadius:13, background:`${item.color}14`, border:`1px solid ${item.color}28`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:21, flexShrink:0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize:10, color:'#55607a', fontFamily:'Syne, sans-serif', fontWeight:700, letterSpacing:1.5, marginBottom:4 }}>{item.label}</div>
                      <div style={{ fontSize:12.5, color:'#c0c8dc', fontFamily:'Syne, sans-serif', fontWeight:600 }}>{item.val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                <MagBtn href="mailto:srivastav.srijan@ieee.org" primary>Send Email ✉️</MagBtn>
                <MagBtn href="tel:+918853942888">Call Now 📱</MagBtn>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
    </>
  );
}