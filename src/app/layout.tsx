import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fox Market',
  description: 'Your marketplace for high-quality digital assets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={cn("relative h-full font-sans antialiased", inter.className)}>
          <main className = 'relative flex flex-col min-h-screen'>
            <div className = 'flex-grow flex-l'>
              {children}
            </div>
          </main>
        </body>
      </ThemeProvider>
    </html>
  )
}
