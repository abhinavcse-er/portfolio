# Abhinav OS — Interactive Developer Portfolio

A personal portfolio designed as a small desktop-style operating system. Visitors can launch apps, explore projects, play with DSA concepts and simulate network protocols.

## Experience

- **Personal OS desktop:** app dock, window chrome, status tray and responsive mobile navigation.
- **Profile app:** developer background, learning focus and technology toolbox, with the live GitHub avatar when available.
- **Project explorer:** a searchable and filterable index of all non-empty, non-fork public repositories (excluding this portfolio) pulled through the Express API. Cards include actual language, star count, last-pushed date, repository links and project-specific context.
- **DSA Arcade:** step-by-step Bubble, Selection, Insertion, Quick and Merge Sort; Linear and Binary Search; Stack, Queue and Linked List operations; BFS and DFS traversal; Binary Search Tree traversals (inorder, preorder and postorder).
- **Network Lab:** interactive TCP three-way handshake, DNS resolution and OSI encapsulation walkthroughs, plus TCP/UDP, IP routing, an IPv4 CIDR subnet calculator and HTTP/HTTPS explainers.
- **Terminal:** safe in-browser command demo (help, about, projects, skills, dsa, network, contact, clear).
- **Know Me Quiz:** a small game that introduces the developer through questions.
- **Contact center:** email, LinkedIn and GitHub links.

## Tech stack

React 18, Vite, Lucide React, Express and the GitHub REST API. No additional frontend dependency is required for the OS interface.

## Run locally

~~~bash
npm install
npm run dev
~~~

The Vite client runs on port 5173 and proxies /api requests to the Express server on port 5000.

## Production

~~~bash
npm install --include=dev
npm run build
npm start
~~~

The Express server serves the generated dist directory and exposes:
- GET /api/health — service health check
- GET /api/github — cached public GitHub profile and repository data

## Render deployment

The included render.yaml configures a Node web service that builds with npm install --include=dev && npm run build and starts with npm start. It deploys commits from main automatically. Set GITHUB_USERNAME=abhinavcse-er. An optional GITHUB_TOKEN can be configured as a server-side secret to improve GitHub API rate limits; never put it in frontend code.

## Notes

- The DSA and networking labs are educational, client-side simulations. They do not execute arbitrary commands or send real network packets.
- GitHub statistics and repository cards use the backend API when available; a small local fallback keeps the project explorer useful during API outages.
- Contact information and external profile links are defined in src/App.jsx.



## Featured projects represented in the portfolio

- **MEHFIL** (antigravity-projects/mehfil): Node.js, Express, Socket.IO and SQLite-backed real-time music lounge with synchronized radio, listener presence, requests and community.
- **NeuroX AI** (neurox-ai): Firebase-authenticated AI workspace with a Node.js/Express backend, streamed responses and multi-mode assistance. Live frontend: https://neuroaii.netlify.app/
- **PhishGuard** (Url-based-phishing-detection-system): explainable URL-risk heuristics and a research ML pipeline. Its README documents a failed external-validation release gate; experimental ML inference is not presented as production-ready.
- **Phishing Classifier API** (phishing-backend): Python URL-analysis API and trained classifier.
- **RideYou** (RideYou): Bihar-focused booking prototype. The GitHub Pages demo stores test bookings in browser local storage and is not a production multi-user booking service.
- **DigiEdu Hub** (digiedu-hub): multi-page e-learning resource hub for diploma students.
- **ITZFIZZ Scroll Hero** (itzfizz-scroll-hero): responsive GSAP / ScrollTrigger motion experiment.

Empty repositories and forks are intentionally excluded from the public project catalogue. Project-specific descriptions are maintained in src/App.jsx; live repository metadata is fetched from GitHub at runtime.
