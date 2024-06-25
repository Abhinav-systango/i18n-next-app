//middleware.ts
import createMiddleware from 'next-intl/middleware';

const middleware = createMiddleware({
  locales: ['en', 'de', 'es'],
  defaultLocale: 'en',
  
  });

export default middleware;

export const config = {
  matcher: ['/', '/(de|es|en)/:page*']
};