import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X,
  Code2, Terminal, Network, ShieldCheck, GitBranch, Star, Users, ExternalLink,
  Cpu, Layers3, Activity, ChevronRight, Play, RotateCcw
} from 'lucide-react';

const USER = 'abhinavcse-er';
const fallbackProjects = [
  { name: 'neurox-ai', description: 'An AI assistant experience with a conversational interface and connected knowledge sources.', language: 'JavaScript', html_url: `https://github.com/${USER}/neurox-ai`, stargazers_count: 0 },
  { name: 'phishing-backend', description: 'Machine-learning powered phishing URL analysis API and detection workflow.', language: 'Python', html_url: `https://github.com/${USER}/phishing-backend`, stargazers_count: 0 },
  { name: 'Url-based-phishing-detection-system', description: 'A URL-focused phishing detection project exploring features and classification.', language: 'Python', html_url: `https://github.com/${USER}/Url-based-phishing-detection-system`, stargazers_count: 0 },
  { name: 'digiedu-hub', description: 'A student-focused education hub for organizing semester learning resources.', language: 'JavaScript', html_url: `https://github.com/${USER}/digiedu-hub`, stargazers_count: 0 }
];

const tech = ['React', 'JavaScript', 'Node.js', 'Express', 'Python', 'C++', 'REST APIs', 'Git & GitHub', 'SQL', 'Linux'];

