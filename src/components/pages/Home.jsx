'use client';
import { useState, useEffect } from 'react';

const ROLES = [
  { icon: '👔', title: 'Team Manager',       org: 'AuraLinqPr',                             color: '#ff6b35' },
  { icon: '🏛️', title: 'Vice Chair',         org: 'IEEE UNS Institute of Technology, VBSPU', color: '#845ef7' },
  { icon: '💻', title: 'Frontend Developer', org: 'Classworks.in',                           color: '#00c9a7' },
  { icon: '🔧', title: 'Web Dev Intern',     org: 'TechnoHacks',                             color: '#3b9eff' },
];

const SKILLS = [
  { icon: '🎨', label: 'Frontend Development',     color: '#ff6b35', items: ['React.js','Next.js','JavaScript ES6+','HTML5 & CSS3','Tailwind CSS','Responsive Design','Git & GitHub'] },
  { icon: '📣', label: 'Social Media & Marketing', color: '#f7b731', items: ['Content Strategy','Brand Management','Community Building','Analytics & Insights','Campaign Planning'] },
  { icon: '🔐', label: 'Cybersecurity Interests',  color: '#ff4d6d', items: ['Web Security','OWASP Top 10','CTF Challenges','Secure Coding','Network Fundamentals'] },
];

const FACTS = [
  { icon: '👔', text: 'Team Manager @ AuraLinqPr' },
  { icon: '🎓', text: 'Vice Chair | IEEE UNS Institute of Technology, VBSPU' },
  { icon: '💼', text: 'Frontend Developer @ Classworks.in' },
  { icon: '🛠️', text: 'Web Development Intern @ TechnoHacks' },
  { icon: '📣', text: 'Passionate about Social Media Management' },
  { icon: '🔐', text: 'Deeply interested in Cybersecurity' },
  { icon: '🌱', text: 'Exploring the intersection of web dev & security' },
];

const OPEN_TO = [
  { icon: '✅', text: 'Social Media Management opportunities', color: '#00c9a7' },
  { icon: '🔐', text: 'Cybersecurity projects & collaborations', color: '#ff4d6d' },
  { icon: '🌍', text: 'Frontend Development freelance / remote', color: '#3b9eff' },
  { icon: '🤝', text: 'IEEE & Tech Community initiatives', color: '#845ef7' },
];

const IEEE = [
  { icon: '🏅', text: 'Vice Chair at IEEE UNS Institute of Technology, VBSPU' },
  { icon: '🤝', text: 'Organizing tech events, workshops & seminars' },
  { icon: '🌍', text: 'Bridging the gap between academia and industry' },
];

const WORDS = ['Frontend Developer','IEEE Vice Chair','Team Manager @ AuraLinqPr','Cybersecurity Enthusiast','Social Media Advocate'];

const MARQUEE = ['React.js','Next.js','JavaScript','Tailwind CSS','IEEE','Cybersecurity','Frontend Dev','Social Media','HTML5','CSS3','Git','AuraLinqPr','Classworks.in','TechnoHacks','OWASP','Web Security'];

/* ── Typewriter ── */
function Typewriter() {
  const [idx, setIdx]   = useState(0);
  const [text, setText] = useState('');
  const [del, setDel]   = useState(false);

  useEffect(() => {
    const word = WORDS[idx % WORDS.length];
    const id = setTimeout(() => {
      if (!del && text === word) { setTimeout(() => setDel(true), 1500); return; }
      if (del  && text === '')   { setDel(false); setIdx(n => n + 1); return; }
      setText(p => del ? p.slice(0, -1) : word.slice(0, p.length + 1));
    }, del ? 45 : 90);
    return () => clearTimeout(id);
  }, [text, del, idx]);

  return <span style={{ color: '#ff6b35' }}>{text}<span style={{ animation: 'blink 1s step-end infinite' }}>|</span></span>;
}

