import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;
const GITHUB_USER = process.env.GITHUB_USERNAME || 'abhinavcse-er';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));

const CACHE_MS = 10 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 7000;
let cache = { at: 0, data: null };
let refreshPromise = null;

async function github(path) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'abhinav-portfolio'
  };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;

  const response = await fetch(`https://api.github.com${path}`, {
    headers,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
  });
  if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
  return response.json();
}

async function refreshGithubData() {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const [profile, repos] = await Promise.all([
      github('/users/' + encodeURIComponent(GITHUB_USER)),
      github('/users/' + encodeURIComponent(GITHUB_USER) + '/repos?sort=updated&per_page=100&type=owner')
    ]);

    // Forks, this portfolio itself and empty placeholders are not presented as projects.
    const projectRepos = repos
      .filter(repo => !repo.fork && repo.name.toLowerCase() !== 'portfolio' && Number(repo.size) > 0)
      .sort((a, b) => new Date(b.pushed_at || b.updated_at || 0) - new Date(a.pushed_at || a.updated_at || 0));

    const featuredNames = [
      'antigravity-projects',
      'neurox-ai',
      'phishing-backend',
      'Url-based-phishing-detection-system',
      'RideYou',
      'digiedu-hub',
      'itzfizz-scroll-hero'
    ];
    const byName = new Map(projectRepos.map(repo => [repo.name.toLowerCase(), repo]));
    const featured = featuredNames.map(name => byName.get(name.toLowerCase())).filter(Boolean);

    const toProject = repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      language: repo.language,
      topics: Array.isArray(repo.topics) ? repo.topics : [],
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      open_issues_count: repo.open_issues_count || 0,
      size: repo.size || 0,
      html_url: repo.html_url,
      homepage: repo.homepage || null,
      default_branch: repo.default_branch,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      archived: Boolean(repo.archived)
    });

    const projects = projectRepos.map(toProject);
    const featuredProjects = featured.map(toProject);
    const languages = {};
    projects.forEach(repo => {
      if (repo.language) languages[repo.language] = (languages[repo.language] || 0) + 1;
    });

    const data = {
      profile: {
        login: profile.login,
        name: profile.name,
        bio: profile.bio,
        avatar: profile.avatar_url,
        followers: profile.followers,
        publicRepos: profile.public_repos,
        htmlUrl: profile.html_url
      },
      repos: projects.slice(0, 50),
      featured: featuredProjects,
      languages,
      stats: {
        repositories: projects.length,
        stars: projects.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        followers: profile.followers,
        languages: Object.keys(languages).length
      },
      updatedAt: new Date().toISOString()
    };

    cache = { at: Date.now(), data };
    return data;
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}
app.get('/api/health', (_req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ ok: true, service: 'portfolio-api' });
});

app.get('/api/github', async (_req, res) => {
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');

  if (cache.data && Date.now() - cache.at < CACHE_MS) {
    return res.json({ ...cache.data, cached: true });
  }

  try {
    const data = await refreshGithubData();
    return res.json(data);
  } catch (error) {
    // Keep the portfolio useful if GitHub is temporarily slow or rate-limited.
    if (cache.data) {
      return res.json({ ...cache.data, cached: true, stale: true });
    }
    return res.status(200).json({
      profile: { login: GITHUB_USER, followers: 0, publicRepos: 0 },
      repos: [],
      stats: { repositories: 0, stars: 0, followers: 0 },
      unavailable: true
    });
  }
});

app.use(express.static('dist', {
  maxAge: '1y',
  immutable: true,
  setHeaders(res, filePath) {
    if (filePath.endsWith('index.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.set('Cache-Control', 'no-cache');
  res.sendFile(process.cwd() + '/dist/index.html');
});

app.listen(PORT, () => console.log(`Portfolio API running on :${PORT}`));
