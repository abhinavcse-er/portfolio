import { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowRight, ArrowUpRight, Binary, BookOpen, Check, ChevronRight,
  CircleHelp, Clock3, Code2, Command, Cpu, ExternalLink, Github, Globe2,
  HardDrive, Layers3, Linkedin, Mail, Menu, Network, Play, Radio, RotateCcw,
  Search, ShieldCheck, Signal, Sparkles, SquareTerminal, Star, Terminal,
  UserRound, Wifi, X, Zap
} from 'lucide-react';

const USER = 'abhinavcse-er';
const LINKEDIN = 'https://www.linkedin.com/in/abhinav-kumar-mishra-29919a363/';
const EMAIL = 'erabhinavkumarmishra@gmail.com';

const FALLBACK_PROJECTS = [
  { name: 'NeuroX AI', description: 'An AI assistant experience with a conversational interface and connected knowledge sources.', language: 'JavaScript', html_url: 'https://github.com/' + USER + '/neurox-ai', stargazers_count: 0 },
  { name: 'Phishing Detection API', description: 'A machine-learning powered phishing URL analysis API and detection workflow.', language: 'Python', html_url: 'https://github.com/' + USER + '/phishing-backend', stargazers_count: 0 },
  { name: 'DigiEduHub', description: 'A student-focused education hub for organizing semester learning resources.', language: 'JavaScript', html_url: 'https://github.com/' + USER + '/digiedu-hub', stargazers_count: 0 },
  { name: 'Sugarcane Digital Khata', description: 'A digital ledger concept for sugarcane farmers, deliveries, expenses and payment tracking.', language: 'JavaScript', html_url: 'https://github.com/' + USER + '/sugarcane-digital-khata', stargazers_count: 0 },
  { name: 'MEHFIL', description: 'A music and community listening experience built around shared moods and baithaks.', language: 'JavaScript', html_url: 'https://github.com/' + USER + '/mehfil', stargazers_count: 0 }
];

const APPS = [
  { id: 'profile', label: 'My Profile', sub: 'Who is Abhinav?', icon: UserRound, color: 'violet' },
  { id: 'projects', label: 'Projects', sub: 'Things I have built', icon: Layers3, color: 'blue' },
  { id: 'dsa', label: 'DSA Arcade', sub: 'Play with algorithms', icon: Binary, color: 'green' },
  { id: 'network', label: 'Network Lab', sub: 'Explore the internet', icon: Network, color: 'cyan' },
  { id: 'terminal', label: 'Terminal', sub: 'Talk to my OS', icon: SquareTerminal, color: 'amber' },
  { id: 'quest', label: 'Know Me Quiz', sub: 'Learn by playing', icon: CircleHelp, color: 'pink' },
  { id: 'contact', label: 'Contact', sub: 'Start a conversation', icon: Mail, color: 'orange' }
];

const TECH = ['C++', 'Java', 'JavaScript', 'Python', 'React', 'Node.js', 'Express', 'SQL', 'Git & GitHub', 'Linux', 'Networking', 'Cybersecurity'];

const QUIZ = [
  { q: 'What is Abhinav currently studying?', options: ['Mechanical Engineering', 'B.Tech CSE (Cybersecurity)', 'Civil Engineering', 'MBA'], answer: 1, why: 'He is a second-year B.Tech student in CSE (Cybersecurity), with a strong interest in software engineering.' },
  { q: 'Which kind of products does he enjoy building?', options: ['Only static landing pages', 'Full-stack tools and useful apps', 'Video editing software only', 'Hardware chips'], answer: 1, why: 'His projects explore full-stack applications, AI interfaces, student tools, music experiences and practical platforms.' },
  { q: 'Which two foundations is he actively strengthening?', options: ['DSA and computer networks', 'Accounting and biology', '3D animation and film', 'Architecture and chemistry'], answer: 0, why: 'Data structures, algorithms, networking and security fundamentals are core parts of his learning journey.' },
  { q: 'Where is Abhinav based?', options: ['Bihar, India', 'London, UK', 'Tokyo, Japan', 'Toronto, Canada'], answer: 0, why: 'He is based in Bihar, India.' }
];

const GRAPH = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E']
};

function createSortFrames(input, algorithm) {
  const a = input.slice();
  const frames = [{ values: a.slice(), active: [], note: 'Array ready. Take one step to begin.' }];
  const record = (active, note) => frames.push({ values: a.slice(), active, note });

  if (algorithm === 'selection') {
    for (let i = 0; i < a.length - 1; i += 1) {
      let min = i;
      for (let j = i + 1; j < a.length; j += 1) {
        record([min, j], 'Compare the current minimum with the next value.');
        if (a[j] < a[min]) min = j;
      }
      if (min !== i) {
        [a[i], a[min]] = [a[min], a[i]];
        record([i, min], 'Place the smallest remaining value at the front.');
      }
    }
  } else if (algorithm === 'insertion') {
    for (let i = 1; i < a.length; i += 1) {
      const key = a[i];
      let j = i - 1;
      while (j >= 0 && a[j] > key) {
        record([j, j + 1], 'Shift a larger value one position to the right.');
        a[j + 1] = a[j];
        j -= 1;
        record([j + 1, j + 2], 'The sorted prefix makes room for the key.');
      }
      a[j + 1] = key;
      record([j + 1], 'Insert the key into its correct position.');
    }
  } else {
    for (let end = a.length - 1; end > 0; end -= 1) {
      for (let j = 0; j < end; j += 1) {
        record([j, j + 1], 'Compare two neighbours. The larger value moves right.');
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          record([j, j + 1], 'Swap! One more large value has bubbled to the end.');
        }
      }
    }
  }
  frames.push({ values: a.slice(), active: [], note: 'Sorted! Every value is in ascending order.' });
  return frames;
}

