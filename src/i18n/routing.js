import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'bn', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});