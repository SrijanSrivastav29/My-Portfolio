'use client';
import { useState, useEffect } from 'react';

/* ─── DATA ──────────────────────────────────────────────────────────────── */

function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    const speed = deleting ? 48 : 95;
    const t = setTimeout(() => {
      if (!deleting && text === word) { setTimeout(() => setDeleting(true), 1400); return; }
      if (deleting && text === '') { setDeleting(false); setIdx(i => i + 1); return; }
      setText(p => deleting ? p.slice(0, -1) : word.slice(0, p.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, idx, words]);
  return <span style={{ color: '#ff6b35' }}>{text}<span style={{ animation: 'blink 1s step-end infinite' }}>|</span></span>;
}

const currentRoles = [
  { icon: '👔', title: 'Team Manager', org: 'AuraLinqPr', color: '#ff6b35' },
  { icon: '🏛️', title: 'Vice Chair', org: 'IEEE UNS Institute of Technology, VBSPU', color: '#845ef7' },
  { icon: '💻', title: 'Frontend Developer', org: 'Classworks.in', color: '#00c9a7' },
  { icon: '🔧', title: 'Web Dev Intern', org: 'TechnoHacks', color: '#3b9eff' },
];

const frontendSkills = ['React.js', 'Next.js', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS', 'Responsive Design', 'Git & GitHub'];
const socialSkills = ['Content Strategy', 'Brand Management', 'Community Building', 'Analytics & Insights', 'Campaign Planning'];
const cyberSkills = ['Web Security Basics', 'OWASP Top 10', 'CTF Challenges', 'Secure Coding', 'Network Fundamentals'];
const ieeeWork = [
  'Vice Chair at IEEE UNS Institute of Technology, VBSPU',
  'Organizing tech events, workshops & seminars',
  'Bridging the gap between academia and industry',
];
const openTo = [
  { icon: '✅', text: 'Social Media Management opportunities' },
  { icon: '🔐', text: 'Cybersecurity projects & collaborations' },
  { icon: '🌍', text: 'Frontend Development freelance / remote work' },
  { icon: '🤝', text: 'IEEE & Tech Community initiatives' },
];

function SectionLabel({ children, centered }) {
  return (
    <div style={{ display: 'flex', justifyContent: centered ? 'center' : 'flex-start', marginBottom: 36 }}>
      <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#ff6b35', textTransform: 'uppercase' }}>
        — {children}
      </span>
    </div>
  );
}

function SkillPill({ name }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-block', padding: '7px 16px',
        borderRadius: 100, fontSize: 13,
        background: hov ? 'rgba(255,107,53,0.13)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hov ? 'rgba(255,107,53,0.45)' : 'rgba(255,255,255,0.09)'}`,
        color: hov ? '#ff6b35' : '#b0bad0',
        fontFamily: 'Syne, sans-serif', fontWeight: 600,
        cursor: 'default', transition: 'all 0.2s ease',
        transform: hov ? 'scale(1.06)' : 'scale(1)',
      }}
    >{name}</span>
  );
}