function createSearchFrames(values, target, method) {
  const frames = [{ active: [], found: false, note: 'Choose a target and start searching.' }];
  if (method === 'binary') {
    let low = 0;
    let high = values.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      frames.push({ active: [mid], found: values[mid] === target, note: 'Check the middle value. Discard half of the remaining range.' });
      if (values[mid] === target) break;
      if (values[mid] < target) low = mid + 1;
      else high = mid - 1;
    }
    if (!frames[frames.length - 1].found) frames.push({ active: [], found: false, note: 'Target not found in this sorted array.' });
  } else {
    let found = false;
    for (let i = 0; i < values.length; i += 1) {
      found = values[i] === target;
      frames.push({ active: [i], found, note: 'Check the next element from left to right.' });
      if (found) break;
    }
    if (!found) frames.push({ active: [], found: false, note: 'Target not found after checking every element.' });
  }
  return frames;
}

function createTraversal(mode) {
  const seen = new Set(['A']);
  const order = ['A'];
  const frames = [{ order: [], current: 'A', frontier: ['A'], note: 'Start at node A.' }];
  const pending = ['A'];
  while (pending.length) {
    const node = mode === 'bfs' ? pending.shift() : pending.pop();
    frames.push({ order: order.slice(), current: node, frontier: pending.slice(), note: mode === 'bfs' ? 'Visit this node, then explore its neighbours level by level.' : 'Visit this node, then go as deep as possible before backtracking.' });
    const neighbours = GRAPH[node] || [];
    const next = mode === 'dfs' ? neighbours.slice().reverse() : neighbours;
    next.forEach(n => {
      if (!seen.has(n)) {
        seen.add(n);
        order.push(n);
        pending.push(n);
      }
    });
  }
  frames.push({ order: order.slice(), current: '', frontier: [], note: 'Traversal complete. All reachable nodes were visited.' });
  return frames;
}

const NETWORK_FLOWS = {
  tcp: {
    title: 'TCP three-way handshake',
    description: 'Before reliable data transfer, TCP establishes a connection using SYN, SYN-ACK and ACK.',
    steps: [
      { tag: '01 · SYN', title: 'Client → Server', body: 'The client requests a connection and sends a SYN segment with its initial sequence number.', detail: 'Client state: SYN-SENT', layer: 'Transport' },
      { tag: '02 · SYN-ACK', title: 'Server → Client', body: 'The server acknowledges the client sequence and sends its own SYN.', detail: 'Server state: SYN-RECEIVED', layer: 'Transport' },
      { tag: '03 · ACK', title: 'Client → Server', body: 'The client acknowledges the server sequence. The connection is now established.', detail: 'Both sides: ESTABLISHED', layer: 'Transport' },
      { tag: '04 · DATA', title: 'Reliable transfer', body: 'Application data can flow. TCP uses sequence numbers, acknowledgements and retransmission to provide ordered delivery.', detail: 'Connection established', layer: 'Transport' }
    ]
  },
  dns: {
    title: 'DNS name resolution',
    description: 'See how a human-friendly domain name can become an IP address.',
    steps: [
      { tag: '01 · CACHE', title: 'Browser / OS cache', body: 'The device checks whether it already knows the answer and whether the cached record is still valid.', detail: 'Cache miss in this demo', layer: 'Application' },
      { tag: '02 · RECURSOR', title: 'Recursive DNS resolver', body: 'The configured resolver takes responsibility for finding the answer, checking its own cache first.', detail: 'Resolver needs an answer', layer: 'Application' },
      { tag: '03 · ROOT', title: 'Root name server', body: 'The root server points the resolver toward the correct top-level-domain name servers.', detail: 'Referral to .com servers', layer: 'Application' },
      { tag: '04 · TLD', title: 'TLD name server', body: 'The .com server refers the resolver to the domain’s authoritative name server.', detail: 'Referral to authoritative DNS', layer: 'Application' },
      { tag: '05 · ANSWER', title: 'Authoritative DNS', body: 'The authoritative server returns the requested record, such as an A or AAAA record.', detail: 'Example answer: 203.0.113.42', layer: 'Application' }
    ]
  },
  osi: {
    title: 'OSI model: encapsulation',
    description: 'Follow application data as it moves down the seven layers before crossing the network.',
    steps: [
      { tag: 'L7 · APPLICATION', title: 'Application', body: 'HTTP, DNS and other application protocols create meaningful messages for network services.', detail: 'Data: HTTP request', layer: 'Application' },
      { tag: 'L6 · PRESENTATION', title: 'Presentation', body: 'Data representation, encoding, compression and encryption are handled here conceptually.', detail: 'Data representation / TLS concepts', layer: 'Presentation' },
      { tag: 'L5 · SESSION', title: 'Session', body: 'The session layer represents dialog control and session coordination between endpoints.', detail: 'Session context', layer: 'Session' },
      { tag: 'L4 · TRANSPORT', title: 'Transport', body: 'TCP or UDP adds transport information such as source and destination ports.', detail: 'Segment / datagram', layer: 'Transport' },
      { tag: 'L3 · NETWORK', title: 'Network', body: 'IP addressing and routing determine how packets travel between networks.', detail: 'IP packet', layer: 'Network' },
      { tag: 'L2 · DATA LINK', title: 'Data Link', body: 'Frames carry local-link addressing and error detection, such as Ethernet or Wi-Fi framing.', detail: 'Frame + MAC addresses', layer: 'Data Link' },
      { tag: 'L1 · PHYSICAL', title: 'Physical', body: 'Bits are transmitted as electrical, optical or radio signals over a medium.', detail: 'Bits on the medium', layer: 'Physical' }
    ]
  }
};

