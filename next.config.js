/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  modularizeImports: {
    "@phosphor-icons/react": {
      transform: "@phosphor-icons/react/dist/icons/{{member}}",
    },
  },
  env: {
    API_URL: process.env.API_URL,
  },
}

export default nextConfig;