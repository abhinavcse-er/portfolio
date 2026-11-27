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
  { name: 'antigravity-projects', description: 'MEHFIL: a full-stack real-time Indian music lounge with synchronized radio, live community, song requests and persistent data.', language: 'JavaScript', html_url: 'https://github.com/' + USER + '/antigravity-projects', stargazers_count: 0 },
  { name: 'neurox-ai', description: 'Full-stack AI workspace for everyday questions, coding, study and defensive cybersecurity learning.', language: 'CSS', html_url: 'https://github.com/' + USER + '/neurox-ai', stargazers_count: 0 },
  { name: 'Url-based-phishing-detection-system', description: 'PhishGuard: explainable URL risk heuristics with an experimental ML model held behind an external-validation gate.', language: 'Python', html_url: 'https://github.com/' + USER + '/Url-based-phishing-detection-system', stargazers_count: 0 },
  { name: 'phishing-backend', description: 'Python API for URL analysis using extracted URL features and a trained classifier.', language: 'Python', html_url: 'https://github.com/' + USER + '/phishing-backend', stargazers_count: 0 },
  { name: 'RideYou', description: 'Mobile-first Bihar ride-booking demo with customer booking, fare review and driver assignment workflows.', language: 'JavaScript', html_url: 'https://github.com/' + USER + '/RideYou', stargazers_count: 0 },
  { name: 'digiedu-hub', description: 'Multi-page learning resource hub for diploma students, with branch and semester learning material.', language: 'HTML', html_url: 'https://github.com/' + USER + '/digiedu-hub', stargazers_count: 0 },
  { name: 'itzfizz-scroll-hero', description: 'Responsive scroll-driven hero experience using GSAP and ScrollTrigger.', language: 'CSS', html_url: 'https://github.com/' + USER + '/itzfizz-scroll-hero', stargazers_count: 0 }
];

const PROJECT_DETAILS = {
  'antigravity-projects': {
    title: 'MEHFIL · Real-time music lounge',
    category: 'Full-stack · Real-time',
    description: 'A shared Indian music lounge with synchronized radio, live listener presence and a community baithak.',
    details: 'The Node.js backend uses Express and Socket.IO for live presence, synchronized radio events, song requests, votes, reactions and community messages. The project includes a curated multi-mood catalog, a personal listening queue, a PWA frontend and SQLite-backed persistence with a fallback storage path.',
    stack: ['Node.js', 'Express', 'Socket.IO', 'SQLite', 'Vanilla JS', 'PWA'],
    live: 'https://apnimehfill.netlify.app/',
    liveLabel: 'Open MEHFIL',
    note: 'Live app · real-time community'
  },
  'neurox-ai': {
    title: 'NeuroX AI',
    category: 'AI product',
    description: 'A full-stack AI workspace for everyday questions, coding, study support and defensive cybersecurity learning.',
    details: 'The frontend includes Firebase sign-in, conversation history and a multi-mode chat experience. Its Node.js backend routes provider requests, streams responses and keeps provider secrets server-side, with a Wikipedia fallback for selected general lookups.',
    stack: ['JavaScript', 'Node.js', 'Express', 'Firebase Auth', 'SSE', 'Netlify', 'Render'],
    live: 'https://neuroaii.netlify.app/',
    liveLabel: 'Open NeuroX AI',
    note: 'Live app · AI workspace'
  },
  'phishing-backend': {
    title: 'Phishing Classifier API',
    category: 'Backend · Security',
    description: 'A Python API for analysing suspicious URLs using structural features and a trained classification model.',
    details: 'The repository contains a FastAPI server, feature extraction logic, a training script and a saved model artifact. It is separate from the newer PhishGuard research project.',
    stack: ['Python', 'FastAPI', 'scikit-learn', 'URL analysis'],
    note: 'API component · no public app URL published'
  },
  'url-based-phishing-detection-system': {
    title: 'PhishGuard',
    category: 'Security research',
    description: 'An explainable URL-analysis project that scores suspicious URL structure without visiting the submitted website.',
    details: 'The live scanning path uses transparent URL heuristics. The experimental ML v4 candidate is intentionally not enabled: the repository documents a failed independent external-validation release gate. That limitation is stated rather than presenting the model as production-ready.',
    stack: ['Python', 'FastAPI', 'URL features', 'Model evaluation', 'HTML/CSS/JS'],
    live: 'https://abhinavcse-er.github.io/Url-based-phishing-detection-system/',
    liveLabel: 'Open PhishGuard',
    note: 'Live website · experimental ML inference gated'
  },
  'rideyou': {
    title: 'RideYou',
    category: 'Product prototype',
    description: 'A mobile-first ride-booking prototype designed around the needs of customers and vehicle operators in Bihar.',
    details: 'The demo covers customer booking and lookup, manual fare quotation, admin review, driver assignment and trip status. Its GitHub Pages build stores demo bookings in the current browser only; secure multi-user bookings require the planned backend and database work.',
    stack: ['JavaScript', 'React', 'Vite', 'Supabase schema', 'GitHub Pages'],
    live: 'https://abhinavcse-er.github.io/RideYou/',
    liveLabel: 'Open RideYou demo',
    note: 'Live demo · bookings stored in this browser only'
  },
  'digiedu-hub': {
    title: 'DigiEdu Hub',
    category: 'Education',
    description: 'A multi-page e-learning resource hub built for diploma students, with branch and semester learning material.',
    details: 'The repository includes student-facing course pages and a semester dashboard linking Computer Science, Mechanical and Civil learning resources, notes and practice material.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Student resources'],
    note: 'Preview not deployed · source available'
  },
  'itzfizz-scroll-hero': {
    title: 'ITZFIZZ · Scroll Hero',
    category: 'Frontend experience',
    description: 'A responsive, scroll-driven hero experience focused on typography, motion and visual storytelling.',
    details: 'A sports-car visual responds to scroll position using GSAP and ScrollTrigger. The project also includes a reveal sequence, progress indicator, motion trail and responsive layouts.',
    stack: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'ScrollTrigger'],
    live: 'https://abhinavcse-er.github.io/itzfizz-scroll-hero/',
    liveLabel: 'Open ITZFIZZ',
    note: 'Live website · scroll-driven motion demo'
  }
};