function App() {
  const [github, setGithub] = useState(null);
  const [githubError, setGithubError] = useState(false);
  const [activeApp, setActiveApp] = useState('home');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [clock, setClock] = useState(new Date());
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState(['ABHINAV.OS shell v1.0', 'Type help to explore the available commands.']);
  const [numbers, setNumbers] = useState([8, 3, 11, 5, 2, 9, 6, 4]);
  const [sortMode, setSortMode] = useState('bubble');
  const [sortStep, setSortStep] = useState(0);
  const [searchTarget, setSearchTarget] = useState('22');
  const [searchMode, setSearchMode] = useState('binary');
  const [searchStep, setSearchStep] = useState(0);
  const [structureInput, setStructureInput] = useState('42');
  const [stack, setStack] = useState([12, 24]);
  const [queue, setQueue] = useState([7, 14, 21]);
  const [traversalMode, setTraversalMode] = useState('bfs');
  const [traversalStep, setTraversalStep] = useState(0);
  const [networkMode, setNetworkMode] = useState('tcp');
  const [networkStep, setNetworkStep] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizChoice, setQuizChoice] = useState(null);
  const [quizDone, setQuizDone] = useState(false);

  useEffect(() => {
    const tick = window.setInterval(() => setClock(new Date()), 30000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 8000);
    try {
      const saved = window.localStorage.getItem('portfolio-github-cache');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.stats && Array.isArray(parsed.repos)) setGithub(parsed);
      }
    } catch {
      // A blocked cache must never stop the portfolio from loading.
    }
    fetch('/api/github', { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then(response => {
        if (!response.ok) throw new Error('GitHub data unavailable');
        return response.json();
      })
      .then(data => {
        if (data.unavailable) throw new Error('GitHub data temporarily unavailable');
        if (!active) return;
        setGithub(data);
        setGithubError(false);
        try { window.localStorage.setItem('portfolio-github-cache', JSON.stringify(data)); } catch {}
      })
      .catch(() => { if (active) setGithubError(true); })
      .finally(() => window.clearTimeout(timeoutId));
    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, []);

  const projects = github?.repos?.length ? github.repos : FALLBACK_PROJECTS;
  const sortFrames = useMemo(() => createSortFrames(numbers, sortMode), [numbers, sortMode]);
  const currentSort = sortFrames[Math.min(sortStep, sortFrames.length - 1)];
  const sortedSearchValues = [3, 7, 11, 14, 18, 22, 27, 31, 36, 42];
  const searchFrames = useMemo(() => createSearchFrames(sortedSearchValues, Number(searchTarget), searchMode), [searchTarget, searchMode]);
  const currentSearch = searchFrames[Math.min(searchStep, searchFrames.length - 1)];
  const traversalFrames = useMemo(() => createTraversal(traversalMode), [traversalMode]);
  const currentTraversal = traversalFrames[Math.min(traversalStep, traversalFrames.length - 1)];
  const flow = NETWORK_FLOWS[networkMode];
  const currentNetwork = flow.steps[Math.min(networkStep, flow.steps.length - 1)];
  const currentQuiz = QUIZ[quizIndex];

  const openApp = id => {
    setActiveApp(id);
    setMobileMenu(false);
  };
  const resetSort = () => {
    setNumbers([8, 3, 11, 5, 2, 9, 6, 4]);
    setSortStep(0);
  };
  const shuffleSort = () => {
    setNumbers(values => [...values].sort(() => Math.random() - 0.5));
    setSortStep(0);
  };
  const changeSort = mode => {
    setSortMode(mode);
    setSortStep(0);
  };
  const changeSearch = mode => {
    setSearchMode(mode);
    setSearchStep(0);
  };
  const changeTraversal = mode => {
    setTraversalMode(mode);
    setTraversalStep(0);
  };
  const changeNetwork = mode => {
    setNetworkMode(mode);
    setNetworkStep(0);
  };
  const structureAction = action => {
    const value = Number(structureInput);
    if (action === 'push' && Number.isFinite(value)) setStack(items => [...items, value].slice(-7));
    if (action === 'pop') setStack(items => items.slice(0, -1));
    if (action === 'enqueue' && Number.isFinite(value)) setQueue(items => [...items, value].slice(-7));
    if (action === 'dequeue') setQueue(items => items.slice(1));
  };
  const runCommand = event => {
    event.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;
    const responses = {
      help: 'Commands: about · projects · skills · dsa · network · contact · clear',
      about: 'Abhinav Kumar Mishra | B.Tech CSE (Cybersecurity) student | Bihar, India | Interested in software engineering.',
      projects: 'Current builds include NeuroX AI, phishing detection, DigiEduHub, Sugarcane Digital Khata and MEHFIL. Open the Projects app for repositories.',
      skills: 'Learning and building with C++, Java, JavaScript, Python, React, Node.js, SQL, Linux, networking and cybersecurity.',
      dsa: 'Open DSA Arcade to explore sorting, searching, stacks, queues, BFS and DFS.',
      network: 'Open Network Lab to explore TCP handshake, DNS resolution and the OSI model.',
      contact: 'Email: ' + EMAIL + ' | LinkedIn: linkedin.com/in/abhinav-kumar-mishra-29919a363'
    };
    if (command === 'clear') {
      setTerminalOutput([]);
    } else {
      setTerminalOutput(lines => [...lines, '$ ' + command, responses[command] || 'Command not found. Type help to see available commands.']);
    }
    setTerminalInput('');
  };
  const answerQuiz = index => {
    if (quizChoice !== null || quizDone) return;
    setQuizChoice(index);
    if (index === currentQuiz.answer) setQuizScore(score => score + 1);
  };
  const nextQuiz = () => {
    if (quizIndex === QUIZ.length - 1) {
      setQuizDone(true);
    } else {
      setQuizIndex(index => index + 1);
      setQuizChoice(null);
    }
  };
  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setQuizChoice(null);
    setQuizDone(false);
  };
  const dateLabel = clock.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' });
  const timeLabel = clock.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const renderHome = () => (
    <div className="home-screen">
      <div className="welcome-card">
        <div className="welcome-copy">
          <span className="micro-label"><Sparkles size={13}/> PERSONAL COMPUTING SPACE · EST. 2026</span>
          <h2>Hello, I'm <span>Abhinav.</span></h2>
          <p>Not just a portfolio. This is my little corner of the internet. Open an app, play with a concept, and get to know the person behind the code.</p>
          <div className="welcome-actions">
            <button className="primary-action" onClick={() => openApp('profile')}>Meet the developer <ArrowRight size={15}/></button>
            <button className="text-action" onClick={() => openApp('dsa')}>Launch DSA arcade <Binary size={15}/></button>
          </div>
        </div>
        <div className="welcome-orbit" aria-hidden="true">
          <div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/>
          <div className="orbit-core"><span>A</span><small>OS</small></div>
          <i className="orbit-point point-one"/><i className="orbit-point point-two"/><i className="orbit-point point-three"/>
        </div>
        <div className="welcome-bottom"><span><i className="online-dot"/> SYSTEM ONLINE</span><span>BUILD · LEARN · REPEAT</span><span>IN / 26</span></div>
      </div>

      <div className="home-stats">
        <div className="mini-stat"><span><Github size={15}/></span><strong>{github?.stats?.repositories ?? '—'}</strong><small>Public repositories</small></div>
        <div className="mini-stat"><span><Star size={15}/></span><strong>{github?.stats?.stars ?? '—'}</strong><small>Repository stars</small></div>
        <div className="mini-stat"><span><UsersIcon/></span><strong>{github?.stats?.followers ?? '—'}</strong><small>GitHub followers</small></div>
        <div className="mini-stat"><span><Activity size={15}/></span><strong>02</strong><small>Core learning tracks</small></div>
      </div>

      <div className="section-title-row"><div><span className="eyebrow">YOUR DESKTOP</span><h3>Choose an experience</h3></div><span className="muted-note">Tap an icon to launch</span></div>
      <div className="app-launch-grid">
        {APPS.map(item => {
          const Icon = item.icon;
          return <button className="launch-tile" key={item.id} onClick={() => openApp(item.id)}>
            <span className={'app-icon ' + item.color}><Icon size={20}/></span>
            <span className="launch-title">{item.label}</span><small>{item.sub}</small><ChevronRight size={14} className="launch-chevron"/>
          </button>;
        })}
      </div>
      <div className="home-bottom-grid">
        <div className="info-panel"><div className="panel-heading"><BookOpen size={16}/> A QUICK INTRO <span>README.md</span></div><p>I'm a second-year CSE (Cybersecurity) student who leans toward software engineering. I enjoy turning ideas into useful products and understanding what happens behind the interface.</p><button className="inline-link" onClick={() => openApp('profile')}>Read my story <ArrowRight size={14}/></button></div>
        <div className="info-panel signal-panel"><div className="panel-heading"><Signal size={16}/> CURRENT FOCUS <span>NOW</span></div><div className="focus-row"><span>01</span><div><b>Problem solving</b><small>DSA, patterns and clean logic</small></div></div><div className="focus-row"><span>02</span><div><b>Systems thinking</b><small>Networks, security and full-stack apps</small></div></div></div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="app-content">
      <div className="app-hero"><div><span className="eyebrow">PROFILE / 001</span><h2>The human behind <em>the keyboard.</em></h2><p>Curious by default. Builder by choice. Learning one system at a time.</p></div><div className="profile-avatar">A<span>.</span></div></div>
      <div className="profile-grid">
        <div className="profile-story panel-card"><span className="card-kicker">ABOUT ME</span><h3>Hey, I'm Abhinav Kumar Mishra.</h3><p>I'm a second-year B.Tech student in Computer Science and Engineering (Cybersecurity), based in Bihar, India. My strongest interest is software engineering: building products, writing useful code and understanding how systems fit together.</p><p>From AI interfaces and student tools to practical platforms, I learn best by taking an idea and making it work. Alongside development, I'm strengthening my foundations in data structures, algorithms, computer networks and security.</p><div className="story-tags"><span>Problem solver</span><span>Builder</span><span>Always learning</span></div></div>
        <div className="profile-facts panel-card"><span className="card-kicker">SYSTEM INFO</span><div className="fact-row"><span>Role</span><b>Student developer</b></div><div className="fact-row"><span>Education</span><b>B.Tech · CSE (Cyber)</b></div><div className="fact-row"><span>Location</span><b>Bihar, India</b></div><div className="fact-row"><span>Primary focus</span><b>Software engineering</b></div><div className="fact-row"><span>Exploring</span><b>DSA · Networks · Security</b></div></div>
      </div>
      <div className="panel-card skill-card"><div className="card-heading"><div><span className="card-kicker">TOOLBOX</span><h3>Tools I'm learning and using</h3></div><span className="live-tag"><i/> EVOLVING</span></div><div className="skill-cloud">{TECH.map(t => <span key={t}>{t}</span>)}</div><p className="soft-note">Skills are a journey, not a scorecard. This list reflects the technologies and foundations I am actively exploring.</p></div>
      <div className="milestone-row"><div><span className="milestone-number">01</span><b>Learn by building</b><small>Turning concepts into working applications.</small></div><div><span className="milestone-number">02</span><b>Understand the system</b><small>Look beyond the UI into logic and protocols.</small></div><div><span className="milestone-number">03</span><b>Keep improving</b><small>Ship, review, learn, and repeat.</small></div></div>
      <div className="next-step-card"><div><span className="card-kicker">KEEP EXPLORING</span><h3>Want to see what I make?</h3><p>Open the project shelf and explore the repositories behind this workspace.</p></div><button className="primary-action" onClick={() => openApp('projects')}>Open projects <ArrowRight size={15}/></button></div>
    </div>
  );

  const renderProjects = () => (
    <div className="app-content">
      <div className="app-hero"><div><span className="eyebrow">FILE EXPLORER / 002</span><h2>Selected <em>projects.</em></h2><p>Real repositories, fetched from GitHub when the API is available.</p></div><a className="mini-icon-link" href={'https://github.com/' + USER + '?tab=repositories'} target="_blank" rel="noreferrer"><Github size={17}/><span>All repositories</span><ExternalLink size={13}/></a></div>
      <div className="project-toolbar"><span><HardDrive size={14}/> /home/abhinav/projects</span><span className="repo-status"><i/> {githubError ? 'Showing saved project index' : 'GitHub sync enabled'}</span></div>
      <div className="repo-grid">{projects.slice(0, 8).map((project, index) => (
        <a className="repo-card" href={project.html_url} target="_blank" rel="noreferrer" key={project.id || project.name}>
          <div className="repo-topline"><span className="repo-file"><Code2 size={15}/></span><span className="repo-number">PROJECT_{String(index + 1).padStart(2, '0')}</span><ArrowUpRight size={16}/></div>
          <h3>{(project.name || 'Untitled').replaceAll('-', ' ')}</h3><p>{project.description || 'Explore the source code and implementation details in this repository.'}</p>
          <div className="repo-meta"><span><i className="language-dot"/> {project.language || 'Code'}</span><span><Star size={12}/> {project.stargazers_count || 0}</span><span className="repo-open">Open repo</span></div>
        </a>
      ))}</div>
      <div className="repo-footer"><span><Radio size={15}/> {github?.updatedAt ? 'Last synced ' + new Date(github.updatedAt).toLocaleString() : 'Live GitHub data loads when the server responds.'}</span><a href={'https://github.com/' + USER} target="_blank" rel="noreferrer">github.com/{USER} <ArrowUpRight size={13}/></a></div>
    </div>
  );

  const renderDsa = () => (
    <div className="app-content">
      <div className="app-hero"><div><span className="eyebrow">LEARNING ARCADE / 003</span><h2>Make algorithms <em>click.</em></h2><p>Play with the data. Step through the logic. See the complexity.</p></div><span className="arcade-badge"><Zap size={15}/> INTERACTIVE</span></div>
      <div className="dsa-tabs"><span className="active">SORTING</span><span>SEARCHING</span><span>LINEAR STRUCTURES</span><span>GRAPHS</span></div>
      <div className="lab-grid-os">
        <section className="lab-module sort-module">
          <div className="module-top"><div className="module-icon purple"><Binary size={17}/></div><div><span className="card-kicker">ARRAYS · SORTING</span><h3>Sorting visualizer</h3></div><span className="module-number">01</span></div>
          <p className="module-description">Watch how an algorithm compares and moves values into ascending order.</p>
          <div className="control-row"><label htmlFor="sort-mode">Algorithm</label><select id="sort-mode" value={sortMode} onChange={e => changeSort(e.target.value)}><option value="bubble">Bubble sort</option><option value="selection">Selection sort</option><option value="insertion">Insertion sort</option></select></div>
          <div className="sort-bars">{currentSort.values.map((n, index) => <div className="sort-bar-wrap" key={index}><div className={'sort-bar ' + (currentSort.active.includes(index) ? 'bar-active' : '') + (sortStep === sortFrames.length - 1 ? ' bar-complete' : '')} style={{ height: (n * 5 + 18) + 'px' }}/><small>{n}</small></div>)}</div>
          <div className="step-caption"><span>STEP {sortStep} / {sortFrames.length - 1}</span>{currentSort.note}</div>
          <div className="module-actions"><button className="module-primary" onClick={() => setSortStep(step => Math.min(step + 1, sortFrames.length - 1))} disabled={sortStep >= sortFrames.length - 1}><Play size={13}/> Next step</button><button onClick={() => setSortStep(sortFrames.length - 1)}>Run all</button><button onClick={resetSort}><RotateCcw size={13}/> Reset</button><button onClick={shuffleSort}>Shuffle</button></div>
          <div className="complexity-row"><span>Bubble <b>O(n²)</b></span><span>Selection <b>O(n²)</b></span><span>Insertion <b>O(n²)</b></span></div>
        </section>

        <section className="lab-module search-module">
          <div className="module-top"><div className="module-icon blue"><Search size={17}/></div><div><span className="card-kicker">ARRAYS · SEARCHING</span><h3>Find the target</h3></div><span className="module-number">02</span></div>
          <p className="module-description">Compare linear search with binary search on a sorted array.</p>
          <div className="control-row"><label htmlFor="search-mode">Method</label><select id="search-mode" value={searchMode} onChange={e => changeSearch(e.target.value)}><option value="binary">Binary search</option><option value="linear">Linear search</option></select></div>
          <div className="target-row"><label htmlFor="target-number">Target value</label><input id="target-number" type="number" value={searchTarget} onChange={e => { setSearchTarget(e.target.value); setSearchStep(0); }}/></div>
          <div className="search-cells">{sortedSearchValues.map((n, index) => <div key={n} className={'search-cell ' + (currentSearch.active.includes(index) ? (currentSearch.found ? 'cell-found' : 'cell-active') : '')}>{n}</div>)}</div>
          <div className="step-caption"><span>STEP {searchStep} / {searchFrames.length - 1}</span>{currentSearch.note}</div>
          <div className="module-actions"><button className="module-primary" onClick={() => setSearchStep(step => Math.min(step + 1, searchFrames.length - 1))} disabled={searchStep >= searchFrames.length - 1}><Play size={13}/> Next check</button><button onClick={() => setSearchStep(0)}><RotateCcw size={13}/> Reset</button></div>
          <div className="complexity-row"><span>Linear <b>O(n)</b></span><span>Binary <b>O(log n)</b></span><span>Sorted input required for binary</span></div>
        </section>

        <section className="lab-module structures-module">
          <div className="module-top"><div className="module-icon green"><Layers3 size={17}/></div><div><span className="card-kicker">LINEAR DATA STRUCTURES</span><h3>Stack & queue playground</h3></div><span className="module-number">03</span></div>
          <p className="module-description">Try LIFO and FIFO operations. Add a value, then remove one.</p>
          <div className="structure-input"><input aria-label="Value to add" type="number" value={structureInput} onChange={e => setStructureInput(e.target.value)}/><span>VALUE</span></div>
          <div className="structure-columns">
            <div className="structure-box"><div className="structure-title"><b>STACK</b><span>LIFO</span></div><div className="stack-visual">{stack.length ? stack.map((n, i) => <div key={i} className={'stack-item ' + (i === stack.length - 1 ? 'stack-top' : '')}>{n}{i === stack.length - 1 && <small>TOP</small>}</div>).reverse() : <span className="empty-state">Empty stack</span>}</div><div className="structure-buttons"><button onClick={() => structureAction('push')}>Push</button><button onClick={() => structureAction('pop')} disabled={!stack.length}>Pop</button></div></div>
            <div className="structure-box"><div className="structure-title"><b>QUEUE</b><span>FIFO</span></div><div className="queue-visual">{queue.length ? queue.map((n, i) => <div key={i} className={'queue-item ' + (i === 0 ? 'queue-front' : '')}>{n}</div>) : <span className="empty-state">Empty queue</span>}</div><div className="structure-buttons"><button onClick={() => structureAction('enqueue')}>Enqueue</button><button onClick={() => structureAction('dequeue')} disabled={!queue.length}>Dequeue</button></div></div>
          </div>
        </section>

        <section className="lab-module graph-module">
          <div className="module-top"><div className="module-icon orange"><Network size={17}/></div><div><span className="card-kicker">GRAPHS · TRAVERSAL</span><h3>Explore a graph</h3></div><span className="module-number">04</span></div>
          <p className="module-description">See how BFS uses a queue and DFS uses a stack to visit connected nodes.</p>
          <div className="control-row"><label htmlFor="traversal-mode">Traversal</label><select id="traversal-mode" value={traversalMode} onChange={e => changeTraversal(e.target.value)}><option value="bfs">Breadth-first search (BFS)</option><option value="dfs">Depth-first search (DFS)</option></select></div>
          <div className="graph-visual">{[['A', 50, 13], ['B', 24, 42], ['C', 76, 42], ['D', 9, 82], ['E', 39, 82], ['F', 86, 82]].map(([node, x, y]) => <div key={node} className={'graph-node ' + (currentTraversal.current === node ? 'node-current' : currentTraversal.order.includes(node) ? 'node-visited' : '')} style={{ left: x + '%', top: y + '%' }}>{node}</div>)}<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M50 16 L25 44 M50 16 L75 44 M25 44 L10 84 M25 44 L40 84 M75 44 L86 84 M40 84 L86 84"/></svg></div>
          <div className="traversal-order"><span>VISIT ORDER</span><b>{currentTraversal.order.length ? currentTraversal.order.join(' → ') : '—'}</b><small>Frontier: {currentTraversal.frontier.join(', ') || 'empty'}</small></div>
          <div className="step-caption"><span>STEP {traversalStep} / {traversalFrames.length - 1}</span>{currentTraversal.note}</div>
          <div className="module-actions"><button className="module-primary" onClick={() => setTraversalStep(step => Math.min(step + 1, traversalFrames.length - 1))} disabled={traversalStep >= traversalFrames.length - 1}><Play size={13}/> Next visit</button><button onClick={() => setTraversalStep(0)}><RotateCcw size={13}/> Reset</button></div>
          <div className="complexity-row"><span>BFS <b>O(V + E)</b></span><span>DFS <b>O(V + E)</b></span></div>
        </section>
      </div>
      <div className="concept-strip"><div><BookOpen size={16}/><b>What you're practising</b></div><p>Arrays · comparisons · swaps · sorted order · binary search · LIFO · FIFO · graph traversal · queue · stack · Big-O time complexity.</p></div>
    </div>
  );

  const renderNetwork = () => (
    <div className="app-content">
      <div className="app-hero"><div><span className="eyebrow">SYSTEMS LAB / 004</span><h2>Packets have a <em>journey.</em></h2><p>Explore the invisible rules that let devices communicate.</p></div><span className="arcade-badge cyan-badge"><Globe2 size={15}/> NETWORK SIM</span></div>
      <div className="network-tabs">{Object.keys(NETWORK_FLOWS).map(key => <button key={key} className={networkMode === key ? 'selected' : ''} onClick={() => changeNetwork(key)}>{key === 'tcp' ? 'TCP handshake' : key === 'dns' ? 'DNS lookup' : 'OSI model'}</button>)}</div>
      <div className="network-intro"><div><span className="card-kicker">PROTOCOL WALKTHROUGH</span><h3>{flow.title}</h3><p>{flow.description}</p></div><div className="packet-icon"><Wifi size={23}/><span>PACKET LAB</span></div></div>
      <div className="network-stage">
        <div className="stage-track">{flow.steps.map((step, index) => <div key={step.tag} className={'stage-node ' + (index < networkStep ? 'stage-done' : index === networkStep ? 'stage-current' : '')}><span>{index < networkStep ? <Check size={13}/> : String(index + 1).padStart(2, '0')}</span><small>{step.tag.split(' · ')[0]}</small></div>)}</div>
        <div className="stage-line"><i style={{ width: ((networkStep) / Math.max(1, flow.steps.length - 1) * 100) + '%' }}/></div>
        <div className="network-step-card"><div className="network-step-head"><span>{currentNetwork.tag}</span><span>LAYER · {currentNetwork.layer.toUpperCase()}</span></div><h3>{currentNetwork.title}</h3><p>{currentNetwork.body}</p><div className="packet-detail"><Activity size={14}/>{currentNetwork.detail}</div><div className="network-step-footer"><span>EVENT {networkStep + 1} OF {flow.steps.length}</span><div><button onClick={() => setNetworkStep(0)}><RotateCcw size={13}/> Reset</button><button className="module-primary" onClick={() => setNetworkStep(step => Math.min(step + 1, flow.steps.length - 1))} disabled={networkStep >= flow.steps.length - 1}>Next event <ArrowRight size={13}/></button></div></div></div>
      </div>
      <div className="protocol-notes">
        <div className="panel-card"><span className="card-kicker">TRANSPORT LAYER</span><h3>TCP vs UDP</h3><p><b>TCP</b> is connection-oriented and provides ordered, reliable delivery. <b>UDP</b> is connectionless with lower overhead, useful when an application can tolerate loss or handle it itself.</p><div className="protocol-pills"><span>TCP · reliable stream</span><span>UDP · datagrams</span><span>Ports · processes</span></div></div>
        <div className="panel-card"><span className="card-kicker">NETWORK LAYER</span><h3>IP, routers & packets</h3><p>IP addresses identify endpoints across networks. Routers consult forwarding information to choose a next hop. Ethernet and Wi-Fi handle local-link delivery.</p><div className="protocol-pills"><span>IPv4 / IPv6</span><span>Routing</span><span>MAC address</span></div></div>
        <div className="panel-card"><span className="card-kicker">APPLICATION LAYER</span><h3>HTTP & HTTPS</h3><p>HTTP defines request/response semantics. HTTPS protects HTTP using TLS, helping provide confidentiality, integrity and server authentication.</p><div className="protocol-pills"><span>HTTP</span><span>TLS</span><span>DNS</span></div></div>
      </div>
      <div className="osi-list"><div className="section-title-row"><div><span className="eyebrow">REFERENCE</span><h3>OSI model at a glance</h3></div><span className="muted-note">7 layers</span></div>{[['7','Application','HTTP · DNS · SMTP'],['6','Presentation','Encoding · encryption · compression'],['5','Session','Dialog and session management'],['4','Transport','TCP · UDP · ports'],['3','Network','IP addressing · routing'],['2','Data Link','Ethernet · Wi-Fi · frames · MAC'],['1','Physical','Bits · signals · medium']].map(row => <div className="osi-row" key={row[0]}><b>{row[0]}</b><strong>{row[1]}</strong><span>{row[2]}</span></div>)}</div>
    </div>
  );

  const renderTerminal = () => (
    <div className="app-content terminal-app">
      <div className="app-hero"><div><span className="eyebrow">COMMAND LINE / 005</span><h2>Talk to <em>the terminal.</em></h2><p>A tiny interactive shell with a few commands about the developer.</p></div><span className="terminal-status"><i/> SHELL READY</span></div>
      <div className="terminal-window">
        <div className="terminal-title"><div><i/><i/><i/></div><span>abhinav@personal-os: ~</span><span>UTF-8</span></div>
        <div className="terminal-body" aria-live="polite">{terminalOutput.map((line, index) => <p key={index} className={line.startsWith('$') ? 'terminal-command' : ''}>{line}</p>)}</div>
        <form className="terminal-input-row" onSubmit={runCommand}><span>abhinav@os <b>~</b> $</span><input autoComplete="off" value={terminalInput} onChange={e => setTerminalInput(e.target.value)} placeholder="type a command..." aria-label="Terminal command"/><button type="submit" aria-label="Run command"><ArrowRight size={16}/></button></form>
      </div>
      <div className="command-shortcuts"><span>TRY A COMMAND</span>{['help', 'about', 'projects', 'skills', 'dsa', 'network', 'contact', 'clear'].map(command => <button key={command} onClick={() => { setTerminalInput(command); setTerminalOutput(lines => [...lines, '$ ' + command, command === 'help' ? 'Commands: about · projects · skills · dsa · network · contact · clear' : command === 'clear' ? '' : 'Use the terminal prompt and press Enter to run this command.']); }}>{command}</button>)}</div>
      <div className="terminal-hint"><Command size={15}/> No system commands are executed. This is a safe, in-browser demo shell.</div>
    </div>
  );

  const renderQuiz = () => (
    <div className="app-content quiz-app">
      <div className="app-hero"><div><span className="eyebrow">DISCOVERY GAME / 006</span><h2>How well do you <em>know me?</em></h2><p>Four quick questions. Each answer unlocks a little more of my story.</p></div><span className="quiz-score"><Star size={15}/> {quizScore} POINTS</span></div>
      {!quizDone ? <div className="quiz-card"><div className="quiz-progress"><span>QUESTION {quizIndex + 1} / {QUIZ.length}</span><div>{QUIZ.map((_, i) => <i key={i} className={i <= quizIndex ? 'filled' : ''}/>)}</div></div><h3>{currentQuiz.q}</h3><div className="quiz-options">{currentQuiz.options.map((option, index) => <button key={option} className={quizChoice === index ? (index === currentQuiz.answer ? 'correct' : 'incorrect') : (quizChoice !== null && index === currentQuiz.answer ? 'correct' : '')} onClick={() => answerQuiz(index)} disabled={quizChoice !== null}><span>{String.fromCharCode(65 + index)}</span>{option}{quizChoice !== null && index === currentQuiz.answer && <Check size={16}/>}</button>)}</div>{quizChoice !== null && <div className="quiz-feedback"><b>{quizChoice === currentQuiz.answer ? 'Correct! Nice work.' : 'Not quite — now you know.'}</b><p>{currentQuiz.why}</p><button className="module-primary" onClick={nextQuiz}>{quizIndex === QUIZ.length - 1 ? 'See result' : 'Next question'} <ArrowRight size={14}/></button></div>}</div> : <div className="quiz-result"><div className="result-icon"><Sparkles size={28}/></div><span className="card-kicker">DISCOVERY COMPLETE</span><h3>{quizScore === QUIZ.length ? 'Perfect score!' : 'Thanks for exploring!'}</h3><p>You got <b>{quizScore} out of {QUIZ.length}</b>. You now know a little more about the person behind this OS.</p><div className="result-actions"><button className="module-primary" onClick={resetQuiz}><RotateCcw size={14}/> Play again</button><button onClick={() => openApp('profile')}>Read full profile</button></div></div>}
      <div className="quiz-note"><CircleHelp size={17}/><p>This is a playful introduction, not a formal assessment. Explore the other apps to learn about my projects, DSA practice and networking interests.</p></div>
    </div>
  );

  const renderContact = () => (
    <div className="app-content contact-app">
      <div className="app-hero"><div><span className="eyebrow">COMMUNICATION CENTER / 007</span><h2>Let's build something <em>useful.</em></h2><p>Open to internships, collaborations, feedback and conversations about technology.</p></div><div className="contact-orb"><Mail size={25}/></div></div>
      <div className="contact-grid"><a href={'mailto:' + EMAIL} className="contact-card"><span className="contact-card-icon"><Mail size={20}/></span><span className="card-kicker">EMAIL</span><b>{EMAIL}</b><small>Start a direct conversation</small><ArrowUpRight size={16}/></a><a href={LINKEDIN} target="_blank" rel="noreferrer" className="contact-card"><span className="contact-card-icon"><Linkedin size={20}/></span><span className="card-kicker">LINKEDIN</span><b>Connect professionally</b><small>Networking and opportunities</small><ArrowUpRight size={16}/></a><a href={'https://github.com/' + USER} target="_blank" rel="noreferrer" className="contact-card"><span className="contact-card-icon"><Github size={20}/></span><span className="card-kicker">GITHUB</span><b>@{USER}</b><small>Explore code and projects</small><ArrowUpRight size={16}/></a></div>
      <div className="availability-card"><span className="online-dot"/> <div><b>Open to meaningful opportunities</b><small>Internships · Open-source collaboration · Learning communities</small></div></div>
    </div>
  );

  const activeTitle = activeApp === 'home' ? 'Overview' : APPS.find(item => item.id === activeApp)?.label || 'Overview';
  const activeIcon = activeApp === 'home' ? Cpu : APPS.find(item => item.id === activeApp)?.icon || Cpu;
  const ActiveIcon = activeIcon;

  return (
    <div className="os-shell">
      <header className="os-menubar">
        <button className="os-brand" onClick={() => openApp('home')}><span className="brand-symbol">A<span>.</span></span><b>ABHINAV<span>.OS</span></b></button>
        <div className="menu-center"><span>PERSONAL WORKSPACE</span><i/> <span>V 1.0.26</span></div>
        <div className="system-tray"><span className="tray-status"><i/> ONLINE</span><span><Wifi size={14}/></span><span><Signal size={14}/></span><span className="tray-time"><Clock3 size={13}/> {dateLabel} · {timeLabel}</span><button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Open apps menu">{mobileMenu ? <X size={17}/> : <Menu size={17}/>}</button></div>
      </header>

      <main className="os-desktop">
        <div className="desktop-heading">
          <div><span className="desktop-kicker">WELCOME TO MY DIGITAL SPACE</span><h1>Explore. <span>Interact.</span> Discover.</h1><p>A developer portfolio disguised as a tiny operating system.</p></div>
          <div className="desktop-status"><div className="status-ring"><span>OS</span></div><div><b>All systems normal</b><small>7 apps installed · API-connected</small></div></div>
        </div>

        <div className="workspace">
          <aside className={'app-dock ' + (mobileMenu ? 'dock-open' : '')}>
            <div className="dock-label">APPLICATIONS</div>
            <button className={'dock-item ' + (activeApp === 'home' ? 'dock-active' : '')} onClick={() => openApp('home')}><span className="dock-icon home-icon"><Cpu size={17}/></span><span>Home</span></button>
            {APPS.map(item => {
              const Icon = item.icon;
              return <button key={item.id} className={'dock-item ' + (activeApp === item.id ? 'dock-active' : '')} onClick={() => openApp(item.id)}><span className={'dock-icon ' + item.color}><Icon size={17}/></span><span>{item.label}</span>{activeApp === item.id && <i className="dock-indicator"/>}</button>;
            })}
            <div className="dock-divider"/>
            <div className="dock-mini-note"><span className="online-dot"/><div><b>ABHINAV.OS</b><small>Built with curiosity</small></div></div>
          </aside>

          <section className="window-shell">
            <div className="window-chrome"><div className="window-controls"><i/><i/><i/></div><div className="window-location"><ActiveIcon size={13}/><span>{activeTitle}</span></div><div className="window-actions"><span>LOCAL SESSION</span><button onClick={() => openApp('home')} aria-label="Go to home"><X size={14}/></button></div></div>
            <div className="window-content" key={activeApp}>
              {activeApp === 'home' && renderHome()}
              {activeApp === 'profile' && renderProfile()}
              {activeApp === 'projects' && renderProjects()}
              {activeApp === 'dsa' && renderDsa()}
              {activeApp === 'network' && renderNetwork()}
              {activeApp === 'terminal' && renderTerminal()}
              {activeApp === 'quest' && renderQuiz()}
              {activeApp === 'contact' && renderContact()}
            </div>
            <div className="window-statusbar"><span><i/> READY</span><span>{activeTitle.toUpperCase()}</span><span>ABHINAV.OS · BETA</span></div>
          </section>
        </div>
        <footer className="os-taskbar"><div><span className="taskbar-mark">A.</span><span>Abhinav Kumar Mishra</span></div><span className="taskbar-center">A SMALL OS FOR A BIG CURIOSITY</span><div><span className="taskbar-light"/> Made for the web <span>© {new Date().getFullYear()}</span></div></footer>
      </main>
    </div>
  );
}

function UsersIcon() {
  return <span className="users-glyph">↗</span>;
}

export default App;
