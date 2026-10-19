/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
        serverExternalPackages: ['@prisma/client', 'prisma', 'pg'],
      },
    },
  },
};

export default nextConfig;
