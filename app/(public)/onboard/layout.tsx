import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "@/app/globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StoryTeller AI - Onboarding',
  description: 'AI-powered storytelling assistant for parents - Setup',
}

export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-gradient-to-br from-purple-50 to-pink-50`}>
      {children}
    </div>
  )
}