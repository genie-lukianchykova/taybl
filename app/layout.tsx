import './globals.css'
import "@radix-ui/themes/styles.css";
import './theme-config.css';
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import { Theme, ThemePanel } from '@radix-ui/themes'
import NavBar from './NavBar'

const raleway = Raleway({ 
  subsets: ['latin'],
  variable: '--font-raleway'
})

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
      <body className={raleway.variable}>
        <Theme accentColor="violet" grayColor="mauve" >
          <NavBar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  )
}
