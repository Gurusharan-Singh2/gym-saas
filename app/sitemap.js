export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const routes = [
    '',
    '/about',
    '/trainers',
    '/pricing',
    '/schedule',
    '/workouts',
    '/gallery',
    '/blog',
    '/contact',
    '/login',
    '/signup',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