function App() {
  const [github, setGithub] = useState(null);
  const [githubError, setGithubError] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [values, setValues] = useState([8, 3, 11, 5, 2, 9, 6]);
  const [sorted, setSorted] = useState(false);
  const [packets, setPackets] = useState(false);
  const projects = github?.repos?.length ? github.repos : fallbackProjects;

  useEffect(() => {
    fetch('/api/github').then(r => { if (!r.ok) throw new Error('GitHub unavailable'); return r.json(); })
      .then(setGithub).catch(() => setGithubError(true));
  }, []);

  const nav = [['Work', '#work'], ['About', '#about'], ['Lab', '#lab'], ['Contact', '#contact']];
  const sortValues = () => { setValues(v => [...v].sort((a, b) => a - b)); setSorted(true); };
  const resetValues = () => { setValues([8, 3, 11, 5, 2, 9, 6]); setSorted(false); };
  const shuffled = useMemo(() => values, [values]);

  return <div className="app-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="topbar">
      <a className="brand" href="#home"><span className="brand-mark">A<span>.</span></span><span>ABHINAV<span className="brand-muted"> / DEV</span></span></a>
      <nav className={mobileOpen ? 'nav nav-open' : 'nav'}>
        {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMobileOpen(false)}>{label}</a>)}
      </nav>
      <a className="availability" href="mailto:erabhinavkumarmishra@gmail.com"><span className="pulse" /> Available for opportunities <ArrowUpRight size={14}/></a>
      <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X/> : <Menu/>}</button>
    </header>

    <main id="home">
      <section className="hero section-wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> FULL-STACK DEVELOPER · INDIA</div>
          <h1>Building ideas<br/>into <span className="gradient-text">real things.</span></h1>
          <p className="hero-lede">Hey, I'm <strong>Abhinav Kumar Mishra</strong> — a developer who enjoys turning complex problems into clean, useful digital experiences.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={17}/></a>
            <a className="button button-quiet" href="https://github.com/abhinavcse-er" target="_blank" rel="noreferrer"><Github size={17}/> GitHub profile</a>
          </div>
          <div className="hero-meta"><span><i className="meta-dot"/> B.Tech · CSE (Cyber)</span><span>Based in Bihar, India</span></div>
        </div>
        <div className="hero-art">
          <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
          <div className="code-window">
            <div className="window-head"><div className="window-dots"><i/><i/><i/></div><span>abhinav.tsx</span><span className="window-lock">● LIVE</span></div>
            <div className="code-body">
              <div><span className="ln">01</span><span className="code-purple">const</span> developer = {'{'}</div>
              <div><span className="ln">02</span>  name: <span className="code-green">'Abhinav'</span>,</div>
              <div><span className="ln">03</span>  focus: [<span className="code-green">'Full Stack'</span>,</div>
              <div><span className="ln">04</span>          <span className="code-green">'Problem Solving'</span>],</div>
              <div><span className="ln">05</span>  mindset: <span className="code-green">'Always building'</span>,</div>
              <div><span className="ln">06</span>  learning: <span className="code-orange">'Every day'</span></div>
              <div><span className="ln">07</span>{'}'};</div>
              <div className="code-spacer"/><div><span className="ln">08</span><span className="code-purple">while</span> (curious) {'{'}</div>
              <div><span className="ln">09</span>  build(); <span className="code-comment">// repeat</span></div>
              <div><span className="ln">10</span>{'}'}</div>
            </div>
            <div className="window-foot"><span><span className="tiny-green"/> JavaScript</span><span>UTF-8</span><span>Ln 10, Col 2</span></div>
          </div>
          <div className="float-chip chip-top"><Code2 size={15}/> Clean code, clear thinking</div>
          <div className="float-chip chip-bottom"><Activity size={15}/> Learning in public</div>
        </div>
        <a className="scroll-cue" href="#work"><span/> SCROLL TO EXPLORE <ArrowDown size={13}/></a>
      </section>

      <section className="stats-strip section-wrap">
        <div className="stat-intro"><span className="section-kicker">THE SNAPSHOT</span><strong>Curiosity, measured<br/>in commits.</strong></div>
        <div className="stat"><span className="stat-icon"><GitBranch size={17}/></span><strong>{github?.stats?.repositories ?? '—'}</strong><small>Public repositories</small></div>
        <div className="stat"><span className="stat-icon"><Star size={17}/></span><strong>{github?.stats?.stars ?? '—'}</strong><small>Repository stars</small></div>
        <div className="stat"><span className="stat-icon"><Users size={17}/></span><strong>{github?.stats?.followers ?? '—'}</strong><small>GitHub followers</small></div>
        <div className="stat-status"><span className="live-indicator"/> {githubError ? 'GitHub data reconnecting' : 'GitHub data · live API'}</div>
      </section>

      <section className="section-wrap work-section" id="work">
        <div className="section-heading"><div><span className="section-kicker">01 / SELECTED WORK</span><h2>Things I've <span className="gradient-text">built.</span></h2></div><a className="text-link" href="https://github.com/abhinavcse-er?tab=repositories" target="_blank" rel="noreferrer">All repositories <ArrowUpRight size={16}/></a></div>
        <div className="project-grid">
          {projects.slice(0, 4).map((project, i) => <a className="project-card" href={project.html_url} target="_blank" rel="noreferrer" key={project.name}>
            <div className="project-top"><span className="project-index">0{i + 1} / PROJECT</span><span className="project-arrow"><ArrowUpRight size={18}/></span></div>
            <div className="project-symbol">{i === 0 ? <Cpu/> : i === 1 || i === 2 ? <ShieldCheck/> : <Layers3/>}</div>
            <h3>{project.name.replaceAll('-', ' ')}</h3>
            <p>{project.description || 'An open-source project. Explore the repository for details.'}</p>
            <div className="project-foot"><span className="language"><i/> {project.language || 'Code'}</span><span><Star size={13}/> {project.stargazers_count ?? 0}</span><span className="view-repo">View repo <ExternalLink size={12}/></span></div>
          </a>)}
        </div>
        <div className="github-panel">
          <div className="github-panel-copy"><Github size={22}/><div><strong>Open source, one commit at a time.</strong><span>Follow my journey, explore experiments and see what I'm learning.</span></div></div>
          <a href="https://github.com/abhinavcse-er" target="_blank" rel="noreferrer" className="button button-outline">Visit GitHub <ArrowUpRight size={15}/></a>
        </div>
      </section>

      <section className="section-wrap about-section" id="about">
        <div className="section-heading"><div><span className="section-kicker">02 / THE DEVELOPER</span><h2>Code is a tool.<br/><span className="gradient-text">Curiosity is the engine.</span></h2></div></div>
        <div className="about-grid">
          <div className="about-copy"><p>I'm a second-year B.Tech CSE (Cybersecurity) student with a strong interest in software engineering. I like understanding how systems work — from the interface users see to the APIs and logic behind them.</p><p>My current focus is building full-stack applications, strengthening DSA fundamentals, and exploring the networks and security principles that keep software reliable.</p><a className="text-link" href="https://www.linkedin.com/in/abhinav-kumar-mishra-29919a363/" target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={15}/></a></div>
          <div className="stack-card"><div className="stack-head"><Terminal size={16}/> TOOLKIT <span>WHAT I USE</span></div><div className="tech-list">{tech.map(t => <span key={t}>{t}</span>)}</div><div className="stack-note"><span className="tiny-green"/> Always learning. Always shipping.</div></div>
        </div>
      </section>

      <section className="section-wrap lab-section" id="lab">
        <div className="section-heading"><div><span className="section-kicker">03 / INTERACTIVE LAB</span><h2>Let's make concepts <span className="gradient-text">visible.</span></h2></div><span className="lab-caption">Tiny demos · Real fundamentals</span></div>
        <div className="lab-grid">
          <div className="lab-card"><div className="lab-card-head"><div className="lab-icon"><Code2 size={18}/></div><span>DSA / SORTING</span><span className="lab-live">INTERACTIVE</span></div><h3>Bubble into order.</h3><p>Visualize a simple sorting pass. Press sort to arrange the values from smallest to largest.</p><div className="bars" aria-label="Array visualization">{shuffled.map((n, i) => <div className="bar-wrap" key={i}><div className={sorted ? 'bar bar-sorted' : 'bar'} style={{height: (n * 7) + 10 + 'px'}}/><small>{n}</small></div>)}</div><div className="lab-controls"><button onClick={sortValues}><Play size={13}/> Sort values</button><button className="reset-btn" onClick={resetValues}><RotateCcw size={13}/> Reset</button></div><div className="complexity"><span>TIME COMPLEXITY <b>O(n²)</b></span><span>SPACE <b>O(1)</b></span></div></div>
          <div className="lab-card network-card"><div className="lab-card-head"><div className="lab-icon"><Network size={18}/></div><span>NETWORKING / TCP-IP</span><span className="lab-live">SIMULATION</span></div><h3>How a request travels.</h3><p>Follow a packet from your browser to a server through a simplified network path.</p><div className={packets ? 'network-flow flow-active' : 'network-flow'}><div className="network-node"><span><Terminal size={17}/></span><small>CLIENT</small></div><div className="network-link"><i/></div><div className="network-node"><span><Network size={17}/></span><small>ROUTER</small></div><div className="network-link"><i/></div><div className="network-node"><span><Layers3 size={17}/></span><small>SERVER</small></div></div><div className="packet-caption">{packets ? 'Packet delivered · HTTP response received' : 'Ready to send a request'}</div><div className="lab-controls"><button onClick={() => {setPackets(false); setTimeout(() => setPackets(true), 80);}}><Play size={13}/> Send packet</button><button className="reset-btn" onClick={() => setPackets(false)}><RotateCcw size={13}/> Reset</button></div><div className="complexity"><span>PROTOCOL <b>TCP/IP</b></span><span>APP LAYER <b>HTTP</b></span></div></div>
        </div>
      </section>

      <section className="section-wrap contact-section" id="contact">
        <span className="section-kicker">04 / GET IN TOUCH</span><h2>Have an idea?<br/><span className="gradient-text">Let's build it.</span></h2><p>Open to internships, collaborations, learning opportunities and interesting engineering conversations.</p>
        <div className="contact-actions"><a className="button button-primary" href="mailto:erabhinavkumarmishra@gmail.com"><Mail size={16}/> Say hello <ArrowUpRight size={15}/></a><a className="button button-quiet" href="https://www.linkedin.com/in/abhinav-kumar-mishra-29919a363/" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a><a className="button button-quiet" href="https://github.com/abhinavcse-er" target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a></div>
      </section>
    </main>
    <footer className="footer section-wrap"><a className="brand" href="#home"><span className="brand-mark">A<span>.</span></span><span>ABHINAV<span className="brand-muted"> / DEV</span></span></a><span>Designed & built with curiosity. © {new Date().getFullYear()} Abhinav Kumar Mishra</span><a href="#home">Back to top ↑</a></footer>
  </div>;
}

export default App;