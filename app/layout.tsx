import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'airbnb',
  description: 'airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
