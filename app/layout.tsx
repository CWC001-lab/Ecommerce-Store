import { Footer, Navbar, BottomNav } from '@/components'
import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import LoadingProvider from '@/providers/loading-provider'
import ThemeProvider from '@/providers/theme-provider'

const urban = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Store',
  description: 'Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={urban.className}>
        <ThemeProvider>
          <LoadingProvider>
            <ModalProvider />
            <ToastProvider />
            <Navbar />
            <main className="pt-20 pb-20 md:pb-0 bg-white dark:bg-slate-900 min-h-screen">
              {children}
            </main>
            <Footer />
            <BottomNav />
          </LoadingProvider>
        </ThemeProvider>
        </body>
    </html>
  )
}
