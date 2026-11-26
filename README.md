# Abhinav OS — Interactive Developer Portfolio

A personal portfolio designed as a small desktop-style operating system. Visitors can launch apps, explore projects, play with DSA concepts and simulate network protocols.

## Experience

- **Personal OS desktop:** app dock, window chrome, status tray and responsive mobile navigation.
- **Profile app:** background, learning focus and technology toolbox.
- **Project explorer:** live public GitHub repository data through the Express API, with a fallback project index.
- **DSA Arcade:** step-by-step Bubble, Selection and Insertion Sort; Linear and Binary Search; Stack and Queue operations; BFS and DFS traversal.
- **Network Lab:** interactive TCP three-way handshake, DNS resolution and OSI encapsulation walkthroughs, plus TCP/UDP, IP, routing and HTTP/HTTPS explainers.
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
