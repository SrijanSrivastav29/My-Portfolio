'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const currentRoles = [
  { icon: '👔', title: 'Team Manager', org: 'AuraLinqPr', color: '#ff6b35', bg: 'rgba(255,107,53,0.08)' },
  { icon: '🏛️', title: 'Vice Chair', org: 'IEEE UNS · VBSPU', color: '#845ef7', bg: 'rgba(132,94,247,0.08)' },
  { icon: '💻', title: 'Frontend Developer', org: 'Classworks.in', color: '#00c9a7', bg: 'rgba(0,201,167,0.08)' },
  { icon: '🔧', title: 'Web Dev Intern', org: 'TechnoHacks', color: '#3b9eff', bg: 'rgba(59,158,255,0.08)' },
];

const skillGroups = [
  { icon: '🎨', label: 'Frontend', color: '#ff6b35', items: ['React.js','Next.js','JavaScript ES6+','HTML5 & CSS3','Tailwind CSS','Responsive Design','Git & GitHub'] },
  { icon: '📣', label: 'Social Media', color: '#f7b731', items: ['Content Strategy','Brand Management','Community Building','Analytics & Insights','Campaign Planning'] },
  { icon: '🔐', label: 'Cybersecurity', color: '#ff4d6d', items: ['Web Security','OWASP Top 10','CTF Challenges','Secure Coding','Network Fundamentals'] },
];

const aboutFacts = [
  { icon:'👔', text:'Team Manager @ AuraLinqPr' },
  { icon:'🎓', text:'Vice Chair | IEEE UNS Institute of Technology, VBSPU' },
  { icon:'💼', text:'Frontend Developer @ Classworks.in' },
  { icon:'🛠️', text:'Web Development Intern @ TechnoHacks' },
  { icon:'📣', text:'Passionate about Social Media Management' },
  { icon:'🔐', text:'Deeply interested in Cybersecurity' },
  { icon:'🌱', text:'Exploring web dev × security intersection' },
];

const openTo = [
  { icon:'✅', text:'Social Media Management opportunities', color:'#00c9a7' },
  { icon:'🔐', text:'Cybersecurity projects & collaborations', color:'#ff4d6d' },
  { icon:'🌍', text:'Frontend Development freelance / remote', color:'#3b9eff' },
  { icon:'🤝', text:'IEEE & Tech Community initiatives', color:'#845ef7' },
];

const ieeeWork = [
  { icon:'🏅', text:'Vice Chair at IEEE UNS Institute of Technology, VBSPU' },
  { icon:'🤝', text:'Organizing tech events, workshops & seminars' },
  { icon:'🌍', text:'Bridging the gap between academia and industry' },
];

const stats = [
  { label:'Repositories', val:'20+', color:'#ff6b35' },
  { label:'Contributions', val:'500+', color:'#845ef7' },
  { label:'Stars Earned', val:'30+', color:'#00c9a7' },
  { label:'PRs Merged', val:'15+', color:'#3b9eff' },
];

/* ══════════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════════ */
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ══════════════════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════════════════ */
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    const t = setTimeout(() => {
      if (!del && text === word) { setTimeout(() => setDel(true), 1600); return; }
      if (del && text === '') { setDel(false); setIdx(i => i + 1); return; }
      setText(p => del ? p.slice(0, -1) : word.slice(0, p.length + 1));
    }, del ? 42 : 88);
    return () => clearTimeout(t);
  }, [text, del, idx, words]);
  return (
    <span style={{ color:'#ff6b35' }}>
      {text}
      <span style={{ animation:'blink 1s step-end infinite', opacity:1 }}>|</span>
    </span>
  );
}

function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      color: ['#ff6b35','#845ef7','#00c9a7','#3b9eff'][Math.floor(Math.random()*4)],
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      // draw connections
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = '#ff6b35';
            ctx.globalAlpha = (1 - dist / 100) * 0.07;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', opacity:0.6 }} />;
}

