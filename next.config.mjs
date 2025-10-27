/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
import withPWAInit from 'next-pwa';
// Initialize PWA
const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});
const nextConfig = {  images: {
    remotePatterns: [{
        protocol:'https',
        hostname:"*"
    }],
  },};
const withNextIntl = createNextIntlPlugin();


// Wrap with both plugins
export default withNextIntl(withPWA(nextConfig));
