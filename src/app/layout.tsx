import { LanguageProvider } from '@inlang/paraglide-next';
import { languageTag } from '@/paraglide/runtime.js';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import { siteConfig } from '@/lib/constant';
import { fonts } from '@/fonts';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ThemeProvider } from 'next-themes';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

export const generateMetadata = (): Metadata => ({
  metadataBase: new URL(siteConfig.url()),
  title: {
    default: siteConfig.title(),
    template: `%s | ${siteConfig.title()}`,
  },
  description: siteConfig.description(),
  keywords: siteConfig.keywords(),
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/logo.png',
    shortcut: '/favicon/logo.png',
    apple: '/favicon/logo.png',
  },
  verification: {
    google: siteConfig.googleSiteVerificationId(),
  },
  openGraph: {
    url: siteConfig.url(),
    title: siteConfig.title(),
    description: siteConfig.description(),
    siteName: siteConfig.title(),
    images: '/opengraph-image.png',
    type: 'website',
    locale: languageTag(),
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title(),
    description: siteConfig.description(),
    images: '/opengraph-image.png',
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang={languageTag()} suppressHydrationWarning>
        <body className={cn('min-h-screen font-sans', fonts)}>
          <ThemeProvider attribute="class">
            <Toaster />

            {children}
            <ThemeSwitcher className="absolute bottom-5 right-5 z-10" />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </LanguageProvider>
  );
}
