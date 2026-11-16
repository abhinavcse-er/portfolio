import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
const GITHUB_USER = process.env.GITHUB_USERNAME || 'abhinavcse-er';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
app.use(cors());
app.use(express.json());

let cache = { at: 0, data: null };
const CACHE_MS = 5 * 60 * 1000;

async function github(path) {
  const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
  return response.json();
}

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'portfolio-api' }));

app.get('/api/github', async (_req, res) => {
  try {
    if (cache.data && Date.now() - cache.at < CACHE_MS) return res.json({ ...cache.data, cached: true });
    const [profile, repos] = await Promise.all([
      github(`/users/${GITHUB_USER}`),
      github(`/users/${GITHUB_USER}/repos?sort=updated&per_page=100&type=owner`)
    ]);
    const publicRepos = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
    const featuredNames = ['neurox-ai', 'phishing-backend', 'Url-based-phishing-detection-system', 'digiedu-hub', 'sugarcane-digital-khata'];
    const featured = featuredNames.map(name => publicRepos.find(repo => repo.name.toLowerCase() === name)).filter(Boolean);
    const data = {
      profile: {
        login: profile.login, name: profile.name, bio: profile.bio,
        avatar: profile.avatar_url, followers: profile.followers,
        publicRepos: profile.public_repos, htmlUrl: profile.html_url
      },
      repos: featured.length ? featured : publicRepos.slice(0, 6),
      stats: {
        repositories: publicRepos.length,
        stars: publicRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        followers: profile.followers
      },
      updatedAt: new Date().toISOString()
    };
    cache = { at: Date.now(), data };
    res.json(data);
  } catch (error) {
    res.status(502).json({ error: 'Unable to load GitHub data right now.', detail: error.message });
  }
});

app.use(express.static('dist'));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(process.cwd() + '/dist/index.html');
});
app.listen(PORT, () => console.log(`Portfolio API running on :${PORT}`));