/* ── Hover card ── */
function HoverCard({ children, hoverBorder = 'rgba(255,107,53,0.3)', hoverBg = 'rgba(255,107,53,0.04)', style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:  hov ? hoverBg  : 'rgba(255,255,255,0.025)',
        border:      `1px solid ${hov ? hoverBorder : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 16,
        transform:   hov ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow:   hov ? '0 16px 40px rgba(0,0,0,0.3)' : 'none',
        transition:  'all 0.28s cubic-bezier(.23,1,.32,1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Main ── */
export default function Home() {
  const [imgHov, setImgHov] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #05080f; color: #e2e8f0; font-family: 'Outfit', sans-serif; overflow-x: hidden; }

        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes spin-cw  { to{transform:rotate(360deg)} }
        @keyframes spin-ccw { to{transform:rotate(-360deg)} }
        @keyframes gradring { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes glitch   {
          0%,93%,100%{clip-path:none;transform:none}
          94%{clip-path:polygon(0 15%,100% 15%,100% 25%,0 25%);transform:translate(-3px,0)}
          96%{clip-path:polygon(0 55%,100% 55%,100% 65%,0 65%);transform:translate(3px,0)}
          98%{clip-path:none;transform:none}
        }
        @keyframes tagA     { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-8px) rotate(1.5deg)} }
        @keyframes tagB     { 0%,100%{transform:translateY(0) rotate(1.5deg)}  50%{transform:translateY(-6px) rotate(-1.5deg)} }
        @keyframes marquee  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes scanline { 0%{top:0} 100%{top:100vh} }
        @keyframes pulseGlow{ 0%,100%{opacity:.4} 50%{opacity:1} }

        .fu1{animation:fadeUp .7s .05s cubic-bezier(.23,1,.32,1) both}
        .fu2{animation:fadeUp .7s .18s cubic-bezier(.23,1,.32,1) both}
        .fu3{animation:fadeUp .7s .30s cubic-bezier(.23,1,.32,1) both}
        .fu4{animation:fadeUp .7s .42s cubic-bezier(.23,1,.32,1) both}
        .fu5{animation:fadeUp .7s .54s cubic-bezier(.23,1,.32,1) both}
        .fu6{animation:fadeUp .7s .24s cubic-bezier(.23,1,.32,1) both}

        .shimmer {
          background: linear-gradient(90deg,#ff6b35 0%,#ffb38a 35%,#fff 50%,#ffb38a 65%,#ff6b35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        .glitch { animation: glitch 7s infinite; }
        .marquee-row { display:flex; animation: marquee 22s linear infinite; width: max-content; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #05080f; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#ff6b35,#845ef7); border-radius: 3px; }

        a { text-decoration: none; }
        section { position: relative; }
      `}</style>

      {/* Fixed background orbs */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:700, height:700, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,53,0.07) 0%,transparent 70%)', top:-180, right:-180 }} />
        <div style={{ position:'absolute', width:550, height:550, borderRadius:'50%', background:'radial-gradient(circle,rgba(132,94,247,0.06) 0%,transparent 70%)', bottom:-100, left:-120 }} />
        <div style={{ position:'absolute', width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,201,167,0.04) 0%,transparent 70%)', top:'45%', left:'40%' }} />
        {/* Grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,107,53,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,53,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        {/* Scanline */}
        <div style={{ position:'absolute', left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,rgba(255,107,53,0.1),transparent)', animation:'scanline 10s linear infinite' }} />
      </div>

      <main style={{ position:'relative', zIndex:1 }}>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', padding:'110px 6% 80px' }}>
          <div style={{ maxWidth:1180, margin:'0 auto', width:'100%', display:'flex', alignItems:'center', gap:80, flexWrap:'wrap' }}>

            {/* Left */}
            <div style={{ flex:1, minWidth:300 }}>

              <h1 className="fu1" style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(2.8rem,5.5vw,4.8rem)', lineHeight:1.06, letterSpacing:'-0.025em', marginBottom:14 }}>
                Hi, I'm <span className="shimmer glitch">Srijan</span>
                <br />
                <span style={{ color:'rgba(255,255,255,0.9)' }}>Srivastav</span>
              </h1>

              <h2 className="fu2" style={{ fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'clamp(1rem,2.2vw,1.4rem)', color:'#7a8399', marginBottom:20, minHeight:32 }}>
                <Typewriter />
              </h2>

              {/* Summary */}
              <p className="fu3" style={{ fontSize:13.5, lineHeight:2.1, color:'#5c6880', maxWidth:520, marginBottom:36 }}>
                <span style={{ color:'#845ef7', fontWeight:600 }}>Vice Chair</span>
                <span style={{ color:'rgba(255,255,255,0.1)', margin:'0 8px' }}>|</span>
                IEEE UNS Institute of Technology, VBSPU
                <span style={{ color:'rgba(255,255,255,0.1)', margin:'0 8px' }}>|</span>
                <span style={{ color:'#00c9a7', fontWeight:600 }}>Frontend Developer</span>
                <span style={{ color:'rgba(255,255,255,0.1)', margin:'0 7px' }}>@</span>
                Classworks.in
                <span style={{ color:'rgba(255,255,255,0.1)', margin:'0 8px' }}>|</span>
                <span style={{ color:'#3b9eff', fontWeight:600 }}>Web Dev Intern</span>
                <span style={{ color:'rgba(255,255,255,0.1)', margin:'0 7px' }}>@</span>
                TechnoHacks
              </p>

              {/* CTAs */}
              <div className="fu4" style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:44 }}>
                <a href="#roles" style={{ background:'linear-gradient(135deg,#ff6b35,#e83d00)', color:'#fff', padding:'13px 30px', borderRadius:12, fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:14, boxShadow:'0 6px 24px rgba(255,107,53,0.35)', transition:'all 0.25s ease' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
                >Explore Roles →</a>
                <a href="#contact" style={{ background:'rgba(255,255,255,0.05)', color:'#c0c8dc', padding:'13px 30px', borderRadius:12, fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:14, border:'1.5px solid rgba(255,255,255,0.12)', transition:'all 0.25s ease' }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.background='rgba(255,107,53,0.09)';}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.background='rgba(255,255,255,0.05)';}}
                >Contact Me</a>
              </div>

              {/* Social */}
              <div className="fu5" style={{ display:'flex', alignItems:'center' }}>
                {[
                  { label:'✉ Email',    href:'mailto:srivastav.srijan@ieee.org' },
                  { label:'⌥ GitHub',   href:'https://github.com/SrijanSrivastav29' },
                  { label:'◈ LinkedIn', href:'https://www.linkedin.com/in/srijansrivastav29' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target={i > 0 ? '_blank' : undefined} rel="noreferrer"
                    style={{ color:'#3d4a60', fontSize:12, fontFamily:'Syne,sans-serif', fontWeight:700, letterSpacing:.5, padding:'8px 13px', borderRadius:8, transition:'all .2s ease', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                    onMouseEnter={e=>{e.currentTarget.style.color='#ff6b35';e.currentTarget.style.background='rgba(255,107,53,0.08)';}}
                    onMouseLeave={e=>{e.currentTarget.style.color='#3d4a60';e.currentTarget.style.background='transparent';}}
                  >{s.label}</a>
                ))}
              </div>
            </div>

            {/* Right — Avatar */}
            <div className="fu6" style={{ display:'flex', justifyContent:'center', alignItems:'center', position:'relative', flex:'0 0 auto' }}>

              {/* Rings */}
              <div style={{ position:'absolute', width:370, height:370, borderRadius:'50%', border:'1px dashed rgba(255,107,53,0.13)', animation:'spin-cw 24s linear infinite', pointerEvents:'none' }} />
              <div style={{ position:'absolute', width:305, height:305, borderRadius:'50%', border:'1px solid rgba(132,94,247,0.1)', animation:'spin-ccw 17s linear infinite', pointerEvents:'none' }} />

              {/* Orbiting dots */}
              <div style={{ position:'absolute', width:370, height:370, animation:'spin-cw 11s linear infinite' }}>
                <div style={{ position:'absolute', top:'50%', left:'50%', width:9, height:9, borderRadius:'50%', background:'#ff6b35', boxShadow:'0 0 10px #ff6b35', transform:'translate(-50%,-50%) translateX(185px)' }} />
              </div>
              <div style={{ position:'absolute', width:305, height:305, animation:'spin-ccw 8s linear infinite' }}>
                <div style={{ position:'absolute', top:'50%', left:'50%', width:7, height:7, borderRadius:'50%', background:'#845ef7', boxShadow:'0 0 9px #845ef7', transform:'translate(-50%,-50%) translateX(152px)' }} />
              </div>
              <div style={{ position:'absolute', width:370, height:370, animation:'spin-cw 16s linear infinite' }}>
                <div style={{ position:'absolute', top:'50%', left:'50%', width:6, height:6, borderRadius:'50%', background:'#00c9a7', boxShadow:'0 0 9px #00c9a7', transform:'translate(-50%,-50%) translateX(185px)' }} />
              </div>

              {/* Image */}
              <div
                onMouseEnter={() => setImgHov(true)}
                onMouseLeave={() => setImgHov(false)}
                style={{ position:'relative', width:230, height:230, borderRadius:'50%', animation:'float 6s ease-in-out infinite', cursor:'default', flexShrink:0 }}
              >
                {/* Gradient ring */}
                <div style={{ position:'absolute', inset:-4, borderRadius:'50%', background:'linear-gradient(135deg,#ff6b35,#845ef7,#00c9a7,#ff6b35)', backgroundSize:'300% 300%', animation:'gradring 4s ease infinite' }} />
                {/* Dark fill */}
                <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#05080f', zIndex:1 }} />
                {/* Photo */}
                <div style={{ position:'absolute', inset:4, borderRadius:'50%', overflow:'hidden', zIndex:2 }}>
                  <img
                    src="/assets/profile.jpg"
                    alt="Srijan Srivastav"
                    style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', transition:'transform .5s ease, filter .4s ease', transform: imgHov ? 'scale(1.08)' : 'scale(1)', filter: imgHov ? 'brightness(1.1)' : 'brightness(1)' }}
                  />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,transparent 45%,rgba(255,107,53,0.22))', opacity: imgHov ? 1 : 0, transition:'opacity .4s ease' }} />
                </div>
                {/* Pulse ring */}
                <div style={{ position:'absolute', inset:-4, borderRadius:'50%', border:'2px solid rgba(255,107,53,0.3)', animation:'pulseGlow 3s ease infinite', zIndex:0 }} />
              </div>

              {/* Floating badges */}
              <div style={{ position:'absolute', top:-5, right:-60, background:'rgba(8,12,22,0.9)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,107,53,0.3)', borderRadius:11, padding:'7px 12px', fontSize:11.5, fontFamily:'Syne,sans-serif', fontWeight:700, color:'#ff6b35', whiteSpace:'nowrap', animation:'tagA 4s ease-in-out infinite', boxShadow:'0 4px 18px rgba(255,107,53,0.18)' }}>
                💻 Classworks.in
              </div>
              <div style={{ position:'absolute', bottom:14, left:-70, background:'rgba(8,12,22,0.9)', backdropFilter:'blur(10px)', border:'1px solid rgba(132,94,247,0.3)', borderRadius:11, padding:'7px 12px', fontSize:11.5, fontFamily:'Syne,sans-serif', fontWeight:700, color:'#845ef7', whiteSpace:'nowrap', animation:'tagB 5s ease-in-out infinite', boxShadow:'0 4px 18px rgba(132,94,247,0.18)' }}>
                ⚡ IEEE Vice Chair
              </div>
              <div style={{ position:'absolute', top:'55%', right:-68, background:'rgba(8,12,22,0.9)', backdropFilter:'blur(10px)', border:'1px solid rgba(0,201,167,0.3)', borderRadius:11, padding:'7px 12px', fontSize:11.5, fontFamily:'Syne,sans-serif', fontWeight:700, color:'#00c9a7', whiteSpace:'nowrap', animation:'tagA 6s ease-in-out 1s infinite', boxShadow:'0 4px 18px rgba(0,201,167,0.12)' }}>
                🔐 Cyber Curious
              </div>
            </div>

          </div>
        </section>

        {/* ── Marquee ── */}
        <div style={{ overflow:'hidden', background:'rgba(255,107,53,0.03)', borderTop:'1px solid rgba(255,107,53,0.07)', borderBottom:'1px solid rgba(255,107,53,0.07)', padding:'12px 0' }}>
          <div className="marquee-row">
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span key={i} style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:11, letterSpacing:2, color: i%3===0?'#ff6b35':i%3===1?'#845ef7':'#00c9a7', textTransform:'uppercase', padding:'0 24px', whiteSpace:'nowrap', opacity:.6 }}>
                {t} <span style={{ opacity:.25 }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══ ABOUT ══════════════════════════════════════════════ */}
        <section id="about" style={{ padding:'100px 6%' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <SLabel>About Me</SLabel>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:44, alignItems:'start' }}>
              <div>
                <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3vw,2.5rem)', lineHeight:1.18, marginBottom:28 }}>
                  A bit about <span style={{ background:'linear-gradient(135deg,#ff6b35,#ff9f6b)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>me</span>
                </h2>
                <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                  {FACTS.map((f, i) => (
                    <div key={i}
                      style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'12px 15px', background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:13, transition:'all .25s cubic-bezier(.23,1,.32,1)', cursor:'default' }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,107,53,0.28)';e.currentTarget.style.background='rgba(255,107,53,0.045)';e.currentTarget.style.transform='translateX(7px)';}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.06)';e.currentTarget.style.background='rgba(255,255,255,0.025)';e.currentTarget.style.transform='translateX(0)';}}
                    >
                      <span style={{ fontSize:18, flexShrink:0, marginTop:2 }}>{f.icon}</span>
                      <span style={{ fontSize:14, color:'#9aa3b8', lineHeight:1.65 }}>{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:22, padding:'28px' }}>
                <div style={{ fontSize:10.5, fontFamily:'Syne,sans-serif', fontWeight:700, color:'#55607a', letterSpacing:2.5, marginBottom:20 }}>CURRENT FOCUS 🌱</div>
                {['Web Dev × Security Intersection','IEEE Community Leadership','Social Media Growth Strategies'].map((f, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:12, marginBottom:15, transition:'transform .2s ease', cursor:'default' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='translateX(6px)'}
                    onMouseLeave={e=>e.currentTarget.style.transform='translateX(0)'}
                  >
                    <div style={{ width:6, height:6, borderRadius:'50%', background:'#ff6b35', flexShrink:0, boxShadow:'0 0 7px #ff6b35' }} />
                    <span style={{ fontSize:13.5, color:'#8892aa' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ ROLES ══════════════════════════════════════════════ */}
        <section id="roles" style={{ padding:'90px 6%', background:'linear-gradient(180deg,rgba(255,107,53,0.03),transparent)' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <SLabel>Current Roles</SLabel>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
              {ROLES.map(r => (
                <HoverCard key={r.title} hoverBorder={r.color+'55'} hoverBg={r.color+'12'} style={{ padding:'24px 22px 24px 26px', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:0, left:0, bottom:0, width:3, background:`linear-gradient(180deg,${r.color},transparent)`, borderRadius:'16px 0 0 16px' }} />
                  <div style={{ position:'absolute', top:-20, right:-20, width:80, height:80, borderRadius:'50%', background:`radial-gradient(circle,${r.color}18,transparent 70%)` }} />
                  <div style={{ fontSize:28, marginBottom:12 }}>{r.icon}</div>
                  <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:15, color:'#dde3f0', marginBottom:5 }}>{r.title}</div>
                  <div style={{ fontSize:12.5, color:r.color, fontFamily:'Syne,sans-serif', fontWeight:600 }}>{r.org}</div>
                </HoverCard>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SKILLS ══════════════════════════════════════════════ */}
        <section id="skills" style={{ padding:'90px 6%' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <SLabel>Tech Stack & Skills</SLabel>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(275px,1fr))', gap:20 }}>
              {SKILLS.map(g => (
                <HoverCard key={g.label} hoverBorder={g.color+'44'} hoverBg='rgba(255,255,255,0.03)' style={{ padding:'26px 22px', position:'relative', overflow:'hidden', height:'100%' }}>
                  <div style={{ position:'absolute', top:-26, right:-26, width:88, height:88, borderRadius:'50%', background:`radial-gradient(circle,${g.color}14,transparent 70%)` }} />
                  <div style={{ display:'flex', alignItems:'center', gap:11, marginBottom:18 }}>
                    <div style={{ width:40, height:40, borderRadius:11, background:`${g.color}14`, border:`1px solid ${g.color}2e`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>{g.icon}</div>
                    <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:15, color:'#dde3f0' }}>{g.label}</span>
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                    {g.items.map(s => <SkillPill key={s} name={s} color={g.color} />)}
                  </div>
                </HoverCard>
              ))}
            </div>
          </div>
        </section>

        {/* ══ IEEE ══════════════════════════════════════════════ */}
        <section id="ieee" style={{ padding:'90px 6%', background:'linear-gradient(180deg,rgba(132,94,247,0.04),transparent)' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <SLabel>IEEE & Community</SLabel>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(275px,1fr))', gap:16 }}>
              {IEEE.map((w, i) => (
                <div key={i}
                  style={{ display:'flex', alignItems:'flex-start', gap:14, background:'rgba(132,94,247,0.06)', border:'1px solid rgba(132,94,247,0.14)', borderRadius:18, padding:'22px 20px', transition:'all .28s cubic-bezier(.23,1,.32,1)', cursor:'default' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(132,94,247,0.42)';e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.background='rgba(132,94,247,0.1)';e.currentTarget.style.boxShadow='0 14px 34px rgba(132,94,247,0.13)';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(132,94,247,0.14)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.background='rgba(132,94,247,0.06)';e.currentTarget.style.boxShadow='none';}}
                >
                  <div style={{ width:40, height:40, borderRadius:11, background:'rgba(132,94,247,0.14)', border:'1px solid rgba(132,94,247,0.28)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{w.icon}</div>
                  <p style={{ fontSize:14, color:'#9aa3b8', lineHeight:1.7, marginTop:5 }}>{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ OPEN TO ══════════════════════════════════════════════ */}
        <section id="open" style={{ padding:'90px 6%' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <SLabel>Open To</SLabel>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:14 }}>
              {OPEN_TO.map((o, i) => (
                <div key={i}
                  style={{ display:'flex', alignItems:'center', gap:12, background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:15, padding:'17px 18px', transition:'all .25s cubic-bezier(.23,1,.32,1)', cursor:'default' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=o.color+'44';e.currentTarget.style.background=o.color+'0a';e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 10px 26px ${o.color}14`;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.07)';e.currentTarget.style.background='rgba(255,255,255,0.025)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}
                >
                  <div style={{ width:38, height:38, borderRadius:10, background:`${o.color}14`, border:`1px solid ${o.color}24`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{o.icon}</div>
                  <span style={{ fontSize:13.5, color:'#9aa3b8', lineHeight:1.55 }}>{o.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CONTACT ══════════════════════════════════════════════ */}
        <section id="contact" style={{ padding:'120px 6%', background:'linear-gradient(180deg,transparent,rgba(255,107,53,0.04))', overflow:'hidden' }}>
          <div style={{ position:'absolute', bottom:-80, left:'50%', transform:'translateX(-50%)', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,53,0.055),transparent 70%)', pointerEvents:'none' }} />
          <div style={{ maxWidth:680, margin:'0 auto', textAlign:'center', position:'relative' }}>
            <SLabel center>Contact Me</SLabel>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(2rem,4.5vw,3.2rem)', lineHeight:1.1, marginBottom:14 }}>
              Let's Work <span className="shimmer">Together</span>
            </h2>
            <p style={{ color:'#6b7590', fontSize:15, lineHeight:1.9, maxWidth:440, margin:'0 auto 44px' }}>
              Whether it's a project, collaboration, or just a chat about tech, security, or IEEE — my inbox is always open.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:13, marginBottom:30, textAlign:'left' }}>
              {[
                { href:'mailto:srivastav.srijan@ieee.org', icon:'📧', label:'EMAIL', val:'srivastav.srijan@ieee.org', color:'#ff6b35' },
                { href:'tel:+918853942888',               icon:'📱', label:'PHONE', val:'+91 88539 42888',           color:'#00c9a7' },
              ].map(c => (
                <a key={c.label} href={c.href}
                  style={{ display:'flex', alignItems:'center', gap:12, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:17, padding:'18px', transition:'all .28s cubic-bezier(.23,1,.32,1)' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=c.color+'44';e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 12px 32px ${c.color}16`;e.currentTarget.style.background=c.color+'08';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.07)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.background='rgba(255,255,255,0.03)';}}
                >
                  <div style={{ width:44, height:44, borderRadius:12, background:`${c.color}14`, border:`1px solid ${c.color}28`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize:10, color:'#55607a', fontFamily:'Syne,sans-serif', fontWeight:700, letterSpacing:1.5, marginBottom:3 }}>{c.label}</div>
                    <div style={{ fontSize:12.5, color:'#c0c8dc', fontFamily:'Syne,sans-serif', fontWeight:600 }}>{c.val}</div>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <a href="mailto:srivastav.srijan@ieee.org"
                style={{ background:'linear-gradient(135deg,#ff6b35,#e83d00)', color:'#fff', padding:'13px 32px', borderRadius:12, fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:14, boxShadow:'0 6px 24px rgba(255,107,53,0.35)', transition:'all .25s ease' }}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
                onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
              >Send Email ✉️</a>
              <a href="tel:+918853942888"
                style={{ background:'rgba(255,255,255,0.05)', color:'#c0c8dc', padding:'13px 32px', borderRadius:12, fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:14, border:'1.5px solid rgba(255,255,255,0.12)', transition:'all .25s ease' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.background='rgba(0,201,167,0.09)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.background='rgba(255,255,255,0.05)';}}
              >Call Now 📱</a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

/* ── helpers ── */
function SLabel({ children, center }) {
  return (
    <div style={{ display:'flex', justifyContent: center ? 'center' : 'flex-start', marginBottom:38 }}>
      <div style={{ display:'inline-flex', alignItems:'center', gap:10 }}>
        <div style={{ height:1, width:24, background:'linear-gradient(90deg,transparent,#ff6b35)' }} />
        <span style={{ fontFamily:'Syne,sans-serif', fontSize:11, fontWeight:700, letterSpacing:3.5, color:'#ff6b35', textTransform:'uppercase' }}>{children}</span>
        <div style={{ height:1, width:24, background:'linear-gradient(90deg,#ff6b35,transparent)' }} />
      </div>
    </div>
  );
}

function SkillPill({ name, color }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:'inline-block', padding:'6px 13px', borderRadius:100, fontSize:12.5, fontFamily:'Syne,sans-serif', fontWeight:600, cursor:'default', background: hov?`${color}1a`:'rgba(255,255,255,0.04)', border:`1px solid ${hov?color+'66':'rgba(255,255,255,0.09)'}`, color: hov?color:'#9aa3b8', transform: hov?'scale(1.07) translateY(-2px)':'scale(1)', transition:'all .2s cubic-bezier(.23,1,.32,1)' }}
    >{name}</span>
  );
}