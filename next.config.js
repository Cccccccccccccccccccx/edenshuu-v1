/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // appDir est maintenant stable, pas besoin de le spécifier dans experimental
  },
  images: {
    domains: ['localhost', 'edenshuu.com', 'lh3.googleusercontent.com'],
  },
  eslint: {
    dirs: ['app', 'components', 'lib', 'src'],
  },
  // Configuration des en-têtes de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
  // Amélioration de la sécurité des cookies
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ]
  },
  // Désactivation du cache pour les pages d'authentification
  generateEtags: false,
  poweredByHeader: false,
  compress: true,
  // Configuration pour le mode PWA (optionnel, à décommenter si nécessaire)
  // pwa: {
  //   dest: 'public',
  //   disable: process.env.NODE_ENV === 'development',
  // },
}

// Configuration pour les variables d'environnement
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  })
  module.exports = withBundleAnalyzer(nextConfig)
} else {
  module.exports = nextConfig
}
