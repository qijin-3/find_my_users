// components/Layout.js
import { Navigation } from './Navigation.tsx'
import { Footer } from '@/components/Footer'

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}