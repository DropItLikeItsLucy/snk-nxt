import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'ka'],
  
    // Used when no locale matches
    defaultLocale: 'en'
  });
  
  export const config = {
    matcher: [
        '/',
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)'
     ]
  };