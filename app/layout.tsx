
import './globals.css'
import type { Metadata } from 'next'
// Import the new font here, for example, Roboto
// import { Roboto } from 'next/font/google'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Initialize the new font here
// const roboto = Roboto({ subsets: ['latin'] })

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
    <html lang="en">
      <body>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