function MagneticBtn({ children, href, primary, onClick }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) * 0.28, dy = (e.clientY - cy) * 0.28;
    el.style.transform = `translate(${dx}px,${dy}px) scale(1.04)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = 'translate(0,0) scale(1)'; };
  const base = {
    display:'inline-block', padding:'14px 34px', borderRadius:14,
    fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:15,
    textDecoration:'none', cursor:'pointer', border:'none',
    transition:'transform 0.25s cubic-bezier(.23,1,.32,1), box-shadow 0.25s ease',
    position:'relative', overflow:'hidden',
  };
  const style = primary
    ? { ...base, background:'linear-gradient(135deg,#ff6b35,#ff4500)', color:'#fff', boxShadow:'0 8px 30px rgba(255,107,53,0.38)' }
    : { ...base, background:'rgba(255,255,255,0.04)', color:'#c0c8dc', border:'1.5px solid rgba(255,255,255,0.13)' };
  return (
    <a ref={ref} href={href} style={style}
      onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={onClick}
    >{children}</a>
  );
}

function RevealCard({ children, delay = 0, style = {} }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(.23,1,.32,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function GlitchText({ children }) {
  return (
    <span style={{ position:'relative', display:'inline-block' }} className="glitch">
      {children}
    </span>
  );
}

function SkillPill({ name, color }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display:'inline-block', padding:'7px 15px', borderRadius:100, fontSize:12.5,
        background: hov ? `${color}18` : 'rgba(255,255,255,0.04)',
        border:`1px solid ${hov ? color + '66' : 'rgba(255,255,255,0.09)'}`,
        color: hov ? color : '#9aa3b8',
        fontFamily:'Syne,sans-serif', fontWeight:600,
        cursor:'default', transition:'all 0.22s cubic-bezier(.23,1,.32,1)',
        transform: hov ? 'scale(1.08) translateY(-2px)' : 'scale(1) translateY(0)',
        boxShadow: hov ? `0 6px 20px ${color}22` : 'none',
      }}
    >{name}</span>
  );
}

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useScrollReveal();
  const num = parseInt(target);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(num / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 35);
    return () => clearInterval(timer);
  }, [visible, num]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function SectionLabel({ children, centered }) {
  return (
    <div style={{ display:'flex', justifyContent: centered ? 'center' : 'flex-start', marginBottom:40 }}>
      <div style={{ display:'inline-flex', alignItems:'center', gap:10 }}>
        <div style={{ height:1, width:28, background:'linear-gradient(90deg,transparent,#ff6b35)' }} />
        <span style={{ fontFamily:'Syne,sans-serif', fontSize:11, fontWeight:700, letterSpacing:3.5, color:'#ff6b35', textTransform:'uppercase' }}>{children}</span>
        <div style={{ height:1, width:28, background:'linear-gradient(90deg,#ff6b35,transparent)' }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [imgHov, setImgHov] = useState(false);

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('scroll', onScroll); };
  }, []);

  const w = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const h = typeof window !== 'undefined' ? window.innerHeight : 900;
  const px = (mouse.x - w / 2) * 0.012;
  const py = (mouse.y - h / 2) * 0.012;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#05080f;color:#e2e8f0;font-family:'Outfit',sans-serif;overflow-x:hidden}

        /* ── Keyframes ── */
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes floatR{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(3deg)}}
        @keyframes spin-slow{to{transform:rotate(360deg)}}
        @keyframes spin-rev{to{transform:rotate(-360deg)}}
        @keyframes pulse-glow{0%,100%{box-shadow:0 0 16px rgba(255,107,53,0.3)}50%{box-shadow:0 0 40px rgba(255,107,53,0.7),0 0 80px rgba(255,107,53,0.2)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes orbit{0%{transform:rotate(0deg) translateX(130px) rotate(0deg)}100%{transform:rotate(360deg) translateX(130px) rotate(-360deg)}}
        @keyframes orbit2{0%{transform:rotate(180deg) translateX(160px) rotate(-180deg)}100%{transform:rotate(540deg) translateX(160px) rotate(-540deg)}}
        @keyframes scanline{0%{top:-10%}100%{top:110%}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes glitch1{0%,95%,100%{clip-path:none;transform:none}96%{clip-path:polygon(0 20%,100% 20%,100% 30%,0 30%);transform:translate(-3px,0)}97%{clip-path:polygon(0 60%,100% 60%,100% 70%,0 70%);transform:translate(3px,0)}98%{clip-path:polygon(0 40%,100% 40%,100% 50%,0 50%);transform:translate(-2px,0)}99%{clip-path:none;transform:none}}
        @keyframes gradient-x{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes border-dance{0%{border-color:rgba(255,107,53,0.4)}25%{border-color:rgba(132,94,247,0.4)}50%{border-color:rgba(0,201,167,0.4)}75%{border-color:rgba(59,158,255,0.4)}100%{border-color:rgba(255,107,53,0.4)}}
        @keyframes ripple{0%{transform:scale(0);opacity:1}100%{transform:scale(4);opacity:0}}
        @keyframes bounce-in{0%{transform:scale(0.3);opacity:0}50%{transform:scale(1.05)}70%{transform:scale(0.9)}100%{transform:scale(1);opacity:1}}
        @keyframes slide-right{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}
        @keyframes number-pop{0%{transform:scale(0.5);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
        @keyframes tag-float{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-8px) rotate(2deg)}}
        @keyframes tag-float2{0%,100%{transform:translateY(0) rotate(2deg)}50%{transform:translateY(-6px) rotate(-2deg)}}
        @keyframes progress{from{width:0}to{width:var(--w)}}

        /* ── Hero entrance ── */
        .fu{animation:fadeUp 0.7s cubic-bezier(.23,1,.32,1) both}
        .d0{animation-delay:0s}.d1{animation-delay:0.12s}.d2{animation-delay:0.22s}
        .d3{animation-delay:0.34s}.d4{animation-delay:0.46s}.d5{animation-delay:0.6s}

        /* ── Scrollbar ── */
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#05080f}
        ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#ff6b35,#845ef7);border-radius:3px}

        /* ── Glitch ── */
        .glitch{animation:glitch1 6s infinite}

        /* ── Shimmer text ── */
        .shimmer-text{
          background:linear-gradient(90deg,#ff6b35 0%,#ff9f6b 30%,#fff 50%,#ff9f6b 70%,#ff6b35 100%);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          animation:shimmer 3s linear infinite;
        }

        /* ── Animated gradient border ── */
        .grad-border{animation:border-dance 4s linear infinite}

        /* ── Marquee track ── */
        .marquee-track{display:flex;gap:0;animation:marquee 22s linear infinite}
        .marquee-wrap{overflow:hidden;width:100%}

        /* ── Hover lift ── */
        .lift{transition:transform 0.3s cubic-bezier(.23,1,.32,1),box-shadow 0.3s ease,border-color 0.3s ease}
        .lift:hover{transform:translateY(-6px)!important;box-shadow:0 20px 50px rgba(0,0,0,0.4)!important}

        /* ── Image hover ── */
        .img-wrap:hover .img-overlay{opacity:1!important}
        .img-wrap:hover img{transform:scale(1.06)!important;filter:brightness(1.1)!important}
      `}</style>

      {/* ── Particle canvas ── */}
      <Particles />

      {/* ── Parallax glow orbs ── */}
      <div style={{ position:'fixed',width:800,height:800,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,107,53,0.08),transparent 68%)',top:-200,right:-200,pointerEvents:'none',zIndex:0,transform:`translate(${px*-1}px,${py*-1}px)`,transition:'transform 0.5s ease' }} />
      <div style={{ position:'fixed',width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(132,94,247,0.07),transparent 68%)',bottom:-100,left:-150,pointerEvents:'none',zIndex:0,transform:`translate(${px}px,${py}px)`,transition:'transform 0.5s ease' }} />
      <div style={{ position:'fixed',width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,201,167,0.05),transparent 68%)',top:'50%',left:'35%',pointerEvents:'none',zIndex:0 }} />

      {/* ── Scanline ── */}
      <div style={{ position:'fixed',left:0,right:0,height:2,background:'linear-gradient(90deg,transparent,rgba(255,107,53,0.15),transparent)',animation:'scanline 8s linear infinite',zIndex:0,pointerEvents:'none' }} />

      <main style={{ position:'relative',zIndex:1 }}>

        {/* ════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════ */}
        <section style={{ minHeight:'100vh',display:'flex',alignItems:'center',padding:'120px 6% 80px',position:'relative' }}>

          {/* Background grid lines */}
          <div style={{ position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,107,53,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,53,0.03) 1px,transparent 1px)',backgroundSize:'60px 60px',pointerEvents:'none' }} />

          <div style={{ maxWidth:1200,margin:'0 auto',width:'100%',display:'flex',alignItems:'center',gap:80,flexWrap:'wrap' }}>

            {/* ── LEFT ── */}
            <div style={{ flex:1,minWidth:320 }}>



              {/* Name with glitch */}
              <h1 className="fu d1" style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(3rem,5.5vw,5rem)',lineHeight:1.06,letterSpacing:'-0.025em',marginBottom:14 }}>
                Hi, I'm{' '}
                <GlitchText>
                  <span className="shimmer-text">Srijan</span>
                </GlitchText>
                <br />
                <span style={{ color:'rgba(255,255,255,0.9)' }}>Srivastav</span>
              </h1>

              {/* Typewriter */}
              <h2 className="fu d2" style={{ fontFamily:'Syne,sans-serif',fontWeight:600,fontSize:'clamp(1rem,2.2vw,1.45rem)',color:'#7a8399',marginBottom:22,minHeight:36 }}>
                <Typewriter words={['Frontend Developer','IEEE Vice Chair','Team Manager @ AuraLinqPr','Cybersecurity Enthusiast','Social Media Advocate']} />
              </h2>

              {/* Summary line */}
              <p className="fu d3" style={{ fontSize:14,lineHeight:1.9,color:'#6b7590',maxWidth:520,marginBottom:32,fontFamily:"'Outfit',sans-serif" }}>
                <span style={{ color:'#845ef7',fontWeight:600 }}>Vice Chair</span>
                <span style={{ color:'rgba(255,255,255,0.15)',margin:'0 8px' }}>|</span>
                IEEE UNS Institute of Technology, VBSPU
                <span style={{ color:'rgba(255,255,255,0.15)',margin:'0 8px' }}>|</span>
                <span style={{ color:'#00c9a7',fontWeight:600 }}>Frontend Developer</span>
                <span style={{ color:'rgba(255,255,255,0.15)',margin:'0 8px' }}>@</span>
                Classworks.in
                <span style={{ color:'rgba(255,255,255,0.15)',margin:'0 8px' }}>|</span>
                <span style={{ color:'#3b9eff',fontWeight:600 }}>Web Development Intern</span>
                <span style={{ color:'rgba(255,255,255,0.15)',margin:'0 8px' }}>@</span>
                TechnoHacks
              </p>

              {/* CTA Buttons */}
              <div className="fu d4" style={{ display:'flex',gap:14,flexWrap:'wrap',marginBottom:48 }}>
                <MagneticBtn href="#roles" primary>Explore Roles →</MagneticBtn>
                <MagneticBtn href="#contact">Contact Me</MagneticBtn>
              </div>

              {/* Social links */}
              <div className="fu d5" style={{ display:'flex',gap:0,alignItems:'center' }}>
                {[
                  { label:'✉ Email', href:'mailto:srivastav.srijan@ieee.org' },
                  { label:'⌥ GitHub', href:'https://github.com/SrijanSrivastav29' },
                  { label:'◈ LinkedIn', href:'https://www.linkedin.com/in/srijansrivastav29' },
                ].map((s, i) => (
                  <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{
                    color:'#4a5568', fontSize:12, fontFamily:'Syne,sans-serif', fontWeight:700,
                    letterSpacing:0.5, textDecoration:'none',
                    padding:'8px 14px', borderRadius:8,
                    transition:'all 0.2s ease',
                    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                    onMouseEnter={e => { e.target.style.color='#ff6b35'; e.target.style.background='rgba(255,107,53,0.08)'; }}
                    onMouseLeave={e => { e.target.style.color='#4a5568'; e.target.style.background='transparent'; }}
                  >{s.label}</a>
                ))}
              </div>
            </div>

            {/* ── RIGHT — Avatar ── */}
            <div className="fu d3" style={{ display:'flex',justifyContent:'center',alignItems:'center',position:'relative',flex:'0 0 auto' }}>

              {/* Outer orbital rings */}
              <div style={{ position:'absolute',width:380,height:380,borderRadius:'50%',border:'1px dashed rgba(255,107,53,0.12)',animation:'spin-slow 25s linear infinite',pointerEvents:'none' }} />
              <div style={{ position:'absolute',width:320,height:320,borderRadius:'50%',border:'1px solid rgba(132,94,247,0.1)',animation:'spin-rev 18s linear infinite',pointerEvents:'none' }} />

              {/* Orbiting dots */}
              <div style={{ position:'absolute',width:380,height:380,animation:'spin-slow 12s linear infinite' }}>
                <div style={{ position:'absolute',top:'50%',left:'50%',width:10,height:10,borderRadius:'50%',background:'#ff6b35',boxShadow:'0 0 12px #ff6b35',transform:'translate(-50%,-50%) translateX(190px)',animation:'none' }} />
              </div>
              <div style={{ position:'absolute',width:320,height:320,animation:'spin-rev 9s linear infinite' }}>
                <div style={{ position:'absolute',top:'50%',left:'50%',width:7,height:7,borderRadius:'50%',background:'#845ef7',boxShadow:'0 0 10px #845ef7',transform:'translate(-50%,-50%) translateX(160px)',animation:'none' }} />
              </div>
              <div style={{ position:'absolute',width:380,height:380,animation:'spin-slow 16s linear infinite 4s' }}>
                <div style={{ position:'absolute',top:'50%',left:'50%',width:6,height:6,borderRadius:'50%',background:'#00c9a7',boxShadow:'0 0 10px #00c9a7',transform:'translate(-50%,-50%) translateX(190px)',animation:'none' }} />
              </div>

              {/* Profile image */}
              <div
                className="img-wrap"
                onMouseEnter={() => setImgHov(true)}
                onMouseLeave={() => setImgHov(false)}
                style={{ position:'relative',width:240,height:240,borderRadius:'50%',animation:'float 6s ease-in-out infinite',cursor:'default' }}
              >
                {/* Glow ring */}
                <div style={{ position:'absolute',inset:-3,borderRadius:'50%',background:'linear-gradient(135deg,#ff6b35,#845ef7,#00c9a7,#ff6b35)',backgroundSize:'300% 300%',animation:'gradient-x 4s ease infinite',padding:3,zIndex:0 }}>
                  <div style={{ width:'100%',height:'100%',borderRadius:'50%',background:'#05080f' }} />
                </div>
                <div style={{ position:'absolute',inset:-3,borderRadius:'50%',animation:'pulse-glow 3s ease infinite',zIndex:0 }} />

                <div style={{ position:'absolute',inset:3,borderRadius:'50%',overflow:'hidden',zIndex:1 }}>
                  <img
                    src="/assets/profile.jpg"
                    alt="Srijan Srivastav"
                    style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top',transition:'transform 0.5s cubic-bezier(.23,1,.32,1), filter 0.4s ease',transform:imgHov?'scale(1.08)':'scale(1)' }}
                  />
                  {/* Overlay on hover */}
                  <div className="img-overlay" style={{ position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 40%,rgba(255,107,53,0.3))',opacity:0,transition:'opacity 0.4s ease' }} />
                </div>
              </div>

              {/* Floating role badges */}
              <div style={{ position:'absolute',top:-10,right:-70,background:'rgba(255,255,255,0.05)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,107,53,0.3)',borderRadius:14,padding:'8px 14px',fontSize:12,fontFamily:'Syne,sans-serif',fontWeight:700,color:'#ff6b35',whiteSpace:'nowrap',animation:'tag-float 4s ease-in-out infinite',boxShadow:'0 8px 24px rgba(255,107,53,0.2)' }}>
                💻 Classworks.in
              </div>
              <div style={{ position:'absolute',bottom:10,left:-80,background:'rgba(255,255,255,0.05)',backdropFilter:'blur(12px)',border:'1px solid rgba(132,94,247,0.3)',borderRadius:14,padding:'8px 14px',fontSize:12,fontFamily:'Syne,sans-serif',fontWeight:700,color:'#845ef7',whiteSpace:'nowrap',animation:'tag-float2 5s ease-in-out infinite',boxShadow:'0 8px 24px rgba(132,94,247,0.2)' }}>
                ⚡ IEEE Vice Chair
              </div>
              <div style={{ position:'absolute',top:'55%',right:-85,background:'rgba(255,255,255,0.05)',backdropFilter:'blur(12px)',border:'1px solid rgba(0,201,167,0.3)',borderRadius:14,padding:'8px 14px',fontSize:12,fontFamily:'Syne,sans-serif',fontWeight:700,color:'#00c9a7',whiteSpace:'nowrap',animation:'tag-float 6s ease-in-out 1s infinite',boxShadow:'0 8px 24px rgba(0,201,167,0.15)' }}>
                🔐 Cyber Curious
              </div>
            </div>

          </div>
        </section>

        {/* ── Marquee skills strip ── */}
        <div style={{ overflow:'hidden',background:'rgba(255,107,53,0.04)',borderTop:'1px solid rgba(255,107,53,0.08)',borderBottom:'1px solid rgba(255,107,53,0.08)',padding:'14px 0' }}>
          <div className="marquee-track">
            {['React.js','Next.js','JavaScript','Tailwind CSS','IEEE','Cybersecurity','Frontend Dev','Social Media','Node.js','HTML5','CSS3','Git','Community','AuraLinqPr','Classworks.in','TechnoHacks','OWASP','CTF','Web Security','Content Strategy',
              'React.js','Next.js','JavaScript','Tailwind CSS','IEEE','Cybersecurity','Frontend Dev','Social Media','Node.js','HTML5','CSS3','Git','Community','AuraLinqPr','Classworks.in','TechnoHacks','OWASP','CTF','Web Security','Content Strategy'].map((t,i) => (
              <span key={i} style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:12,letterSpacing:2,color: i%3===0?'#ff6b35':i%3===1?'#845ef7':'#00c9a7',textTransform:'uppercase',padding:'0 28px',whiteSpace:'nowrap',opacity:0.7 }}>
                {t} <span style={{ opacity:0.3 }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            ABOUT ME
        ════════════════════════════════════════════════════ */}
        <section id="about" style={{ padding:'100px 6%' }}>
          <div style={{ maxWidth:1200,margin:'0 auto' }}>
            <RevealCard>
              <SectionLabel>About Me</SectionLabel>
            </RevealCard>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:44,alignItems:'start' }}>

              {/* Left — fact list */}
              <div>
                <RevealCard delay={0.05}>
                  <h2 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(1.8rem,3vw,2.6rem)',lineHeight:1.18,marginBottom:28 }}>
                    A bit about <span style={{ background:'linear-gradient(135deg,#ff6b35,#ff9f6b)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>me</span>
                  </h2>
                </RevealCard>
                <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
                  {aboutFacts.map((f, i) => (
                    <RevealCard key={i} delay={i * 0.06}>
                      <div
                        style={{ display:'flex',alignItems:'flex-start',gap:14,padding:'13px 16px',background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,transition:'all 0.3s cubic-bezier(.23,1,.32,1)',cursor:'default' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,107,53,0.3)'; e.currentTarget.style.background='rgba(255,107,53,0.05)'; e.currentTarget.style.transform='translateX(8px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'; e.currentTarget.style.background='rgba(255,255,255,0.025)'; e.currentTarget.style.transform='translateX(0)'; }}
                      >
                        <span style={{ fontSize:20,flexShrink:0,marginTop:1 }}>{f.icon}</span>
                        <span style={{ fontSize:14.5,color:'#9aa3b8',lineHeight:1.6 }}>{f.text}</span>
                      </div>
                    </RevealCard>
                  ))}
                </div>
              </div>

              {/* Right — focus */}
              <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
                {/* Current focus */}
                <RevealCard delay={0.2}>
                  <div style={{ background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:24,padding:'24px 28px' }}>
                    <div style={{ fontSize:11,fontFamily:'Syne,sans-serif',fontWeight:700,color:'#55607a',letterSpacing:2.5,marginBottom:18 }}>CURRENT FOCUS 🌱</div>
                    {['Web Dev × Security Intersection','IEEE Community Leadership','Social Media Growth Strategies'].map((f,i) => (
                      <div key={i} style={{ display:'flex',alignItems:'center',gap:12,marginBottom:13,transition:'all 0.2s ease' }}
                        onMouseEnter={e => { e.currentTarget.style.transform='translateX(6px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform='translateX(0)'; }}
                      >
                        <div style={{ width:6,height:6,borderRadius:'50%',background:'#ff6b35',flexShrink:0,boxShadow:'0 0 8px #ff6b35' }} />
                        <span style={{ fontSize:13.5,color:'#8892aa' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </RevealCard>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            CURRENT ROLES
        ════════════════════════════════════════════════════ */}
        <section id="roles" style={{ padding:'90px 6%',background:'linear-gradient(180deg,rgba(255,107,53,0.03) 0%,transparent 100%)' }}>
          <div style={{ maxWidth:1200,margin:'0 auto' }}>
            <RevealCard><SectionLabel>Current Roles</SectionLabel></RevealCard>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:18 }}>
              {currentRoles.map((r, i) => (
                <RevealCard key={r.title} delay={i * 0.1}>
                  <div
                    className="lift"
                    style={{ background:r.bg,border:`1px solid ${r.color}22`,borderRadius:22,padding:'26px 24px 26px 28px',position:'relative',overflow:'hidden',cursor:'default' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=r.color+'55'; e.currentTarget.style.background=r.color+'18'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor=r.color+'22'; e.currentTarget.style.background=r.bg; }}
                  >
                    {/* Animated left bar */}
                    <div style={{ position:'absolute',top:0,left:0,bottom:0,width:3,background:`linear-gradient(180deg,${r.color},transparent)`,borderRadius:'22px 0 0 22px' }} />
                    {/* Corner glow */}
                    <div style={{ position:'absolute',top:-20,right:-20,width:80,height:80,borderRadius:'50%',background:`radial-gradient(circle,${r.color}22,transparent 70%)` }} />
                    <div style={{ fontSize:30,marginBottom:14 }}>{r.icon}</div>
                    <div style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:15.5,color:'#dde3f0',marginBottom:6 }}>{r.title}</div>
                    <div style={{ fontSize:12.5,color:r.color,fontFamily:'Syne,sans-serif',fontWeight:600,opacity:0.9 }}>{r.org}</div>
                  </div>
                </RevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SKILLS
        ════════════════════════════════════════════════════ */}
        <section id="skills" style={{ padding:'90px 6%' }}>
          <div style={{ maxWidth:1200,margin:'0 auto' }}>
            <RevealCard><SectionLabel>Tech Stack & Skills</SectionLabel></RevealCard>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))',gap:24 }}>
              {skillGroups.map((g, gi) => (
                <RevealCard key={g.label} delay={gi * 0.12}>
                  <div
                    style={{ background:'rgba(255,255,255,0.025)',border:`1px solid rgba(255,255,255,0.07)`,borderRadius:24,padding:'28px 24px',height:'100%',transition:'all 0.35s cubic-bezier(.23,1,.32,1)',position:'relative',overflow:'hidden' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=g.color+'44'; e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow=`0 20px 50px ${g.color}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
                  >
                    <div style={{ position:'absolute',top:-30,right:-30,width:100,height:100,borderRadius:'50%',background:`radial-gradient(circle,${g.color}12,transparent 70%)` }} />
                    <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:20 }}>
                      <div style={{ width:42,height:42,borderRadius:12,background:`${g.color}15`,border:`1px solid ${g.color}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20 }}>{g.icon}</div>
                      <span style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:16,color:'#dde3f0' }}>{g.label}</span>
                    </div>
                    <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
                      {g.items.map(s => <SkillPill key={s} name={s} color={g.color} />)}
                    </div>
                  </div>
                </RevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            IEEE & COMMUNITY
        ════════════════════════════════════════════════════ */}
        <section id="ieee" style={{ padding:'90px 6%',background:'linear-gradient(180deg,rgba(132,94,247,0.04) 0%,transparent 100%)' }}>
          <div style={{ maxWidth:1200,margin:'0 auto' }}>
            <RevealCard><SectionLabel>IEEE & Community</SectionLabel></RevealCard>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))',gap:20 }}>
              {ieeeWork.map((w, i) => (
                <RevealCard key={i} delay={i * 0.1}>
                  <div
                    style={{ display:'flex',alignItems:'flex-start',gap:16,background:'rgba(132,94,247,0.06)',border:'1px solid rgba(132,94,247,0.15)',borderRadius:20,padding:'24px 20px',transition:'all 0.3s cubic-bezier(.23,1,.32,1)',cursor:'default' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(132,94,247,0.45)'; e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.background='rgba(132,94,247,0.1)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(132,94,247,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(132,94,247,0.15)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.background='rgba(132,94,247,0.06)'; e.currentTarget.style.boxShadow='none'; }}
                  >
                    <div style={{ width:42,height:42,borderRadius:12,background:'rgba(132,94,247,0.15)',border:'1px solid rgba(132,94,247,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0 }}>{w.icon}</div>
                    <p style={{ fontSize:14.5,color:'#9aa3b8',lineHeight:1.7,marginTop:6 }}>{w.text}</p>
                  </div>
                </RevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            OPEN TO
        ════════════════════════════════════════════════════ */}
        <section id="open" style={{ padding:'90px 6%' }}>
          <div style={{ maxWidth:1200,margin:'0 auto' }}>
            <RevealCard><SectionLabel>Open To</SectionLabel></RevealCard>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16 }}>
              {openTo.map((o, i) => (
                <RevealCard key={i} delay={i * 0.08}>
                  <div
                    style={{ display:'flex',alignItems:'center',gap:14,background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:18,padding:'20px 22px',transition:'all 0.3s cubic-bezier(.23,1,.32,1)',cursor:'default',position:'relative',overflow:'hidden' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=o.color+'44'; e.currentTarget.style.background=o.color+'0a'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 12px 30px ${o.color}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.background='rgba(255,255,255,0.025)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
                  >
                    <div style={{ width:40,height:40,borderRadius:12,background:`${o.color}15`,border:`1px solid ${o.color}25`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0 }}>{o.icon}</div>
                    <span style={{ fontSize:14,color:'#9aa3b8',lineHeight:1.55 }}>{o.text}</span>
                  </div>
                </RevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            CONTACT
        ════════════════════════════════════════════════════ */}
        <section id="contact" style={{ padding:'120px 6%',background:'linear-gradient(180deg,transparent,rgba(255,107,53,0.05))',position:'relative',overflow:'hidden' }}>
          {/* BG decoration */}
          <div style={{ position:'absolute',bottom:-100,left:'50%',transform:'translateX(-50%)',width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,107,53,0.06),transparent 70%)',pointerEvents:'none' }} />

          <div style={{ maxWidth:720,margin:'0 auto',textAlign:'center',position:'relative' }}>
            <RevealCard>
              <SectionLabel centered>Contact Me</SectionLabel>
              <h2 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(2.2rem,4.5vw,3.5rem)',lineHeight:1.1,marginBottom:18 }}>
                Let's Work{' '}
                <span className="shimmer-text">Together</span>
              </h2>
              <p style={{ color:'#6b7590',fontSize:15.5,lineHeight:1.9,maxWidth:480,margin:'0 auto 52px' }}>
                Whether it's a project, collaboration, or just a chat about tech, security, or IEEE — my inbox is always open.
              </p>
            </RevealCard>

            {/* Contact cards */}
            <RevealCard delay={0.1}>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:36,textAlign:'left' }}>
                {[
                  { href:'mailto:srivastav.srijan@ieee.org', icon:'📧', label:'EMAIL', val:'srivastav.srijan@ieee.org', color:'#ff6b35' },
                  { href:'tel:+918853942888', icon:'📱', label:'PHONE', val:'+91 88539 42888', color:'#00c9a7' },
                ].map(c => (
                  <a key={c.label} href={c.href}
                    style={{ display:'flex',alignItems:'center',gap:14,background:'rgba(255,255,255,0.03)',border:`1px solid rgba(255,255,255,0.08)`,borderRadius:20,padding:'22px',textDecoration:'none',transition:'all 0.3s cubic-bezier(.23,1,.32,1)',position:'relative',overflow:'hidden' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=c.color+'44'; e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow=`0 16px 40px ${c.color}18`; e.currentTarget.style.background=c.color+'08'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.background='rgba(255,255,255,0.03)'; }}
                  >
                    <div style={{ width:48,height:48,borderRadius:14,background:`${c.color}15`,border:`1px solid ${c.color}28`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize:10,color:'#55607a',fontFamily:'Syne,sans-serif',fontWeight:700,letterSpacing:1.5,marginBottom:5 }}>{c.label}</div>
                      <div style={{ fontSize:13,color:'#c0c8dc',fontFamily:'Syne,sans-serif',fontWeight:600 }}>{c.val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </RevealCard>

            <RevealCard delay={0.2}>
              <div style={{ display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap' }}>
                <MagneticBtn href="mailto:srivastav.srijan@ieee.org" primary>Send Email ✉️</MagneticBtn>
                <MagneticBtn href="tel:+918853942888">Call Now 📱</MagneticBtn>
              </div>
            </RevealCard>
          </div>
        </section>

      </main>
    </>
  );
}