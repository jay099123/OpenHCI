import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "@/app/globals.css";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StoryTeller AI',
  description: 'AI-powered storytelling assistant for parents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}