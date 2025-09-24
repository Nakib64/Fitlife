/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig = {
    images: {
    domains: ["i.ibb.co.com","i.ibb.co",], 
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