function getProjectPresentation(project) {
  const key = String(project?.name || '').toLowerCase();
  return PROJECT_DETAILS[key] || {
    title: String(project?.name || 'Untitled project').replaceAll('-', ' '),
    category: project?.language || 'GitHub project',
    description: project?.description || 'Explore the source repository for implementation details.',
    details: 'This repository is part of the public project index pulled directly from GitHub.',
    stack: [project?.language].filter(Boolean),
    note: project?.archived ? 'Archived repository' : 'GitHub repository'
  };
}

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
  } else if (algorithm === 'quick') {
    const partition = (low, high) => {
      const pivot = a[high];
      let boundary = low;
      for (let j = low; j < high; j += 1) {
        record([j, high], 'Compare ' + a[j] + ' with pivot ' + pivot + '.');
        if (a[j] <= pivot) {
          [a[boundary], a[j]] = [a[j], a[boundary]];
          record([boundary, j], 'Move a value smaller than the pivot to the left partition.');
          boundary += 1;
        }
      }
      [a[boundary], a[high]] = [a[high], a[boundary]];
      record([boundary], 'Pivot ' + pivot + ' is now in its final position.');
      return boundary;
    };
    const sort = (low, high) => {
      if (low >= high) return;
      const pivotIndex = partition(low, high);
      sort(low, pivotIndex - 1);
      sort(pivotIndex + 1, high);
    };
    sort(0, a.length - 1);
  } else if (algorithm === 'merge') {
    const sort = (left, right) => {
      if (left >= right) return;
      const middle = Math.floor((left + right) / 2);
      sort(left, middle);
      sort(middle + 1, right);
      const merged = [];
      let i = left;
      let j = middle + 1;
      while (i <= middle && j <= right) {
        record([i, j], 'Compare the front values of two sorted halves.');
        if (a[i] <= a[j]) merged.push(a[i++]);
        else merged.push(a[j++]);
      }
      while (i <= middle) merged.push(a[i++]);
      while (j <= right) merged.push(a[j++]);
      merged.forEach((value, offset) => { a[left + offset] = value; });
      record(Array.from({ length: right - left + 1 }, (_, offset) => left + offset), 'Merge the two sorted halves into this range.');
    };
    sort(0, a.length - 1);
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
  const order = [];
  const frames = [{ order: [], current: '', frontier: ['A'], note: 'Start at node A.' }];
  const pending = ['A'];
  while (pending.length) {
    const node = mode === 'bfs' ? pending.shift() : pending.pop();
    order.push(node);
    frames.push({ order: order.slice(), current: node, frontier: pending.slice(), note: mode === 'bfs' ? 'Visit this node, then explore its neighbours level by level.' : 'Visit this node, then go as deep as possible before backtracking.' });
    const neighbours = GRAPH[node] || [];
    const next = mode === 'dfs' ? neighbours.slice().reverse() : neighbours;
    next.forEach(n => {
      if (!seen.has(n)) {
        seen.add(n);
        pending.push(n);
      }
    });
  }
  frames.push({ order: order.slice(), current: '', frontier: [], note: 'Traversal complete. All reachable nodes were visited.' });
  return frames;
}

function createTreeTraversal(mode) {
  const tree = {
    8: [3, 10], 3: [1, 6], 10: [null, 14], 1: [null, null],
    6: [4, 7], 14: [13, null], 4: [null, null], 7: [null, null], 13: [null, null]
  };
  const order = [];
  const visit = node => {
    if (node === null || node === undefined) return;
    const children = tree[node] || [null, null];
    if (mode === 'preorder') order.push(node);
    visit(children[0]);
    if (mode === 'inorder') order.push(node);
    visit(children[1]);
    if (mode === 'postorder') order.push(node);
  };
  visit(8);
  return order.map((node, index) => ({ node: String(node), visited: order.slice(0, index + 1) }));
}

