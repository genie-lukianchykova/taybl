import './globals.css'
import "@radix-ui/themes/styles.css";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes'
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Taybl',
  description: 'A modern web application built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme accentColor="violet" grayColor="sage">
          <NavBar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  )
}