function RoleCard({ role }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hov ? role.color + '55' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 20, padding: '22px 22px 22px 26px',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.3s ease', cursor: 'default',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: role.color, borderRadius: '20px 0 0 20px', opacity: 0.8 }} />
      <div style={{ fontSize: 28, marginBottom: 10 }}>{role.icon}</div>
      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: '#dde3f0', marginBottom: 5 }}>{role.title}</div>
      <div style={{ fontSize: 12.5, color: role.color, fontFamily: 'Syne, sans-serif', fontWeight: 600, opacity: 0.9 }}>{role.org}</div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);
  const px = typeof window !== 'undefined' ? (mouse.x - window.innerWidth / 2) * 0.013 : 0;
  const py = typeof window !== 'undefined' ? (mouse.y - window.innerHeight / 2) * 0.013 : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#060a13;color:#e2e8f0;font-family:'Outfit',sans-serif;overflow-x:hidden}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-13px)}}
        @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes glow{0%,100%{opacity:0.6}50%{opacity:1}}
        @keyframes slide-in{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
        .fu{animation:fadeUp 0.65s ease forwards}
        .d1{animation-delay:0.05s;opacity:0}.d2{animation-delay:0.18s;opacity:0}
        .d3{animation-delay:0.32s;opacity:0}.d4{animation-delay:0.46s;opacity:0}
        .d5{animation-delay:0.6s;opacity:0}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#060a13}
        ::-webkit-scrollbar-thumb{background:#ff6b35;border-radius:3px}
        .cta-p:hover{transform:translateY(-3px)!important;box-shadow:0 16px 50px rgba(255,107,53,0.52)!important}
        .cta-s:hover{background:rgba(255,107,53,0.1)!important;transform:translateY(-3px)!important}
        .contact-card:hover{border-color:rgba(255,107,53,0.4)!important;transform:translateY(-4px)!important}
        .open-item:hover{background:rgba(255,107,53,0.06)!important;border-color:rgba(255,107,53,0.25)!important}
        .social-a:hover{color:#ff6b35!important;transform:translateY(-3px)!important}
      `}</style>

      {/* Glow orbs */}
      <div style={{ position:'fixed',width:700,height:700,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,107,53,0.07),transparent 70%)',top:-180,right:-180,pointerEvents:'none',zIndex:0,transform:`translate(${px*-1}px,${py*-1}px)`,transition:'transform 0.4s ease' }} />
      <div style={{ position:'fixed',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(132,94,247,0.06),transparent 70%)',bottom:-80,left:-120,pointerEvents:'none',zIndex:0,transform:`translate(${px}px,${py}px)`,transition:'transform 0.4s ease' }} />
      <div style={{ position:'fixed',width:300,height:300,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,201,167,0.04),transparent 70%)',top:'50%',left:'40%',pointerEvents:'none',zIndex:0 }} />

      <main style={{ position:'relative',zIndex:1 }}>

        {/* ══ HERO ════════════════════════════════════════════════ */}
        <section style={{ minHeight:'100vh',display:'flex',alignItems:'center',padding:'120px 6% 80px' }}>
          <div style={{ maxWidth:1160,margin:'0 auto',width:'100%',display:'flex',alignItems:'center',gap:72,flexWrap:'wrap' }}>

            {/* Left */}
            <div style={{ flex:1,minWidth:300 }}>

              {/* Location badge */}
              <div className="fu d1" style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,107,53,0.08)',border:'1px solid rgba(255,107,53,0.22)',borderRadius:100,padding:'6px 18px',marginBottom:30 }}>

                <span style={{ fontSize:12,color:'#ff6b35',fontFamily:'Syne,sans-serif',fontWeight:700,letterSpacing:1.5 }}>OPEN TO REMOTE</span>
              </div>

              {/* Name */}
              <h1 className="fu d2" style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(2.8rem,5.5vw,4.8rem)',lineHeight:1.07,letterSpacing:'-0.025em',marginBottom:16 }}>
                Hi, I'm{' '}
                <span style={{ background:'linear-gradient(135deg,#ff6b35 20%,#ff9f6b)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Srijan</span>
                <br />Srivastav
              </h1>

              {/* Typewriter */}
              <h2 className="fu d3" style={{ fontFamily:'Syne,sans-serif',fontWeight:600,fontSize:'clamp(1rem,2.2vw,1.4rem)',color:'#8892aa',marginBottom:22,minHeight:34 }}>
                <Typewriter words={['Frontend Developer','IEEE Vice Chair','Team Manager @ AuraLinqPr','Cybersecurity Enthusiast','Social Media Advocate']} />
              </h2>

              {/* Bio */}
              <p className="fu d3" style={{ fontSize:15.5,lineHeight:1.85,color:'#6b7590',maxWidth:490,marginBottom:40 }}>
                Frontend Developer at Classworks.in, IEEE Vice Chair, and Team Manager at AuraLinqPr.
                Passionate about building beautiful web experiences and deeply curious about the intersection of
                web development and cybersecurity. Always learning, always shipping. 🌱
              </p>

              {/* CTAs */}
              <div className="fu d4" style={{ display:'flex',gap:12,flexWrap:'wrap',marginBottom:46 }}>
                <a href="#roles" className="cta-p" style={{ background:'#ff6b35',color:'#fff',padding:'14px 32px',borderRadius:12,fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:15,textDecoration:'none',display:'inline-block',boxShadow:'0 8px 28px rgba(255,107,53,0.38)',transition:'all 0.25s ease' }}>
                  View Roles →
                </a>
                <a href="#contact" className="cta-s" style={{ background:'transparent',color:'#c0c8dc',border:'1.5px solid rgba(255,255,255,0.13)',padding:'14px 32px',borderRadius:12,fontFamily:'Syne,sans-serif',fontWeight:600,fontSize:15,textDecoration:'none',display:'inline-block',transition:'all 0.25s ease' }}>
                  Contact Me
                </a>
              </div>

              {/* Socials */}
              <div className="fu d5" style={{ display:'flex',gap:22,alignItems:'center' }}>
                {[
                  { label:'Email', href:'mailto:srivastav.srijan@ieee.org', char:'✉ Email' },
                  { label:'IEEE', href:'#', char:'⚡ IEEE' },
                  { label:'GitHub', href:'#', char:'⌥ GitHub' },
                  { label:'LinkedIn', href:'#', char:'◈ LinkedIn' },
                ].map(s => (
                  <a key={s.label} href={s.href} className="social-a" style={{ color:'#55607a',fontSize:12,fontFamily:'Syne,sans-serif',fontWeight:700,letterSpacing:0.5,textDecoration:'none',transition:'all 0.2s ease' }}>
                    {s.char}
                  </a>
                ))}
              </div>
            </div>

            {/* Avatar */}
            <div className="fu d3" style={{ display:'flex',justifyContent:'center' }}>
              <div style={{ position:'relative',animation:'float 5s ease-in-out infinite' }}>
                <div style={{ position:'absolute',inset:-24,border:'1.5px dashed rgba(255,107,53,0.2)',borderRadius:'50%',animation:'spin-slow 18s linear infinite' }} />
                <div style={{ position:'absolute',inset:-8,border:'1px solid rgba(255,107,53,0.1)',borderRadius:'50%' }} />
                <div style={{ width:240,height:240,borderRadius:'50%',border:'2.5px solid rgba(255,107,53,0.22)',overflow:'hidden',boxShadow:'0 20px 80px rgba(255,107,53,0.16),inset 0 0 60px rgba(255,107,53,0.04)' }}>
                  <img
                    src="/src/assets/images/profile.png"
                    alt="Srijan Srivastav"
                    style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top' }}
                  />
                </div>
                {/* Floating tags */}
                <div style={{ position:'absolute',top:14,right:-50,background:'rgba(255,107,53,0.12)',border:'1px solid rgba(255,107,53,0.3)',borderRadius:10,padding:'5px 11px',fontSize:11,fontFamily:'Syne,sans-serif',fontWeight:700,color:'#ff6b35',whiteSpace:'nowrap' }}>💻 Classworks.in</div>
                <div style={{ position:'absolute',bottom:24,left:-60,background:'rgba(132,94,247,0.1)',border:'1px solid rgba(132,94,247,0.3)',borderRadius:10,padding:'5px 11px',fontSize:11,fontFamily:'Syne,sans-serif',fontWeight:700,color:'#845ef7',whiteSpace:'nowrap' }}>⚡ IEEE Vice Chair</div>
              </div>
            </div>

          </div>
        </section>

        {/* ══ ABOUT ME ════════════════════════════════════════════ */}
        <section id="about" style={{ padding:'90px 6%' }}>
          <div style={{ maxWidth:1160,margin:'0 auto' }}>
            <SectionLabel>About Me</SectionLabel>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,alignItems:'start' }}>

              {/* Left — quick facts */}
              <div>
                <h2 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(1.8rem,3vw,2.6rem)',lineHeight:1.2,marginBottom:20 }}>
                  A bit about{' '}
                  <span style={{ background:'linear-gradient(135deg,#ff6b35,#ff9f6b)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>me</span>
                </h2>
                <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                  {[
                    { icon:'👔', text:'Team Manager @ AuraLinqPr' },
                    { icon:'🎓', text:'Vice Chair | IEEE UNS Institute of Technology, VBSPU' },
                    { icon:'💼', text:'Frontend Developer @ Classworks.in' },
                    { icon:'🛠️', text:'Web Development Intern @ TechnoHacks' },
                    { icon:'📣', text:'Passionate about Social Media Management' },
                    { icon:'🔐', text:'Deeply interested in Cybersecurity' },
                    { icon:'🌱', text:'Exploring the intersection of web dev & security' },
                  ].map((item, i) => (
                    <div key={i} style={{ display:'flex',alignItems:'flex-start',gap:14,padding:'12px 16px',background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,transition:'all 0.25s ease',animation:`slide-in 0.5s ease ${i*0.06}s both` }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,107,53,0.25)'; e.currentTarget.style.background='rgba(255,107,53,0.04)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'; e.currentTarget.style.background='rgba(255,255,255,0.025)'; }}
                    >
                      <span style={{ fontSize:20,flexShrink:0,marginTop:1 }}>{item.icon}</span>
                      <span style={{ fontSize:14.5,color:'#b0bad0',lineHeight:1.6 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — GitHub stats placeholder */}
              <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
                <div style={{ background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:20,padding:'28px 24px',textAlign:'center' }}>
                  <div style={{ fontSize:13,fontFamily:'Syne,sans-serif',fontWeight:700,color:'#55607a',letterSpacing:2,marginBottom:20 }}>GITHUB STATS</div>
                  <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
                    {[
                      { label:'Repositories', val:'20+', color:'#ff6b35' },
                      { label:'Contributions', val:'500+', color:'#845ef7' },
                      { label:'Stars Earned', val:'30+', color:'#00c9a7' },
                      { label:'PRs Merged', val:'15+', color:'#3b9eff' },
                    ].map(s => (
                      <div key={s.label} style={{ background:'rgba(255,255,255,0.03)',border:`1px solid ${s.color}22`,borderRadius:14,padding:'16px 12px' }}>
                        <div style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:26,color:s.color,marginBottom:4 }}>{s.val}</div>
                        <div style={{ fontSize:11,color:'#55607a',fontFamily:'Syne,sans-serif',fontWeight:600,letterSpacing:0.5 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <a href="https://github.com" target="_blank" rel="noreferrer" style={{ display:'inline-block',marginTop:18,fontSize:12,color:'#ff6b35',fontFamily:'Syne,sans-serif',fontWeight:700,textDecoration:'none',letterSpacing:1 }}>
                    VIEW GITHUB PROFILE →
                  </a>
                </div>

                {/* Mini streak card */}
                <div style={{ background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:20,padding:'22px 24px' }}>
                  <div style={{ fontSize:13,fontFamily:'Syne,sans-serif',fontWeight:700,color:'#55607a',letterSpacing:2,marginBottom:16 }}>CURRENT FOCUS</div>
                  {['Web Dev × Security Intersection','IEEE Community Leadership','Frontend Architecture at Classworks.in','Social Media Growth Strategies'].map((f,i) => (
                    <div key={i} style={{ display:'flex',alignItems:'center',gap:10,marginBottom:10 }}>
                      <div style={{ width:6,height:6,borderRadius:'50%',background:'#ff6b35',flexShrink:0,boxShadow:'0 0 8px #ff6b35' }} />
                      <span style={{ fontSize:13.5,color:'#8892aa' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══ CURRENT ROLES ═══════════════════════════════════════ */}
        <section id="roles" style={{ padding:'80px 6%',background:'linear-gradient(180deg,rgba(255,107,53,0.025) 0%,transparent 100%)' }}>
          <div style={{ maxWidth:1160,margin:'0 auto' }}>
            <SectionLabel>Current Roles</SectionLabel>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:18 }}>
              {currentRoles.map(r => <RoleCard key={r.title} role={r} />)}
            </div>
          </div>
        </section>

        {/* ══ TECH STACK & SKILLS ═════════════════════════════════ */}
        <section id="skills" style={{ padding:'90px 6%' }}>
          <div style={{ maxWidth:1160,margin:'0 auto' }}>
            <SectionLabel>Tech Stack & Skills</SectionLabel>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:28 }}>

              {/* Frontend */}
              <div style={{ background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:22,padding:'28px 24px' }}>
                <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:20 }}>
                  <span style={{ fontSize:22 }}>🎨</span>
                  <span style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:16,color:'#dde3f0' }}>Frontend Development</span>
                </div>
                <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
                  {frontendSkills.map(s => <SkillPill key={s} name={s} />)}
                </div>
              </div>

              {/* Social Media */}
              <div style={{ background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:22,padding:'28px 24px' }}>
                <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:20 }}>
                  <span style={{ fontSize:22 }}>📣</span>
                  <span style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:16,color:'#dde3f0' }}>Social Media & Marketing</span>
                </div>
                <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
                  {socialSkills.map(s => <SkillPill key={s} name={s} />)}
                </div>
              </div>

              {/* Cybersecurity */}
              <div style={{ background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:22,padding:'28px 24px' }}>
                <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:20 }}>
                  <span style={{ fontSize:22 }}>🔐</span>
                  <span style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:16,color:'#dde3f0' }}>Cybersecurity Interests</span>
                </div>
                <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
                  {cyberSkills.map(s => <SkillPill key={s} name={s} />)}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══ IEEE & COMMUNITY ════════════════════════════════════ */}
        <section id="ieee" style={{ padding:'80px 6%',background:'linear-gradient(180deg,rgba(132,94,247,0.03) 0%,transparent 100%)' }}>
          <div style={{ maxWidth:1160,margin:'0 auto' }}>
            <SectionLabel>IEEE & Community</SectionLabel>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:18 }}>
              {ieeeWork.map((w,i) => (
                <div key={i} style={{ display:'flex',alignItems:'flex-start',gap:16,background:'rgba(132,94,247,0.06)',border:'1px solid rgba(132,94,247,0.18)',borderRadius:18,padding:'22px 20px',transition:'all 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(132,94,247,0.4)'; e.currentTarget.style.transform='translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(132,94,247,0.18)'; e.currentTarget.style.transform='translateY(0)'; }}
                >
                  <div style={{ width:36,height:36,borderRadius:10,background:'rgba(132,94,247,0.15)',border:'1px solid rgba(132,94,247,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0 }}>
                    {['🏅','🤝','🌍'][i]}
                  </div>
                  <p style={{ fontSize:14.5,color:'#b0bad0',lineHeight:1.65,marginTop:4 }}>{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ OPEN TO ═════════════════════════════════════════════ */}
        <section id="open" style={{ padding:'80px 6%' }}>
          <div style={{ maxWidth:1160,margin:'0 auto' }}>
            <SectionLabel>Open To</SectionLabel>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16 }}>
              {openTo.map((o,i) => (
                <div key={i} className="open-item" style={{ display:'flex',alignItems:'center',gap:14,background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:'18px 20px',transition:'all 0.25s ease',cursor:'default' }}>
                  <span style={{ fontSize:22,flexShrink:0 }}>{o.icon}</span>
                  <span style={{ fontSize:14,color:'#b0bad0',lineHeight:1.55 }}>{o.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CONTACT ═════════════════════════════════════════════ */}
        <section id="contact" style={{ padding:'110px 6%',background:'linear-gradient(180deg,transparent,rgba(255,107,53,0.04))' }}>
          <div style={{ maxWidth:700,margin:'0 auto',textAlign:'center' }}>
            <SectionLabel centered>Contact Me</SectionLabel>
            <h2 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(2rem,4.5vw,3.2rem)',lineHeight:1.1,marginTop:0,marginBottom:16 }}>
              Let's Work{' '}
              <span style={{ background:'linear-gradient(135deg,#ff6b35,#ff9f6b)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Together</span>
            </h2>
            <p style={{ color:'#6b7590',fontSize:15.5,lineHeight:1.85,maxWidth:460,margin:'0 auto 50px' }}>
              Whether it's a project, collaboration, or just a chat about tech, web security, or IEEE — reach out anytime!
            </p>

            {/* Contact cards */}
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:36,textAlign:'left' }}>
              <a href="mailto:srivastav.srijan@ieee.org" className="contact-card" style={{ display:'flex',alignItems:'center',gap:14,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:18,padding:'20px 22px',textDecoration:'none',transition:'all 0.25s ease' }}>
                <div style={{ width:44,height:44,borderRadius:12,background:'rgba(255,107,53,0.12)',border:'1px solid rgba(255,107,53,0.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0 }}>📧</div>
                <div>
                  <div style={{ fontSize:11,color:'#55607a',fontFamily:'Syne,sans-serif',fontWeight:700,letterSpacing:1,marginBottom:4 }}>EMAIL</div>
                  <div style={{ fontSize:13,color:'#c0c8dc',fontFamily:'Syne,sans-serif',fontWeight:600 }}>srivastav.srijan<br />@ieee.org</div>
                </div>
              </a>
              <a href="tel:+918853942888" className="contact-card" style={{ display:'flex',alignItems:'center',gap:14,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:18,padding:'20px 22px',textDecoration:'none',transition:'all 0.25s ease' }}>
                <div style={{ width:44,height:44,borderRadius:12,background:'rgba(0,201,167,0.1)',border:'1px solid rgba(0,201,167,0.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0 }}>📱</div>
                <div>
                  <div style={{ fontSize:11,color:'#55607a',fontFamily:'Syne,sans-serif',fontWeight:700,letterSpacing:1,marginBottom:4 }}>PHONE</div>
                  <div style={{ fontSize:13,color:'#c0c8dc',fontFamily:'Syne,sans-serif',fontWeight:600 }}>+91 88539 42888</div>
                </div>
              </a>
            </div>

            <div style={{ display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap' }}>
              <a href="mailto:srivastav.srijan@ieee.org" className="cta-p" style={{ background:'#ff6b35',color:'#fff',padding:'15px 36px',borderRadius:13,fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:15,textDecoration:'none',display:'inline-block',boxShadow:'0 8px 30px rgba(255,107,53,0.38)',transition:'all 0.25s ease' }}>
                Send Email ✉️
              </a>
              <a href="tel:+918853942888" className="cta-s" style={{ background:'transparent',color:'#c0c8dc',border:'1.5px solid rgba(255,255,255,0.13)',padding:'15px 36px',borderRadius:13,fontFamily:'Syne,sans-serif',fontWeight:600,fontSize:15,textDecoration:'none',display:'inline-block',transition:'all 0.25s ease' }}>
                Call Now 📱
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}