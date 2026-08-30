/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['knex', 'mysql2', 'bcryptjs'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'knex': 'commonjs knex',
        'mysql2': 'commonjs mysql2',
        'better-sqlite3': 'commonjs better-sqlite3',
        'tedious': 'commonjs tedious',
        'pg': 'commonjs pg',
        'pg-query-stream': 'commonjs pg-query-stream',
        'oracledb': 'commonjs oracledb',
        'mariadb': 'commonjs mariadb',
        'sqlite3': 'commonjs sqlite3',
      });
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
};

module.exports = nextConfig;
