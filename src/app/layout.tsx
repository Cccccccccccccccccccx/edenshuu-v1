import type { Metadata, Viewport } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import { MainNav } from '@/components/MainNav'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Edenshuu - Traduction Professionnelle',
  description: 'Services de traduction professionnelle pour sites web, vidéos et contenus éditoriaux',
  keywords: ['traduction', 'sous-titrage', 'localisation', 'multilingue', 'traduction professionnelle'],
  authors: [{ name: 'Edenshuu' }],
  creator: 'Edenshuu',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${merriweather.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <MainNav />
            <div className="flex-1">
              {children}
            </div>
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  &copy; {new Date().getFullYear()} Edenshuu. Tous droits réservés.
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