function calculateSubnet(input) {
  const match = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/.exec(input.trim());
  if (!match) return null;
  const [address, prefixText] = input.trim().split('/');
  const octets = address.split('.').map(Number);
  const prefix = Number(prefixText);
  if (octets.some(part => !Number.isInteger(part) || part < 0 || part > 255) || prefix < 0 || prefix > 32) return null;
  const ip = (((octets[0] << 24) >>> 0) + (octets[1] << 16) + (octets[2] << 8) + octets[3]) >>> 0;
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const network = (ip & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const toIp = value => [value >>> 24, (value >>> 16) & 255, (value >>> 8) & 255, value & 255].join('.');
  const usableHosts = prefix === 32 ? 1 : prefix === 31 ? 2 : Math.max(0, broadcast - network - 1);
  return { prefix, mask: toIp(mask), network: toIp(network), broadcast: toIp(broadcast), usableHosts, totalAddresses: Math.pow(2, 32 - prefix) };
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

function getRouteFromHash() {
  const route = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  return ['home', 'profile', 'projects', 'dsa', 'network', 'terminal', 'quest', 'contact'].includes(route) ? route : 'home';
}

function App() {
  const [github, setGithub] = useState(null);
  const [githubError, setGithubError] = useState(false);
  const [projectQuery, setProjectQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('All');
  const [projectSort, setProjectSort] = useState('recent');
  const [activeApp, setActiveApp] = useState(getRouteFromHash);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [clock, setClock] = useState(new Date());
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState(['ABHINAV.OS shell v1.0', 'Type help to explore the available commands.']);
  const [numbers, setNumbers] = useState([8, 3, 11, 5, 2, 9, 6, 4]);
  const [sortMode, setSortMode] = useState('bubble');
  const [activePlayground, setActivePlayground] = useState('sorting');
  const [sortStep, setSortStep] = useState(0);
  const [searchTarget, setSearchTarget] = useState('22');
  const [searchMode, setSearchMode] = useState('binary');
  const [searchStep, setSearchStep] = useState(0);
  const [structureInput, setStructureInput] = useState('42');
  const [stack, setStack] = useState([12, 24]);
  const [queue, setQueue] = useState([7, 14, 21]);
  const [linkedList, setLinkedList] = useState([10, 20, 30]);
  const [treeMode, setTreeMode] = useState('inorder');
  const [treeStep, setTreeStep] = useState(0);
  const [traversalMode, setTraversalMode] = useState('bfs');
  const [traversalStep, setTraversalStep] = useState(0);
  const [networkMode, setNetworkMode] = useState('tcp');
  const [networkStep, setNetworkStep] = useState(0);
  const [subnetInput, setSubnetInput] = useState('192.168.1.0/24');
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizChoice, setQuizChoice] = useState(null);
  const [quizDone, setQuizDone] = useState(false);

  useEffect(() => {
    const syncRoute = () => setActiveApp(getRouteFromHash());
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    if (!window.location.hash) window.history.replaceState(null, '', '#/home');
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  useEffect(() => {
    const tick = window.setInterval(() => setClock(new Date()), 30000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 8000);
    try {
      const saved = window.localStorage.getItem('portfolio-github-cache-v3');
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
        try { window.localStorage.setItem('portfolio-github-cache-v3', JSON.stringify(data)); } catch {}
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
  const featuredProjects = github?.featured?.length ? github.featured : projects.slice(0, 3);
  const liveProjects = projects.filter(project => Boolean(getProjectPresentation(project).live));
  const visibleProjects = projects
    .filter(project => {
      const info = getProjectPresentation(project);
      const query = projectQuery.trim().toLowerCase();
      const matchesQuery = !query || [info.title, info.description, info.category, project.language, ...(info.stack || [])].join(' ').toLowerCase().includes(query);
      const matchesFilter = projectFilter === 'All' || (projectFilter === 'Live apps' ? Boolean(info.live) : info.category.toLowerCase().includes(projectFilter.toLowerCase()));
      return matchesQuery && matchesFilter;
    })
    .sort((a, b) => projectSort === 'stars'
      ? (b.stargazers_count || 0) - (a.stargazers_count || 0)
      : new Date(b.pushed_at || b.updated_at || 0) - new Date(a.pushed_at || a.updated_at || 0));
  const sortFrames = useMemo(() => createSortFrames(numbers, sortMode), [numbers, sortMode]);
  const currentSort = sortFrames[Math.min(sortStep, sortFrames.length - 1)];
  const sortedSearchValues = [3, 7, 11, 14, 18, 22, 27, 31, 36, 42];
  const searchFrames = useMemo(() => createSearchFrames(sortedSearchValues, Number(searchTarget), searchMode), [searchTarget, searchMode]);
  const currentSearch = searchFrames[Math.min(searchStep, searchFrames.length - 1)];
  const traversalFrames = useMemo(() => createTraversal(traversalMode), [traversalMode]);
  const treeFrames = useMemo(() => createTreeTraversal(treeMode), [treeMode]);
  const currentTree = treeFrames[Math.min(treeStep, treeFrames.length - 1)];
  const currentTraversal = traversalFrames[Math.min(traversalStep, traversalFrames.length - 1)];
  const flow = NETWORK_FLOWS[networkMode];
  const currentNetwork = flow.steps[Math.min(networkStep, flow.steps.length - 1)];
  const subnetResult = useMemo(() => calculateSubnet(subnetInput), [subnetInput]);
  const currentQuiz = QUIZ[quizIndex];

  const openApp = id => {
    const next = ['home', 'profile', 'projects', 'dsa', 'network', 'terminal', 'quest', 'contact'].includes(id) ? id : 'home';
    if (getRouteFromHash() !== next) window.history.pushState(null, '', '#/' + next);
    setActiveApp(next);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  const listAction = action => {
    const value = Number(structureInput);
    if (action === 'head' && Number.isFinite(value)) setLinkedList(items => [value, ...items].slice(0, 8));
    if (action === 'tail' && Number.isFinite(value)) setLinkedList(items => [...items, value].slice(-8));
    if (action === 'remove-head') setLinkedList(items => items.slice(1));
    if (action === 'remove-tail') setLinkedList(items => items.slice(0, -1));
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
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-copy">
          <span className="micro-label"><Sparkles size={13}/> SOFTWARE ENGINEERING <i/> SYSTEMS <i/> CURIOSITY</span>
          <p className="landing-overline">HELLO, I'M ABHINAV KUMAR MISHRA</p>
          <h2>I build software that solves <span>real problems.</span></h2>
          <p className="landing-description">Software-focused developer exploring full-stack engineering, AI and computer systems. I learn by turning ideas into useful, working products.</p>
          <div className="welcome-actions">
            <button className="primary-action" onClick={() => openApp('projects')}>Explore my work <ArrowRight size={15}/></button>
            <button className="text-action" onClick={() => openApp('profile')}>Get to know me <ArrowUpRight size={15}/></button>
          </div>
          <div className="landing-meta"><span><i className="online-dot"/> OPEN TO INTERNSHIPS & COLLABORATION</span><span>BIHAR, INDIA</span></div>
        </div>
        <aside className="landing-visual" aria-label="Developer focus">
          <div className="hero-monogram">A<span>.</span></div>
          <span className="hero-visual-kicker">CURRENTLY BUILDING</span>
          <strong>Ideas into<br/>working software.</strong>
          <div className="hero-visual-tags"><span>FULL-STACK</span><span>AI</span><span>SYSTEMS</span></div>
          <div className="landing-visual-caption"><span className="online-dot"/> BUILD · LEARN · SHIP</div>
        </aside>
      </section>
      <section className="landing-metrics">
        <div><strong>{github?.stats?.repositories ?? FALLBACK_PROJECTS.length}</strong><span>Public projects</span></div>
        <div><strong>{github?.stats?.stars ?? 0}</strong><span>GitHub stars</span></div>
        <div><strong>{github?.stats?.followers ?? 0}</strong><span>Followers</span></div>
        <div><strong>{github?.stats?.languages ?? new Set(FALLBACK_PROJECTS.map(project => project.language).filter(Boolean)).size}</strong><span>Languages</span></div>
      </section>
      <section className="landing-section">
        <div className="section-title-row"><div><span className="eyebrow">EXPLORE THE PORTFOLIO</span><h3>Choose where to start</h3></div><span className="muted-note">Every section has its own page</span></div>
        <div className="landing-nav-grid">
          {[
            ['profile','About','My background, interests and toolbox',UserRound],
            ['projects','Projects','Real repositories and live applications',Layers3],
            ['dsa','DSA Arcade','Interactive algorithms and data structures',Binary],
            ['network','Network Lab','TCP, DNS, OSI and subnetting',Network],
            ['terminal','Terminal','Explore the portfolio command line',SquareTerminal],
            ['quest','Know Me Quiz','A quick interactive introduction',CircleHelp],
            ['contact','Contact','Internships, feedback and collaboration',Mail]
          ].map(([id,label,description,Icon]) => <button className="landing-nav-card" key={id} onClick={() => openApp(id)}><span className="landing-nav-icon"><Icon size={19}/></span><span><b>{label}</b><small>{description}</small></span><ArrowUpRight size={16}/></button>)}
        </div>
      </section>
      <section className="landing-bottom">
        <div><span className="eyebrow">CURRENT FOCUS</span><h3>Strong fundamentals. Useful software.</h3><p>Building full-stack applications while improving problem solving, APIs, networking and defensive security fundamentals.</p></div>
        <button className="primary-action" onClick={() => openApp('contact')}>Let's connect <ArrowRight size={15}/></button>
      </section>
      <div className="home-data-note"><span className={githubError ? 'data-indicator stale' : 'data-indicator'}/>{githubError ? 'GitHub is temporarily unavailable. Showing the built-in project fallback.' : github?.updatedAt ? 'GitHub data synced · ' + new Date(github.updatedAt).toLocaleString() : 'Loading live GitHub statistics…'}</div>
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
    <div className="app-content projects-app">
      <div className="app-hero">
        <div><span className="eyebrow">WORK / 002 · LIVE GITHUB INDEX</span><h2>Selected <em>projects.</em></h2><p>Real repositories from my GitHub account, with context on what each project actually does.</p></div>
        <a className="mini-icon-link" href={'https://github.com/' + USER + '?tab=repositories'} target="_blank" rel="noreferrer"><Github size={17}/><span>GitHub profile</span><ExternalLink size={13}/></a>
      </div>
      <div className="projects-summary">
        <div><strong>{projects.length}</strong><span>non-empty repositories</span></div>
        <div><strong>{liveProjects.length}</strong><span>live app previews</span></div>
        <div><strong>{github?.stats?.stars ?? '—'}</strong><span>repository stars</span></div>
        <div className="projects-sync"><span className={githubError ? 'data-indicator stale' : 'data-indicator'}/>{githubError ? 'Cached / fallback data' : 'GitHub API connected'}</div>
      </div>
      <section className="live-apps-section">
        <div className="live-apps-heading"><div><span className="eyebrow">DEPLOYED EXPERIENCES</span><h3>Open a live app</h3><p>These projects have a published preview link. Launch them directly.</p></div><span className="live-app-count"><i/> {liveProjects.length} LIVE PREVIEWS</span></div>
        <div className="live-app-grid">
          {liveProjects.map((project, index) => {
            const info = getProjectPresentation(project);
            return <article className="live-app-card" key={project.id || project.name}>
              <div className="live-app-card-top"><span className="live-app-index">{String(index + 1).padStart(2, '0')}</span><span className="live-app-state"><i/> LIVE</span></div>
              <h4>{info.title}</h4><p>{info.description}</p>
              <div className="live-app-stack">{(info.stack || []).slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div>
              <a className="live-app-launch" href={info.live} target="_blank" rel="noreferrer">{info.liveLabel || 'Launch live app'} <ArrowUpRight size={15}/></a>
              <a className="live-app-source" href={project.html_url} target="_blank" rel="noreferrer">View source code <Github size={12}/></a>
            </article>;
          })}
        </div>
      </section>
      <div className="project-controls">
        <label className="project-search"><Search size={16}/><input type="search" value={projectQuery} onChange={e => setProjectQuery(e.target.value)} placeholder="Search projects, technologies…" aria-label="Search projects"/></label>
        <label className="project-sort"><span>SORT</span><select value={projectSort} onChange={e => setProjectSort(e.target.value)} aria-label="Sort projects"><option value="recent">Recently updated</option><option value="stars">Most stars</option></select></label>
      </div>
      <div className="project-filter-row" aria-label="Filter projects">
        {['All', 'Live apps', 'AI', 'Security', 'Education', 'Product', 'Frontend'].map(filter => <button key={filter} className={projectFilter === filter ? 'filter-active' : ''} onClick={() => setProjectFilter(filter)}>{filter}</button>)}
      </div>
      <div className="project-results-head"><span>SHOWING {visibleProjects.length} OF {projects.length} REPOSITORIES</span><span>UPDATED FROM GITHUB</span></div>
      <div className="repo-grid project-catalogue">
        {visibleProjects.map((project, index) => {
          const info = getProjectPresentation(project);
          const updated = project.pushed_at || project.updated_at;
          return <article className="repo-card project-card-pro" key={project.id || project.name}>
            <div className="repo-topline"><span className="repo-file"><Code2 size={15}/></span><span className="repo-number">REPOSITORY_{String(index + 1).padStart(2, '0')}</span><span className="project-category">{info.category}</span></div>
            <h3>{info.title}</h3>
            <p>{info.description}</p>
            <div className="project-detail-copy">{info.details}</div>
            <div className="project-stack">{(info.stack || []).slice(0, 5).map(tech => <span key={tech}>{tech}</span>)}</div>
            <div className="repo-meta"><span><i className="language-dot"/> {project.language || info.stack?.[0] || 'Code'}</span><span><Star size={12}/> {project.stargazers_count || 0}</span>{updated && <span><Clock3 size={12}/> {new Date(updated).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>}</div>
            <div className="project-card-actions">
              {info.live
                ? <a className="project-live-link" href={info.live} target="_blank" rel="noreferrer">{info.liveLabel || 'Open live app'} <ExternalLink size={13}/></a>
                : <span className="project-no-live">{info.note?.toLowerCase().includes('api component') ? 'API / backend only' : 'No public preview yet'}</span>}
              <a className="project-source-link" href={project.html_url} target="_blank" rel="noreferrer">Source code <ArrowUpRight size={13}/></a>
            </div>
            <span className="project-note">{info.note}</span>
          </article>;
        })}
        {!visibleProjects.length && <div className="project-empty"><Search size={23}/><b>No matching repositories</b><span>Try another search or choose a different category.</span><button onClick={() => { setProjectQuery(''); setProjectFilter('All'); }}>Clear filters</button></div>}
      </div>
      <div className="repo-footer"><span><Radio size={15}/> {github?.updatedAt ? 'GitHub sync · ' + new Date(github.updatedAt).toLocaleString() : 'Live GitHub data loads when the server responds.'}</span><a href={'https://github.com/' + USER} target="_blank" rel="noreferrer">github.com/{USER} <ArrowUpRight size={13}/></a></div>
      <p className="project-disclosure">Project descriptions combine repository metadata with details from their README files and source structure. Prototype, demo and validation limitations are called out explicitly.</p>
    </div>
  );

    const renderDsa = () => (
    <div className="app-content">
      <div className="app-hero"><div><span className="eyebrow">LEARNING ARCADE / 003</span><h2>Make algorithms <em>click.</em></h2><p>Play with the data. Step through the logic. See the complexity.</p></div><span className="arcade-badge"><Zap size={15}/> INTERACTIVE</span></div>
      <div className="playground-nav" aria-label="Choose a DSA playground">{[{id:"sorting",label:"Sorting",hint:"5 algorithms"},{id:"searching",label:"Searching",hint:"2 methods"},{id:"structures",label:"Stack & Queue",hint:"LIFO / FIFO"},{id:"linked-list",label:"Linked List",hint:"Node operations"},{id:"trees",label:"Trees",hint:"3 traversals"},{id:"graphs",label:"Graphs",hint:"BFS / DFS"}].map(item => <button key={item.id} className={activePlayground===item.id?"playground-active":""} onClick={()=>setActivePlayground(item.id)}><b>{item.label}</b><small>{item.hint}</small></button>)}</div>
      <div className="playground-content">
        {activePlayground === "sorting" && <section className="lab-module sort-module">
          <div className="module-top"><div className="module-icon purple"><Binary size={17}/></div><div><span className="card-kicker">ARRAYS · SORTING</span><h3>Sorting visualizer</h3></div><span className="module-number">01</span></div>
          <p className="module-description">Watch how an algorithm compares and moves values into ascending order.</p>
          <div className="control-row"><label htmlFor="sort-mode">Algorithm</label><select id="sort-mode" value={sortMode} onChange={e => changeSort(e.target.value)}><option value="bubble">Bubble sort</option><option value="selection">Selection sort</option><option value="insertion">Insertion sort</option><option value="quick">Quick sort</option><option value="merge">Merge sort</option></select></div>
          <div className="sort-bars">{currentSort.values.map((n, index) => <div className="sort-bar-wrap" key={index}><div className={'sort-bar ' + (currentSort.active.includes(index) ? 'bar-active' : '') + (sortStep === sortFrames.length - 1 ? ' bar-complete' : '')} style={{ height: (n * 5 + 18) + 'px' }}/><small>{n}</small></div>)}</div>
          <div className="step-caption"><span>STEP {sortStep} / {sortFrames.length - 1}</span>{currentSort.note}</div>
          <div className="module-actions"><button className="module-primary" onClick={() => setSortStep(step => Math.min(step + 1, sortFrames.length - 1))} disabled={sortStep >= sortFrames.length - 1}><Play size={13}/> Next step</button><button onClick={() => setSortStep(sortFrames.length - 1)}>Run all</button><button onClick={resetSort}><RotateCcw size={13}/> Reset</button><button onClick={shuffleSort}>Shuffle</button></div>
          <div className="complexity-row"><span>Bubble <b>O(n²)</b></span><span>Selection <b>O(n²)</b></span><span>Insertion <b>O(n²)</b></span><span>Quick avg <b>O(n log n)</b></span><span>Merge <b>O(n log n)</b></span></div>
        </section>}

        {activePlayground === "searching" && <section className="lab-module search-module">
          <div className="module-top"><div className="module-icon blue"><Search size={17}/></div><div><span className="card-kicker">ARRAYS · SEARCHING</span><h3>Find the target</h3></div><span className="module-number">02</span></div>
          <p className="module-description">Compare linear search with binary search on a sorted array.</p>
          <div className="control-row"><label htmlFor="search-mode">Method</label><select id="search-mode" value={searchMode} onChange={e => changeSearch(e.target.value)}><option value="binary">Binary search</option><option value="linear">Linear search</option></select></div>
          <div className="target-row"><label htmlFor="target-number">Target value</label><input id="target-number" type="number" value={searchTarget} onChange={e => { setSearchTarget(e.target.value); setSearchStep(0); }}/></div>
          <div className="search-cells">{sortedSearchValues.map((n, index) => <div key={n} className={'search-cell ' + (currentSearch.active.includes(index) ? (currentSearch.found ? 'cell-found' : 'cell-active') : '')}>{n}</div>)}</div>
          <div className="step-caption"><span>STEP {searchStep} / {searchFrames.length - 1}</span>{currentSearch.note}</div>
          <div className="module-actions"><button className="module-primary" onClick={() => setSearchStep(step => Math.min(step + 1, searchFrames.length - 1))} disabled={searchStep >= searchFrames.length - 1}><Play size={13}/> Next check</button><button onClick={() => setSearchStep(0)}><RotateCcw size={13}/> Reset</button></div>
          <div className="complexity-row"><span>Linear <b>O(n)</b></span><span>Binary <b>O(log n)</b></span><span>Sorted input required for binary</span></div>
        </section>}

        {activePlayground === "structures" && <section className="lab-module structures-module">
          <div className="module-top"><div className="module-icon green"><Layers3 size={17}/></div><div><span className="card-kicker">LINEAR DATA STRUCTURES</span><h3>Stack & queue playground</h3></div><span className="module-number">03</span></div>
          <p className="module-description">Try LIFO and FIFO operations. Add a value, then remove one.</p>
          <div className="structure-input"><input aria-label="Value to add" type="number" value={structureInput} onChange={e => setStructureInput(e.target.value)}/><span>VALUE</span></div>
          <div className="structure-columns">
            <div className="structure-box"><div className="structure-title"><b>STACK</b><span>LIFO</span></div><div className="stack-visual">{stack.length ? stack.map((n, i) => <div key={i} className={'stack-item ' + (i === stack.length - 1 ? 'stack-top' : '')}>{n}{i === stack.length - 1 && <small>TOP</small>}</div>) : <span className="empty-state">Empty stack</span>}</div><div className="structure-buttons"><button onClick={() => structureAction('push')}>Push</button><button onClick={() => structureAction('pop')} disabled={!stack.length}>Pop</button></div></div>
            <div className="structure-box"><div className="structure-title"><b>QUEUE</b><span>FIFO</span></div><div className="queue-visual">{queue.length ? queue.map((n, i) => <div key={i} className={'queue-item ' + (i === 0 ? 'queue-front' : '')}>{n}</div>) : <span className="empty-state">Empty queue</span>}</div><div className="structure-buttons"><button onClick={() => structureAction('enqueue')}>Enqueue</button><button onClick={() => structureAction('dequeue')} disabled={!queue.length}>Dequeue</button></div></div>
          </div>
        </section>}

        {activePlayground === "graphs" && <section className="lab-module graph-module">
          <div className="module-top"><div className="module-icon orange"><Network size={17}/></div><div><span className="card-kicker">GRAPHS · TRAVERSAL</span><h3>Explore a graph</h3></div><span className="module-number">04</span></div>
          <p className="module-description">See how BFS uses a queue and DFS uses a stack to visit connected nodes.</p>
          <div className="control-row"><label htmlFor="traversal-mode">Traversal</label><select id="traversal-mode" value={traversalMode} onChange={e => changeTraversal(e.target.value)}><option value="bfs">Breadth-first search (BFS)</option><option value="dfs">Depth-first search (DFS)</option></select></div>
          <div className="graph-visual">{[['A', 50, 13], ['B', 24, 42], ['C', 76, 42], ['D', 9, 82], ['E', 39, 82], ['F', 86, 82]].map(([node, x, y]) => <div key={node} className={'graph-node ' + (currentTraversal.current === node ? 'node-current' : currentTraversal.order.includes(node) ? 'node-visited' : '')} style={{ left: x + '%', top: y + '%' }}>{node}</div>)}<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M50 16 L25 44 M50 16 L75 44 M25 44 L10 84 M25 44 L40 84 M75 44 L86 84 M40 84 L86 84"/></svg></div>
          <div className="graph-learning-grid">
            <article><span className="card-kicker">METHOD 01 · ADJACENCY LIST</span><h4>Who is connected?</h4><p>Each node stores the neighbours it can directly reach.</p><pre>{"A: B, C\nB: A, D, E\nC: A, F\nD: B\nE: B, F\nF: C, E"}</pre></article>
            <article><span className="card-kicker">METHOD 02 · ADJACENCY MATRIX</span><h4>Connection table</h4><p>1 means an edge exists; 0 means no direct edge.</p><div className="matrix-wrap"><table className="adjacency-matrix"><thead><tr><th></th>{['A','B','C','D','E','F'].map(n=><th key={n}>{n}</th>)}</tr></thead><tbody>{[['A',0,1,1,0,0,0],['B',1,0,0,1,1,0],['C',1,0,0,0,0,1],['D',0,1,0,0,0,0],['E',0,1,0,0,0,1],['F',0,0,1,0,1,0]].map(row=><tr key={row[0]}>{row.map((v,i)=>i===0?<th key={i}>{v}</th>:<td key={i} className={v?"matrix-one":""}>{v}</td>)}</tr>)}</tbody></table></div></article>
            <article><span className="card-kicker">METHOD 03 · REAL-LIFE MODEL</span><h4>Think of city roads</h4><p>Nodes are places and edges are direct roads. BFS checks nearby places first; DFS follows one route deeply, then backtracks.</p><div className="graph-analogy"><b>Starting point: A</b><span>Nearby: B, C</span><span>Next reachable: D, E, F</span></div></article>
            <article><span className="card-kicker">METHOD 04 · DATA STRUCTURE TRACE</span><h4>{traversalMode === 'bfs' ? 'Queue (FIFO)' : 'Stack (LIFO)'}</h4><p>{traversalMode === 'bfs' ? 'BFS removes the oldest discovered node first.' : 'DFS explores the most recently discovered path first.'}</p><div className="trace-pills"><span>Visited: {currentTraversal.order.join(' → ') || '—'}</span><span>{traversalMode === 'bfs' ? 'Queue' : 'Stack'}: {currentTraversal.frontier.join(' · ') || 'empty'}</span></div></article>
          </div>
          <div className="traversal-order"><span>VISIT ORDER</span><b>{currentTraversal.order.length ? currentTraversal.order.join(' → ') : '—'}</b><small>Frontier: {currentTraversal.frontier.join(', ') || 'empty'}</small></div>
          <div className="step-caption"><span>STEP {traversalStep} / {traversalFrames.length - 1}</span>{currentTraversal.note}</div>
          <div className="module-actions"><button className="module-primary" onClick={() => setTraversalStep(step => Math.min(step + 1, traversalFrames.length - 1))} disabled={traversalStep >= traversalFrames.length - 1}><Play size={13}/> Next visit</button><button onClick={() => setTraversalStep(0)}><RotateCcw size={13}/> Reset</button></div>
          <div className="complexity-row"><span>BFS <b>O(V + E)</b></span><span>DFS <b>O(V + E)</b></span></div>
        </section>}

        {activePlayground === "linked-list" && <section className="lab-module linked-list-module">
          <div className="module-top"><div className="module-icon cyan"><Layers3 size={17}/></div><div><span className="card-kicker">LINKED LIST</span><h3>Build a linked list</h3></div><span className="module-number">05</span></div>
          <p className="module-description">Add or remove nodes at either end. Each node stores data and points to the next node.</p>
          <div className="structure-input"><input aria-label="Linked list value" type="number" value={structureInput} onChange={e => setStructureInput(e.target.value)}/><span>NODE VALUE</span></div>
          <div className="linked-list-visual">{linkedList.length ? linkedList.map((value, index) => <div className="linked-node-wrap" key={index}><div className="linked-node"><b>{value}</b><small>{index === 0 ? 'HEAD' : 'NODE'}</small></div>{index < linkedList.length - 1 && <ArrowRight size={14}/>}</div>) : <span className="empty-state">Head → null (empty list)</span>}</div>
          <div className="module-actions"><button className="module-primary" onClick={() => listAction('head')}>Insert head</button><button onClick={() => listAction('tail')}>Insert tail</button><button onClick={() => listAction('remove-head')} disabled={!linkedList.length}>Delete head</button><button onClick={() => listAction('remove-tail')} disabled={!linkedList.length}>Delete tail</button></div>
          <div className="complexity-row"><span>Head insert <b>O(1)</b></span><span>Tail traversal <b>O(n)</b></span><span>Extra pointer per node</span></div>
        </section>}

        {activePlayground === "trees" && <section className="lab-module tree-module">
          <div className="module-top"><div className="module-icon orange"><Binary size={17}/></div><div><span className="card-kicker">TREES · BST</span><h3>Tree traversal</h3></div><span className="module-number">06</span></div>
          <p className="module-description">Visit the same Binary Search Tree in three different orders.</p>
          <div className="control-row"><label htmlFor="tree-mode">Traversal</label><select id="tree-mode" value={treeMode} onChange={e => { setTreeMode(e.target.value); setTreeStep(0); }}><option value="inorder">Inorder (LNR)</option><option value="preorder">Preorder (NLR)</option><option value="postorder">Postorder (LRN)</option></select></div>
          <div className="tree-visual">
            <div className="tree-level"><span className={currentTree.visited.includes('8') ? 'tree-node visited' : 'tree-node'}>8</span></div>
            <div className="tree-level"><span className={currentTree.visited.includes('3') ? 'tree-node visited' : 'tree-node'}>3</span><span className={currentTree.visited.includes('10') ? 'tree-node visited' : 'tree-node'}>10</span></div>
            <div className="tree-level"><span className={currentTree.visited.includes('1') ? 'tree-node visited' : 'tree-node'}>1</span><span className={currentTree.visited.includes('6') ? 'tree-node visited' : 'tree-node'}>6</span><span className={currentTree.visited.includes('14') ? 'tree-node visited' : 'tree-node'}>14</span></div>
            <div className="tree-level"><span className={currentTree.visited.includes('4') ? 'tree-node visited' : 'tree-node'}>4</span><span className={currentTree.visited.includes('7') ? 'tree-node visited' : 'tree-node'}>7</span><span className={currentTree.visited.includes('13') ? 'tree-node visited' : 'tree-node'}>13</span></div>
          </div>
          <div className="traversal-order"><span>VISIT ORDER</span><b>{currentTree.visited.join(' → ') || '—'}</b></div>
          <div className="module-actions"><button className="module-primary" onClick={() => setTreeStep(step => Math.min(step + 1, treeFrames.length - 1))} disabled={treeStep >= treeFrames.length - 1}><Play size={13}/> Next node</button><button onClick={() => setTreeStep(0)}><RotateCcw size={13}/> Reset</button></div>
          <div className="complexity-row"><span>Traversal <b>O(n)</b></span><span>BST search avg <b>O(log n)</b></span></div>
        </section>}
      </div>
      <div className="concept-strip"><div><BookOpen size={16}/><b>Learn one topic at a time</b></div><p>Choose a playground above. Each topic has its own explanation, controls, worked example and complexity notes. Switch topics whenever you are ready.</p></div>
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
      <div className="subnet-panel panel-card"><div className="card-heading"><div><span className="card-kicker">IP ADDRESSING · SUBNETTING</span><h3>IPv4 subnet calculator</h3></div><span className="live-tag"><i/> LOCAL</span></div><p>Change the address and CIDR prefix to see how a network is divided.</p><div className="subnet-input-row"><label htmlFor="subnet-cidr">IP / CIDR</label><input id="subnet-cidr" value={subnetInput} onChange={e => setSubnetInput(e.target.value)} spellCheck="false"/></div>{subnetResult ? <div className="subnet-results"><div><small>NETWORK ADDRESS</small><b>{subnetResult.network}</b></div><div><small>SUBNET MASK</small><b>{subnetResult.mask}</b></div><div><small>BROADCAST</small><b>{subnetResult.broadcast}</b></div><div><small>USABLE HOSTS</small><b>{subnetResult.usableHosts.toLocaleString('en-IN')}</b></div><div><small>CIDR PREFIX</small><b>/{subnetResult.prefix}</b></div><div><small>TOTAL ADDRESSES</small><b>{subnetResult.totalAddresses.toLocaleString('en-IN')}</b></div></div> : <div className="subnet-error">Enter a valid IPv4 address and prefix, for example 192.168.1.0/24.</div>}</div>
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
      <header className={"os-menubar site-header " + (mobileMenu ? "menu-open" : "")}>
        <button className="os-brand" onClick={() => openApp('home')}><span className="brand-symbol">A<span>.</span></span><b>ABHINAV<span>.DEV</span></b></button>
        <nav className="site-nav" aria-label="Main navigation">
          { [['home','Home'],['profile','About'],['projects','Projects'],['dsa','DSA Lab'],['network','Network'],['contact','Contact']].map(([id,label]) => <button key={id} className={activeApp === id ? 'nav-active' : ''} onClick={() => openApp(id)}>{label}</button>) }
        </nav>
        <div className="system-tray"><span className="tray-status"><i/> AVAILABLE</span><button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Open navigation">{mobileMenu ? <X size={17}/> : <Menu size={17}/>}</button></div>
      </header>

      <main className="os-desktop">
        <div className="workspace">
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
        <footer className="os-taskbar"><div><span className="taskbar-mark">A.</span><span>Abhinav Kumar Mishra</span></div><span className="taskbar-center">SOFTWARE · SYSTEMS · CURIOSITY</span><div><span>© {new Date().getFullYear()}</span></div></footer>
      </main>
    </div>
  );
}

function UsersIcon() {
  return <span className="users-glyph">↗</span>;
}

export default App;
