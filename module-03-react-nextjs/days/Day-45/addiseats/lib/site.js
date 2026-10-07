const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  'http://localhost:3000'

export const siteUrl = new URL(
  configuredSiteUrl.startsWith('http')
    ? configuredSiteUrl
    : `https://${configuredSiteUrl}`,
)

export function absoluteUrl(path) {
  return new URL(path, siteUrl).toString()
}

export function createOpenGraphMetadata(title, description, path = '/') {
  return {
    title,
    description,
    url: absoluteUrl(path),
    images: [{
      url: absoluteUrl('/addiseats-food.jpg'),
      width: 1280,
      height: 720,
      alt: 'Addis Eats Ethiopian food delivery',
    }],
  }
}
