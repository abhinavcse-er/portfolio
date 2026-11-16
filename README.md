# Abhinav Kumar Mishra — Developer Portfolio

A dark, cinematic portfolio built with React, Vite, Express and the GitHub REST API.

## Features
- Responsive portfolio with a developer-workspace visual direction
- Express API that fetches live public GitHub profile and repository data
- Five-minute in-memory API cache to reduce GitHub rate-limit pressure
- Featured repositories, profile stats and external GitHub links
- Interactive DSA sorting visualizer
- TCP/IP request-flow animation
- Contact links for email, LinkedIn and GitHub

## Run locally
```bash
npm install
npm run dev
```
Vite runs the frontend and proxies `/api` requests to Express on port 5000.

## Production
```bash
npm run build
npm start
```
Set `GITHUB_USERNAME` if deploying under another account. An optional `GITHUB_TOKEN` can be added as a server-side environment variable to increase API rate limits. Never expose the token in frontend code.

## Deploy
Deploy as a Node.js web service with build command `npm install && npm run build` and start command `npm start`. Set `GITHUB_USERNAME=abhinavcse-er`.
