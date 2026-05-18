import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const validatedLocale = locale || 'en';
  if (!['en', 'ar'].includes(validatedLocale)) notFound();

  return {
    locale: validatedLocale,
    messages: (await import(`../locales/${validatedLocale}.json`)).default,
  };
});